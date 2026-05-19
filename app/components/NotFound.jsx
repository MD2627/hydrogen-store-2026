import { Link } from 'react-router';
import ringBox from '~/assets/diamond_ring_box.png';
import { UvpIconFooter } from '~/components/UvpIconFooter';

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

export function NotFound() {
    return (
        <>
            <div className="not-found-container page-width">
                <div className="not-found-content">
                    <h1 className="not-found-title">Something is missing...</h1>
                    <p className="not-found-subtitle">Sorry, this page doesn't exist.</p>
                    <p className="not-found-text">
                        Find what you are looking for by clicking the
                        <svg className="not-found-icon" viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" stroke="#222" strokeWidth="1.05831">
                                <circle cx="7.144" cy="7.144" r="4.498" />
                                <path d="m10.583 10.583 3.704 3.704" />
                            </g>
                        </svg>
                        icon.
                    </p>
                    <Link to="/" className="not-found-btn">
                        GO TO THE HOME PAGE
                    </Link>
                </div>
                <div className="not-found-image">
                    <img src={ringBox} alt="Diamond Ring Box" />
                </div>
            </div>
            <UvpIconFooter data={PRODUCT_UVPS} />
        </>
    );
}
