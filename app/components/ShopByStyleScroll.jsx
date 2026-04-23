import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, FreeMode } from 'swiper/modules';
import { Link } from 'react-router';
import { RichText } from './RichText';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';

export function ShopByStyleScroll({
    title = "Shop Lab Diamond Engagement Rings by Style",
    description = (
        <>
            Discover our signature setting styles, including{' '}
            <Link to="/engagement?style=solitaire">solitaire</Link>,{' '}
            <Link to="/engagement?style=trilogy">trilogy</Link>,{' '}
            <Link to="/engagement?style=halo">halo</Link>,{' '}
            <Link to="/engagement?style=toi-et-moi">toi et moi</Link>{' '}
            and{' '}
            <Link to="/engagement?style=bezel">bezel</Link>.
        </>
    ),
    items = [],
    variant = 'default',
    archLayout = false,
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !items || items.length === 0) return null;

    return (
        <section className={`sbss-v2 shop--${variant}${archLayout ? ' sbss-v2--arch' : ''}`}>
            <div className="page-width">
                <div className="sbss-v2-header">
                    <div className="sbss-v2-header-text">
                        <span className="section-subtitle">Collections</span>
                        <h2 className="section-title">{title}</h2>
                    </div>
                    {description && (
                        <div className="sbss-v2-desc">
                            {typeof description === "string"
                                ? <RichText html={description} />
                                : description
                            }
                        </div>
                    )}
                </div>

                <div className="sbss-v2-slider-container">
                    {items.length > 3 ? (
                        <Swiper
                            modules={[Scrollbar, FreeMode]}
                            scrollbar={{ draggable: true, hide: false }}
                            freeMode={true}
                            grabCursor={true}
                            watchOverflow={true}
                            slidesPerView={'auto'}
                            spaceBetween={16}
                            breakpoints={{
                                768: {
                                    spaceBetween: 24,
                                },
                                1024: {
                                    spaceBetween: 32,
                                }
                            }}
                            className="sbss-v2-swiper"
                        >
                            {items.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <ShopByStyleCard item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="sbss-v2-static-grid">
                            {items.map((item, index) => (
                                <ShopByStyleCard key={index} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function ShopByStyleCard({ item }) {
    if (item.link) {
        return (
            <Link
                to={item.link}
                className="sbss-v2-card"
                aria-label={item.name || 'View collection'}
            >
                <div className="sbss-v2-media">
                    {item.image && (
                        <img
                            src={item.image}
                            alt={item.name || ''}
                            loading="lazy"
                        />
                    )}
                    <div className="sbss-v2-overlay">
                        <div className="sbss-v2-card-content">
                            <span className="sbss-v2-card-name">{item.name}</span>
                            <span className="sbss-v2-card-cta">
                                Explore
                                <ArrowIcon />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <div className="sbss-v2-card is-static">
            <div className="sbss-v2-media">
                {item.image && (
                    <img
                        src={item.image}
                        alt={item.name || ''}
                        loading="lazy"
                    />
                )}
                <div className="sbss-v2-overlay">
                    <div className="sbss-v2-card-content">
                        <span className="sbss-v2-card-name">{item.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArrowIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
