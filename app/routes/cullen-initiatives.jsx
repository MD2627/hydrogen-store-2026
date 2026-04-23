import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductFAQ } from '~/components/ProductFAQ';

export const meta = () => {
  return [{ title: 'Our Initiatives | Cullen Jewellery' }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader() {
  return {};
}

export default function CullenInitiatives() {
  return (
    <div className="cullen-initiatives-page">
      <StoryCraftBanner
        imageSrc={INITIATIVES_HERO.image}
        title={INITIATIVES_HERO.title}
        subtitle={INITIATIVES_HERO.subtitle}
        extraClass="initiatives-banner"
      />

      {/* ================= PURPOSE SECTION ================= */}
      <section className="purpose-section">
        <div className="purpose-container">
          {/* LOGO */}
          <div
            className="purpose-logo"
            dangerouslySetInnerHTML={{ __html: INITIATIVES_PURPOSE.logoSvg }}
          />
          {/* HEADING */}
          <p className="purpose-heading ff-c f-14 w-300">
            {INITIATIVES_PURPOSE.heading}
          </p>
          {/* ITEMS */}
          <div className="purpose-items">
            {INITIATIVES_PURPOSE.items.map((item, index) => (
              <div className="purpose-item" key={index}>
                <div
                  className="purpose-icon"
                  dangerouslySetInnerHTML={{ __html: item.svg }}
                />
                <p
                  className="purpose-text ff-c f-14 w-700"
                  dangerouslySetInnerHTML={{ __html: item.label }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="initiatives-people-section">
        <div className="page-width">
          <div className="initiatives-people-grid">
            {/* LEFT TITLE */}
            <div className="initiatives-people-left">
              <h2 className="initiatives-people-title ff-a f-32 w-700">
                {PEOPLE_SECTION_DATA.title.line1}
                <span>{PEOPLE_SECTION_DATA.title.highlight}</span>
              </h2>
            </div>

            {/* RIGHT CONTENT */}
            <div className="initiatives-people-right ff-c f-13 w-300">
              {PEOPLE_SECTION_DATA.content.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StoryCraftBanner
        imageSrc={INITIATIVES_IMAGE.image}
        extraClass="initiatives-image-section"
      />

      <section className="initiatives-partners-section">
        <div className="page-width">
          <div className="initiatives-partners-grid">
            {/* LEFT SIDE */}
            <div className="initiatives-partners-left">
              <h4 className="initiatives-small-title ff-n f-13 w-400">
                {PEOPLE_PARTNERS_SECTION_DATA.title}
              </h4>
              <ol className="initiatives-list">
                {PEOPLE_PARTNERS_SECTION_DATA.points.map((item, index) => (
                  <li className='ff-c f-13 w-300' key={index}>
                    <strong className='w-600'>{item.title}:</strong> {item.description}
                  </li>
                ))}
              </ol>
            </div>
            {/* RIGHT SIDE */}
            <div className="initiatives-partners-right">
              <h4 className="initiatives-small-title ff-n f-13 w-400">
                {PEOPLE_PARTNERS_SECTION_DATA.partnersTitle}
              </h4>

              <div className="partners-logos-grid">
                {PEOPLE_PARTNERS_SECTION_DATA.partners.map((partner, index) => (
                  <div className={`partner-logo logo-${index}`} key={index}>
                    <img
                      src={partner.image}
                      alt={partner.alt}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="initiatives-people-section initiatives-planet-section">
        <div className="page-width">
          <div className="initiatives-people-grid">
            {/* LEFT TITLE */}
            <div className="initiatives-people-left">
              <h2 className="initiatives-people-title ff-a f-32 w-700">
                {PLANET_SECTION_DATA.title.line1}
                <span>{PLANET_SECTION_DATA.title.highlight}</span>
              </h2>
            </div>

            {/* RIGHT CONTENT */}
            <div className="initiatives-people-right ff-c f-13 w-300">
              {PLANET_SECTION_DATA.content.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="trees-animation">
        <div className="tree-count w-300 ff-a">114,494</div>
        <div className="description">
          <div className="trees-planted w-600 ff-c f-15">trees planted,</div>
          <div className="more-everyday w-300 ff-c f-13">with more everyday.</div>
        </div>
        {TREE_IMAGES.map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            className="tree-img"
            loading="lazy"
          />
        ))}
      </section>

      <section className="initiatives-partners-section planet-wrapper">
        <div className="page-width">
          <div className="initiatives-partners-grid">
            {/* LEFT SIDE */}
            <div className="initiatives-partners-left">
              <h4 className="initiatives-small-title ff-n f-13 w-400">
                {PLANET_PARTNERS_SECTION_DATA.title}
              </h4>
              <ol className="initiatives-list">
                {PLANET_PARTNERS_SECTION_DATA.points.map((item, index) => (
                  <li className="ff-c f-13 w-300" key={index}>
                    <strong className="w-600">{item.title}:</strong>{" "}
                    {item.description}{" "}

                    {item.linkText && item.linkUrl && (
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline"
                      >
                        {item.linkText}
                      </a>
                    )}

                    {item.afterLinkText && item.afterLinkText}
                  </li>
                ))}
              </ol>
            </div>
            {/* RIGHT SIDE */}
            <div className="initiatives-partners-right">
              <h4 className="initiatives-small-title ff-n f-13 w-400">
                {PLANET_PARTNERS_SECTION_DATA.partnersTitle}
              </h4>

              <div className="partners-logos-grid">
                {PLANET_PARTNERS_SECTION_DATA.partners.map((partner, index) => (
                  <div className={`partner-logo logo-${index}`} key={index}>
                    <img
                      src={partner.image}
                      alt={partner.alt}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner-section">
        <div className="page-width">
          <div className="cta-banner-container">

            {/* IMAGE */}
            <div className="cta-banner-image">
              <img
                src={CTA_BANNER_DATA.image}
                alt="Engagement ring"
                loading="lazy"
              />
            </div>

            {/* CONTENT */}
            <div className="cta-banner-content">
              <h3 className="cta-banner-title ff-n f-13 w-400">
                {CTA_BANNER_DATA.title}
              </h3>

              <a
                href={CTA_BANNER_DATA.button.link}
                className="btn cta-banner-button"
              >
                {CTA_BANNER_DATA.button.label}
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <div className="initiatives-faq-section">
        <ProductFAQ data={FAQ_DATA} title="FAQs" />
      </div>

      <UvpIconFooter data={OUR_STORY_UVPS} />
    </div>
  );
}

const INITIATIVES_HERO = {
  image:
    'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Trees_for_the_future_holding_tree_2000x2000.jpg?v=1764045470',
  title: 'Our Initiatives',
  subtitle: 'Undoing the damage of the mined diamond industry.',
};

/* ================= SVG ICONS ================= */

const PEOPLE_SVG = `
<svg id="Empowering_the_People-2" data-name="Empowering the People" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs id="defs47771"><style id="style47769"></style></defs><path d="M36.841 36.827h-8.538l-1.941 1.948 5.712 5.73 6.855-5.989-6.856 7.221-7.07-7.092 2.703-2.711h8.327z" fill="#01172C" id="path3543" style="fill:none;stroke:#f1f1f1;stroke-width:.299999;stroke-dasharray:none;stroke-opacity:1" class="stroke"></path><ellipse style="fill:none;stroke:#fff;stroke-width:.3;stroke-dasharray:none;stop-color:#000" id="path47918" cx="32.757" cy="21.709" class="stroke" rx="7.697" ry="7.725"></ellipse><ellipse style="fill:none;stroke:#fff;stroke-width:.3;stroke-dasharray:none;stop-color:#000" id="path48346" cx="52.189" cy="23.937" class="stroke" rx="5.197" ry="5.216"></ellipse><ellipse style="fill:none;stroke:#fff;stroke-width:.3;stroke-dasharray:none;stop-color:#000" id="path48346-5" cx="11.815" cy="23.931" class="stroke" rx="5.197" ry="5.216"></ellipse><path id="path48414" style="font-variation-settings:normal;opacity:1;fill:none;fill-opacity:1;stroke:#fff;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;stop-color:#000;stop-opacity:1" d="M15.91 42.984c5.184-14.197 26.256-15.39 32.356.025-10.14 8.324-23.762 7.535-32.357-.025zm29.443-9.177c6.022-4.62 14.914-2.117 17.425 4.844-3.5 2.637-5.619 3.99-12.166 3.904m-31.99-8.698C12.599 29.237 3.707 31.74 1.196 38.7c3.5 2.637 5.62 3.99 12.167 3.904" class="stroke"></path></svg>`;

const PLANET_SVG = `
<svg id="Protecting_the_Planet-2" data-name="Protecting the Planet" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs id="defs51771"><style id="style51769"></style></defs><path id="path52299" style="font-variation-settings:normal;opacity:1;fill:none;fill-opacity:1;stroke:#fff;stroke-width:.3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;stop-color:#000;stop-opacity:1" d="M33.006 26.98c1.986-1.376 4.698-4.115 9.3-5.796.943-.344 1.475.886.523 1.278-2.245.927-3.646 1.74-5.802 3.16 1.873 1.016 6.006.86 8.496-2.067 2.754-3.239 2.022-5.763 2.022-8.55 0-1.389-1.058-.897-1.716-.47-.475.309-2.374 1.025-3.652 1.17-1.278.147-2.89.198-4.818 1.885-1.927 1.688-2.223 4.822-2.25 5.364-.025.543-.228.83-.451 1.042-.224.213-1.382.907-2.256 1.604l-.01-11.129c0-1.094-1.469-1.1-1.469-.045l-.002 5.526c-1.057-.563-1.532-.417-1.729-1.175-.196-.758-1.128-4.814-4.602-5.895-1.176-.366-2.879-.368-4.003-.743-2.062-.688-3.1-1.623-3.782-1.18-.683.443-.461 5.735 2.55 8.306 3.511 2.997 7.33 1.66 7.33 1.66s-3.855-2.54-4.528-2.978c-.673-.439.112-1.739.918-1.043.7.605 3.804 2.816 7.42 4.281.377.153.427.147.428.458v7.937l-15.02-.038c-1.075-.083-1.622 1.048-1.56 2.026.321 5.013 5.066 17.594 17.603 17.594 12.384 0 17.741-12.353 17.741-17.734 0-1.177-.473-1.878-1.68-1.878H32.392v-1.362c0-.36-.183-.655.614-1.207zm-8.055 2.553c-.73 2.822.253 4.422 2.652 4.065 2.4-.356 4.72.957 4.83 3.615.11 2.658-.352 3.233.547 4.131.898.898 2.655 1.618 6.64-3.888 3.984-5.507 5.078-7.883 5.078-7.883m-27.364-.117c.053 1.84.058 4.113.667 4.742.61.629 2.684 1.248 3.13 3.345.446 2.097-1.54 4.786-1.882 5.321" class="stroke"></path></svg>`;

/* ================= PURPOSE DATA ================= */

const INITIATIVES_PURPOSE = {
  logoSvg: `
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      class="cullen-initiatives-logo"
      aria-hidden="true"
    >
      <path
        d="M35.841973 212.64443
           271.2705 446.26135
           468.53782 250.56426
           H457.48797
           L271.2705 398.31826
           87.106114 212.64443
           166.93078 131.00824
           H407.37106
           L370.05508 93.873444
           H154.85443Z"
        fill="currentColor"
      />
    </svg>
  `,
  heading:
    'At Cullen Jewellery, we’re focused on doing two things to make the world better:',
  items: [
    {
      label: 'Empowering <span>People</span>',
      svg: PEOPLE_SVG,
    },
    {
      label: 'Protecting the <span>Planet</span>',
      svg: PLANET_SVG,
    },
  ],
};

const PLANET_SECTION_DATA = {
  title: {
    line1: "Building a Better Future for the ",
    highlight: "Planet",
  },
  content: [
    "Our planet isn’t just our home, it’s a source of joy. That’s why taking care of it is central to everything we do as a company.",
    "Our lab grown gemstones are carbon neutral, and they don’t depend on land clearing and mining to get to us. We make sure any carbon produced in the gemstone growing process is offset by a range of environmental initiatives, like tree planting and solar farms.",
    "By thinking about our commitment to the Earth in the big picture, we make fine jewellery you can feel good about wearing. Each piece symbolises your choice to create a better world, for everyone."
  ],
};

const INITIATIVES_IMAGE = {
  image:
    'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Trees_for_the_future_family_2000x2000.jpg?v=1764045470',
};

const PEOPLE_PARTNERS_SECTION_DATA = {
  title: "OUR INITIATIVES FOR PEOPLE:",
  points: [
    {
      title: "Sponsoring children",
      description:
        "For every full-time team member we welcome, we support a child in need.",
    },
    {
      title: "Saying no to mining and mass production",
      description:
        "We make our jewellery to order using lab grown gemstones. That way, we avoid mining and waste.",
    },
    {
      title: "Supporting good causes",
      description:
        "We give both to organisations repairing the damage done by mining and those striving to make a brighter world.",
    },
  ],
  partnersTitle: "PARTNERING WITH:",
  partners: [
    {
      image: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/pink-ribbon_x200.png?v=1659942807",
      alt: "Cancer Council",
    },
    {
      image: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/logo-r1346975297-1737542052_x200.jpg?v=1659942807",
      alt: "Otis Foundation",
    },
    {
      image: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/nbcf-logo_200x.svg?v=1696312944",
      alt: "Breast Cancer Foundation",
    },
    {
      image: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/AusRedCross_2021_x200.png?v=1659942807",
      alt: "Australian Red Cross",
    },
    {
      image: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/logo_3_x200.png?v=1659942807",
      alt: "Peter MacCallum Cancer Centre",
    },
  ],
};

const PEOPLE_SECTION_DATA = {
  title: {
    line1: "Building a Better Future for ",
    highlight: "People",
  },
  content: [
    "We’re a family business that cares a lot about people and doing good. We began because we wanted to offer a different choice for engagement rings, one that doesn't continue the cycle of poor conditions and unfair work linked to diamond mining.",
    "But creating a better option only solves half of the problem. That’s why we’re also committed to undoing the harm commercial diamond mining has already done.",
    "We’re helping communities affected by diamond mining by giving them a path out of poverty. That starts with giving money, food, shelter, healthcare, education, and fair jobs to vulnerable people. That way, they can build a better future."
  ],
};

const PLANET_PARTNERS_SECTION_DATA = {
  title: "OUR INITIATIVES FOR THE PLANET:",
  points: [
    {
      title: "Carbon neutral lab grown gemstones",
      description:
        "Through our carbon offsetting methodology we offset more carbon than what is produced when our lab grown gemstones are made. Learn more about our carbon neutral gemstones",
      linkText: "here",
      linkUrl: "/carbon-neutral",
    },
    {
      title: "One tree planted for every order",
      description:
        "Trees absorb carbon from the air and turn it into oxygen we can breathe. By planting more of them, we want to reverse the effects of climate change, reforest the Earth, and rescue ecosystems. Through our partnership with",
      linkText: "Trees For The Future",
      linkUrl: "https://trees.org/",
      afterLinkText:
        ", we plant one tree for every order, in Africa, a continent that for generations has been effected by the environmental destruction associated with diamond mining. It's one actionable way we can undo the damage of the mining industry.",
    },
  ],
  partnersTitle: "PARTNERING WITH:",
  partners: [
    {
      image:
        "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/06034022d9480001f7756471c7db546cf4a24ccb.webp?v=1763950923",
      alt: "Trees For The Future",
    },
  ],
};

const CTA_BANNER_DATA = {
  image:
    "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/etC_Stand_pBand_hh_cush_Cullen-Jewellery_solitaire_yellow_RingOnly_hs_web_Engage_mB__2022-06-21_1300x1300.jpg?v=1701039664",
  title: "ENGAGEMENT RINGS YOU CAN FEEL GOOD ABOUT.",
  button: {
    label: "BUILD YOUR ENGAGEMENT RING",
    link: "/engagement-rings",
  },
};

const FAQ_DATA = [
  {
    question: "Can I make individual donations to the companies you support?",
    answer: `
      <p>This can be done through our partners websites below:</p>

      <div class="faq-partner-logos">
        <a href="https://baptistworldaid.org.au/" rel="noopener">
          <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/BWAA-Logo-Horizontal-CMYK.jpg?v=1721173256" alt="Baptist World Aid" />
        </a>

        <a href="https://trees.org/" rel="noopener">
          <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/06034022d9480001f7756471c7db546cf4a24ccb.webp?v=1763950923" alt="Trees For The Future" />
        </a>

        <a href="https://otisfoundation.org.au/" rel="noopener">
          <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/logo-r1346975297-1737542052_x200.jpg?v=1659942807" alt="Otis Foundation" />
        </a>

        <a href="https://www.redcross.org.au/" rel="noopener">
          <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/AusRedCross_2021_x200.png?v=1659942807" alt="Australian Red Cross" />
        </a>

        <a href="https://www.cancercouncil.com.au/" rel="noopener">
          <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/logo_3_x200.png?v=1659942807" alt="Peter Mac" />
        </a>

        <a href="https://www.cancercouncil.com.au/" rel="noopener">
          <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cancer_Council_200x.png?v=1701064305" alt="Cancer Council" />
        </a>
      </div>
    `,
  },
  {
    question: "I'm a not-for-profit organisation, I'd like to work with you.",
    answer: `
      Awesome! Please send an email to 
      <a 
        href="mailto:demo@gmail.com" 
      >
        demo@gmail.com
      </a>; 
      we’d love to chat.
    `,
  },
  {
    question: "Why are mined diamonds harmful to communities?",
    answer:
      "Diamond mining has many detrimental impacts on communities and the environment. This ranges from deforestation to infrastructure destruction. The mined diamond supply chain also results in conflict and blood diamonds. Beyond that, human rights abuses, violence, and corruption are synonymous with the exploitative mining process.",
  },
  {
    question: "Where do you plant your trees?",
    answer:
      "We plant our trees in Africa. A continent that for generations has been affected by the environmental destruction associated with diamond mining. It's one actionable way we can undo the damage of the mining industry. Learn more about where we plant our trees <a href='/trees'>here</a>.",
  },
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

const TREE_IMAGES = [
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_2.svg?v=1699493531",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_4.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_4.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_4.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_2.svg?v=1699493531",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_4.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_4.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_4.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_2.svg?v=1699493531",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_3.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_1.svg?v=1699493412",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_4.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_4.svg?v=1699493532",
  "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/tree_4.svg?v=1699493532",
];