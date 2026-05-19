import { useRef } from 'react';
import { Link } from 'react-router';
import { UvpIconFooter } from '~/components/UvpIconFooter';

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader() {
    throw new Response("Not Found", { status: 404 });
    return {};
}

export default function Warranty() {
    return (
        <>
            <div className="warranty-page crafting-timeframes">
                <h2 className='main-warranty-title'>
                    <p>Diamond Jewellery Crafting Timeframes</p>
                    <div className="description">Last updated: February 26, 2025</div>
                </h2>
                <div className="description-container-line">
                </div>
                <div className="warranty-content-inner">
                    <div className="section">

                        <p>
                            Please always refer to the completion date listed on the product page for the most accurate
                            completion date.
                        </p>

                        <h2>Made to Order Rings</h2>

                        <p className="p-is-bold"><b>Women’s Engagement Ring &amp; Wedding Rings</b></p>
                        <ul>
                            <li>Standard Crafting: 50 business days</li>
                            <li>Expedited: 30 &amp; 40 business days</li>
                        </ul>

                        <p className="p-is-bold"><b>Men’s Wedding Rings</b></p>
                        <ul>
                            <li>Standard: 25 business days</li>
                            <li>Custom: 40 business days</li>
                        </ul>

                        <h2>Ready to Ship Rings</h2>
                        <ul>
                            <li>Resize Required: 7 business days</li>
                            <li>No Resize Required: 5 business days</li>
                        </ul>

                        <h2>End-of-Year Timeframes</h2>
                        <ul>
                            <li>
                                Typically between October and February our crafting timeframe increases by 10 business
                                days.
                            </li>
                        </ul>

                        <h2>Expedited Orders</h2>

                        <p className="p-is-bold"><b>What can be expedited?</b></p>
                        <ul>
                            <li>
                                Women's Wedding Rings can be expedited; however, some complex styles cannot. If the
                                expediting option is available, it will be shown on the product page.
                            </li>
                            <li>
                                Engagement rings can be expedited, however, some complex styles cannot be expedited.
                                If the expediting option is available, it will be shown on the product page.
                            </li>
                            <li>
                                We cannot expedite existing designs with variations unless approved by our team. If you
                                would like to add expediting to one of our own designs with slight variations, such as
                                bandwidth, pave, added hidden halo, etc., then we must check this first.
                            </li>
                        </ul>

                        <p className="p-is-bold"><b>What cannot be expedited?</b></p>
                        <ul>
                            <li>Men's wedding bands.</li>
                            <li>Custom rings cannot be expedited.</li>
                        </ul>

                        <h2>Contact Us</h2>
                        <p>If you have any questions about our Crafting Timeframes, you can contact us:</p>
                        <ul>
                            <li>
                                By email:{' '}
                                <a className="fancy" href="mailto:contact@hopiant.com">
                                    contact@hopiant.com
                                </a>
                            </li>
                        </ul>

                    </div>

                </div>



                <UvpIconFooter data={OUR_WARRANTY_UVPS} />
            </div>
        </>
    );
}

const OUR_WARRANTY_UVPS = [
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