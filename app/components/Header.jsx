import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Await, NavLink, useAsyncValue, useLocation, Link } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { FILTER_ICONS } from '~/components/CustomCollectionFilters';
import ScrollProgress from '~/components/ScrollProgress';
import { SearchFormPredictive } from '~/components/SearchFormPredictive';

function getSocialIcon(title) {
  const iconName = title.toLowerCase();

  if (iconName.includes('instagram')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M13.23 3.492c-.84-.037-1.096-.046-3.23-.046-2.144 0-2.39.01-3.238.055-.776.027-1.195.164-1.487.273a2.43 2.43 0 0 0-.912.593 2.486 2.486 0 0 0-.602.922c-.11.282-.238.702-.274 1.486-.046.84-.046 1.095-.046 3.23 0 2.134.01 2.39.046 3.229.004.51.097 1.016.274 1.495.145.365.319.639.602.913.282.282.538.456.92.602.474.176.974.268 1.479.273.848.046 1.103.046 3.238.046 2.134 0 2.39-.01 3.23-.046.784-.036 1.203-.164 1.486-.273.374-.146.648-.329.921-.602.283-.283.447-.548.602-.922.177-.476.27-.979.274-1.486.037-.84.046-1.095.046-3.23 0-2.134-.01-2.39-.055-3.229-.027-.784-.164-1.204-.274-1.495a2.43 2.43 0 0 0-.593-.913 2.604 2.604 0 0 0-.92-.602c-.284-.11-.703-.237-1.488-.273ZM6.697 2.05c.857-.036 1.131-.045 3.302-.045 1.1-.014 2.202.001 3.302.045.664.014 1.321.14 1.943.374a3.968 3.968 0 0 1 1.414.922c.41.397.728.88.93 1.414.23.622.354 1.279.365 1.942C18 7.56 18 7.824 18 10.005c0 2.17-.01 2.444-.046 3.292-.036.858-.173 1.442-.374 1.943-.2.53-.474.976-.92 1.423a3.896 3.896 0 0 1-1.415.922c-.51.191-1.095.337-1.943.374-.857.036-1.122.045-3.302.045-2.171 0-2.445-.009-3.302-.055-.849-.027-1.432-.164-1.943-.364a4.152 4.152 0 0 1-1.414-.922 4.128 4.128 0 0 1-.93-1.423c-.183-.51-.329-1.085-.365-1.943C2.009 12.45 2 12.167 2 10.004c0-2.161 0-2.435.055-3.302.027-.848.164-1.432.365-1.942a4.44 4.44 0 0 1 .92-1.414 4.18 4.18 0 0 1 1.415-.93c.51-.183 1.094-.33 1.943-.366Zm.427 4.806a4.105 4.105 0 1 1 5.805 5.805 4.105 4.105 0 0 1-5.805-5.805Zm1.882 5.371a2.668 2.668 0 1 0 2.042-4.93 2.668 2.668 0 0 0-2.042 4.93Zm5.922-5.942a.958.958 0 1 1-1.355-1.355.958.958 0 0 1 1.355 1.355Z" clipRule="evenodd" />
      </svg>
    );
  } else if (iconName.includes('facebook')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 10.049C18 5.603 14.419 2 10 2c-4.419 0-8 3.603-8 8.049C2 14.067 4.925 17.396 8.75 18v-5.624H6.719v-2.328h2.03V8.275c0-2.017 1.195-3.132 3.023-3.132.874 0 1.79.158 1.79.158v1.98h-1.009c-.994 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326H11.25V18c3.825-.604 6.75-3.933 6.75-7.951Z" />
      </svg>
    );
  } else if (iconName.includes('twitter') || iconName.includes('x')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M7.27301 2.80005L10.8 7.82205L15.218 2.80005H16.986L11.586 8.93905L17.385 17.193H12.727L8.99701 11.883L4.32601 17.193H2.55801L8.21201 10.766L2.61501 2.80005H7.27301ZM13.515 15.925L5.07001 4.10905H6.47501L14.921 15.925H13.515Z" clipRule="evenodd" />
      </svg>
    );
  } else if (iconName.includes('youtube')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.16 5.87c.34 1.309.34 4.08.34 4.08s0 2.771-.34 4.08a2.125 2.125 0 0 1-1.53 1.53c-1.309.34-6.63.34-6.63.34s-5.321 0-6.63-.34a2.125 2.125 0 0 1-1.53-1.53c-.34-1.309-.34-4.08-.34-4.08s0-2.771.34-4.08a2.173 2.173 0 0 1 1.53-1.53C4.679 4 10 4 10 4s5.321 0 6.63.34a2.173 2.173 0 0 1 1.53 1.53ZM8.3 12.5l4.42-2.55L8.3 7.4v5.1Z" />
      </svg>
    );
  } else if (iconName.includes('pinterest')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2.01c2.124.01 4.16.855 5.666 2.353a8.087 8.087 0 0 1 1.277 9.68A7.952 7.952 0 0 1 10 18.04a8.164 8.164 0 0 1-2.276-.307c.403-.653.672-1.24.816-1.729l.567-2.2c.134.27.393.5.768.702.384.192.768.297 1.19.297.836 0 1.585-.24 2.248-.72a4.678 4.678 0 0 0 1.537-1.969c.37-.89.554-1.848.537-2.813 0-1.249-.48-2.315-1.43-3.227a5.061 5.061 0 0 0-3.65-1.374c-.893 0-1.729.154-2.478.461a5.023 5.023 0 0 0-3.236 4.552c0 .72.134 1.355.413 1.902.269.538.672.922 1.22 1.152.096.039.182.039.25 0 .066-.028.114-.096.143-.192l.173-.653c.048-.144.02-.288-.105-.432a2.257 2.257 0 0 1-.548-1.565 3.803 3.803 0 0 1 3.976-3.861c1.047 0 1.863.288 2.44.855.585.576.883 1.315.883 2.228 0 .768-.106 1.479-.317 2.122a3.813 3.813 0 0 1-.893 1.556c-.384.384-.836.576-1.345.576-.413 0-.749-.144-1.018-.451-.259-.307-.345-.672-.25-1.085.147-.514.298-1.026.452-1.537l.173-.701c.057-.25.086-.451.086-.624 0-.346-.096-.634-.269-.855-.192-.22-.451-.336-.797-.336-.432 0-.797.192-1.085.595-.288.394-.442.893-.442 1.499.005.374.063.746.173 1.104l.058.144c-.576 2.478-.913 3.938-1.037 4.36-.116.528-.154 1.153-.125 1.863A8.067 8.067 0 0 1 2 10.03c0-2.208.778-4.11 2.343-5.666A7.721 7.721 0 0 1 10 2.001v.01Z" />
      </svg>
    );
  } else if (iconName.includes('linkedin')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M16.8411 2H3.2061C2.5539 2 2 2.51581 2 3.15124V16.848C2 17.4842 2.36343 18 3.01562 18H16.6507C17.3036 18 18 17.4842 18 16.848V3.15124C18 2.51581 17.4941 2 16.8411 2ZM8.09524 8.09524H10.2491V9.19314H10.2728C10.6011 8.60114 11.571 8 12.7703 8C15.072 8 15.7143 9.2221 15.7143 11.4857V15.7143H13.4286V11.9025C13.4286 10.8891 13.024 10 12.0777 10C10.9288 10 10.381 10.7779 10.381 12.0549V15.7143H8.09524V8.09524ZM4.28571 15.7143H6.57143V8.09524H4.28571V15.7143ZM6.85714 5.42857C6.85714 6.2179 6.2179 6.85714 5.42857 6.85714C4.63924 6.85714 4 6.2179 4 5.42857C4 4.63924 4.63924 4 5.42857 4C6.2179 4 6.85714 4.63924 6.85714 5.42857Z" clipRule="evenodd" />
      </svg>
    );
  } else if (iconName.includes('tiktok')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.511 1.705h2.74s-.157 3.51 3.795 3.768v2.711s-2.114.129-3.796-1.158l.028 5.606A5.073 5.073 0 1 1 8.213 7.56h.708v2.785a2.298 2.298 0 1 0 1.618 2.205L10.51 1.705Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M10 6v4M10 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Custom images for header menu items.
 * Map the menu title string to an image URL.
 * Example: "Engagement Rings": "https://domain.com/image.jpg"
 */
const CUSTOM_MENU_IMAGES = {
  'engagement-rings': 'https://cdn.shopify.com/s/files/1/0801/7317/0906/collections/Holiday_Campaign_P2_7.webp?v=1768907197',
  'Browse Settings': 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/svgviewer-output_1.svg?v=1770353626',
};

/**
 * @param {HeaderProps}
 */
function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return (
    <button
      className="header-menu-mobile-toggle white-color reset"
      onClick={() => open('mobile')}
    >
      <svg className='white-color' viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg"><path d="M1.058 3.175h14.816v1.058H1.058zM1.058 7.937h12.7v1.058h-12.7zM1.058 12.7h14.816v1.058H1.058z"></path></svg>
    </button>
  );
}

