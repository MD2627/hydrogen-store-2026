import { redirect, useLoaderData, useSearchParams } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { getPaginationVariables, Analytics } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductItem } from '~/components/ProductItem';
import { CustomCollectionFilters } from '~/components/CustomCollectionFilters';
import { CollectionBanner } from '~/components/CollectionBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { BackToFiltersSticky } from '~/components/BackToFiltersSticky';
import { InlineCollectionBanner } from '~/components/InlineCollectionBanner';
import { REDIRECTS } from '~/config/redirects';


const COLLECTION_FILTER_MAPPING = {
  'gifting': [],
  'tennis-bracelets': [],
  'statement-rings': [],
  'initial-signet-ring': [],
  'initial-bezel-necklace': [],
  'bracelets': [],
  'fine-jewellery': []
};

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.collection.title ?? ''} Collection` }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const { request } = args;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Check for redirects specific to this route's path
  const cleanPathname = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  if (REDIRECTS[pathname] || REDIRECTS[cleanPathname]) {
    throw redirect(REDIRECTS[pathname] || REDIRECTS[cleanPathname]);
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context, params, request }) {
  const { handle } = params;
  const { storefront } = context;
  const url = new URL(request.url);
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 24,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  // Get collection info first to ensure it exists
  const collectionInfoResult = await storefront.query(COLLECTION_INFO_QUERY, {
    variables: { handle },
  });

  const collectionInfo = collectionInfoResult?.collection;

  if (!collectionInfo) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // Parse filters from URL for the API
  // We need to convert the URL params to the array format Storefront API expects
  const filters = [];
  for (const [key, value] of url.searchParams.entries()) {
    // Basic mapping - in a real app this should be more robust
    // We assume the URL params are already in a format we can map or we use the 'filters' array directly if we were constructing it nicely
    // But currently the URL uses filter.v.option stuff. 
    // We'll stick to manual filtering variables for now if we can't fully sync URL params yet, 
    // BUT the user wants "Direct Sync" which implies using the API.

    // Simplistic mapping for demonstration of API usage:
    try {
      if (key.startsWith('filter.p.tag')) {
        filters.push({ tag: value });
      } else if (key.startsWith('filter.v.option')) {
        const optionName = key.replace('filter.v.option.', '');
        filters.push({ variantOption: { name: optionName, value: value } });
      } else if (key === 'filter.v.price.gte') {
        // Price handling would go here
      }
      // Add other mappings as needed
    } catch (e) { console.error(e) }
  }

  let collection;

  // Always use the query that fetches filters
  const result = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      ...paginationVariables,
      filters: filters.length > 0 ? filters : undefined
    },
  });

  collection = result?.collection;

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, { handle, data: collection });

  // Use the filters returned by the API
  // Map them to the format CollectionFilters expects
  const apiFilters = collection.products?.filters || [];

  const availableFilters = apiFilters.map(filter => {
    // Special handling for Metal Type filter to dynamically extract actual values
    if (filter.label === 'Metal Type') {
      const singleToneMetals = [];
      const twoToneMetals = [];
      const uniqueMetalTypes = new Set();

      // Get all products from the collection
      const products = collection.products?.nodes || [];

      // Extract unique metal type values from all product variants
      products.forEach(product => {
        if (product.variants?.nodes) {
          product.variants.nodes.forEach(variant => {
            if (variant.selectedOptions) {
              variant.selectedOptions.forEach(option => {
                // Look for the metal type option (case-insensitive)
                if (option.name.toLowerCase().includes('metal')) {
                  const metalValue = option.value;
                  // Skip group labels
                  if (metalValue.toLowerCase() !== 'first tone' &&
                    metalValue.toLowerCase() !== 'two tone') {
                    uniqueMetalTypes.add(metalValue);
                  }
                }
              });
            }
          });
        }
      });

      // Get the option name from the filter
      let optionName = 'Metal Type';
      if (filter.values.length > 0 && filter.values[0].input) {
        try {
          const sampleInput = JSON.parse(filter.values[0].input);
          if (sampleInput.variantOption?.name) {
            optionName = sampleInput.variantOption.name;
          }
        } catch (e) {
          console.error('Failed to parse filter input:', e);
        }
      }

      // Separate metals into single-tone and two-tone based on presence of "/"
      Array.from(uniqueMetalTypes).forEach(metalType => {
        const metalOption = {
          value: JSON.stringify({
            variantOption: {
              name: optionName,
              value: metalType
            }
          }),
          label: metalType
        };

        // Two-tone metals contain "/" in their name
        if (metalType.includes('/')) {
          twoToneMetals.push(metalOption);
        } else {
          singleToneMetals.push(metalOption);
        }
      });

      // Combine both groups, with single-tone first
      const allMetalValues = [...singleToneMetals, ...twoToneMetals];

      return {
        key: filter.id,
        label: filter.label,
        values: allMetalValues,
        // Add metadata to indicate this filter has groups
        hasGroups: true,
        singleToneCount: singleToneMetals.length
      };
    }

    // Default mapping for other filters
    return {
      key: filter.id, // Use the filter ID from Shopify (e.g. filter.v.option.size)
      label: filter.label,
      values: filter.values.map(val => ({
        value: val.input, // Store the input JSON string as value
        label: val.label
      }))
    };
  });

  // Debug: Log extracted filters
  if (process.env.NODE_ENV === 'development') {
  }

  return {
    collection,
    filters: {}, // We don't use the old filters object anymore
    availableFilters,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({ context }) {
  return {};
}

export default function Collection() {
  /** @type {LoaderReturnData} */
  const { collection, availableFilters } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortDropdownRef = useRef(null);
  const filterRef = useRef(null);

  // Sort Logic
  const sortParam = searchParams.get('sort') || 'recommended';

  // Determine if we should show the ascending/descending buttons
  const showSortButtons = sortParam.includes('name') || sortParam.includes('price');

  // Simple sort options - only show parent options in dropdown
  const sortOptions = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
  ];

  // Get current sort label
  let currentSortLabel = 'Recommended';
  if (sortParam.includes('name')) {
    currentSortLabel = 'Name';
  } else if (sortParam.includes('price')) {
    currentSortLabel = 'Price';
  }

  const handleSortChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'recommended') {
      newParams.delete('sort');
    } else if (value === 'name') {
      // Default to A-Z when clicking Name
      newParams.set('sort', 'name-a-z');
    } else if (value === 'price') {
      // Default to Low-High when clicking Price
      newParams.set('sort', 'price-low-high');
    } else {
      newParams.set('sort', value);
    }
    setSearchParams(newParams, { preventScrollReset: true });
    setShowSortDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };

    if (showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSortDropdown]);

  // Extract filter parameters from URL
  const shapeFilter = searchParams.get('shape');
  const metalFilter = searchParams.get('metal');
  const styleFilter = searchParams.get('style');
  const bandFilter = searchParams.get('band');
  const profileFilter = searchParams.get('profile') || searchParams.get('setting');

  // Filter products based on URL parameters
  const allProducts = collection.products?.nodes || [];
  const filteredProducts = allProducts.filter(product => {
    // Helper function to normalize strings for comparison
    const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Check if product has the required tags or variant options
    const productTags = product.tags?.map(tag => normalize(tag)) || [];
    const productTitle = normalize(product.title);

    // Shape filter
    if (shapeFilter) {
      const normalizedShape = normalize(shapeFilter);
      const hasShape = productTags.includes(normalizedShape) ||
        productTitle.includes(normalizedShape);
      if (!hasShape) return false;
    }

    // Metal filter
    if (metalFilter) {
      const normalizedMetal = normalize(metalFilter);
      const hasMetalInVariants = product.variants?.nodes?.some(variant =>
        variant.selectedOptions?.some(option =>
          option.name.toLowerCase().includes('metal') &&
          normalize(option.value).includes(normalizedMetal)
        )
      );
      if (!hasMetalInVariants) return false;
    }

    // Style filter
    if (styleFilter) {
      const normalizedStyle = normalize(styleFilter);
      const hasStyle = productTags.includes(normalizedStyle) ||
        productTitle.includes(normalizedStyle);
      if (!hasStyle) return false;
    }

    // Band filter
    if (bandFilter) {
      const normalizedBand = normalize(bandFilter);
      const hasBand = productTags.includes(normalizedBand) ||
        productTitle.includes(normalizedBand);
      if (!hasBand) return false;
    }

    // Profile filter
    if (profileFilter) {
      const normalizedProfile = normalize(profileFilter);
      const hasProfileInVariants = product.variants?.nodes?.some(variant =>
        variant.selectedOptions?.some(option =>
          normalize(option.value).includes(normalizedProfile)
        )
      );
      if (!hasProfileInVariants) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortParam === 'name-a-z') {
      return a.title.localeCompare(b.title);
    } else if (sortParam === 'name-z-a') {
      return b.title.localeCompare(a.title);
    } else if (sortParam === 'price-low-high') {
      const aPrice = parseFloat(a.priceRange?.minVariantPrice?.amount || 0);
      const bPrice = parseFloat(b.priceRange?.minVariantPrice?.amount || 0);
      return aPrice - bPrice;
    } else if (sortParam === 'price-high-low') {
      const aPrice = parseFloat(a.priceRange?.minVariantPrice?.amount || 0);
      const bPrice = parseFloat(b.priceRange?.minVariantPrice?.amount || 0);
      return bPrice - aPrice;
    }
    return 0; // recommended - keep original order
  });

  // Extract active filters and find matching variant
  let selectedVariantOptions = null;
  if (metalFilter || styleFilter || profileFilter || bandFilter) {
    // Find a product variant that matches ALL active filters
    const sampleProduct = sortedProducts[0];
    if (sampleProduct?.variants?.nodes) {
      const matchingVariant = sampleProduct.variants.nodes.find(variant => {
        const variantOptions = variant.selectedOptions || [];

        // Check metal filter
        if (metalFilter) {
          const metalMatch = variantOptions.some(option =>
            option.name.toLowerCase().includes('metal') &&
            option.value.toLowerCase().replace(/[^a-z0-9]/g, '') === metalFilter.replace(/-/g, '')
          );
          if (!metalMatch) return false;
        }

        // Check style/setting filter
        if (styleFilter) {
          const styleMatch = variantOptions.some(option =>
            option.name.toLowerCase().includes('setting') &&
            option.value.toLowerCase().replace(/[^a-z0-9]/g, '') === styleFilter.replace(/-/g, '')
          );
          if (!styleMatch) return false;
        }

        // Check profile filter
        if (profileFilter) {
          const profileMatch = variantOptions.some(option =>
            option.name.toLowerCase().includes('profile') &&
            option.value.toLowerCase().replace(/[^a-z0-9]/g, '') === profileFilter.replace(/-/g, '')
          );
          if (!profileMatch) return false;
        }

        // Check band filter
        if (bandFilter) {
          const bandMatch = variantOptions.some(option =>
            option.name.toLowerCase().includes('band') &&
            option.value.toLowerCase().replace(/[^a-z0-9]/g, '') === bandFilter.replace(/-/g, '')
          );
          if (!bandMatch) return false;
        }

        return true;
      });

      if (matchingVariant) {
        selectedVariantOptions = matchingVariant.selectedOptions;
      }
    }
  }
  const bannerData = (() => {
    const metafield = collection?.metafield;
    if (!metafield?.reference?.fields) {
      return null;
    }
    const fields = metafield.reference.fields;
    const data = {};
    fields.forEach(field => {
      switch (field.key) {
        case 'main_image':
          if (field.references?.nodes?.[0]?.image) {
            data.image = field.references.nodes[0].image;
          }
          else if (field.reference?.image) {
            data.image = field.reference.image;
          }
          break;
        case 'title':
          data.title = field.value;
          break;
        case 'description':
          data.description = field.value;
          break;
        case 'button':
          data.button = field.value;
          break;
        case 'images_link':
          data.link = field.value;
          break;
      }
    });


    // Only return banner data if we have at least an image or title
    return (data.image || data.title) ? data : null;
  })();




  return (
    <div className="collection">
      <CollectionBanner collection={collection} />

      <div className="collection-content">
        <div className='page-width'>
          <aside className="collection-filters-sidebar" ref={filterRef}>
            <CustomCollectionFilters enabledKeys={COLLECTION_FILTER_MAPPING[collection.handle]} />
          </aside>

        </div>
        <div className='page-width'>
          <main className="collection-products">
            {/* Sort Header */}
            <div className="collection-sort-header" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'stretch', marginBottom: '20px', rowGap: '3px' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ alignSelf: 'center', marginRight: '7px' }} className="f-13 f-m-13 w-400 ff-c l-h-1 black-color">Sort:</div>
                <div className="sort-dropdown-container" style={{ position: 'relative', minWidth: '140px' }} ref={sortDropdownRef}>
                  <button
                    className="sort-trigger f-13 f-m-13 w-400 ff-c l-h-1 black-color"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      background: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: '0px solid transparent',
                      gap: '8px'
                    }}
                  >
                    <span>{currentSortLabel}</span>
                    <svg width="15" height="15" viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg" style={{ transform: showSortDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                      <path d="m2.117 5.292 6.35 6.35 6.35-6.35" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '1.05831', strokeLinecap: 'round', strokeLinejoin: 'round' }} />
                    </svg>
                  </button>
                  {showSortDropdown && (
                    <div className="sort-options f-13 f-m-13 w-400 ff-c l-h-1 black-color" style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: 'var(--body_color)',
                      borderRadius: '4px',
                      zIndex: 10,
                      minWidth: '200px',
                      border: '0px solid transparent',
                      marginTop: '4px'
                    }}>
                      {sortOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value)}
                          className="f-13 f-m-13 w-400 ff-c l-h-1 black-color"
                          style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: '10px 15px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: currentSortLabel === option.label ? '#f5f5f5' : 'white'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentSortLabel === option.label ? '#f5f5f5' : 'white'}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {showSortButtons && (
                <div className="button-group" style={{ marginLeft: '7px', display: 'flex', border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                  <button
                    type="button"
                    className={`button-group-icon ${!sortParam.includes('high-low') && !sortParam.includes('z-a') ? 'selected' : ''}`}
                    title="Sort Ascending"
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams);
                      if (sortParam.includes('price')) {
                        newParams.set('sort', 'price-low-high');
                      } else if (sortParam.includes('name')) {
                        newParams.set('sort', 'name-a-z');
                      }
                      setSearchParams(newParams, { preventScrollReset: true });
                    }}
                    style={{
                      padding: '8px 12px',
                      background: (!sortParam.includes('high-low') && !sortParam.includes('z-a')) ? '#253E2B' : 'white',
                      border: 'none',
                      borderRight: '1px solid #e0e0e0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                      <g fill={(!sortParam.includes('high-low') && !sortParam.includes('z-a')) ? '#fff' : '#253E2B'}>
                        <path d="M2.117 2.117H6.35v2.117H2.117zM2.117 7.408h8.467v2.117H2.117zM2.117 12.7h12.7v2.117h-12.7z"></path>
                      </g>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`button-group-icon ${sortParam.includes('high-low') || sortParam.includes('z-a') ? 'selected' : ''}`}
                    title="Sort Descending"
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams);
                      if (sortParam.includes('price')) {
                        newParams.set('sort', 'price-high-low');
                      } else if (sortParam.includes('name')) {
                        newParams.set('sort', 'name-z-a');
                      }
                      setSearchParams(newParams, { preventScrollReset: true });
                    }}
                    style={{
                      padding: '8px 12px',
                      background: (sortParam.includes('high-low') || sortParam.includes('z-a')) ? '#253E2B' : 'white',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                      <g fill={(sortParam.includes('high-low') || sortParam.includes('z-a')) ? '#fff' : '#253E2B'}>
                        <path d="M2.117 2.117h12.7v2.117h-12.7zM2.117 7.408h8.467v2.117H2.117zM2.117 12.7H6.35v2.117H2.117z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {sortedProducts.length > 0 ? (
              <div className="products-grid">
                {sortedProducts.map((product, index) => {
                  const items = [];

                  // Add the product
                  items.push(
                    <ProductItem
                      key={product.id}
                      product={product}
                      loading={index < 24 ? 'eager' : undefined}
                      selectedVariantOptions={selectedVariantOptions}
                    />
                  );

                  // Insert banner after the 13th product (index 13, which is the 14th item)
                  // This places it at row 3, columns 4-5 on a 5-column grid
                  if (index === 12 && bannerData) {
                    items.push(
                      <InlineCollectionBanner
                        key="inline-banner"
                        data={bannerData}
                      />
                    );
                  }

                  return items;
                })}
              </div>
            ) : (
              <div className="no-products">
                <p className='f-20 f-m-18 black-color txt-center w-400 ff-n'>No products found matching your filters.</p>
              </div>
            )}
          </main>
        </div>

        <Analytics.CollectionView
          data={{
            collection: {
              id: collection.id,
              handle: collection.handle,
            },
          }}
        />
      </div>
      <BackToFiltersSticky targetRef={filterRef} />

      <UvpIconFooter data={PRODUCT_UVPS} />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionProductItem on Product {
    id
    handle
    title
    tags
    featuredImage {
      id
      altText
      url
      width
      height
    }
    images(first: 5) {
      nodes {
        id
        altText
        url
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 100) {
      nodes {
        id
        image {
          id
          url
          altText
          width
          height
        }
        selectedOptions {
          name
          value
        }
        metafield(namespace: "custom", key: "variant_media") {
          references(first: 10) {
            nodes {
              ... on MediaImage {
                mediaContentType
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Collection info query (without products, for filtered searches)
const COLLECTION_INFO_QUERY = `#graphql
  query CollectionInfo(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
        width
        height
      }
    }
  }
