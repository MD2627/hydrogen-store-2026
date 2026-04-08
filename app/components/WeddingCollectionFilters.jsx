import { useSearchParams, useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';

/**
 * Wedding collection filters component with Setting Style and Metal Types only
 */

const FILTER_ICONS = {
    "Pavé": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/band_type_pave.ClNwDIlc.svg?v=1768815069",
    "Curved": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/download_1.svg?v=1768815069",
    "Accents": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/band_type_accents.CHsaPypj.svg?v=1768815069",
    "Plain": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/download_2.svg?v=1768815068",
    "Open": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/download_3.svg?v=1768815069",

    // SETTING STYLE
    "Classic": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/download_4.svg?v=1768815324",
    "Multi-Tone Curved": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/download_5.svg?v=1768815324",
    "Hinged": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/download_6.svg?v=1768815324",

    "18k Yellow Gold Platinum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Platinum.svg?v=1768212724",
    "18k Rose Gold Platinum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Yellow_Gold.svg?v=1768212724",
    "18k Yellow Gold 18k White Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold.svg?v=1768212724",
    "18k Rose Gold 18k White Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_White_Gold.svg?v=1768212724",

    // METAL TYPE
    "Platinum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Platinum.svg?v=1768212724",
    "Yellow Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Yellow_Gold.svg?v=1768212724",
    "Rose Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold.svg?v=1768212724",
    "White Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_White_Gold.svg?v=1768212724",
    "Tantalum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Platinum.svg?v=1768212724",
    "Carbon Fibre": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_White_Gold.svg?v=1768212724",

    "High Set": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/download_14.svg?v=1769000588",
    "Low Set": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/setting_profile_low.BgTbkPCo.svg?v=1769000629"
};

const WOMEN_FILTER_CONFIG = [
    {
        key: 'style',
        label: 'Setting Style',
        layoutClass: 'filter-third-width',
        hasSelectAll: false,
        options: [
            { value: 'pave', label: 'Pavé' },
            { value: 'curved', label: 'Curved' },
            { value: 'accents', label: 'Accents' },
            { value: 'plain', label: 'Plain' },
            { value: 'open', label: 'Open' },
        ]
    },
    {
        key: 'metal',
        label: 'Metal Types',
        layoutClass: 'filter-full-width',
        hasSelectAll: false,
        options: [
            { value: 'platinum', label: 'Platinum' },
            { value: 'yellow-gold', label: 'Yellow Gold' },
            { value: 'rose-gold', label: 'Rose Gold' },
            { value: 'white-gold', label: 'White Gold' },
        ]
    }
];

const MEN_FILTER_CONFIG = [
    {
        key: 'style',
        label: 'Setting Style',
        layoutClass: 'filter-third-width',
        hasSelectAll: false,
        options: [
            { value: 'classic', label: 'Classic' },
            { value: 'multi-tone-curved', label: 'Multi-Tone Curved' },
            { value: 'hinged', label: 'Hinged' },
        ]
    },
    {
        key: 'metal',
        label: 'Metal Types',
        layoutClass: 'filter-full-width',
        hasSelectAll: true,
        options: [
            { value: 'platinum', label: 'Platinum' },
            { value: 'yellow-gold', label: 'Yellow Gold' },
            { value: 'rose-gold', label: 'Rose Gold' },
            { value: 'white-gold', label: 'White Gold' },
            { value: 'tantalum', label: 'Tantalum' },
            { value: 'carbon_fibre', label: 'Carbon Fibre' },
        ]
    }
];

// Helper Component for Scrollable Filter Section
function FilterSection({ filter, searchParams, handleFilterChange, handleClearSection, handleSelectAll }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [filter]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 250;
            const newScrollLeft = direction === 'left'
                ? scrollRef.current.scrollLeft - scrollAmount
                : scrollRef.current.scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });

            setTimeout(checkScroll, 350);
        }
    };

    const layoutClass = filter.layoutClass || 'filter-full-width';
    const currentValues = searchParams.getAll(filter.key);
    const isActive = currentValues.length > 0;

    // Check if all options are selected
    const allSelected = filter.options.every(opt => currentValues.includes(opt.value));

    return (
        <div className={`filter-section ${filter.label.toLowerCase().replace(' ', '-')}`}>
            <div className="filter-header-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 className="filter-title f-10 f-m-10 w-300 ff-n l-h-1-2 black-color">
                        {filter.label}
                        <span className="info-icon" title="More Info">
                            <svg className="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32">
                                <path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path>
                            </svg>
                        </span>
                    </h3>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {filter.hasSelectAll && (
                        <>
                            <button
                                type="button"
                                className="select-all-btn f-10 f-m-10 w-300 ff-n l-h-1-2 black-color"
                                onClick={() => handleSelectAll(filter.key, filter.options)}
                                disabled={allSelected}
                                style={{ opacity: allSelected ? 0.5 : 1 }}
                            >
                                Select All
                            </button>
                            {isActive && (
                                <button
                                    type="button"
                                    className="section-clear-btn f-10 f-m-10 w-300 ff-n l-h-1-2 black-color"
                                    onClick={() => handleClearSection(filter.key)}
                                    title="Reset"
                                >
                                    Reset ⟳
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            <div className="filter-scroll-wrapper">
                {canScrollLeft && (
                    <button
                        type="button"
                        className="filter-scroll-btn prev"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                )}

                <div
                    className="filter-options-content scroll-content"
                    ref={scrollRef}
                    onScroll={checkScroll}
                >
                    <div className="filter-options">
                        {filter.options.map((option) => {
                            const isSelected = currentValues.includes(option.value);
                            const iconUrl = FILTER_ICONS[option.label] || null;

                            return (
                                <label
                                    key={option.value}
                                    className={`filter-option ${isSelected ? 'selected' : ''} ${filter.label.toLowerCase().replace(' ', '-')}`}
                                >
                                    <input
                                        type="checkbox"
                                        name={`filter-${filter.key}`}
                                        value={option.value}
                                        checked={isSelected}
                                        onChange={() => handleFilterChange(filter.key, option.value, !filter.hasSelectAll)}
                                    />
                                    {iconUrl ? (
                                        <div className="filter-icon-container">
                                            <img src={iconUrl} alt={option.label} />
                                        </div>
                                    ) : (
                                        <div className="filter-icon-container" style={{ backgroundColor: '#f5f5f5' }}>
                                            <span style={{ fontSize: '10px' }}>{option.label[0]}</span>
                                        </div>
                                    )}
                                    <span className="label-text f-9 f-w-600 ff-n l-h-1">{option.label}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {canScrollRight && (
                    <button
                        type="button"
                        className="filter-scroll-btn next"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export function WeddingCollectionFilters({ collectionType = 'women' }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Select the appropriate filter configuration based on collection type
    const FILTER_CONFIG = collectionType === 'men' ? MEN_FILTER_CONFIG : WOMEN_FILTER_CONFIG;

    const handleFilterChange = (filterKey, optionValue, isSingleSelect = false) => {
        const newParams = new URLSearchParams(searchParams);
        const currentValues = newParams.getAll(filterKey);

        if (isSingleSelect) {
            // Single-select behavior (radio button style)
            if (currentValues.includes(optionValue)) {
                // Toggle off - remove the filter
                newParams.delete(filterKey);
            } else {
                // Set new value (replace all existing values)
                newParams.delete(filterKey);
                newParams.append(filterKey, optionValue);
            }
        } else {
            // Multi-select behavior (checkbox style)
            if (currentValues.includes(optionValue)) {
                // Remove this value
                newParams.delete(filterKey);
                currentValues.filter(v => v !== optionValue).forEach(v => {
                    newParams.append(filterKey, v);
                });
            } else {
                // Add this value
                newParams.append(filterKey, optionValue);
            }
        }

        // Clear pagination
        newParams.delete('cursor');
        newParams.delete('page');

        navigate({ search: newParams.toString() }, { replace: true, preventScrollReset: true });
    };

    const handleClearSection = (filterKey) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete(filterKey);
        newParams.delete('cursor');
        newParams.delete('page');
        navigate({ search: newParams.toString() }, { replace: true, preventScrollReset: true });
    };

    const handleSelectAll = (filterKey, options) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete(filterKey);

        // Add all options
        options.forEach(option => {
            newParams.append(filterKey, option.value);
        });

        newParams.delete('cursor');
        newParams.delete('page');
        navigate({ search: newParams.toString() }, { replace: true, preventScrollReset: true });
    };

    return (
        <div className="collection-filters">
            {FILTER_CONFIG.map((filter) => (
                <FilterSection
                    key={filter.key}
                    filter={filter}
                    searchParams={searchParams}
                    handleFilterChange={handleFilterChange}
                    handleClearSection={handleClearSection}
                    handleSelectAll={handleSelectAll}
                />
            ))}
        </div>
    );
}
