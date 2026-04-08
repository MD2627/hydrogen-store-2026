import { useRef, useState } from 'react'
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
  const [activeIndex, setActiveIndex] = useState(-1)

  return (
    <section className={`ring-collections ${className}`}>

      {/* ================= DESKTOP ================= */}
      <div className="ring-collections-desktop">
        <div className="ring-collections-left">
          <img
            src={defaultImage}
            alt="Default"
            className={`ring-collections-image ${activeIndex === -1 ? 'active' : ''
              }`}
          />

          {categories.map((item, i) => (
            <img
              key={i}
              src={item.image}
              alt={item.name}
              className={`ring-collections-image ${i === activeIndex ? 'active' : ''
                }`}
            />
          ))}
        </div>

        <div className="ring-collections-right">
          <div className="ring-collections-content">
            <h2 className="prc-subtitle">
              {title}
            </h2>

            <div
              className="ring-collections-list"
              onMouseLeave={() => setActiveIndex(-1)}
            >
              {categories.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`ring-collection-item ${index === activeIndex ? 'active' : ''
                    }`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE (SWIPER) ================= */}
      <div className="ring-collections-mobile">
        <h2 className="prc-subtitle">
          {title}
        </h2>

        <Swiper
          slidesPerView="auto"
          centeredSlides
          loop
          spaceBetween={-40}
          className="ring-collections-slider"
        >
          {categories.map((item, index) => (
            <SwiperSlide
              key={index}
              className="ring-collections-slide"
            >
              <div className="ring-collections-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="ring-collections-image-mobile"
                />


                <div className="prc-mobile-overlay">
                  {item.link && (
                    <Link
                      to={item.link}
                      className="prc-mobile-link"
                    >
                      <span className="prc-mobile-title-text">
                        {item.name}
                      </span>
                      <svg
                        viewBox="0 0 16.933 16.933"
                        width="14"
                      >
                        <path
                          d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7"
                          transform="rotate(180 8.466 8.466)"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="1.05"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  )
}
