import { useState } from 'react'
import { Link } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

export function RingCollections({
  title,
  defaultImage,
  categories,
  className = '',
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!categories || categories.length === 0) return null;

  return (
    <section className={`rc-v2 ${className}`}>

      {/* ================= DESKTOP (Horizontal Accordion) ================= */}
      <div className="rc-v2-desktop">
        <div className="rc-v2-accordion">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`rc-v2-item ${index === activeIndex ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Background Image */}
              <div className="rc-v2-bg">
                <img src={item.image} alt={item.name} />
                <div className="rc-v2-overlay"></div>
              </div>

              {/* Vertical Label (for non-active items) */}
              <div className="rc-v2-vertical-label">
                <span>{item.name}</span>
              </div>

              {/* Active Content (for active item) */}
              <div className="rc-v2-content">
                <div className="rc-v2-content-inner">
                  <h3 className="rc-v2-item-title section-title">{item.name}</h3>
                  <p className="rc-v2-item-desc">
                    Explore our curated {item.name.toLowerCase()} collections,
                    handcrafted with sustainable materials and timeless design.
                  </p>
                  <Link to={item.link} className="rc-v2-cta">
                    SHOP COLLECTION
                    <svg viewBox="0 0 16.933 16.933" width="16">
                      <path d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7" transform="rotate(180 8.466 8.466)" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MOBILE (Classic Slider) ================= */}
      <div className="rc-v2-mobile">
        <div className="rc-v2-mobile-header">
          <h2 className="section-title">{title}</h2>
        </div>

        <Swiper
          slidesPerView={1.2}
          centeredSlides={true}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="rc-v2-mobile-slider"
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={item.link} className="rc-v2-mobile-card">
                <div className="rc-v2-mobile-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="rc-v2-mobile-info">
                  <h3>{item.name}</h3>
                  <div className="rc-v2-mobile-arrow">
                    <svg viewBox="0 0 16.933 16.933" width="18">
                      <path d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7" transform="rotate(180 8.466 8.466)" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  )
}
