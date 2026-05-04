import { useState } from 'react';
import { Link } from 'react-router';

function ReviewCard({ review, index }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = review.text.length > 150;

    return (
        <div className={`rev-v2-card rev-v2-item rev-v2-item-list`}>
            <div className="rev-v2-item-header">
                <div 
                    className="rev-v2-avatar" 
                    style={{ backgroundColor: getAvatarColor(review.initial) }}
                >
                    {review.initial}
                </div>
                <div className="rev-v2-author-meta">
                    <span className="rev-v2-author-name">{review.author}</span>
                    <span className="rev-v2-item-time">{review.time || 'Verified Purchase'}</span>
                </div>
                <div className="rev-v2-item-stars">
                    {"★".repeat(review.rating)}
                </div>
            </div>
            
            <div className="rev-v2-item-content">
                <p 
                    className={!isExpanded && isLongText ? 'line-clamp-3' : ''}
                    onClick={() => isLongText && setIsExpanded(!isExpanded)}
                    style={{ cursor: isLongText ? 'pointer' : 'default' }}
                >
                    "{review.text}"
                </p>
                {isLongText && (
                    <button 
                        className="rev-v2-read-more"
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            padding: 0, 
                            marginTop: '8px',
                            fontSize: '12px',
                            color: 'var(--cyan_color)',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                )}
            </div>

            <div className="rev-v2-item-footer">
                <img
                    src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/google_x100.png?v=1663569230"
                    alt="Google"
                    className="rev-v2-source-icon"
                />
            </div>
        </div>
    );
}

function getAvatarColor(initial) {
    const colors = ['#003B4D', '#00D1FF', '#2C2F3A', '#7f8c8d'];
    const index = initial ? initial.charCodeAt(0) % colors.length : 0;
    return colors[index];
}

export default function ReviewMetaList({ reviews = [] }) {
    const [showWriteReviewPopup, setShowWriteReviewPopup] = useState(false);

    const toggleWriteReviewPopup = () => {
        setShowWriteReviewPopup(!showWriteReviewPopup);
    };

    const googleReviewLink = "https://www.google.com/search?q=diamond+Jewellery";

    // Summary data matching the home page
    const summary = {
        rating: "5.0",
        count: "17,816",
        stars: 5,
        source: "Google Reviews"
    };

    if (!reviews || reviews.length === 0) return null;

    return (
        <section className="rev-v2 review-meta-list-section">
            <div className="page-width">
                <div className="rev-v2-grid">
                    {/* Summary Header matching the Bento Style */}
                    <div className="rev-v2-card rev-v2-summary">
                        <div className="rev-v2-summary-inner">
                            <span className="section-subtitle">Our Reputation</span>
                            <h2 className="section-title">Verified Reviews</h2>
                            <div className="rev-v2-rating-big">
                                <span className="rev-v2-number">{summary.rating}</span>
                                <div className="rev-v2-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="rev-v2-star">★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="rev-v2-count">Trusted by over {summary.count} customers for our quality and service.</p>
                            
                            <div className="rev-v2-actions">
                                <a 
                                    href={googleReviewLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rev-v2-btn-primary sb-button"
                                >
                                    WRITE A REVIEW
                                </a>
                                <span className="rev-v2-source-text ff-c f-12" style={{ marginTop: '10px', opacity: 0.6 }}>
                                    on Google Reviews
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* List of Reviews matching the home page grid layout */}
                    {reviews.map((review, index) => (
                        <ReviewCard key={review.id} review={review} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

