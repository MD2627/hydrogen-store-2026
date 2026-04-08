import { redirect, useLoaderData, useSearchParams } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { getPaginationVariables, Analytics, Pagination } from '@shopify/hydrogen';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductItem } from '~/components/ProductItem';
import { WeddingCollectionFilters } from '~/components/WeddingCollectionFilters';
import { CollectionBanner } from '~/components/CollectionBanner';
import { CollectionContentSection } from '~/components/CollectionContentSection';
import { ProductFAQ } from '~/components/ProductFAQ';
import { BackToFiltersSticky } from '~/components/BackToFiltersSticky';
import { UvpIconFooter } from '~/components/UvpIconFooter';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
    return [{ title: `Hydrogen | ${data?.collection?.title ?? 'Wedding'} Collection` }];
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
    const { storefront } = context;
    const url = new URL(request.url);

    // Get active tab from URL, default to 'women'
    const activeTab = url.searchParams.get('tab') || 'women';
    const handle = activeTab === 'men' ? 'wedding-rings-men' : 'wedding-rings-women';

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

    // Handle sorting
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

    // AUTO-SELECT LOGIC: If no 'metal' param in URL, select first available Metal Type
    if (!url.searchParams.has('metal')) {
        const metalFilter = availableFilters.find(f => f.label === 'Metal Type');
        if (metalFilter && metalFilter.values.length > 0) {
            // Get the metal label - prioritize Platinum
            const platinumOption = metalFilter.values.find(v => v.label.toLowerCase() === 'platinum');
            const targetMetal = platinumOption ? platinumOption.label : metalFilter.values[0].label;

            // Format to lowercase kebab-case (clean URL format)
            const formattedMetal = targetMetal.toLowerCase().replace(/\s+/g, '-');

            // Update URL and redirect
            url.searchParams.set('metal', formattedMetal);
            throw redirect(url.pathname + url.search);
        }
    }

    return {
        collection,
        availableFilters,
        filters: {},
    };
}

function loadDeferredData({ context }) {
    return {};
}

