import { Link } from 'react-router';
import { RichText } from './RichText';

export function ShopByStyleScroll({
    title = "Shop Lab Diamond Engagement Rings by Style",
    description = (
        <>
            Discover our signature setting styles, including{' '}
            <Link to="/engagement?style=solitaire">solitaire</Link>,{' '}
            <Link to="/engagement?style=trilogy">trilogy</Link>,{' '}
            <Link to="/engagement?style=halo">halo</Link>,{' '}
            <Link to="/engagement?style=toi-et-moi">toi et moi</Link>{' '}
            and{' '}
            <Link to="/engagement?style=bezel">bezel</Link>.
        </>
    ),
    items = [],
    variant = 'default'
}) {
    return (
        <div className={`shop-by-style scroll-shop-by-style shop--${variant}`}>
            <div className='shop-by-style-slider-container'>
                <div className="shop-by-style-header">
                    <h2>{title}</h2>
                    {description && (
                        typeof description === "string"
                            ? <RichText html={description} />
                            : description
                    )}

                </div>

                <div className="scroll-shop-by-style-grid">
                    {items.map((item, index) => (
                        <div className="style-card" key={index}>
                            {item.link ? (

                                <Link
                                    to={item.link}
                                    className="style-link-overlay"
                                    aria-label={item.name || 'View collection'}
                                >
                                    {item.image && (
                                        <div className="style-image-wrapper">
                                            <img
                                                src={item.image}
                                                alt={item.name ? `${item.name} Engagement Ring` : ''}
                                                loading="lazy"
                                            />
                                        </div>
                                    )}

                                    {item.name && (
                                        <div className="style-name f-12 f-m-12 ff-c w-300 l-h-1 black-color">
                                            {item.name}
                                            <span className="arrow">
                                                <svg
                                                    viewBox="0 0 16.933 16.933"
                                                    width="14"
                                                    height="14"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7"
                                                        transform="rotate(180 8.466 8.466)"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.05831"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    )}
                                </Link>
                            ) : (
                                <>
                                    {item.image && (
                                        <div className="scroll-style-image-wrapper">
                                            <img
                                                src={item.image}
                                                alt={item.name ? `${item.name} Engagement Ring` : ''}
                                                loading="lazy"
                                            />
                                        </div>
                                    )}

                                    {item.name && (
                                        <div className="style-name f-12 f-m-12 ff-c w-300 l-h-1 black-color">
                                            {item.name}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
