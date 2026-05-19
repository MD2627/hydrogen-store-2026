import { data } from 'react-router';
import { useLoaderData } from 'react-router';
import GoogleReviews from '~/components/GoogleReviews';
import ReviewMetaList from '~/components/ReviewMetaList';
import { CollectionBanner } from '~/components/CollectionBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import '~/styles/reviews.css';
import ReviewMeta from '~/components/reviewMeta';

/**
 * Loader function to fetch Google reviews server-side
 * Add your Google Places API credentials to your .env file:
 * GOOGLE_PLACES_API_KEY=your_api_key_here
 * GOOGLE_PLACE_ID=your_place_id_here
 */
export async function loader({ context }) {
  // In Hydrogen, environment variables are accessed through context.env
  const apiKey = context.env.GOOGLE_PLACES_API_KEY || '';
  const placeId = context.env.GOOGLE_PLACE_ID || '';

  // 1. Fetch Metaobject Reviews from Shopify Admin
  let metaReviews = [];
  try {
    const reviewsResult = await context.storefront.query(REVIEWS_QUERY);
    const { metaobjects: reviewsMeta } = reviewsResult || {};

    metaReviews = (reviewsMeta?.nodes || []).map(node => {
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
        source: fields.review_source || 'Trustpilot',
        sourceLogo: fields.source_logo_image || null
      };
    });
  } catch (err) {
    console.error('Failed to fetch metaobject reviews:', err);
  }

  // 2. Fetch Google Places Reviews
  let googleReviews = [];
  let placeDetails = null;
  let googleError = null;

  if (apiKey && placeId) {
    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,rating,userRatingCount,reviews&key=${apiKey}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status} ${response.statusText}`);
      }

      const apiData = await response.json();

      placeDetails = {
        name: apiData.displayName?.text || 'Our Business',
        rating: apiData.rating || 0,
        userRatingCount: apiData.userRatingCount || 0,
      };

      googleReviews = apiData.reviews || [];
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      googleError = error.message;
    }
  }

  return data({
    googlePlacesApiKey: apiKey,
    googlePlaceId: placeId,
    reviews: googleReviews,
    placeDetails,
    error: googleError,
    metaReviews
  });
}

export const meta = () => {
  return [
    { title: 'Customer Reviews | Diamond Jewellery' },
    {
      name: 'description',
      content: 'Read what our customers say about their experience with Diamond Jewellery. Discover authentic reviews from couples who trusted us with their special moments.'
    },
  ];
};

export default function Reviews() {
  const { googlePlacesApiKey, googlePlaceId, reviews, placeDetails, error, metaReviews } = useLoaderData();

  // Create a collection object for the banner
  const bannerCollection = {
    handle: 'reviews',
    title: 'Client Experiences',
    description: 'Discover what our clients love about their Diamond jewellery journey and experience.',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/new.jpg?v=1778041776'
    }
  };

  return (
    <>
      {/* Banner Section */}
      <CollectionBanner collection={bannerCollection} />

      {/* Reviews Section */}
      {/* <section className="reviews-section">
        <div className="page-width">

          <div className="reviews-content">
            {googlePlacesApiKey && googlePlaceId ? (
              <GoogleReviews
                placeId={googlePlaceId}
                apiKey={googlePlacesApiKey}
                reviews={reviews}
                placeDetails={placeDetails}
                error={error}
                maxReviews={20}
                showRating={true}
              />
            ) : (
              <div className="reviews-setup-notice">
                <div className="notice-card">
                  <h3>Google Reviews Setup Required</h3>
                  <p>To display Google reviews, please add the following to your <code>.env</code> file:</p>
                  <pre>
                    <code>
                      {`GOOGLE_PLACES_API_KEY=your_api_key_here
GOOGLE_PLACE_ID=your_place_id_here`}
                    </code>
                  </pre>
                  <div className="setup-instructions">
                    <h4>How to get your credentials:</h4>
                    <ol>
                      <li>
                        <strong>Get Google Places API Key:</strong>
                        <ul>
                          <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
                          <li>Create a new project or select an existing one</li>
                          <li>Enable the "Places API (New)" in the API Library</li>
                          <li>Create credentials (API Key) for the Places API</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Get Your Place ID:</strong>
                        <ul>
                          <li>Go to <a href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder" target="_blank" rel="noopener noreferrer">Place ID Finder</a></li>
                          <li>Search for your business name</li>
                          <li>Copy the Place ID that appears</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section> */}


      {/* Review meta section without slider  */}
      {/* <ReviewMetaList reviews={metaReviews} /> */}

      {/* Review Section (Bento Redesign) */}
      <ReviewMeta reviews={metaReviews} all={true} />

      {/* Footer UVPs */}
      <UvpIconFooter data={REVIEWS_UVPS} />
    </>
  );
}

/* ======================================================
   UVP DATA
====================================================== */

const REVIEWS_UVPS = [
  {
    link: '/shipping',
    label: 'Global Insured<br>Delivery',
    svg: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    `,
  },
  {
    link: '/free-resizing',
    label: 'Perfect Fit<br>Guarantee',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="5" /></svg>`,
  },
  {
    link: '/warranty',
    label: 'Lifetime<br>Craftsmanship',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l9 4.5v9l-9 4.5-9-4.5v-9z" /><path d="M12 9l.3 1.2 1.2.3-1.2.3-.3 1.2-.3-1.2-1.2-.3 1.2-.3z" fill="currentColor" stroke="none"/></svg>`,
  },
  {
    link: '/engagement-rings?metal=yellow_gold',
    label: 'Bespoke Design<br>Service',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7" /><path d="M21 21l-6-6" /><circle cx="10" cy="10" r="2" stroke-width="1"/></svg>`,
  },
];

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

