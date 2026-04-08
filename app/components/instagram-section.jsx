import { Link } from 'react-router';
import { RichText } from './RichText';

export const InstagramSection = ({ data }) => {
    if (!data || !data.posts || data.posts.length === 0) return null;

    const { title, description, profileUrl, posts } = data;

    return (
        <section className="instagram-section">
            <div className="instagram-container">
                <div className="instagram-header">
                    {title && <h2>{title}</h2>}
                    {description && (
                        <RichText html={description} />
                    )}

                </div>

                <div className="instagram-grid">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            to={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="insta-card"
                            aria-label={`View Instagram post ${post.id}`}
                        >
                            <img
                                src={post.img}
                                alt={post.alt || "Instagram post"}
                                loading="lazy"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
