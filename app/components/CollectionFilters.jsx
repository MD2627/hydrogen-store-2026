import { useSearchParams, useNavigate } from 'react-router';
import { useState } from 'react';

/**
 * Collection filters component - only displays filters from Search & Discovery app
 * @param {{availableFilters?: Array<{key: string, label: string, values: Array<{value: string, label: string}>}>}}
 */
const FILTER_ICONS = {
  // SHAPES
  "Radiant": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Radiant.svg?v=1768210925",
  "Pear": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Pear.svg?v=1768210925",
  "Square Cushion": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Cushion.svg?v=1768210925",
  "Elongated Cushion": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Elongated_Cushion.svg?v=1768210925",
  "Elongated Hexagon": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Elongated_Hexagon.svg?v=1768210925",
  "Marquise": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Marquise.svg?v=1768210925",
  "Princess": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Princess.svg?v=1768210925",
  "Asscher": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Asscher.svg?v=1768210925",
  "HEART": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Heart.svg?v=1768210924",
  "Oval": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Oval.svg?v=1768210925",
  "Round": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Round.svg?v=1768210925",
  "Emerald": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Emerald.svg?v=1768210925",

  // METAL TYPE
  // "Platinum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Platinum.svg?v=1768212724",
  "14k Yellow Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Yellow_Gold.svg?v=1768212724",
  "14k Rose Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold.svg?v=1768212724",
  "14k White Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_White_Gold.svg?v=1768212724",
  // "18k Yellow Gold / Platinum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Yellow_Gold_Platinum.svg?v=1768212724",
  // "18k Rose Gold / Platinum": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold_Platinum.svg?v=1768212724",
  // "18k Yellow Gold / 18k White Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Yellow_Gold_18k_White_Gold.svg?v=1768212724",
  // "18k Rose Gold / 18k White Gold": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold_18k_White_Gold.svg?v=1768212724",

  // SETTING STYLE
  "Trilogy": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Trilogy.svg?v=1768213901",
  "Solitaire": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Solitaire.svg?v=1768213901",
  "Halo": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Halo.svg?v=1768213899",
  "Toi Et Moi": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Toi_et_Moi.svg?v=1768213901",
  "Bezel": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Bezel.svg?v=1768213901",
  "East West": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/East_West.svg?v=1768213901",
  "Pave": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Pave.svg?v=1768214237",
  "Plain": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Plain.svg?v=1768214236",
  "Accents": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Accents.svg?v=1768214236",
  "High Set": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/High_Set.svg?v=1768214329",
  "Low Set": "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Low_Set.svg?v=1768214330"
};

