import { Link } from 'react-router';
import { useEffect, useRef } from 'react';

export function StoryCraftBanner({
  videoSrc,
  imageSrc,
  mobileImageSrc, // ✅ NEW mobile image prop
  title,
  subtitle,
  ctaText,
  ctaLink,
  extraClass = '',
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  return (
    <div className={`story-craft-banner ${extraClass}`}>
      <div className="page-width">
        <div className='scb'>
          {/* VIDEO OR IMAGE */}
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              className="story-craft-video"
              loop
              muted
              playsInline
              autoPlay
            />
          ) : (
            <picture>
              {/* ✅ Mobile image (only if provided) */}
              {mobileImageSrc && (
                <source
                  media="(max-width: 768px)"
                  srcSet={mobileImageSrc}
                />
              )}

              {/* ✅ Desktop image (fallback for mobile if mobileImageSrc not provided) */}
              <img
                src={imageSrc}
                alt={title || 'Banner image'}
                className="story-craft-image"
              />
            </picture>
          )}

          <div className="story-craft-overlay"></div>

          <div className="story-craft-content">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}

            {ctaText && ctaLink && (
              <Link to={ctaLink} className="story-craft-link">
                {ctaText} <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}