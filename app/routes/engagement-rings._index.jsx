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
            <div className="collection-content">
                <div className='page-width'>
                    <aside className="collection-filters-sidebar engagement-collection-filters">
                        <CustomCollectionFilters additionalFilters={[STONE_TYPE_FILTER]} />
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

                <Analytics.CollectionView
                    data={{
                        collection: {
                            id: collection.id,
                            handle: collection.handle,
                        },
                    }}
                />
            </div>
            <SplitBanner
                left={{
                    image: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Holiday_Campaign_Beach_9_Test_5_2000x2000.jpg?v=1758263068",
                    title: "Not in a hurry to find a ring?",
                    description: "Take your time with a custom-made engagement piece, designed with you at every step.",
                    linkText: "BEGIN THE PROCESS",
                    linkTo: "/engagement?metal=platinum"
                }}
                right={{
                    image: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Copy_of_Holiday_Campaign_P2_Banner_Option_1_1000x1000.jpg?v=1762307138",
                    title: "Made to be gifted.",
                    description: "Discover our ready-to-ship tennis bracelets, initial bezel necklaces, and more.",
                    linkText: "SHOP NOW",
                    linkTo: "/collections/gifting"
                }}
            />
            <div className='page-width'>
                <CollectionContentSection data={COLLECTION_CONTENT_SECTION} />
                <CollectionLinksSection data={COLLECTION_LINKS} />
            </div>
            <VideoBanner
                desktopImage="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Thanasi_Home_Page_Select_Final-1_1600x1600.jpg?v=1767837146"
                desktopVideo="https://cdn.shopify.com/videos/c/o/v/bc9828414ce64185b90c71128e7fbf02.mp4"
                heading="Discover Our Collection"
                description="Explore our handcrafted engagement rings"
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
            heading: "Ready to Ship Engagement Rings — Forever Starts Now",
            paragraphs: [
                `Short on time or simply can’t wait to propose? Why wait? Enjoy your moment of love now with our wide collection of ready-to-ship engagement rings. Available in a curated selection of timeless designs, including solitaires, halos and vintage-inspired styles, our ready-to-ship range allows you to find a piece that is both beautiful and meaningful — without the wait.`,
                `Using premium materials and lab grown gemstones, every Cullen ready-to-ship engagement ring is designed and handcrafted by our expert jewelers. Crafted to perfection, each piece is brought to life with the same care and intention as each made-to-order ring.`,
                `Explore our ready-to-ship collection in the US online or begin your journey in one of our showrooms with a <a href="/visit" class="fancy">personalized design consultation</a> — <strong>whatever the process, we're here to help you start your forever with the ring of your dreams.</strong>`
            ],
        },
        {
            heading: "Your Perfect Engagement Ring is Ready-to-Ship",
            paragraphs: [
                `Cullen specializes in handcrafted engagement rings, made to mark one of life’s most meaningful moments in a style unique to your love.`,
                `Our extensive collection of ready-to-ship engagement rings means you can explore, purchase, and receive a beautiful and meaningful ring within a matter of days. Skip the queue and focus on the proposal now that you have the engagement ring of your dreams, ready and waiting to be worn by the love of your life.`,
                `Whether you’re after a sleek <a href="/engagement?style=solitaire&metal=18k-yellow-gold" class="fancy">solitaire</a> or a vintage-inspired <a href="/engagement?style=halo&metal=18k-yellow-gold" class="fancy">halo</a> of diamonds, our experienced and warm, knowledgeable client service team can help guide you through every step of the journey — from your first consultation to the final polish.`,
                `Every ready-to-ship engagement ring is crafted using conflict-free and <a href="/carbon-neutral" class="fancy">carbon neutral</a> lab grown diamonds, moissanite, or sapphires, so you can feel confident that your ring is as responsible as it is exquisite to look at.`,
                `Need a little guidance? Don’t hesitate to <a href="/contact" class="fancy">contact us</a> or book an in-person appointment with one of our friendly engagement ring specialists to begin the journey to finding your dream piece in the US.`
            ],
        },
        {
            heading: "Why Cullen",
            paragraphs: [
                `<strong>Worldwide Express Shipping</strong> No matter where you are in the world, your dream ring will go the distance. We proudly ship our ready to ship engagement rings across the <a href="/shipping" class="fancy">US and internationally</a>, ensuring your handcrafted piece arrives safely and swiftly.`,
                `<strong>Free Resizing</strong> We offer <a href="/free-resizing" class="fancy">free resizing</a> on all engagement rings to ensure the perfect fit, whether you've chosen one of our ready-to-ship diamond engagement rings or something uniquely your own.`,
                `<strong>Lifetime Warranty</strong> Our beautiful ready to ship engagement rings are built to last a lifetime. Each piece is backed by our lifetime manufacturing <a href="/warranty" class="fancy">warranty</a>, giving you complete peace of mind.`,
                `<strong>Tailored Ring Customization</strong> If ready to ship isn’t what you are looking for, we also offer an extensive <a href="/custom-rings" class="fancy">customization</a> service so you can craft a ring that’s truly one of a kind.`,
                `<strong>Thoughtfully Designed in Melbourne, Australia</strong> Every ring — including our ready to ship engagement rings, is crafted by our expert jewellers with exceptional attention to detail.`,
                `<strong>Conflict-Free, Consciously Crafted</strong> We offer a variety of unique options, from moissanite radiant cut engagement rings to colored <a href="/engagement-rings/sapphire" class="fancy">sapphire</a> engagement rings, all ready to ship and thoughtfully curated for your forever ring.`,
                `<strong>Carbon Neutral Gemstones & Trees For The Future</strong> We offset the carbon footprint of all of our gemstones and plant a <a href="/cullen-initiatives" class="fancy">tree</a> for each ring sold, supporting global reforestation.`,
                `<strong>Custom Design Specialists</strong> Whether you're dreaming of <a href="/engagement-rings/ring-thea" class="fancy">solitaire radiant cut diamond engagement rings</a> or an elaborate halo of diamonds, our team specializes in creating jewelry that reflects your personal style.`
            ],
        },
    ],
};
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
const FAQ_DATA = [
    {
        question: "ARE ENGAGEMENT RINGS CUSTOMIZABLE AT CULLEN?",
        answer: `Absolutely. Cullen specializes in custom-designed engagement rings. Choose from a range of center stones, side stones, and precious metals, as well as various settings from three-stone, to halo, and more. Our experienced engagement ring specialists will guide you through the design process to create the perfect engagement ring that reflects your unique personal style.`
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
        answer: `The price of engagement rings at Cullen varies based on factors such as the chosen gemstone, carat weight, and setting design. We offer a range of designs to suit different budgets, and our team can help you find or create a ring that meets your preferences and price point.`
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
        answer: `Cullen offers a variety of precious metal options for your wedding and engagement rings, including yellow gold, white gold, and platinum. Our team can help you choose the best metal to complement your chosen center stone and desired design.`
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
        answer: `All gold and platinum jewelry from Cullen comes with a <a href="/warranty">lifetime manufacturing warranty</a>. This warranty covers any defects in materials or workmanship, giving you peace of mind that your ring is crafted to the highest standards.`
    }
];
