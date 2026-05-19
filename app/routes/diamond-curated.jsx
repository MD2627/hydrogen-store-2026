import { useRef } from 'react';
import { Link, useLoaderData } from 'react-router';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductFAQ } from '~/components/ProductFAQ';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { YouMayAlsoLikeBlog } from '~/components/YouMayAlsoLikeBlog';
import { ThreeDEffectCard } from '~/components/ThreeDEffectCard';

export default function DiamondCurated() {

    const { blog } = useLoaderData() || {};

    return (
        <>
            <div className="diamond-curated-page">

                <StoryCraftBanner
                    imageSrc="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/ImageHeader_web_1400x1400.png?v=1739848715"
                    mobileImageSrc="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/ImageHeader_mob_900x900.png?v=1740437813" // ✅ mobile image
                    title="Diamond Curated"
                    subtitle="A signature range of lab grown gemstones by Diamond Jewellery"
                    extraClass="diamond-curated-banner"
                />


                <div className="diamond-curated-rich-text">
                    <div className="diamond-curated-rich-text-container">
                        <h2 className="diamond-curated-title-rich-text">
                            Expertly Curated By Hand
                        </h2>
                        <p className="diamond-curated-content-rich-text">
                            Diamond Curated by Diamond Jewellery, is a signature range of lab grown gemstones that are hand-selected for their unmatched colour, clarity and superior cut. Our gemstones are grown in controlled environments using advanced technology and strict quality control. This results in high-quality, responsible, lab grown gemstones free from the ethical concerns of mining.
                        </p>
                    </div>
                </div>




                <div className="curation-process-wrapper">
                    <div className="curation-process-header">
                        <h2 className="curation-process-title f-38 f-m-34 w-300 l-h-1-1">
                            Our Curation Process
                        </h2>
                        <p className="curation-process-subtitle"></p>
                    </div>

                    <div className="curation-process-row">
                        <div className="curation-process-card">
                            <img
                                src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Sourcing.jpg?v=1739850453"
                                alt="Unrefined gemstone"
                                className="curation-process-image"
                            />

                            <h3 className="curation-process-card-title f-13 f-m-15 w-400 l-h-1-2">
                                SOURCING
                            </h3>

                            <p className="curation-process-card-text f-13 f-m-15 w-300 l-h-1-4">
                                We work with the most advanced gemstone-growing labs worldwide to
                                ensure we offer the highest quality available.
                            </p>
                        </div>

                        <div className="curation-process-card">
                            <img
                                src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Ordering.jpg?v=1739850449"
                                alt="Unrefined gemstone"
                                className="curation-process-image"
                            />

                            <h3 className="curation-process-card-title f-13 f-m-15 w-400 l-h-1-2">
                                GRADING
                            </h3>

                            <p className="curation-process-card-text f-13 f-m-15 w-300 l-h-1-4">
                                We inspect every stone to ensure it meets our grading criteria.
                                Not every stone makes the cut.
                            </p>
                        </div>

                        <div className="curation-process-card">
                            <img
                                src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Assurance.jpg?v=1739850442"
                                alt="Unrefined gemstone"
                                className="curation-process-image"
                            />

                            <h3 className="curation-process-card-title f-13 f-m-15 w-400 l-h-1-2">
                                ASSURANCE
                            </h3>

                            <p className="curation-process-card-text f-13 f-m-15 w-300 l-h-1-4">
                                We stand behind our curation process by offering a Lifetime
                                Manufacturing Warranty on all Diamond Curated gemstones.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="our-gemstones-wrapper">
                    <h2 className="our-gemstones-title curation-process-title f-38 f-m-34 w-300 l-h-1-1">Our Gemstones</h2>
                    <hr className="our-gemstones-title-line"></hr>
                    <p className='our-gemstones-subtitle f-13 f-m-15 w-300 l-h-1-4 ff-c'>The Diamond Jewellery Gem Vault</p>
                    <img
                        className="our-gemstones-image desktop-image"
                        src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Original_OurGemstones_2800x2800.jpg?v=1739858316"
                        alt="ring and gemstones on a piece of paper"
                    />
                    <img
                        className="our-gemstones-image mobile-image"
                        src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Original_OurGemstones_900x900.jpg?v=1739858316"
                        alt="ring and gemstones on a piece of paper"
                    />

                    <div className="our-gemstones-content">
                        <p className="our-gemstones-text f-13 f-m-15 w-300 l-h-1-4 ff-c">
                            It takes an eye for detail to select the perfect gemstones for
                            engagement rings and fine jewellery. Diamond Curated gemstones are
                            carefully chosen by our experienced jewellers, who together bring a
                            combined 100 years of gemology expertise to the stringent selection
                            process.
                        </p>

                        <p className="our-gemstones-text f-13 f-m-15 w-300 l-h-1-4 ff-c" >
                            All Diamond Curated gemstones are grown in controlled laboratory
                            environments. The result is an unparalleled collection of heirloom
                            lab grown diamonds and gemstones that are kind to our world.
                        </p>
                    </div>

                    <img
                        className="our-gemstones-image desktop-image"
                        src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01._Sapphires_web.png?v=1739858851"
                        alt="ring and gemstones on a piece of paper"
                    />
                    <img
                        className="our-gemstones-image mobile-image"
                        src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01._Sapphires_mob.png?v=1740439545"
                        alt="ring and gemstones on a piece of paper"
                    />
                </div>


                <div className="moissanite-section">

                    <h2 class="our-gemstones-title curation-process-title f-32 f-m-34 w-300 l-h-1-1">
                        Lab Grown Sapphires
                    </h2>
                    <hr class="our-gemstones-title-line" />
                    <p class="our-gemstones-subtitle f-13 f-m-15 w-300 l-h-1-4 ff-c">
                        Diamond Curated Lab-grown sapphires are primarily composed of the mineral corundum (aluminium oxide) and are prized for their remarkable hardness (9 on the Mohs scale) and vivid colouration.
                        <p class="our-gemstones-subtitle f-13 f-m-15 w-300 l-h-1-4 ff-c">
                            They are Identical in chemical composition, crystal structure, and physical properties to mined sapphires.
                        </p>
                    </p>

                    <div className="moissanite-growing-process">
                        <div className="moissanite-growing-text">
                            <h3 className='f-13 f-m-15 w-300 l-h-1-4 ff-n'>Growing Process</h3>
                            <p className=' f-13 f-m-15 w-300 l-h-1-4 ff-c'>
                                Diamond Curated sapphires are grown using the Czochralski Process. In this process, aluminium oxide is melted using radio waves, and a rod with a seed crystal is inserted into the mixture. As the rod is slowly rotated and pulled out, a column of sapphire forms. This method is more expensive than others but it allows for precise control over the crystal's growth, resulting in high-quality sapphires.
                            </p>
                        </div>

                        <div className="moissanite-video">

                            <video
                                src="https://cdn.shopify.com/videos/c/o/v/0683adaaa1624103a3cd81fd24ed3b5c.mp4"
                                loop
                                muted
                                playsInline
                                autoPlay
                                className="moissanite-video-inner"
                            />
                        </div>
                    </div>

                    <div className="moissanite-properties">
                        <div className="moissanite-properties-inner">
                            <div className="moissanite-properties-grid">
                                <div className="moissanite-properties-table moissanite-growing-text">
                                    <h3 className='f-13 f-m-15 w-300 l-h-1-4 ff-n'>SAPPHIRE PROPERTIES</h3>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>CHEMICAL COMPOSITION</td>
                                                <td>Al2O3 (Aluminium Oxide)</td>
                                            </tr>
                                            <tr>
                                                <td>HARDNESS</td>
                                                <td>9 on the Mohs scale</td>
                                            </tr>
                                            <tr>
                                                <td>REFRACTIVE INDEX</td>
                                                <td>1.76 - 1.77</td>
                                            </tr>
                                            <tr>
                                                <td>SPECIFIC GRAVITY</td>
                                                <td>3.95 - 4.03</td>
                                            </tr>
                                            <tr>
                                                <td>CLARITY</td>
                                                <td>Eye clean</td>
                                            </tr>
                                            <tr>
                                                <td>ORIGIN</td>
                                                <td>Lab Grown</td>
                                            </tr>
                                            <tr>
                                                <td>AVAILABLE COLOURS</td>
                                                <td>Blue, pink, purple and red.</td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>

                                <div className="moissanite-properties-image">
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/03._Sapphire_Properties_700x700.png?v=1739919401"
                                        alt="vibrant blue sapphire"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn-section-background" style={{ paddingBottom: "40px", paddingTop: "40px" }}>
                        <Link
                            to="/engagement-rings/sapphire"
                            className="btn"
                            style={{ minHeight: "50px" }}>
                            EXPLORE SAPPHIRE
                        </Link>
                    </div>
                </div>

                <div className="only-image-banner--small">
                    <img className="our-gemstones-image mobile-image"
                        src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01._Explore_Moissanite_mob.png?v=1740439161"
                        alt="ring and gemstones on a piece of paper"
                    />
                    <img className="our-gemstones-image desktop-image"
                        src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01._Explore_Moissanite_web.png?v=1739933941F"
                        alt="ring and gemstones on a piece of paper"
                    /></div>


                <div className="moissanite-section">

                    <h2 class="our-gemstones-title curation-process-title f-32 f-m-34 w-300 l-h-1-1">
                        Lab Grown Moissanite
                    </h2>
                    <hr class="our-gemstones-title-line" />
                    <p class="our-gemstones-subtitle f-13 f-m-15 w-300 l-h-1-4 ff-c">
                        Diamond Curated Lab-grown mosssanite is composed of silicon carbide and is prized for their remarkable hardness (9.25 on the Mohs scale) and exceptional fire and brilliance.
                    </p>

                    <div className="moissanite-growing-process">
                        <div className="moissanite-growing-text">
                            <h3 className='f-13 f-m-15 w-300 l-h-1-4 ff-n'>Growing Process</h3>
                            <p className=' f-13 f-m-15 w-300 l-h-1-4 ff-c'>
                                Diamond Curated moissanite is grown using the Physical Vapour Transport (PVT) process. This intricate method involves sublimating silicon carbide in a vacuum, transforming it into a vapour that delicately deposits onto a seed crystal. The process starts by heating silicon carbide powder in a graphite crucible at high temperatures, causing it to sublime in a vacuum. The silicon carbide vapour then moves to a cooler part of the crucible, where it settles onto a seed crystal, forming a brilliant moissanite gem.
                            </p>
                        </div>

                        <div className="moissanite-video">

                            <video
                                src="https://cdn.shopify.com/videos/c/o/v/0683adaaa1624103a3cd81fd24ed3b5c.mp4"
                                loop
                                muted
                                playsInline
                                autoPlay
                                className="moissanite-video-inner"
                            />
                        </div>
                    </div>

                    <div className="moissanite-properties">
                        <div className="moissanite-properties-inner">
                            <div className="moissanite-properties-grid">
                                <div className="moissanite-properties-table moissanite-growing-text">
                                    <h3 className='f-13 f-m-15 w-300 l-h-1-4 ff-n'>MOISSANITE PROPERTIES</h3>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>CHEMICAL COMPOSITION</td>
                                                <td>SiC (Silicon Carbide)</td>
                                            </tr>
                                            <tr>
                                                <td>HARDNESS</td>
                                                <td>9.25 on the Mohs scale</td>
                                            </tr>
                                            <tr>
                                                <td>REFRACTIVE INDEX</td>
                                                <td>2.65 - 2.69</td>
                                            </tr>
                                            <tr>
                                                <td>SPECIFIC GRAVITY</td>
                                                <td>3.22</td>
                                            </tr>
                                            <tr>
                                                <td>CLARITY</td>
                                                <td>VVS1 - VVS2</td>
                                            </tr>
                                            <tr>
                                                <td>ORIGIN</td>
                                                <td>Lab Grown</td>
                                            </tr>
                                            <tr>
                                                <td>AVAILABLE COLOURS</td>
                                                <td>
                                                    Colourless, Green, Grey, Yellow, Champagne, Blue
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="moissanite-properties-image">
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/03._Moissanite_Properties_700x700.jpg?v=1739933937"
                                        alt="vibrant blue sapphire"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn-section-background" style={{ paddingBottom: "40px", paddingTop: "40px" }}>
                        <Link
                            to="/engagement-rings/moissanite"
                            className="btn"
                            style={{ minHeight: "50px" }}>
                            EXPLORE MOISSANITE
                        </Link>
                    </div>
                </div>


                <ThreeDEffectCard stones={STONES} />


                <div className="free-resizing-content-wrapper">
                    <div className="free-resizing-content-inner">

                        <div className="section">
                            <h2>Lifetime Manufacturing Warranty</h2>
                            <p>
                                All Diamond Curated lab grown gemstones are guaranteed to be of the highest
                                quality through a Lifetime Manufacturing Warranty.
                            </p>
                        </div>

                        <div className="section">
                            <h3>COVERAGE</h3>
                            <ul className="cover-list">
                                <li>
                                    The brilliance and fire inherent in your lab grown gemstone(s).
                                </li>
                                <li>
                                    The coverage for your Diamond Curated gemstone(s) is subject to the
                                    terms outlined below and set forth on your Lifetime Manufacturing
                                    Warranty Certificate.
                                </li>
                            </ul>
                        </div>

                        <div className="section">
                            <h3>TERMS AND CONDITIONS</h3>
                            <p>
                                If your gemstone(s) optical properties of brilliance and fire alter in
                                the unlikely event, please <a href="/contact">contact us</a> immediately.
                            </p>
                            <ul className="cover-list">
                                <li>
                                    The Lifetime Manufacturing Warranty applies only to the original
                                    purchaser and is non-transferable
                                </li>
                                <li>
                                    The Lifetime Manufacturing Warranty on your gemstone(s) does not
                                    cover: chipping, breaking, scratching, abrasions, or damage as a
                                    result of abuse, misuse, loss, or theft of your gemstone(s).
                                </li>
                                <li>
                                    Diamond Jewellery does not endorse or approve any third-party
                                    alterations or treatments to any Diamond Curated gemstones. Such
                                    processes may be temporary and could lessen the durability and value
                                    of the gemstone(s). Accordingly, any third-party alterations or
                                    treatments will void the Diamond Curated Lifetime Manufacturing
                                    Warranty.
                                </li>
                                <li>
                                    Any third-party alterations or treatments to your gem(s) will void
                                    your Lifetime Manufacturing Warranty.
                                </li>
                            </ul>
                        </div>

                        <div className="section">
                            <p>
                                Diamond Jewellery is dedicated to delivering exceptional and socially
                                responsible gemstones that last a lifetime.
                            </p>
                        </div>

                    </div>
                </div>

                <h2 className="our-gemstones-title curation-process-title f-38 f-m-34 w-300 l-h-1-1">Expert Guidance</h2>
                <hr className="our-gemstones-title-line"></hr>
                <p className='our-gemstones-subtitle f-13 f-m-15 w-300 l-h-1-4 ff-c'>Empowering you with insights for selecting and acquiring the ideal stone.</p>
                <YouMayAlsoLikeBlog blog={blog} sliderConfig={{ arrow: true }} />



                <ProductFAQ data={FAQ_DATA} title="Curation" subtitle="Your questions about our signature gemstone range, answered." />

                <UvpIconFooter data={DIAMOND_CURATED_UVPS} />
            </div>
        </>
    );
}



