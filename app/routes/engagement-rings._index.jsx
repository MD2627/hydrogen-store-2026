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
                desktopImage="https://cdn.shopify.com/s/files/1/0610/2194/5934/files/new.jpg?v=1778041776"
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
            heading: "Lab-Grown Diamond Rings Crafted for Modern Love",
            paragraphs: [
                `Discover our stunning collection of lab-grown diamond rings designed to celebrate life’s most meaningful moments. From timeless solitaires to elegant hidden halo and vintage-inspired designs, each ring is thoughtfully created to combine beauty, brilliance, and everyday luxury.`,
                `Every Diamond ring is handcrafted using premium materials and ethically sourced lab-grown diamonds. Our expert jewellers focus on exceptional craftsmanship, ensuring every piece reflects lasting quality and refined detail.`,
                `Shop online or visit our showroom for a <a href="/visit" class="fancy">personalized consultation</a>. <strong>Whether you're planning a proposal or searching for your forever ring, we’re here to help you find the perfect design.</strong>`
            ],
        },
        {
            heading: "Find the Perfect Ring for Your Love Story",
            paragraphs: [
                `At Diamond, we create handcrafted engagement rings designed to reflect your unique style and story.`,
                `Explore a wide range of elegant ring styles featuring premium lab-grown diamonds in various shapes, settings, and precious metals. Whether you prefer classic simplicity or modern brilliance, our collection offers something truly special.`,
                `From timeless <a href="/engagement-rings?style=solitaire&metal=18k-yellow-gold" class="fancy">solitaire engagement rings</a> to detailed <a href="/engagement-rings?style=halo&metal=18k-yellow-gold" class="fancy">halo designs</a>, our team is here to guide you through every step of your journey.`,
                `Each ring is crafted using ethically sourced and <a href="/carbon-neutral" class="fancy">carbon neutral</a> lab-grown diamonds, combining exceptional beauty with sustainability and responsible craftsmanship.`,
                `Need help choosing your perfect ring? <a href="/contact" class="fancy">Contact our team</a> or book an in-store consultation for expert guidance and personalized support.`
            ],
        },
        {
            heading: "Why Choose Diamond",
            paragraphs: [
                `<strong>Premium Craftsmanship</strong> Every ring is handcrafted with precision using high-quality materials and expert attention to detail.`,
                `<strong>Ethically Created Diamonds</strong> Our lab-grown diamonds offer a sustainable and conflict-free alternative without compromising brilliance or quality.`,
                `<strong>Free Resizing</strong> Enjoy <a href="/free-resizing" class="fancy">complimentary resizing</a> on all eligible engagement rings for the perfect fit.`,
                `<strong>Lifetime Warranty</strong> Every piece is backed by our lifetime <a href="/warranty" class="fancy">manufacturing warranty</a> for added peace of mind.`,
                `<strong>Custom Ring Design</strong> Create something truly personal with our <a href="/custom-rings" class="fancy">custom design service</a> tailored to your vision.`,
                `<strong>Worldwide Shipping</strong> We offer secure and reliable <a href="/shipping" class="fancy">international shipping</a> so your ring arrives safely wherever you are.`,
                `<strong>Sustainable Luxury</strong> We focus on responsible sourcing and environmentally conscious practices across our jewelry collections.`,
                `<strong>Personalized Experience</strong> From selecting the perfect diamond shape to choosing your ideal setting, our specialists are here to guide you every step of the way.`
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
        question: "ARE LAB-GROWN DIAMOND RINGS CUSTOMIZABLE AT Diamond?",
        answer: `Absolutely. Diamond specializes in custom-designed lab-grown diamond rings. Choose from a variety of diamond shapes, carat sizes, precious metals, and setting styles including solitaire, halo, hidden halo, pavé, and three-stone designs. Our expert jewelry specialists will guide you through every step to create a ring that perfectly reflects your personal style and story.`
    },
    {
        question: "WHAT ARE LAB-GROWN DIAMONDS?",
        answer: `Lab-grown diamonds are real diamonds created in advanced laboratory environments using cutting-edge technology. They have the same physical, chemical, and optical properties as mined diamonds while offering a more sustainable and ethical alternative.`
    },
    {
        question: "ARE LAB-GROWN DIAMONDS REAL DIAMONDS?",
        answer: `Yes, lab-grown diamonds are 100% real diamonds. They are identical to natural diamonds in brilliance, hardness, and composition. The only difference is their origin — lab-grown diamonds are created above ground rather than mined from the earth.`
    },
    {
        question: "HOW DO I CHOOSE THE PERFECT LAB-GROWN DIAMOND RING?",
        answer: `Choosing the perfect ring depends on your preferred diamond shape, carat size, metal type, and setting style. Consider your lifestyle, design preferences, and budget when selecting your ring. Our team is always available to help you find or create the ideal piece for your special moment.`
    },
    {
        question: "WHAT DIAMOND SHAPES DO YOU OFFER?",
        answer: `We offer a wide range of popular diamond shapes including round, oval, pear, emerald, radiant, cushion, princess, marquise, asscher, and heart-shaped diamonds. Each shape offers its own unique brilliance and personality to suit different styles.`
    },
    {
        question: "HOW MUCH DO LAB-GROWN DIAMOND RINGS COST?",
        answer: `The price of lab-grown diamond rings depends on factors such as carat weight, diamond quality, setting style, and metal type. Lab-grown diamonds are generally more affordable than mined diamonds, allowing you to choose larger or higher-quality stones within your budget.`
    },
    {
        question: "HOW DO I CARE FOR MY LAB-GROWN DIAMOND RING?",
        answer: `To keep your ring sparkling beautifully: • Clean it regularly using mild soapy water and a soft brush. • Avoid harsh chemicals and abrasive surfaces. • Store your jewelry separately to prevent scratches. • Schedule occasional professional cleaning and inspections for long-term maintenance and shine.`
    },
    {
        question: "CAN I CREATE A CUSTOM ENGAGEMENT RING?",
        answer: `Yes. Our custom design service allows you to create a completely unique engagement ring tailored to your vision. Whether you want to modify an existing design or start from scratch, our team will help bring your dream ring to life.`
    },
    {
        question: "WHAT METAL OPTIONS ARE AVAILABLE?",
        answer: `We offer premium metal options including 14k and 18k yellow gold, white gold, rose gold, and platinum. Each metal offers a unique appearance and durability, helping you create the perfect ring combination for your style.`
    },
    {
        question: "HOW LONG DOES IT TAKE TO MAKE A CUSTOM RING?",
        answer: `Custom ring production times vary depending on the design complexity and stone selection. Typically, our handcrafted custom rings take approximately 2–6 weeks to complete after final design approval.`
    },
    {
        question: "CAN I VIEW YOUR RINGS IN PERSON?",
        answer: `Yes, you can visit our showroom to explore our engagement ring collection in person. Our collection includes a variety of lab-grown diamond rings, wedding bands, and fine jewelry styles to help you find the perfect piece.`
    },
    {
        question: "DO YOU OFFER RING RESIZING?",
        answer: `Yes, we offer complimentary resizing on eligible engagement rings to ensure the perfect fit. If adjustments are needed after purchase, simply contact our support team for assistance.`
    },
    {
        question: "DO YOUR RINGS COME WITH A WARRANTY?",
        answer: `Yes, all our fine jewelry pieces are backed by a lifetime manufacturing warranty covering craftsmanship defects. This ensures your ring is made to the highest quality standards and provides peace of mind with your purchase.`
    }
];