export default function WeddingCollection() {
    const { collection, availableFilters } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const sortDropdownRef = useRef(null);
    const filtersRef = useRef(null);

    // Get active tab from URL
    const activeTab = searchParams.get('tab') || 'women';

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

    // Handle tab change
    const handleTabChange = (tab) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', tab);
        // Clear filters when switching tabs
        newParams.delete('metal');
        newParams.delete('shape');
        newParams.delete('style');
        newParams.delete('band');
        newParams.delete('profile');
        setSearchParams(newParams);
    };

    // Extract filter parameters from URL
    const styleFilter = searchParams.get('style');
    const metalFilters = searchParams.getAll('metal');
    const activeMetal = metalFilters.length > 0 ? metalFilters[metalFilters.length - 1] : null; // Use LAST metal for display priority

    // Filter products based on URL parameters (Client-side filtering logic)
    const allProducts = collection.products?.nodes || [];
    const filteredProducts = allProducts.filter(product => {
        const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');

        const productTags = product.tags?.map(tag => normalize(tag)) || [];
        const productTitle = normalize(product.title);

        // Style filter (single-select)
        if (styleFilter) {
            const normalizedStyle = normalize(styleFilter);
            const hasStyle = productTags.some(tag => tag.includes(normalizedStyle)) ||
                productTitle.includes(normalizedStyle);
            if (!hasStyle) return false;
        }

        // Metal filter (multi-select - product must match at least one selected metal)
        if (metalFilters.length > 0) {
            const hasAnyMetal = metalFilters.some(metalFilter => {
                const normalizedMetal = normalize(metalFilter);
                return product.variants?.nodes?.some(variant =>
                    variant.selectedOptions?.some(option =>
                        option.name.toLowerCase().includes('metal') &&
                        normalize(option.value).includes(normalizedMetal)
                    )
                );
            });
            if (!hasAnyMetal) return false;
        }

        return true;
    });

    // Sort products to prioritize those with the selected metal as their primary variant
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (metalFilters.length === 0) return 0; // No sorting if no metal filter

        const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');
        const targetMetal = normalize(metalFilters[metalFilters.length - 1]); // Use LAST selected metal for sorting

        // Check if product's FIRST variant matches the target metal
        const aFirstVariantMatches = a.variants?.nodes?.[0]?.selectedOptions?.some(option =>
            option.name.toLowerCase().includes('metal') &&
            normalize(option.value) === targetMetal
        );

        const bFirstVariantMatches = b.variants?.nodes?.[0]?.selectedOptions?.some(option =>
            option.name.toLowerCase().includes('metal') &&
            normalize(option.value) === targetMetal
        );

        // Products with matching first variant come first
        if (aFirstVariantMatches && !bFirstVariantMatches) return -1;
        if (!aFirstVariantMatches && bFirstVariantMatches) return 1;
        return 0;
    });

    // Extract active filters and find matching variant options for display & URL
    let selectedVariantOptions = [];

    // Helper to normalize filter values for comparison
    const normalizeFilterValue = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Map URL filter values to actual variant option values
    if (activeMetal) {
        // Metal filter mapping - convert kebab-case URL to proper variant option format
        const metalMap = {
            'platinum': 'Platinum',
            '18k-yellow-gold': '18K Yellow Gold',
            '18kyellowgold': '18K Yellow Gold',
            '18k-rose-gold': '18K Rose Gold',
            '18krosegold': '18K Rose Gold',
            'rose-gold': '18K Rose Gold',
            'rosegold': '18K Rose Gold',
            '18k-white-gold': '18K White Gold',
            '18kwhitegold': '18K White Gold',
            'white-gold': '18K White Gold',
            'whitegold': '18K White Gold',
            'yellow-gold': '18K Yellow Gold',
            'yellowgold': '18K Yellow Gold',
            '18k-yellow-gold-platinum': '18k Yellow Gold Platinum',
            '18kyellowgoldplatinum': '18k Yellow Gold Platinum',
            '18k-rose-gold-platinum': '18k Rose Gold Platinum',
            '18krosegoldplatinum': '18k Rose Gold Platinum',
            '18k-yellow-gold-18k-white-gold': '18k Yellow Gold 18k White Gold',
            '18kyellowgold18kwhitegold': '18k Yellow Gold 18k White Gold',
            '18k-rose-gold-18k-white-gold': '18k Rose Gold 18k White Gold',
            '18krosegold18kwhitegold': '18k Rose Gold 18k White Gold',
        };

        const normalizedMetal = normalizeFilterValue(activeMetal);
        const metalValue = metalMap[normalizedMetal] || metalMap[activeMetal] || activeMetal;

        selectedVariantOptions.push({ name: 'Metal Type', value: metalValue });
    }


    if (styleFilter) {
        // Style filter - capitalize first letter of each word
        const styleValue = styleFilter.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        selectedVariantOptions.push({ name: 'Setting Style', value: styleValue });
    }

    if (selectedVariantOptions.length === 0) {
        selectedVariantOptions = null;
    }

    return (
        <div className="collection">
            <CollectionBanner collection={collection} />
            <div className='page-width'>

                {/* Tab Navigation */}
                <div className="collection-tabs">
                    <button
                        className={`tab-btn f-11 f-m-11 w-400 ff-n l-h-1 black-color ${activeTab === 'women' ? 'active' : ''}`}
                        onClick={() => handleTabChange('women')}
                    >
                        WOMEN
                    </button>
                    <button
                        className={`tab-btn f-11 f-m-11 w-400 ff-n l-h-1 black-color ${activeTab === 'men' ? 'active' : ''}`}
                        onClick={() => handleTabChange('men')}
                    >
                        MEN
                    </button>
                </div>
            </div>

            <div className="collection-content">
                <div className='page-width'>
                    <aside className="collection-filters-sidebar wedding-filters" ref={filtersRef}>
                        <WeddingCollectionFilters collectionType={activeTab} />
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
                                            border: '0px solid transparent',
                                            cursor: 'pointer',
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
                        <Pagination connection={collection.products}>
                            {({ nodes, isLoading, NextLink }) => {
                                // Apply client-side filtering to the paginated nodes
                                const filteredProducts = nodes.filter(product => {
                                    const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');
                                    const productTags = product.tags?.map(tag => normalize(tag)) || [];
                                    const productTitle = normalize(product.title);

                                    if (styleFilter) {
                                        const normalizedStyle = normalize(styleFilter);
                                        const hasStyle = productTags.some(tag => tag.includes(normalizedStyle)) ||
                                            productTitle.includes(normalizedStyle);
                                        if (!hasStyle) return false;
                                    }

                                    if (metalFilters.length > 0) {
                                        const hasAnyMetal = metalFilters.some(metalFilter => {
                                            const normalizedMetal = normalize(metalFilter);
                                            return product.variants?.nodes?.some(variant =>
                                                variant.selectedOptions?.some(option =>
                                                    option.name.toLowerCase().includes('metal') &&
                                                    normalize(option.value).includes(normalizedMetal)
                                                )
                                            );
                                        });
                                        if (!hasAnyMetal) return false;
                                    }

                                    return true;
                                });

                                // Sort products
                                const sortedProducts = [...filteredProducts].sort((a, b) => {
                                    if (metalFilters.length === 0) return 0;
                                    const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');
                                    const targetMetal = normalize(metalFilters[metalFilters.length - 1]); // Use LAST metal

                                    const aFirstVariantMatches = a.variants?.nodes?.[0]?.selectedOptions?.some(option =>
                                        option.name.toLowerCase().includes('metal') &&
                                        normalize(option.value) === targetMetal
                                    );

                                    const bFirstVariantMatches = b.variants?.nodes?.[0]?.selectedOptions?.some(option =>
                                        option.name.toLowerCase().includes('metal') &&
                                        normalize(option.value) === targetMetal
                                    );

                                    if (aFirstVariantMatches && !bFirstVariantMatches) return -1;
                                    if (!aFirstVariantMatches && bFirstVariantMatches) return 1;
                                    return 0;
                                });

                                return (
                                    <>
                                        {sortedProducts.length > 0 ? (
                                            <div className="products-grid">
                                                {sortedProducts.map((product, index) => (
                                                    <ProductItem
                                                        key={product.id}
                                                        product={product}
                                                        loading={index < 24 ? 'eager' : undefined}
                                                        selectedVariantOptions={selectedVariantOptions}
                                                        basePath="/wedding"
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
                                        <CollectionContentSection data={COLLECTION_CONTENT_SECTION} />
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
            <BackToFiltersSticky targetRef={filtersRef} />
            <div className="collection-faq-section">
                <ProductFAQ data={FAQ_DATA} />
            </div>
            <UvpIconFooter data={PRODUCT_UVPS} />
        </div>
    );
}

// Queries and Fragments
const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment WeddingProductItem on Product {
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
  query WeddingCollection(
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
          ...WeddingProductItem
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

const COLLECTION_CONTENT_SECTION = {
    sections: [
        {
            heading: "WEDDING RINGS & BANDS — EXQUISITELY CRAFTED, FOR HER",
            paragraphs: [
                `Choosing a wedding ring is a moment filled with emotion. It is a decision that marks one of life’s most meaningful milestones. More than just jewelry, a wedding ring is a symbol of love, unity, and lifelong commitment, worn every day as a reminder of the bond you share. At Cullen, we understand the significance of this choice. That’s why we offer a collection of made-to-order women’s wedding rings, giving you the flexibility to find a ring that perfectly suits your timeline, style, and lifestyle.`,
                `For those who wish to create something truly personal, our made-to-order designs provide the opportunity to customize every detail. From minimalist elegance to diamond-studded brilliance, every wedding ring is crafted with meticulous attention to detail by our expert in-house jewelers using premium metals and lab grown gemstones, taking a conscious approach to craftsmanship that minimizes waste.`,
                `Explore our collection of women’s wedding rings in the US. Start your journey online, or <a href="/visit" class="fancy">book a personalized consultation</a> with our friendly team.`
            ],
        },
        {
            heading: "SYMBOLICALLY RICH, EXQUISITELY CRAFTED",
            paragraphs: [
                `Cullen specializes in custom-made women’s wedding rings designed to honour your commitment and celebrate your wedding day. We combine the knowledge of experienced in-house jewelers and an exceptional client service team that can help guide you through every step of choosing your wedding ring, from band thickness to personalized details like engravings.`,
                `Need help choosing your dream wedding ring in the US? <a href="/visit" class="fancy">Book a virtual or in-person appointment</a> to talk to one of our friendly wedding ring specialists.`
            ],
        },
        {
            heading: "WHY CULLEN",
            paragraphs: [
                `<strong>Worldwide Express Shipping</strong> No matter where you are in the world, your dream ring will go the distance. We proudly ship our wedding and engagement rings across the United States and internationally, ensuring your ready-to-ship engagement ring arrives safely and swiftly.`,
                `<strong>Free Resizing</strong> We offer <a href="/free-resizing" class="fancy">free resizing</a> on all engagement rings to ensure the perfect fit, whether you've chosen one of our ready-to-ship engagement rings or something uniquely your own.`,
                `<strong>Lifetime Warranty</strong> Our engagement rings are built to last a lifetime. Each piece is backed by our lifetime manufacturing <a href="/warranty" class="fancy">warranty</a>, giving you complete peace of mind.`,
                `<strong>Free Ring Customization</strong> From unique engagement ring designs to personalized band details, we offer complimentary customization so you can craft a ring that's truly one of a kind.`,
                `<strong>Handcrafted in Australia</strong> Every ring — including our ready-to-ship engagement rings — is designed and handcrafted in our Melbourne workshop with exceptional attention to detail.`,
                `<strong>Conflict-Free, Sustainable Materials</strong> We offer a variety of unique options — from ready-to-ship <a href="/engagement-rings/lab-grown-diamond" class="fancy">lab diamond engagement rings</a> to <a href="/engagement-rings/sapphire" class="fancy">sapphire engagement rings</a> — all ethically lab grown and sustainably sourced.`,
                `<strong>Carbon Neutral & One Tree Planted Partner</strong> We offset the carbon footprint of every order and plant a tree for each ring sold, supporting global reforestation.`,
                `<strong>Custom Design Specialists</strong> Whether you're interested in <a href="/engagement-rings/solitaire" class="fancy">solitaire oval engagement rings</a> or striking <a href="/engagement-rings/emerald-cut" class="fancy">emerald cut engagement rings</a>, our team specializes in creating custom pieces that reflect your personal style.`
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
        question: "WHAT IS THE DIFFERENCE BETWEEN A WEDDING RING AND A WEDDING BAND?",
        answer: `There’s no major difference; the terms are often used interchangeably. Traditionally, “band” refers to a simpler, unadorned style, while “ring” can describe designs with diamonds, moissanite, or intricate detailing. At Cullen, we offer both classic bands and more decorative women’s wedding rings to suit every style.`
    },
    {
        question: "CAN I CUSTOMIZE MY WEDDING RING?",
        answer: `Yes. We offer customization options ranging from small adjustments to fully custom designs. You can choose your preferred width, finish, stones, and even engravings, ensuring your wedding ring feels uniquely yours. For custom wedding ring guidance from our friendly team feel free to contact us <a href="/contact">here</a>`
    },
    {
        question: "WHAT METALS ARE AVAILABLE FOR WOMEN’S WEDDING RINGS?",
        answer: `Our women’s wedding rings are crafted from premium precious metals such as platinum, yellow gold, white gold, and rose gold. Each metal is chosen for its beauty, durability, and comfort for everyday wear.`
    },
    {
        question: "CAN I ADD DIAMONDS OR GEMSTONES TO MY WEDDING RING?",
        answer: `Absolutely. Many women choose to personalize their wedding rings with lab grown diamonds, moissanite, or sapphires for extra sparkle or a personal touch. Our helpful team can help you design a ring that balances elegance and durability.`
    },
    {
        question: "HOW LONG DOES IT TAKE TO MAKE A WEDDING RING?",
        answer: `Production times can vary, but generally it takes 8 weeks for a custom or made-to-order wedding ring to be crafted. We recommend ordering early to ensure your ring is ready for your wedding day. For more information about our crafting timeframes, learn more <a href="/crafting-timeframes">here</a>.`
    },
    {
        question: "DO YOU OFFER MATCHING WEDDING RING SETS?",
        answer: `Yes. Many of our designs can be made as matching sets for couples, offering complementary styles that symbolize unity while reflecting each partner’s taste. Read more about matching sets <a href="/education/wedding-ring-guidance/bride-and-groom-wedding-ring-sets">here</a>.`
    },
    {
        question: "WILL MY WEDDING RING MATCH MY ENGAGEMENT RING?",
        answer: `Absolutely! Our expert team can help you design a wedding ring that perfectly complements your engagement ring, ensuring they sit beautifully flush together on your hand.`
    },
    {
        question: "CAN WEDDING RINGS BE RESIZED?",
        answer: `Yes, in most cases, wedding rings can be resized. Some designs with a full-eternity band cannot be resized, but our team will guide you through resizing options if your ring size changes over time.`
    },
    {
        question: "DOES MY WEDDING RING COME WITH A WARRANTY?",
        answer: `Yes. Every Cullen wedding ring is backed by a comprehensive <a href="/warranty">lifetime warranty</a>, which covers manufacturing faults. We also offer lifetime aftercare services, such as professional cleaning and inspection.`
    },
    {
        question: "HOW MUCH DO WOMEN’S WEDDING RINGS COST?",
        answer: `Prices vary depending on the metal, design and band thickness. We offer a range of options to suit different styles and budgets.`
    },
    {
        question: "HOW DO I CARE FOR MY WEDDING RING?",
        answer: `To keep your ring shining, clean it regularly with mild soap and warm water, and avoid harsh chemicals or abrasive surfaces. We also recommend bringing your ring in for periodic professional cleaning and inspection to maintain its brilliance and longevity. Read more in our ring care guide <a href="/education/ring-care-guidance">here</a>.`
    }
];