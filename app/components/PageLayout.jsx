import { Await, Link, useNavigation } from 'react-router';
import { Suspense, useId, useEffect, useState } from 'react';
import { Aside, useAside } from '~/components/Aside';
import { Announcement } from '~/components/Announcement';
import { Footer } from '~/components/Footer';
import { Header, HeaderMenu } from '~/components/Header';
import { CartMain } from '~/components/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import { SearchResultsPredictive } from '~/components/SearchResultsPredictive';
import Page from '~/routes/pages.$handle';
import { useLocation } from 'react-router';
/**
 * Navigation Progress Bar - Shows loading indicator during page transitions
 */

function NavigationProgress() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Only run on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isNavigating = navigation.state !== 'idle';

  useEffect(() => {
    if (!isMounted) return;

    if (isNavigating) {
      setVisible(true);
      setProgress(0);

      // Simulate progress animation
      const timer1 = setTimeout(() => setProgress(30), 100);
      const timer2 = setTimeout(() => setProgress(60), 300);
      const timer3 = setTimeout(() => setProgress(80), 600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      // Complete the progress bar
      setProgress(100);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);

      return () => clearTimeout(hideTimer);
    }
  }, [isNavigating, isMounted]);

  // Don't render on server or if not visible
  if (!isMounted || (!visible && progress === 0)) return null;

  return (
    <div className="navigation-progress-container">
      <div
        className="navigation-progress-bar"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0
        }}
      />
    </div>
  );
}

/**
 * @param {PageLayoutProps}
 */
export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}) {
  const location = useLocation();

  const pageClass =
    location.pathname
      .replace(/^\/|\/$/g, '')
      .replace(/\//g, '-') || 'home';

  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
      <NavigationProgress />
      <Announcement />
      {header && (
        <Header
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
        />
      )}
      <main className={pageClass}>{children}</main>
      <Footer
        footer={footer}
        header={header}
        publicStoreDomain={publicStoreDomain}
      />
    </Aside.Provider >
  );
}

/**
 * @param {{cart: PageLayoutProps['cart']}}
 */
function CartAside({ cart }) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  const { close } = useAside();
  return (
    <Aside type="search" heading="SEARCH" data-test>
      <div className="search-overlay-container">
        {/* Search Icon Left */}
        <div className="search-icon-wrapper">
          <svg
            viewBox="0 0 16.933 16.933"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" stroke="#000" strokeWidth="1.05831">
              <circle
                cx="7.144"
                cy="7.144"
                r="4.498"
              />
              <path d="m10.583 10.583 3.704 3.704" />
            </g>
          </svg>
        </div>

        {/* Center Input (Full Width) */}
        <div className="search-input-wrapper" style={{ flex: 1 }}>
          <SearchFormPredictive>
            {({ fetchResults, goToSearch, inputRef }) => (
              <div className="search-form-top" style={{ width: '100%' }}>
                <input
                  name="q"
                  onChange={fetchResults}
                  onFocus={fetchResults}
                  placeholder="Try a ring style or name"
                  ref={inputRef}
                  type="search"
                  list={queriesDatalistId}
                  className="search-input-top f-20 f-m-16 black-color w-400 l-h-1-2 ff-c"
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            )}
          </SearchFormPredictive>
        </div>

        {/* Close Button Right */}
        <button
          onClick={close}
          className="reset search-close-btn"
          aria-label="Close Search"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Predictive Results Container - Below the top bar */}
      <div className="predictive-results-container" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
        <SearchResultsPredictive>
          {({ items, total, term, state, closeSearch }) => {
            const { articles, collections, pages, products, queries } = items;

            if (state === 'loading' && term.current) {
              return <div className="page-width" style={{ padding: '20px' }}>Loading...</div>;
            }

            if (!total) {
              return null;
            }

            return (
              <div className="page-width search-results-content" style={{ padding: '40px 20px' }}>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                {/* Add others if needed */}
              </div>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

/**
 * @param {{
 *   header: PageLayoutProps['header'];
 *   publicStoreDomain: PageLayoutProps['publicStoreDomain'];
 * }}
 */
function MobileMenuAside({ header, publicStoreDomain }) {
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="MENU">
        <HeaderMenu
          menu={{
            id: 'mobile-combined-menu',
            items: [
              ...(header.leftMenu?.items || []),
              ...(header.rightMenu?.items || [])
            ]
          }}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside>
    )
  );
}

/**
 * @typedef {Object} PageLayoutProps
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 * @property {React.ReactNode} [children]
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