`;

// Standard collection query with filters
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query CollectionsHandleCollection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $filters: [ProductFilter!]
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
        width
        height
      }
      metafield(namespace: "custom", key: "collection_image") {
        reference {
          ... on Metaobject {
            id
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              references(first: 1) {
                nodes {
                  ... on MediaImage {
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...CollectionProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

const PRODUCT_UVPS = [
  {
    link: '/shipping',
    label: 'Worldwide<br>Express Shipping',
    svg: `
      <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16.75H2v-1.5h10v1.5Zm13.074 8.417c-.332.37-.807.583-1.304.583H8.196a1.752 1.752 0 0 1-1.74-1.942l.448-4.058H4v-1.5h4.578l-.63 5.723a.248.248 0 0 0 .248.277H23.77a.247.247 0 0 0 .186-.083.247.247 0 0 0 .062-.194l-1.47-13.223H9.454l-.312 2.827-1.492-.165.46-4.162h3.641v-.92c0-2.344 1.907-4.25 4.25-4.25s4.25 1.906 4.25 4.25v.92h3.642l1.617 14.557Z" fill="#6b6b6b"/>
      </svg>
    `,
  },
  {
    link: '/free-resizing',
    label: 'Free<br>Resizing',
    svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M24.289 18.18c0 5.122-4.167 9.289-9.289 9.289s-9.289-4.167-9.289-9.29a9.286 9.286 0 0 1 5.615-8.533l.593 1.376a7.788 7.788 0 0 0-4.708 7.158c0 4.295 3.495 7.789 7.789 7.789s7.789-3.494 7.789-7.79c0-4.294-3.495-7.788-7.789-7.788-.259 0-.518.018-.768.044l-.367.037-4.585-4.84 2.495-3.382h6.45l2.492 3.377-2.55 2.733-1.097-1.024 1.7-1.82-1.302-1.766h-4.936l-1.3 1.761 3.22 3.4c.181-.013.364-.02.548-.02 5.122 0 9.289 4.167 9.289 9.289ZM11.75 18h-1.5v4.75H15v-1.5h-2.19l5.44-5.44V18h1.5v-4.75H15v1.5h2.19l-5.44 5.44V18Z" fill="#fff"></path></svg>`,
  },
  {
    link: '/warranty',
    label: 'Lifetime Ring<br>Warranty',
    svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 2.587 4.25 8.793v7.362a8.774 8.774 0 0 0 4.375 7.577L15 27.413l6.375-3.68a8.774 8.774 0 0 0 4.375-7.578V8.793L15 2.587Zm9.25 13.568a7.271 7.271 0 0 1-3.625 6.279L15 25.68l-5.625-3.247a7.271 7.271 0 0 1-3.625-6.28V9.66L15 4.32l9.25 5.34v6.495Zm-11.733.268 3.906-3.906a3.516 3.516 0 0 1 4.967 0 3.516 3.516 0 0 1 0 4.966c-.685.685-1.584 1.027-2.484 1.027s-1.799-.342-2.483-1.027l-.572-.571 1.06-1.06.572.57a2.015 2.015 0 0 0 2.846 0 2.014 2.014 0 0 0 0-2.845 2.015 2.015 0 0 0-2.846 0l-3.906 3.906a3.516 3.516 0 0 1-4.967 0 3.516 3.516 0 0 1 0-4.966 3.516 3.516 0 0 1 4.967 0l.589.588-1.061 1.06-.588-.588a2.015 2.015 0 0 0-2.846 0 2.014 2.014 0 0 0 0 2.846 2.015 2.015 0 0 0 2.846 0Z" fill="#fff"></path></svg>`,
  },
  {
    link: '/engagement-rings?metal=yellow_gold',
    label: 'Free Ring<br>Customisation',
    svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="m28.42 9.978-4.77 4.769a4.152 4.152 0 0 1-2.331 1.166l-4.204.6-3.11 3.11-1.06-1.061 3.11-3.11.6-4.203a4.15 4.15 0 0 1 1.166-2.332l4.77-4.77 1.06 1.061-4.77 4.77a2.642 2.642 0 0 0-.741 1.483l-.494 3.46 3.46-.494a2.638 2.638 0 0 0 1.484-.741l4.769-4.769 1.06 1.06ZM8.07 21.118c-2.905 0-5.097-2.256-5.097-5.28 0-3.01 2.213-5.28 5.147-5.28 1.144 0 2.063.238 2.894.749.371.228.734.513 1.14.896l1.028-1.092A8.466 8.466 0 0 0 11.8 10.03c-1.077-.662-2.247-.97-3.68-.97-3.727 0-6.647 2.977-6.647 6.813 0 3.782 2.898 6.746 6.597 6.746 2.586 0 4.076-1.136 5.193-2.247l-1.057-1.063c-1.093 1.086-2.214 1.81-4.136 1.81Zm7.936-.38h4v-1.5h-4v1.5Zm-1.408 1.9 2.828 2.83 1.06-1.061-2.828-2.829-1.06 1.06Z" fill="#fff"></path></svg>`,
  },
];

/** @typedef {import('./+types/collections.$handle').Route} Route */
/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */