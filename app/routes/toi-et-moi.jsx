
import styles from '~/styles/toi-et-moi.css?url';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Pagination, EffectCoverflow, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/free-mode';
import { useEffect } from 'react';

export const meta = () => {
    return [{ title: 'Toi et Moi | Cullen Jewellery' }];
};

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
};

export default function ToiEtMoiPage() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className="toi-et-moi-page" style={{ opacity: 0 }}>
             <StoryCraftBanner
                imageSrc={BANNER_DATA.imageSrc}
                title={BANNER_DATA.title}
                subtitle={BANNER_DATA.subtitle}
                extraClass={BANNER_DATA.extraClass}
            />
        </div>
    );

    return (
        <div className="toi-et-moi-page">
            <StoryCraftBanner
                imageSrc={BANNER_DATA.imageSrc}
                title={BANNER_DATA.title}
                subtitle={BANNER_DATA.subtitle}
                extraClass={BANNER_DATA.extraClass}
            />

            <section className="toi-et-moi-content-section">
                <div className="toi-et-moi-intro">
                    <p className="ff-a w-300 f-16 black-color">{TOI_ET_MOI_CONTENT.introTitle}</p>
                    <p className="ff-a w-300 f-16 black-color">{TOI_ET_MOI_CONTENT.introText}</p>
                </div>

                <div className="toi-et-moi-image-block">
                    <img src={TOI_ET_MOI_CONTENT.image1.src} alt="Jana Toi et Moi Ring" loading="lazy" />
                    <p className="caption ff-c f-13 w-300 black-color txt-center" dangerouslySetInnerHTML={{ __html: TOI_ET_MOI_CONTENT.image1.caption }} />
                </div>

                <div className="toi-et-moi-details">
                    {TOI_ET_MOI_CONTENT.detailParagraphs.map((para, index) => (
                        <p key={index} className="ff-c f-13 w-300 black-color">{para}</p>
                    ))}
                </div>

                <div className="toi-et-moi-image-block">
                    <img src={TOI_ET_MOI_CONTENT.image2.src} alt="Custom Toi et Moi Ring" loading="lazy" />
                    <p className="caption ff-c f-13 w-300 black-color txt-center">{TOI_ET_MOI_CONTENT.image2.caption}</p>
                </div>
            </section>

            <section className="steps-section">
                <div className="steps-intro">
                    <p className="ff-a w-300 f-16 black-color">{STEPS_DATA.introTitle}</p>
                    <p className="ff-a w-300 f-16 black-color">{STEPS_DATA.introText}</p>
                </div>

                <div className="steps-list">
                    {STEPS_DATA.steps.map((step, index) => (
                        <div key={index} className="step-item">
                            <div className="step-image-col">
                                <img src={step.image} alt={step.title} loading="lazy" />
                                {step.caption && <p className="step-caption ff-c f-13 w-300 black-color txt-center" dangerouslySetInnerHTML={{ __html: step.caption }} />}
                            </div>
                            <div className="step-text-col">
                                <h3 className="ff-a w-300 f-32 black-color">{step.title}</h3>
                                <p className="ff-c f-13 w-300 black-color" dangerouslySetInnerHTML={{ __html: step.description }} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="previous-designs-section">
                <h2 className="ff-a w-300 black-color txt-center">Some of our previous designs</h2>

                <div className="gallery-container">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        loop={true}
                        loopedSlides={4}
                        watchSlidesProgress={true}
                        preventInteractionOnTransition={true}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[EffectCoverflow, Pagination, Navigation, Thumbs]}
                        className="main-gallery-swiper"
                    >
                        {GALLERY_DATA.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="slide-content-wrapper">
                                    <img src={item.src} alt={`Design ${index + 1}`} loading="lazy" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="thumbs-container">
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={6}
                            slidesPerView={7}
                            freeMode={true}
                            loop={true}
                            loopedSlides={4}
                            watchSlidesProgress={true}
                            slideToClickedSlide={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="thumbs-gallery-swiper"
                            breakpoints={{
                                320: {
                                    slidesPerView: 4,
                                    spaceBetween: 8
                                },
                                768: {
                                    slidesPerView: 7,
                                    spaceBetween: 12
                                }
                            }}
                        >
                            {GALLERY_DATA.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="thumb-wrapper">
                                        <img src={item.src} alt={`Design Thumbnail ${index + 1}`} loading="lazy" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div className="browse-button-container txt-center">
                    <Link to="/engagement?metal=platinum&style=toi-et-moi" className="btn btn ff-b w-300 white-color">
                        BROWSE TOI ET MOI ENGAGEMENT RINGS
                    </Link>
                </div>
            </section>

            <UvpIconFooter data={UVP_DATA} />
        </div>
    );
}

const BANNER_DATA = {
    imageSrc: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_6792_2000x2000_25e4319d-689d-48c9-8351-02a83f97c520.webp?v=1771218574",
    title: "The Toi et Moi Engagement Ring",
    extraClass: 'toi-et-moi-banner',
};

const TOI_ET_MOI_CONTENT = {
    introTitle: "Introducing the Toi et Moi, a truly sentimental style of engagement ring.",
    introText: "Considered one of the most romantic styles of all time, the Toi et Moi’s appeal is summed up in the name ‘Toi et Moi’ meaning ‘You and Me’. The iconic style incorporates two main stones into the design placed side by side, symbolising the union and devotion of two people.",
    image1: {
        src: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Jana_Shaun_Shankar_-1_800x800_95f6a84f-52b7-47f3-9ddc-06fc17d2e66f.webp?v=1771219956",
        caption: "Pictured: Our made-to-order <a href='/contact'>Jana </a>Toi et Moi ring. Ask us about it today!"
    },
    detailParagraphs: [
        "The Toi et Moi is one of the most historic ring setting styles that was designed to symbolise love stories and partnerships, and gained attention for the first time in 1796 when French military leader Napoleon Bonaparte gifted his wife Josephine de Beauharnais with a duo of diamond and sapphire stones. It’s safe to say that this romantic silhouette has never gone out of style, and interest in the unique engagement ring is only heightening.",
        "This bold and classic look has seen its fair share of the spotlight in recent days, and we don’t think the oh so graceful Toi et Moi is going to lose any of its acclaim anytime soon."
    ],
    image2: {
        src: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_5371_800x800_6528d2d6-5f88-4b2e-adce-33f7e5793176.webp?v=1771219956",
        caption: "Pictured: A custom Toi et Moi ring."
    }
};

const STEPS_DATA = {
    introTitle: "Seen a Toi et Moi ring that you like? If so, you’ve come to the right place!",
    introText: "At Cullen Jewellery, we create custom Toi et Moi engagement rings righ here in Melbourne Australia that are based on our clients’ exact requirements. We can craft you dream Toi et Moi in 3 easy steps.",
    steps: [
        {
            title: "Step 1. Concept",
            description: "Send us any images or drawings you have of your dream Toi et Moi ring to help us visualise your design concept.",
            image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_1180_x600_26b9e8fe-0640-495d-b07c-3ed563d6d052.webp?v=1771221825",
            caption: "Pictured: Pictured: A custom Toi et Moi ring."
        },
        {
            title: "Step 2. Design",
            description: "Our expert designers will take your ideas, drawings and images and work together with you to create a 3D design concept.",
            image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Screen_Shot_2022-09-15_at_2.23.09_pm_600x_0e1ab730-264b-4f23-ae0b-7b800697a4f0.webp?v=1771221825",
            caption: ""
        },
        {
            title: "Step 3. Complete",
            description: "Once you are completely happy with your design and have approved it, we begin crafting your custom ring. Your dream ring is crafted right here in (Melbourne) Australia and only takes 50 business days.",
            image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_5808_x600_c92d887f-b840-4eea-be85-1a367802c8a1.webp?v=1771221825",
            caption: "Pictured: Our made-to-order <a href='/engagement-rings/ring-amor'>Amor</a> Toi et Moi ring. Ask us about it today!"
        }
    ]
};

const GALLERY_DATA = [
    { src: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_1180_1300x1300_22c9e364-6695-47b8-96de-5a141256e4be.webp?v=1771224315" },
    { src: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_0007_1300x1300_70ff1723-4b25-4b30-8f91-da4491b0f3f2.webp?v=1771224315" },
    { src: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Jana_Shaun_Shankar_-6_1300x1300_e3bf72ef-2818-4582-baea-f3dbf559fd2d.webp?v=1771224316" },
    { src: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_6792_1300x1300_3f9901b7-ac07-43a0-8b8e-f3acb603526b.webp?v=1771224316" },
    { src: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/R6__7140_1300x1300_c28b5f57-4a07-4229-b0e4-f27ba87e856a.webp?v=1771224315" },
    { src: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_5371_1300x1300_1144835c-bc2f-4e51-b9c8-eb33cc8be452.webp?v=1771224315" },
    { src: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Jana_Shaun_Shankar_-1_1300x1300_acf432cb-71f5-4b28-87b9-8b4e7ed2b84b.webp?v=1771224315" }
];

const UVP_DATA = [
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
