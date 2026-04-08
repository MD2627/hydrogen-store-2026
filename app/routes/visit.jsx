import { useLoaderData, Link } from 'react-router';
import { useState } from 'react';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { Image } from '@shopify/hydrogen';
import ReviewMeta from '~/components/reviewMeta';

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
    const deferredData = loadDeferredData(args);
    const criticalData = await loadCriticalData(args);

    return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context }) {
    try {
        const [showroomsResult, bannerResult, reviewsResult] = await Promise.all([
            context.storefront.query(SHOWROOMS_QUERY),
            context.storefront.query(SHOWROOMS_BANNER_QUERY),
            context.storefront.query(REVIEWS_QUERY)
        ]);

        const { metaobjects: showroomsMeta } = showroomsResult || {};
        const { metaobjects: bannerMeta } = bannerResult || {};
        const { metaobjects: reviewsMeta } = reviewsResult || {};

        const banner = bannerMeta?.nodes?.[0] ? bannerMeta.nodes[0].fields.reduce((acc, field) => {
            acc[field.key] = field.value;
            if (field.reference?.image) acc[`${field.key}_image`] = field.reference.image.url;
            return acc;
        }, {}) : null;

        const showrooms = (showroomsMeta?.nodes || []).map(node => {
            const fields = (node.fields || []).reduce((acc, field) => {
                acc[field.key] = field.value;
                if (field.reference?.image) acc[`${field.key}_image`] = field.reference.image;
                return acc;
            }, {});

            return {
                id: fields.location_id || node.handle,
                city: fields.city || '',
                address: fields.address || '',
                phone: fields.phone || '',
                email: fields.email || 'sales@cullenjewellery.com',
                mapEmbedUrl: fields.map_embed_url || '',
                openingHours: fields.opening_hours ? fields.opening_hours.split('\n') : [],
                image: fields.image_image || null
            };
        });

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

        return { showrooms, banner, reviews };
    } catch (error) {
        console.error('Loader Error in visit.jsx:', error);
        return { showrooms: [], banner: null, reviews: [] };
    }
}

/**
 * Load data for rendering content below the fold.
 */
function loadDeferredData() {
    return {};
}

