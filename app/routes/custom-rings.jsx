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
    return [{ title: 'Custom Rings | Diamond Jewellery' }];
};

export async function loader(args) {
    return {
        bannerData: BANNER_DATA,
        jewellersData: JEWELLERS_DATA,
    };
}

export default function DiamondInitiatives() {
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
                <div className="page-width">
                    <div className='our-approach'>
                        <h2 className='section-title'>Our Approach</h2>
                        <p className='sb-description'>An engagement ring is a deeply personal symbol of love and commitment an expression of your unique story.</p>
                        <p className='sb-description'>That’s why we believe the design journey should be just as meaningful. From concept to creation, we work closely with you to craft a piece that reflects your vision.</p>
                        <p className='sb-description'>All consultations are complimentary, with no additional customisation fees. Our specialists combine responsibly sourced lab-grown stones with timeless design to bring your ring to life.</p>
                    </div>
                </div>
            </section>

            <section className="custom-design-journey">
                {/* <div className="page-width"> */}
                {isMobile ? (
                    <>
                        <h2 className="section-title mobile-title">The Custom Design Process</h2>
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
                    </>
                ) : (
                    <div className="page-width">
                        <h2 className="section-title">The Custom Design Process</h2>
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
                    </div>
                )}
                {/* </div> */}
            </section>

            {/* <section className="our-jewellers-section">
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
            </section> */}

            <RingBanner
                image={customRingsBannerData.image}
                mobileImage={customRingsBannerData.mobileImage}
                title={customRingsBannerData.title}
                subtitle={customRingsBannerData.subtitle}
                buttonText={customRingsBannerData.buttonText}
                buttonLink={customRingsBannerData.buttonLink}
            />

            <section className='contact-form-section'>
                <div className='page-width'>
                    <div className="contact-form-title--ring">
                        <h2 class="section-title">Our Approach</h2>
                        <p class="sb-description">Fill out the form below and one of our custom ring experts will be in touch with you.</p>
                    </div>
                    <ContactForm />
                </div>
            </section>

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
        label: 'DISCOVERY CONSULTATION',
        title: '01. Discovery Consultation',
        description:
            'Share your ideas, inspirations, and vision with our expert advisors. Whether you start from an existing design or create something entirely unique, we’ll guide you through every possibility. Based on your preferences, materials, and selected gemstones, we’ll provide a personalised quote tailored to your design.',
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Jewellery_London_153_1a_retouched_high_res_2000x2000_955a3419-44fe-4982-a8b6-5ca4c5c7dd18.webp?v=1777283263',
    },
    {
        id: 2,
        label: 'CHOOSE YOUR STONE',
        title: '02. Choose Your Stone',
        description:
            'Explore a curated selection of gemstones with guidance from our specialists. From carbon-neutral lab-grown diamonds to sapphires and moissanite, we help you find the perfect stone to match your style, values, and budget available in a range of shapes, sizes, and colours.',
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/6207b1bc531d5ace3d3bced2a7bd5e51.jpg?v=1777972497',
    },
    {
        id: 3,
        label: 'DESIGN & VISUALISE',
        title: '03. Design & Visualise',
        description:
            'Once your concept is finalised, we create a detailed Computer-Aided Design (CAD) of your ring. This allows you to review every detail with precision and make any adjustments before production. Your approval ensures the final piece is exactly as you envisioned.',
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/b2473d66f964180e38ee574b8e6c7ad6.jpg?v=1777438991',
    },
    {
        id: 4,
        label: 'CRAFT & DELIVERY',
        title: '04. Craft & Delivery',
        description:
            'After approval, our skilled jewellers begin crafting your ring with exceptional attention to detail. From casting to final quality checks under magnification, every step is carefully managed. Your finished ring will be ready within 8–10 weeks, available for showroom collection or secure worldwide delivery.',
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/d208a96e7ac3ef9c3d2ea2137fa76487.jpg?v=1777972591',
    },
];

const JEWELLERS_DATA = {
    title: 'Our Jewellers',
    subtitle: 'Your story, our craft.',
    videoUrl: ""
};

const customRingsBannerData = {
    title: 'Find Your Perfect Ring with Expert Guidance',
    subtitle: 'Visit our showroom or book a virtual consultation—wherever you are, our specialists are here to help you every step of the way.',
    image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_n7n7zbn7n7zbn7n7-clean.png?v=1777641165',
    mobileImage: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_n7n7zbn7n7zbn7n7-clean.png?v=1777641165',
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
        answer: "At Diamond we don't charge any customization fees. Price is based on the amount of metal and the size and amount of gemstones used. The price of custom engagement rings at Diamond varies based on factors such as chosen gemstone, carat weight, and setting design. We offer a range of designs to suit different budgets, and our team can help you find or create a ring that meets your preferences and price point.​",
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
        answer: "All custom Diamond engagement rings in gold and platinum come with a <a href='/warranty'>lifetime manufacturing warranty.</a>  This warranty covers any defects in materials or workmanship, giving you peace of mind that your ring is crafted to the highest standards.​",
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
        answer: "Most custom engagement rings from Diamond can be resized, and we offer a free resize within the first 12 months of your ring's completion. However, we will need to assess certain custom rings to determine if a resize is possible to ensure the structural integrity of the ring is maintained and how many sizes up or down it can go. For more information about our resizing policy, please visit our <a href='/free-resizing'>free resizing page</a>.",
    },
    {
        question: "Can you ship custom engagement rings to the US?",
        answer: "At Diamond we can ship worldwide, including the US. We provide free express and insured international shipping on all orders over $500, including custom engagement rings. For full details, <a href='/shipping'>visit our shipping page.</a>",
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
        link: "/",
        image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Website_4x5_2500px_011_400x400_aa518dde-787a-464d-96dd-0c990dd2ca06.webp?v=1777280433"
    },
    {
        title: "OUR FAVOURITE WAYS TO CUSTOMISE MEN'S WEDDING BANDS",
        link: "/",
        image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Peter_4x5_02_600x600_9bfad6f1-6164-4592-9ee3-31c50144112a.webp?v=1777282936"
    },
    {
        title: "THE CUSTOM ENGAGEMENT RING DESIGN PROCESS",
        link: "/",
        image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/d208a96e7ac3ef9c3d2ea2137fa76487.jpg?v=1777972591"
    }
];