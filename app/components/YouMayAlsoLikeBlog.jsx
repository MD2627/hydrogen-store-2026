import { Link, useLoaderData } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { useRef, useState, useEffect, useMemo } from 'react';

export function YouMayAlsoLikeBlog({
    blog: customBlog,
    content = {},
    sliderConfig = {}
}) {
    const loaderData = useLoaderData();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            // Lower threshold to 1024px to ensure desktop (1200px+) uses the grid layout.
            setIsMobile(window.innerWidth < 1024);
        };
        if (typeof window !== 'undefined') {
            checkScreen();
            window.addEventListener('resize', checkScreen);
            return () => window.removeEventListener('resize', checkScreen);
        }
    }, []);

    // Blog priority: prop > loader
    const sourceBlog = customBlog || loaderData?.blog;
    const article = loaderData?.article;

    const scrollRef = useRef(null);

    if (!sourceBlog?.articles?.nodes?.length) return null;

    // Use higher limit for mobile slider mode, default to 3 for desktop grid
    const isSliderEnabled = !!sliderConfig?.arrow && isMobile;
    const RELATED_LIMIT = isSliderEnabled ? 10 : 3;

    // Stabilize the randomization so it doesn't reshuffle on every tiny state change
    const relatedArticles = useMemo(() => {
        return sourceBlog.articles.nodes
            .filter((item) => item.handle !== article?.handle)
            .sort(() => 0.5 - Math.random())
            .slice(0, RELATED_LIMIT);
    }, [sourceBlog, article, RELATED_LIMIT]);

    if (!relatedArticles.length) return null;

    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const scrollAmount = container.clientWidth * 0.8;
            if (direction === 'left') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className={`you-may-also-like ${isSliderEnabled ? 'is-slider-mode' : ''}`}>
            <div className="shop-by-style-header">
                {content.title && (
                    <h2 className="you-may-also-like__title">
                        {content.title}
                    </h2>
                )}

                {content.subtitle && (
                    <p className="you-may-also-like__subtitle">
                        {content.subtitle}
                    </p>
                )}
            </div>

            <div className="you-may-also-like__container" style={{ position: 'relative' }}>
                {isSliderEnabled && (
                    <>
                        <button
                            className="custom-prev-arrow mobile-only-arrow"
                            onClick={() => scroll('left')}
                            aria-label="Previous slide"
                        >
                            <svg viewBox="0 0 16.933 16.933"><path d="m11.641 2.117-6.35 6.35 6.35 6.35" fill="none" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                        <button
                            className="custom-next-arrow mobile-only-arrow"
                            onClick={() => scroll('right')}
                            aria-label="Next slide"
                        >
                            <svg viewBox="0 0 16.933 16.933"><path d="m5.292 14.816 6.35-6.35-6.35-6.35" fill="none" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                    </>
                )}

                <div
                    className={`you-may-also-like__grid ${isSliderEnabled ? 'scrollable-grid' : ''}`}
                    ref={scrollRef}
                >
                    {relatedArticles.map((item) => (
                        <Link
                            key={item.id}
                            to={`/blogs/${sourceBlog.handle}/${item.handle}`}
                            className="you-may-also-like__card"
                        >
                            {item.image && (
                                <Image
                                    data={item.image}
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    loading="lazy"
                                />
                            )}

                            <h3 className="you-may-also-like__card-title">
                                {item.title}
                                <svg
                                    viewBox="0 0 16.933 16.933"
                                    width="14"
                                    height="14"
                                >
                                    <path
                                        d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7"
                                        transform="rotate(180 8.466 8.466)"
                                        fill="none"
                                        stroke="#232323"
                                        strokeWidth="1.05"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
