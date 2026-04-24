import { useRef } from 'react';
import { useLoaderData, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import styles from '~/styles/shipping.css?url';

export const meta = () => {
    return [{ title: 'Shipping' }];
};

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader() {
    return {};
}

export default function Shipping() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (!element) return;

        const headerOffset = window.innerWidth < 768 ? 100 : 160;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    };

    return (
        <div className="shipping-page">
            <StoryCraftBanner
                title="Say Yes To Express"
                subtitle="Enjoy fast and insured shipping on us."
                imageSrc="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Jewellery_London_153_1a_retouched_high_res_2000x2000.jpg?v=1759284667"
                extraClass="shipping-banner"
            />

            <section className="toc-section">
                <div className="page-width">
                    <h2 className="ff-a w-300 black-color txt-center">Table Of Contents</h2>
                    <div className="toc-links">
                        <button onClick={() => scrollToSection('shipping-info')} className="ff-n f-11 w-400 black-color">EXPRESS SHIPPING</button>
                        <button onClick={() => scrollToSection('delivery')} className="ff-n f-11 w-400 black-color">WHEN TO EXPECT DELIVERY</button>
                        <button onClick={() => scrollToSection('safe-hands')} className="ff-n f-11 w-400 black-color">SHIPPING PROVIDERS</button>
                        <button onClick={() => scrollToSection('import-duties')} className="ff-n f-11 w-400 black-color">IMPORT DUTIES AND TAXES</button>
                    </div>
                </div>
            </section>

            <section id="shipping-info" className="shipping-info-section">
                <div className="page-width">
                    <div className="shipping-info-grid">
                        {SHIPPING_INFO_DATA.map((item, index) => (
                            <div key={index} className="shipping-info-card">
                                <h3 className='ff-a f-30 w-300 white-color'>{item.title}</h3>
                                {item.content.map((text, i) => (
                                    <p key={i} className='ff-c f-13 w-300 white-color'>{text}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                    <p className="shipping-info-footer ff-a f-16 w-300 black-color txt-center">
                        Every order is shipped via insured post, ensuring your precious purchase reaches you safely.
                    </p>
                </div>
            </section>

            <section id="delivery" className="delivery-section">
                <div className="delivery-section-wrapper">
                    <h2 className='ff-a w-300 black-color'>When to Expect Delivery</h2>
                    <div className="delivery-grid">
                        {DELIVERY_DATA.map((item, index) => (
                            <div key={index} className="delivery-card">
                                <img src={item.image} alt={item.country} />
                                <h3 className='ff-n f-13 w-400 black-color'>{item.country}</h3>
                                <p className="business-days ff-c f-13 w-600 black-color">{item.days}</p>
                                {item.note && <p className="delay-note ff-c f-13 w-300 black-color">{item.note}</p>}
                            </div>
                        ))}
                    </div>

                    <div className="notes-section">
                        <strong className='ff-c f-13 w-600 black-color'>Please Note:</strong>
                        <ul>
                            {NOTES_DATA.map((note, index) => (
                                <li className='ff-c f-13 w-300 black-color' key={index}>{note}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="showroom-pickup-section">
                <div className="showroom-pickup-wrapper">
                    <h2 className='ff-a w-300 black-color txt-center'>Showroom Pickup</h2>
                    <p className="subtitle ff-c f-13 w-300 black-color txt-center"><em>(after we complete your order)</em></p>
                    <div className="showroom-content">
                        <p className='ff-c f-13 w-300 black-color'>If showroom pick-up is chosen at checkout, please allow a minimum of 2-5 business days in addition to your Completion Date for your order to arrive at your desired showroom (Melbourne excluded).</p>
                        <p className='ff-c f-13 w-300 black-color'>Upon collection, a physical ID (driver&apos;s license or passport) that matches the name on the order or a third-party name that has been authorised is required.</p>
                    </div>
                </div>
            </section>

            <section className="secure-discreet-section">
                <div className="page-width">
                    <h2 className='ff-a w-300 white-color txt-center'>Secure. Discreet.</h2>
                    <div className="secure-grid">
                        {SECURE_DISCREET_DATA.map((item, index) => (
                            <div key={index} className="secure-card">
                                <div className="icon-wrapper" dangerouslySetInnerHTML={{ __html: item.svg }} />
                                <p className='ff-c f-13 w-300 white-color txt-center'>{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="safe-hands" className="safe-hands-section">
                <div className="page-width">
                    <div className="safe-hands-wrapper">
                        <h2 className='ff-a w-300 black-color txt-center'>In Safe Hands</h2>
                        <div className="safe-hands-grid">
                            {SAFE_HANDS_DATA.map((item, index) => (
                                <div key={index} className="safe-hands-card">
                                    <img src={item.image} alt={item.alt} className="shipping-logo placeholder" />
                                    <h3 className='ff-n f-22 w-600 black-color txt-center'>{item.title}</h3>
                                    <p className='ff-a f-16 w-300 black-color txt-center'>{item.subtitle}</p>
                                    {item.note && <p className='ff-a f-16 w-300 black-color note-text txt-center'>{item.note}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="import-duties" className="import-duties-section">
                <div className="page-width">
                    <h2 className='ff-a w-300 black-color'>Import Duties and Taxes</h2>
                    <div className="import-duties-content">
                        <div className="import-duties-text">
                            {IMPORT_DUTIES_INFO.map((item, index) => (
                                <p key={index} className='ff-c f-13 w-300 black-color'>{item}</p>
                            ))}
                        </div>
                        <div className="import-duties-sidebar">
                            <h3 className='ff-n f-13 w-400 black-color'>COVERED COUNTRIES</h3>
                            <div className="country-select-wrapper">
                                <select className="country-select ff-c f-13 w-400" defaultValue="">
                                    <option value="" disabled>Covered Countries</option>
                                    {COVERED_COUNTRIES.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <UvpIconFooter data={PRODUCT_UVPS} />

        </div>
    );
}

const SAFE_HANDS_DATA = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/id_qwRxim4_1764716389404.avif?v=1769688338',
        alt: 'StarTrack',
        title: 'AUSTRALIA',
        subtitle: 'Startrack'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/dhl_logo.avif?v=1769688338',
        alt: 'DHL',
        title: 'USA AND INTERNATIONAL',
        subtitle: 'DHL Express',
        note: 'Note: We cannot ship to PO Boxes'
    }
];

const SECURE_DISCREET_DATA = [
    {
        label: 'Signature on Delivery',
        svg: `<svg id="Signature_on_Delivery" data-name="Signature on Delivery" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs id="defs85112"><style id="style85110"></style></defs><path id="path88092" style="fill:none;stroke:#fff;stroke-width:.2;stroke-linecap:butt;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1" d="m26.325 50.73.882.067m-14.193-2.024c-.376-.977-1.17-1.054-1.853-.78-1.141.46-1.853 2.81-.624 4.604.65.95 1.411 1.175 2.003 1.18 1.884.015 2.59-2.185 2.228-2.179-.3.006.105 1.532 1.385 1.488 1.02-.034 1.437-1.95 1.138-1.943-.432.01.178 1.594.94 1.977 2.182 1.098 4.222-1.958 2.46-4.074-.735 1.58-.47 2.995.27 3.803.561.612 1.534.716 2.192.453 1.808-.722 1.055-4.056.683-4.784-.526.959-.981 4.054 1.128 4.596 1.658.425 2.638-2.643 2.04-2.74-.952-.154-1.228 1.745-.403 2.315.233.16.825.155 1.33-.26.55-.45.667-1.3.81-2.13-.066.59-.195 1.731-.263 2.488.405-1.281.949-2.01 1.488-2.425.158.3.214.52.138 1.176-.139 1.18.7 1.174 1.082.898.599-.433 1.435-1.16 1.931-1.57" class="stroke"></path><path id="path88100" style="opacity:1;fill:none;stroke:#fff;stroke-width:.3;stroke-linejoin:round;stop-color:#000;stop-opacity:1;stroke-dasharray:none" d="M34.433 47.044a.26.26 0 0 1-.261.26.26.26 0 0 1-.26-.26.26.26 0 0 1 .26-.26.26.26 0 0 1 .26.26zm.445-1.251.171 1.186-1.283 1.754-.36-2.177.693-.938m-.89-.236-.788.947s.374 2.69.58 4.095c.041.285.456.52.71.14.758-1.137 2.332-3.36 2.332-3.36l-.341-1.178m8.952-30.451 2.764.699-3.172 12.391M33.01 41.986l4.582 1.164m-.046-18.932 4.582 1.164m.53-13.491.925.237a1.888 1.888 0 0 1 1.36 2.297l-7.986 31.171a.727.727 0 0 1-.885.524l-3.137-.804a.748.748 0 0 1-.539-.91l7.986-31.168a1.87 1.87 0 0 1 2.276-1.347z" class="stroke"></path></svg>`
    },
    {
        label: 'Track Your Parcel',
        svg: `<svg id="Track_your_Parcel" data-name="Track your Parcel" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs id="defs4474"><style id="style4472"></style></defs><path id="path870" style="fill:none;stroke:#fff;stroke-width:.2;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" class="stroke" d="M32.08 26.986v7.968m-8.066-11.48 8.06 3.524 7.994-3.935m-5.666-2.477-7.956 3.948v2.903l2.706 1.313v-3.034l7.853-4.004m-4.98-2.163-8.023 3.931v7.495l8.061 3.984 8.077-3.957v-7.933z"></path><path id="path5162" style="fill:none;stroke:#fff;stroke-width:.3;stroke-linejoin:round;stop-color:#000;stroke-dasharray:none" d="M45.243 25.254c0 3.842-.829 5.673-2.003 7.847-2.074 3.84-7.514 13.94-9.614 17.86-.473.883-1.07 1.151-1.623 1.151-.953 0-1.35-.732-1.56-1.122-2.142-3.986-5.982-11.072-9.15-17.004-2.012-3.768-2.53-5.617-2.53-8.732 0-7.313 5.927-13.24 13.24-13.24 7.312 0 13.24 5.927 13.24 13.24z" class="stroke"></path></svg>`
    },
    {
        label: 'Worldwide Express Shipping',
        svg: `<svg id="Express_Shipping" data-name="Express Shipping" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs id="defs4"><style id="style2"></style></defs><path d="M39.227 32.575h-9.325l-2.12 2.114 6.238 6.22 7.488-6.5-7.488 7.838-7.721-7.699 2.951-2.943h9.094z" fill="#fff" id="path3543" style="fill:none;stroke:#f1f1f1;stroke-width:.2;stroke-linecap:butt;stroke-dasharray:none;stroke-opacity:1" class="stroke"></path><path style="fill:none;stroke:#fbfbfb;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m14.783 49.957 4.797-29.01a1.13 1.13 139.695 0 1 1.115-.945h34.99a1.124 1.124 40.456 0 1 1.11.947l4.634 28.97a.818.818 130.434 0 1-.807.947l-45.037.036a.812.812 49.672 0 1-.802-.945z" id="path1824" class="stroke"></path><path id="path2564" style="fill:none;stroke:#fff;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1" d="M14.926 50.627H1.598m5.146-4.447h-2.16m10.733-.035h-7.44m8.281-4.715h-9.89m48.771 3.849 6.224 5.37m-9.525-30.556L47.474 50.83l7.565-5.552V32.757M34.77 19.91l2.3-6.912c.896-2.697 4.826-2.843 5.72.09l2.11 6.917m-14.282 1.256 2.312-8.236c.765-2.735 4.978-2.883 5.721.09l2.025 8.107" class="stroke"></path><ellipse style="fill:none;stroke:#fff;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:12.56;stroke-opacity:1;stop-color:#000" id="path2618" cx="30.528" cy="22.357" rx="1.001" ry=".98" class="stroke"></ellipse><ellipse style="fill:none;stroke:#fff;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:round;stroke-dasharray:none;stroke-dashoffset:12.56;stroke-opacity:1;stop-color:#000" id="path2620" cx="40.803" cy="22.323" rx="1.025" ry="1.003" class="stroke"></ellipse></svg>`
    },
    {
        label: 'Full Value Insurance',
        svg: `<svg id="Full_Value_Insurance" data-name="Full Value Insurance" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs id="defs88478"><style id="style88476"></style></defs><path id="path89863" style="fill:none;stroke:#fefefe;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="M15.554 34.062V45.31l16.484 6.43m-8.08-26.475-6.435 2.851-3.192 5.461 14.423 5.689 3.223-5.4-14.478-5.7m30.936 5.896V45.31l-16.484 6.43m8.081-26.475 6.435 2.851 3.191 5.461-14.422 5.689-3.224-5.4 14.478-5.7" class="UnoptimicedTransforms stroke"></path><path style="fill:none;stroke:#fff;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-dasharray:none" d="M31.954 33.869v17.864" id="path90594" class="stroke"></path><path d="M36.19 18.536h-7.249l-1.648 1.694 4.85 4.984 5.82-5.209-5.821 6.281-6.002-6.169 2.294-2.358h7.07z" fill="#fff" id="path3543" style="fill:none;stroke:#f1f1f1;stroke-width:.2;stroke-dasharray:none;stroke-opacity:1" class="stroke"></path><path style="fill:none;stroke:#fff;stroke-width:.2;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m32.035 31.222 2.908-2.005c2.322-1.6 3.934-4.749 4.06-7.624l.286-6.525a.208.208 54.5 0 0-.148-.208l-7.07-2.093-7.083 2.09a.24.24 126.665 0 0-.171.231l.025 6.426c.012 2.965 1.814 6.295 4.327 7.89z" id="path18816" class="stroke"></path><path style="fill:none;stroke:#fff;stroke-width:.2;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m32.033 31.899 3.122-2.152c2.492-1.719 4.223-5.098 4.359-8.185l.306-6.998a.23.23 54.5 0 0-.165-.232l-7.583-2.245-7.648 2.257a.196.196 126.665 0 0-.14.189l.027 6.944c.013 3.183 1.947 6.758 4.646 8.47z" id="path18816-2" class="stroke"></path><path id="path20667-6" style="fill:none;stroke:#fff;stroke-width:.2;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="M36.576 17.678c.002-.638.01-1.031-1.001-1.022m1.029 1.022c-.002-.638-.009-1.031 1.001-1.022m-1.029-1.05c.002.637.01 1.03-1.001 1.022m1.029-1.023c-.002.638-.009 1.032 1.001 1.023" class="stroke"></path><path id="path20667-6-2" style="fill:none;stroke:#fff;stroke-width:.2;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="M26.4 18.402c0-.258.003-.417-.405-.413m.416.413c-.001-.258-.004-.417.404-.413m-.416-.424c.001.257.004.416-.404.413m.416-.413c-.001.257-.004.416.404.413" class="stroke"></path><path id="path20667-6-9" style="fill:none;stroke:#fff;stroke-width:.2;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="M30.634 27.138c.001-.378.005-.611-.583-.606m.6.606c-.002-.378-.006-.611.582-.606m-.599-.623c.001.378.005.612-.583.606m.6-.606c-.002.378-.006.612.582.606" class="stroke"></path></svg>`
    },
    {
        label: 'Subtle Packaging',
        svg: `<svg id="Subtle_Packaging-2" data-name="Subtle Packaging" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs id="defs4"><style id="style2"></style></defs><path style="fill:none;stroke:#fff;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-dasharray:none" d="m31.885 11.942-20.842 10.22v19.486l20.94 10.36L52.965 41.72V21.093Z" id="path310" class="stroke"></path><path style="fill:none;stroke:#fff;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-dasharray:none" d="M38.059 14.639 17.39 24.902v7.547l7.032 3.415v-7.888L44.82 17.564" id="path866" class="stroke"></path><path style="fill:none;stroke:#fff;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-dasharray:none" d="m11.072 22.147 20.94 9.162 20.764-10.231" id="path868" class="stroke"></path><path style="fill:none;stroke:#fff;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="M32.029 31.277v20.718" id="path870" class="stroke"></path><path id="path2635" style="fill:none;stroke:#fff;stroke-width:.2;stroke-linejoin:round;stop-color:#000;stroke-dasharray:none" d="M44.493 41.643a1.312 1.902 39.713 0 1-1.58 2.169 1.312 1.902 39.713 0 1-1.58-.99 1.312 1.902 39.713 0 1 1.58-2.17 1.312 1.902 39.713 0 1 1.58.99zm-1.408-1.913c-.818.337-1.489.015-1.518-.876-.023-.72-.026-1.144.003-1.711.04-.777.347-1.16.712-1.322 2.829-1.252 2.45-3.894.88-3.39-1.678.537-1.759 2.811-3.118 3.03-1.736.279-1.158-2.356-.083-3.665 2.16-2.628 5.696-3.877 7.246-1.443 1.116 1.753.16 5.072-2.807 6.919.013 1.293-.59 2.159-1.315 2.458z" class="stroke"></path></svg>`
    }
];

const NOTES_DATA = [
    <>For the most up-to-date information on customs delays, please contact DHL or email us at <a href="mailto:demo@gmail.com">demo@gmail.com</a>.</>,
    "The delivery times are estimates from our shipping partners. Peak periods and unforeseen events may affect these times.",
    "Most jewellery is made to order, typically completed within 50 business days.",
    "For specific products, check their individual pages for estimated completion dates.",
    "We do not currently ship to India, China, Russia, Iran and Ukraine.",
    "International shipping is only available for clients residing outside of Australia."
];

const DELIVERY_DATA = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_AUS.webp?v=1769681040',
        country: 'AUSTRALIA',
        days: '2-5 Business Days',
        note: 'Subject to courier delay'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_NZ.webp?v=1769681133',
        country: 'NEW ZEALAND',
        days: '2-5 Business Days',
        note: 'Subject to customs delay'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_UK.webp?v=1769681133',
        country: 'UNITED KINGDOM',
        days: '7-10 Business Days',
        note: 'Subject to customs delay'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_USA-CANADA.webp?v=1769681133',
        country: 'USA',
        days: '13-15 Business Day',
        note: 'Customs delays currently between 5-7 days'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_USA-CANADA.webp?v=1769681133',
        country: 'CANADA',
        days: '6-10 Business Days',
        note: 'Subject to customs delay'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_ROTW.webp?v=1769681132',
        country: 'REST OF THE WORLD',
        days: '7-10 Business Days',
        note: 'Subject to customs delay'
    }
];

const PRODUCT_UVPS = [
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

const IMPORT_DUTIES_INFO = [
    <>Most of our shipments go out as DDP (Delivery Duty Paid - import customs duties & taxes covered). However, there are some countries that require you, the purchaser/local resident to pay local or personal tax responsibly in your country, which Cullen Jewellery does not cover. This is because the customs department in your country may not allow for the charges imposed to be billed outside of your country. For more information, we recommend checking with your local customs department prior to ordering. Alternatively, you can contact us via our <Link to="/contact">contact form</Link>.</>,
    <><strong className='w-600'>Covered Countries</strong> If your country isn&apos;t listed in the search, you may have to pay local import taxes and duties, which Cullen Jewellery does not cover. For more details please check with your local customs agency.</>,
    <><i>USA Specific</i><br />Additionally, some states in the USA impose a &quot;Use Tax&quot;. If the state you reside in is not listed, Cullen Jewellery does not pay this tax in your state&apos;s jurisdiction, making your order subject to this tax of which your state government may request at any time.</>,
    <>For further information regarding &quot;Use Tax&quot;, we recommend the following resources:<br />
        <a href="https://tax.thomsonreuters.com/blog/sales-tax-vs-use-tax-the-differences/" target="_blank" rel="noopener noreferrer">Thomson Reuters - Sales tax vs. use tax</a><br />
        <a href="https://www.salestaxinstitute.com/sales_tax_faqs/sales-tax-vs-use-tax-guide" target="_blank" rel="noopener noreferrer">Sales Tax Institute - What is the difference between sales tax and use tax?</a></>
];

const COVERED_COUNTRIES = [
    "Afghanistan",
    "Åland Islands",
    "Algeria",
    "Antarctica",
    "Argentina",
    "Aruba",
    "Australia",
    "Austria",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belgium",
    "Belize",
    "Bermuda",
    "Saba",
    "Bouvet Island",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Cambodia",
    "Canada",
    "Cayman Islands",
    "Central African Republic",
    "Chile",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo, Rep. of",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Dominica",
    "Dominican Republic",
    "Egypt",
    "Equatorial Guinea",
    "Eswatini",
    "Finland",
    "France",
    "French Guiana",
    "French Southern Territories",
    "Germany",
    "Grenada",
    "Guadeloupe",
    "Guatemala",
    "Guinea-Bissau",
    "Heard Island and McDonald Islands",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Indonesia",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kiribati",
    "North Korea",
    "South Korea",
    "Kuwait",
    "Laos",
    "Latvia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Malaysia",
    "Malta",
    "Martinique",
    "Mauritius",
    "Mayotte",
    "Micronesia",
    "Monaco",
    "Morocco",
    "Myanmar",
    "Nauru",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Niue",
    "Norfolk Island",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Puerto Rico",
    "Qatar",
    "Romania",
    "Saint Barthélemy",
    "Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovakia",
    "Solomon Islands",
    "Somalia",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Thailand",
    "Tokelau",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "United Arab Emirates",
    "United Kingdom",
    "Uruguay",
    "Venezuela",
    "Vietnam",
    "Wallis and Futuna",
    "Western Sahara"


];

const SHIPPING_INFO_DATA = [
    {
        title: "Australia",
        content: [
            "Free express shipping on all orders.",
            "Pickup is available from our Australian showrooms."
        ]
    },
    {
        title: "International",
        content: [
            "Free express shipping on orders above 400 USD",
            "We cover duties and taxes for most countries, details below.",
            "Pickup is available from our International showrooms.",
            "Please note that our partnered couriers do not ship to PO Box or military addresses. A residential or business address is required for shipping."
        ]
    }
];