const STONES = [
    {
        title: 'MOISSANITE DETAILS',
        image:
            'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/HASH__1qm0h14euw74th_14smcarwfrpcijw23o_bb503280a1e77559a497b2a76f0367bd__HASH_300x300.jpg?v=1719579812',
        details: {
            'ID NUMBER': 'CCM12345678',
            COLOUR: 'DEF (Colourless)',
            CLARITY: 'VVS1 - VVS2',
            CUT: 'Brilliant',
            SHAPE: 'Radiant',
            SIZE: '8×6mm - 1.75ct*',
        },
    },
    {
        title: 'SAPPHIRE DETAILS',
        image:
            'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/HASH__1r_tlsjlqjzxrmvancub4naopndd1ay4h_14d8f3ae3f2083e3bec87afa9e75a781__HASH_300x300.jpg?v=1719548134',
        details: {
            'ID NUMBER': 'CCS12345678',
            COLOUR: 'Scarlet Red',
            CLARITY: 'Eye clean',
            SHAPE: 'Round',
            SIZE: '8mm - 1.80ct*',
        },
    },
];

const FAQ_DATA = [
    {
        question: 'What are lab grown gemstones?',
        answer: (
            <p>
                Lab grown gemstones share the identical chemical composition and
                captivating sparkle of mined gemstones. Grown in controlled
                environments with cutting-edge technology, they eliminate the need
                for mining, ensuring their origins are both traceable and responsible.
                Compared to mined gemstones, lab-grown stones boast a smaller carbon
                footprint and environmental impact. Opting for fine jewellery crafted
                with lab-grown gemstones represents a conscientious and responsible
                choice.
            </p>
        ),
    },

    {
        question: 'Why should you choose a Diamond Curated lab grown gemstone?',
        answer: (
            <p>
                Diamond Curated lab grown gemstones are hand-selected for exceptional
                colour, clarity, and cut. They are grown using advanced technology
                and strict quality control. By being grown in a controlled lab
                environment, they are free from the ethical concerns of mining.
            </p>
        ),
    },

    {
        question: 'How do I claim my Lifetime Manufacturing Warranty?',
        answer: (
            <p>
                In the rare instance that you need to claim your Lifetime Manufacturing
                Warranty on your Diamond Curated lab grown gemstone, please{' '}
                <a className="fancy" href="/contact">
                    contact us here.
                </a>
            </p>
        ),
    },

    {
        question:
            'What is the difference between lab grown sapphires and mined sapphires?',
        answer: (
            <p>
                Lab grown and mined sapphires are identical twins in terms of chemical
                composition, crystal structure, and physical properties. The key
                difference is their origin: lab grown sapphires are born in controlled
                environments, while mined sapphires are formed over millions of years
                in the Earth&apos;s crust.
            </p>
        ),
    },

    {
        question: 'What are the differences between moissanite and diamonds?',
        answer: (
            <p>
                When choosing between moissanite and diamonds, both gems offer unique
                strengths. Moissanite is known to be an accessible option with brilliant
                sparkle due to its higher refractive index. Diamonds, on the other hand,
                have a timeless appeal and are often seen as symbols of enduring love
                and tradition. Both stones boast remarkable durability, making them
                perfect for any jewellery piece.
            </p>
        ),
    },
];


const DIAMOND_CURATED_UVPS = [
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


const BLOG_QUERY = `#graphql
query BlogPosts($blogHandle: String!, $language: LanguageCode, $country: CountryCode)
@inContext(language: $language, country: $country) {
  blog(handle: $blogHandle) {
    handle
    articles(first: 10) {
      nodes {
        id
        handle
        title
        publishedAt
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
}
`;

export async function loader({ context }) {
  throw new Response("Not Found", { status: 404 });
    const { storefront } = context;
    const { blog } = await storefront.query(BLOG_QUERY, {
        variables: { blogHandle: 'moissanite-guidance' },
    });

    if (!blog) {
        console.warn("Blog 'moissanite-guidance' not found");
    }

    return { blog };
}