export function Header({ header, isLoggedIn, cart, publicStoreDomain }) {
  const { shop, menu, leftMenu, rightMenu } = header;
  const location = useLocation();
  const isTransparentPage = location.pathname === '/' || location.pathname === '/carbon-neutral';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Add scroll listener
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;

      if (isTransparentPage) {
        setIsScrolled(currentScrollY > 50);
      } else {
        setIsScrolled(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTransparentPage]);

  const headerClasses = [
    'header',
    isTransparentPage ? 'header-transparent' : '',
    isTransparentPage && isScrolled ? 'header-scrolled' : '',
    isHidden ? 'header-hidden' : ''
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className="page-width header-layout">

        <div className="header-mobile-toggle-wrapper">
          <HeaderMenuMobileToggle />
        </div>

        <div className="header-desktop-left">
          <HeaderMenu
            menu={leftMenu}
            viewport="desktop"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
        </div>

        <NavLink className="header-logo" prefetch="intent" to="/" end>
          <strong>
            <img src="https://cdn.shopify.com/s/files/1/0801/7317/0906/files/sitara_Logo.png?v=1768293519" alt="Logo" />
          </strong>
        </NavLink>
        <div className="header-right">
          <div className="header-desktop-right-menu">
            <HeaderMenu
              menu={rightMenu}
              viewport="desktop"
              primaryDomainUrl={header.shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
            />
          </div>
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}

/**
 * @param {string} name
 */
function getMetalColor(name) {
  const n = name.toLowerCase();
  if (n.includes('platinum')) return 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Platinum.svg?v=1768212724';
  if (n.includes('yellow gold')) return 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Yellow_Gold.svg?v=1768212724';
  if (n.includes('rose gold')) return 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_Rose_Gold.svg?v=1768212724';
  if (n.includes('white gold')) return 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/18k_White_Gold.svg?v=1768212724';
  if (n.includes('tantalum')) return 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/download_11.svg?v=1768998074';
  if (n.includes('carbon fibre')) return 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/download_12.svg?v=1768998074';
  return null;
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const { close } = useAside();
  const location = useLocation();

  const EDUCATION_BANNER_DATA = {
    image:
      'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/422832977_749666130110177_1098825228619507863_n_500x_9d953b27-93bc-4f7c-87b5-e2e57f0ebd74.jpg?v=1767956980',
    title: 'The Cut',
    subtitle: (
      <>
        Our blog on trends, style and <i>love</i>.
      </>
    ),
    url: '/pages/education',
  };
  const EducationBanner = ({ isDesktop = false, close }) => {
    return (
      <div className="mobile-education-banner">
        <NavLink
          to={EDUCATION_BANNER_DATA.url}
          style={{ textDecoration: 'none' }}
          onClick={close}
        >
          <div
            className="mobile-education-image-wrapper"
            style={isDesktop ? { height: '100%' } : {}}
          >
            <img
              src={EDUCATION_BANNER_DATA.image}
              alt={EDUCATION_BANNER_DATA.title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            <div className="mobile-education-overlay">
              <h3 className="f-18 f-m-18 ff-a w-300 white-color">
                {EDUCATION_BANNER_DATA.title}
              </h3>

              <p className="f-8 f-m-8 ff-a w-300 white-color">
                {EDUCATION_BANNER_DATA.subtitle}
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    );
  };


  function renderMobileUserMenu(item, level = 0) {
    const hasDropdown = item.items && item.items.length > 0;
    const isEducation = item.title === 'Education';
    const urlObj = new URL(item.url);
    const url = urlObj.pathname + urlObj.search + urlObj.hash;

    const metalColor = getMetalColor(item.title);

    // Check CUSTOM_MENU_IMAGES, then FILTER_ICONS, then fallback to resource images
    // Only get icon if there's no metal color background
    let cardImg = null;
    if (!metalColor) {
      const customImgKey = item.title;
      const customImgKeyLower = item.title.toLowerCase();
      const customImgKeyHandle = item.title.toLowerCase().replace(/\s+/g, '-');

      cardImg = CUSTOM_MENU_IMAGES[customImgKey] ||
        CUSTOM_MENU_IMAGES[customImgKeyLower] ||
        CUSTOM_MENU_IMAGES[customImgKeyHandle] ||
        FILTER_ICONS[item.title] ||
        null;

      if (!cardImg && item.resource?.image) cardImg = item.resource.image.url;
      else if (!cardImg && item.resource?.featuredImage) cardImg = item.resource.featuredImage.url;
    }

    if (!hasDropdown) {
      if (cardImg) {
        return (
          <NavLink
            className="mobile-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
          >
            <div className='featured-image'>
              <img src={cardImg} alt={item.title} />
            </div>
            <span className='f-13 f-m-13 ff-c w-300 white-color'>{item.title}</span>
          </NavLink>
        )
      }

      return (
        <NavLink
          className={`mobile-menu-item f-13 f-m-13 ff-n w-300 white-color ${item.title.toLowerCase().replace(/\s+/g, '-')}`}
          end
          key={item.id}
          onClick={close}
          prefetch="intent"
          to={url}
          style={level === 0 ? { order: isEducation ? 100 : 0 } : {}}
        >
          {metalColor && (
            <span
              className="metal-swatch"
              style={
                metalColor.startsWith('#')
                  ? { backgroundColor: metalColor, borderColor: metalColor === '#F9F9F9' ? '#ddd' : metalColor }
                  : { backgroundImage: `url(${metalColor})`, backgroundSize: 'cover', border: 'none' }
              }
            ></span>
          )}
          <span className='f-13 f-m-13 ff-c w-300 white-color'>{item.title}</span>
        </NavLink>
      );
    }

    // Top Level: Use Accordion
    if (level === 0) {
      return (
        <details
          key={item.id}
          className={`mobile-menu-details ${item.title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')}`}
          style={{ order: isEducation ? 100 : 0 }}
        >

          <summary className="mobile-menu-summary f-14 f-m-14 ff-n w-400">
            {item.title}
          </summary>

          {/* Children rendered inside the details */}
          <div className="mobile-menu-content">
            {item.items.map((child, index) => renderMobileUserMenu(child, level + 1))}
            {isEducation && (
              <EducationBanner />
            )}
          </div>
        </details>
      );
    }

    // Inner Levels: Always Open (No Accordion)
    return (
      <div key={item.id} className="mobile-menu-sub-group">
        {/* Optional: Render parent title as header if desired, or just link */}
        {item.url ? (
          <NavLink
            to={url}
            className="mobile-menu-item f-13 f-m-13 ff-n w-500 white-color"
            style={{ paddingLeft: '0', textTransform: 'uppercase' }}
            onClick={close}
          >
            {item.title}
          </NavLink>
        ) : (
          <span className="mobile-menu-item f-13 f-m-13 ff-n w-500 white-color" style={{ paddingLeft: '0', textTransform: 'uppercase' }}>
            {item.title}
          </span>
        )}

        <div style={{ paddingLeft: '0', display: 'flex', flexDirection: 'column' }}>
          {item.items.map((child, index) => renderMobileUserMenu(child, level + 1))}
        </div>
      </div>
    );
  }

  if (viewport === 'mobile') {
    return (
      <nav className={className} role="navigation">
        <div className="mobile-menu-items">
          <div className="mobile-menu-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
            <NavLink prefetch="intent" to="/" end onClick={close}>
              <img src="https://cdn.shopify.com/s/files/1/0801/7317/0906/files/stara_fav_icon_93c6a13b-3df9-434e-8c17-e78f46499e22.png?v=1768294077" alt="Logo" style={{ height: '28px', width: 'auto' }} />
            </NavLink>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', color: 'var(--black_color)' }}>
              <SearchToggle />
              <button className="reset mobile-menu-close" onClick={close} aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--black_color)' }}>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          {(menu || FALLBACK_HEADER_MENU).items.map((item, index) => renderMobileUserMenu(item))}

          <a href="/pages/visit" className="mobile-menu-item f-14 f-m-14 ff-n w-500 white-color">
            BOOK APPOINTMENT
          </a>

          <div className="mobile-menu-item f-14 f-m-14 ff-n w-500 white-color">
            US (USD $) ⌄
          </div>
        </div>

        <div className="mobile-social-icons" style={{ padding: '20px 0', display: 'flex', gap: '20px', marginTop: '0' }}>
          <ul className="social-links">
            <li>
              <Link to="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                {getSocialIcon('Instagram')}
              </Link>
            </li>
            <li>
              <Link to="https://tiktok.com/yourchannel" target="_blank" rel="noopener noreferrer" aria-label="Tiktok">
                {getSocialIcon('Tiktok')}
              </Link>
            </li>
            <li>
              <Link to="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                {getSocialIcon('Facebook')}
              </Link>
            </li>
            <li>
              <Link to="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                {getSocialIcon('YouTube')}
              </Link>
            </li>
            <li>
              <Link to="https://pinterest.com/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                {getSocialIcon('Pinterest')}
              </Link>
            </li>
            <li>
              <Link to="https://linkedin.com/yourchannel" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                {getSocialIcon('LinkedIn')}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }

  return (
    <nav className={className} role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map((item, index) => {
        if (!item.url) return null;

        const url = item.url &&
          (item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl))
          ? (() => { const u = new URL(item.url); return u.pathname + u.search + u.hash; })()
          : item.url;

        const hasDropdown = item.items && item.items.length > 0;

        if (viewport === 'desktop') {
          return (
            <div className="header-menu-item-group" key={item.id}>
              <NavLink
                className={({ isActive }) => {
                  // Don't mark as active if there are query parameters in the URL
                  const hasQueryParams = location.search.length > 0;
                  const shouldBeActive = isActive && !hasQueryParams;
                  return `ff-n header-menu-item text-uppercase white-color w-300 f-m-12 f-12 l-h-1 ${shouldBeActive ? 'active' : ''}`;
                }}
                end
                onClick={close}
                prefetch="intent"
                to={url}
              >
                {item.title}
              </NavLink>
              {hasDropdown && (
                <div className={`mega-menu mega-menu-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  <div className="mega-menu-inner">
                    {item.items.map((column, index) => {
                      const isEducationBanner = item.title === 'Education' && index === item.items.length - 1;

                      const bannerContent = isEducationBanner ? (
                        <div className="mega-menu-column mega-menu-education-banner-desktop" key="education-banner">
                          <EducationBanner isDesktop={true} />
                        </div>
                      ) : null;

                      if (column.items && column.items.length > 0) {
                        return (
                          <React.Fragment key={column.id}>
                            <div className="mega-menu-column" key={column.id}>
                              {column?.title && column?.url && (
                                <NavLink
                                  className="ff-c mega-menu-column-title text-uppercase ff-n white-color w-400 f-m-13 f-13 l-h-1"
                                  end
                                  onClick={close}
                                  prefetch="intent"
                                  to={column.url}
                                >
                                  {column.title}
                                </NavLink>
                              )}
                              <div className="mega-menu-list">
                                {column.items.map((grandchild, index) => {
                                  const gcUrl = grandchild.url && (grandchild.url.includes('myshopify.com') || grandchild.url.includes(publicStoreDomain) || grandchild.url.includes(primaryDomainUrl)) ? (() => { const u = new URL(grandchild.url); return u.pathname + u.search + u.hash; })() : grandchild.url;
                                  const metalColor = getMetalColor(grandchild.title);

                                  // Check CUSTOM_MENU_IMAGES, then FILTER_ICONS, then fallback to resource images
                                  // Only get icon if there's no metal color background
                                  let iconUrl = null;
                                  if (!metalColor) {
                                    const customImgKey = grandchild.title;
                                    const customImgKeyLower = grandchild.title.toLowerCase();
                                    const customImgKeyHandle = grandchild.title.toLowerCase().replace(/\s+/g, '-');

                                    iconUrl = CUSTOM_MENU_IMAGES[customImgKey] ||
                                      CUSTOM_MENU_IMAGES[customImgKeyLower] ||
                                      CUSTOM_MENU_IMAGES[customImgKeyHandle] ||
                                      FILTER_ICONS[grandchild.title] ||
                                      null;

                                    if (!iconUrl && grandchild.resource?.image) iconUrl = grandchild.resource.image.url;
                                    else if (!iconUrl && grandchild.resource?.featuredImage) iconUrl = grandchild.resource.featuredImage.url;
                                  }

                                  return (
                                    <NavLink
                                      to={gcUrl}
                                      key={grandchild.id}
                                      className={({ isActive }) => {
                                        // Check if the link's query parameters are present in the current URL
                                        const currentParams = new URLSearchParams(location.search);
                                        const [linkPath, linkSearch] = gcUrl.split('?');

                                        const linkParams = new URLSearchParams(linkSearch || '');

                                        // Check if pathname matches and all link params are in current params
                                        const pathMatches = location.pathname === linkPath;
                                        let paramsMatch = true;

                                        if (linkParams.toString()) {
                                          // Link has query params - check if they all exist in current URL
                                          for (const [key, value] of linkParams) {
                                            if (currentParams.get(key) !== value) {
                                              paramsMatch = false;
                                              break;
                                            }
                                          }
                                        }

                                        const linkMatches = pathMatches && paramsMatch && linkParams.toString().length > 0;
                                        return `mega-menu-link-item ${linkMatches ? 'active' : ''}`;
                                      }}
                                      onClick={close}
                                    >
                                      {metalColor && (
                                        <span
                                          className="metal-swatch"
                                          style={
                                            metalColor.startsWith('#')
                                              ? { backgroundColor: metalColor, borderColor: metalColor === '#F9F9F9' ? '#ddd' : metalColor }
                                              : { backgroundImage: `url(${metalColor})`, backgroundSize: 'cover', border: 'none' }
                                          }
                                        ></span>
                                      )}
                                      {iconUrl && <img src={iconUrl} alt="" className="icon-small" />}
                                      {grandchild.title}
                                    </NavLink>
                                  )
                                })}
                              </div>
                            </div>
                            {bannerContent}
                          </React.Fragment>
                        )
                      }
                      const customImgKey = column.title;
                      const customImgKeyLower = column.title.toLowerCase();
                      const customImgKeyHandle = column.title.toLowerCase().replace(/\s+/g, '-');

                      let cardImg = CUSTOM_MENU_IMAGES[customImgKey] ||
                        CUSTOM_MENU_IMAGES[customImgKeyLower] ||
                        CUSTOM_MENU_IMAGES[customImgKeyHandle] ||
                        null;

                      if (!cardImg && column.resource?.image) cardImg = column.resource.image.url;
                      else if (!cardImg && column.resource?.featuredImage) cardImg = column.resource.featuredImage.url;
                      if (cardImg) {
                        const colUrl = column.url && (column.url.includes('myshopify.com') || column.url.includes(publicStoreDomain) || column.url.includes(primaryDomainUrl)) ? (() => { const u = new URL(column.url); return u.pathname + u.search + u.hash; })() : column.url;
                        return (
                          <React.Fragment key={column.id}>
                            <div className="mega-menu-column" key={column.id}>
                              <NavLink to={colUrl} className="mega-menu-featured-card" onClick={close}>
                                <div className="featured-card-image">
                                  <img src={cardImg} alt={column.title} />
                                </div>
                                <span className="featured-card-title">{column.title}</span>
                              </NavLink>
                            </div>
                            {bannerContent}
                          </React.Fragment>
                        )
                      }

                      const colUrl = column.url && (column.url.includes('myshopify.com') || column.url.includes(publicStoreDomain) || column.url.includes(primaryDomainUrl)) ? (() => { const u = new URL(column.url); return u.pathname + u.search + u.hash; })() : column.url;
                      return (
                        <React.Fragment key={column.id}>
                          <div className="mega-menu-column" key={column.id}>
                            {column?.title && column?.url && (
                              <NavLink
                                to={colUrl}
                                className="mega-menu-link-item"
                                onClick={close}
                              >
                                {cardImg && (
                                  <div className="featured-card-image">
                                    <img src={cardImg} alt={column.title} />
                                  </div>
                                )}
                                <span>{column.title}</span>
                              </NavLink>
                            )}
                            {bannerContent}
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <NavLink
            className="ff-n header-menu-item text-uppercase w-300 white-color f-m-12 f-12 l-h-1"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({ isLoggedIn, cart }) {
  return (
    <nav className="header-ctas" role="navigation">
      <Suspense fallback={<NavLink prefetch="intent" to="/account/login" className="desktop-only-icon">Sign in</NavLink>}>
        <Await resolve={isLoggedIn}>
          {(loggedIn) => (
            <NavLink
              prefetch="intent"
              to={loggedIn ? '/account' : '/account/login'}
              className="desktop-only-icon text-uppercase white-color w-300 ff-n f-m-12 f-12 l-h-1"
            >
              {loggedIn ? 'Account' : 'Sign in'}
            </NavLink>
          )}
        </Await>
      </Suspense>

      <div className="desktop-only-icon">
        <SearchToggle />
      </div>

      <CartToggle cart={cart} />
    </nav>
  );
}

function SearchToggle() {
  const { open } = useAside();

  return (
    <button className="reset search-toggle" onClick={() => open('search')}>
      <svg
        viewBox="0 0 16.933 16.933"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2.117">
          <path
            d="m10.583 10.583 3.704 3.704"
            className="stroke"
            style={{
              strokeWidth: 1.05831,
              strokeMiterlimit: 4,
              strokeDasharray: 'none'
            }}
          />
          <circle
            cx="7.144"
            cy="7.144"
            r="4.498"
            className="stroke"
            style={{
              fill: 'none',
              fillOpacity: 1,
              stroke: 'currentColor',
              strokeWidth: 1.06528,
              strokeMiterlimit: 4,
              strokeDasharray: 'none',
              strokeOpacity: 1
            }}
          />
        </g>
      </svg>
    </button>
  );
}


/**
 * @param {{count: number | null}}
 */
function CartBadge({ count }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <Link
      to="/cart"
      onClick={() => {
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      className="reset cart-toggle"
      aria-label="Open cart"
    >
      <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}>
        <path className="stroke"
          d="M4.762 5.82V4.234c0-1.172.944-2.116 2.117-2.116h3.175c1.173 0 2.117.944 2.117 2.116v1.588m-10.054 0h12.7s0 0 0 0v8.995s0 0 0 0h-12.7s0 0 0 0V5.821s0 0 0 0z"
          style={{
            fill: 'none',
            stroke: 'currentcolor',
            strokeWidth: 1.05831,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            paintOrder: 'stroke',
            stopColor: 'rgb(0, 0, 0)',
          }}
        />

        {count > 0 && (
          <circle
            cx="13.229"
            cy="13.229"
            r="2.646"
            style={{
              fill: '#ff5757',
            }}
          />
        )}
      </svg>
    </Link>
  );
}


/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({ cart }) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};



/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
