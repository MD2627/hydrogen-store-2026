import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

export function ExpertGuidance({ articles }) {
    const [isTablet, setIsTablet] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const checkScreen = () => {
            // Using 970px breakpoint as per original implementation
            setIsTablet(window.innerWidth < 970);
        };
        // Check initially
        if (typeof window !== 'undefined') {
            checkScreen();
            window.addEventListener('resize', checkScreen);
            return () => window.removeEventListener('resize', checkScreen);
        }
    }, []);

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

    if (!articles || articles.length === 0) return null;

    return (
        <section className="expert-guidance-section">
            <div className="container">
                <div className="expert-header">
                    <h2>Expert Guidance</h2>
                    <div className="border-line"></div>
                    <p>Empowering you with insights for selecting and acquiring the ideal ring.</p>
                </div>

                {!isTablet ? (
                    <div className="expert-grid">
                        {articles.map((article, index) => (
                            <Link to={article.link} key={index} className="expert-card">
                                <div className="card-image">
                                    <img src={article.image} alt={article.title} />
                                </div>
                                <div className="card-content">
                                    <h3>{article.title}</h3>
                                    <div className="arrow-icon">
                                        <svg viewBox="0 0 16.933 16.933" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path style={{ fill: 'none', stroke: '#000', strokeWidth: '1.05831', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '4', strokeDasharray: 'none', strokeOpacity: '1' }} d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7" className="stroke" transform="rotate(180 8.466 8.466)"></path></svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="expert-slider" style={{ position: 'relative' }}>
                        <button
                            className="custom-prev-arrow"
                            onClick={() => scroll('left')}
                            aria-label="Previous slide"
                        >
                            <svg viewBox="0 0 16.933 16.933" width="16" height="16"><path d="m11.641 2.117-6.35 6.35 6.35 6.35" fill="none" stroke="currentColor" strokeWidth="1.05831" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                        <button
                            className="custom-next-arrow"
                            onClick={() => scroll('right')}
                            aria-label="Next slide"
                        >
                            <svg viewBox="0 0 16.933 16.933" width="16" height="16"><path d="m5.292 14.816 6.35-6.35-6.35-6.35" fill="none" stroke="currentColor" strokeWidth="1.05831" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>

                        <div className="expert-scroll-container" ref={scrollRef}>
                            {articles.map((article, index) => (
                                <div key={index} className="expert-slide-item">
                                    <Link to={article.link} className="expert-card">
                                        <div className="card-image">
                                            <img src={article.image} alt={article.title} />
                                        </div>
                                        <div className="card-content">
                                            <h3>{article.title}</h3>
                                            <div className="arrow-icon">
                                                <svg viewBox="0 0 16.933 16.933" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path style={{ fill: 'none', stroke: '#000', strokeWidth: '1.05831', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '4', strokeDasharray: 'none', strokeOpacity: '1' }} d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7" className="stroke" transform="rotate(180 8.466 8.466)"></path></svg>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

