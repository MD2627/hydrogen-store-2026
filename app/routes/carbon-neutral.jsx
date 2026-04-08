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
                            media="(max-width: 767px)"
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
                    <Link to="/engagement-rings/lab-grown-diamond" className="discovery-banner-btn ff-n">
                        SHOP NOW
                    </Link>
                </div>
            </div>

            <ProductFAQ data={FAQ_DATA} title="FAQ" subtitle="Your questions, answered." />

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
                You don’t pay anything extra. Cullen covers the entire cost of making
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
                    <li>Shipping the gemstone to Cullen</li>
                    <li>Cullen operations</li>
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
                sapphire sold by Cullen is carbon-neutral, A1-A3 cradle-to-gate.
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
                    At Cullen, we go a step further by ensuring the entire cradle-to-gate
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
        label: 'Worldwide<br>Express Shipping',
        svg: `
                <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16.75H2v-1.5h10v1.5Zm13.074 8.417c-.332.37-.807.583-1.304.583H8.196a1.752 1.752 0 0 1-1.74-1.942l.448-4.058H4v-1.5h4.578l-.63 5.723a.248.248 0 0 0 .248.277H23.77a.247.247 0 0 0 .186-.083.247.247 0 0 0 .062-.194l-1.47-13.223H9.454l-.312 2.827-1.492-.165.46-4.162h3.641v-.92c0-2.344 1.907-4.25 4.25-4.25s4.25 1.906 4.25 4.25v.92h3.642l1.617 14.557Z" fill="#6b6b6b" />
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