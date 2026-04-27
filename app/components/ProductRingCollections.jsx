import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router'
import { RichText } from './RichText'

import 'swiper/css'

/* ----------------------------------------
   Utils
---------------------------------------- */

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
  // Handle common theme variables
  if (color === 'var(--primary_color)') return false // Light gray
  if (color === 'var(--bg_light_secondary)') return false // White
  if (color === 'var(--deep_navy)') return true
  if (color === 'var(--deep_sapphire)') return true
  if (color === 'var(--black_color)') return true
  if (color === 'var(--pure_black_color)') return true

  const hex = color.replace('#', '')
  if (hex.length < 6) return false
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}

function normalizeBgColor(bg) {
  if (!bg) return bg
  return bg
}

/* ----------------------------------------
   Component
---------------------------------------- */

export function ProductRingCollections({ title = 'Initiatives', items = [], data = [], variant = 'default' }) {
  const sectionRef = useRef(null)
  const swiperRef = useRef(null)
  const progressRef = useRef(null)

  const finalItems = items && items.length > 0 ? items : data;
  const slidesCount = finalItems.length

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

        const rawBg = finalItems[index]?.bgColor || 'var(--deep_navy)'
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
  }, [finalItems, slidesCount, vh])

  if (!slidesCount) return null

  /* ----------------------------------------
     Render
  ---------------------------------------- */

  return (
    <section
      ref={sectionRef}
      className={`ssw-section prc-sticky-container-new shop--${variant}`}
      style={{ height: `${(slidesCount + 1) * vh}px` }}
    >
      <div className="ssw-inner">
        {/* Optional Title Overlay similar to original PRC */}
        {/* <div 
          className="section-subtitle prc-subtitle-sticky" 
          style={{ color: windowWidth > 767 ? indicatorColor : undefined }}
        >
          {title}
        </div> */}

        <Swiper
          direction="vertical"
          slidesPerView={1}
          allowTouchMove={false}
          simulateTouch={false}
          speed={0}
          onSwiper={(s) => (swiperRef.current = s)}
        >
          {finalItems.map((item, i) => {
            const bg = normalizeBgColor(item.bgColor || 'var(--body_color)')
            const textColor = item.textColor || 'var(--black_color)'

            return (
              <SwiperSlide key={item.id || i}>
                <div className="ssw-slide">
                  <div className="ssw-image">
                    <img
                      src={item.image}
                      alt={item.title || ''}
                    />
                  </div>

                  <div
                    className="ssw-content"
                    style={{
                      backgroundColor: bg,
                      color: textColor,
                    }}
                  >
                    <div className="inner-ssw-right">
                      <div
                        className="section-subtitle prc-subtitle-sticky"
                        style={{ color: windowWidth > 767 ? indicatorColor : undefined }}
                      >
                        {title}
                      </div>
                      <h3 className="section-title" style={{ color: 'inherit' }}>{item.title}</h3>
                      <RichText
                        className="prc-item-description"
                        html={item.description}
                      />

                      {item.link && (
                        <Link
                          to={item.link}
                          className="ssw-link"
                          style={{ color: item.linkColor || textColor }}
                        >
                          {item.linkText || 'Learn More'}
                          <ArrowIcon color={item.linkColor || textColor} />
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

function ArrowIcon({ color }) {
  return (
    <svg viewBox="0 0 16.933 16.933" width="14" height="14">
      <path
        d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7"
        transform="rotate(180 8.466 8.466)"
        fill="none"
        stroke={color || "currentColor"}
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
