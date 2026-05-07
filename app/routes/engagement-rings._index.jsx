import { redirect, useLoaderData, useSearchParams, useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { getPaginationVariables, Analytics, Pagination } from '@shopify/hydrogen';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductItem } from '~/components/ProductItem';
import { CollectionBanner } from '~/components/CollectionBanner';
import { CollectionContentSection } from '~/components/CollectionContentSection';
import { CollectionLinksSection } from '~/components/CollectionLinksSection';
import { SplitBanner } from '~/components/SplitBanner';
import { ProductFAQ } from '~/components/ProductFAQ';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { VideoBanner } from '~/components/VideoBanner';
import { CustomCollectionFilters, STONE_TYPE_FILTER } from '~/components/CustomCollectionFilters';
import engagementFiltersCss from '~/styles/engagement-filters.css?url';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
    return [{ title: `Hydrogen | ${data?.collection?.title ?? 'Engagement Rings'} Collection` }];
};

export const links = () => {
    return [{ rel: 'stylesheet', href: engagementFiltersCss }];
};



/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
    const deferredData = loadDeferredData(args);
    const criticalData = await loadCriticalData(args);

    return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context, request }) {
    const handle = 'engagement-rings';
    const { storefront } = context;
    const url = new URL(request.url);
    const paginationVariables = getPaginationVariables(request, {
        pageBy: 24,
    });

    // Parse filters from URL for the API
    const filters = [];
    for (const [key, value] of url.searchParams.entries()) {
        try {
            if (key.startsWith('filter.p.tag')) {
                filters.push({ tag: value });
            } else if (key.startsWith('filter.v.option')) {
                const optionName = key.replace('filter.v.option.', '');
                filters.push({ variantOption: { name: optionName, value: value } });
            }
        } catch (e) {
            console.error(e);
        }
    }

    const sortParam = url.searchParams.get('sort');
    let sortKey = 'MANUAL';
    let reverse = false;

    switch (sortParam) {
        case 'price-high-low':
            sortKey = 'PRICE';
            reverse = true;
            break;
        case 'price-low-high':
            sortKey = 'PRICE';
            reverse = false;
            break;
        case 'name-a-z':
            sortKey = 'TITLE';
            reverse = false;
            break;
        case 'name-z-a':
            sortKey = 'TITLE';
            reverse = true;
            break;
        case 'recommended':
        default:
            sortKey = 'MANUAL';
            reverse = false;
            break;
    }

    // Fetch collection data
    const result = await storefront.query(COLLECTION_QUERY, {
        variables: {
            handle,
            ...paginationVariables,
            filters: filters.length > 0 ? filters : undefined,
            sortKey,
            reverse
        },
    });

    const collection = result?.collection;

    if (!collection) {
        throw new Response(`Collection ${handle} not found`, {
            status: 404,
        });
    }

    redirectIfHandleIsLocalized(request, { handle, data: collection });

    // Extract available filters (logic copied from collections.$handle.jsx)
    const apiFilters = collection.products?.filters || [];
    const availableFilters = apiFilters.map(filter => {
        if (filter.label === 'Metal Type') {
            const singleToneMetals = [];
            const twoToneMetals = [];
            const uniqueMetalTypes = new Set();
            const products = collection.products?.nodes || [];

            products.forEach(product => {
                if (product.variants?.nodes) {
                    product.variants.nodes.forEach(variant => {
                        if (variant.selectedOptions) {
                            variant.selectedOptions.forEach(option => {
                                if (option.name.toLowerCase().includes('metal')) {
                                    const metalValue = option.value;
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

            let optionName = 'Metal Type';
            if (filter.values.length > 0) {
                try {
                    const sampleInput = JSON.parse(filter.values[0].input);
                    if (sampleInput.variantOption?.name) {
                        optionName = sampleInput.variantOption.name;
                    }
                } catch (e) { }
            }

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

                if (metalType.includes('/')) {
                    twoToneMetals.push(metalOption);
                } else {
                    singleToneMetals.push(metalOption);
                }
            });

            const allMetalValues = [...singleToneMetals, ...twoToneMetals];

            return {
                key: filter.id,
                label: filter.label,
                values: allMetalValues,
                hasGroups: true,
                singleToneCount: singleToneMetals.length
            };
        }

        return {
            key: filter.id,
            label: filter.label,
            values: filter.values.map(val => ({
                value: val.input,
                label: val.label
            }))
        };
    });

    return {
        collection,
        availableFilters,
        filters: {},
        showGemstoneOptions: true,
    };
}

function loadDeferredData({ context }) {
    return {};
}

export default function EngagementRingCollection() {
    const { collection, availableFilters, showGemstoneOptions } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const sortDropdownRef = useRef(null);

    // Extract filter parameters from URL
    const shapeFilter = searchParams.get('shape');
    const metalFilter = searchParams.get('metal');
    const styleFilter = searchParams.get('style');
    const bandFilter = searchParams.get('band');
    const profileFilter = searchParams.get('profile') || searchParams.get('setting');
    const stoneFilter = searchParams.get('stone'); // Stone Type filter

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

    // Build selectedVariantOptions directly from URL filter values.
    // Each ProductItem uses these criteria to find its own matching variant per-product.
    let selectedVariantOptions = null;
    if (metalFilter || styleFilter || bandFilter || profileFilter || shapeFilter || stoneFilter) {
        const opts = [];
        if (metalFilter) opts.push({ name: 'Metal Type', value: metalFilter.replace(/-/g, ' ') });
        if (styleFilter) opts.push({ name: 'Setting Style', value: styleFilter.replace(/-/g, ' ') });
        if (bandFilter) opts.push({ name: 'Band Type', value: bandFilter.replace(/-/g, ' ') });
        if (profileFilter) opts.push({ name: 'Setting', value: profileFilter.replace(/-/g, ' ') });
        if (shapeFilter) opts.push({ name: 'Shape', value: shapeFilter.replace(/-/g, ' ') });
        if (stoneFilter && stoneFilter !== 'any') opts.push({ name: 'Stone Type', value: stoneFilter.replace(/-/g, ' ') });
        if (opts.length > 0) selectedVariantOptions = opts;
    }



    return (
        <div className="collection">
            <CollectionBanner collection={collection} />
            <section className="collection-content">
                <div className='page-width'>
                    <div className='collection-side'>
                        <aside className="collection-filters-sidebar engagement-collection-filters">
                            <CustomCollectionFilters additionalFilters={[STONE_TYPE_FILTER]} />
                        </aside>
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
                                                border: '0px solid transparent',
                                                zIndex: 10,
                                                minWidth: '200px',
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
                            <Pagination connection={collection.products}>
                                {({ nodes, isLoading, NextLink }) => {
                                    // Apply client-side filtering to the paginated nodes
                                    const filteredProducts = nodes.filter(product => {
                                        const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');
                                        const productTags = product.tags?.map(tag => normalize(tag)) || [];
                                        const productTitle = normalize(product.title);

                                        if (shapeFilter) {
                                            const normalizedShape = normalize(shapeFilter);
                                            const hasShape = productTags.some(tag => tag.includes(normalizedShape)) ||
                                                productTitle.includes(normalizedShape);
                                            if (!hasShape) return false;
                                        }

                                        if (metalFilter) {
                                            const normalizedMetal = normalize(metalFilter);
                                            const hasMetalInVariants = product.variants?.nodes?.some(variant =>
                                                variant.selectedOptions?.some(option =>
                                                    normalize(option.value).includes(normalizedMetal)
                                                )
                                            );

                                            // Also check tags as fallback (common for products)
                                            const hasMetalInTags = productTags.some(tag => tag.includes(normalizedMetal));

                                            if (!hasMetalInVariants && !hasMetalInTags) return false;
                                        }

                                        if (styleFilter) {
                                            const normalizedStyle = normalize(styleFilter);
                                            const hasStyle = productTags.some(tag => tag.includes(normalizedStyle)) ||
                                                productTitle.includes(normalizedStyle);
                                            if (!hasStyle) return false;
                                        }

                                        if (bandFilter) {
                                            const normalizedBand = normalize(bandFilter);
                                            const hasBand = productTags.some(tag => tag.includes(normalizedBand)) ||
                                                productTitle.includes(normalizedBand) ||
                                                product.variants?.nodes?.some(variant =>
                                                    variant.selectedOptions?.some(option =>
                                                        option.name.toLowerCase().includes('band') &&
                                                        normalize(option.value).includes(normalizedBand)
                                                    )
                                                );
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

                                        // Stone Type filter (single-select - product must have variant with selected stone type)
                                        if (stoneFilter && stoneFilter !== 'any') {
                                            const normalizedStone = normalize(stoneFilter);
                                            const hasStoneType = product.variants?.nodes?.some(variant => {
                                                const hasStoneOption = variant.selectedOptions?.some(option =>
                                                    option.name.toLowerCase().includes('stone') &&
                                                    normalize(option.value).includes(normalizedStone)
                                                );

                                                // Check if any option value contains the stone type (e.g., "Lab Grown Diamond" in variant title)
                                                const hasStoneInValue = variant.selectedOptions?.some(option =>
                                                    normalize(option.value).includes(normalizedStone)
                                                );

                                                return hasStoneOption || hasStoneInValue;
                                            }) || productTags.some(tag => tag.includes(normalizedStone));

                                            if (!hasStoneType) return false;
                                        }

                                        return true;
                                    });

                                    return (
                                        <>
                                            {filteredProducts.length > 0 ? (
                                                <div className="products-grid">
                                                    {filteredProducts.map((product, index) => {
                                                        const cleanTitle = product.title.split(/\s*[-–—]\s*/)[0];
                                                        return (
                                                            <ProductItem
                                                                key={product.id}
                                                                product={{ ...product, title: cleanTitle }}
                                                                loading={index < 24 ? 'eager' : undefined}
                                                                selectedVariantOptions={selectedVariantOptions}
                                                                basePath="/engagement-rings"
                                                                showGemstoneOptions={showGemstoneOptions}
                                                            />
                                                        );
                                                    })}
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



                <Analytics.CollectionView
                    data={{
                        collection: {
                            id: collection.id,
                            handle: collection.handle,
                        },
                    }}
                />
            </section>
            <SplitBanner
                left={{
                    image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/a7413240007701cddc3906f9bad49bca.jpg?v=1777617975",
                    title: "Not in a hurry to find a ring?",
                    description: "Take your time with a custom-made engagement piece, designed with you at every step.",
                    linkText: "BEGIN THE PROCESS",
                    linkTo: "/engagement-rings?metal=platinum"
                }}
                right={{
                    image: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Copy_of_Holiday_Campaign_P2_Banner_Option_1_1000x1000.jpg?v=1762307138",
                    title: "Perfect for gifting.",
                    description: "Explore our ready-to-ship jewellery, including tennis bracelets, initial necklaces, and more.",
                    linkText: "SHOP GIFTS",
                    linkTo: "/collections/gifting"
                }}
            />
            {/* <div className='page-width'> */}
            <CollectionContentSection data={COLLECTION_CONTENT_SECTION} />
            <CollectionLinksSection data={COLLECTION_LINKS} />
            {/* </div> */}
            <VideoBanner
                desktopImage="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Thanasi_Home_Page_Select_Final-1_1600x1600.jpg?v=1767837146"
                desktopVideo="https://cdn.shopify.com/videos/c/o/v/7bdbff09baf64a3696bdc2af0c951747.mp4"
                heading="Find Your Perfect Ring"
                description="Explore handcrafted engagement rings that tell your story"
            />
            <div className="collection-faq-section">
                <ProductFAQ data={FAQ_DATA} />
            </div>
            <UvpIconFooter data={PRODUCT_UVPS} />

        </div >
    );
}


// Queries and Fragments
const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment EngagementRingsProductItem on Product {
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

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query EngagementRingsCollection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
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
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
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
          ...EngagementRingsProductItem
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

const COLLECTION_LINKS = [
    { label: "Round Engagement Rings", url: "/engagement-rings?shape=round" },
    { label: "Oval Engagement Rings", url: "/engagement-rings?shape=oval" },
    { label: "Radiant Engagement Rings", url: "/engagement-rings?shape=radiant" },
    { label: "Pear Engagement Rings", url: "/engagement-rings?shape=pear" },
    { label: "Emerald Engagement Rings", url: "/engagement-rings?shape=emerald" },
    { label: "Solitaire Engagement Rings", url: "/engagement-rings?style=solitaire" },
    { label: "Three Stone Engagement Rings", url: "/engagement-rings?style=trilogy" },
    { label: "Halo Engagement Rings", url: "/engagement-rings?style=halo" },
    { label: "Toi et Moi Engagement Rings", url: "/engagement-rings?style=toi-et-moi" }
];

const COLLECTION_CONTENT_SECTION = {
    sections: [
        {
            heading: "Ready-to-Ship Engagement Rings Start Your Forever Today",
            paragraphs: [
                `Short on time or ready to propose sooner? Discover our collection of ready-to-ship engagement rings, designed for life’s most meaningful moments. Featuring a curated range of timeless styles from classic solitaires to vintage-inspired halos, each piece is crafted to be both beautiful and instantly yours.`,
                `Made using premium materials and lab-grown gemstones, every Diamond ready-to-ship ring is thoughtfully handcrafted by our expert jewellers. Each design reflects the same level of care and craftsmanship as our made-to-order pieces.`,
                `Shop online across the US or visit one of our showrooms for a <a href="/visit" class="fancy">personalized design consultation</a>. <strong>However you choose, we’re here to help you begin your forever with the perfect ring.</strong>`
            ],
        },
        {
            heading: "Find the Ring That’s Ready for You",
            paragraphs: [
                `At Diamond, we create handcrafted engagement rings designed to celebrate your unique love story.`,
                `Our ready-to-ship collection allows you to explore, select, and receive a stunning engagement ring within days. Skip the wait and focus on what matters most your proposal.`,
                `Whether you prefer a refined <a href="/engagement-rings?style=solitaire&metal=18k-yellow-gold" class="fancy">solitaire</a> or a detailed <a href="/engagement-rings?style=halo&metal=18k-yellow-gold" class="fancy">halo</a> design, our experienced team is here to guide you from your first step to the final detail.`,
                `Each ring is crafted using conflict-free and <a href="/carbon-neutral" class="fancy">carbon neutral</a> lab-grown diamonds, moissanite, or sapphires, combining beauty with responsibility.`,
                `Need assistance? <a href="/contact" class="fancy">Contact us</a> or book an in-store consultation with our specialists to find your perfect ring.`
            ],
        },
        {
            heading: "Why Choose Diamond",
            paragraphs: [
                `<strong>Worldwide Express Shipping</strong> Wherever you are, we ensure your ring arrives quickly and securely with global shipping across the <a href="/shipping" class="fancy">US and internationally</a>.`,
                `<strong>Free Resizing</strong> Enjoy <a href="/free-resizing" class="fancy">complimentary resizing</a> on all engagement rings for the perfect fit.`,
                `<strong>Lifetime Warranty</strong> Every ring is backed by our lifetime <a href="/warranty" class="fancy">manufacturing warranty</a> for complete peace of mind.`,
                `<strong>Custom Design Options</strong> Looking for something unique? Explore our <a href="/custom-rings" class="fancy">custom design service</a> to create a one-of-a-kind piece.`,
                `<strong>Expertly Crafted</strong> Designed in Melbourne and handcrafted with precision by skilled jewellers.`,
                `<strong>Ethically Sourced</strong> Choose from moissanite, sapphires, and lab-grown diamonds, including <a href="/engagement-rings" class="fancy">sapphire engagement rings</a>, all responsibly sourced.`,
                `<strong>Sustainable Impact</strong> We offset gemstone carbon footprints and plant a <a href="/diamond-initiatives" class="fancy">tree</a> for every ring sold.`,
                `<strong>Personalized Experience</strong> From classic <a href="/engagement-rings?style=solitaire" class="fancy">solitaire designs</a> to intricate styles, our specialists help bring your vision to life.`
            ],
        },
    ],
};
const PRODUCT_UVPS = [
    {
        link: '/shipping',
        label: 'Global Insured<br>Delivery',
        svg: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    `,
    },
    {
        link: '/free-resizing',
        label: 'Perfect Fit<br>Guarantee',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="5" /></svg>`,
    },
    {
        link: '/warranty',
        label: 'Lifetime<br>Craftsmanship',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l9 4.5v9l-9 4.5-9-4.5v-9z" /><path d="M12 9l.3 1.2 1.2.3-1.2.3-.3 1.2-.3-1.2-1.2-.3 1.2-.3z" fill="currentColor" stroke="none"/></svg>`,
    },
    {
        link: '/engagement-rings?metal=yellow_gold',
        label: 'Bespoke Design<br>Service',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7" /><path d="M21 21l-6-6" /><circle cx="10" cy="10" r="2" stroke-width="1"/></svg>`,
    },
];
const FAQ_DATA = [
    {
        question: "ARE ENGAGEMENT RINGS CUSTOMIZABLE AT Diamond?",
        answer: `Absolutely. Diamond specializes in custom-designed engagement rings. Choose from a range of center stones, side stones, and precious metals, as well as various settings from three-stone, to halo, and more. Our experienced engagement ring specialists will guide you through the design process to create the perfect engagement ring that reflects your unique personal style.`
    },
    {
        question: "DO MEN WEAR ENGAGEMENT RINGS?",
        answer: `Yes, men can and do wear engagement rings. Though traditionally worn by women, the decision to wear an engagement ring is entirely up to the individual. Regardless of gender, an engagement ring symbolises the love and commitment one has for another.`
    },
    {
        question: "ARE ENGAGEMENT RINGS AND WEDDING RINGS THE SAME?",
        answer: `An engagement ring typically features a prominent stone and is presented during a marriage proposal, while a wedding ring has a simpler design and is exchanged during a wedding ceremony. Traditionally, an engagement ring is worn by one partner as a symbol of the promise to marry, while wedding rings are worn by both spouses as a sign of their union. For more information, explore our <a href="/education/wedding-ring-guidance">wedding ring guide</a>.`
    },
    {
        question: "HOW DO I WEAR MY ENGAGEMENT AND WEDDING RINGS TOGETHER?",
        answer: `The way you wear your engagement and wedding rings together depends on the design of each ring. When selecting your wedding ring, it is important to consider the design of your engagement ring to ensure your wedding ring will both complement and sit comfortably alongside your engagement ring. If you'd like some guidance, feel free to <a href="/visit">book a consultation</a> with our friendly client service team or learn more from our guide on how to find the perfect wedding band pairing.`
    },
    {
        question: "WHAT GEMSTONES DO YOU OFFER IN ENGAGEMENT RINGS FOR WOMEN?",
        answer: `We offer a selection of ethically sourced gemstones in our engagement rings for women and in our men's engagement rings, including: • <a href="/engagement-rings/lab-grown-diamond">Lab-grown diamonds</a> • <a href="/engagement-rings/moissanite">Moissanite</a> • <a href="/engagement-rings/sapphire">Lab-grown sapphires</a> Each gemstone is chosen for its quality and sustainability, ensuring your ring is both beautiful and responsibly made. Whether you're after a <a href="/engagement-rings/sapphire">scarlet red lab-grown sapphire</a> that mimics the look of a ruby engagement ring or a <a href="/engagement-rings/moissanite">clover green lab-grown moissanite</a> that resembles an emerald, begin your journey today by exploring our wide range of engagement rings. For more information and guidance on which gemstone is best for you, dive into our <a href="/education/gemstone-guidance">gemstone guide</a>.`
    },
    {
        question: "HOW MUCH DO ENGAGEMENT RINGS COST?",
        answer: `The price of engagement rings at Diamond varies based on factors such as the chosen gemstone, carat weight, and setting design. We offer a range of designs to suit different budgets, and our team can help you find or create a ring that meets your preferences and price point.`
    },
    {
        question: "HOW DO I CARE FOR MY DIAMOND ENGAGEMENT RING?",
        answer: `To maintain the brilliance of your diamond engagement ring: • Clean it regularly with mild soapy water and a soft brush. • Avoid exposing it to harsh chemicals or abrasive materials. • Store it separately to prevent scratches. • Schedule periodic professional cleanings and inspections. Proper care will keep your ring looking its best for years to come. For more information, check out our ring care and ring cleaning guides.`
    },
    {
        question: "HOW DO I DESIGN A CUSTOM ENGAGEMENT RING?",
        answer: `Our warm, helpful client service team is available to assist you on your journey to creating your own unique engagement ring. Whether you have a custom design already in mind or would simply like to make a few adjustments to an existing design, we are ready to assist you through the process of designing your own custom engagement ring.`
    },
    {
        question: "WHAT METAL OPTIONS ARE AVAILABLE FOR MY WEDDING AND ENGAGEMENT RINGS?",
        answer: `Diamond offers a variety of precious metal options for your wedding and engagement rings, including yellow gold, white gold, and platinum. Our team can help you choose the best metal to complement your chosen center stone and desired design.`
    },
    {
        question: "WHAT IS THE LEAD TIME FOR A CUSTOM DIAMOND ENGAGEMENT RING?",
        answer: `The lead time for a custom diamond engagement ring varies depending on the complexity of the design. Our team will provide you with an estimated completion date once your design is finalized. The crafting stage takes 8-10 weeks, and for all general timeframe information, please visit our crafting timeframes page.`
    },
    {
        question: "Can I see your engagement ring collection in person?",
        answer: `Yes, we invite you to visit our showrooms to view our complete range of gold engagement rings and other fine jewelry. We have a wide variety of engagement ring styles in-store, including some of our most popular diamond engagement rings, rose gold engagement rings and sapphire engagement rings. You can also browse our online ring builder page to explore our collection and start designing your perfect diamond ring.`
    },
    {
        question: "IS RESIZING FREE?",
        answer: `Yes, we offer <a href="/free-resizing">complimentary resizing</a> for all our engagement rings. If your ring doesn't fit perfectly, simply contact us, and we'll adjust it to ensure a comfortable fit.`
    },
    {
        question: "DO ENGAGEMENT RINGS COME WITH A WARRANTY?",
        answer: `All gold and platinum jewelry from Diamond comes with a <a href="/warranty">lifetime manufacturing warranty</a>. This warranty covers any defects in materials or workmanship, giving you peace of mind that your ring is crafted to the highest standards.`
    }
];
