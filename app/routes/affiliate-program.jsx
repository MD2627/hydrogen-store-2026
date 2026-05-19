import styles from '~/styles/affiliate.css?url';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { ProductFAQ } from '~/components/ProductFAQ';
import { UvpIconFooter } from '~/components/UvpIconFooter';

export const meta = () => {
    return [{ title: 'Partner With Diamond' }];
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
    imageSrc: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/d84ed46d-5763-4b3a-aac5-1dbf65f89e7e.jpg?v=1777117759",
    title: "Partner With Diamond",
    subtitle: "Earn commissions by sharing timeless lab-grown diamond jewelry.",
    extraClass: 'affiliate-banner',
};

const CONTENT_DATA = {
    intro: "Partner with Diamond and grow with a modern fine jewelry brand focused on craftsmanship, sustainability, and timeless design. Our affiliate program is built for creators, publishers, influencers, and media partners who want to share premium lab-grown diamond jewelry with their audience while earning competitive commissions.",

    sections: [
        {
            title: "Why Join the Diamond Affiliate Program?",
            list: [
                "Earn competitive commission on every successful referral sale.",
                "Benefit from a generous tracking cookie window for accurate attribution.",
                "Access premium banners, product imagery, and marketing creatives.",
                "Track clicks, sales, and performance with real-time reporting tools.",
                "Receive early access to new collections, campaigns, and exclusive launches."
            ]
        },
        {
            title: "How the Program Works",
            text: "Joining is simple. Promote Diamond through your website, blog, email campaigns, or social media platforms using our affiliate links and creative assets. When your audience makes a purchase through your referral, you earn commission on eligible sales."
        },
        {
            title: "Apply to Become a Partner",
            text: "Click the APPLY NOW button below to submit your application. Our team carefully reviews each submission to ensure the right partnership fit. Once reviewed, we’ll contact you with the next steps and onboarding details."
        }
    ],

    ctaText: "JOIN THE PROGRAM",
    ctaLink: "/",

    contactTitle: "Questions About Our Affiliate Program?",
    contactText: "Our partnership team is here to help. Contact us anytime at:",
};

const FAQ_DATA = [
    {
        question: "What is the Diamond Partner Program?",
        answer: "The Diamond Partner Program is designed for creators, publishers, influencers, and media partners who want to collaborate with a modern fine jewelry brand. Partners can earn commission by sharing Diamond products through their websites, blogs, social platforms, or digital content."
    },
    {
        question: "How do commissions work?",
        answer: "Partners earn commission on eligible sales generated through their unique referral links. Our tracking system records purchases made within the cookie window, helping ensure accurate attribution and transparent performance reporting."
    },
    {
        question: "What benefits do affiliates receive?",
        answer: "As a Diamond partner, you’ll receive:<br/><ul><li>Access to premium marketing creatives and banners.</li><li>Real-time analytics and performance reporting.</li><li>Early access to new launches and campaigns.</li><li>Opportunities for exclusive collaborations and promotions.</li></ul>"
    },
    {
        question: "How can I join the program?",
        answer: "Applying is quick and simple:<br/><ul><li>Click the APPLY NOW button.</li><li>Submit your partnership application.</li><li>Our team will review your details and contact you with the next steps.</li></ul>"
    },
    {
        question: "Who is eligible to apply?",
        answer: "We welcome applications from content creators, bloggers, publishers, influencers, and websites that align with our brand values and audience. We look for partners who share a passion for luxury jewelry, fashion, lifestyle, and modern design."
    },
    {
        question: "Is there a cost to join?",
        answer: "No, joining the Diamond Partner Program is completely free. There are no setup fees or ongoing costs to become an affiliate partner."
    },
    {
        question: "How do I track my performance?",
        answer: "Once approved, you’ll gain access to a dedicated affiliate dashboard where you can monitor clicks, conversions, commissions, and overall campaign performance in real time."
    },
    {
        question: "Who can I contact for support?",
        answer: "If you have any questions about the program or need assistance, feel free to contact our team anytime at <a href='mailto:contact@hopiant.com'>contact@hopiant.com</a>."
    }
];
const AFFILIATE_UVPS = [
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
