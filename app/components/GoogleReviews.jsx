import { useState, useEffect, useRef } from 'react';

/**
 * GoogleReviews Component - Cullen Style
 * Displays Google reviews in a clean list format with infinite scroll
 * 
 * Props:
 * - placeId: Google Place ID (required)
 * - apiKey: Google Places API key (required)
 * - reviews: Pre-fetched reviews array (from server)
 * - placeDetails: Pre-fetched place details (from server)
 * - error: Error message from server-side fetch
 * - maxReviews: Maximum number of reviews to display (default: 10)
 * - showRating: Show overall rating (default: true)
 */
export default function GoogleReviews({
  placeId,
  apiKey,
  reviews: serverReviews = [],
  placeDetails: serverPlaceDetails = null,
  error: serverError = null,
  maxReviews = 10,
  showRating = true
}) {
  // State for infinite scroll
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const observerTarget = useRef(null);

  const reviewsPerPage = 5; // Load 5 reviews at a time

  // Use server-fetched data directly
  const allReviews = serverReviews;
  const placeDetails = serverPlaceDetails;
  const error = serverError;

  // Initialize with first batch of reviews
  useEffect(() => {
    if (allReviews.length > 0) {
      const initialReviews = allReviews.slice(0, reviewsPerPage);
      setDisplayedReviews(initialReviews);
      setHasMore(allReviews.length > reviewsPerPage);
    }
  }, [allReviews]);

  // Load more reviews
  const loadMoreReviews = () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Simulate loading delay for smooth UX
    setTimeout(() => {
      const startIndex = currentPage * reviewsPerPage;
      const endIndex = startIndex + reviewsPerPage;
      const newReviews = allReviews.slice(startIndex, endIndex);

      if (newReviews.length > 0) {
        setDisplayedReviews(prev => [...prev, ...newReviews]);
        setCurrentPage(prev => prev + 1);
        setHasMore(endIndex < allReviews.length);
      } else {
        setHasMore(false);
      }

      setIsLoadingMore(false);
    }, 500);
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMoreReviews();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoadingMore, currentPage]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="star-icon filled" viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="star-icon half-filled" viewBox="0 0 24 24" width="20" height="20">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#e0e0e0" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-${i})`}
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="star-icon empty" viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="#e0e0e0"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        );
      }
    }

    return <div className="stars-container">{stars}</div>;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Handle image load errors
  const handleImageError = (index) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  if (error) {
    return (
      <div className="google-reviews-error">
        <p>Unable to load reviews at this time.</p>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="google-reviews-container">
      {showRating && placeDetails && (
        <div className="google-reviews-header">
          <div className="overall-rating">
            <div className="rating-badges">
              <div className="badge-item">
                <img src="https://cdn.shopify.com/s/files/1/0801/7317/0906/files/google_x100_3df241c5-1997-46be-ac0b-c52ba09491c3.png?v=1769584656" alt="Google" />
              </div>
            </div>
            <div className="rating-container">
              <div className="rating-info">
                <span className="rating-number f-13 black-color ff-c fw-600 l-h-1-2">{placeDetails.rating.toFixed(1)}</span>
                {renderStars(placeDetails.rating)}
              </div>
              <p className="rating-count black-color f-9 ff-c fw-300 l-h-1-2">{placeDetails.userRatingCount.toLocaleString()} reviews</p>
            </div>
          </div>

          <a
            href={`https://search.google.com/local/writereview?placeid=${placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="write-review-btn white-color f-11 ff-n fw-300 l-h-1-2"
          >
            WRITE A REVIEW
          </a>
        </div>
      )}

      {allReviews.length === 0 ? (
        <div className="no-reviews">
          <p>No reviews available yet.</p>
        </div>
      ) : (
        <>
          <div className="google-reviews-list">
            {displayedReviews.map((review, index) => {
              // Debug logging
              if (index === 0) {
                console.log('Rendering first review:', {
                  authorName: review.authorAttribution?.displayName,
                  photoUri: review.authorAttribution?.photoUri,
                  hasError: imageErrors[index],
                  fullAuthorData: review.authorAttribution
                });
              }

              return (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-avatar" style={{ background: getAvatarColor(index) }}>
                      {review.authorAttribution?.photoUri && !imageErrors[index] ? (
                        <img
                          src={review.authorAttribution.photoUri}
                          alt={review.authorAttribution.displayName}
                          crossOrigin="anonymous"
                          onError={(e) => {
                            console.log(`Image failed to load for ${review.authorAttribution?.displayName}:`, review.authorAttribution?.photoUri);
                            handleImageError(index);
                          }}
                          onLoad={() => {
                            console.log(`Image loaded successfully for ${review.authorAttribution?.displayName}`);
                          }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        />
                      ) : (
                        <span className="avatar-initials white-color f-18 ff-c l-h-1-2 fw-300">
                          {getInitials(review.authorAttribution?.displayName)}
                        </span>
                      )}
                    </div>
                    <div className="reviewer-info">
                      <h3 className="reviewer-name f-11 ff-c fw-300 l-h-1-2">
                        {review.authorAttribution?.displayName || 'Anonymous'}
                      </h3>
                      <div className="review-meta">
                        {renderStars(review.rating)}
                        <span className="review-date f-9 ff-c fw-300 l-h-1-2">{formatDate(review.publishTime)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="review-content">
                    <p className="review-text f-11 ff-c fw-300 l-h-1-2">
                      {review.text?.text || review.originalText?.text || 'No review text available'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Loading indicator */}
          {isLoadingMore && (
            <div className="loading-more">
              <div className="loading-spinner"></div>
              <p>Loading more reviews...</p>
            </div>
          )}

          {/* Observer target for infinite scroll */}
          <div ref={observerTarget} className="scroll-observer"></div>

          {/* End message */}
          {!hasMore && displayedReviews.length > 0 && (
            <div className="all-reviews-loaded">
              <p>✨ You've seen all available reviews</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Helper function to get avatar colors
function getAvatarColor(index) {
  const colors = [
    'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)', // Yellow-Orange
    'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)', // Green
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Blue
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Teal
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // Pink-Yellow
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', // Cyan-Purple
  ];
  return colors[index % colors.length];
}
