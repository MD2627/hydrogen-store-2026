import { useRef } from 'react';
import { Link } from 'react-router';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ContactForm } from '~/components/ContactForm';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import orderStyles from '~/styles/order-status.css?url';

/**
 * @type {Route.LinksFunction}
 */
export const links = () => [
  { rel: 'stylesheet', href: orderStyles },
];

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Order Status | Diamond Jewellery' }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  return Response.json({});
}

export default function OrderStatus() {
  return (
    <div className="order-status">
      <StoryCraftBanner
        imageSrc="https://cdn.shopify.com/s/files/1/0610/2194/5934/files/ee170773-fd1d-46e5-914b-cb643f322eeb.png?v=1779189225"
        title="Order Status"
        subtitle="Get an update on your recent order."
        extraClass="story-craft-banner--order-status"
      />

      <section className="order-status-content-section">
        <div className="page-width">
          <div className="contact-form-title--ring">
            <h2 className="section-title">
              Check Your Order Status
            </h2>
            <p className="sb-description">Fill in your details below and we’ll send you an update on your order within 24 hours.</p>
          </div>
          <ContactForm mode="order-status" />
        </div>
      </section>

      <UvpIconFooter data={ORDER_STATUS_UVPS} />
    </div>
  );
}
const ORDER_STATUS_UVPS = [
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