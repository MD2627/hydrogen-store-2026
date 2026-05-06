import styles from '~/styles/affiliate.css?url';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { ProductFAQ } from '~/components/ProductFAQ';
import { UvpIconFooter } from '~/components/UvpIconFooter';

export const meta = () => {
    return [{ title: 'Join Our Diamond Affiliate Program' }];
};

export async function loader() {
    return Response.json({});
}

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}


export default function AffiliatePage() {
    return (
        <div className="affiliate-page">
            <StoryCraftBanner
                imageSrc={BANNER_DATA.imageSrc}
                title={BANNER_DATA.title}
                subtitle={BANNER_DATA.subtitle}
                extraClass={BANNER_DATA.extraClass}
            />
            <section className="affiliate-content-section">
                <div className="page-width">
                    <div className="affiliate-intro">
                        <p className='ff-a f-32 w-300 black-color'>{CONTENT_DATA.intro}</p>
                    </div>

                    <div className="affiliate-details">
                        {CONTENT_DATA.sections.map((section, index) => (
                            <div key={index} className="affiliate-detail-block">
                                <h3 className='ff-c f-13 w-600 black-color'>{section.title}</h3>
                                {section.list ? (
                                    <ul>
                                        {section.list.map((item, i) => (
                                            <li key={i} className='ff-c f-13 w-300 black-color'>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className='ff-c f-13 w-300 black-color'>{section.text}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="affiliate-cta">
                        <a href={CONTENT_DATA.ctaLink} className="btn ff-n f-11 w-600">{CONTENT_DATA.ctaText}</a>
                    </div>

                    <div className="affiliate-contact">
                        <h4 className='ff-c f-13 w-600 black-color'>{CONTENT_DATA.contactTitle}</h4>
                        <p className='ff-c f-13 w-300 black-color'>{CONTENT_DATA.contactText} <a href={`mailto:${CONTENT_DATA.email}`}>{CONTENT_DATA.email}</a></p>
                    </div>
                </div>
            </section>

            <ProductFAQ data={FAQ_DATA} title="FAQ" subtitle="Your questions, answered." />
            <UvpIconFooter data={AFFILIATE_UVPS} />
        </div >
    );
}

const BANNER_DATA = {
    imageSrc: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Bella_Side_1_2000x2000_4c03ff88-bfeb-4388-97d8-8a90228590b2.webp?v=1769843716",
    title: "Join Our Diamond Affiliate Program",
    subtitle: "We believe in great partnerships.",
    extraClass: 'affiliate-banner',
};

const CONTENT_DATA = {
    intro: "At Diamond, collaboration is part of everything we do. Now, we’re inviting you to be part of it. If you’re a premium lifestyle, fashion publisher or creator, our affiliate program offers a simple way to earn commission when your audience purchases from Diamond.",
    sections: [
        {
            title: "What’s in it for you?",
            list: [
                "Competitive 6% commission on all net sales (excluding shipping, taxes, and returns).",
                "A 30-day cookie window for comprehensive sales tracking.",
                "Instant access to premium creative assets and brand collateral.",
                "Real-time reporting and performance insights via our partner dashboard.",
                "Priority notifications for upcoming capsule collections and product launches."
            ]
        },
        {
            title: "How do you get started as a Diamond affiliate?",
            text: "All you have to do is help us out by placing our ads, banners, and links on your site and social media accounts and promoting us in accordance with our Terms and Conditions."
        },
        {
            title: "How do you apply?",
            text: "Simply click the APPLY NOW button below. We’ll review your application to ensure it’s a good fit for both parties and then we’ll notify you of the outcome, regardless of the result."
        }
    ],
    ctaText: "APPLY NOW",
    ctaLink: "/",
    contactTitle: "Have questions about the program?",
    contactText: "Send an email to:",
    email: "affiliates@hopiant.com"
};

const FAQ_DATA = [
    {
        question: "What is the Diamond Affiliate Program?",
        answer: "The Diamond Affiliate Program is created for lifestyle, fashion, and premium content creators who want to earn commission by promoting fine jewellery. As an affiliate, you’ll earn commission on sales generated through your unique links and gain access to exclusive creatives, campaigns, and collaboration opportunities."
    },
    {
        question: "How much commission can I earn?",
        answer: "Affiliates earn a competitive commission of 6% on net sales (excluding shipping, taxes, and returns). Commissions are tracked for up to 30 days from the moment a customer clicks your unique link."
    },
    {
        question: "What support and resources will I receive?",
        answer: "As a Diamond affiliate, you’ll get:<br/><ul><li>Professionally designed banners and campaign assets.</li><li>Access to real-time performance tracking and reporting.</li><li>Opportunities for collaborations such as giveaways, events, and special campaigns.</li></ul>"
    },
    {
        question: "How do I apply?",
        answer: "Getting started is simple:<br/><ul><li>Click on APPLY NOW and submit your application.</li><li>Our team will review your details.</li><li>You’ll receive an email with the outcome of your application.</li></ul>"
    },
    {
        question: "Who can I contact for support?",
        answer: "For any questions or assistance, feel free to contact us at <a href='mailto:contact@hopiant.com'>contact@hopiant.com</a> and our team will be happy to help."
    }
];

const AFFILIATE_UVPS = [
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
