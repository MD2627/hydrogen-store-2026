import { Link, useNavigate } from 'react-router-dom';

export function BlogGridFromPage({ blog }) {
    const navigate = useNavigate();
    if (!blog?.articles?.nodes?.length) return null;

    const handleClick = (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');

        // Only intercept internal links
        if (href?.startsWith('/')) {
            e.preventDefault();
            navigate(href);
        }
    };


    return (
        <div className="blog-grid blog-grid-container">
            {blog.articles.nodes.map((article) => (
                <div className="blog-card-wrapper" key={article.id}>
                    <Link
                        to={`/blogs/${blog.handle}/${article.handle}`}
                        className="blog-card"
                    >
                        {article.image && (
                            <div className="blog-image">
                                <img
                                    src={article.image.url}
                                    alt={article.image.altText || article.title}
                                    loading="lazy"
                                />
                            </div>
                        )}

                        <div className="blog-content">
                            <div className="blog-date">
                                {article.publishedAt ? (
                                    <time dateTime={article.publishedAt}>
                                        {(() => {
                                            const d = new Date(article.publishedAt);
                                            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                            return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
                                        })()}
                                    </time>
                                ) : null}
                            </div>

                            <h3 className="blog-title">{article.title}</h3>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
