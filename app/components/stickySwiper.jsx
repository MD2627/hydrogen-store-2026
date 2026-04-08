import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router'

import 'swiper/css'

/* ----------------------------------------
   Utils
---------------------------------------- */

const BRAND_GREEN = 'var(--primary_color)'

function getStableVH() {
  if (typeof window === 'undefined') return 0
  if (typeof document === 'undefined') return 0

  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
}

function isDark(color) {
  if (!color) return false
  const hex = color.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}

function normalizeBgColor(bg) {
  if (!bg) return bg

  if (bg === 'rgb(31, 95, 59)') return BRAND_GREEN
  if (bg.toLowerCase() === '#1f5f3b') return BRAND_GREEN

  return bg
}

/* ----------------------------------------
   Component
---------------------------------------- */

export function StickySwiper({ data = [] }) {
  const sectionRef = useRef(null)
  const swiperRef = useRef(null)
  const progressRef = useRef(null)

  const slidesCount = data.length

  const [activeIndex, setActiveIndex] = useState(0)
  const [indicatorColor, setIndicatorColor] = useState('#fff')
  const [trackColor, setTrackColor] = useState('rgba(255,255,255,0.3)')
  const [vh, setVh] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  /* Stable VH */
  useEffect(() => {
    const updateVH = () => {
      // Avoid vertical resize jumps on mobile by checking width
      if (window.innerWidth !== windowWidth) {
        setVh(getStableVH())
        setWindowWidth(window.innerWidth)
      }
    }

    setVh(getStableVH())
    setWindowWidth(window.innerWidth)

    window.addEventListener('resize', updateVH)
    window.addEventListener('orientationchange', updateVH)

    return () => {
      window.removeEventListener('resize', updateVH)
      window.removeEventListener('orientationchange', updateVH)
    }
  }, [windowWidth])

  /* Scroll → Slide Sync */
  useEffect(() => {
    if (!sectionRef.current || !swiperRef.current || vh === 0) return

    const section = sectionRef.current
    const swiper = swiperRef.current
    const totalScroll = (slidesCount + 1) * vh

    const onScroll = () => {
      const rect = section.getBoundingClientRect()

      const isMobile = window.innerWidth <= 767
      const offset = isMobile ? 88 : 0

      const scrolled = Math.min(
        Math.max(offset - rect.top, 0),
        totalScroll
      )

      const index = Math.min(
        slidesCount - 1,
        Math.floor(scrolled / vh)
      )

      const slideStart = index * vh
      const slideProgress = (scrolled - slideStart) / vh

      if (swiper.activeIndex !== index) {
        swiper.slideTo(index, 0)
        setActiveIndex(index)

        const rawBg = data[index]?.bgColor
        const bg = normalizeBgColor(rawBg)
        const dark = isDark(bg)

        setIndicatorColor(dark ? '#fff' : '#111')
        setTrackColor(
          dark
            ? 'rgba(255,255,255,0.3)'
            : 'rgba(0,0,0,0.3)'
        )
      }

      if (progressRef.current) {
        progressRef.current.value = Math.min(
          Math.max(slideProgress, 0),
          1
        )
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [data, slidesCount, vh])

  if (!slidesCount) return null

  /* ----------------------------------------
     Render
  ---------------------------------------- */

  return (
    <section
      ref={sectionRef}
      className="ssw-section"
      style={{ height: `${(slidesCount + 1) * vh}px` }}
    >
      <div className="ssw-inner">
        <Swiper
          direction="vertical"
          slidesPerView={1}
          allowTouchMove={false}
          simulateTouch={false}
          speed={0}
          onSwiper={(s) => (swiperRef.current = s)}
        >
          {data.map((slide, i) => {
            const bg = normalizeBgColor(slide.bgColor)

            return (
              <SwiperSlide key={slide.id || i}>
                <div className="ssw-slide">
                  <div className="ssw-image">
                    <img
                      src={slide.image?.src}
                      alt={slide.image?.alt || ''}
                    />
                  </div>

                  <div
                    className="ssw-content"
                    style={{
                      backgroundColor: bg,
                      color: slide.textColor,
                    }}
                  >
                    <div className="inner-ssw-right">
                      <h2>{slide.title}</h2>
                      <p>{slide.text}</p>

                      {slide.link && slide.linkText && (
                        <Link
                          to={slide.link}
                          className="ssw-link"
                          style={{ color: slide.linkColor || slide.textColor }}
                        >
                          {slide.linkText}
                          <svg
                            viewBox="0 0 16.933 16.933"
                            width="14"
                            height="14"
                          >
                            <path
                              d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7"
                              transform="rotate(180 8.466 8.466)"
                              fill="none"
                              stroke={slide.linkColor || slide.textColor}
                              strokeWidth="1.05"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        <div
          className="ssw-indicator"
          style={{ color: indicatorColor, '--track': trackColor }}
        >
          <div className="ssw-count">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(slidesCount).padStart(2, '0')}</span>
          </div>

          <progress
            ref={progressRef}
            className="ssw-progress"
            max={1}
            value={0}
          />
        </div>
      </div>
    </section>
  )
}
