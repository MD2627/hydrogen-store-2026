import { useLoaderData, useParams, Link, useRouteError, isRouteErrorResponse } from 'react-router';
import { useState, useEffect } from 'react';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ShopByStyle } from '~/components/ShopByStyle';
import ReviewMeta from '~/components/reviewMeta';
import { ComingSoonForm } from '~/components/ComingSoonForm';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const NEED_HELP_BANNER_DATA = {
    images: {
        desktop:
            'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/BookAppointment_Banner_web_1500x1500.jpg?v=1703115428',
        mobile:
            'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/BookAppointment_Banner_mob_900x900.png?v=1703115428',
        alt: 'Need a hand?',
    },
    content: {
        title: 'Need a hand?',
        text:
            "Visit us in person or virtually. We're here to help you find the perfect ring, no matter where you are.",
        buttons: [
            {
                label: 'BOOK APPOINTMENT',
                link: '/visit',
            }
        ],
    },
};

import CITY_DATA from '~/data/coming-soon-cities.json';

const comingSoonUvps = [
    {
        link: '/shipping',
        label: 'Worldwide<br>Express Shipping',
        svg: `
      <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16.75H2v-1.5h10v1.5Zm13.074 8.417c-.332.37-.807.583-1.304.583H8.196a1.752 1.752 0 0 1-1.74-1.942l.448-4.058H4v-1.5h4.578l-.63 5.723a.248.248 0 0 0 .248.277H23.77a.247.247 0 0 0 .186-.083.247.247 0 0 0 .062-.194l-1.47-13.223H9.454l-.312 2.827-1.492-.165.46-4.162h3.641v-.92c0-2.344 1.907-4.25 4.25-4.25s4.25 1.906 4.25 4.25v.92h3.642l1.617 14.557Z" fill="#6b6b6b"/>
      </svg>
    `,
    },
    {
        link: '/free-resizing',
        label: 'Free<br>Resizing',
        svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M24.289 18.18c0 5.122-4.167 9.289-9.289 9.289s-9.289-4.167-9.289-9.29a9.286 9.286 0 0 1 5.615-8.533l.593 1.376a7.788 7.788 0 0 0-4.708 7.158c0 4.295 3.495 7.789 7.789 7.789s7.789-3.494 7.789-7.79c0-4.294-3.495-7.788-7.789-7.788-.259 0-.518.018-.768.044l-.367.037-4.585-4.84 2.495-3.382h6.45l2.492 3.377-2.55 2.733-1.097-1.024 1.7-1.82-1.302-1.766h-4.936l-1.3 1.761 3.22 3.4c.181-.013.364-.02.548-.02 5.122 0 9.289 4.167 9.289 9.289ZM11.75 18h-1.5v4.75H15v-1.5h-2.19l5.44-5.44V18h1.5v-4.75H15v1.5h2.19l-5.44 5.44V18Z" fill="#fff"></path></svg>`,
    },
    {
        link: '/warranty',
        label: 'Lifetime Ring<br>Warranty',
        svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 2.587 4.25 8.793v7.362a8.774 8.774 0 0 0 4.375 7.577L15 27.413l6.375-3.68a8.774 8.774 0 0 0 4.375-7.578V8.793L15 2.587Zm9.25 13.568a7.271 7.271 0 0 1-3.625 6.279L15 25.68l-5.625-3.247a7.271 7.271 0 0 1-3.625-6.28V9.66L15 4.32l9.25 5.34v6.495Zm-11.733.268 3.906-3.906a3.516 3.516 0 0 1 4.967 0 3.516 3.516 0 0 1 0 4.966c-.685.685-1.584 1.027-2.484 1.027s-1.799-.342-2.483-1.027l-.572-.571 1.06-1.06.572.57a2.015 2.015 0 0 0 2.846 0 2.014 2.014 0 0 0 0-2.845 2.015 2.015 0 0 0-2.846 0l-3.906 3.906a3.516 3.516 0 0 1-4.967 0 3.516 3.516 0 0 1 0-4.966 3.516 3.516 0 0 1 4.967 0l.589.588-1.061 1.06-.588-.588a2.015 2.015 0 0 0-2.846 0 2.014 2.014 0 0 0 0 2.846 2.015 2.015 0 0 0 2.846 0Z" fill="#fff"></path></svg>`,
    },
    {
        link: '/engagement-rings?metal=yellow_gold',
        label: 'Free Ring<br>Customisation',
        svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="m28.42 9.978-4.77 4.769a4.152 4.152 0 0 1-2.331 1.166l-4.204.6-3.11 3.11-1.06-1.061 3.11-3.11.6-4.203a4.15 4.15 0 0 1 1.166-2.332l4.77-4.77 1.06 1.061-4.77 4.77a2.642 2.642 0 0 0-.741 1.483l-.494 3.46 3.46-.494a2.638 2.638 0 0 0 1.484-.741l4.769-4.769 1.06 1.06ZM8.07 21.118c-2.905 0-5.097-2.256-5.097-5.28 0-3.01 2.213-5.28 5.147-5.28 1.144 0 2.063.238 2.894.749.371.228.734.513 1.14.896l1.028-1.092A8.466 8.466 0 0 0 11.8 10.03c-1.077-.662-2.247-.97-3.68-.97-3.727 0-6.647 2.977-6.647 6.813 0 3.782 2.898 6.746 6.597 6.746 2.586 0 4.076-1.136 5.193-2.247l-1.057-1.063c-1.093 1.086-2.214 1.81-4.136 1.81Zm7.936-.38h4v-1.5h-4v1.5Zm-1.408 1.9 2.828 2.83 1.06-1.061-2.828-2.829-1.06 1.06Z" fill="#fff"></path></svg>`,
    },
];
const UntilWeMeet = {
    title: 'Until We Meet, Discover Our Engagement Rings Collections',
    subtitle: (
        <p>
            Browse our signature styles, including{' '}
            <Link to="/engagement?style=solitaire" className="fancy">solitaire</Link>,{' '}
            <Link to="/engagement?style=halo" className="fancy">halo</Link>,{' '}
            <Link to="/engagement?style=trilogy" className="fancy">trilogy</Link> and{' '}
            <Link to="/engagement?style=toi-et-moi" className="fancy">toi et moi</Link>.
        </p>
    ),
    items: [
        {
            name: 'Solitaire',
            image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/2023_11_14_Cullen_Website_4x5_07_700x700.jpg?v=1701322555',
            link: '/engagement-rings/solitaire',
        },
        {
            name: 'Trilogy',
            image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/2023_11_14_Cullen_Website_1x1_01_700x700.jpg?v=1700787282',
            link: '/engagement-rings/trilogy',
        },
        {
            name: 'Halo',
            image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/2023_11_14_Cullen_Website_1x1_02_700x700.jpg?v=1700787282F  ',
            link: '/engagement-rings/halo',
        }
    ]
};
const DiscoverWeddingBands = {
    title: 'Discover Wedding Bands',
    subtitle: (
        <p>
            Explore our range of men’s and women’s <Link to="/wedding-rings" className="fancy">wedding rings</Link>.
        </p>
    ),
    items: [
        {
            name: "Women's Wedding Bands",
            image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Front_aBand_Cullen-Jewellery_yellow_RingOnly_web_Wed_mB__2023-08-29_60b87063-c880-4c47-a4a5-f86818a6b140_700x700.jpg?v=1704675425',
            link: '/wedding-rings/women',
        },
        {
            name: "Men's Wedding Bands",
            image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/image_9214c2af-bde8-4ef0-939a-00edd5acb938_700x700.png?v=1704675316',
            link: '/wedding-rings/men',
        }
    ]
};

export async function loader({ params, context }) {
    const { city } = params;
    const cityHandle = city ? city.toLowerCase() : '';
    const cityInfo = CITY_DATA[cityHandle];

    if (!cityInfo) {
        throw new Response('City Not Found', { status: 404 });
    }

    try {
        const reviewsResult = await context.storefront.query(REVIEWS_QUERY);
        const { metaobjects: reviewsMeta } = reviewsResult || {};

        const reviews = (reviewsMeta?.nodes || []).map(node => {
            const fields = (node.fields || []).reduce((acc, field) => {
                acc[field.key] = field.value;
                if (field.reference?.image) acc[`${field.key}_image`] = field.reference.image.url;
                return acc;
            }, {});

            return {
                id: fields.review_id || node.id,
                author: fields.author_name || '',
                initial: fields.author_initial || (fields.author_name ? fields.author_name[0] : ''),
                rating: parseInt(fields.rating) || 5,
                time: fields.review_time || '',
                text: fields.review_text || '',
                source: fields.review_source || 'Google',
                sourceLogo: fields.source_logo_image || null
            };
        });

        return { cityInfo, reviews };
    } catch (error) {
        console.error('Error fetching reviews in coming-soon:', error);
        return { cityInfo, reviews: [] };
    }
}

export default function ComingSoonCity() {
    const { cityInfo, reviews: REVIEWS } = useLoaderData();
    const { city } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    useEffect(() => {
        const consent = localStorage.getItem("videoConsent");
        if (consent === "accepted") {
            setShowVideo(true);
        }
    }, []);
    return (
        <div className="coming-soon-city">
            <StoryCraftBanner
                title={cityInfo.banner.title}
                subtitle={cityInfo.banner.subtitle}
                imageSrc={cityInfo.banner.imageSrc}
                videoSrc={cityInfo.banner.videoSrc}
                ctaText={cityInfo.banner.ctaText}
                ctaLink={cityInfo.banner.ctaLink}
                extraClass={cityInfo.banner.extraClass}
            />

            <div className="coming-soon-form-wrapper">
                <ComingSoonForm cityName={cityInfo?.map?.title || 'our new'} />
            </div>

            <div className="review-section-wrapper">
                <div className="reviews-section-meta">
                    <ReviewMeta reviews={REVIEWS} />
                </div>
            </div>

            {cityInfo.map && (
                <section className="city-map-section">
                    <div className="page-width">
                        <div className="city-map-header text-center">
                            <p className="city-map-title ff-a f-32 w-300">{cityInfo.map.title}</p>
                            <p className="city-map-subtitle ff-c f-13 w-300">{cityInfo.map.subtitle}</p>
                        </div>
                        <div className="city-map-container">
                            <iframe
                                title={`Map of ${cityInfo.map.title}`}
                                src={cityInfo.map.embedUrl}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </section>
            )}

            <div className="image-banner-popup">
                {showVideo ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/ytnHV9q2quw?autoplay=1"
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <>
                        <img
                            src="https://cdn.shopify.com/s/files/1/0801/7317/0906/files/maxresdefault.jpg?v=1771243874"
                            alt="Please accept cookies to access this content"
                        />
                        <p
                            className="video-placeholder-text-youtube"
                            onClick={() => setShowPopup(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            Please accept cookies to access this content
                        </p>
                    </>
                )}
            </div>

            <div className={`cookie-popup ${showPopup ? 'active' : ''}`}>
                <div className="cookie-popup-inner">
                    <div className="cookie-pop-header">
                        <button
                            className="popup-close"
                            onClick={() => setShowPopup(false)}
                        >
                            ×
                        </button>

                        <h3 className="cookie-popup-title f-19 ff-c w-700">Opt-out Preferences</h3>
                    </div>
                    <p className='cookie-popup-text f-14 ff-c w-300'>
                        We use third-party cookies that help us analyse how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. However, you can opt out of these cookies by checking "Do Not Sell or Share My Personal Information" and clicking the "Save My Preferences" button. Once you opt out, you can opt in again at any time by unchecking "Do Not Sell or Share My Personal Information" and clicking the "Save My Preferences" button.
                    </p>

                    <label htmlFor="DoNotSell" className="f-16 ff-c w-700 cookie-checkbox">
                        <input type="checkbox" id='DoNotSell' />
                        Do Not Sell or Share My Personal Information
                    </label>

                    <div className="cancle-save-btn">
                        <button
                            className="cancel-btn btn"
                            onClick={() => setShowPopup(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="save-btn btn"
                            onClick={() => {
                                localStorage.setItem("videoConsent", "accepted");
                                setShowVideo(true);
                                setShowPopup(false);
                            }}
                        >
                            Save My Preferences
                        </button>
                    </div>
                </div>
            </div>

            <ShopByStyle
                variant="shop-by-category"
                title={UntilWeMeet?.title}
                description={UntilWeMeet?.subtitle}
                items={UntilWeMeet?.items || []}
                slidesPerViewDesktop={3}
            />

            <ShopByStyle
                variant="shop-by-category"
                title={DiscoverWeddingBands?.title}
                description={DiscoverWeddingBands?.subtitle}
                items={DiscoverWeddingBands?.items || []}
                slidesPerViewDesktop={2}
            />


            <section className="need-help-banner">
                <div className="background">
                    <img
                        className="small-hide"
                        src={NEED_HELP_BANNER_DATA.images.desktop}
                        alt={NEED_HELP_BANNER_DATA.images.alt}
                        loading="lazy"
                    />
                    <img
                        className="not-small-hide"
                        src={NEED_HELP_BANNER_DATA.images.mobile}
                        alt={NEED_HELP_BANNER_DATA.images.alt}
                        loading="lazy"
                    />

                </div>

                <div className="need-help-content">
                    <div className="shop-by-style-header">
                        <h2>{NEED_HELP_BANNER_DATA.content.title}</h2>
                        <p>{NEED_HELP_BANNER_DATA.content.text}</p>
                    </div>


                    <div className="need-help-actions">
                        {NEED_HELP_BANNER_DATA.content.buttons.map((btn, i) => (
                            <Link key={i} to={btn.link} className="btn">
                                {btn.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <UvpIconFooter data={comingSoonUvps} />

        </div>
    );
}



export function ErrorBoundary() {
    const error = useRouteError();
    const params = useParams();

    if (isRouteErrorResponse(error) && error.status === 404) {
        return (
            <div className="city-not-found page-width text-center">
                <h1 className="ff-c f-40">City Not Found</h1>
                <p className="ff-n f-18">
                    Sorry, we don&apos;t have an opening planned for {params.city || 'this location'} yet.
                </p>
                <Link to="/" className="btn mt-20">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="city-not-found page-width text-center">
            <h1 className="ff-c f-40">Application Error</h1>
            <p className="ff-n f-18">
                {error?.message || 'Something went wrong while loading this page.'}
            </p>
            <Link to="/" className="btn mt-20">Back to Home</Link>
        </div>
    );
}

const REVIEWS_QUERY = `#graphql
  query Reviews($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    metaobjects(type: "review", first: 50) {
      nodes {
        id
        handle
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`;
