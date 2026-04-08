import { useLoaderData, useSearchParams } from 'react-router';
import { useRef } from 'react';
import { getPaginationVariables, Pagination } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { ProductItem } from '~/components/ProductItem';
import { CustomCollectionFilters } from '~/components/CustomCollectionFilters';
import { BackToFiltersSticky } from '~/components/BackToFiltersSticky';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: `Hydrogen | Products` }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
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
async function loadCriticalData({ context, request }) {
  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 24,
  });

  const [{ products }] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {
        ...paginationVariables,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    products,
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
  const { products } = useLoaderData();
  const [searchParams] = useSearchParams();
  const filtersRef = useRef(null);

  // Extract filter parameters from URL
  const shapeFilter = searchParams.get('shape');
  const metalFilter = searchParams.get('metal');
  const styleFilter = searchParams.get('style');
  const bandFilter = searchParams.get('band');
  const profileFilter = searchParams.get('profile');

  // Filter products based on URL parameters
  const filteredProducts = products?.nodes?.filter(product => {
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
  }) || [];

  // Extract active filters and find matching variant
  let selectedVariantOptions = null;
  if (metalFilter || styleFilter || profileFilter || bandFilter) {
    // Find a product variant that matches ALL active filters
    const sampleProduct = filteredProducts[0];
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

  return (
    <div className="collection">
      <div className='page-width'>
        <div className="collection-header">
          <div>
            <h1>All Products</h1>
          </div>
        </div>
      </div>

      <div className="collection-content">
        <div className='page-width'>
          <aside className="collection-filters-sidebar" ref={filtersRef}>
            <CustomCollectionFilters />
          </aside>
        </div>

        <div className='page-width'>
          <main className="collection-products">
            <Pagination connection={products}>
              {({ nodes, isLoading, NextLink }) => {
                // Apply client-side filtering to the paginated nodes
                const filteredProducts = nodes.filter(product => {
                  const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');
                  const productTags = product.tags?.map(tag => normalize(tag)) || [];
                  const productTitle = normalize(product.title);

                  if (shapeFilter) {
                    const normalizedShape = normalize(shapeFilter);
                    const hasShape = productTags.includes(normalizedShape) || productTitle.includes(normalizedShape);
                    if (!hasShape) return false;
                  }

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

                  if (styleFilter) {
                    const normalizedStyle = normalize(styleFilter);
                    const hasStyle = productTags.includes(normalizedStyle) || productTitle.includes(normalizedStyle);
                    if (!hasStyle) return false;
                  }

                  if (bandFilter) {
                    const normalizedBand = normalize(bandFilter);
                    const hasBand = productTags.includes(normalizedBand) || productTitle.includes(normalizedBand);
                    if (!hasBand) return false;
                  }

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

                // Extract active filters and find matching variant
                let selectedVariantOptions = null;
                if (metalFilter || styleFilter || profileFilter || bandFilter) {
                  const sampleProduct = filteredProducts[0];
                  if (sampleProduct?.variants?.nodes) {
                    const matchingVariant = sampleProduct.variants.nodes.find(variant => {
                      const variantOptions = variant.selectedOptions || [];

                      if (metalFilter) {
                        const metalMatch = variantOptions.some(option =>
                          option.name.toLowerCase().includes('metal') &&
                          option.value.toLowerCase().replace(/[^a-z0-9]/g, '') === metalFilter.replace(/-/g, '')
                        );
                        if (!metalMatch) return false;
                      }

                      if (styleFilter) {
                        const styleMatch = variantOptions.some(option =>
                          option.name.toLowerCase().includes('setting') &&
                          option.value.toLowerCase().replace(/[^a-z0-9]/g, '') === styleFilter.replace(/-/g, '')
                        );
                        if (!styleMatch) return false;
                      }

                      if (profileFilter) {
                        const profileMatch = variantOptions.some(option =>
                          option.name.toLowerCase().includes('profile') &&
                          option.value.toLowerCase().replace(/[^a-z0-9]/g, '') === profileFilter.replace(/-/g, '')
                        );
                        if (!profileMatch) return false;
                      }

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

                console.log(filteredProducts);

                return (
                  <>
                    {filteredProducts.length > 0 ? (
                      <div className="products-grid">
                        {filteredProducts.map((product, index) => (
                          <ProductItem
                            key={product.id}
                            product={product}
                            loading={index < 24 ? 'eager' : undefined}
                            selectedVariantOptions={selectedVariantOptions}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="no-products">
                        <p className='f-20 f-m-18 black-color txt-center w-400 ff-n'>No products found matching your filters.</p>
                      </div>
                    )}
                    <div className='pagination-wrapper'>
                      <NextLink className='common-button'>
                        {isLoading ? <span className='f-14 f-m-14 w-400 ff-n l-h-1 white-color'>Loading...</span> : <span className='f-14 f-m-14 w-400 ff-n l-h-1 white-color'>Load more</span>}
                      </NextLink>
                    </div>
                  </>
                );
              }}
            </Pagination>
          </main>
        </div>
      </div>

      <BackToFiltersSticky targetRef={filtersRef} />
    </div>
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
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
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
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

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/product
const CATALOG_QUERY = `#graphql
  ${COLLECTION_ITEM_FRAGMENT}
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first, 
      last: $last, 
      before: $startCursor, 
      after: $endCursor
    ) {
      nodes {
        ...CollectionItem
        tags
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

/** @typedef {import('./+types/collections.all').Route} Route */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
