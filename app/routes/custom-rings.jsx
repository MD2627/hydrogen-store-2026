import { useRef } from 'react';
import { useLoaderData, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductFAQ } from '~/components/ProductFAQ';
import { CollectionBanner } from '~/components/CollectionBanner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { CollectionLinksSection } from '~/components/CollectionLinksSection';
import { ContactForm } from '~/components/ContactForm';
import { RingBanner } from '~/components/RingBanner';
import { ExpertGuidance } from '~/components/ExpertGuidance';

export const meta = () => {
    return [{ title: 'Custom Rings | Cullen Jewellery' }];
};

export async function loader(args) {
    return {
        bannerData: BANNER_DATA,
        jewellersData: JEWELLERS_DATA,
    };
}

export default function CullenInitiatives() {
    const data = useLoaderData();
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [activeTab, setActiveTab] = useState(DESIGN_TABS[0]);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const expertPrevRef = useRef(null);
    const expertNextRef = useRef(null);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 1300);
            setIsTablet(window.innerWidth < 970);
        };
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    return (
        <div className="custom-rings-page">

            <CollectionBanner collection={data.bannerData} />

            {/* Our Approach Sezction */}
            <section className="our-approach-section">
                <div className="container">
                    <h2>Our Approach</h2>
                    <p>An engagement ring is a personal promise of love and commitment. Your design is an expression and symbol of your story.</p>
                    <p>With this in mind, we believe the design process should be a personal one — a collaboration between you and our design team from start to finish. </p>
                    <p>Consultations are complimentary, and there are no customization fees. Our engagement ring specialists work with you to blend responsibly sourced lab-grown stones with timeless design to bring your piece to life.</p>
                </div>
            </section>

            <section className="custom-design-journey">
                <div className="container">
                    <h2 className="section-title">The Custom Design Journey</h2>
                    {isMobile ? (
                        <div className="journey-slider-wrapper">
                            <button className="custom-prev-arrow" ref={prevRef}>
                                <svg viewBox="0 0 16.933 16.933" width="16" height="16"><path d="m11.641 2.117-6.35 6.35 6.35 6.35" fill="none" stroke="currentColor" strokeWidth="1.05831" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                            <button className="custom-next-arrow" ref={nextRef}>
                                <svg viewBox="0 0 16.933 16.933" width="16" height="16"><path d="m5.292 14.816 6.35-6.35-6.35-6.35" fill="none" stroke="currentColor" strokeWidth="1.05831" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                            <div className="journey-slider">
                                <Swiper
                                    modules={[FreeMode, Navigation]}
                                    slidesPerView={'auto'}
                                    freeMode={true}
                                    observer={true}
                                    observeParents={true}
                                    navigation={{
                                        prevEl: prevRef.current,
                                        nextEl: nextRef.current,
                                    }}
                                    onBeforeInit={(swiper) => {
                                        swiper.params.navigation.prevEl = prevRef.current;
                                        swiper.params.navigation.nextEl = nextRef.current;
                                    }}
                                    style={{ width: '100%' }}
                                >
                                    {DESIGN_TABS.map((tab) => (
                                        <SwiperSlide key={tab.id}>
                                            <div className="journey-slide-card">
                                                <div className="journey-slide-image">
                                                    <img src={tab.image} alt={tab.label} />
                                                </div>
                                                <div className="journey-slide-content">
                                                    <h3>{tab.title}</h3>
                                                    <p>{tab.description}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="journey-tabs">
                                {DESIGN_TABS.map((tab) => (
                                    <div className="journey-tab-wrapper" key={tab.id}>
                                        <button
                                            className={`journey-tab ${activeTab.id === tab.id ? 'active' : ''}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            <img src={tab.image} alt={tab.label} />
                                            <span>{tab.label}</span>
                                        </button>
                                        <div className="icon">
                                            <svg viewBox="0 0 16.933 16.933" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7" className="stroke" transform="rotate(180 8.466 8.466)" style={{ fill: 'none', stroke: 'rgb(0, 0, 0)', 'strokeWidth': '1.05831', 'strokeLinecap': 'round', 'strokeLinejoin': 'round', 'strokeMiterlimit': '4', 'strokeDasharray': 'none', 'strokeOpacity': '1' }}></path></svg>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="journey-content">
                                <div className="journey-image">
                                    <img src={activeTab.image} alt={activeTab.label} />
                                </div>

                                <div className="journey-text">
                                    <h3>{activeTab.title}</h3>
                                    <p>{activeTab.description}</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section className="our-jewellers-section">
                <div className="our-jewellers-inner">
                    <h2 className="our-jewellers-title">{data.jewellersData.title}</h2>
                    <div className='border-line'></div>
                    <p className="our-jewellers-subtitle">{data.jewellersData.subtitle}</p>

                    <div className="our-jewellers-video">
                        <iframe
                            src={data.jewellersData.videoUrl}
                            title="Our Jewellers Video"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            <RingBanner
                image={customRingsBannerData.image}
                mobileImage={customRingsBannerData.mobileImage}
                title={customRingsBannerData.title}
                subtitle={customRingsBannerData.subtitle}
                buttonText={customRingsBannerData.buttonText}
                buttonLink={customRingsBannerData.buttonLink}
            />

            <div className="contact-form-title--ring">
                <h2 class="our-jewellers-title">Our Approach</h2>
                <div class="border-line"></div>
                <p class="our-jewellers-subtitle">Fill out the form below and one of our custom ring experts will be in touch with you.</p>
            </div>
            <ContactForm />

            <ExpertGuidance articles={EXPERT_GUIDANCE_ARTICLES} />

            <CollectionLinksSection data={COLLECTION_LINKS} />

            <div className="custom-rings-faq-section">
                <ProductFAQ data={FAQ_DATA} title="FAQs" />
            </div>

            <UvpIconFooter data={OUR_STORY_UVPS} />
        </div>
    );
}

const BANNER_DATA = {
    handle: 'custom-rings',
    title: null,
    description: null,
    image: null,
};

const DESIGN_TABS = [
    {
        id: 1,
        label: 'INITIAL CONSULTATION',
        title: '01. Initial Consultation',
        description:
            'Bring your inspiration and imagination, and collaborate with our expert client advisors. Start with an existing design, or create something completely new, whatever truly represents you. Our custom design experts then send a quote based on your design ideas, precious metal type and other gemstones you may wish to incorporate.',
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/01._Initial_Consultation_700x700_854897de-7667-41e7-ada1-3871fd94ef87.jpg?v=1769163447',
    },
    {
        id: 2,
        label: 'SELECTING A STONE',
        title: '02. Selecting a Stone',
        description:
            'Our team will guide you through the world of gemstones to pick out the perfect stone that matches your style and budget. Whether you choose a carbon-neutral lab-grown diamond, sapphire or moissanite, we have you covered with all shapes, sizes and colours.',
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/02._Selecting_A_Stone_700x700_a76cdd1d-3a57-4def-97fb-811df7990e2d.jpg?v=1769163447',
    },
    {
        id: 3,
        label: 'DESIGNING YOUR RING',
        title: '03. Designing Your Ring',
        description:
            'After finalising your design and placing an order, we will visualise your custom ring with a Computer-Aided Design to ensure every detail is perfect, down to the millimetre. This uses the exact ring and gemstone measurements for a seamless fit. Work with our custom design experts to make any desired changes and approve the design before we move on to crafting.',
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/03._Designing_Your_Ring_700x700_43bcd582-d2a7-472f-a990-c5ae39200d9a.jpg?v=1769163446',
    },
    {
        id: 4,
        label: 'CRAFTING YOUR RING',
        title: '04. Crafting Your Ring',
        description:
            'Once you have approved the design and every aspect is to your preference, our in-house jewelers will begin crafting your ring. From the initial casting all the way up to final quality control checks at 50x magnification, your ring will be completed in 8-10 weeks. Once finished, you can pick up your ring in one of our showrooms, or we can deliver it directly to your door in discreet packaging worldwide.',
        image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/04._Crafting_Your_Ring_700x700_b3604c0c-69fd-42e7-bfb2-ba6dd142e4ec.jpg?v=1769163446',
    },
];

const JEWELLERS_DATA = {
    title: 'Our Jewellers',
    subtitle: 'Your story, our craft.',
    videoUrl: "https://www.youtube.com/embed/r7P08zf1h4w?si=ly1LGjizw5GkxJ_6"
};

const customRingsBannerData = {
    title: 'Need help finding the perfect ring?',
    subtitle: 'Book a time to visit our showroom to get assisted or book a virtual appointment no matter where you are!',
    image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_0378-2_jpg_2000x2000_331c0df2-17e7-4119-9975-3a252a19c8f7.png?v=1769249858',
    mobileImage: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_0378-2_jpg_2000x2000_331c0df2-17e7-4119-9975-3a252a19c8f7.png?v=1769249858',
    buttonLink: '/visit',
    buttonText: 'BOOK APPOINTMENT',
};

const COLLECTION_LINKS = [
    { label: "Round Engagement Rings", url: "/engagement-rings?shape=round" },
    { label: "Oval Engagement Rings", url: "/engagement-rings?shape=oval" },
    { label: "Radiant Engagement Rings", url: "/engagement-rings?shape=radiant" },
    { label: "Pear Engagement Rings", url: "/engagement-rings?shape=pear" },
    { label: "Emerald Engagement Rings", url: "/engagement-rings?shape=emerald" },
    { label: "Solitaire Engagement Rings", url: "/engagement-rings?style=solitaire" },
    { label: "Three Stone Engagement Rings", url: "/engagement-rings?style=trilogy" },
    { label: "Halo Engagement Rings", url: "/engagement-rings?style=halo" },
    { label: "Toi et Moi Engagement Rings", url: "/engagement-rings?style=toi-et-moi" }
];

const FAQ_DATA = [
    {
        question: "How much do custom engagement rings cost?",
        answer: "At Cullen we don't charge any customization fees. Price is based on the amount of metal and the size and amount of gemstones used. The price of custom engagement rings at Cullen varies based on factors such as chosen gemstone, carat weight, and setting design. We offer a range of designs to suit different budgets, and our team can help you find or create a ring that meets your preferences and price point.​",
    },
    {
        question: "How long do custom engagement rings take?",
        answer: "Custom engagement ring timeframes can vary depending on the complexity of the design. Our team will provide you with an estimated completion date once your design is finalized. The crafting stage takes 8-10 weeks, and for all general timeframe information, please visit our <a href='/crafting-timeframes'>crafting timeframes page</a>.",
    },
    {
        question: "Can I customize the stone and metal?",
        answer: "All of our rings can be customized to accommodate your preferences for any gemstone, such as a lab diamond or a lab sapphire. We also offer a variety of precious metal options for your custom ring, including yellow gold, white gold and platinum. Our team can help you <a href='/education/engagement-ring-guidance/which-is-the-best-metal-for-engagement-rings'>choose the best metal</a> to complement your chosen center stone and desired design.",
    },
    {
        question: "Do custom rings come with a warranty?",
        answer: "All custom Cullen engagement rings in gold and platinum come with a <a href='/warranty'>lifetime manufacturing warranty.</a>  This warranty covers any defects in materials or workmanship, giving you peace of mind that your ring is crafted to the highest standards.​",
    },
    {
        question: "Can I design a custom ring online?",
        answer: "Absolutely! We offer personalized, one-on-one virtual consultations with our custom design experts, which can be booked <a href='/contact'>here</a>. You can also browse our online ring builder page to explore our collection, or alternatively, start the process by filling out the form above or getting in touch with us <a href='/contact'>here</a>.",
    },
    {
        question: "Are your custom rings ethically made?",
        answer: "All of our rings, including custom rings, are considered ethically made as they are free from the concerns associated with diamond mining, such as potential human rights issues and environmental damage. Lab-grown diamonds are created in controlled laboratory environments, eliminating concerns about mining practices while still providing the same beauty and quality as mined diamonds. We acknowledge that lab diamonds still require significant energy resources, so we offset the carbon emissions generated during the production of our diamonds. Clients receive a verifiable certificate as proof.",
    },
    {
        question: "Can you resize custom engagement rings?",
        answer: "Most custom engagement rings from Cullen can be resized, and we offer a free resize within the first 12 months of your ring's completion. However, we will need to assess certain custom rings to determine if a resize is possible to ensure the structural integrity of the ring is maintained and how many sizes up or down it can go. For more information about our resizing policy, please visit our <a href='/free-resizing'>free resizing page</a>.",
    },
    {
        question: "Can you ship custom engagement rings to the US?",
        answer: "At Cullen we can ship worldwide, including the US. We provide free express and insured international shipping on all orders over $500, including custom engagement rings. For full details, <a href='/shipping'>visit our shipping page.</a>",
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

const EXPERT_GUIDANCE_ARTICLES = [
    {
        title: "HOW MUCH DOES IT COST TO MAKE A CUSTOM ENGAGEMENT RING",
        link: "/education/engagement-ring-guidance/how-much-does-it-cost-to-make-a-custom-engagement-ring",
        image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/How_Much_Does_It_Cost_700x700_3a28a5db-be18-474b-910c-58228edfb0fe.jpg?v=1769259509"
    },
    {
        title: "OUR FAVOURITE WAYS TO CUSTOMISE MEN'S WEDDING BANDS",
        link: "/education/wedding-band-guidance/men-s-wedding-band-customisation",
        image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Our_Favourite_Ways_to_700x700_320272be-acdc-4c8e-9646-e3cd6cd417fd.jpg?v=1769259507"
    },
    {
        title: "THE CUSTOM ENGAGEMENT RING DESIGN PROCESS",
        link: "/education/engagement-ring-guidance/custom-engagement-ring-process",
        image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/The_Custom_Engagement_RIng_700x700_226eb053-5f5e-40db-9828-9802d58c0dfa.jpg?v=1769259509"
    }
];