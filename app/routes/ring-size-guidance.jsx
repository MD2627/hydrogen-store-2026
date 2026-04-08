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
                        image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/ring-size-guide-banner_1200x1200_6db0cd84-3a6d-4bfd-a67e-b7f9962d2da0.webp?v=1769764152",
                        title: "",
                        description: "",
                    }}
                    right={{
                        title: "Find the Perfect Size",
                        afterTitle: <div className="border-line"></div>,
                        description: "Here at Cullen, we endeavour to ensure your ring is a perfect fit.",
                    }}
                />
            </section>
            <RingSizeConverter />
            <section className="guidance-resizing-section">
                <SplitBanner
                    left={{
                        title: "Free Ring Resizing",
                        afterTitle: <div className="border-line"></div>,
                        description: "At Cullen, we offer One Free Resize for engagement and wedding rings to use within the first 12 months of your ring’s completion (subject to eligibility based on design style and metal type).",
                    }}
                    right={{
                        image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/ring-size-guide-resizing_2400x2400_fa3ad846-f0a0-44bf-980e-06fef29a9266.webp?v=1769767867",
                        title: "",
                        description: "",
                    }}
                />
            </section>
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
    title: 'Need help finding the perfect ring?',
    subtitle: 'Book a time to visit our showroom to get assisted or book a virtual appointment no matter where you are!',
    image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_0378-2_jpg_2000x2000_331c0df2-17e7-4119-9975-3a252a19c8f7.png?v=1769249858',
    mobileImage: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_0378-2_jpg_2000x2000_331c0df2-17e7-4119-9975-3a252a19c8f7.png?v=1769249858',
    buttonLink: '/visit',
    buttonText: 'BOOK APPOINTMENT',
};

const EXPERT_GUIDANCE_ARTICLES = [
    {
        title: "Decoding Ring Size Charts",
        link: "/education/engagement-ring-guidance/how-much-does-it-cost-to-make-a-custom-engagement-ring",
        image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/ring-size-guide-decoding_ring_size_900x900_0ef37213-1c1a-4e59-a618-bea10c74e0c1.webp?v=1769774856"
    },
    {
        title: "How to Find Out Your Ring Size at Home",
        link: "/education/wedding-band-guidance/men-s-wedding-band-customisation",
        image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/ring-size-guide-find_your_ring_size_home_900x900_b7e2544d-0bcb-4a4b-80ab-e72e454e42b5.webp?v=1769774856"
    },
    {
        title: "How to Find Your Ring Size",
        link: "/education/engagement-ring-guidance/custom-engagement-ring-process",
        image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/ring-size-guide-how_to_find_your_ring_size_900x900_3e17e5b8-385b-48ac-85b0-3c93b7950a9c.webp?v=1769774855"
    }
];

const FAQ_DATA = [
    {
        question: "What if my ring doesn’t fit when it arrives?",
        answer: "If your ring doesn’t fit we offer <strong>One Free Resize</strong> for engagement and wedding rings to use within the first 12 months of your ring's completion (subject to eligible design style and metal type). For full resizing details please <a href='/free-resizing'>visit our detailed page here</a>.",
    },
    {
        question: "Can I get my ring size checked in your showroom?",
        answer: "Of course! Our helpful team can accurately measure your ring size without the guesswork. Book an appointment to <a href='/visit'>visit one of our showrooms</a>.",
    },
    {
        question: "How can I secretly know my partner's ring size?",
        answer: "This is a hard one! But we have a <a href='/education/engagement-ring-guidance/find-your-ring-size'>few tips and tricks for you over on this page</a>.",
    },
    {
        question: "Does resizing weaken the ring?",
        answer: "The ring resizing process involves adding or removing small pieces of precious metal to the original ring to attain the new size. The ring can become weaker if the ring is resized up or down too much, which is why we have a maximum amount of sizes our rings can be sized up or down. You can <a href='/free-resizing'>see our resizing threshold here</a>.<br/><br/>At Cullen Jewellery, our in-house jewellers adhere to strict quality control standards to reduce the risk of breakage and ensure resized rings fit perfectly, as well as using laser welders for a seamless finish. After resizing, we always clean and polish the ring before returning it to you.",
    },
    {
        question: "What is the most common engagement ring size?",
        answer: "The most common ring size is between K and P. If you measure your size and fall outside of this range we recommend double checking your ring size with another method to ensure it is correct as most rings can only be resized by a limited amount.<br/><br/>Please refer to the distribution graph below showing the most common ring sizes.<br/><br/><img src='https://cdn.shopify.com/s/files/1/0644/3067/0060/files/large-SizingBellCurve.png?v=1678918523' alt='Size distribution graph' />",
    }
];

const OUR_STORY_UVPS = [
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