export function CollectionFilters({ availableFilters = [] }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [metalTypeMode, setMetalTypeMode] = useState('standard'); // 'standard' | 'twotone'

  // Check if any filter params exist
  const hasParams = Array.from(searchParams.keys()).some(k => k.startsWith('filter.'));

  const handleOptionFilterChange = (filterKey, optionValue, isSingleSelect = true) => {
    const newParams = new URLSearchParams(searchParams);

    let parsedValue;
    try {
      parsedValue = typeof optionValue === 'string' ? JSON.parse(optionValue) : optionValue;
    } catch (e) {
      parsedValue = {};
    }

    // Helper to get param value
    let targetParamValue = null;

    if (parsedValue.tag) {
      targetParamValue = parsedValue.tag;
    } else if (parsedValue.variantOption) {
      targetParamValue = parsedValue.variantOption.value;
    }

    if (filterKey && targetParamValue) {
      // Single Select Logic: Clear all existing values for this key first
      if (isSingleSelect) {
        // If we are clicking the same one that is already selected, just remove it (toggle off)
        // Otherwise remove all and add the new one.
        const currentValues = newParams.getAll(filterKey);
        // We need to check if the exact value is already there before deleting
        const isAlreadySelected = currentValues.includes(targetParamValue);

        newParams.delete(filterKey);

        if (!isAlreadySelected) {
          newParams.append(filterKey, targetParamValue);
        }
      } else {
        // Multi Select Logic (Original)
        const currentVals = newParams.getAll(filterKey);
        if (currentVals.includes(targetParamValue)) {
          const newVals = currentVals.filter(v => v !== targetParamValue);
          newParams.delete(filterKey);
          newVals.forEach(v => newParams.append(filterKey, v));
        } else {
          newParams.append(filterKey, targetParamValue);
        }
      }
    }

    // Clear pagination
    newParams.delete('cursor');
    newParams.delete('page');

    navigate({ search: newParams.toString() }, { replace: true });
  };

  const handleClearSection = (filter) => {
    const newParams = new URLSearchParams(searchParams);
    // We need to find which keys belong to this filter section and delete them.
    // Since filter.values contains the options, we can check a sample value to determine the key type.
    if (filter.values.length > 0) {
      const sample = filter.values[0].value;
      try {
        const parsed = typeof sample === 'string' ? JSON.parse(sample) : {};
        if (parsed.tag) {
          // It's a tag filter, but we need to be careful not to delete ALL tags if multiple sections use tags.
          // Ideally, we delete only tags present in this filter's values.
          const sectionTags = filter.values.map(v => JSON.parse(v.value).tag);
          const currentTags = newParams.getAll('filter.p.tag');
          const remainingTags = currentTags.filter(t => !sectionTags.includes(t));
          newParams.delete('filter.p.tag');
          remainingTags.forEach(t => newParams.append('filter.p.tag', t));

        } else if (parsed.variantOption) {
          // Variant options are usually specific to the option name (e.g. "Metal"), so deleting the key is safe.
          const paramKey = `filter.v.option.${parsed.variantOption.name}`;
          newParams.delete(paramKey);
        }
      } catch (e) { }
    }

    newParams.delete('cursor');
    newParams.delete('page');
    navigate({ search: newParams.toString() }, { replace: true });
  };

  const handleClearAll = () => {
    navigate({ search: '' }, { replace: true });
  };

  if (availableFilters.length === 0) {
    return null;
  }

  return (
    <div className="collection-filters">
      {/* 
      <div className="filters-header">
        <h2>Filters</h2>
         {hasParams && (
          <button onClick={handleClearAll} className="clear-all-filters-button">Clear all</button>
        )} 
      </div>
      */}

      {availableFilters.map((filter, index) => {
        // Determine layout class
        // Row 1 (Index 0, 1): Half Width
        // Row 2 (Index 2, 3, 4): Third Width
        // Default: Full Width or fallback
        let layoutClass = 'filter-full-width';
        if (index < 2) layoutClass = 'filter-half-width';
        else if (index >= 2 && index < 5) layoutClass = 'filter-third-width';

        // METAL TYPE TOGGLE LOGIC
        const isMetalType = filter.hasGroups && filter.label === 'Metal Type';
        let displayValues = filter.values;
        if (isMetalType && filter.singleToneCount) {
          // Show single-tone or two-tone based on mode
          if (metalTypeMode === 'standard') {
            displayValues = filter.values.slice(0, filter.singleToneCount);
          } else {
            displayValues = filter.values.slice(filter.singleToneCount);
          }
        }

        // Check if this section has active values
        let isSectionActive = false;
        if (filter.values.length > 0) {
          const sample = filter.values[0].value;
          try {
            const parsed = typeof sample === 'string' ? JSON.parse(sample) : {};
            if (parsed.tag) {
              const activeTags = searchParams.getAll('filter.p.tag');
              // Check if any of this section's tags are in activeTags
              isSectionActive = filter.values.some(opt => activeTags.includes(JSON.parse(opt.value).tag));
            } else if (parsed.variantOption) {
              const param = `filter.v.option.${parsed.variantOption.name}`;
              isSectionActive = searchParams.has(param);
            }
          } catch (e) { }
        }


        return (
          <div key={filter.key} className={`filter-section ${layoutClass}`}>
            <div className="filter-header-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 className="filter-title f-10 f-m-10 w-300 ff-n l-h-1-2 black-color">
                  {filter.label}
                  <span className="info-icon" title="More Info">
                    <svg class="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32"><path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path></svg>
                  </span>
                </h3>
                {isSectionActive && (
                  <button
                    type="button"
                    className="section-clear-btn"
                    onClick={() => handleClearSection(filter)}
                  >
                    Clear
                  </button>
                )}
              </div>

              {isMetalType && (
                <button
                  type="button"
                  className={`two-tone-toggle-btn ${metalTypeMode === 'twotone' ? 'active' : ''}`}
                  onClick={() => setMetalTypeMode(prev => prev === 'standard' ? 'twotone' : 'standard')}
                >
                  TWO TONE
                </button>
              )}
            </div>

            <div className="filter-options">
              {displayValues.map((option) => {
                const optionValue = option.value;
                let isSelected = false;

                try {
                  const parsed = typeof optionValue === 'string' ? JSON.parse(optionValue) : {};
                  if (parsed.tag) {
                    const tags = searchParams.getAll('filter.p.tag');
                    isSelected = tags.includes(parsed.tag);
                  } else if (parsed.variantOption) {
                    const param = `filter.v.option.${parsed.variantOption.name}`;
                    const vals = searchParams.getAll(param);
                    isSelected = vals.includes(parsed.variantOption.value);
                  }
                } catch (e) { }

                const iconUrl = FILTER_ICONS[option.label] || null;

                return (
                  <label
                    key={option.label + optionValue}
                    className={`filter-option ${isSelected ? 'selected' : ''} ${filter.label.toLowerCase()}`}
                  >
                    <input
                      type="checkbox" // Still checkbox input but behaves like radio if logic forces single select
                      name={`filter-${filter.key}`}
                      value={optionValue}
                      checked={isSelected}
                      onChange={() => {
                        // Using Single Select by default as requested
                        handleOptionFilterChange(filter.key, optionValue, true);
                      }}
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
                    <span className="label-text f-9 f-w-600 ff-n">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
