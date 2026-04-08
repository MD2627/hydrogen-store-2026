import { useSearchParams, useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';

/**
 * Custom collection filters component for Engagement Rings
 * - Removes "Setting Profile" filter
 */

export const FILTER_ICONS = {
    // SHAPES
    "Round": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Round.svg?v=1768210925",
    "Oval": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Oval.svg?v=1768210925",
    "Emerald": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Emerald.svg?v=1768210925",
    "Radiant": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Radiant.svg?v=1768210925",
    "Pear": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Pear.svg?v=1768210925",
    "Square Cushion": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Cushion.svg?v=1768210925",
    "Elongated Cushion": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Elongated_Cushion.svg?v=1768210925",
    "Elongated Hexagon": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Elongated_Hexagon.svg?v=1768210925",
    "Marquise": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Marquise.svg?v=1768210925",

    // METAL TYPE
    // "Platinum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Platinum.svg?v=1768212724",
    "14k-yellow-gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Yellow_Gold.svg?v=1768212724",
    "14k-white-gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_White_Gold.svg?v=1768212724",
    "14k-rose-gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold.svg?v=1768212724",
    // "18k Yellow Gold / Platinum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Yellow_Gold_Platinum.svg?v=1768212724",
    // "18k Rose Gold / Platinum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold_Platinum.svg?v=1768212724",
    // "18k Yellow Gold / 18k White Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Yellow_Gold_18k_White_Gold.svg?v=1768212724",
    // "18k Rose Gold / 18k White Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold_18k_White_Gold.svg?v=1768212724",

    // SETTING STYLE
    "Trilogy": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Trilogy.svg?v=1768213901",
    "Solitaire": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Solitaire.svg?v=1768213901",
    "Halo": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Halo.svg?v=1768213899",
    "Toi et Moi": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Toi_et_Moi.svg?v=1768213901",
    "Toi Et Moi": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Toi_et_Moi.svg?v=1768213901",
    "Bezel": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Bezel.svg?v=1768213901",
    "East West": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/East_West.svg?v=1768213901",

    // BAND TYPE
    "Plain": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Plain.svg?v=1768214236",
    "Pave": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Pave.svg?v=1768214237",
    "Accents": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Accents.svg?v=1768214236"
};

const FILTER_CONFIG = [
    {
        key: 'shape',
        label: 'Shape',
        layoutClass: 'filter-half-width',
        options: [
            { value: 'round', label: 'Round' },
            { value: 'oval', label: 'Oval' },
            { value: 'emerald', label: 'Emerald' },
            { value: 'radiant', label: 'Radiant' },
            { value: 'pear', label: 'Pear' },
            { value: 'cushion', label: 'Cushion' },
            { value: 'elongated-cushion', label: 'Elongated Cushion' },
            { value: 'elongated-hexagon', label: 'Elongated Hexagon' },
            { value: 'marquise', label: 'Marquise' },
        ]
    },
    {
        key: 'metal',
        label: 'Metal Type',
        layoutClass: 'filter-half-width',
        hasToggle: false,
        options: [
            { value: '14k-yellow-gold', label: '14K Yellow Gold', group: 'standard' },
            { value: '14k-white-gold', label: '14K White Gold', group: 'standard' },
            { value: '14k-rose-gold', label: '14K Rose Gold', group: 'standard' },
        ]
    },
    {
        key: 'style',
        label: 'Setting Style',
        layoutClass: 'filter-third-width',
        options: [
            { value: 'trilogy', label: 'Trilogy' },
            { value: 'solitaire', label: 'Solitaire' },
            { value: 'halo', label: 'Halo' },
            { value: 'toi-et-moi', label: 'Toi Et Moi' },
            { value: 'bezel', label: 'Bezel' },
            { value: 'east-west', label: 'East West' },
        ]
    },
    {
        key: 'band',
        label: 'Band Type',
        layoutClass: 'filter-third-width',
        options: [
            { value: 'plain', label: 'Plain' },
            { value: 'pave', label: 'Pave' },
            { value: 'accents', label: 'Accents' },
        ]
    }
];

// Helper Component for Scrollable Filter Section
function FilterSection({ filter, searchParams, metalTypeMode, setMetalTypeMode, handleFilterChange, handleClearSection }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            // Allow a small tolerance of 1px for rounding errors
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        if (!filter.isPillToggle) {
            checkScroll();
            window.addEventListener('resize', checkScroll);
            return () => window.removeEventListener('resize', checkScroll);
        }
    }, [metalTypeMode, filter]); // Re-check when content changes

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

            // Re-check buttons after scroll animation (approximate delay)
            setTimeout(checkScroll, 350);
        }
    };

    const layoutClass = filter.layoutClass || 'filter-full-width';
    const isActive = searchParams.has(filter.key);
    const currentValue = searchParams.get(filter.key);

    // Filter options check logic
    let displayOptions = filter.options;
    if (filter.key === 'metal' && filter.hasToggle) {
        displayOptions = filter.options.filter(opt =>
            opt.group === metalTypeMode || !opt.group
        );
    }

    if (filter.isPillToggle) {
        return (
            <div className={`filter-section ${filter.label.toLowerCase().replace(' ', '-')} ${layoutClass}`}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <h3 className="filter-title f-10 f-m-10 w-300 ff-n l-h-1-2 black-color" style={{ justifyContent: 'center' }}>
                        {filter.label}
                        <span className="info-icon" title="More Info">
                            <svg className="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32">
                                <path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path>
                            </svg>
                        </span>
                    </h3>
                </div>
                <div className="filter-pills-container" style={{ display: 'flex', justifyContent: 'center', gap: '0' }}>
                    {displayOptions.map((option) => {
                        const isAny = option.value === 'any';
                        const isSelected = currentValue === option.value || (isAny && !currentValue);

                        return (
                            <button
                                key={option.value}
                                type="button"
                                className={`filter-pill-btn f-10 f-m-10 w-300 ff-n l-h-1-2 black-color ${isSelected ? 'active' : ''}`}
                                onClick={() => handleFilterChange(filter.key, isAny ? null : option.value)}
                                style={{
                                    background: isSelected ? '#1a5f3b' : '#fff',
                                    color: isSelected ? '#fff' : '#1a1a1a',
                                }}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className={`filter-section ${filter.label.toLowerCase().replace(' ', '-')} ${layoutClass}`}>
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
                    {isActive && (
                        <button
                            type="button"
                            className="section-clear-btn f-10 f-m-10 w-300 ff-n l-h-1-2 black-color"
                            onClick={() => handleClearSection(filter.key)}
                        >
                            Clear
                        </button>
                    )}
                </div>

                {filter.hasToggle && (
                    <button
                        type="button"
                        className={`two-tone-toggle-btn f-10 f-m-10 w-300 ff-n l-h-1-2 black-color ${metalTypeMode === 'twotone' ? 'active' : ''}`}
                        onClick={() => setMetalTypeMode(prev => prev === 'standard' ? 'twotone' : 'standard')}
                    >
                        TWO TONE
                    </button>
                )}
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
                        {displayOptions.map((option) => {
                            const isSelected = currentValue === option.value;
                            const compositeKey = option.sublabel ? `${option.label} ${option.sublabel}` : option.label;
                            // Try value (hyphenated), then composite keys, then fallback to label
                            const iconUrl = FILTER_ICONS[option.value] ||
                                FILTER_ICONS[compositeKey] ||
                                FILTER_ICONS[compositeKey.replace('18K', '18k')] ||
                                FILTER_ICONS[option.label] ||
                                null;

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
                                        onChange={() => handleFilterChange(filter.key, option.value)}
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
                                    {option.sublabel && <span className="sub-label f-9 f-w-600 ff-n l-h-1">{option.sublabel}</span>}
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

export function EngagementRingFilters({ additionalFilters = [] }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [metalTypeMode, setMetalTypeMode] = useState('standard'); // 'standard' | 'twotone'

    const handleFilterChange = (filterKey, optionValue) => {
        const newParams = new URLSearchParams(searchParams);

        // Check if this value is already selected
        const currentValue = newParams.get(filterKey);

        if (optionValue === null || optionValue === 'any') {
            // Remove the filter entirely
            newParams.delete(filterKey);
        } else if (currentValue === optionValue) {
            // Toggle off - remove the filter
            newParams.delete(filterKey);
        } else {
            // Set new value (single select)
            newParams.set(filterKey, optionValue);
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

    const filtersToRender = [...additionalFilters, ...FILTER_CONFIG];

    return (
        <div className="collection-filters">
            {filtersToRender.map((filter) => (
                <FilterSection
                    key={filter.key}
                    filter={filter}
                    searchParams={searchParams}
                    metalTypeMode={metalTypeMode}
                    setMetalTypeMode={setMetalTypeMode}
                    handleFilterChange={handleFilterChange}
                    handleClearSection={handleClearSection}
                />
            ))}
        </div>
    );
}
