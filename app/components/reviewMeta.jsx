import { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router';

function ReviewCard({ review }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Memoize initials and avatar color to avoid recalculation
    const avatarColor = useMemo(() => getAvatarColor(review.initial), [review.initial]);

    return (
        <div className="review-card">
            <div className="review-header">
                <div
                    className="review-avatar f-18 ff-c w-300"
                    style={{ backgroundColor: avatarColor }}
                >
                    {review.initial}
                </div>
                <div className="author-info">
                    <span className="author-name ff-c f-12 w-500">{review.author}</span>
                    <div className="review-stars-row">
                        <div className="stars">
                            {"★".repeat(review.rating).split("").map((star, i) => (
                                <span key={i} className="star">{star}</span>
                            ))}
                        </div>
                        <span className="review-time f-9 ff-c w-300">{review.time}</span>
                    </div>
                </div>
            </div>
            <div className="review-body">
                <div
                    className={`comment ff-c f-12 w-300 ${isExpanded ? 'expanded' : ''}`}
                    style={{
                        maxHeight: isExpanded ? '1000px' : '67px',
                        overflow: 'hidden',
                        transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    <p className="review-text">
                        {review.text}
                    </p>
                </div>
                {review.text.length > 50 && (
                    <button
                        className="read-more-link f-11 ff-c w-600"
                        onClick={() => setIsExpanded(!isExpanded)}
                        type="button"
                    >
                        {isExpanded ? 'Hide' : 'Read more'}
                    </button>
                )}
            </div>
            <div className="review-footer">
                {review.sourceLogo ? (
                    <img src={review.sourceLogo} alt={review.source || "Source"} className="google-source-logo" loading="lazy" />
                ) : (
                    review.source === 'Google' && (
                        <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/google_x100.png?v=1663569230" alt="Google" className="google-source-logo" loading="lazy" />
                    )
                )}
            </div>
        </div>
    );
}

export default function ReviewMeta({ reviews = [] }) {
    const [showWriteReviewPopup, setShowWriteReviewPopup] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Swiper should only initialize on the client to avoid hydration issues
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleWriteReviewPopup = () => {
        setShowWriteReviewPopup(!showWriteReviewPopup);
    };

    const googleReviewLink = "https://www.google.com/search?hl=en-AU&gl=au&q=Cullen+Jewellery,+4/232+High+St,+Kew+VIC+3101&ludocid=342683720915465707&lsig=AB86z5VliycXADEjnDB-lH_UkbBU";

    // If no reviews are provided, don't render the section
    if (!reviews || reviews.length === 0) return null;

    return (
        <div className="review-meta-section">
            <div className="page-width">
                {isMounted ? (
                    <Swiper
                        key={reviews.length} // Force re-init if data changes
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={10}
                        slidesPerView={1.8}
                        centeredSlides={true}
                        navigation
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={reviews.length > 5}
                        observer={true}
                        observeParents={true}
                        watchSlidesProgress={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 2.2,
                            },
                            1024: {
                                slidesPerView: 4.2,
                            },
                            1440: {
                                loop: false,
                                slidesPerView: 5.4,
                                centeredSlides: false,
                            }
                        }}
                        className="reviews-swiper"
                    >
                        {/* Header/Summary Slide */}
                        <SwiperSlide className="review-slide-summary">
                            <div className="summary-card">
                                <div className="summary-logos">
                                    <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/google_x100.png?v=1663569230" alt="Google" className="google-logo-summary" />
                                </div>
                                <div className="summary-rating">
                                    <span className="rating-number ff-c f-13 w-500">5.0</span>
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="star">★</span>
                                        ))}
                                    </div>
                                    <span className="reviews-count ff-c f-9 w-500">17,816 reviews</span>
                                </div>
                                <div className="summary-buttons">
                                    <Link
                                        to="/reviews"
                                        rel="noreferrer"
                                        className="banner-btn summary-btn read-reviews-btn"
                                    >
                                        READ OUR REVIEWS
                                    </Link>
                                    <div className="write-review-container">
                                        <button
                                            className="banner-btn summary-btn write-review-btn"
                                            onClick={toggleWriteReviewPopup}
                                            type="button"
                                        >
                                            WRITE A REVIEW
                                        </button>
                                        {showWriteReviewPopup && (
                                            <div className="write-review-popup">
                                                <a
                                                    href={googleReviewLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="popup-option google-option"
                                                >
                                                    <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/google_x100.png?v=1663569230" alt="Google" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Review Slides */}
                        {reviews.map((review) => (
                            <SwiperSlide key={review.id} className="review-slide-item">
                                <ReviewCard review={review} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="reviews-swiper-skeleton" style={{ height: '240px' }}></div>
                )}
            </div>
        </div>
    );
}


function getAvatarColor(initial) {
    const colors = ['#1a4d2e', '#2c3e50', '#a29bfe', '#fab1a0', '#00cec9', '#d63031', '#1e90ff', '#ff9f43'];
    const index = initial ? initial.charCodeAt(0) % colors.length : 0;
    return colors[index];
}
