import { Link } from 'react-router';
import { RichText } from './RichText';

export const InstagramSection = ({ data }) => {
    if (!data || !data.posts || data.posts.length === 0) return null;

    const { title, description, profileUrl, posts } = data;

    // Take 8 posts for a perfectly balanced 2-row grid (4 per row)
    const displayPosts = posts.slice(0, 8);

    return (
        <section className="ins-v2">
            <div className="page-width">
                <div className="sbss-v2-header">
                    <div className="sbss-v2-header-text">
                        <span className="section-subtitle">Social Journal</span>
                        <h2 className="section-title">{title || 'Community'}</h2>
                    </div>
                    <div className="sbss-v2-desc">
                        {description && <RichText html={description} />}
                    </div>
                </div>

                <div className="ins-v2-container">
                    <div className="ins-v2-grid">
                        {/* Post Slots */}
                        {displayPosts.map((post, index) => (
                            <Link
                                key={post.id}
                                to={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`ins-v2-card ins-v2-post ins-v2-post-${index}`}
                                aria-label={`View Instagram post ${post.id}`}
                            >
                                <div className="ins-v2-media">
                                    <img
                                        src={post.img}
                                        alt={post.alt || "Instagram post"}
                                        loading="lazy"
                                    />
                                    <div className="ins-v2-overlay">
                                        <div className="ins-v2-overlay-content">
                                            <InstagramIcon />
                                            <span>Shop the look</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    );
}
