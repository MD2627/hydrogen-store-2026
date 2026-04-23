import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function ReviewMeta({ reviews = [] }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Summary data
    const summary = {
        rating: "5.0",
        count: "17,816",
        stars: 5,
        source: "Google Reviews"
    };

    if (!reviews || reviews.length === 0) return null;

    // Take top 6 reviews for a complete bento grid
    const displayReviews = reviews.slice(0, 6);

    return (
        <section className="rev-v2">
            <div className="page-width">
                <div className="rev-v2-grid">
                    {/* Header Card (Bento Style) - Index is effectively -1 */}
                    <div className="rev-v2-card rev-v2-summary">
                        <div className="rev-v2-summary-inner">
                            <span className="section-subtitle">Our Reputation</span>
                            <h2 className="section-title">Handcrafted Excellence</h2>
                            <div className="rev-v2-rating-big">
                                <span className="rev-v2-number">{summary.rating}</span>
                                <div className="rev-v2-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="rev-v2-star">★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="rev-v2-count">Trusted by over {summary.count} couples worldwide.</p>
                            <div className="rev-v2-actions">
                                <Link to="/reviews" className="rev-v2-btn-primary sb-button">View All Stories</Link>
                                <a
                                    href="https://www.google.com/search?q=Cullen+Jewellery"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rev-v2-btn-secondary"
                                >
                                    Write a Review
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Review Cards */}
                    {displayReviews.map((review, index) => (
                        <div key={review.id} className={`rev-v2-card rev-v2-item rev-v2-item-${index}`}>
                            <div className="rev-v2-item-header">
                                <div className="rev-v2-avatar" style={{ backgroundColor: getAvatarColor(review.initial) }}>
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
                                <p>"{review.text}"</p>
                            </div>
                            <div className="rev-v2-item-footer">
                                <img
                                    src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/google_x100.png?v=1663569230"
                                    alt="Google"
                                    className="rev-v2-source-icon"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function getAvatarColor(initial) {
    const colors = ['#001b10', '#1a4d2e', '#2c3e50', '#7f8c8d'];
    const index = initial ? initial.charCodeAt(0) % colors.length : 0;
    return colors[index];
}