export default function VisitShowroom() {
    const { showrooms: SHOWROOMS, banner: BANNER, reviews: REVIEWS } = useLoaderData();

    // Find the first showroom to use as a fallback if everything is empty
    const initialShowroom = SHOWROOMS[0] || { id: 'none', openingHours: [], city: 'Select a location', address: '', phone: '', email: '', mapEmbedUrl: '' };
    const [activeCity, setActiveCity] = useState(initialShowroom);

    // Booking Wizard State
    const [bookingStep, setBookingStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        location: null,
        service: null,
        dateTime: null,
        userDetails: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
        }
    });

    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');

    const nextStep = () => setBookingStep(bookingStep + 1);
    const prevStep = () => setBookingStep(bookingStep - 1);

    const updateUserDetails = (field, value) => {
        setBookingData({
            ...bookingData,
            userDetails: { ...bookingData.userDetails, [field]: value }
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('Appointment request submitted! We will contact you soon.');
    };

    const generateTimeSlots = (dateNum) => {
        const weekdaySlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'];
        const saturdaySlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'];
        const day = dateNum % 7;
        if (day === 0) return []; // Sunday Closed
        if (day === 6) return saturdaySlots;
        return dateNum % 2 === 0 ? weekdaySlots : weekdaySlots.slice(2, -2);
    };

    const SERVICE_OPTIONS = [
        { id: 'engagement', title: 'Engagement Rings', description: 'Find your dream engagement ring from our collection or create a custom design.', duration: '45 MINUTES', image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Engagement_Rings_service_400x400.jpg?v=1710000003' },
        { id: 'wedding', title: 'Wedding Bands', description: 'Complete your set with handcrafted wedding bands designed for a lifetime.', duration: '30 MINUTES', image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Wedding_Bands_service_400x400.jpg?v=1710000004' },
        { id: 'fine-jewellery', title: 'Fine Jewellery & Gifts', description: 'Explore our range of earrings, necklaces, and more for that special occasion.', duration: '30 MINUTES', image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Fine_Jewellery_service_400x400.jpg?v=1710000005' }
    ];

    const SHOWROOM_IMAGES = {
        'melbourne': 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/melbourne_showroom_400x400.jpg?v=1710000002',
        'sydney': 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/sydney_showroom_400x400.jpg?v=1710000002',
        'brisbane': 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/brisbane_showroom_400x400.jpg?v=1710000002',
        'perth': 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/perth_showroom_400x400.jpg?v=1710000002',
        'adelaide': 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/adelaide_showroom_400x400.jpg?v=1710000002',
        'auckland': 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/auckland_showroom_400x400.jpg?v=1710000002',
        'london': 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/london_showroom_400x400.jpg?v=1710000002',
        'san-francisco': 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/san-francisco_showroom_400x400.jpg?v=1710000002',
        'toronto': 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/toronto_showroom_400x400.jpg?v=1710000002',
        'houston': 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/houston_showroom_400x400.jpg?v=1710000002'
    };

    const LOCATION_OPTIONS = [
        {
            id: 'virtual',
            city: 'Virtual',
            title: 'Virtual Consultation',
            description: 'Experience a personalised and in-depth online consultation with one of our specialists anywhere in the world.',
            duration: '45 MINUTES',
            image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Virtual_Consultation_400x400.jpg?v=1710000000'
        },
        {
            id: 'quick-chat',
            city: 'Quick Chat',
            title: 'Quick Chat',
            description: 'Connect with our friendly experts for quick answers or preparation for your visit.',
            duration: '15 MINUTES',
            image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Quick_Chat_400x400.jpg?v=1710000001'
        },
        ...SHOWROOMS.map(s => ({
            ...s,
            title: s.city,
            image: s.image?.url || SHOWROOM_IMAGES[s.id] || 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/melbourne_showroom_400x400.jpg?v=1710000002'
        }))
    ];

    const steps = [
        { id: 1, title: 'LOCATION', subtitle: bookingData.location ? (bookingData.location.title || bookingData.location.city) : '' },
        { id: 2, title: 'SERVICE', subtitle: bookingData.service?.title || '' },
        { id: 3, title: 'DATE & TIME', subtitle: bookingData.dateTime || '' },
        { id: 4, title: 'YOUR DETAILS', subtitle: '' }
    ];

    return (
        <div className="visit-page">


            {/* BOOKING WIZARD SECTION */}
            <div className="booking-wizard-section">
                <div className="page-width">
                    <div className="booking-header">
                        <h1 className="ff-a f-32 w-400">Book An Appointment</h1>
                        <p className="ff-c f-14">Choose a location and service to see availability. We look forward to meeting you!</p>
                    </div>

                    <div className="booking-progress-bar">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`progress-step ${bookingStep === step.id ? 'active' : ''} ${bookingStep > step.id ? 'completed' : ''}`}
                                onClick={() => step.id < bookingStep && setBookingStep(step.id)}
                            >
                                <span className="step-title ff-a">{step.title}</span>
                                {step.subtitle && <span className="step-subtitle ff-c">{step.subtitle}</span>}
                            </div>
                        ))}
                    </div>

                    <div className="wizard-content">
                        {/* STEP 1: LOCATION */}
                        {bookingStep === 1 && (
                            <div className="location-grid">
                                {LOCATION_OPTIONS.map((loc) => (
                                    <div key={loc.id} className="location-item-card">
                                        <div className="card-image">
                                            <img src={loc.image} alt={loc.title} />
                                        </div>
                                        <div className="card-info">
                                            <h3 className="ff-a">{loc.title || loc.city}</h3>
                                            <p className="description-text ff-c">{loc.description}</p>
                                            <span className="duration ff-a">{loc.duration}</span>
                                            <button className="select-btn ff-a" onClick={() => { setBookingData({ ...bookingData, location: loc }); nextStep(); }}>SELECT</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* STEP 2: SERVICE */}
                        {bookingStep === 2 && (
                            <div className="service-selection">
                                <button className="back-btn ff-a" onClick={prevStep}>← BACK</button>
                                <h2 className="step-subtitle ff-a f-24 w-600">Select Service</h2>
                                <div className="service-grid">
                                    {SERVICE_OPTIONS.map((service) => (
                                        <div key={service.id} className="service-item-card" onClick={() => { setBookingData({ ...bookingData, service }); nextStep(); }}>
                                            <div className="service-info">
                                                <h3 className="ff-a f-20 w-600">{service.title}</h3>
                                                <p className="ff-c">{service.description}</p>
                                                <span className="card-duration ff-a f-11 w-600">{service.duration}</span>
                                            </div>
                                            <div className="arrow">→</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 3: DATE & TIME */}
                        {bookingStep === 3 && (
                            <div className="datetime-selection">
                                <button className="back-btn ff-a" onClick={prevStep}>← BACK</button>
                                <h2 className="step-subtitle ff-a f-24 w-600">Choose Date & Time</h2>

                                <div className="calendar-container">
                                    <p className="ff-c f-14 appointments-hint">Select a day:</p>
                                    <div className="calendar-grid">
                                        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                                            <div key={day} className="calendar-day-label ff-a f-11">{day}</div>
                                        ))}
                                        {[...Array(14)].map((_, i) => {
                                            const date = new Date();
                                            date.setDate(date.getDate() + i);
                                            const label = date.toLocaleDateString('en-US', { day: 'numeric' });
                                            const fullLabel = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
                                            return (
                                                <div
                                                    key={i}
                                                    className={`calendar-day ff-c f-14 ${bookingDate === fullLabel ? 'selected' : ''}`}
                                                    onClick={() => { setBookingDate(fullLabel); setBookingTime(''); }}
                                                >
                                                    {label}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {bookingDate && (
                                    <div className="time-slots-section">
                                        <p className="timezone-disclaimer ff-c f-12 text-center">Available times in the <strong>Indian/Christmas</strong> time zone</p>
                                        <div className="time-slots-grid">
                                            {generateTimeSlots(parseInt(bookingDate.split(' ')[1])).map(time => (
                                                <button
                                                    key={time}
                                                    className={`time-slot-btn ff-a f-13 ${bookingTime === time ? 'active' : ''}`}
                                                    onClick={() => { setBookingTime(time); setBookingData({ ...bookingData, dateTime: `${bookingDate} at ${time}` }); nextStep(); }}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* STEP 4: YOUR DETAILS */}
                        {bookingStep === 4 && (
                            <div className="details-form-view">
                                <button className="back-btn ff-a" onClick={prevStep}>← BACK</button>
                                <h2 className="step-subtitle ff-a f-24 w-600">Your Details</h2>
                                <div className="booking-summary ff-c f-14">
                                    <p>Booking: <strong>{bookingData.service?.title}</strong></p>
                                    <p>Location: <strong>{bookingData.location?.title || bookingData.location?.city}</strong></p>
                                    <p>Time: <strong>{bookingData.dateTime}</strong></p>
                                </div>
                                <form className="booking-form" onSubmit={handleFormSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="ff-c f-11 w-600 uppercase">First Name *</label>
                                            <input type="text" required value={bookingData.userDetails.firstName} onChange={(e) => updateUserDetails('firstName', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="ff-c f-11 w-600 uppercase">Last Name *</label>
                                            <input type="text" required value={bookingData.userDetails.lastName} onChange={(e) => updateUserDetails('lastName', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="ff-c f-11 w-600 uppercase">Email Address *</label>
                                            <input type="email" required value={bookingData.userDetails.email} onChange={(e) => updateUserDetails('email', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="ff-c f-11 w-600 uppercase">Phone Number *</label>
                                            <input type="tel" required value={bookingData.userDetails.phone} onChange={(e) => updateUserDetails('phone', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="ff-c f-11 w-600 uppercase">Additional Notes</label>
                                        <textarea rows="4" value={bookingData.userDetails.message} onChange={(e) => updateUserDetails('message', e.target.value)} placeholder="Anything else you'd like us to know?"></textarea>
                                    </div>
                                    <button type="submit" className="submit-booking-btn ff-a f-16 w-600 uppercase">Confirm Appointment</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* HERO BANNER SECTION */}
            <div className="limit-width-banner">
                {BANNER ? (
                    <Image
                        data={{
                            url: BANNER.desktop_image_image || BANNER.image_image,
                            altText: BANNER.title || 'Visit Our Showrooms'
                        }}
                        className="limit-width-banner-image"
                        width={1400}
                        height={500}
                        sizes="100vw"
                        loading="eager"
                    />
                ) : (
                    <img
                        src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Sydney_showroom_1300x1300.jpg?v=https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Sydney_showroom_1300x1300.jpg?v=1740089318"
                        alt="Visit Our Showrooms"
                        className="limit-width-banner-image"
                    />
                )}
            </div>

            {/* OUR LOCATIONS SECTION */}
            <div className="our-locations-section">
                <h2 className="our-locations-section-title ff-a f-16 w-300">Want to see our sparkling engagement rings in person before you buy? Come visit one of our showrooms - we'd love to see you!</h2>
                <div className="locations-container">
                    <div className="locations-sidebar">
                        <h2 className="sidebar-title ff-a f-24 w-600">Our Locations</h2>
                        <div className="sidebar-list">
                            {SHOWROOMS.map((showroom) => (
                                <div key={showroom.id} className="location-item-wrapper">
                                    <div
                                        className={`location-card ${activeCity.id === showroom.id ? 'active' : ''}`}
                                        onClick={() => setActiveCity(showroom)}
                                    >
                                        <h3 className="location-city ff-a f-18 w-600">
                                            <span className="mobile-only icon-marker">
                                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                                            </span>
                                            {showroom.city}
                                        </h3>
                                        <div className="location-details ff-c f-13 w-300">
                                            <p className='w-600'>{showroom.address}</p>
                                            <a href={`tel:${showroom.phone}`}>{showroom.phone}</a>
                                            <a href={`mailto:${showroom.email}`}>{showroom.email}</a>
                                            <Link to="/contact" className="contact-link">Contact us</Link>
                                        </div>
                                    </div>

                                    {/* Mobile Accordion Expansion */}
                                    {activeCity.id === showroom.id && (
                                        <div className="location-mobile-expand mobile-only">
                                            <div className="mobile-hours ff-c">
                                                <h4 className="w-600">OPENING HOURS</h4>
                                                {showroom.openingHours.map((h, i) => (
                                                    <p key={i}>{h}</p>
                                                ))}
                                            </div>
                                            <div className="mobile-map">
                                                <iframe title={`Map of ${showroom.city}`} src={showroom.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Content Display */}
                    <div className="locations-map-area desktop-only">
                        <div className="opening-hours-card ff-c">
                            <h4 className="w-600">OPENING HOURS</h4>
                            {activeCity.openingHours.map((hour, idx) => (
                                <p key={idx}>{hour}</p>
                            ))}
                        </div>
                        <iframe
                            title={`Map of ${activeCity.city}`}
                            src={activeCity.mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* VIDEO SECTION */}
            <div className="locations-video-section">
                <div className="page-width">
                    <div className="locations-video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/NwgeU2JD9NA"
                            title="Visit Cullen Jewellery Showrooms"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>

            {/* REVIEW SECTION */}
            <div className="reviews-section-meta">
                <ReviewMeta reviews={REVIEWS} />
            </div>

            {/* UVP SECTION */}
            <UvpIconFooter data={OUR_STORY_UVPS} />
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

const SHOWROOMS_BANNER_QUERY = `#graphql
  query ShowroomsBanner($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    metaobjects(type: "showrooms_banner", first: 1) {
      nodes {
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

const SHOWROOMS_QUERY = `#graphql
  query Showrooms($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    metaobjects(type: "location", first: 20) {
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
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

const OUR_STORY_UVPS = [
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

/** @typedef {import('./+types/visit').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
