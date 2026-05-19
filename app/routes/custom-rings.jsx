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
                        <h2 className='section-title'>Our Philosophy</h2>
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

            {/* <div className="custom-rings-faq-section"> */}
            <ProductFAQ data={FAQ_DATA} title="FAQs" />
            {/* </div> */}

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
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/39cca993c3f7aa9065d91172ef1e947e.jpg?v=1777963280n.shopify.com/s/files/1/0610/2194/5934/files/8d134cf6-9a06-48bb-93d5-168b6e062859.png?v=1779185475',
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
    { label: "Round Cut Rings", url: "/engagement-rings?shape=round" },
    { label: "Oval Cut Rings", url: "/engagement-rings?shape=oval" },
    { label: "Radiant Cut Rings", url: "/engagement-rings?shape=radiant" },
    { label: "Pear Shape Rings", url: "/engagement-rings?shape=pear" },
    { label: "Emerald Cut Rings", url: "/engagement-rings?shape=emerald" },
    { label: "Solitaire Ring Designs", url: "/engagement-rings?style=solitaire" },
    { label: "Three Stone Rings", url: "/engagement-rings?style=trilogy" },
    { label: "Halo Ring Designs", url: "/engagement-rings?style=halo" },
    { label: "Toi et Moi Rings", url: "/engagement-rings?style=toi-et-moi" }
];

const FAQ_DATA = [
    {
        question: "What Is Included in the Custom Ring Process?",
        answer: "Our custom ring process includes personalised guidance from our jewellery specialists, design consultations, gemstone selection, and expert craftsmanship to help bring your vision to life."
    },
    {
        question: "How Long Does It Take to Create a Custom Ring?",
        answer: "The timeframe for a custom ring depends on the complexity of the design and selected materials. Once your final design is approved, our team will provide an estimated completion schedule for your handcrafted piece."
    },
    {
        question: "Can I Personalize Every Detail of My Ring?",
        answer: "Yes. You can customise your ring by choosing your preferred diamond shape, setting style, metal type, and gemstone options. Our team will guide you through each step to create a design that feels uniquely yours."
    },
    {
        question: "Do Custom Rings Include Warranty Coverage?",
        answer: "All eligible custom rings crafted in precious metals are backed by our <a href='/warranty'>lifetime manufacturing warranty</a>, ensuring confidence in the quality and craftsmanship of your jewellery."
    },
    {
        question: "Can I Design My Ring Remotely?",
        answer: "Absolutely. We offer virtual consultations and online support, allowing you to collaborate with our jewellery specialists and create your custom ring from anywhere in the world."
    },
    {
        question: "Are Your Jewellery Pieces Responsibly Crafted?",
        answer: "Yes. We focus on responsible craftsmanship using premium lab-grown diamonds and ethically sourced materials, combining modern luxury with sustainability and transparency."
    },
    {
        question: "Is Ring Resizing Available After Purchase?",
        answer: "Many custom rings can be resized depending on the design and setting style. Our team can assess your ring and recommend the safest resizing options to maintain its beauty and structure."
    },
    {
        question: "Do You Offer Worldwide Shipping?",
        answer: "Yes, we provide secure international shipping for engagement rings, wedding bands, and fine jewellery. Eligible orders are carefully packaged and fully insured for safe delivery worldwide."
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

const EXPERT_GUIDANCE_ARTICLES = [
    {
        title: "GUIDE TO CREATING A CUSTOM ENGAGEMENT RING",
        link: "/",
        image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Website_4x5_2500px_011_400x400_aa518dde-787a-464d-96dd-0c990dd2ca06.webp?v=1777280433"
    },
    {
        title: "PERSONALISING MEN'S WEDDING BANDS",
        link: "/",
        image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Peter_4x5_02_600x600_9bfad6f1-6164-4592-9ee3-31c50144112a.webp?v=1777282936"
    },
    {
        title: "HOW THE CUSTOM DESIGN PROCESS WORKS",
        link: "/",
        image: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/d208a96e7ac3ef9c3d2ea2137fa76487.jpg?v=1777972591"
    }
];