import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { RichText } from './RichText';

/**
 * VideoBanner component.
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
    buttonUrl: (buttonUrl || buttonLink || data?.buttonUrl || data?.buttonLink || "/visit").replace('https://hydrogen-store-2026.pages.dev', '')
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const activeMedia = isMobile ? (mVid || mImg || dVid || dImg) : (dVid || dImg);
  const bgMedia = isMobile ? (mImg || dImg) : dImg;
  const isVideo = activeMedia === dVid || activeMedia === mVid;

  return (
    <div className="vb-section vb-section--static">
      <div className="vb-static-inner">
        {/* Background media */}
        {bgMedia && (
          <img src={bgMedia} alt={h || 'Banner'} className="vb-bg-image" />
        )}
        {isVideo && activeMedia && (
          <video
            src={activeMedia}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="vb-bg-image"
          />
        )}
        <div className="vb-bg-overlay" />

        {/* Text overlay */}
        <div className="vb-static-content page-width">
          {h && <h2 className="section-title">{h}</h2>}
          {d && <RichText tag="p" html={d} className="vb-rich-text" />}
          {bT && bU && (
            <Link to={bU} className="btn">
              {bT}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
