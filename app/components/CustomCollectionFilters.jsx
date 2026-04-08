import { useSearchParams, useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';

/**
 * Custom collection filters component with predefined filter options
 * Supports URL parameters like ?metal=platinum&shape=round&band=plain&style=trilogy
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
    "14K Yellow Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Yellow_Gold.svg?v=1768212724",
    "14K Rose Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold.svg?v=1768212724",
    "14K White Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_White_Gold.svg?v=1768212724",

    // "18k-yellow-gold-platinum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold_Platinum.svg?v=1768212724",
    // "18k-rose-gold-platinum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold_Platinum.svg?v=1768212724",
    // "18k-yellow-gold-18k-white-gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Yellow_Gold_18k_White_Gold.svg?v=1768212724",
    // "18k-rose-gold-18k-white-gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold_18k_White_Gold.svg?v=1768212724",

    // SETTING STYLE
    "Trilogy": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Trilogy.svg?v=1768213901",
    "Solitaire": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Solitaire.svg?v=1768213901",
    "Halo": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Halo.svg?v=1768213899",
    "toi-et-moi": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Toi_et_Moi.svg?v=1768213901",
    "Toi et Moi": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Toi_et_Moi.svg?v=1768213901",
    "Bezel": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Bezel.svg?v=1768213901",
    "East West": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/East_West.svg?v=1768213901",

    // BAND TYPE
    "Plain": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Plain.svg?v=1768214236",
    "Pave": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Pave.svg?v=1768214237",
    "Pavé": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Pave.svg?v=1768214237",
    "Accents": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Accents.svg?v=1768214236",

    "High Set": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/download_14.svg?v=1769000588",
    "Low Set": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/setting_profile_low.BgTbkPCo.svg?v=1769000629"
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
            // { value: 'platinum', label: 'Platinum', group: 'standard' },
            { value: '14k-yellow-gold', label: '14K Yellow Gold', group: 'standard' },
            { value: '14k-rose-gold', label: '14K Rose Gold', group: 'standard' },
            { value: '14k-white-gold', label: '14K White Gold', group: 'standard' },
        ]
    },
    {
        key: 'style',
        label: 'Setting Style',
        layoutClass: 'filter-third-width',
        options: [
            { value: 'solitaire', label: 'Solitaire' },
            { value: 'halo', label: 'Halo' },
            { value: 'trilogy', label: 'Trilogy' },
            { value: 'toi-et-moi', label: 'Toi & Moi' },
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
            { value: 'pave', label: 'Pavé' },
            { value: 'accents', label: 'Accents' },
        ]
    }
];

const FILTER_INFO_CONTENT = {
    shape: {
        title: "Shape",
        description: `This is the outline or form of a gemstone when viewed from the top.
        
Lab grown diamond, moissanite and lab grown sapphires come in a variety of shapes. When choosing a shape consider both the ring setting and the recipient's personality and preferences.`
    },
    metal: {
        title: "Ring Metal Type",
        description: `This refers to the type of metal in the ring's band. A ring may be single tone (one metal type/colour) or two tone (the ring has different metal types). The metal options available are Rose Gold, White Gold, Yellow Gold and Platinum.`
    },
    style: {
        title: "Ring Setting Style",
        description: `The setting style refers to how gemstones are set, or mounted, into a metal band. The ring setting is meant to highlight the beauty of the centre stone(s).
Style refers to the overall design aesthetic that the ring setting helps create—whether it be solitaire, halo, trilogy etc.`
    },
    band: {
        title: "Band Type",
        description: `When choosing a ring, the style of the band plays an important role. There are three main types:
            • **Plain** - These bands are just plain solid precious metal, with no stones set in the band.
            • **Pavé** - These bands have stones set uniformly around part or even the entire band.
            • **Accents** - These bands exhibit a more unique arrangement of stones set in the band itself. Accent bands often include a variety of different stone shapes and/or sizes.`
    },
    setting: {
        title: "Setting Profile",
        description: `The setting profile of a ring significantly affects its appearance and practicality. There are two main types:
            • **High Set** - This profile positions the stone high above the band, allowing the ring to sit flush with most wedding bands. It gives the stone prominence but may be more exposed to accidental damage.
            • **Low Set** - This profile keeps the stone close to the band, reducing the risk of it catching on clothing. While it offers better protection for the stone, it needs a curved wedding band to fit snugly around the lower setting. This need should be taken into account when considering pairing options.`
    }
};

function FilterInfoModal({ filterKey, onClose }) {
    const content = FILTER_INFO_CONTENT[filterKey];
    const filterConfig = FILTER_CONFIG.find(f => f.key === filterKey);
    const optionsScrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    if (!content || !filterConfig) return null;

    // Filter out complex options for display if needed, or just show all unique options
    let displayOptions = filterConfig.options;

    // For metal, simplify to show unique base metals if possible, or just all standard ones
    if (filterKey === 'metal') {
        displayOptions = filterConfig.options.filter(opt => opt.group === 'standard');
    }

    const checkOptionsScroll = () => {
        const el = optionsScrollRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    useEffect(() => {
        // Run after render to compute correct widths
        const t = setTimeout(checkOptionsScroll, 0);
        window.addEventListener('resize', checkOptionsScroll);
        return () => {
            clearTimeout(t);
            window.removeEventListener('resize', checkOptionsScroll);
        };
    }, [filterKey]);

    const scrollOptions = (direction) => {
        const el = optionsScrollRef.current;
        if (!el) return;
        const scrollAmount = 260;
        el.scrollTo({
            left: direction === 'left' ? el.scrollLeft - scrollAmount : el.scrollLeft + scrollAmount,
            behavior: 'smooth',
        });
        setTimeout(checkOptionsScroll, 350);
    };

    return (
        <div className="filter-info-modal-overlay" onClick={onClose}>
            <div className="filter-info-modal" onClick={e => e.stopPropagation()}>
                <button type="button" className="close-button-text" onClick={onClose}>
                    <div className="icon">
                        <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7" style={{ fill: 'none', stroke: '#000', strokeWidth: '1.05831', strokeLinecap: 'round', strokeLinejoin: 'round' }}></path>
                        </svg>
                    </div>
                    <span className="ff-n f-12 f-m-12 w-400 l-h-1-2 black-color">CLOSE</span>
                </button>

                <h2 className="modal-title f-32 f-m-24 ff-a w-300">{content.title}</h2>

                <div className="modal-description f-12 f-m-12 ff-n w-300 l-h-1-6">
                    {content.description.split('\n').map((line, i) => (
                        <p key={i} style={{ marginBottom: '10px', whiteSpace: 'pre-wrap' }}>
                            <span dangerouslySetInnerHTML={{
                                __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }} />
                        </p>
                    ))}
                </div>

                {filterKey === 'shape' && (
                    <div className="modal-options-scroll-wrapper">
                        {canScrollLeft && (
                            <button
                                type="button"
                                className="modal-scroll-btn prev"
                                onClick={() => scrollOptions('left')}
                                aria-label="Scroll options left"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                        )}

                        <div
                            className="modal-options-scroll"
                            ref={optionsScrollRef}
                            onScroll={checkOptionsScroll}
                        >
                            <div className="modal-options-grid">
                                {displayOptions.map((option) => {
                                    const iconUrl = FILTER_ICONS[option.value] || FILTER_ICONS[option.label] || null;

                                    return (
                                        <div key={option.value} className="modal-option-item">
                                            {iconUrl ? (
                                                <div className="modal-option-icon">
                                                    <img src={iconUrl} alt={option.label} />
                                                </div>
                                            ) : (
                                                <div className="modal-option-icon placeholder">
                                                    <span>{option.label?.[0] ?? ''}</span>
                                                </div>
                                            )}
                                            <span className="modal-option-label f-9 f-w-600 ff-n">{option.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {canScrollRight && (
                            <button
                                type="button"
                                className="modal-scroll-btn next"
                                onClick={() => scrollOptions('right')}
                                aria-label="Scroll options right"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper Component for Scrollable Filter Section
function FilterSection({ filter, searchParams, metalTypeMode, setMetalTypeMode, handleFilterChange, handleClearSection, onOpenInfo }) {
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
                    <h3 className="filter-title f-10 f-m-10 w-300 ff-n l-h-1-2 black-color"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onOpenInfo(filter.key);
                        }}
                        style={{ justifyContent: 'center', cursor: 'pointer' }}>
                        {filter.label}
                        <span
                            className="info-icon"
                            title="More Info"
                            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        >
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
                                className={`filter-pill-btn ${isSelected ? 'active' : ''}`}
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
                    <h3 className="filter-title f-10 f-m-10 w-300 ff-n l-h-1-2 black-color"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onOpenInfo(filter.key);
                        }}
                        style={{ cursor: 'pointer', justifyContent: 'center' }}>
                        {filter.label}
                        <span
                            className="info-icon"
                            title="More Info"

                            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                        >
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

export function CustomCollectionFilters({ additionalFilters = [], enabledKeys = null }) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [metalTypeMode, setMetalTypeMode] = useState('standard'); // 'standard' | 'twotone'
    const [activeInfoModal, setActiveInfoModal] = useState(null); // 'shape' | 'metal' | 'style' | etc.

    const handleFilterChange = (filterKey, optionValue) => {
        const newParams = new URLSearchParams(searchParams);

        // Check if this value is already selected
        const currentValue = newParams.get(filterKey);

        if (currentValue === optionValue) {
            // Toggle off - remove the filter
            newParams.delete(filterKey);
        } else {
            // Set new value (single select)
            newParams.set(filterKey, optionValue);
            // Remove view=all when setting a filter
            newParams.delete('view');
        }

        // Clear pagination
        newParams.delete('cursor');
        newParams.delete('page');

        // Check if all filters are now empty
        const filterKeys = ['metal', 'shape', 'style', 'band', 'profile', 'setting'];
        const hasAnyFilter = filterKeys.some(key => newParams.has(key));

        // If no filters remain, add view=all to prevent auto-selection
        if (!hasAnyFilter) {
            newParams.set('view', 'all');
        }

        navigate({ search: newParams.toString() }, { replace: true, preventScrollReset: true });
    };

    const handleClearSection = (filterKey) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete(filterKey);
        newParams.delete('cursor');
        newParams.delete('page');

        // Check if all filters are now empty
        const filterKeys = ['metal', 'shape', 'style', 'band', 'profile', 'setting'];
        const hasAnyFilter = filterKeys.some(key => newParams.has(key));

        // If no filters remain, add view=all to prevent auto-selection
        if (!hasAnyFilter) {
            newParams.set('view', 'all');
        }

        navigate({ search: newParams.toString() }, { replace: true, preventScrollReset: true });
    };

    const allFilters = [...additionalFilters, ...FILTER_CONFIG];
    const filtersToRender = enabledKeys
        ? allFilters.filter(f => enabledKeys.includes(f.key))
        : allFilters;

    if (filtersToRender.length === 0) return null;

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
                    onOpenInfo={setActiveInfoModal}
                />
            ))}
            {activeInfoModal && (
                <FilterInfoModal
                    filterKey={activeInfoModal}
                    onClose={() => setActiveInfoModal(null)}
                />
            )}
        </div>
    );
}
