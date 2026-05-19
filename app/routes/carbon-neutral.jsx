import { useLoaderData, Link } from 'react-router';

import { ProductFAQ } from '~/components/ProductFAQ';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import VerticalImageAnimationSlider from '~/components/VerticalImageAnimationSlider';

import NewsletterForm from '~/components/Footer';

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader() {
    throw new Response("Not Found", { status: 404 });
    return {};
}

export default function CarbonNeutral() {
    return (
        <div className="carbon-neutral-page">
            <StoryCraftBanner {...BANNER_DATA} />

            <VerticalImageAnimationSlider />

            <div className="carbon-neutral-content-inner-banner">
                <div className="discovery-banner-bg">
                    <picture>
                        <source
                            media="(max-width: 768px)"
                            srcSet="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/ExploreOurRange_CTA_mob_900x900.png?v=1742426856"
                        />
                        <img
                            src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/ExploreOurRange_CTA_web_2000x2000.png?v=1742425958"
                            alt="Discovery Banner"
                            loading="lazy"
                        />
                    </picture>
                </div>

                <div className="discovery-banner-content">
                    <h2 className="ff-a w-300">Discover Our Range of Engagement Rings</h2>
                    <p className="ff-c w-300">With Carbon Neutral Gemstones</p>
                    <Link to="/engagement-rings/lab-grown-diamond" className="btn discovery-banner-btn ff-n">
                        SHOP NOW
                    </Link>
                </div>
            </div>

            <ProductFAQ data={FAQ_DATA} title="Neutrality" subtitle="Detailed answers about our carbon-neutral processes." />

            <UvpIconFooter data={OUR_STORY_UVPS} />
        </div >
    );
}

// ============================================
// DATA CONFIGURATIONS
// ============================================

const BANNER_DATA = {
    imageSrc: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/ImageHeader_web_9f0cda01-42b4-4c4f-afd2-81755d42bce8_1500x.png?v=1742183186',
    mobileImageSrc: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/ImageHeader_mob_3888a077-3a5b-4624-8b3b-fe14941429bc.png?v=1743034442',
    title: 'A NEW ERA FOR FINE JEWELLERY',
    subtitle: 'REWINDING GEMSTONE EMISSIONS',
    extraClass: 'carbon-neutral-banner',
};

