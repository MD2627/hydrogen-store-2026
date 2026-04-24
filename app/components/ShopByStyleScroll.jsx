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
                    {archLayout ? (
                        <div className="sbss-v2-bento-grid">
                            {items.slice(0, 3).map((item, index) => (
                                <ShopByStyleBentoCard key={index} item={item} index={index + 1} />
                            ))}
                        </div>
                    ) : items.length > 3 ? (
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

function ShopByStyleBentoCard({ item, index }) {
    const isLink = !!item.link;
    const Tag = isLink ? Link : 'div';
    const tagProps = isLink ? { to: item.link, className: 'sbss-v2-bento-card', "aria-label": item.name } : { className: 'sbss-v2-bento-card is-static' };

    const paddedIndex = `— 0${index}`;

    let desc = '';
    let ctaLabel = 'EXPLORE';

    if (item.name?.toLowerCase().includes('showroom')) {
        desc = "Step into intimate spaces curated for considered moments. Discover our collections under the guidance of a personal advisor.";
        ctaLabel = "FIND A SHOWROOM";
    } else if (item.name?.toLowerCase().includes('appointment')) {
        ctaLabel = "BOOK A SESSION";
    } else if (item.name?.toLowerCase().includes('bespoke') || item.name?.toLowerCase().includes('atelier')) {
        ctaLabel = "BEGIN A CREATION";
    }

    return (
        <Tag {...tagProps}>
            <div className="sbss-v2-bento-media">
                {item.image && (
                    <img src={item.image} alt={item.name || ''} loading="lazy" />
                )}
                <div className="sbss-v2-bento-gradient"></div>
            </div>

            <div className="sbss-v2-bento-content">
                <div className="sbss-v2-bento-top">
                    <span className="bento-index f-18 w-600 white-color letter-spacing-1">{paddedIndex}</span>
                </div>

                <div className="sbss-v2-bento-bottom">
                    <h3 className="bento-title f-36 w-400 white-color ff-c mb-3">{item.name}</h3>
                    {desc && <p className="bento-desc f-13 w-400 white-color l-h-1-5 ff-c mb-4" style={{ maxWidth: '350px' }}>{desc}</p>}

                    <div className="bento-cta-row">
                        <span className="bento-cta-text f-10 w-700 white-color letter-spacing-2">{ctaLabel}</span>
                        <div className="bento-cta-circle">
                            <CircleArrowIcon />
                        </div>
                    </div>
                </div>
            </div>
        </Tag>
    );
}

function CircleArrowIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeOpacity="1" strokeWidth="1" />
            <path d="M10 14L14 10M14 10H10.5M14 10V13.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
