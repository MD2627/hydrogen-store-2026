import { Image } from '@shopify/hydrogen';
import { useState, useEffect, useRef } from 'react';

/**
 * @param {{
 *   image: ProductVariantFragment['image'];
 * }}
 */

function ProductVideo({ sources, poster, isActive, className }) {
  const videoRef = useRef(null);

  const mp4Source = sources?.find((s) => s.mimeType === 'video/mp4' && s.url && !s.url.includes('myshopify.com')) ||
    sources?.find((s) => s.mimeType === 'video/mp4');

  let videoUrl = mp4Source?.url;

  if (videoUrl) {
    if (videoUrl.includes('.mp4https')) {
      videoUrl = videoUrl.split('.mp4https')[0] + '.mp4';
    }
    const idMatch = videoUrl.match(/\/videos\/c\/vp\/([a-f0-9]{32})\//);
    if (idMatch && idMatch[1]) {
      videoUrl = `https://cdn.shopify.com/videos/c/o/v/${idMatch[1]}.mp4`;
    }
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.muted = true;
      video.play().catch(() => { });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  if (!videoUrl) return null;

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      playsInline
      loop
      preload="auto"
      poster={poster}
      src={videoUrl}
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}

export function ProductImage({ image, media = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const mobileMainRef = useRef(null);
  const isScrollingRef = useRef(false);

  const allMedia = media && media.length > 0 ? media : (image ? [image] : []);

  useEffect(() => {
    if (window.innerWidth <= 900 && mobileMainRef.current) {
      const width = mobileMainRef.current.offsetWidth;
      if (width > 0) {
        const currentScrollIndex = Math.round(mobileMainRef.current.scrollLeft / width);
        if (activeIndex !== currentScrollIndex) {
          isScrollingRef.current = true;
          mobileMainRef.current.scrollTo({
            left: width * activeIndex,
            behavior: 'smooth'
          });
          // Reset the flag after animation finishes
          setTimeout(() => { isScrollingRef.current = false; }, 500);
        }
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const openModal = (med) => {
    setActiveImage(med);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed((z) => !z);
    if (isZoomed) setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isZoomed) return;
    e.preventDefault();
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const isVideo = (med) => med.mediaContentType === 'VIDEO' || med.mediaContentType === 'EXTERNAL_VIDEO';

  const renderMedia = (med, isModal = false, isThumbnail = false) => {
    // Handle video
    if (isVideo(med) && med.sources) {
      if (isThumbnail) {
        return (
          <Image
            alt={med.previewImage?.altText || 'Product Video Thumbnail'}
            data={med.previewImage}
            className="thumbnail-img"
          />
        );
      }
      return (
        <ProductVideo
          sources={med.sources}
          poster={med.previewImage?.url}
          isActive={true}
          className={isModal ? "modal-vid" : "main-vid"}
        />
      );
    }

    const imgData = med.image || med;

    if (isModal) {
      return (
        <Image
          alt={imgData.altText || 'Product Image'}
          data={imgData}
          className="modal-img"
          style={
            isZoomed
              ? {
                transform: `translate(${pan.x}px, ${pan.y}px) scale(2)`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }
              : { cursor: 'zoom-in' }
          }
          onClick={toggleZoom}
        />
      );
    }

    return (
      <Image
        alt={imgData.altText || 'Product Image'}
        data={imgData}
        className="main-img"
        style={{ cursor: 'zoom-in' }}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    );
  };

  if (allMedia.length === 0) {
    return <div className="product-image" />;
  }

  const handleThumbnailClick = (index, med) => {
    setActiveIndex(index);

    // Explicitly scroll for mobile to ensure immediate response
    if (window.innerWidth <= 900 && mobileMainRef.current) {
      isScrollingRef.current = true;
      const width = mobileMainRef.current.offsetWidth;
      mobileMainRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
      setTimeout(() => { isScrollingRef.current = false; }, 500);
    }

    if (window.innerWidth > 900) {
      openModal(med);
    }
  };

  const handleMobileMainScroll = (e) => {
    if (isScrollingRef.current || window.innerWidth > 900) return;

    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);

    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < allMedia.length) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="product-image-container">
      {/* MOBILE: Main Slider + Thumbnails Slider */}
      <div className="product-mobile-gallery">
        <div
          ref={mobileMainRef}
          className="product-mobile-main"
          onScroll={handleMobileMainScroll}
        >
          {allMedia.map((med, index) => (
            <div
              key={`mob-main-${med.id || index}`}
              className="product-mobile-main-item"
              onClick={() => openModal(med)}
            >
              {renderMedia(med)}
            </div>
          ))}
        </div>
        <div className="product-mobile-thumbnails">
          {allMedia.map((med, index) => (
            <div
              key={`mob-${med.id || index}`}
              className={`product-mobile-thumbnail-item ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index, med)}
            >
              {renderMedia(med, false, true)}
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: 2-Column Grid */}
      <div className="product-image-gallery desktop-grid">
        {allMedia.map((med, index) => (
          <div
            key={`desk-${med.id || index}`}
            className="product-image-grid-item"
            onClick={() => openModal(med)}
          >
            {renderMedia(med)}
          </div>
        ))}
      </div>

      {isModalOpen && activeImage && (
        <div
          className="product-modal-overlay"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="product-modal-content" onMouseDown={handleMouseDown}>
            {renderMedia(activeImage, true)}
          </div>

          <div className="product-modal-controls">
            <button className="modal-btn close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
