import { Link } from 'react-router';
import { useEffect, useRef } from 'react';
import { RichText } from './RichText';

/**
 * VideoBanner component for home_banner metaobject
 * @param {{
 *   desktopVideo?: string;
 *   desktopImage?: string;
 *   mobileVideo?: string;
 *   mobileImage?: string;
 *   heading: string;
 *   description?: string;
 *   buttonText?: string;
 *   buttonUrl?: string;
 * }}
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
  title, // fallback for heading
  subtext, // fallback for description
  buttonLink, // fallback for buttonUrl
  data, // fallback object
  video, // general video fallback
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

  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  useEffect(() => {
    // Autoplay desktop video
    if (desktopVideoRef.current) {
      desktopVideoRef.current.play().catch((error) => {
        console.error("Desktop video autoplay failed:", error);
      });
    }
    // Autoplay mobile video
    if (mobileVideoRef.current) {
      mobileVideoRef.current.play().catch((error) => {
        console.error("Mobile video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="video-banner">
      {/* Desktop Media */}
      {dVid ? (
        <video
          ref={desktopVideoRef}
          src={dVid}
          className="video-banner-video video-banner-desktop"
          loop
          muted
          playsInline
          autoPlay
        />
      ) : dImg ? (
        <img
          src={dImg}
          alt={h}
          className="video-banner-video video-banner-desktop"
        />
      ) : null}

      {/* Mobile Media */}
      {mVid ? (
        <video
          ref={mobileVideoRef}
          src={mVid}
          className="video-banner-video video-banner-mobile"
          loop
          muted
          playsInline
          autoPlay
        />
      ) : mImg ? (
        <img
          src={mImg}
          alt={h}
          className="video-banner-video video-banner-mobile"
        />
      ) : null}

      <div className="video-banner-overlay"></div>
      <div className="video-banner-content">
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
          <span className="single-star"><svg viewBox="20.5 248.5 34.488 143" xmlns="http://www.w3.org/2000/svg"><path d="M109.594 303.9h-54.9l-16.9-52.2-17 52.2-54.9-.1 44.4 32.3-17 52.2 44.4-32.3 44.4 32.3-16.9-52.2Z" fill="#00b67a"></path><path d="m68.994 347.9-3.8-11.8-27.4 19.9Z" fill="#005128"></path></svg></span>
          <span className="stars">★★★★★</span>
          <span className="review-count ff-c f-9 f-m-9">150+ reviews</span>
        </div>
        <h2>{h}</h2>
        {d && <RichText tag="p" html={d} />}
        {bT && bU && (
          <Link to={bU} className="banner-btn">
            {bT}
          </Link>
        )}
      </div>
    </div>
  );
}
