import { Analytics, getShopAnalytics, useNonce } from '@shopify/hydrogen';
import {
  Outlet,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  redirect,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router';
import { REDIRECTS, BLOCKED_PATHS } from '~/config/redirects';

import { FOOTER_QUERY, HEADER_QUERY } from '~/lib/fragments';
import appStyles from '~/styles/app.css?url';
import ourStory from '~/styles/our-story.css?url';
import faqs from '~/styles/faqs.css?url';
import feedback from '~/styles/feedback.css?url';
import ourInitiatives from '~/styles/cullen-initiatives.css?url';
import impactReport from '~/styles/impact-report.css?url';
import customRings from '~/styles/custom-rings.css?url';
import commonStyles from './styles/common.css?url';
import { PageLayout } from './components/PageLayout';
import customStyles from '~/styles/custom.css?url';
import footerStyles from '~/styles/footer.css?url';
import pdpStyles from './styles/product-page.css?url';
import mainPDOPStyles from './styles/main-product-page.css?url';
import collectionStyles from './styles/collection.css?url';
import newsletterStyles from './styles/newsletter.css?url';
import cartStyles from './styles/cart.css?url';
import careersStyles from './styles/careers.css?url';
import reviewsStyles from './styles/reviews.css?url';
import moissaniteGuidanceStyles from './styles/moissanite-guidance.css?url';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import recyclingBrillianceStyles from './styles/recycling-brilliance.css?url';
import freeResizingStyles from './styles/free-resizing.css?url';
import carbonNeutralStyles from './styles/carbon-neutral.css?url';
import orderStatusStyles from './styles/order-status.css?url';
import warrantyStyles from './styles/warranty.css?url';
import cullenCuratedStyles from './styles/cullen-curated.css?url';
import top10RingsStyles from './styles/Top10Rings.css?url';
import comingSoonStyles from './styles/ComingSoon.css?url';
import christmasCutoffStyles from './styles/christmas-cut-off.css?url';
import termsandConditionsStyles from './styles/terms-and-conditions.css?url';
import financeOptionsStyles from './styles/finance-options.css?url';
import freeRingSizingKitStyles from './styles/free-ring-sizing-kit.css?url';
import ringSizeGuidanceStyles from './styles/ring-size-guidance.css?url';
import visitStyles from './styles/visit.css?url';
import notFoundStyles from './styles/not-found.css?url';
import reviewMetaListStyles from './styles/review-meta-list.css?url';
import documentation from './styles/documentation.css?url';
import tryThemeModal from './styles/tryThemeModal.css?url';
import { NotFound } from './components/NotFound';

/**

 * This is important to avoid re-fetching root queries on sub-navigations
 * @type {ShouldRevalidateFunction}
 */
export const shouldRevalidate = ({ formMethod, currentUrl, nextUrl }) => {
  if (formMethod && formMethod !== 'GET') return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return true;
};
const DEFAULT_FAVICON = 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/stara_fav_icon_93c6a13b-3df9-434e-8c17-e78f46499e22.png?v=1768294077';
export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
  ];
}
/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const { request } = args;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 1. Normalize trailing slashes (except for the root)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return redirect(pathname.slice(0, -1) + url.search, 301);
  }

  // 2. Check for Redirects
  const cleanPathname = pathname;
  if (REDIRECTS[pathname] || REDIRECTS[cleanPathname]) {
    throw redirect(REDIRECTS[pathname] || REDIRECTS[cleanPathname]);
  }

  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  const { storefront, env } = args.context;
  const favicon = criticalData.header?.shop?.brand?.squareLogo?.image?.url || DEFAULT_FAVICON;
  return {
    ...deferredData,
    ...criticalData,
    favicon,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      // Fall back to PUBLIC_STORE_DOMAIN if PUBLIC_CHECKOUT_DOMAIN is not set.
      // Without this fallback, Analytics.Provider throws a hard error that crashes all pages.
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN || env.PUBLIC_STORE_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}
/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context }) {
  const { storefront } = context;
  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheNone(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
        leftMenuHandle: 'left-menu',
        rightMenuHandle: 'right-menu',
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);
  return { header };
}

function loadDeferredData({ context }) {
  const { storefront, customerAccount, cart } = context;
  // defer the footer query (below the fold)
  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: 'footer', // Adjust to your footer menu handle
        quickLinksHandle: 'quick-links',
        aboutUsHandle: 'about-us',
        clientCareHandle: 'client-care',
        socialLinksHandle: 'social-links',
        legalLinksHandle: 'legal-links',
      },
    })
    .catch((error) => {
      // Log query errors, but d on't throw them so the page can still render
      console.error(error);
      return null;
    });
  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}
