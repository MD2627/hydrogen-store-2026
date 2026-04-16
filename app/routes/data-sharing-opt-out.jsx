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
    return [{ title: 'Your Privacy Choices | Cullen Jewellery' }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
    return Response.json({});
}

export default function DataSharingOptOut() {
    return (
        <div className="data-sharing-opt-out-page">
            <StoryCraftBanner
                imageSrc="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Sydney_showroom_1300x1300.jpg?v=1740089318"
                title="Your Privacy Choices"
                subtitle="Manage your personal data and privacy settings."
                extraClass="story-craft-banner--privacy"
            />

            <div className="policy">
                <div className="section">
                    <p>
                        At Cullen Jewellery, we respect your privacy and your right to control how your personal data is used.
                        This page allows you to opt out of certain data sharing practices.
                    </p>

                    <h2>Do Not Sell or Share My Personal Information</h2>

                    <p>
                        We may share your personal information with third parties for cross-context behavioural advertising
                        purposes. You have the right to opt out of this sharing.
                    </p>

                    <p>
                        To opt out, please submit your request using the form below or contact us at{' '}
                        <a className="fancy" href="mailto:demo@gmail.com">
                            demo@gmail.com
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
                        <a className="fancy" href="/policies/privacy-policy">
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
        label: 'Worldwide<br>Express Shipping',
        svg: `
      <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16.75H2v-1.5h10v1.5Zm13.074 8.417c-.332.37-.807.583-1.304.583H8.196a1.752 1.752 0 0 1-1.74-1.942l.448-4.058H4v-1.5h4.578l-.63 5.723a.248.248 0 0 0 .248.277H23.77a.247.247 0 0 0 .186-.083.247.247 0 0 0 .062-.194l-1.47-13.223H9.454l-.312 2.827-1.492-.165.46-4.162h3.641v-.92c0-2.344 1.907-4.25 4.25-4.25s4.25 1.906 4.25 4.25v.92h3.642l1.617 14.557Z" fill="#6b6b6b"/>
      </svg>
    `,
    },
    {
        link: '/free-resizing',
        label: 'Free<br>Resizing',
        svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M24.289 18.18c0 5.122-4.167 9.289-9.289 9.289s-9.289-4.167-9.289-9.29a9.286 9.286 0 0 1 5.615-8.533l.593 1.376a7.788 7.788 0 0 0-4.708 7.158c0 4.295 3.495 7.789 7.789 7.789s7.789-3.494 7.789-7.79c0-4.294-3.495-7.788-7.789-7.788-.259 0-.518.018-.768.044l-.367.037-4.585-4.84 2.495-3.382h6.45l2.492 3.377-2.55 2.733-1.097-1.024 1.7-1.82-1.302-1.766h-4.936l-1.3 1.761 3.22 3.4c.181-.013.364-.02.548-.02 5.122 0 9.289 4.167 9.289 9.289ZM11.75 18h-1.5v4.75H15v-1.5h-2.19l5.44-5.44V18h1.5v-4.75H15v1.5h2.19l-5.44 5.44V18Z" fill="#fff"></path></svg>`,
    },
    {
        link: '/warranty',
        label: 'Lifetime Ring<br>Warranty',
        svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 2.587 4.25 8.793v7.362a8.774 8.774 0 0 0 4.375 7.577L15 27.413l6.375-3.68a8.774 8.774 0 0 0 4.375-7.578V8.793L15 2.587Zm9.25 13.568a7.271 7.271 0 0 1-3.625 6.279L15 25.68l-5.625-3.247a7.271 7.271 0 0 1-3.625-6.28V9.66L15 4.32l9.25 5.34v6.495Zm-11.733.268 3.906-3.906a3.516 3.516 0 0 1 4.967 0 3.516 3.516 0 0 1 0 4.966c-.685.685-1.584 1.027-2.484 1.027s-1.799-.342-2.483-1.027l-.572-.571 1.06-1.06.572.57a2.015 2.015 0 0 0 2.846 0 2.014 2.014 0 0 0 0-2.845 2.015 2.015 0 0 0-2.846 0l-3.906 3.906a3.516 3.516 0 0 1-4.967 0 3.516 3.516 0 0 1 0-4.966 3.516 3.516 0 0 1 4.967 0l.589.588-1.061 1.06-.588-.588a2.015 2.015 0 0 0-2.846 0 2.014 2.014 0 0 0 0 2.846 2.015 2.015 0 0 0 2.846 0Z" fill="#fff"></path></svg>`,
    },
    {
        link: '/engagement-rings?metal=yellow_gold',
        label: 'Free Ring<br>Customisation',
        svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="m28.42 9.978-4.77 4.769a4.152 4.152 0 0 1-2.331 1.166l-4.204.6-3.11 3.11-1.06-1.061 3.11-3.11.6-4.203a4.15 4.15 0 0 1 1.166-2.332l4.77-4.77 1.06 1.061-4.77 4.77a2.642 2.642 0 0 0-.741 1.483l-.494 3.46 3.46-.494a2.638 2.638 0 0 0 1.484-.741l4.769-4.769 1.06 1.06ZM8.07 21.118c-2.905 0-5.097-2.256-5.097-5.28 0-3.01 2.213-5.28 5.147-5.28 1.144 0 2.063.238 2.894.749.371.228.734.513 1.14.896l1.028-1.092A8.466 8.466 0 0 0 11.8 10.03c-1.077-.662-2.247-.97-3.68-.97-3.727 0-6.647 2.977-6.647 6.813 0 3.782 2.898 6.746 6.597 6.746 2.586 0 4.076-1.136 5.193-2.247l-1.057-1.063c-1.093 1.086-2.214 1.81-4.136 1.81Zm7.936-.38h4v-1.5h-4v1.5Zm-1.408 1.9 2.828 2.83 1.06-1.061-2.828-2.829-1.06 1.06Z" fill="#fff"></path></svg>`,
    },

];
