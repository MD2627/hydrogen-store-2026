import { Link } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@shopify/hydrogen';
import { RichText } from './RichText';

/**
 * VideoBanner component with scroll-expand animation
 */
export function VideoBanner({
  desktopVideo,
  desktopImage,
  mobileVideo,
  mobileImage,
  heading,
  description,
  buttonText,
  buttonUrl,
  title,
  subtext,
  buttonLink,
  data,
  video,
}) {
  const finalData = {
    desktopVideo: desktopVideo || video || data?.desktopVideo || data?.video || null,
    desktopImage: desktopImage || data?.desktopImage || null,
    mobileVideo: mobileVideo || video || data?.mobileVideo || data?.video || null,
    mobileImage: mobileImage || data?.mobileImage || null,
    heading: heading || title || data?.heading || data?.title || '',
    description: description || subtext || data?.description || data?.subtext || '',
    buttonText: buttonText || data?.buttonText || "BOOK AN APPOINTMENT",
    buttonUrl: buttonUrl || buttonLink || data?.buttonUrl || data?.buttonLink || "/pages/visit"
  };

  const {
    desktopVideo: dVid,
    desktopImage: dImg,
    mobileVideo: mVid,
    mobileImage: mImg,
    heading: h,
    description: d,
    buttonText: bT,
    buttonUrl: bU
  } = finalData;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  const mediaWidth = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobile ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobile ? 180 : 150);

  const firstWord = h ? h.split(' ')[0] : '';
  const restOfTitle = h ? h.split(' ').slice(1).join(' ') : '';

  const activeMedia = isMobile ? (mVid || mImg || dVid || dImg) : (dVid || dImg);
  const bgMedia = isMobile ? (mImg || dImg) : dImg;
  const isVideo = activeMedia === dVid || activeMedia === mVid;

  return (
    <div ref={sectionRef} className="vb-section">
      <section className="vb-wrapper">
        <div className="vb-inner">
          {/* Background Layer */}
          <motion.div
            className="vb-bg-media"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            {bgMedia && (
              <img
                src={bgMedia}
                alt="Background"
                className="vb-bg-image"
              />
            )}
            <div className="vb-bg-overlay" />
          </motion.div>

          <div className="vb-container">
            <div className="vb-media-centering">
              {/* Expanding Media Box */}
              <div
                className="vb-media-box"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {isVideo ? (
                  <div className="vb-expand-video">
                    <video
                      src={activeMedia}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="vb-media-content"
                    />
                    <motion.div
                      className="vb-video-overlay"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="vb-expand-image">
                    {activeMedia && (
                      <img
                        src={activeMedia}
                        alt={h}
                        className="vb-media-content"
                      />
                    )}
                    <motion.div
                      className="vb-video-overlay"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}
              </div>

              {/* Foreground Typography */}
              <div className="vb-title-container vb-mix-blend">
                <motion.h2
                  className="vb-title-word"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="vb-title-word"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            {/* Content Revealed After Expand */}
            <motion.section
              className="vb-revealed-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Rating Badge */}
              <div className="rating-badge">
                <span className="google-icon">
                  <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                    <g style={{ strokeWidth: 1.10053 }}>
                      <path fill="#4285f4" d="M-3.264 51.509c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" transform="matrix(.6411 0 0 .6411 18.089 -24.383)" style={{ strokeWidth: 1.24153 }}></path>
                      <path fill="#34a853" d="M-14.754 63.239c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z" transform="matrix(.6411 0 0 .6411 18.089 -24.383)" style={{ strokeWidth: 1.24153 }}></path>
                      <path fill="#fbbc05" d="M-21.484 53.529c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98a11.86 11.86 0 0 0 0 10.76z" transform="matrix(.6411 0 0 .6411 18.089 -24.383)" style={{ strokeWidth: 1.24153 }}></path>
                      <path fill="#ea4335" d="M-14.754 43.989c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.07-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" transform="matrix(.6411 0 0 .6411 18.089 -24.383)" style={{ strokeWidth: 1.24153 }}></path>
                    </g>
                  </svg>
                </span>
                <span className="single-star"><svg viewBox="20.5 248.5 34.488 143" xmlns="http://www.w3.org/2000/svg"><path d="M109.594 303.9h-54.9l-16.9-52.2-17 52.2-54.9-.1 44.4 32.3-17 52.2 44.4-32.3 44.4 32.3-16.9-52.2Z" fill="#00D1FF"></path><path d="m68.994 347.9-3.8-11.8-27.4 19.9Z" fill="#005128"></path></svg></span>
                <span className="stars">★★★★★</span>
                <span className="review-count ff-c f-9 f-m-9">150+ reviews</span>
              </div>

              <h2>{h}</h2>
              {d && <RichText tag="p" html={d} />}
              {bT && bU && (
                <Link to={bU} className="btn">
                  {bT}
                </Link>
              )}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
