import { Link } from 'react-router';

export function RingBanner({ image, mobileImage, title, subtitle, buttonText, buttonLink }) {
    return (
        <section className="ring-banner-section">
            <div className='story-craft-overlay'></div>
            <div className="banner-container">
                <img className='desktop-banner' src={image} alt={title} />
                <img className='mobile-banner' src={mobileImage || image} alt={title} />
            </div>
            <div className="ring-banner-inner">
                <div className="banner-content">
                    <h2 className='section-title'>{title}</h2>
                    <p className='sb-description'>{subtitle}</p>
                    <Link to={buttonLink} className="btn btn">
                        {buttonText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
