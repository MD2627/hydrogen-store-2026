import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

export function SplitBanner({
  left = {},
  right = {},
  stats = [
    { value: '100%', label: 'Authentic' },
    { value: 'Expert', label: 'Crafted' },
    { value: 'Lifetime', label: 'Guarantee' }
  ]
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  // Robustly pick the best video and image sources available from either prop
  const videoSrc = left.video || right.video || null;
  const imageSrc = left.image || right.image || null;

  // Identify which prop object contains the textual content
  const content = (right.title || right.description) ? right : left;

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(err => {
        console.warn("Video autoplay failed:", err);
      });
    }
  }, [videoSrc]);

  return (
    <section className="sb">
      <div className="page-width">
        <div className="sb-grid">
          {/* Left Section - Media */}
          <div className="sb-left">
            <div className="sb-media-wrapper">
              {videoSrc ? (
                <video
                  ref={videoRef}
                  key={videoSrc}
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="sb-video"
                  poster={imageSrc}
                />
              ) : imageSrc ? (
                <img
                  src={imageSrc}
                  alt={content.title || "Banner"}
                  className="sb-img"
                />
              ) : null}
              <div className="sb-glow"></div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="sb-right">
            <div className="sb-content">
              <h1 className="section-title">{content.title || 'Handcrafted Excellence'}</h1>

              <p className="sb-description">
                {content.description || 'Designed with purpose and consciously crafted for every moment.'}
              </p>

              <div className="sb-actions">
                <Link
                  to={content.linkTo || content.link || '/collections/all'}
                  className={`sb-button ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {content.linkText || 'EXPLORE THE COLLECTION'}
                </Link>
              </div>

              <div className="sb-stats">
                <div className="sb-stats-grid">
                  {stats.map((stat, i) => (
                    <div key={i} className="sb-stat-item">
                      <p className="sb-stat-value">{stat.value}</p>
                      <p className="sb-stat-label">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
