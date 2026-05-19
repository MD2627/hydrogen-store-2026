import { UvpIconFooter } from '~/components/UvpIconFooter';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import policyStyles from '~/styles/policies.css?url';

/**
 * @type {Route.LinksFunction}
 */
export const links = () => [
    { rel: 'stylesheet', href: policyStyles },
];

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
    return [{ title: 'Your Privacy Choices | Diamond Jewellery' }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
    throw new Response("Not Found", { status: 404 });
    return Response.json({});
}

export default function DataSharingOptOut() {
    return (
        <div className="data-sharing-opt-out-page">
            <StoryCraftBanner
                imageSrc="https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Sydney_showroom_1300x1300_46489608-60e2-4ef8-b22c-412661a327d0.webp?v=1777281122"
                title="Your Privacy Choices"
                subtitle="Manage your personal data and privacy settings."
                extraClass="story-craft-banner--privacy"
            />

            <div className="policy">
                <div className="section">
                    <p>
                        At Diamond Jewellery, we respect your privacy and your right to control how your personal data is used.
                        This page allows you to opt out of certain data sharing practices.
                    </p>

                    <h2>Do Not Sell or Share My Personal Information</h2>

                    <p>
                        We may share your personal information with third parties for cross-context behavioural advertising
                        purposes. You have the right to opt out of this sharing.
                    </p>

                    <p>
                        To opt out, please submit your request using the form below or contact us at{' '}
                        <a className="fancy" href="mailto:contact@hopiant.com">
                            contact@hopiant.com
                        </a>
                        .
                    </p>

                    <h2>What Data We Share</h2>

                    <p>We may share the following categories of personal information with third parties:</p>

                    <ul>
                        <li>Identifiers (such as name, email address, IP address)</li>
                        <li>Commercial information (such as products purchased or considered)</li>
                        <li>Internet or other electronic network activity information (such as browsing history on our website)</li>
                    </ul>

                    <h2>How to Submit a Request</h2>

                    <p>
                        To exercise your opt-out rights, please{' '}
                        <a className="fancy" href="/contact">
                            contact us
                        </a>{' '}
                        with the subject line "Data Sharing Opt-Out Request" and include your name and email address.
                        We will process your request within 15 business days.
                    </p>

                    <h2>Additional Privacy Rights</h2>

                    <p>
                        Depending on where you live, you may have additional privacy rights. Please review our{' '}
                        <a className="fancy" href="/policies">
                            Privacy Policy
                        </a>{' '}
                        for full details on your rights and how we handle your personal data.
                    </p>
                </div>
            </div>

            <UvpIconFooter data={PRIVACY_UVPS} />
        </div>
    );
}

const PRIVACY_UVPS = [
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