const FAQ_DATA = [
    {
        question: 'What are carbon-neutral lab grown diamonds?',
        answer: (
            <p>
                Carbon-neutral lab grown diamonds are diamonds where we’ve measured the
                emissions created during their production and then fully offset them
                through investing in renewable energy projects. This means all CO₂e
                released during growth, cutting, polishing, and transport is balanced to
                zero carbon impact.
            </p>
        ),
    },

    {
        question: 'How do you ensure your gemstones are carbon-neutral?',
        answer: (
            <>
                <p>
                    Our process goes deeper than standard carbon accounting because “good
                    enough” isn’t our standard.
                </p>

                <ul>
                    <li>
                        We measure the carbon emissions associated with each gemstone, using
                        guidance from the GHG Protocol Product Standard.
                    </li>
                    <li>
                        We calculate the carbon footprint per finished carat using our
                        rigorous calculation method, which covers raw materials, growth
                        location, cutting, polishing, transport, and more.
                    </li>
                    <li>
                        We add a conservative buffer, ensuring we offset more than emitted,
                        even under conservative assumptions.
                    </li>
                    <li>
                        We purchase and permanently retire verified carbon credits from
                        high-integrity renewable-energy and climate-positive projects.
                    </li>
                </ul>

                <p>
                    This commitment ensures every gemstone delivers a genuinely
                    climate-positive impact, not just carbon-neutrality for our gemstones.
                </p>
            </>
        ),
    },

    {
        question: 'What types of carbon-reduction projects do you support?',
        answer: (
            <>
                <p>We support internationally verified projects certified by:</p>

                <ul>
                    <li>Verra (VCS)</li>
                    <li>Gold Standard</li>
                </ul>

                <p>
                    Because electricity use is the largest source of emissions in gemstone
                    production, we prioritise renewable-energy projects located in the
                    same regions where our gemstones are grown. This ensures our offsets
                    directly support the transition to cleaner energy in the communities
                    that power our supply chain.
                </p>
            </>
        ),
    },

    {
        question: 'How much does it cost to make my gemstone carbon-neutral?',
        answer: (
            <p>
                You don’t pay anything extra. Diamond covers the entire cost of making
                your gemstone carbon-neutral.
            </p>
        ),
    },

    {
        question:
            'How can I verify that the CO₂ emitted to create my gemstone was offset?',
        answer: (
            <p>
                Once your order is complete, we send you an email confirming that the
                emissions for your gemstone have been fully offset. This includes the
                details of the carbon credits retired on your behalf, each with
                traceable serial numbers from independently verified registries such as
                Verra (VCS) and Gold Standard.
            </p>
        ),
    },

    {
        question: 'What is your methodology for calculating the CO₂ footprint?',
        answer: (
            <>
                <p>We measure the emissions from:</p>

                <ul>
                    <li>Raw materials</li>
                    <li>Transport of those materials</li>
                    <li>Growth, cutting, and polishing</li>
                    <li>Shipping the gemstone to Diamond</li>
                    <li>Diamond operations</li>
                    <li>A margin of safety to cover uncertainty</li>
                </ul>

                <p>
                    This gives us the total CO₂e per carat that we offset on your behalf.
                </p>
            </>
        ),
    },

    {
        question:
            'Are your lab diamonds, sapphires, and moissanite carbon-neutral?',
        answer: (
            <p>
                We are proud to say yes! Every lab grown diamond, moissanite, and
                sapphire sold by Diamond is carbon-neutral, A1-A3 cradle-to-gate.
            </p>
        ),
    },

    {
        question: 'What are carbon credits?',
        answer: (
            <p>
                A carbon credit represents one tonne of CO₂ reduced or removed from the
                atmosphere through a verified project. By purchasing and retiring these
                credits, we offset the emissions associated with your gemstone.
            </p>
        ),
    },

    {
        question: 'Isn’t carbon offsetting just greenwashing?',
        answer: (
            <>
                <p>
                    It can be, but our approach has been thoroughly researched for over a
                    year and designed to avoid it:
                </p>

                <ul>
                    <li>Transparent, science-backed measurements</li>
                    <li>A conservative safety margin to over-offset</li>
                    <li>Verified carbon credits only</li>
                </ul>

                <p>
                    So you can trust that our offsets are verified and responsible.
                </p>
            </>
        ),
    },

    {
        question:
            'How much CO₂e is released to make a 1-carat lab grown gemstone?',
        answer: (
            <>
                <p>Depending on the growth method:</p>

                <ul>
                    <li>
                        <strong>CVD diamond:</strong> ~684 kg CO₂e
                    </li>
                    <li>
                        <strong>HPHT diamond:</strong> ~177 kg CO₂e
                    </li>
                    <li>
                        <strong>Moissanite:</strong> ~75 kg CO₂e
                    </li>
                    <li>
                        <strong>Sapphire:</strong> ~75 kg CO₂e
                    </li>
                </ul>

                <p>
                    The exact value depends on the country of production and the energy
                    grid.
                </p>
            </>
        ),
    },

    {
        question:
            'What’s the environmental difference between lab grown and mined diamonds?',
        answer: (
            <>
                <p>
                    Lab grown diamonds avoid the large-scale land disruption, water use,
                    and habitat impact associated with traditional diamond mining.
                    Instead of being extracted from the earth, they are grown in
                    controlled facilities using advanced technology.
                </p>

                <p>
                    At Diamond, we go a step further by ensuring the entire cradle-to-gate
                    (A1-A3) carbon footprint of our lab grown diamonds is measured and
                    fully offset. That means the CO₂ impact of the materials, energy,
                    cutting, and transport used to create the stone is balanced out,
                    resulting in a carbon-neutral diamond.
                </p>
            </>
        ),
    },

    {
        question: 'Where are your lab grown diamonds made?',
        answer: (
            <p>
                We have a variety of suppliers all around the world. Our stones come
                from labs in Europe, Asia, and America, from countries like the US,
                Canada, Belgium, India, China, and Germany. Regardless of the location
                of the lab, all of our lab grown diamonds are independently graded and
                certified by either the GIA or IGI and are carbon-neutral.
            </p>
        ),
    },

    {
        question: 'Are lab grown diamonds the same as mined diamonds?',
        answer: (
            <p>
                Yes, lab grown diamonds are chemically, physically, and optically
                identical to mined diamonds. They have the same crystal structure,
                hardness, and visual characteristics. The only difference is their
                origin — lab grown diamonds are created in controlled laboratory
                environments, while mined diamonds are formed naturally in the earth.
                Both types of diamonds receive the same certification and grading from
                established gemmological institutes.
            </p>
        ),
    },
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