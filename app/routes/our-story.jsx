import { useRef } from 'react';
import { Link } from 'react-router';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import NewsletterForm from '~/components/Footer';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

/* ======================================================
   PAGE DATA (JSON ONLY – NOTHING HARD-CODED IN JSX)
====================================================== */

const OUR_STORY_PAGE_DATA = {
  banner: {
    imageSrc:
      'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_nzcts6nzcts6nzct.png?v=1776925302',
    title: 'About Diamond',
    subtitle: 'Crafting modern fine jewellery with purpose, passion, and precision.',
    extraClass: 'story-craft-banner--our-story',
  },

  story: {
    title: 'The Diamond Journey',
    introQuote:
      `"Diamond was founded with a vision to redefine fine jewellery through craftsmanship, transparency, and responsible sourcing. Our goal has always been to create timeless pieces that celebrate life’s most meaningful moments while offering a modern and thoughtful jewellery experience."`,

    topParagraphs: [
      "Diamond began with a passion for creating beautiful jewellery that combines exceptional quality with contemporary design.",
      "Inspired by the evolving world of fine jewellery, we set out to offer handcrafted engagement rings and fine jewellery using premium lab-grown diamonds and responsibly sourced materials.",
      "From timeless solitaires to modern statement pieces, every Diamond creation is thoughtfully designed to celebrate love, individuality, and lasting memories.",
    ],

    founder: {
      image: {
        src: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Jordan_Money_Magazine0356-Enhanced-NR_900x900.png?v=1751008208',
        alt: 'Diamond Founder',
      },
      quote:
        `"We believe fine jewellery should feel personal, meaningful, and responsibly crafted — designed to be treasured for generations."`,
      name: '– Diamond Team',
    },

    bottomParagraphs: [
      "Today, Diamond continues to create handcrafted engagement rings, wedding bands, and fine jewellery for clients around the world.",
      "Every piece is carefully crafted using premium materials, expert techniques, and a commitment to quality that reflects our passion for timeless design.",
      "Through personalised consultations, online experiences, and dedicated client care, we aim to make every jewellery journey memorable and meaningful.",
    ],
  },

  purposeMission: {
    purpose: {
      title: 'Our Purpose',
      text:
        'Our purpose is to create fine jewellery that blends modern luxury, ethical craftsmanship, and timeless beauty. We are dedicated to helping clients celebrate meaningful milestones with confidence and trust.',
    },
    mission: {
      title: 'Our Mission',
      paragraphs: [
        "At Diamond, we are committed to delivering exceptional craftsmanship and personalised experiences for every client.",
        'Our mission is to make luxury jewellery more transparent, accessible, and meaningful through responsible sourcing, expert craftsmanship, and timeless design.',
      ],
      image: {
        src:
          'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_fxq2j7fxq2j7fxq2.png?v=1779183546',
        alt: 'Timeless Craftsmanship',
      },
    },
  },

  values: [
    {
      image:
        'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_fxq2j7fxq2j7fxq2.png?v=1779183546',
      title: 'Modern Elegance',
      text:
        'Every Diamond piece is thoughtfully designed to balance timeless beauty with contemporary sophistication, creating jewellery that feels both modern and enduring.',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_WebsiteSection_Web_04_400x400_45da0837-7447-48d4-bb91-4a463d11e71f.webp?v=1777283124',
      title: 'Ethically Crafted',
      text:
        'We are committed to responsible sourcing and sustainable craftsmanship, offering lab-grown diamonds and fine jewellery created with care for both people and the planet.',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Website_4x5_2500px_01_400x400_b7b01eab-02a8-443f-ab4b-cdfcf3d60892.webp?v=1777280371',
      title: 'Exceptional Quality',
      text:
        'From gemstone selection to final polish, every detail is carefully refined to ensure superior craftsmanship, brilliance, and lasting durability.',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Website_4x5_2500px_05_400x400_50c26958-18ca-40f6-a121-ab68e3f8a375.webp?v=1777280283',
      title: 'Personalised Service',
      text:
        'We believe every jewellery journey should feel personal. Our team is dedicated to providing expert guidance and a seamless experience from start to finish.',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Front_aBand_Diamond-Jewellery_yellow_RingOnly_web_Wed_mB__2023-08-29_700x700_6e462f38-85b3-4f00-b43f-ea51dd90cc19.webp?v=1777280974',
      title: 'Crafted for a Lifetime',
      text:
        'Our jewellery is designed to celebrate meaningful moments and become lasting heirlooms, made to be treasured for generations to come.',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/6207b1bc531d5ace3d3bced2a7bd5e51.jpg?v=1777972497',
      title: 'Master Craftsmanship',
      text:
        'Combining traditional jewellery expertise with modern techniques, our skilled artisans create finely detailed pieces with precision, passion, and care.',
    },
  ],
};

/* ======================================================
   PAGE COMPONENT
====================================================== */

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader() {
  return {};
}

