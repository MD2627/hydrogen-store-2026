import { Suspense, useState, useEffect } from 'react';
import { Await, Link, NavLink } from 'react-router';
import '../styles/footer.css';
import { useDynamicMenus } from '~/lib/hooks/useDynamicMenus';
import { TryThemeModal } from "~/components/TryThemeModal";

/**
 * @param {FooterProps}
 */
export function Footer({ footer: footerPromise, header, publicStoreDomain }) {
  const [openAccordions, setOpenAccordions] = useState({
    quickLinks: true,
    aboutUs: false,
    clientCare: false,
    contactUs: false,
  });
  const [isClient, setIsClient] = useState(false);
  const [showTryTheme, setShowTryTheme] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch menus dynamically from Shopify
  const { menus: dynamicMenus, loading: menusLoading, error: menusError } = useDynamicMenus([
    'quick-links',
    'about-us',
    'client-care',
  ]);

  const toggleAccordion = (section) => {
    setOpenAccordions(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => {
          return (
            <footer className="footer">
              <div className="footer-top page-width">
                <div className="footer-top-content">
                  <div className="footer-column footer-logo-column">
                    <div className="footer-logo-wrapper">
                      <Link to="/">
                        <img
                          src="https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Add_a_heading-removebg-preview.png?v=1776678536"   // 👉 change this
                          alt="logo"
                          className="footer-logo"
                        />
                      </Link>
                    </div>

                    <div className="footer-social">
                      {footer?.socialLinks?.items && footer.socialLinks.items.length > 0 ? (
                        <ul className="social-links">
                          {footer.socialLinks.items.map((item) => {
                            if (!item.url) return null;
                            return (
                              <li key={item.id}>
                                <Link to={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.title}>
                                  {getSocialIcon(item.title)}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
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
                      )}
                    </div>

                  </div>
                  <div className="footer-column">
                    <h3
                      className={`footer-heading f-11 f-m-11 ff-n site-text-color${openAccordions.quickLinks ? ' open' : ''}`}
                      onClick={() => toggleAccordion('quickLinks')}
                    >
                      QUICK LINKS
                      <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </h3>
                    <div className={`footer-content ${openAccordions.quickLinks ? 'active' : ''}`}>
                      {menusLoading ? (
                        <div className="loading">Loading...</div>
                      ) : dynamicMenus['quick-links'] ? (
                        <FooterMenu
                          menu={dynamicMenus['quick-links']}
                          primaryDomainUrl={header.shop.primaryDomain.url}
                          publicStoreDomain={publicStoreDomain}
                        />
                      ) : footer?.quickLinks ? (
                        <FooterMenu
                          menu={footer.quickLinks}
                          primaryDomainUrl={header.shop.primaryDomain.url}
                          publicStoreDomain={publicStoreDomain}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="footer-column">
                    <h3
                      className={`footer-heading f-11 f-m-11 ff-n site-text-color${openAccordions.aboutUs ? ' open' : ''}`}
                      onClick={() => toggleAccordion('aboutUs')}
                    >
                      ABOUT US
                      <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </h3>
                    <div className={`footer-content ${openAccordions.aboutUs ? 'active' : ''}`}>
                      {menusLoading ? (
                        <div className="loading">Loading...</div>
                      ) : dynamicMenus['about-us'] ? (
                        <FooterMenu
                          menu={dynamicMenus['about-us']}
                          primaryDomainUrl={header.shop.primaryDomain.url}
                          publicStoreDomain={publicStoreDomain}
                        />
                      ) : footer?.aboutUs ? (
                        <FooterMenu
                          menu={footer.aboutUs}
                          primaryDomainUrl={header.shop.primaryDomain.url}
                          publicStoreDomain={publicStoreDomain}
                        />
                      ) : null}
                    </div>
                  </div>

                  <div className="footer-column">
                    <h3
                      className={`footer-heading f-11 f-m-11 ff-n site-text-color${openAccordions.clientCare ? ' open' : ''}`}
                      onClick={() => toggleAccordion('clientCare')}
                    >
                      CLIENT CARE
                      <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </h3>
                    <div className={`footer-content ${openAccordions.clientCare ? 'active' : ''}`}>
                      {menusLoading ? (
                        <div className="loading">Loading...</div>
                      ) : dynamicMenus['client-care'] ? (
                        <FooterMenu
                          menu={dynamicMenus['client-care']}
                          primaryDomainUrl={header.shop.primaryDomain.url}
                          publicStoreDomain={publicStoreDomain}
                        />
                      ) : footer?.clientCare ? (
                        <FooterMenu
                          menu={footer.clientCare}
                          primaryDomainUrl={header.shop.primaryDomain.url}
                          publicStoreDomain={publicStoreDomain}
                        />
                      ) : null}
                    </div>
                  </div>

                  <div className="footer-column">
                    <h3 className={`footer-heading f-11 f-m-11 ff-n site-text-color${openAccordions.contactUs ? ' open' : ''}`} onClick={() => toggleAccordion('contactUs')}>
                      CONTACT US
                      <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </h3>
                    <div className={`footer-content ${isClient && openAccordions.contactUs ? 'active' : ''}`}>
                      <ul className="footer-contact">
                        <li className="contact-item">
                          <span className="contact-icon"><svg style={{ width: '16px' }} viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg"><path d="M11.66 1.063c3.855-.964 5.096 2.25 4.4 5.038-.643 2.57-5.145 8.426-9.117 9.731-3.333 1.095-6.38-.534-6.04-3.725l3.758-1.661c1.308.163 2.114 1.933 2.114 1.933 2.416-1.43 4.252-3.173 5.118-5.478-.938-.415-1.874-1.028-2.162-1.982Z" style={{ width: '16px', fillOpacity: 1, stroke: 'none', strokeWidth: '0.321282px', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeOpacity: 1 }}></path></svg></span>
                          <Link className="ff-c site-text-color f-11 f-m-11" to="tel:+611300977619">+61 1300 977 619</Link>
                        </li>
                        <li className="contact-item">
                          <span className="contact-icon"><svg style={{ width: '20px' }} viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg"><path style={{ width: '20px' }} d="M4.83 4.366 8.465 8l3.636-3.634Zm8.55.075L8.467 9.544 3.553 4.63v7.938h9.827z"></path></svg></span>
                          <Link className="ff-c site-text-color f-11 f-m-11" to="mailto:demo@gmail.com">demo@gmail.com</Link>
                        </li>
                        <li className="contact-item">
                          <span className="contact-icon"><svg style={{ width: '20px' }} viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg"><path d="M13.412 4.112v8.69a.102.102 0 0 1-.102.102H3.623a.102.102 0 0 1-.102-.102v-8.69c0-.057.046-.103.102-.103h1.364c.08 0 .145-.065.145-.145v-.83c0-.056.046-.102.103-.102h.69c.056 0 .102.046.102.102v.83c0 .08.065.145.145.145h4.59c.08 0 .144-.065.144-.145v-.83c0-.056.046-.102.103-.102h.69c.056 0 .102.046.102.102v.83c0 .08.065.145.145.145h1.364c.056 0 .102.046.102.103zm-.769 7.933v-5.84a.147.147 0 0 0-.147-.147h-8.06a.147.147 0 0 0-.146.147v5.84c0 .08.066.147.147.147h8.06a.147.147 0 0 0 .146-.147z"></path><path d="m6.62 9.423 1.108 1.108 2.906-2.905"></path></svg></span>
                          <Link to={'/visit'} className="ff-c site-text-color f-11 f-m-11">Appointment Only</Link>
                        </li>
                        <li className="contact-hours ff-c site-text-color f-11 f-m-11">
                          <strong>CONTACT HOURS</strong>
                          <div>MON-WED:9:30 AM - 11:00 AM</div>
                          <div>THU-FRI:9:30 AM - 5:30 PM</div>
                          <div>SAT:10:00 AM - 4:00 PM</div>
                        </li>
                        <li className="ff-c site-text-color f-11 f-m-11"><NavLink to="/contact">Get in Touch</NavLink></li>
                        <li className="ff-c site-text-color f-11 f-m-11"><NavLink to="/feedback">Feedback</NavLink></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="footer-middle page-width">
                <div className="footer-middle-content">

                  <div className="footer-newsletter">
                    <div className="newsletter-text">
                      <h3 className="newsletter-heading f-12 f-m-12 ff-n site-text-color">RING ADVICE, STRAIGHT TO YOUR INBOX</h3>
                      <NewsletterForm />
                    </div>
                  </div>

                </div>
              </div>

              <div className="footer-bottom page-width">
                <div className="footer-bottom-content">

                  <div className='footer-bottom-left'>
                    <div className="footer-legal">
                      {footer?.legalLinks?.items && footer.legalLinks.items.length > 0 ? (
                        <ul className="legal-links">
                          {footer.legalLinks.items.map((item, index) => {
                            if (!item.url) return null;
                            const url =
                              item.url.includes('myshopify.com') ||
                                item.url.includes(publicStoreDomain) ||
                                item.url.includes(header.shop.primaryDomain.url)
                                ? new URL(item.url).pathname
                                : item.url;
                            const isExternal = !url.startsWith('/');
                            return (
                              <li key={item.id}>
                                {isExternal ? (
                                  <Link to={url} rel="noopener noreferrer" target="_blank" className='f-10 f-m-10 ff-n site-text-color'>
                                    {item.title}
                                  </Link>
                                ) : (
                                  <NavLink to={url} className='f-10 f-m-10 ff-n site-text-color'>{item.title}</NavLink>
                                )}
                                {index < footer.legalLinks.items.length - 1 && <span className="separator">|</span>}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <ul className="legal-links">
                          <li>
                            <NavLink to="/policies/terms-of-service" className='f-10 f-m-10 ff-n site-text-color'>Terms and Conditions</NavLink>
                            <span className="separator">|</span>
                          </li>
                          <li>
                            <NavLink to="#" className='f-10 f-m-10 ff-n site-text-color'>Terms of Sale</NavLink>
                            <span className="separator">|</span>
                          </li>
                          <li>
                            <NavLink to="/policies/privacy-policy" className='f-10 f-m-10 ff-n site-text-color'>Privacy</NavLink>
                            <span className="separator">|</span>
                          </li>
                          <li>
                            <NavLink to="/policies/refund-policy" className='f-10 f-m-10 ff-n site-text-color'>Returns</NavLink>
                            <span className="separator">|</span>
                          </li>
                          <li>
                            <NavLink to="/site-map" className='f-10 f-m-10 ff-n site-text-color'>Site Map</NavLink>
                            <span className="separator">|</span>
                          </li>
                          <li>
                            <NavLink to="/engagement-rings" className='f-10 f-m-10 ff-n site-text-color'>Engagement Rings</NavLink>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="payment-text f-10 f-m-10 ff-n site-text-color">All payments are 256-bit SSL secure and encrypted</div>

                  </div>

                  <div className="footer-bottom-center copyright f-10 f-m-10 ff-n site-text-color">© 2025 Stara</div>

                  <div className="footer-bottom-right footer-payment">
                    <div className="payment-icons">
                      <svg viewBox="0 0 38 24" aria-labelledby="pi-american_express" xmlns="http://www.w3.org/2000/svg"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" opacity=".07"></path><path fill="#006fcf" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#fff" d="m8.971 10.268.774 1.876H8.203Zm16.075.078h-2.977v.827h2.929v1.239h-2.923v.922h2.977v.739l2.077-2.245-2.077-2.34zm-14.063-2.34h3.995l.887 1.935L16.687 8h10.37l1.078 1.19L29.25 8h4.763l-3.519 3.852 3.483 3.828h-4.834l-1.078-1.19-1.125 1.19H10.03l-.494-1.19h-1.13l-.495 1.19H4L7.286 8h3.43zm8.663 1.078h-2.239l-1.5 3.536-1.625-3.536H12.06v4.81L10 9.084H8.007l-2.382 5.512H7.18l.494-1.19h2.596l.494 1.19h2.72v-3.935l1.751 3.941h1.19l1.74-3.929v3.93h1.458l.024-5.52zm9.34 2.768 2.531-2.768h-1.822l-1.601 1.726-1.548-1.726h-5.894v5.518h5.81l1.614-1.738 1.548 1.738h1.875l-2.512-2.75z"></path></svg>
                      <svg viewBox="0 0 38 24" aria-labelledby="pi-master" xmlns="http://www.w3.org/2000/svg"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M10.11 8.102c.318-.398.533-.932.476-1.477-.465.023-1.032.307-1.361.705-.295.34-.556.896-.489 1.419.523.045 1.045-.261 1.374-.647M10.58 8.851c-.758-.045-1.403.43-1.765.43-.362 0-.917-.407-1.517-.396a2.236 2.236 0 0 0-1.901 1.155c-.815 1.404-.215 3.488.577 4.632.385.566.849 1.189 1.46 1.166.578-.022.804-.373 1.505-.373.702 0 .906.373 1.517.362.634-.011 1.03-.566 1.415-1.133.442-.645.622-1.268.633-1.302-.01-.011-1.222-.476-1.233-1.869-.011-1.166.95-1.721.996-1.755-.543-.804-1.392-.894-1.687-.917M18.142 7.273c1.649 0 2.797 1.136 2.797 2.79 0 1.66-1.172 2.803-2.838 2.803h-1.825v2.902h-1.319V7.273Zm-1.866 4.486h1.513c1.148 0 1.801-.618 1.801-1.69 0-1.071-.653-1.684-1.795-1.684h-1.52zM21.266 14.008c0-1.09.83-1.713 2.36-1.808l1.643-.1v-.47c0-.69-.453-1.066-1.26-1.066-.665 0-1.148.341-1.248.865h-1.19c.036-1.1 1.072-1.901 2.473-1.901 1.508 0 2.49.788 2.49 2.013v4.227h-1.218v-1.019h-.03c-.347.666-1.112 1.084-1.942 1.084-1.225 0-2.078-.73-2.078-1.825zm4.003-.548v-.477l-1.466.095c-.824.053-1.254.359-1.254.894 0 .518.448.854 1.148.854.895 0 1.572-.571 1.572-1.366zM27.655 18.04v-1.018c.083.012.283.023.389.023.582 0 .912-.246 1.112-.883l.118-.376-2.231-6.182h1.377l1.555 5.016h.03l1.553-5.016h1.343l-2.314 6.494c-.53 1.49-1.136 1.978-2.42 1.978-.1 0-.424-.012-.512-.036z"></path></svg>
                      <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="pi-generic"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#999" d="M0 5h38v4H0V5z"></path><path opacity=".15" d="M5 17h10v2H5v-2zm24 0h4v2h-4v-2z"></path></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" aria-labelledby="pi-google_pay"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" opacity=".07"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path><path d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z" fill="#5F6368"></path><path d="M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z" fill="#4285F4"></path><path d="M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z" fill="#34A853"></path><path d="M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z" fill="#FBBC04"></path><path d="M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z" fill="#EA4335"></path></svg>
                      <svg viewBox="0 0 38 24" aria-labelledby="pi-master" xmlns="http://www.w3.org/2000/svg"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M31.376 10.65c-.667 0-1.221.387-1.467.756-.175-.5-.597-.755-1.203-.755-.627 0-1.143.332-1.357.576a.975.975 0 0 0-.414-.432c-.2-.118-.453-.176-.747-.176-.162 0-.318.024-.464.063-.521.098-.94.417-1.146.724-.176-.5-.597-.755-1.204-.755-.667 0-1.212.378-1.397.624v-.518h-1.352V15h1.352v-2.741c.141-.176.396-.413.756-.413.413 0 .562.246.562.57V15h1.353v-2.741a1.06 1.06 0 0 1 .5-.371.821.821 0 0 1 .264-.042c.325 0 .49.159.543.389V15h1.364v-2.754c.143-.175.394-.4.745-.4.413 0 .563.246.563.57V15h1.352v-2.741c.132-.176.396-.413.765-.413.404 0 .562.246.562.57V15h1.344v-3.075c0-.87-.492-1.274-1.274-1.274zM18.91 15h1.353v-4.243H18.91v2.74a1.013 1.013 0 0 1-.808.414c-.44 0-.703-.176-.703-.686v-2.468h-1.353v3.022c0 .782.43 1.327 1.397 1.327.712 0 1.204-.316 1.467-.615V15zm-4.53-2.469c0-.518-.273-.685-.703-.685-.396 0-.659.22-.817.413V15h-1.353V9.14h1.353v2.135c.255-.298.755-.624 1.467-.624.966 0 1.405.545 1.405 1.327V15H14.38zM9.981 9.065l-2.93 2.93a.118.118 0 0 1-.166-.166l2.048-2.048-.045-.07a3.033 3.033 0 0 0-2.075-.817c-.839 0-1.599.34-2.15.888-.197.201-.842.235-1.284.185.274.35.54.884.483 1.216a3.045 3.045 0 0 0 2.95 3.802H9.86v-2.07a2.819 2.819 0 0 0 .122-3.85Z" fill="#ff6c00"></path><path d="M5.541 10.761a.43.43 0 0 1-.428-.436c0-.01 0-.022.002-.032v-.01a.232.232 0 1 0 .216-.32h-.008a.429.429 0 1 1 .219.797z" fill="#fff"></path><path d="m34.107 11.94-.151-.271a.223.223 0 0 0 .147-.223c0-.137-.093-.246-.257-.246h-.371v.74h.19v-.248h.098l.125.249zm-.29-.415h-.151v-.159h.15c.052 0 .093.028.093.08 0 .052-.041.08-.092.08z" fill="#ff6c00"></path><path fillRule="evenodd" clipRule="evenodd" d="M34.368 10.963a.863.863 0 0 0-.613-.252.863.863 0 0 0-.865.866.863.863 0 0 0 .865.865.863.863 0 0 0 .865-.865.84.84 0 0 0-.252-.614zm-1.26.619a.647.647 0 1 0 1.295-.002.647.647 0 0 0-1.295.002z" fill="#ff6c00"></path></svg>
                      <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="pi-master"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg>
                      <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="pi-paypal"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path><path fill="#3086C8" d="m23.9 8.3-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" aria-labelledby="pi-shopify_pay"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z" fill="#5A31F4"></path><path d="M21.382 9.713c0 1.668-1.177 2.858-2.821 2.858h-1.549a.133.133 0 0 0-.12.08.127.127 0 0 0-.01.049v2.192a.129.129 0 0 1-.13.129h-1.084a.13.13 0 0 1-.13-.13V6.986a.127.127 0 0 1 .08-.12.129.129 0 0 1 .05-.01h2.9c1.637 0 2.814 1.19 2.814 2.858v-.001zm-1.352 0c0-.958-.658-1.658-1.55-1.658h-1.468a.13.13 0 0 0-.13.13v3.05a.127.127 0 0 0 .038.092.129.129 0 0 0 .092.038h1.468c.892.005 1.55-.695 1.55-1.652zm1.674 3.791a1.527 1.527 0 0 1 .647-1.317c.423-.316 1.084-.48 2.055-.514l1.033-.036v-.303c0-.607-.41-.863-1.068-.863-.658 0-1.075.231-1.17.61a.127.127 0 0 1-.125.09h-1.022a.13.13 0 0 1-.126-.092.125.125 0 0 1-.004-.055c.152-.898.904-1.58 2.494-1.58 1.692 0 2.303.783 2.303 2.276v3.172a.13.13 0 0 1-.132.129h-1.03a.13.13 0 0 1-.13-.13v-.236a.096.096 0 0 0-.061-.091.1.1 0 0 0-.107.022c-.31.334-.808.575-1.607.575-1.175 0-1.95-.607-1.95-1.657zm3.735-.687v-.246l-1.339.07c-.705.036-1.115.326-1.115.816 0 .444.376.69 1.034.69.893 0 1.42-.48 1.42-1.33zm2.316 4.6v-.919a.13.13 0 0 1 .049-.1.132.132 0 0 1 .108-.027c.158.029.318.044.479.044a1.229 1.229 0 0 0 1.245-.876l.067-.211a.133.133 0 0 0 0-.088l-2.145-5.471a.13.13 0 0 1 .06-.165.13.13 0 0 1 .062-.015h1.04a.132.132 0 0 1 .123.085l1.456 3.859a.131.131 0 0 0 .125.088.133.133 0 0 0 .125-.088l1.265-3.848a.13.13 0 0 1 .126-.09h1.076a.134.134 0 0 1 .132.116.134.134 0 0 1-.008.063l-2.295 6.076c-.528 1.413-1.433 1.773-2.43 1.773a1.959 1.959 0 0 1-.561-.066.132.132 0 0 1-.1-.14h.001zM8.57 6.4a5.363 5.363 0 0 0-3.683 1.427.231.231 0 0 0-.029.31l.618.839a.236.236 0 0 0 .362.028 3.823 3.823 0 0 1 2.738-1.11c2.12 0 3.227 1.584 3.227 3.15 0 1.7-1.163 2.898-2.835 2.921-1.292 0-2.266-.85-2.266-1.974a1.908 1.908 0 0 1 .713-1.48.231.231 0 0 0 .033-.324l-.65-.815a.236.236 0 0 0-.339-.034 3.43 3.43 0 0 0-.942 1.183 3.39 3.39 0 0 0-.337 1.47c0 1.935 1.655 3.452 3.775 3.464h.03c2.517-.032 4.337-1.884 4.337-4.415 0-2.247-1.667-4.64-4.752-4.64z" fill="#fff"></path></svg>
                      <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="pi-visa"><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path></svg>
                      <svg viewBox="0 0 74 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4.667A3.667 3.667 0 0 1 4.667 1h64.666A3.667 3.667 0 0 1 73 4.667v36.666A3.667 3.667 0 0 1 69.333 45H4.667A3.667 3.667 0 0 1 1 41.333V4.667Z" fill="#FFFFFA"></path><path d="m27.466 16.689 1.877 15.27h18.354L45.82 16.69H27.466Z" fill="#AA8FFF"></path><path d="M32.702 10.862c1.17 1.1 1.331 2.83.359 3.866-.973 1.034-2.71.981-3.88-.12-1.171-1.1-1.332-2.83-.36-3.866.973-1.034 2.71-.98 3.881.12Z" fill="#1A0826"></path><path fillRule="evenodd" clipRule="evenodd" d="M66.932 22.188c-.422-3.435-3.12-5.511-6.784-5.499H47.944l1.878 15.271h5.492l-.374-3.054h5.812c4.569 0 6.663-2.85 6.18-6.718Zm-6.778 2.438-5.746.006-.452-3.664 5.776.006c1.358.019 2.052.78 2.166 1.83.073.67-.235 1.822-1.744 1.822Z" fill="#1A0826"></path><path d="m8.352 27.693.525 4.267h18.336l-.604-4.883h-8.546l-.078-.61 7.876-5.498-.525-4.28H7l.598 4.89h8.564l.078.609-7.888 5.505Z" fill="#1A0826"></path><path d="M4.667 2h64.666V0H4.667v2ZM72 4.667v36.666h2V4.667h-2ZM69.333 44H4.667v2h64.666v-2ZM2 41.333V4.667H0v36.666h2ZM4.667 44A2.667 2.667 0 0 1 2 41.333H0A4.667 4.667 0 0 0 4.667 46v-2ZM72 41.333A2.667 2.667 0 0 1 69.333 44v2A4.667 4.667 0 0 0 74 41.333h-2ZM69.333 2A2.667 2.667 0 0 1 72 4.667h2A4.667 4.667 0 0 0 69.333 0v2ZM4.667 0A4.667 4.667 0 0 0 0 4.667h2A2.667 2.667 0 0 1 4.667 2V0Z" fill="#1A0826"></path></svg>
                    </div>
                  </div>


                  <button className='try-theme-btn' onClick={() => setShowTryTheme(true)}>
                    <img src="https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_12frs12frs12frs1.png?v=1775905453" alt="download-icon" />
                  </button>

                  {/* ── TRY THEME MODAL ── */}
                  <TryThemeModal
                    isOpen={showTryTheme}
                    onClose={() => setShowTryTheme(false)}
                    formId="theme-showcase-bottom-nav"
                  />

                </div>
              </div>
            </footer>
          );
        }}
      </Await>
    </Suspense>
  );
}

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
  } else if (iconName.includes('snapchat')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M17.388 15.3961C17.0368 15.5883 16.6638 15.7377 16.277 15.8411C16.203 16.0711 16.041 16.4051 15.681 16.6541C15.412 16.8314 15.1023 16.9374 14.781 16.9621C14.641 16.9771 14.468 16.9831 14.338 16.9881L14.246 16.9921C13.929 17.0061 13.622 17.0341 13.288 17.1461L13.286 17.1471C13.1699 17.1908 13.0589 17.2471 12.955 17.3151L12.817 17.4001C12.677 17.4871 12.487 17.6051 12.32 17.6981C11.6132 18.1004 10.8123 18.3081 9.99902 18.3001C9.18748 18.3095 8.38819 18.1016 7.68402 17.6981C7.52002 17.6071 7.32902 17.4881 7.18902 17.4011L7.04902 17.3151C6.94206 17.2472 6.82888 17.1896 6.71102 17.1431C6.40005 17.046 6.07675 16.9941 5.75102 16.9891L5.66102 16.9861C5.53102 16.9801 5.35702 16.9731 5.21602 16.9591C5.06602 16.9431 4.67502 16.8991 4.31602 16.6491C4.03469 16.452 3.82624 16.1677 3.72302 15.8401C3.33518 15.7384 2.96161 15.5886 2.61102 15.3941C2.36503 15.2639 2.15065 15.0812 1.98302 14.8591C1.8462 14.674 1.75573 14.4588 1.71919 14.2316C1.68265 14.0044 1.70111 13.7717 1.77302 13.5531C1.87168 13.2633 2.05662 13.0107 2.30302 12.8291C2.44002 12.7251 2.57302 12.6591 2.62602 12.6331C3.85602 12.0291 4.39602 11.2531 4.62202 10.8001L4.44202 10.6821C4.27502 10.5721 4.10002 10.4591 4.00402 10.3911C3.75202 10.2131 3.43202 9.94206 3.22502 9.54106C3.10728 9.31562 3.03865 9.06778 3.02365 8.81389C3.00865 8.55999 3.04763 8.3058 3.13802 8.06806L3.14002 8.06306C3.48402 7.14106 4.34002 6.92306 4.84402 6.92306H4.91402C4.91736 6.69973 4.92836 6.47373 4.94702 6.24506C4.99171 5.17126 5.41096 4.147 6.13202 3.35006L6.13902 3.34306C6.63384 2.80515 7.2385 2.37988 7.91202 2.09606C8.57882 1.81681 9.29737 1.68251 10.02 1.70206C12.292 1.71006 13.542 2.97506 13.875 3.35706C14.5904 4.15241 15.0063 5.17223 15.051 6.24106C15.07 6.46806 15.079 6.69706 15.083 6.91906H15.171C15.692 6.92406 16.517 7.16106 16.855 8.05206L16.86 8.06406C16.9505 8.30257 16.9893 8.5576 16.9738 8.81224C16.9583 9.06688 16.8888 9.31531 16.77 9.54106C16.561 9.94206 16.239 10.2131 15.984 10.3911C15.8512 10.4818 15.7171 10.5708 15.582 10.6581L15.373 10.7961C15.597 11.2461 16.133 12.0221 17.367 12.6231L17.377 12.6271L17.385 12.6311C17.441 12.6601 17.573 12.7281 17.71 12.8341C17.83 12.9271 18.098 13.1571 18.23 13.5581C18.39 14.0511 18.258 14.5211 18.023 14.8501C17.8563 15.0743 17.6423 15.259 17.396 15.3911L17.388 15.3961Z" clipRule="evenodd" />
      </svg>
    );
  } else if (iconName.includes('tumblr')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M11.997 18c-2.26 0-3.954-1.235-3.954-4.198V9.061H6V6.489C8.26 5.867 9.201 3.787 9.314 2h2.344v4.068h2.73V9.06h-2.73v4.128c0 1.235.584 1.667 1.516 1.667h1.318V18h-2.495Z" clipRule="evenodd" />
      </svg>
    );
  } else if (iconName.includes('vimeo')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M17.995 7.002C17.92 8.457 16.9 10.451 14.935 13c-2.039 2.653-3.763 3.988-5.187 3.988-.87 0-1.605-.81-2.205-2.429L6.33 10.121c-.45-1.62-.93-2.43-1.44-2.43-.12 0-.51.24-1.184.706L3 7.497l2.19-1.95c.989-.869 1.724-1.319 2.218-1.349 1.17-.135 1.89.66 2.16 2.37.3 1.844.495 2.998.6 3.448.344 1.53.704 2.294 1.11 2.294.314 0 .794-.495 1.424-1.5.49-.67.832-1.436 1.004-2.249.09-.87-.255-1.304-1.004-1.304-.36 0-.735.09-1.11.255.735-2.414 2.144-3.584 4.213-3.509 1.545.045 2.265 1.05 2.19 3Z" clipRule="evenodd" />
      </svg>
    );
  } else if (iconName.includes('spotify')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.3174 2.15792C5.90232 1.98576 2.18119 5.35734 2.00643 9.68876C1.83094 14.0202 5.26836 17.6701 9.68268 17.8423C14.0977 18.0144 17.8181 14.6428 17.9936 10.3114C18.1684 5.98001 14.7317 2.32937 10.3174 2.15792ZM13.6941 13.6558C13.5947 13.8279 13.4009 13.914 13.2122 13.8882C13.1545 13.8803 13.0967 13.8616 13.0426 13.8315C11.9853 13.2411 10.8329 12.8566 9.6176 12.6888C8.40233 12.5209 7.18633 12.579 6.00396 12.8609C5.7473 12.9219 5.48919 12.7677 5.42703 12.5159C5.36488 12.2641 5.52209 12.0108 5.77875 11.9499C7.07884 11.64 8.41549 11.5761 9.75068 11.7605C11.0859 11.9449 12.3523 12.3674 13.5157 13.0166C13.7446 13.145 13.825 13.4305 13.6948 13.6558H13.6941ZM14.7456 11.5955C14.5825 11.891 14.2052 12.0015 13.904 11.8416C12.6668 11.1852 11.3272 10.754 9.92252 10.5603C8.51786 10.3667 7.10955 10.419 5.73561 10.7153C5.66102 10.7311 5.58717 10.7339 5.51551 10.7239C5.26617 10.6895 5.05265 10.5073 4.99562 10.2512C4.92177 9.92262 5.13382 9.59765 5.46871 9.5252C6.98744 9.19737 8.54418 9.13926 10.0958 9.35303C11.6467 9.56681 13.1274 10.0431 14.4948 10.7691C14.7968 10.9291 14.9086 11.2985 14.7456 11.5948V11.5955ZM15.9111 9.27269C15.7576 9.5625 15.438 9.71243 15.1265 9.66939C15.0425 9.65791 14.9598 9.63209 14.8801 9.59191C13.4396 8.85662 11.888 8.37097 10.2684 8.14787C8.64875 7.92477 7.02034 7.97212 5.42923 8.28919C5.01536 8.37169 4.61247 8.10913 4.52838 7.70382C4.44429 7.2978 4.71191 6.90253 5.12504 6.82004C6.88726 6.46925 8.68896 6.41688 10.4812 6.66365C12.2734 6.91043 13.9902 7.44844 15.5857 8.26265C15.9601 8.45346 16.1056 8.90612 15.9111 9.27341V9.27269Z" />
      </svg>
    );
  } else if (iconName.includes('threads')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5643 9.39373C13.4928 9.35946 13.4201 9.32648 13.3466 9.29489C13.2184 6.93398 11.9284 5.58236 9.76225 5.56853C9.75244 5.56847 9.74268 5.56847 9.73287 5.56847C8.43724 5.56847 7.35968 6.12151 6.69645 7.12787L7.88776 7.94508C8.38322 7.19337 9.16079 7.03312 9.73344 7.03312C9.74005 7.03312 9.74669 7.03312 9.75324 7.03318C10.4665 7.03772 11.0047 7.24509 11.353 7.6495C11.6065 7.94391 11.776 8.35076 11.86 8.86422C11.2276 8.75674 10.5438 8.7237 9.81267 8.76561C7.7532 8.88424 6.42921 10.0854 6.51814 11.7544C6.56326 12.601 6.98502 13.3293 7.70568 13.8051C8.31498 14.2073 9.09973 14.404 9.91532 14.3594C10.9924 14.3004 11.8373 13.8895 12.4268 13.138C12.8745 12.5674 13.1577 11.8279 13.2827 10.8962C13.796 11.206 14.1764 11.6136 14.3865 12.1037C14.7437 12.9367 14.7646 14.3056 13.6476 15.4216C12.669 16.3993 11.4926 16.8222 9.71484 16.8353C7.74278 16.8206 6.25134 16.1882 5.28165 14.9555C4.37362 13.8012 3.90434 12.1339 3.88683 9.99995C3.90434 7.86597 4.37362 6.19869 5.28165 5.04439C6.25134 3.81169 7.74276 3.17925 9.71481 3.1646C11.7012 3.17937 13.2186 3.81484 14.2254 5.0535C14.7191 5.66092 15.0913 6.4248 15.3367 7.31545L16.7327 6.94297C16.4353 5.84668 15.9673 4.902 15.3304 4.11854C14.0397 2.53053 12.152 1.71682 9.71968 1.69995H9.70995C7.2826 1.71676 5.41601 2.53357 4.16204 4.12764C3.04617 5.54617 2.47057 7.51995 2.45123 9.99412L2.45117 9.99995L2.45123 10.0058C2.47057 12.4799 3.04617 14.4538 4.16204 15.8723C5.41601 17.4663 7.2826 18.2832 9.70995 18.3H9.71968C11.8777 18.285 13.3989 17.72 14.652 16.468C16.2915 14.83 16.2421 12.7769 15.7018 11.5165C15.3141 10.6127 14.575 9.87858 13.5643 9.39373Z" />
      </svg>
    );
  } else if (iconName.includes('whatsapp')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.9234 9.63974C17.8487 7.59633 16.9877 5.66079 15.5199 4.23722C14.0521 2.81365 12.0911 2.01212 10.0464 2H10.0078C8.63087 1.99898 7.27744 2.35647 6.08057 3.03729C4.88373 3.71811 3.88476 4.6988 3.18196 5.88287C2.47916 7.06694 2.09675 8.41361 2.07235 9.7903C2.04795 11.167 2.38241 12.5264 3.04282 13.7346L2.34157 17.9308C2.34043 17.9394 2.34113 17.9482 2.34364 17.9565C2.34614 17.9648 2.35039 17.9725 2.3561 17.979C2.3618 17.9856 2.36884 17.9908 2.37673 17.9945C2.38463 17.9981 2.3932 17.9999 2.40188 18H2.41395L6.56432 17.0768C7.63669 17.5916 8.81103 17.8588 10.0006 17.8585C10.0762 17.8585 10.1518 17.8585 10.2274 17.8585C11.2737 17.8286 12.3039 17.5918 13.2582 17.1617C14.2126 16.7316 15.0724 16.1168 15.7879 15.3527C16.5034 14.5886 17.0605 13.6904 17.427 12.7098C17.7935 11.7292 17.9622 10.6858 17.9234 9.63974Z" />
      </svg>
    );
  } else if (iconName.includes('mastodon')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.742 5.889c-.215-1.586-1.612-2.835-3.268-3.078-.28-.04-1.338-.19-3.79-.19h-.019c-2.453 0-2.979.15-3.258.19-1.61.236-3.08 1.359-3.437 2.963-.172.79-.19 1.666-.158 2.47.045 1.152.054 2.302.16 3.45.073.762.2 1.518.382 2.262.339 1.375 1.711 2.52 3.056 2.986a8.283 8.283 0 0 0 4.472.234c.163-.038.325-.081.484-.13.36-.114.783-.241 1.093-.464a.034.034 0 0 0 .014-.027v-1.111a.032.032 0 0 0-.012-.026.033.033 0 0 0-.014-.006.033.033 0 0 0-.014 0 12.52 12.52 0 0 1-2.902.335c-1.682 0-2.134-.79-2.264-1.118a3.433 3.433 0 0 1-.196-.881.032.032 0 0 1 .025-.033.034.034 0 0 1 .015 0 12.25 12.25 0 0 0 2.855.335c.231 0 .462 0 .693-.006.967-.027 1.986-.075 2.938-.26.023-.004.047-.008.067-.014 1.501-.285 2.93-1.18 3.074-3.445.006-.09.02-.935.02-1.027 0-.315.102-2.232-.015-3.41Z" />
      </svg>
    );
  } else if (iconName.includes('reddit')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.024 7.512c-.569 0-1.093.192-1.511.514-1.14-.705-2.577-1.148-4.15-1.207v-.007c0-1.054.783-1.929 1.8-2.073a1.772 1.772 0 1 0-.011-.766 2.86 2.86 0 0 0-2.55 2.84v.01c-1.558.065-2.98.508-4.109 1.208a2.481 2.481 0 1 0-2.57 4.21c.083 2.881 3.222 5.198 7.083 5.198 3.86 0 7.004-2.32 7.082-5.202a2.482 2.482 0 0 0-1.064-4.723v-.002Z" />
      </svg>
    );
  } else if (iconName.includes('telegram')) {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M2.274 9.088c4.677-1.996 7.796-3.312 9.357-3.947 4.455-1.815 5.38-2.13 5.984-2.14.133-.003.43.029.622.182a.657.657 0 0 1 .228.425c.022.123.048.401.027.619-.241 2.484-1.286 8.514-1.818 11.296-.224 1.178-.67 1.43-1.1 1.468-.93.084-1.635-.46-2.537-1.04-1.413-.906-1.932-1.15-3.302-2.034-1.584-1.023-.72-1.558.183-2.476.236-.24 4.37-3.984 4.45-4.316.01-.041-.126-.456-.22-.538-.094-.081-.232-.053-.332-.031-.142.031-2.398 1.492-6.768 4.38-.64.431-1.22.64-1.74.63-.573-.012-1.675-.317-2.494-.578-1.005-.32-1.375-.47-1.306-1.014.036-.283.292-.578.766-.886Z" clipRule="evenodd" />
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


function FooterMenu({ menu, primaryDomainUrl, publicStoreDomain }) {
  return (
    <ul className="footer-links">
      {menu?.items?.map((item) => {
        if (!item.url) {
          console.warn('Menu item missing URL:', item);
          return null;
        }

        let url = item.url;

        // Handle Shopify domain URLs - extract pathname
        if (
          url && (url.includes('myshopify.com') ||
            url.includes(publicStoreDomain) ||
            url.includes(primaryDomainUrl))
        ) {
          try {
            url = new URL(url).pathname;
          } catch (e) {
            console.warn('Failed to parse URL:', item.url, e);
          }
        }

        // Redirect precious metal recycling to the new optimized page
        if (item.title === 'Precious Metal Recycling') {
          url = '/recycling-brilliance';
        }

        if (item.title === 'Carbon Neutral Gemstones') {
          url = '/carbon-neutral';
        }

        // Determine if link is external (doesn't start with /)
        const isExternal = !url.startsWith('/');

        return (
          <li key={item.id}>
            {isExternal ? (
              <Link
                to={url}
                rel="noopener noreferrer"
                target="_blank"
                className="ff-c site-text-color f-11 f-m-11"
              >
                {item.title}
              </Link>
            ) : (
              <NavLink
                to={url}
                className={({ isActive }) =>
                  `ff-c site-text-color f-11 f-m-11 ${isActive ? 'active' : ''}`
                }
              >
                {item.title}
              </NavLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      // Submit to newsletter API endpoint (mimics Shopify Form 834477 behavior)
      const formData = new FormData();
      formData.append('email', email);
      formData.append('acceptsMarketing', 'true');

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage(result.message || 'Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus('error');
      setMessage('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <div className="email-signup-wrapper">
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <div className="email-signup__input-group">
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email address
          </label>
          <input
            id="newsletter-email"
            className="newsletter-input f-m-11 f-11 ff-n"
            type="email"
            name="contact[email]"
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'submitting'}
          />
          <button
            type="submit"
            className="btn btn f-m-12 f-12 ff-n"
            disabled={status === 'submitting' || !email}
          >
            {status === 'submitting' ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </div>
      </form>

      {status === 'error' && message && (
        <div className="email-signup__message email-signup__message--error f-11 ff-n color-red">
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="icon-error">
            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" fill="currentColor" />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {status === 'success' && message && (
        <div className="email-signup__message email-signup__message--success f-11 ff-n color-green">
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="icon-success">
            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z" fill="currentColor" />
          </svg>
          <p className="email-signup__message-text f-11 ff-n">{message}</p>
        </div>
      )}
    </div>
  );
}

export default NewsletterForm;

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
