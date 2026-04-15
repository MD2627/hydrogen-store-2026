import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { useState, useEffect, useMemo } from 'react';

/**
 * @param {{
 *   product:
 *     | CollectionItemFragment
 *     | ProductItemFragment
 *     | RecommendedProductFragment;
 *   loading?: 'eager' | 'lazy';
 *   selectedVariantOptions?: Array<{name: string, value: string}> | null;
 * }}
 */
export function ProductItem({ product, loading, selectedVariantOptions, basePath }) {
  const variantUrl = useVariantUrl(product.handle);
  const allImages = product.images?.nodes || [];

  // Memoize image filtering to prevent unnecessary recalculations
  const images = useMemo(() => {
    let filteredImages = allImages;

    if (selectedVariantOptions && product.variants?.nodes) {
      // Find the Metal Type, Stone Type, and Setting Style option values
      const metalTypeOption = selectedVariantOptions.find(opt =>
        opt.name.toLowerCase().includes('metal')
      );
      const stoneTypeOption = selectedVariantOptions.find(opt =>
        opt.name.toLowerCase().includes('stone')
      );
      const settingStyleOption = selectedVariantOptions.find(opt =>
        opt.name.toLowerCase().includes('setting') ||
        opt.name.toLowerCase().includes('style')
      );

      // Normalize function for comparison
      const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');

      // If this product has Setting Style as a variant option, apply that filter.
      // If it's only a tag (not a variant option), skip setting check so metal/stone still work.
      const hasSettingVariantOption = settingStyleOption
        ? product.variants.nodes.some(v =>
            v.selectedOptions?.some(o =>
              o.name.toLowerCase().includes('setting') || o.name.toLowerCase().includes('style')
            )
          )
        : false;

      // Find the first variant matching metal type, stone type, AND setting style (if provided)
      const selectedVariant = product.variants.nodes.find(variant => {
        let metalMatches = true;
        let stoneMatches = true;
        let settingMatches = true;

        if (metalTypeOption) {
          const normalizedTargetMetal = normalize(metalTypeOption.value);
          metalMatches = variant.selectedOptions?.some(option =>
            option.name.toLowerCase().includes('metal') &&
            (normalize(option.value) === normalizedTargetMetal ||
              normalize(option.value).includes(normalizedTargetMetal) ||
              normalizedTargetMetal.includes(normalize(option.value)))
          );
        }

        if (stoneTypeOption) {
          const normalizedTargetStone = normalize(stoneTypeOption.value);
          // Check both: option name includes 'stone' OR any option value contains the stone type
          stoneMatches = variant.selectedOptions?.some(option =>
            (option.name.toLowerCase().includes('stone') &&
              normalize(option.value).includes(normalizedTargetStone)) ||
            normalize(option.value).includes(normalizedTargetStone)
          );
        }

        // Only match setting if this product actually has it as a variant option.
        // Otherwise treat as matched (setting style is tag-based for this product).
        if (settingStyleOption && hasSettingVariantOption) {
          const normalizedTargetSetting = normalize(settingStyleOption.value);
          settingMatches = variant.selectedOptions?.some(option =>
            (option.name.toLowerCase().includes('setting') ||
              option.name.toLowerCase().includes('style')) &&
            (normalize(option.value) === normalizedTargetSetting ||
              normalize(option.value).includes(normalizedTargetSetting) ||
              normalizedTargetSetting.includes(normalize(option.value)))
          );
        }

        return metalMatches && stoneMatches && settingMatches;
      });

      if (selectedVariant) {
        // Check if variant has metafield media (variant-specific images)
        const variantMedia = selectedVariant.metafield?.references?.nodes;

        if (variantMedia && variantMedia.length > 0) {
          // Filter to only include images (exclude videos)
          const imageMedia = variantMedia
            .filter(media => media.mediaContentType === 'IMAGE' || media.image)
            .map(media => media.image || media)
            .filter(Boolean);
          if (imageMedia.length > 0) {
            filteredImages = imageMedia;

            // If variant has its own image, prepend it
            if (selectedVariant.image && !filteredImages.some(img => img.id === selectedVariant.image.id)) {
              filteredImages = [selectedVariant.image, ...filteredImages];
            }
          } else if (selectedVariant.image) {
            // Fall back to variant's main image if no image media found
            filteredImages = [selectedVariant.image];
          }
        } else if (selectedVariant.image) {
          // Fall back to variant's main image
          filteredImages = [selectedVariant.image];
        }
      }
    }

    return filteredImages;
  }, [selectedVariantOptions, allImages, product.variants?.nodes]);


  const hasMultipleImages = images.length > 1;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Reset image index when filtered images change
  useEffect(() => {
    setCurrentImageIndex(0);
    setHasInteracted(false);
  }, [selectedVariantOptions, images.length]);

  // Get the matched variant for price display
  const matchedVariant = useMemo(() => {
    if (!selectedVariantOptions || !product.variants?.nodes || selectedVariantOptions.length === 0) return null;

    const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');

    return product.variants.nodes.find(variant => {
      // Check if this variant matches ALL selected options provided
      return selectedVariantOptions.every(selectedOpt => {
        const selectedName = selectedOpt.name.toLowerCase();
        // Skip Shape as it's often a tag, not a variant option
        if (selectedName === 'shape') return true;

        const selectedValue = normalize(selectedOpt.value);

        // Find corresponding option in variant
        const variantOption = variant.selectedOptions.find(opt => {
          const optName = opt.name.toLowerCase();

          // Direct match or substring match
          if (optName === selectedName || optName.includes(selectedName) || selectedName.includes(optName)) return true;

          // Aliases for Metal
          if (selectedName.includes('metal')) {
            if (optName === 'item' || optName === 'material') return true;
          }

          return false;
        });

        if (!variantOption) return true;

        if (variantOption) {
          const variantValue = normalize(variantOption.value);
          return variantValue === selectedValue ||
            variantValue.includes(selectedValue) ||
            selectedValue.includes(variantValue);
        }
        return true;
      });
    });
  }, [selectedVariantOptions, product.variants?.nodes]);

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHasInteracted(true);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentImageIndex((prev) => {
      // If we are currently "hover previewing" image 1 (at index 0), 
      // clicking next should jump to image 2 (or wrap to 0 if only 2 images).
      if (!hasInteracted && isHovered && prev === 0 && hasMultipleImages) {
        return images.length > 2 ? 2 : 0;
      }
      return prev === images.length - 1 ? 0 : prev + 1;
    });
    setHasInteracted(true);
  };

  // Show second image on hover if available and user hasn't interacted manually
  const displayImageIndex = !hasInteracted && isHovered && hasMultipleImages && currentImageIndex === 0 ? 1 : currentImageIndex;
  const currentImage = images[displayImageIndex] || product.featuredImage;

  // Determine which price to show
  const displayPrice = matchedVariant?.price || product.priceRange.minVariantPrice;

  const shortTitle = product.title.includes('–')
    ? product.title.split('–')[0].trim()
    : product.title.includes(' - ')
      ? product.title.split(' - ')[0].trim()
      : product.title.includes('|')
        ? product.title.split('|')[0].trim()
        : product.title;

  const targetUrl = basePath
    ? `${basePath}/${product.handle}`
    : variantUrl;

  let productUrl = targetUrl;
  const params = new URLSearchParams();

  // 1. Add explicitly selected options (from filters)
  if (selectedVariantOptions && selectedVariantOptions.length > 0) {
    selectedVariantOptions.forEach(option => {
      params.append(option.name, option.value);
    });
  }
  if (product.variants?.nodes?.length > 0) {
    const firstVariant = product.variants.nodes[0];
    if (firstVariant.selectedOptions) {
      firstVariant.selectedOptions.forEach(option => {
        if (!params.has(option.name)) {
          params.append(option.name, option.value);
        }
      });
    }
  }

  const queryString = params.toString();
  if (queryString) {
    productUrl = `${targetUrl}?${queryString}`;
  }

  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={productUrl}
    >
      <div
        className="product-item-image-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImageIndex(0);
          setHasInteracted(false);
        }}
      >
        {currentImage && (
          <Image
            alt={currentImage.altText || product.title}
            aspectRatio="1/1"
            data={currentImage}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            fetchpriority={loading === 'eager' ? 'high' : 'auto'}
            decoding="async"
          />
        )}

        {hasMultipleImages && (
          <>
            <button
              className="product-item-slider-btn product-item-slider-prev"
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg"><path d="m11.641 2.117-6.35 6.35 6.35 6.35" className="stroke" style={{ fill: 'none', stroke: '#232323', strokeWidth: '1.05831', strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: 'none', strokeOpacity: '1' }}></path></svg>
            </button>
            <button
              className="product-item-slider-btn product-item-slider-next"
              onClick={handleNextImage}
              aria-label="Next image"
            >
              <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg"><path d="m5.292 14.816 6.35-6.35-6.35-6.35" className="stroke" style={{ fill: 'none', stroke: '#232323', strokeWidth: '1.05831', strokeLinecap: 'round', strokeLinejoin: 'round', strokeDasharray: 'none', strokeOpacity: '1' }}></path></svg>
            </button>
          </>
        )}
      </div>

      <h4 className='ff-a w-400 f-20'>{shortTitle}</h4>
      <small className='ff-n w-400 f-10'>
        {matchedVariant ? (
          <Money data={displayPrice} />
        ) : (
          <>Starting <Money data={displayPrice} /></>
        )}
      </small>
    </Link>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */

