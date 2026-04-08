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
  const [selectedImage, setSelectedImage] = useState(image);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const zoomContainerRef = useRef(null);
  const getImageId = (item) => {
    if (!item) return null;
    if (item.image?.id) return item.image.id;
    if (item.previewImage?.id) return item.previewImage.id;
    return item.id;
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    if (image) {
      setSelectedImage(image);
    }
  }, [image]);

  useEffect(() => {
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
  }, [selectedImage]);

  if (!selectedImage && (!media || media.length === 0)) {
    return <div className="product-image" />;
  }

  const activeImage =
    selectedImage || (media && media.length > 0 ? media[0] : null);
  const isMediaActive = (med) => {
    return getImageId(med) === getImageId(activeImage);
  };

  const currentIndex = media.findIndex((m) => isMediaActive(m));
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  const handleNext = (e) => {
    e?.stopPropagation();
    if (!media.length) return;
    setSelectedImage(media[(safeIndex + 1) % media.length]);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (!media.length) return;
    setSelectedImage(media[(safeIndex - 1 + media.length) % media.length]);
  };

  const openModal = () => {
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

  const renderMedia = (med, isThumbnail = false, isModal = false, isActive = false) => {
    if (isThumbnail) {
      const previewImage = med.previewImage || med.image;
      if (!previewImage) return null;

      return (
        <div className="thumbnail-inner">
          <Image
            alt={previewImage.altText || 'Product Thumbnail'}
            data={previewImage}
            aspectRatio="1/1"
            width={100}
            height={100}
          />
          {isVideo(med) && (
            <div className="thumbnail-play-icon">
              <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg"><path d="M3.175 2.117v12.7l10.583-6.35z" fill="#fff"></path></svg>
            </div>
          )}
        </div>
      );
    }

    // Handle video
    if (isVideo(med) && med.sources) {
      return (
        <ProductVideo
          sources={med.sources}
          poster={med.previewImage?.url}
          isActive={isActive}
          className="main-vid"
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
  const thumbnailsWrapperRef = useRef(null);
  useEffect(() => {
    if (thumbnailsWrapperRef.current) {
      const activeThumb = thumbnailsWrapperRef.current.querySelector('.product-thumbnail.active');
      if (activeThumb) {
        // scrollIntoView will handle the appropriate axis depending on layout
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }
  }, [getImageId(activeImage)]);

  return (
    <div className="product-image-gallery">
      <div className="product-image-thumbnails-wrapper" ref={thumbnailsWrapperRef}>
        <div className="product-image-thumbnails">
          {media.map((med, index) => {
            const isActive = isMediaActive(med) || (index === 0 && !selectedImage && !activeImage);
            return (
              <button
                key={med.id || index}
                className={`product-thumbnail ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedImage(med)}
              >
                {renderMedia(med, true)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="product-image-main">
        <div className="product-main-image-slider" onClick={openModal}>
          {media.map((med) => {
            const isActive = isMediaActive(med);
            return (
              <div
                key={med.id}
                className={`main-media-item ${isActive ? 'active' : ''}`}
                style={{ display: isActive ? 'block' : 'none' }}
              >
                {renderMedia(med, false, false, isActive)}
              </div>
            );
          })}

          {activeImage && !media.some(m => isMediaActive(m)) && (
            <div className="main-media-item active" style={{ display: 'block' }}>
              {renderMedia(activeImage, false, false, true)}
            </div>
          )}
        </div>

        {media.length > 1 && (
          <>
            <button className="slider-arrow prev" onClick={handlePrev} aria-label="Previous">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="slider-arrow next" onClick={handleNext} aria-label="Next">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </>
        )}
      </div>

      {isModalOpen && (
        <div
          className="product-modal-overlay"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="product-modal-content" onMouseDown={handleMouseDown}>
            {renderMedia(activeImage, false, true, true)}
          </div>

          <div className="product-modal-controls">
            <button className="modal-btn prev" onClick={handlePrev}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="modal-btn close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <button className="modal-btn next" onClick={handleNext}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