export default function OurStory() {
  const { banner, story, purposeMission, values } = OUR_STORY_PAGE_DATA;

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      {/* Banner Section */}
      <StoryCraftBanner {...banner} />

      {/* The Diamond Jewellery Story Section */}
      <section className="story-section-minimal">
        <div className="page-width">
          <header className="story-minimal-header">
            <h2 className="section-title">{story.title}</h2>
          </header>

          <div className="story-narrative-split">
            {/* <div className="story-media-column">
              <img
                src={story.founder.image.src}
                alt={story.founder.image.alt}
                className="minimal-founder-image"
              />
            </div> */}

            <div className="story-text-column">
              <p className="minimal-intro-text">{story.introQuote}</p>
              <div className="minimal-paragraphs">
                {story.topParagraphs.map((p, i) => (
                  <p key={i} className="sb-description">{p}</p>
                ))}
              </div>
              <div className="minimal-founder-quote-section">
                <div className="quote-container">
                  <p className="main-quote-text">{story.founder.quote}</p>
                  <p className="quote-author">{story.founder.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="minimal-founder-quote-section">
            <div className="quote-container">
              <p className="main-quote-text">{story.founder.quote}</p>
              <p className="quote-author">{story.founder.name}</p>
            </div>
          </div> */}

          <div className="minimal-bottom-content">
            {story.bottomParagraphs.map((p, i) => (
              <p key={i} className="sb-description">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Our Purpose and Mission */}
      <section className="purpose-mission-section">
        <div className="page-width">
          <div className="purpose-mission-content">

            <div className="purpose">
              <header className="purpose-mission-header">
                <h2 className='section-title'>{purposeMission.purpose.title}</h2>
                <p className='sb-description'>{purposeMission.purpose.text}</p>
              </header>
            </div>

            <div className="mission">
              <header className="mission-header">
                <h2>{purposeMission.mission.title}</h2>
                <div className="header-flex-content">
                  {purposeMission.mission.paragraphs.map((p, i) => (
                    <p className='sb-description' key={i}>{p}</p>
                  ))}
                </div>
              </header>
            </div>

            {/* VALUES — SWIPER */}
            <div className="swiper-story">
              <div className="values-nav">
                <button
                  ref={prevRef}
                  className="swiper-button-prev custom-arrow"
                  type="button"
                  aria-label="Previous"
                >
                  <svg viewBox="0 0 16.933 16.933" width="16" height="16">
                    <path
                      d="m11.641 2.117-6.35 6.35 6.35 6.35"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.05"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  ref={nextRef}
                  className="swiper-button-next custom-arrow"
                  type="button"
                  aria-label="Next"
                >
                  <svg viewBox="0 0 16.933 16.933" width="16" height="16">
                    <path
                      d="m5.292 14.816 6.35-6.35-6.35-6.35"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.05"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <Swiper
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}

                initialSlide={0}
                watchOverflow
                observer
                observeParents
                centeredSlidesBounds

                /* MOBILE FIRST */
                spaceBetween={20}
                slidesPerView={1.25}
                centeredSlides={true}

                breakpoints={{
                  768: {
                    slidesPerView: 2.5,
                    spaceBetween: 24,
                    centeredSlides: true,
                    loop: false,
                  },
                  1024: {
                    slidesPerView: 4.2,
                    spaceBetween: 46,
                    centeredSlides: true,
                    loop: false,
                  },
                }}

                className="values-swiper"
              >

                {values.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="item image-text-item">
                      <img src={item.image} alt={item.title} />
                      <h3 className="f-18 ff-a w-300">{item.title}</h3>
                      <p className="f-13 ff-c w-300">{item.text}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </div>
        </div>
      </section>

      {/* Our story banner - Need a hand? */}
      <section className="need-help-banner">
        <div className="background">
          {/* Desktop image */}
          <img
            className="small-hide"
            src={NEED_HELP_BANNER_DATA.images.desktop}
            alt={NEED_HELP_BANNER_DATA.images.alt}
            loading="lazy"
          />

          {/* Mobile image */}
          <img
            className="not-small-hide"
            src={NEED_HELP_BANNER_DATA.images.mobile}
            alt={NEED_HELP_BANNER_DATA.images.alt}
            loading="lazy"
          />

        </div>

        <div className="need-help-content">
          <div className="need-help-banner-header">
            <h2 className='section-title'>{NEED_HELP_BANNER_DATA.content.title}</h2>
            <p className='sb-description'>{NEED_HELP_BANNER_DATA.content.text}</p>
          </div>


          <div className="need-help-actions">
            {NEED_HELP_BANNER_DATA.content.buttons.map((btn, i) => (
              <Link key={i} to={btn.link} className="btn">
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter-touch">
        <div className="newsletter-container page-width">
          <div className="newsletter-inner">
            <div className="newsletter-content">
              <span className="section-subtitle">Newsletter</span>
              <h2 className="section-title">Stay in Touch</h2>
              <p className="sb-description">
                The latest on rings, diamonds, and more straight to your inbox.
                Be the first to hear about new collections and exclusive offers.
              </p>
            </div>
            <div className="newsletter-form-wrapper">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>


      {/* Footer UVPs */}
      <UvpIconFooter data={OUR_STORY_UVPS}></UvpIconFooter>
    </>
  );
}


const NEED_HELP_BANNER_DATA = {
  images: {
    desktop:
      'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/new.jpg?v=1778041776',
    mobile:
      'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/new.jpg?v=1778041776',
    alt: 'Jewellery Consultation',
  },
  content: {
    title: 'Need Help Choosing Your Ring?',
    text:
      "Our jewellery specialists are here to guide you through every step — from selecting the perfect diamond to finding a design that feels uniquely yours.",
    buttons: [
      {
        label: 'BOOK A CONSULTATION',
        link: '/visit',
      }
    ],
  },
};


/* ======================================================
   UVP DATA
====================================================== */

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
