import { Link } from 'react-router';

/**
 * InlineCollectionBanner - A promotional banner that appears within the product grid
 * @param {Object} props
 * @param {Object} props.data - Banner data from metaobject
 */
export function InlineCollectionBanner({ data }) {
    if (!data) return null;
    const { image, title, description, button, link } = data;
    if (!button && link) {
        return (
            <Link to={link} className="inline-collection-banner">
                <BannerContent image={image} title={title} description={description} />
            </Link>
        );
    }
    return (
        <div className="inline-collection-banner">
            <BannerContent image={image} title={title} description={description} />
            {button && link && (
                <Link to={link} className="inline-banner-button f-16 f-m-12 white-color l-h-1-2 w-400 ff-n">
                    {button}
                    <svg viewBox="0 0 16.933 16.933" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7" class="stroke" transform="rotate(180 8.466 8.466)" style={"fill: none; stroke: rgb(0, 0, 0); stroke-width: 1.05831; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;"}></path></svg>
                </Link>
            )}
        </div>
    );
}

/**
 * BannerContent - Shared content component
 */
function BannerContent({ image, title, description }) {
    return (
        <>
            {image && (
                <div className="inline-banner-image">
                    <img
                        src={image.url}
                        alt={image.altText || title || 'Collection banner'}
                        width="auto"
                        height="auto"
                        loading="lazy"
                    />
                </div>
            )}
            <div className="inline-banner-content">
                {title && <h3 className="inline-banner-title f-28 f-m-22 white-color l-h-1-2 w-400 ff-a">{title}</h3>}
                {description && <p className="inline-banner-description f-16 f-m-12 white-color l-h-1-2 w-400 ff-c">{description}</p>}
            </div>
        </>
    );
}
