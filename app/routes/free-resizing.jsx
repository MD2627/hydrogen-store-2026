import { useRef } from 'react';
import { Link } from 'react-router';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader() {
    return {};
}

export default function FreeResizing() {
    return (
        <div className="free-resizing-page">
            <StoryCraftBanner
                title="Free Resizing"
                description="We want your ring to fit perfectly. Discover our complimentary resizing service for your peace of mind."
                imageSrc="https://cdn.shopify.com/s/files/1/0610/2194/5934/files/pexels-shkrabaanthony-7167043.jpg?v=1778041592"
            />

            {/* Intro & Highlights Grid */}
            <section className="fr-editorial-section bg-light">
                <div className="page-width">
                    <div className="fr-intro-text">
                        <h2 className="section-title">The Perfect Fit</h2>
                        <p className="sb-description">
                            At Diamond Jewellery, we understand that getting the ring size exactly right can sometimes be tricky. That's why we offer a complimentary resizing service to ensure your piece feels as perfect as it looks.
                        </p>
                    </div>

                    <div className="fr-editorial-grid">
                        <div className="fr-card">
                            <h3 className="fr-card-title">Engagement & Wedding</h3>
                            <ul className="fr-card-list">
                                <li><strong>One Free Resize</strong> valid within 12 months of your ring's completion date.</li>
                                <li>Subject to eligible design style and metal type.</li>
                                <li>Check the specific product page for the exact resize range available for your ring.</li>
                            </ul>
                        </div>

                        <div className="fr-card">
                            <h3 className="fr-card-title">Ready-To-Ship</h3>
                            <ul className="fr-card-list">
                                <li><strong>One Free Resize</strong> within 12 months.</li>
                                <li>If already resized from stock size (typically M 1/2), further resizing requires assessment.</li>
                                <li className="bold-text">We recommend checking your size in-store before the initial resize.</li>
                            </ul>
                        </div>

                        <div className="fr-card">
                            <h3 className="fr-card-title">Men's Wedding Bands</h3>
                            <ul className="fr-card-list">
                                <li>One free-size replacement (excluding custom designs).</li>
                                <li>Original engraving is included in the one-time replacement.</li>
                                <li>Original ring must be returned to fulfill the replacement.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Split Section: Details & Rules */}
            <section className="fr-editorial-section">
                <div className="page-width">
                    <div className="fr-split-section">
                        <div className="fr-split-image-container">
                            <img src="https://cdn.shopify.com/s/files/1/0610/2194/5934/files/507e9024c74bdddeaca1633e5768549b.jpg?v=1778130449" alt="Jewelry Resizing Workshop" className="fr-split-image" />
                        </div>

                        <div className="fr-split-content">
                            <div className="fr-list-section">
                                <h3 className="fr-list-title">Eligible Ring Resizing</h3>
                                <p className="sb-description">Most engagement rings crafted in platinum, white gold, yellow gold, and rose gold can be professionally resized within the following recommended ranges:</p>
                                <ul className="fr-card-list">
                                    <li><strong>Classic Plain Bands:</strong> Can typically be resized multiple sizes up or down.</li>
                                    <li><strong>Pavé Bands:</strong> Limited resizing is available to maintain stone security and design integrity.</li>
                                    <li><strong>Detailed Designer Bands:</strong> May allow only minimal resizing depending on the setting style.</li>
                                </ul>
                            </div>

                            <div className="fr-list-section">
                                <h3 className="fr-list-title">Non-Resizable Ring Styles</h3>
                                <ul className="fr-card-list">
                                    <li>Full eternity or full pavé bands</li>
                                    <li>Open band ring designs</li>
                                    <li>Alternative metal styles</li>
                                    <li>Certain custom or intricate settings</li>
                                </ul>
                            </div>

                            <div className="fr-list-section">
                                <h3 className="fr-list-title">Additional Resizing Information</h3>
                                <ul className="fr-card-list">
                                    <li><strong>Custom Designs:</strong> Some handcrafted rings may require a workshop assessment before resizing.</li>
                                    <li><strong>Stone Settings:</strong> Certain setting styles require extra care to preserve structure and diamond security.</li>
                                    <li><strong>Expert Craftsmanship:</strong> All resizing work is completed by experienced jewellers to ensure quality and comfort.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Request */}
            <section className="fr-editorial-section bg-light">
                <div className="page-width">
                    <h2 className="section-title text-center">How Ring Resizing Works</h2>
                    <p className="sb-description fr-centered-desc">
                        We make the resizing process simple and stress-free. Our expert jewellers carefully adjust your ring to ensure the perfect fit while maintaining its beauty and craftsmanship.
                    </p>

                    <div className="fr-steps-grid">
                        <div className="fr-step">
                            <div className="fr-step-number">01</div>
                            <h3 className="fr-step-title">Visit Our Showroom</h3>
                            <p className="sb-description">
                                Book an appointment with our team for a professional ring sizing consultation and in-person assessment by our jewellery specialists.
                            </p>
                            <div className="fr-step-action">
                                <Link to="/visit" className="btn">
                                    Book Appointment
                                </Link>
                            </div>
                        </div>

                        <div className="fr-step">
                            <div className="fr-step-number">02</div>
                            <h3 className="fr-step-title">Send Your Ring Securely</h3>
                            <p className="sb-description">
                                If you're unable to visit in person, contact our support team to arrange a secure resize request and workshop return process for your ring.
                            </p>
                            <div className="fr-step-action">
                                <Link to="/contact" className="btn">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Terms and Conditions */}
            <section className="fr-editorial-section">
                <div className="page-width">
                    <h2 className="section-title text-center">Resizing Policy & Information</h2>
                    <div className="fr-terms-container">
                        <ul className="fr-card-list">
                            <li>Eligible rings may qualify for complimentary resizing within the specified resizing period.</li>
                            <li>Please ensure your ring is returned securely and within the recommended timeframe provided by our team.</li>
                            <li>Certain ring styles or sizing requests may require additional workshop assessment or reconstruction.</li>
                            <li>Work completed by unauthorized jewellers may affect your manufacturing warranty coverage.</li>
                            <li>Additional resizing requests outside the complimentary period may incur a service fee.</li>
                            <li>If engraving adjustments are required during resizing, our jewellers will carefully restore the design whenever possible.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <UvpIconFooter data={OUR_STORY_UVPS} />
        </div>
    );
}

const OUR_STORY_UVPS = [
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