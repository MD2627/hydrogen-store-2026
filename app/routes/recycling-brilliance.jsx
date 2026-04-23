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