/**
 * @param {{children?: React.ReactNode}}
 */
export function Layout({ children }) {
  const nonce = useNonce();
  const data = useRouteLoaderData('root');
  // Get favicon from loader data or use default
  const faviconUrl = data?.favicon || DEFAULT_FAVICON;
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  var originalDefineProperty = Object.defineProperty;
                  Object.defineProperty = function(obj, prop, descriptor) {
                    if (obj === window && prop === 'Shopify') {
                      if (window.Shopify) {
                        window.Shopify = descriptor.value || window.Shopify;
                        return window;
                      }
                      descriptor = Object.assign({}, descriptor, { configurable: true });
                    }
                    return originalDefineProperty.call(this, obj, prop, descriptor);
                  };
                }
              })();
            `,
          }}
        />
        <link rel="icon" type="image/png" href={faviconUrl} />
        <link rel="stylesheet" href={appStyles}></link>
        <link rel="stylesheet" href={ourStory}></link>
        <link rel="stylesheet" href={faqs}></link>
        <link rel="stylesheet" href={feedback}></link>
        <link rel="stylesheet" href={ourInitiatives}></link>
        <link rel="stylesheet" href={impactReport}></link>
        <link rel="stylesheet" href={customRings}></link>
        <link rel="stylesheet" href={commonStyles}></link>
        <link rel="stylesheet" href={mainPDOPStyles}></link>
        <link rel="stylesheet" href={customStyles}></link>
        <link rel="stylesheet" href={pdpStyles}></link>
        <link rel="stylesheet" href={footerStyles}></link>
        <link rel="stylesheet" href={collectionStyles}></link>
        <link rel="stylesheet" href={newsletterStyles}></link>
        <link rel="stylesheet" href={cartStyles}></link>
        <link rel="stylesheet" href={careersStyles}></link>
        <link rel="stylesheet" href={reviewsStyles}></link>
        <link rel="stylesheet" href={moissaniteGuidanceStyles}></link>
        <link rel="stylesheet" href={recyclingBrillianceStyles}></link>
        <link rel="stylesheet" href={freeResizingStyles}></link>
        <link rel="stylesheet" href={carbonNeutralStyles}></link>
        <link rel="stylesheet" href={orderStatusStyles}></link>
        <link rel="stylesheet" href={warrantyStyles}></link>
        <link rel="stylesheet" href={cullenCuratedStyles}></link>
        <link rel="stylesheet" href={top10RingsStyles}></link>
        <link rel="stylesheet" href={comingSoonStyles}></link>
        <link rel="stylesheet" href={christmasCutoffStyles}></link>
        <link rel="stylesheet" href={termsandConditionsStyles}></link>
        <link rel="stylesheet" href={financeOptionsStyles}></link>
        <link rel="stylesheet" href={freeRingSizingKitStyles}></link>
        <link rel="stylesheet" href={ringSizeGuidanceStyles}></link>
        <link rel="stylesheet" href={visitStyles}></link>
        <link rel="stylesheet" href={notFoundStyles}></link>
        <link rel="stylesheet" href={reviewMetaListStyles}></link>
        <link rel="stylesheet" href={documentation}></link>
        <link rel="stylesheet" href={tryThemeModal}></link>

        <Meta />

        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}
export default function App() {
  /** @type {RootLoader} */
  const data = useRouteLoaderData('root');
  if (!data) {
    return <Outlet />;
  }

  const hasAnalytics = !!data.consent?.checkoutDomain;
  const content = (
    <PageLayout {...data}>
      <Outlet />
    </PageLayout>
  );
  return hasAnalytics ? (
    <Analytics.Provider
      cart={data.cart}
      shop={data.shop}
      consent={data.consent}
    >
      {content}
    </Analytics.Provider>
  ) : content;
}
export function ErrorBoundary() {
  const error = useRouteError();
  const nonce = useNonce();
  const data = useRouteLoaderData('root');

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <Layout>
        {data ? (
          <PageLayout {...data}>
            <NotFound />
          </PageLayout>
        ) : (
          <NotFound />
        )}
      </Layout>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace('/');`,
          }}
        />
      </head>
      <body>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

/** @typedef {LoaderReturnData} RootLoader */
/** @typedef {import('react-router').ShouldRevalidateFunction} ShouldRevalidateFunction */
/** @typedef {import('./+types/root').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */ 