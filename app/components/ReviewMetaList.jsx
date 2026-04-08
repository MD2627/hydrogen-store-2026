import { useState } from 'react';
import { Link } from 'react-router';

function ReviewCard({ review }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Some reviews can be very long.
    const isLongText = review.text.length > 50;

    return (
        <div className="review-card-list-item">
            <div className="rml-review-header">
                <div
                    className="rml-review-avatar f-18 ff-c w-300 white-color"
                    style={{ backgroundColor: getAvatarColor(review.initial) }}
                >
                    {review.initial}
                </div>
                <div className="author-info">
                    <div className="rml-author-name-wrapper">
                        <span className="author-name ff-c f-14 w-600 black-color f-m-14">{review.author}</span>
                    </div>
                    <div className="rml-review-stars-row">
                        <div className="rml-stars">
                            {[...Array(review.rating)].map((_, i) => (
                                <span key={i} className="star">★</span>
                            ))}
                        </div>
                        <span className="rml-review-time f-11 ff-n w-400 f-m-12">{review.time}</span>
                    </div>
                </div>
            </div>

            <div className="rml-review-body">
                <div
                    className="comment ff-c f-13 w-400 black-color"
                    style={{
                        maxHeight: isExpanded ? '1000px' : (isLongText ? '57px' : 'auto')
                    }}
                >
                    <p className="review-text">
                        {review.text}
                    </p>
                </div>
                {isLongText && (
                    <button
                        className="rml-read-more-link f-12 ff-c w-400"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? 'Hide' : 'Read more'}
                    </button>
                )}
            </div>

            <div className="rml-review-footer">
                {review.sourceLogo ? (
                    <img src={review.sourceLogo} alt={review.source} className="rml-google-source-logo" />
                ) : (
                    review.source === 'Google' ? (
                        <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/google_x100.png?v=1663569230" alt="Google" className="rml-google-source-logo-fixed" />
                    ) : (
                        <div className="rml-trustpilot-fallback">
                            <span className="star">★</span>
                            <span className="ff-c f-12 w-600 black-color">Trustpilot</span>
                        </div>
                    )
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

export default function ReviewMetaList({ reviews = [] }) {
    const [showWriteReviewPopup, setShowWriteReviewPopup] = useState(false);

    const toggleWriteReviewPopup = () => {
        setShowWriteReviewPopup(!showWriteReviewPopup);
    };

    const googleReviewLink = "https://www.google.com/search?hl=en-AU&gl=au&q=Cullen+Jewellery,+4/232+High+St,+Kew+VIC+3101&ludocid=342683720915465707&lsig=AB86z5VliycXADEjnDB-lH_UkbBU";

    // Only render if reviews exist
    if (!reviews || reviews.length === 0) return null;

    return (
        <div className="review-meta-list-section">
            <div className="page-width">
                {/* Summary Header matching the image */}
                <div className="rml-summary-card-no-slider">
                    <div className="rml-summary-left">
                        <div className="rml-summary-logo">
                            <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/google_x100.png?v=1663569230" alt="Google" />
                        </div>
                        <div className="rml-summary-stats">
                            <span className="rating-number ff-c w-700 black-color">5.0</span>
                            <div className="rml-summary-stars">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="star">★</span>
                                ))}
                            </div>
                            <span className="reviews-count ff-n f-12 w-500">17,816 reviews</span>
                        </div>
                    </div>
                    <div className="summary-right">
                        <button
                            className="rml-write-review-btn ff-n f-13 w-600 white-color"
                            onClick={toggleWriteReviewPopup}
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

                {/* List of Reviews matching the image layout */}
                <div className="rml-reviews-list-container">
                    {reviews.map((review) => (
                        <div key={review.id} className="rml-review-item-container">
                            <ReviewCard review={review} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
