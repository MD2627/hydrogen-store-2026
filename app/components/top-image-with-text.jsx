import { Link } from 'react-router';


export function TopImageWithText({ data }) {
    if (!data || !Array.isArray(data)) return null;

    return (
        <div className="top-image-with-text-section ">
            <div className="top-image-with-text-container">
                {data.map((item, index) => (
                    <div key={index} className={`top-image-with-text ${item.AddClass || ''}`}>
                        <div className="top-image-with-text__image">
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            )}
                        </div>
                        <div className="top-image-with-text__content">
                            <h2 className="top-image-with-text__title ff-a f-32  w-300">
                                <span className="top-image-with-text__index">
                                    {item.AddSteps}.
                                </span> {item.title}
                            </h2>
                            {item.subtitle && <h3 className="top-image-with-text__subtitle ff-c f-13 f-m-15 w-300">{item.subtitle}</h3>}
                            {item.description && <p className="top-image-with-text__description ff-c f-13 f-m-15 w-300">{item.description}</p>}
                            {item.buttonText && item.buttonUrl && (
                                <Link to={item.buttonUrl} className="banner-btn top-image-with-text__button">
                                    {item.buttonText}
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
