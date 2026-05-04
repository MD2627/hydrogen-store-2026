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
      'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/IMG_9993_800x800.jpg?v=1736201597',
    title: 'Our Story',
    subtitle: '',
    extraClass: 'story-craft-banner--our-story',
  },

  story: {
    title: 'Our Diamond Jewellery Story',
    introQuote:
      `"In 2018, while searching for the perfect engagement ring, I never imagined where that journey would lead. Today, I have the privilege of building a business driven by purpose—one that goes beyond profit. At Diamond Jewellery, we are dedicated to delivering exceptional experiences, empowering people, and making a positive impact on the world. Being part of our clients’ most meaningful moments while creating change is something I’m truly proud of." – Jordan Diamond, Founder.`,

    topParagraphs: [
      "Diamond Jewellery was born from a personal love story. While searching for an engagement ring for his now-wife, Jordan Diamond was struck by the high prices and unclear origins of traditionally mined diamonds.",
      "Unable to find the right option in local jewellery stores, he explored alternatives online. Discovering moissanite and lab-grown diamonds, he purchased his first stone and worked with a local jeweller to create a custom-designed ring.",
      "With a beautifully crafted ring and a delighted fiancée, Jordan realised that many other couples could benefit from a more transparent and thoughtful approach to buying jewellery—this idea became the foundation of Diamond Jewellery.",
    ],

    founder: {
      image: {
        src: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Jordan_Money_Magazine0356-Enhanced-NR_900x900.png?v=1751008208',
        alt: 'Jordan Diamond',
      },
      quote:
        `"Diamond Jewellery was created to bring clarity and transparency to the jewellery industry, helping people understand their options and make confident decisions when choosing engagement rings and wedding bands."`,
      name: '– ABCD',
    },

    bottomParagraphs: [
      "Today, Diamond Jewellery is a leading name in engagement rings, specialising in lab-grown diamonds, lab-grown sapphires, and moissanite—crafted into designs made to last a lifetime.",
      "More than 10,000 couples around the world have trusted Diamond Jewellery to create their engagement rings, wedding bands, and fine jewellery—each piece crafted with care and responsibility.",
      "With showrooms in major cities and personalised virtual appointments available worldwide, Diamond Jewellery continues to make meaningful moments even more special.",
    ],
  },

  purposeMission: {
    purpose: {
      title: 'Our Purpose',
      text:
        'Diamond Jewellery is committed to bringing high-quality, responsible fine jewellery to our clients, wherever they are in the world. Our online shopping experience, virtual consultations, and conveniently located showrooms, both in Australia and internationally, set the benchmark for jewellers in the digital age.',
    },
    mission: {
      title: 'Our Mission',
      paragraphs: [
        "At Diamond Jewellery, we're driven to leave a lasting, positive legacy.",
        'We aim to equip, empower and amaze our clients by delivering accessible, responsible and beautiful fine jewellery through a personalised experience. We care deeply about our clients and the love their jewellery represents.',
      ],
      image: {
        src:
          'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cataleya_Top_Down_Focus_1_400x400.jpg?v=1736142591',
        alt: 'Enduring Style',
      },
    },
  },

  values: [
    {
      image:
        'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cataleya_Top_Down_Focus_1_400x400.jpg?v=1736142591',
      title: 'Enduring Style',
      text:
        'Using the best materials and practices, Diamond rings are defined by clean, flowing lines and durable settings that sit comfortably flush on the hand. Known for our signature pointed, eagle-tipped claws, each setting beautifully embodies the refined and enduring aesthetic of a Diamond piece.',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_WebsiteSection_Web_04_400x400_45da0837-7447-48d4-bb91-4a463d11e71f.webp?v=1777283124',
      title: 'Environmental Conscience',
      text:
        'As part of our commitment to responsibility, Diamond fine jewellery is brought to life using lab-created gemstones which are free from the ethical concerns associated with mining. Through recycling of waste metals and planting trees for every ring sold, Diamond Jewellery’s crafting process keeps the future in mind.',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/RAJ_Content_Re-Shoot0532_400x400.png?v=1736142590',
      title: 'Social Responsibility',
      text:
        'There is no reason to compromise on quality or conscience. Diamond exclusively offers responsibly sourced lab created gemstones and carbon neutral lab grown diamonds in all of our engagement rings.',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/IMG_9894_2_400x400.jpg?v=1736201670',
      title: 'Client Focused',
      text:
        'Whether you’re shopping online or visiting our showroom in person, our jewellery experts are here to provide personalised care to guide you through the made-to-order process.',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_ForSelf_Shai_Still_3000px_05_400x400_a4a2dbdb-209e-4674-aab8-4c62141a7266.webp?v=1777283205',
      title: 'Made to Last',
      text:
        'We know that your fine jewellery purchase is an investment and we believe it should stand the test of time. For this reason, we are committed to providing a lifetime manufacturing warranty on all of our rings.',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/1I3A2860-Enhanced-NR_400x400.png?v=1736142591',
      title: 'Expert Craftsmanship',
      text:
        'Our workshop is located in Melbourne, Australia and all of our jewellery is set, polished, and refined by expert jewellers. Their wealth of experience, industry knowledge, and passion for craftsmanship ensures you will receive a piece you can cherish for a lifetime.',
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
            <div className="story-media-column">
              <img
                src={story.founder.image.src}
                alt={story.founder.image.alt}
                className="minimal-founder-image"
              />
            </div>

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
      'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/BookAppointment_Banner_web_1500x1500.jpg?v=1703115428',
    mobile:
      'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/BookAppointment_Banner_mob_900x900.png?v=1703115428',
    alt: 'Need a hand?',
  },
  content: {
    title: 'Need a hand?',
    text:
      "Visit us in person or virtually. We're here to help you find the perfect ring, no matter where you are.",
    buttons: [
      {
        label: 'BOOK APPOINTMENT',
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
