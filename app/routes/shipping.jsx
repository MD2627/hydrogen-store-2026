import { useRef } from 'react';
import { useLoaderData, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductFAQ } from '~/components/ProductFAQ';
import styles from '~/styles/shipping.css?url';

export const meta = () => {
    return [{ title: 'Shipping & Delivery | Diamond Jewellery' }];
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

        const headerOffset = window.innerWidth < 768 ? 120 : 160;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    };

    return (
        <div className="shipping-page">
            <StoryCraftBanner
                title="Say Yes To Express"
                subtitle="Fast, secure, and fully insured shipping on all orders."
                imageSrc="https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Jewellery_London_153_1a_retouched_high_res_2000x2000_955a3419-44fe-4982-a8b6-5ca4c5c7dd18.webp?v=1777283263"
                extraClass="shipping-banner"
                h1={true}
            />

            <section className="toc-section">
                <div className="page-width">
                    <div className="toc-links">
                        <button onClick={() => scrollToSection('express-shipping')} className="toc-btn">Express Shipping</button>
                        <button onClick={() => scrollToSection('delivery-times')} className="toc-btn">Delivery Times</button>
                        <button onClick={() => scrollToSection('secure-shipping')} className="toc-btn">Secure & Discreet</button>
                        <button onClick={() => scrollToSection('import-duties')} className="toc-btn">Import Duties</button>
                    </div>
                </div>
            </section>

            <section id="express-shipping" className="shipping-info-section">
                <div className="page-width">
                    <div className="shipping-editorial-split">
                        <div className="shipping-editorial-content">
                            <span className="section-subtitle">Speed & Reliability</span>
                            <h2 className="section-title">Express Shipping</h2>
                            <div className="shipping-editorial-block">
                                <h3 className="ff-a f-24 w-300">Australia</h3>
                                <p className="sb-description">We provide complimentary express shipping on all Australian orders, regardless of value, via StarTrack Express. Showroom pickup is also available in Melbourne, Sydney, Brisbane, and Perth.</p>
                            </div>
                            <div className="shipping-editorial-block">
                                <h3 className="ff-a f-24 w-300">International</h3>
                                <p className="sb-description">Enjoy free express shipping on all international orders exceeding $400 USD via DHL Express, providing real-time tracking and world-class security.</p>
                                <p className="sb-description" >Please note: We require a physical residential or business address; our couriers cannot deliver to PO Box or military addresses.</p>
                            </div>
                            <p className="shipping-info-footer">Every Diamond Jewellery order is shipped in secure, discreet packaging and is fully insured until it reaches your hands.</p>
                        </div>
                        <div className="shipping-editorial-media">
                            <img src="https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Packaging_3_2000x2000_1_dbfdb42c-2374-4b47-ab8e-88fcbd14e412.webp?v=1777283300" alt="Premium Packaging" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="delivery-times" className="delivery-section">
                <div className="page-width">
                    <div className="delivery-header txt-center">
                        <span className="section-subtitle">Timelines</span>
                        <h2 className="section-title">When to Expect Delivery</h2>
                        <p className="sb-description">Estimated transit times after your piece has been meticulously crafted.</p>
                    </div>

                    <div className="delivery-list-container">
                        {DELIVERY_DATA.map((item, index) => (
                            <div key={index} className="delivery-list-item">
                                <div className="delivery-list-country">
                                    <img src={item.image} alt={item.country} className="delivery-flag" />
                                    <span className="ff-a f-20 w-300">{item.country}</span>
                                </div>
                                <div className="delivery-list-details">
                                    <span className="ff-n f-13 w-600 l-0">{item.days}</span>
                                    {item.note && <span className="ff-c f-12 w-300 accent-color">{item.note}</span>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="delivery-notes-premium">
                        <h4 className="ff-n f-11 w-600 text-uppercase">Important Notes</h4>
                        <p className="sb-description">Completion times for made-to-order pieces are typically 50 business days. Transit times are estimates provided by our couriers. For showroom pickup, please allow 2-5 business days for secure transit to your selected location. International shipping is reserved for clients residing outside of Australia.</p>
                    </div>
                </div>
            </section>

            <section id="secure-shipping" className="secure-discreet-section">
                <div className="secure-bg-image" style={{ backgroundImage: 'url("https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Jewellery_London_153_1a_retouched_high_res_2000x2000_955a3419-44fe-4982-a8b6-5ca4c5c7dd18.webp?v=1777283263")' }}>
                    <div className="secure-overlay"></div>
                    <div className="page-width secure-content">
                        <div className="txt-center">
                            <span className="section-subtitle white-color">Peace of Mind</span>
                            <h2 className="section-title white-color">Secure & Discreet</h2>
                        </div>

                        <div className="secure-premium-grid">
                            {SECURE_DISCREET_DATA.map((item, index) => (
                                <div key={index} className="secure-premium-card">
                                    <div className="icon-wrapper" dangerouslySetInnerHTML={{ __html: item.svg }} />
                                    <p className="ff-a f-18 w-300 white-color">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="safe-hands-section">
                <div className="page-width">
                    <div className="safe-hands-inner">
                        <div className="safe-hands-text">
                            <span className="section-subtitle">Our Partners</span>
                            <h2 className="section-title">In Safe Hands</h2>
                            <p className="sb-description">We partner with the world's most trusted couriers to ensure your precious cargo arrives flawlessly and securely.</p>
                        </div>
                        <div className="safe-hands-logos">
                            <div className="partner-logo">
                                <img src="https://cdn.shopify.com/s/files/1/0801/7317/0906/files/id_qwRxim4_1764716389404.avif?v=1769688338" alt="StarTrack" />
                            </div>
                            <div className="partner-logo">
                                <img src="https://cdn.shopify.com/s/files/1/0801/7317/0906/files/dhl_logo.avif?v=1769688338" alt="DHL" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="import-duties" className="import-duties-section">
                <div className="page-width">
                    <div className="duties-editorial-wrapper">
                        <div className="duties-editorial-text">
                            <span className="section-subtitle">International Orders</span>
                            <h2 className="section-title">Import Duties & Taxes</h2>
                            <p className="sb-description">Most of our international shipments are sent via DDP (Delivery Duty Paid), meaning import customs duties and taxes are covered by Diamond Jewellery.</p>
                            <p className="sb-description">However, certain countries require the purchaser to pay local or personal taxes directly due to local customs regulations that do not allow for third-party billing.</p>
                            <p className="sb-description">If your country is not listed in our covered database, you may be responsible for local import taxes and duties. We recommend verifying with your local customs department prior to finalizing your order.</p>
                        </div>
                        <div className="duties-editorial-box">
                            <h3 className="ff-a f-24 w-300">Covered Countries</h3>
                            <p className="sb-description" style={{ marginBottom: '20px' }}>Select a country to verify coverage:</p>
                            <div className="custom-select-wrapper">
                                <select className="premium-select" defaultValue="">
                                    <option value="" disabled>Search Covered Countries</option>
                                    {COVERED_COUNTRIES.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProductFAQ
                data={SHIPPING_FAQ}
                title="Shipping FAQ"
                subtitle="Common questions about delivery and transit."
            />

            <UvpIconFooter data={PRODUCT_UVPS} />
        </div>
    );
}

const DELIVERY_DATA = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_AUS.webp?v=1769681040',
        country: 'AUSTRALIA',
        days: '2-5 Business Days',
        note: 'Insured Express Shipping'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_NZ.webp?v=1769681133',
        country: 'NEW ZEALAND',
        days: '2-5 Business Days',
        note: 'DHL Express'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_UK.webp?v=1769681133',
        country: 'UNITED KINGDOM',
        days: '7-10 Business Days',
        note: 'DDP Shipping Available'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_USA-CANADA.webp?v=1769681133',
        country: 'USA',
        days: '13-15 Business Days',
        note: 'DHL Express Secure'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_USA-CANADA.webp?v=1769681133',
        country: 'CANADA',
        days: '6-10 Business Days',
        note: 'Customs Tracking Included'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/New_Shipping_Icons_ROTW.webp?v=1769681132',
        country: 'REST OF WORLD',
        days: '7-14 Business Days',
        note: 'DHL Express Global'
    }
];

const SECURE_DISCREET_DATA = [
    {
        label: 'Signature on Delivery',
        svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 50l10 5 30-30-10-5-30 30zM40 20l5-5 5 5-5 5-5-5zM10 50l5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
        label: 'Real-Time Tracking',
        svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="32" cy="32" r="28" /><path d="M32 12v20l12 12" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
        label: 'Global Express',
        svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 32h44M42 20l12 12-12 12" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
        label: 'Full Value Insurance',
        svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M32 4l20 10v24c0 12-20 22-20 22S12 50 12 38V14L32 4z" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    }
];

const SHIPPING_FAQ = [
    {
        question: "What are the shipping costs?",
        answer: "We offer complimentary express shipping on all orders within Australia. For international orders, shipping is free on purchases over $400 USD. Orders below this amount will have shipping calculated at checkout."
    },
    {
        question: "Is my order insured during delivery?",
        answer: "Yes, all shipments are fully insured for their full value until they are safely delivered and signed for. Your purchase is protected every step of the way."
    },
    {
        question: "Will my package arrive discreetly?",
        answer: "Yes, all orders are shipped in plain, unbranded packaging to ensure complete discretion and keep your purchase a surprise."
    },
    {
        question: "Is a signature required on delivery?",
        answer: "Yes, an adult signature is required upon delivery for security purposes. We’re unable to leave parcels unattended or deliver to PO Boxes."
    }
];

const PRODUCT_UVPS = [
    {
        link: '/shipping',
        label: 'Global Insured<br>Delivery',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>`,
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

const COVERED_COUNTRIES = [
    "Australia", "New Zealand", "United Kingdom", "United States", "Canada", "Singapore", "Hong Kong", "Germany", "France", "Ireland", "United Arab Emirates", "Switzerland", "Norway", "Sweden", "Denmark", "Netherlands", "Belgium", "Japan", "South Korea", "Israel", "Italy", "Spain", "Portugal", "Austria", "Finland", "Taiwan", "Malaysia", "Thailand", "Vietnam"
];