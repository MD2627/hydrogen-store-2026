import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { RichText } from './RichText';

/**
 * @typedef {Object} BannerContent
 * @property {string} [image]
 * @property {string} [video]
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [linkText]
 * @property {string} [linkTo]
 */

/**
 * @param {{
 *   left: BannerContent;
 *   right: BannerContent;
 *   middleBanner?: React.ReactNode;
 * }}
 */
export function SplitBanner({
  left,
  right,
  middleBanner
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  }, [right?.video]); // Re-run if video changes

  return (
    <div className={`split-banner ${!middleBanner ? 'engagement-split-banner' : ''}`}>
      <div className="split-banner-media split-banner-left">
        {left?.image && <img src={left.image} alt={left.title} className="split-banner-img" />}
        {left?.video && (
          <video
            src={left.video}
            loop
            muted
            playsInline
            autoPlay
            className="split-banner-vid"
          />
        )}
        <div className="split-banner-content">
          <h2>{left?.title}</h2>
          {left.afterTitle}
          <RichText tag="p" html={left?.description} />
          <Link to={left?.linkTo} className="banner-btn">{left?.linkText}</Link>
        </div>
      </div>

      {middleBanner}

      <div className="split-banner-media split-banner-right">
        {right?.image && <img src={right.image} alt={right.title} className="split-banner-img" />}
        {right?.video && (
          <video
            ref={videoRef}
            src={right.video}
            loop
            muted
            playsInline
            autoPlay
            className="split-banner-vid"
          />
        )}
        {(right?.title || right?.description) && (
          <div className="split-banner-content">
            <h2>{right.title}</h2>
            {right.afterTitle}
            <RichText tag="p" html={right?.description} />
            {right.linkTo && right.linkText && (
              <Link to={right.linkTo} className="banner-btn">{right.linkText}</Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
