import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import { Link } from 'react-router';
import { RichText } from './RichText';

import 'swiper/css';
import 'swiper/css/scrollbar';

export function ShopByStyle({
  variant = 'default',
  isSplit = true, // Enable the new layout by default for this component
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !items.length) return null;

  const content = (
    <>
      {/* <div className="page-width"> */}
      <header className="shop-by-style-header">
        <h2 className="section-title">{title}</h2>
        {description && (
          typeof description === "string"
            ? <RichText html={description} />
            : description
        )}
      </header>
      {/* </div> */}

      <div className="shop-by-style-slider-container">
        {/* ===== SWIPER ===== */}
        <Swiper
          modules={[Scrollbar]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          scrollbar={{
            draggable: true,
            hide: false,
          }}
          grabCursor={true}
          initialSlide={0}
          watchOverflow={true}
          observer={true}
          observeParents={true}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 16,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 24,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
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
    </>
  );

  return (
    <section className={`shop-by-style shop--${variant} ${isSplit ? 'shop-by-style--split' : ''}`}>
      {isSplit ? <div className="shop-by-style-split-inner">{content}</div> : content}
    </section>
  );
}