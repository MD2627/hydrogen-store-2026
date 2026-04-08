import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router';
import { RichText } from './RichText';

import 'swiper/css';
import 'swiper/css/navigation';

export function ShopByStyle({
  variant = 'default',
  title = 'Shop Lab Diamond Engagement Rings by Style',
  description = (
    <>
      Discover our signature setting styles, including{' '}
      <Link to="/engagement?style=solitaire">solitaire</Link>,{' '}
      <Link to="/engagement?style=trilogy">trilogy</Link>,{' '}
      <Link to="/engagement?style=halo">halo</Link>,{' '}
      <Link to="/engagement?style=toi-et-moi">toi et moi</Link> and{' '}
      <Link to="/engagement?style=bezel">bezel</Link>.
    </>
  ),
  items = [],
  slidesPerViewDesktop = 4,
}) {
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !items.length) return null;
  const isGallery = variant === 'section-gallery';

  const spaceDesktop = isGallery ? 10 : 30;
  const spaceTablet = isGallery ? 10 : 16;
  const spaceMobile = isGallery ? 8 : 16;
  return (
    <section className={`shop-by-style shop--${variant}`}>
      <header className="shop-by-style-header">
        <h2>{title}</h2>
        {description && (
          typeof description === "string"
            ? <RichText html={description} />
            : description
        )}
      </header>

      <div className="shop-by-style-slider-container">
        {/* ===== CUSTOM NAV ===== */}
        <div className="shop-by-style-nav">
          <button
            ref={prevRef}
            className="swiper-button-prev custom-arrow"
            type="button"
            aria-label="Previous"
          >
            <svg viewBox="0 0 16.933 16.933" width="16" height="16">
              <path
                d="m11.641 2.117-6.35 6.35 6.35 6.35"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.05831"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            ref={nextRef}
            className="swiper-button-next custom-arrow"
            type="button"
            aria-label="Next"
          >
            <svg viewBox="0 0 16.933 16.933" width="16" height="16">
              <path
                d="m5.292 14.816 6.35-6.35-6.35-6.35"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.05831"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* ===== SWIPER ===== */}
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          initialSlide={0}
          centeredSlides={false}
          centeredSlidesBounds
          watchOverflow
          observer
          observeParents
          breakpoints={{
            0: {
              slidesPerView: 1.3,
              spaceBetween: spaceMobile,
              centeredSlides: true,
              loop: false,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: spaceTablet,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: slidesPerViewDesktop,
              spaceBetween: spaceDesktop,
              centeredSlides: false,
            },
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="style-card">
                {item.link ? (
                  <Link
                    to={item.link}
                    className="style-link-overlay"
                    aria-label={item.name || 'View collection'}
                  >
                    <div className="style-image-wrapper">
                      {item.video ? (
                        <video
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="none"
                          poster={item.poster || item.image}
                        >
                          <source src={item.video} type="video/mp4" />
                        </video>
                      ) : (
                        item.image && (
                          <img
                            src={item.image}
                            alt={item.name || ''}
                            loading="lazy"
                          />
                        )
                      )}
                    </div>

                    {item.name && (
                      <div className="style-name f-12 f-m-16 ff-c w-300 l-h-1 black-color">
                        {item.name}
                        <span className="arrow">
                          <svg viewBox="0 0 16.933 16.933" width="14">
                            <path
                              d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7"
                              transform="rotate(180 8.466 8.466)"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.05"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    )}
                  </Link>
                ) : (
                  <>
                    <div className="style-image-wrapper">
                      {item.video ? (
                        <video
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="none"
                          poster={item.poster || item.image}
                        >
                          <source src={item.video} type="video/mp4" />
                        </video>
                      ) : (
                        item.image && (
                          <img
                            src={item.image}
                            alt={item.name || ''}
                            loading="lazy"
                          />
                        )
                      )}
                    </div>

                    {item.name && <div className="style-name f-12 f-m-16 ff-c w-300 l-h-1 black-color">{item.name}</div>}
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}