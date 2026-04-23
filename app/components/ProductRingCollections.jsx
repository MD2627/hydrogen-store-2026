import { useRef, useEffect } from 'react';
import { Link } from 'react-router'
import { RichText } from './RichText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Parallax } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/parallax';

export function ProductRingCollections({ title = 'Initiatives', items = [], data = [] }) {
    const swiperRef = useRef(null);
    const containerRef = useRef(null);

    const finalItems = items && items.length > 0 ? items : data;

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !swiperRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // When the section is sticky (top hit 0)
            if (sectionTop <= 0 && -sectionTop <= sectionHeight - viewportHeight) {
                const totalScrollable = sectionHeight - viewportHeight;
                const scrollProgress = -sectionTop / totalScrollable;

                // Calculate which slide should be active (0 to N-1)
                const slideIndex = Math.min(
                    Math.floor(scrollProgress * finalItems.length),
                    finalItems.length - 1
                );

                if (swiperRef.current.activeIndex !== slideIndex) {
                    swiperRef.current.slideTo(slideIndex);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [finalItems.length]);

    if (!finalItems || finalItems.length === 0) return null;

    const totalHeight = `${finalItems.length * 100}vh`;

    return (
        <section
            className="prc-sticky-container"
            ref={containerRef}
            style={{ height: totalHeight }}
        >
            <div className="prc-sticky-wrapper">
                <div className="section-subtitle prc-subtitle-sticky">{title}</div>
                <Swiper
                    direction={'vertical'}
                    slidesPerView={1}
                    spaceBetween={0}
                    speed={800}
                    parallax={true}
                    allowTouchMove={false}
                    simulateTouch={false}
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    modules={[Pagination, Parallax]}
                    className="prc-swiper"
                >
                    {finalItems.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="page-width prc-slide-container">
                                <div className="prc-item-slide">
                                    <div
                                        className="prc-item-img-side"
                                        data-swiper-parallax="-200"
                                        data-swiper-parallax-duration="1000"
                                    >
                                        <div className="prc-item-img-wrapper">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="prc-item-img"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className="prc-item-text-side"
                                        data-swiper-parallax="200"
                                        data-swiper-parallax-duration="1000"
                                    >
                                        <h3 className="section-title">{item.title}</h3>
                                        <RichText
                                            className="prc-item-description"
                                            html={item.description}
                                        />
                                        {item.link && (
                                            <Link to={item.link} className="prc-item-link">
                                                Learn More <ArrowIcon />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

function ArrowIcon() {
    return (
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
    )
}
