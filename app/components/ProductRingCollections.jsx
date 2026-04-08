import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { RichText } from './RichText';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

export function ProductRingCollections({ title = 'Initiatives', items = [], data = [] }) {
    // Use items if it has length, otherwise fallback to data (static JSON)
    const finalItems = items && items.length > 0 ? items : data;

    /* ===== DESKTOP STATE ===== */
    const [activeIndex, setActiveIndex] = useState(0)
    const [openIndex, setOpenIndex] = useState(-1)
    const bodyRefs = useRef([])

    const toggleDesktop = (index) => {
        setOpenIndex(openIndex === index ? -1 : index)
        setActiveIndex(index)
    }

    if (!finalItems || finalItems.length === 0) return null;

    return (
        <section className="prc">

            {/* ================= DESKTOP ONLY ================= */}
            <div className="prc-desktop">
                <div className="prc-left">
                    {finalItems.map((item, i) => (
                        <img
                            key={i}
                            src={item.image}
                            alt={item.title}
                            className={`prc-image ${i === activeIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <div className="prc-right">
                    <div className="prc-content">
                        <div className="prc-subtitle">{title}</div>

                        {finalItems.map((item, index) => {
                            const isOpen = openIndex === index
                            const bodyEl = bodyRefs.current[index]

                            return (
                                <div
                                    key={index}
                                    className="prc-accordion-item"
                                    onMouseEnter={() => setActiveIndex(index)}
                                >
                                    <div
                                        className="prc-accordion-header"
                                        onClick={() => toggleDesktop(index)}
                                    >
                                        <div className="prc-accordion-title">{item.title}</div>

                                        <div className="prc-accordion-icon">
                                            {isOpen ? <MinusIcon /> : <ChevronIcon />}
                                        </div>
                                    </div>

                                    <div
                                        className="prc-accordion-body"
                                        style={{
                                            height: isOpen && bodyEl ? bodyEl.scrollHeight : 0,
                                        }}
                                    >
                                        <div
                                            ref={(el) => (bodyRefs.current[index] = el)}
                                            className="prc-accordion-body-inner"
                                        >
                                            <RichText
                                                className="prc-description"
                                                html={item.description}
                                            />

                                            {item.link && (
                                                <Link to={item.link} className="prc-link">
                                                    Learn More <ArrowIcon />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* ================= MOBILE ONLY ================= */}
            <div className="prc-mobile">
                <div className="prc-subtitle">{title}</div>

                <Swiper
                    slidesPerView="auto"
                    centeredSlides
                    loop
                    spaceBetween={-16}
                    className="prc-mobile-slider"
                >
                    {finalItems.map((item, index) => (
                        <SwiperSlide key={index} className="prc-mobile-slide">
                            <div className="prc-mobile-card">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="prc-mobile-image"
                                />

                                <div className="prc-mobile-overlay">
                                    {item.link && (
                                        <Link to={item.link} className="prc-mobile-link">
                                            <span className="prc-mobile-title-text">{item.title}</span>
                                            <svg viewBox="0 0 16.933 16.933" width="14">
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


/* ===== ICONS (unchanged) ===== */

function ChevronIcon() {
    return (
        <svg viewBox="0 0 16.933 16.933" width="16">
            <path
                d="m2.117 5.292 6.35 6.35 6.35-6.35"
                fill="none"
                stroke="#fff"
                strokeWidth="1.05"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function MinusIcon() {
    return (
        <svg viewBox="0 0 16.933 16.933" width="16">
            <path
                d="M2.117 8.467h12.7"
                fill="none"
                stroke="#fff"
                strokeWidth="1.05"
                strokeLinecap="round"
            />
        </svg>
    )
}

function ArrowIcon() {
    return (
        <svg viewBox="0 0 16.933 16.933" width="14">
            <path
                d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7"
                transform="rotate(180 8.466 8.466)"
                fill="none"
                stroke="#43bd65"
                strokeWidth="1.05"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
