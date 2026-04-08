import { data } from 'react-router';
import { useLoaderData } from 'react-router';
import GoogleReviews from '~/components/GoogleReviews';
import ReviewMetaList from '~/components/ReviewMetaList';
import { CollectionBanner } from '~/components/CollectionBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import '~/styles/reviews.css';

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
    { title: 'Customer Reviews | Cullen Jewellery' },
    {
      name: 'description',
      content: 'Read what our customers say about their experience with Cullen Jewellery. Discover authentic reviews from couples who trusted us with their special moments.'
    },
  ];
};

export default function Reviews() {
  const { googlePlacesApiKey, googlePlaceId, reviews, placeDetails, error, metaReviews } = useLoaderData();

  // Create a collection object for the banner
  const bannerCollection = {
    handle: 'reviews',
    title: 'What Our Clients Say',
    description: 'Here\'s what our clients have to say about their Cullen experience.',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/IMG_9993_800x800.jpg?v=1736201597'
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
      <ReviewMetaList reviews={metaReviews} />

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

