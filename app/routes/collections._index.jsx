import { useLoaderData, Link } from 'react-router';
import { getPaginationVariables, Image } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { BLOCKED_PATHS } from '~/config/redirects';

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const { request } = args;
  const url = new URL(request.url);

  // Check if this path is blocked
  if (BLOCKED_PATHS.includes(url.pathname)) {
    throw new Response('Not Found', { status: 404 });
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context, request }) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 24,
  });

  const [{ collections }] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return { collections };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({ context }) {
  return {};
}

import { CollectionBanner } from '~/components/CollectionBanner';

export default function Collections() {
  /** @type {LoaderReturnData} */
  const { collections } = useLoaderData();

  // Mock collection object for the banner lookup
  const collectionContext = {
    handle: 'collections',
    title: 'Collections',
    description: '',
    image: null
  };

  return (
    <div className="collections">
      <CollectionBanner collection={collectionContext} />
      <div className="page-width">
        <PaginatedResourceSection
          connection={collections}
          resourcesClassName="collections-grid"
        >
          {({ node: collection, index }) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              index={index}
            />
          )}
        </PaginatedResourceSection>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   collection: CollectionFragment;
 *   index: number;
 * }}
 */
function CollectionItem({ collection, index }) {
  return (
    <div className="collection-item">
      <Link
        className="collection-item"
        key={collection.id}
        to={`/collections/${collection.handle}`}
        prefetch="intent"
      >
        {collection?.image ? (
          <Image
            alt={collection.image.altText || collection.title}
            aspectRatio="1/1"
            data={collection.image}
            loading={index < 3 ? 'eager' : undefined}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        ) : (
          <div className="collection-placeholder-image">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="#f5f5f5" />
              <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="#999" fontSize="8" fontFamily="sans-serif">
                No Image
              </text>
            </svg>
          </div>
        )}
        <h5 className='collection-title f-18 f-m-18 w-400 ff-c l-h-1'>{collection.title}</h5>
      </Link>
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

/** @typedef {import('./+types/collections._index').Route} Route */
/** @typedef {import('storefrontapi.generated').CollectionFragment} CollectionFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
