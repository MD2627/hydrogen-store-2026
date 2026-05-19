import { useLoaderData } from 'react-router';
import { CollectionBanner } from '~/components/CollectionBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import NewsletterForm from '~/components/Footer';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { ProductFAQ } from '~/components/ProductFAQ';
import { OurRecyclingProcess } from '~/components/our-recycling-process';

/**
 * @type {Route.MetaFunction}
 */
// export const meta = () => {
//     return [
//         { title: 'Recycling Brilliance' },
//         {
//             name: 'description',
//             content: 'Learn about our precious metal recycling initiatives and how we contribute to a sustainable, circular economy in the jewellery industry.'
//         },
//     ];
// };

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader() {
    throw new Response("Not Found", { status: 404 });
    return {};
}

export default function RecyclingBrilliance() {
    const data = useLoaderData();

    return (
        <div className="recycling-page">
            <StoryCraftBanner {...BANNER_DATA} />


            <div className="rich-text-section">
                {ABOUT_SECTION_DATA.title && <h2 className="f-32 w-300">{ABOUT_SECTION_DATA.title}</h2>}

                {ABOUT_SECTION_DATA.paragraphs.map((text, index) => (
                    <p className="f-13 w-300" key={index}>
                        {text}
                    </p>
                ))}
            </div>

            <StoryCraftBanner
                videoSrc="https://cdn.shopify.com/videos/c/o/v/edef687ec328487a8b1cd8c3b0b7e396.mp4"
                title="Join us in a conscious commitment to the planet and ensure no resources go to waste."
                ctaText=""
                ctaLink=""
                extraClass="story-craft-banner--recycling-brilliance"
            />

            <section className="circular-economy-section">
                <img src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/WHOLE_Diagram.svg?v=1726123994" alt="" />
                <h2>Creating a Circular Economy</h2>
            </section>

            <StoryCraftBanner
                videoSrc="https://cdn.shopify.com/videos/c/o/v/9f0bc15add5140e098f185cd48d396e3.mp4"
                title="The differences between the precious metal, Gold."
                ctaText="Learn More"
                ctaLink="/hidden-page"
                extraClass="story-craft-banner--recycling-brilliance"
            />

            <OurRecyclingProcess />

            <ProductFAQ data={CYCLE_FAQ_DATA} title="Recycling" subtitle="Common queries and their answers about our circular economy initiatives." />

            <div className="newsletter-touch">

                <div className="two-parts-form">
                    <div class="shop-by-style-header">
                        <h2>Stay in Touch</h2>
                        <p>The latest on rings, diamonds, and more straight to your inbox.</p>
                    </div>
                    <NewsletterForm />
                </div>

            </div>

            <UvpIconFooter data={OUR_STORY_UVPS} />
        </div>
    );
}


// ============================================
// DATA CONFIGURATIONS
// ============================================

const BANNER_DATA = {
    imageSrc:
        'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Header_web_compressed_2000x2000.jpg?v=1726113808',
    title: 'Recycling Brilliance',
    subtitle: 'Precious Metal Recycling Initiative',
    extraClass: 'recycling-brilliance',
};

const ABOUT_SECTION_DATA = {
    title: 'About',
    paragraphs: [
        'We introduce our Precious Metal Recycling Initiative as an integral part of our commitment to reducing waste and recycling finite resources like gold and platinum.',

        'Through this initiative, we diligently collect and reuse precious metals that were removed during the crafting process. By proactively collecting workshop dust, shavings, and filings, we can refine the precious metals to their pure state or a desired alloy, allowing us to reuse them in our clients\' resizes and repairs.',

        'With this commitment and our crafted-to-order approach, we can craft fine jewellery responsibly and sustainably. By using premium precious metals and expert craftsmanship we can offer a Lifetime Manufacturing Warranty on all engagement, wedding and fashion rings.',
    ],
};

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

const CYCLE_FAQ_DATA = [
    {
        question: 'What are the environmental benefits of gold recycling?',
        answer: (
            <p>
                By using recycled gold, we can reduce the need for mining, which can cause
                habitat destruction, water pollution, and soil erosion. Recycling gold
                also helps decrease energy consumption and greenhouse gas emissions
                associated with mining, contributing to a more sustainable and
                environmentally friendly jewellery industry.
            </p>
        ),
    },

    {
        question: 'How much gold is wasted during the crafting process?',
        answer: (
            <>
                <p>
                    Through our precise3D casting techniques, we can
                    ensure that almost no gold is wasted during the crafting process. While
                    a small amount of gold is generally lost during the finishing touches,
                    such as stone setting, polishing, and claw shaping, we have implemented
                    meticulous collection methods to minimise gold waste in our workshops.
                </p>

                <p>
                    Gold lost during crafting is gathered using specialised bibs that
                    capture stray gold particles, allowing us to collect them for refining
                    and reuse. Our polishing machines also feature filters that trap gold
                    particles that may come loose during the polishing process, ensuring
                    even the finest particles are not lost.
                </p>

                <p>
                    Additionally, used polishing wheels and filters are added to our gold
                    recycling containers and refined to extract any remaining gold. This
                    careful attention to detail ensures that we reclaim and recycle nearly
                    100% of the lost gold in our workshop.
                </p>

                <p>
                    After collecting the gold dust, we run a magnet through it to separate
                    magnetic metals such as steel from saw blades or drill bits. This
                    process allows us to maintain the purity of the gold we will reuse.
                </p>
            </>
        ),
    },

    {
        question: 'What precious metals can be recycled?',
        answer: (
            <p>
                A wide range of precious metals can be recycled, including gold, silver, platinum, rhodium, palladium, and copper.
            </p>
        ),
    },

    {
        question: 'How does the precious metal recycling process work?',
        answer: (
            <p>
                The precious metal recycling process involves collecting waste and scrap
                metal, smelting it, and then separating the precious metal from the
                impurities. This is followed by chemical treatments to purify further.
                Electrolysis is then used for additional refinement, ultimately resulting
                in a pure precious metal ready for use.
            </p>
        ),
    },
];
