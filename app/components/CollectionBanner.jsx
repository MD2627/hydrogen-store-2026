import { useState, useEffect, useRef } from 'react';
import { getCollectionBanner } from '~/config/collectionBanners';

/**
 * Collection Banner Component
 * Displays a responsive banner with desktop/mobile images or videos
 * Falls back to Shopify collection image if custom banner not configured
 */
export function CollectionBanner({ collection }) {
    const [isMobile, setIsMobile] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        // Check if mobile on mount
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Get custom banner config
    const customBanner = getCollectionBanner(collection.handle);

    // Determine banner type and media URLs
    let bannerType = 'image'; // 'image' or 'video'
    let bannerImage = null;
    let bannerVideo = null;
    let title = collection.title;
    let description = collection.description;
    let videoOptions = {
        autoplay: true,
        loop: true,
        muted: true,
        controls: false,
        playsInline: true
    };

    if (customBanner) {
        // Use custom banner from config
        bannerType = customBanner.type || 'image';

        if (bannerType === 'video') {
            bannerVideo = isMobile
                ? (customBanner.mobile || customBanner.desktop)
                : customBanner.desktop;
            if (customBanner.videoOptions) {
                videoOptions = { ...videoOptions, ...customBanner.videoOptions };
            }
        } else {
            bannerImage = isMobile
                ? (customBanner.mobile || customBanner.desktop)
                : customBanner.desktop;
        }

        if (customBanner.title) title = customBanner.title;
        if (customBanner.description) description = customBanner.description;
    } else if (collection.image) {
        // Fallback to Shopify collection image
        bannerImage = collection.image.url;
    }

    // If no media available, render simple header
    if (!bannerImage && !bannerVideo) {
        return (
            <div className='page-width'>
            <div className="collection-header-simple">
                <h1 className='f-16 f-m-28 ff-c w-400 l-h-300'>{title}</h1>
                {description && <p className="collection-description ff-c f-16 f-m-12 w-400 l-h-300">{description}</p>}
            </div>
            </div>
        );
    }

    return (
        <div className="collection-header-banner">
            <div className={`collection-banner-media ${bannerType === 'video' ? 'collection-banner-video' : 'collection-banner-image'}`}>
                {bannerType === 'video' && bannerVideo ? (
                    <video
                        ref={videoRef}
                        src={bannerVideo}
                        autoPlay={videoOptions.autoplay}
                        loop={videoOptions.loop}
                        muted={videoOptions.muted}
                        controls={videoOptions.controls}
                        playsInline={videoOptions.playsInline}
                        className="collection-banner-video-element"
                        aria-label={title}
                    />
                ) : (
                    <picture>
                        {customBanner && customBanner.mobile && (
                            <>
                                <source media="(max-width: 768px)" srcSet={customBanner.mobile} />
                                <source media="(min-width: 769px)" srcSet={customBanner.desktop} />
                            </>
                        )}
                        <img
                            src={bannerImage}
                            alt={title}
                            loading="eager"
                        />
                    </picture>
                )}
            </div>
            <div className="collection-header-content">
                <h1 className='f-40 f-m-28 ff-c w-400 l-h-300 f-m-38'>{title}</h1>
                {
                    description && (
                        <p className="collection-description ff-c f-16 f-m-12 w-400 l-h-300">{description}</p>
                    )
                }
            </div>
        </div>
    );
}
