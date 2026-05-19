import { useRef } from 'react';
import { Link } from 'react-router';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';

const WARRANTY_UVPS = [
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

export async function loader() {
    return Response.json({});
}

export const meta = () => {
    return [{ title: 'Lifetime Warranty | Diamond Hydrozen' }];
};

export default function Warranty() {
    const wearAndTearImage = null; // Set to image path if available, e.g., "/images/warranty-quality.png"

    return (
        <div className="warranty-page">
            {/* ── BANNER ── */}
            <StoryCraftBanner
                title="Crafted to Last a Lifetime"
                subtitle="Every piece is backed by our lifetime manufacturing warranty and expert craftsmanship."
                h1={true}
            />

            {/* ── INTRO SECTION ── */}
            <section className="warranty-editorial-section">
                <div className="page-width">
                    <div className='warranty-editorial'>
                        <p className="sb-description">
                            At Diamond Jewellery, every piece is created with precision, care, and attention to detail.
                            We focus on combining modern design with expert craftsmanship to deliver jewellery that feels
                            refined, durable, and meaningful. Each item is carefully inspected to ensure it meets our
                            highest quality standards before it reaches you.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── CONSUMER LAW SECTION ── */}
            <section className="warranty-editorial-section bg-light">
                <div className="page-width">
                    <h2 className="section-title">Australian Consumer Law</h2>
                    <div className="warranty-editorial-grid">
                        <div className="warranty-card">
                            <h3 className="warranty-card-title">Minor Problems</h3>
                            <ul className="warranty-card-list">
                                <li>Repair at no cost within a reasonable time.</li>
                                <li>Choice of refund or replacement if not repaired timely.</li>
                                <li>Applies to both products and services.</li>
                            </ul>
                        </div>
                        <div className="warranty-card">
                            <h3 className="warranty-card-title">Major Problems</h3>
                            <ul className="warranty-card-list">
                                <li>Choice of refund or replacement immediately.</li>
                                <li>Compensation for any drop in value if item is kept.</li>
                                <li>Immediate cancellation for services with unused portion refund.</li>
                            </ul>
                        </div>
                        <div className="warranty-card">
                            <h3 className="warranty-card-title">Your Rights</h3>
                            <p className="sb-description" style={{ fontSize: '14px', textAlign: 'left' }}>
                                For more information about your rights, visit the Australian Competition and Consumer
                                Commission website at{' '}
                                <a href="https://www.accc.gov.au" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                                    www.accc.gov.au
                                </a>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── COVERAGE SECTION ── */}
            <section className="warranty-editorial-section">
                <div className="page-width">
                    <h2 className="section-title">Warranty Coverage</h2>
                    <div className="warranty-editorial-grid">
                        <div className="warranty-card">
                            <h3 className="warranty-card-title">Rings</h3>
                            <p className="sb-description" style={{ fontSize: '14px', marginBottom: '15px', textAlign: 'left' }}>
                                <strong>Lifetime Coverage</strong> from the date of receipt on all engagement, wedding, and fashion rings.
                            </p>
                            <ul className="warranty-card-list">
                                <li>Porosity or blemishes in metal</li>
                                <li>Uneven settings</li>
                                <li>Stones chips/scratches at pick-up</li>
                                <li>Rhodium plating stains</li>
                            </ul>
                        </div>
                        <div className="warranty-card">
                            <h3 className="warranty-card-title">Fine Jewellery</h3>
                            <p className="sb-description" style={{ fontSize: '14px', marginBottom: '15px', textAlign: 'left' }}>
                                <strong>2-Year Coverage</strong> on earrings, chains, bracelets, and pendants.
                            </p>
                            <ul className="warranty-card-list">
                                <li>Structural defects</li>
                                <li>Repair or replacement at no cost</li>
                                <li>Assessed individually after 24 months</li>
                            </ul>
                        </div>
                        <div className="warranty-card">
                            <h3 className="warranty-card-title">Gemstones</h3>
                            <p className="sb-description" style={{ fontSize: '14px', marginBottom: '15px', textAlign: 'left' }}>
                                <strong>Lifetime Coverage</strong> on all Lab-Diamonds, Moissanite, and Sapphires.
                            </p>
                            <ul className="warranty-card-list">
                                <li>Covers characteristics selected at sale</li>
                                <li>Excludes wear-and-tear or mishandling</li>
                                <li>Excludes accidental loss or theft</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CLAIM PROCESS ── */}
            <section className="warranty-editorial-section bg-light">
                <div className="page-width">
                    <h2 className="section-title">How to Claim</h2>
                    <div className="process-steps-grid">
                        <div className="process-step">
                            <div className="step-number">01</div>
                            <h4 className="step-title">Contact Us</h4>
                            <p className="sb-description">Complete our contact form to start your claim.</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">02</div>
                            <h4 className="step-title">Assessment</h4>
                            <p className="sb-description">Drop off your item or mail it with original certificates.</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">03</div>
                            <h4 className="step-title">Inspection</h4>
                            <p className="sb-description">Our experts conduct a free structural assessment.</p>
                        </div>
                        <div className="process-step">
                            <div className="step-number">04</div>
                            <h4 className="step-title">Resolution</h4>
                            <p className="sb-description">If covered, we repair or replace at no charge.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WEAR AND TEAR SPLIT ── */}
            <section className="warranty-editorial-section">
                <div className="page-width">
                    <div className={wearAndTearImage ? "wear-tear-split" : "wear-tear-content"}>
                        {wearAndTearImage && (
                            <img
                                src={wearAndTearImage}
                                alt="Quality Control"
                                className="wear-tear-image"
                            />
                        )}
                        <div>
                            <h2 className="section-title">Wear and Tear</h2>
                            <p className="sb-description">
                                Fine jewellery is meant to be worn, but everyday activities can affect its longevity.
                                Our warranty does not cover general wear and tear or accidental damage.
                            </p>
                            <div className="wear-tear-list">
                                <div className="wear-tear-item">
                                    <span className="wear-tear-label">Daily Abrasions</span>
                                    <p className="wear-tear-desc">Dents and scratches on settings over time due to malleability.</p>
                                </div>
                                <div className="wear-tear-item">
                                    <span className="wear-tear-label">Gemstone Impacts</span>
                                    <p className="wear-tear-desc">Chips or cracks from accidental knocks at specific angles.</p>
                                </div>
                                <div className="wear-tear-item">
                                    <span className="wear-tear-label">Chemical Exposure</span>
                                    <p className="wear-tear-desc">Discoloration from chlorine, bleach, or heavy cleaning products.</p>
                                </div>
                                <div className="wear-tear-item">
                                    <span className="wear-tear-label">Jeweller Void</span>
                                    <p className="wear-tear-desc">
                                        Repairs performed by any other jeweller will void your warranty.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── UVP FOOTER ── */}
            <UvpIconFooter data={WARRANTY_UVPS} />
        </div>
    );
}