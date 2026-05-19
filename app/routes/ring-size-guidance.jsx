import { SplitBanner } from '~/components/SplitBanner';

import { RingBanner } from '~/components/RingBanner';
import { ExpertGuidance } from '~/components/ExpertGuidance';
import { ProductFAQ } from '~/components/ProductFAQ';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { RingSizeConverter } from '~/components/RingSizeConverter';

export const meta = () => {
    return [{ title: 'Ring Size Guidance' }];
};


/**
 * @param {Route.LoaderArgs} args
 */
export async function loader() {
    return {};
}

export default function RingSizeGuidance() {
    return (
        <div className="ring-size-guidance-page">
            <section className="guidance-hero-section">
                <SplitBanner
                    left={{
                        image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/pexels-ayseguldelice-30720972.jpg?v=1777030343",
                        title: "",
                        description: "",
                    }}
                    right={{
                        title: "Complimentary Ring Resizing",
                        afterTitle: <div className="border-line"></div>,
                        description: "At Diamond, every detail matters—especially the perfect fit.",
                    }}
                />
            </section>
            <RingSizeConverter />
            <div className="guidance-resizing-section">
                <SplitBanner
                    left={{
                        title: "Complimentary Ring Resizing",
                        afterTitle: <div className="border-line"></div>,
                        description: "Enjoy one free resize within 12 months of your ring’s completion, ensuring the perfect fit (eligibility depends on design and metal type).",
                    }}
                    right={{
                        image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/pexels-shkrabaanthony-7167043.jpg?v=1778041592",
                        title: "",
                        description: "",
                    }}
                />
            </div>
            <RingBanner
                image={GUIDANCE_BANNER_DATA.image}
                mobileImage={GUIDANCE_BANNER_DATA.mobileImage}
                title={GUIDANCE_BANNER_DATA.title}
                subtitle={GUIDANCE_BANNER_DATA.subtitle}
                buttonText={GUIDANCE_BANNER_DATA.buttonText}
                buttonLink={GUIDANCE_BANNER_DATA.buttonLink}
            />
            <ExpertGuidance articles={EXPERT_GUIDANCE_ARTICLES} />
            <div className="ring-size-guidance-faqs">
                <ProductFAQ data={FAQ_DATA} title="FAQs" />
            </div>
            <UvpIconFooter data={OUR_STORY_UVPS} />

        </div>
    );
}

const GUIDANCE_BANNER_DATA = {
    title: 'Looking for the perfect ring?',
    subtitle: 'Visit our showroom for personalized assistance or book a virtual appointment from the comfort of your home.',
    image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_n7n7zbn7n7zbn7n7-clean.png?v=1777641165',
    mobileImage: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_n7n7zbn7n7zbn7n7-clean.png?v=1777641165',
    buttonLink: '/visit',
    buttonText: 'BOOK APPOINTMENT',
};

const EXPERT_GUIDANCE_ARTICLES = [
    {
        title: "Understanding Ring Size Measurements",
        link: "/education/engagement-ring-guidance/how-much-does-it-cost-to-make-a-custom-engagement-ring",
        image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_3c1z0b3c1z0b3c1z.png?v=1777870635"
    },
    {
        title: "Simple Ways to Measure Ring Size at Home",
        link: "/education/wedding-band-guidance/men-s-wedding-band-customisation",
        image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/5d7c5206a7907d6fa7b22ec0ca83d0a8.jpg?v=1777870936"
    },
    {
        title: "Your Guide to Finding the Perfect Ring Size",
        link: "/education/engagement-ring-guidance/custom-engagement-ring-process",
        image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/3c973afef6e4c2611322622fcd3a3555.jpg?v=1777870175"
    }
];

const FAQ_DATA = [
    {
        question: "Do you offer free ring resizing?",
        answer: "Yes, we provide <strong>one complimentary resize</strong> for all engagement and wedding rings within 12 months of completion (subject to design and metal type eligibility). Visit our <a href='/free-resizing'>resizing page</a> for full details.",
    },
    {
        question: "How long does resizing take?",
        answer: "Ring resizing typically takes a few business days, depending on the design and required adjustment. Our team ensures every piece is carefully resized, polished, and returned in perfect condition.",
    },
    {
        question: "Can I visit your showroom for assistance?",
        answer: "Absolutely. Our experts are happy to assist with sizing, styling, and design guidance. Book an appointment to <a href='/visit'>visit our showroom</a> for a personalized experience.",
    },
    {
        question: "Are your diamonds and gemstones ethically sourced?",
        answer: "Yes, all our diamonds and gemstones are responsibly sourced. We also offer lab-grown options that are both ethical and environmentally conscious.",
    },
    {
        question: "Can I customize or design my own ring?",
        answer: "Yes, we specialize in custom designs. Whether you have a specific vision or need guidance, our team will work with you to create a one-of-a-kind piece. Learn more about our <a href='/custom-rings'>custom design service</a>.",
    }
];

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