import { useLoaderData } from 'react-router';
import { useEffect } from 'react';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductFAQ } from '~/components/ProductFAQ';
import { CollectionBanner } from '~/components/CollectionBanner';

export const meta = () => {
    return [{ title: 'Impact Report | Cullen Jewellery' }];
};

export async function loader(args) {
    return {
        bannerData: BANNER_DATA
    };
}

export default function CullenInitiatives() {
    const data = useLoaderData();

    useEffect(() => {
        const elements = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    } else {
                        entry.target.classList.remove('is-visible');
                    }
                });
            },
            {
                threshold: 0.25,
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="impact-report-page">
            <CollectionBanner collection={data.bannerData} />

            {/* SUMMARY */}
            <section className="impact-report-summary-section">
                <h2>
                    "By making informed and ethical decisions in our three
                    operational pillars –
                    <span> People, Planet and Product </span>
                    – and sharing our progress and learning, we aim to play a
                    part in protecting and regenerating the environment, make a
                    positive social contribution and demonstrate accountability
                    for our actions."
                </h2>

                <div className="impact-report-pillars">
                    {IMPACT_PILLARS.map((pillar, index) => (
                        <div
                            key={pillar.number}
                            className="impact-report-pillar reveal"
                            style={{ transitionDelay: `${index * 0.15}s` }}
                        >
                            <div className="impact-report-pillar-heading">
                                <div className="impact-report-pillar-number">
                                    {pillar.number}
                                </div>
                                <h3 className="impact-report-pillar-title">
                                    {pillar.title}
                                </h3>
                            </div>

                            <div className="impact-report-pillar-body">
                                <p>{pillar.description}</p>
                                {pillar.highlight && (
                                    <p className="impact-report-pillar-highlight">
                                        {pillar.highlight}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="impact-report-downloads">
                    <div className="impact-report-download-block">
                        <h2>Read the Full Report</h2>
                        <p>
                            Explore the current Impact Report with comprehensive
                            insights and our key initiatives in detail.
                        </p>
                        <a
                            className="impact-report-download-btn"
                            href={REPORT_DOWNLOADS.current.href}
                            rel="noreferrer"
                        >
                            <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.875 10.583v3.175a2.112 2.112 0 0 1-2.117 2.117H3.175a2.112 2.112 0 0 1-2.117-2.117v-3.175" className="stroke" style={{ fill: "none", strokeWidth: 1.0583125, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 4, strokeDasharray: "none", }} />
                                <path d="M8.466 1.058v11.377M4.762 8.731l3.705 3.704 3.704-3.704" className="stroke" style={{ fill: "none", strokeWidth: 1.05831, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 4, strokeDasharray: "none", strokeOpacity: 1, }} />
                            </svg>
                            {REPORT_DOWNLOADS.current.label}
                        </a>
                    </div>

                    <div className="impact-report-download-block impact-report-download-block--past">
                        <h2>Past Reports</h2>
                        <p>
                            A look back at the commitments and progress we’ve
                            made.
                        </p>
                        <a
                            className="impact-report-download-btn"
                            href={REPORT_DOWNLOADS.past.href}
                            rel="noreferrer"
                        >
                            <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.875 10.583v3.175a2.112 2.112 0 0 1-2.117 2.117H3.175a2.112 2.112 0 0 1-2.117-2.117v-3.175" className="stroke" style={{ fill: "none", strokeWidth: 1.0583125, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 4, strokeDasharray: "none", }} />
                                <path d="M8.466 1.058v11.377M4.762 8.731l3.705 3.704 3.704-3.704" className="stroke" style={{ fill: "none", strokeWidth: 1.05831, strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: 4, strokeDasharray: "none", strokeOpacity: 1, }} />
                            </svg>
                            {REPORT_DOWNLOADS.past.label}
                        </a>
                    </div>
                </div>
            </section>

            <div className="impact-report-faq-section">
                <ProductFAQ data={FAQ_DATA} title="FAQs" />
            </div>

            <UvpIconFooter data={OUR_STORY_UVPS} />
        </div>
    );
}

const BANNER_DATA = {
    handle: 'impact-report',
    title: null,
    description: null,
    image: null,
};

const IMPACT_PILLARS = [
    {
        number: '01',
        title: 'People',
        description:
            'At Cullen, people matter — our clients, team, and communities. We already make accessible, responsible jewellery using lab-grown diamonds, treat staff fairly, and support good causes like child sponsorships and tree planting. We’ve improved training, career paths, and created a workplace where people feel they belong.',
        highlight:
            'In 2025, we plan to do even more: improve safety, grow our volunteer leave program, give clearer job paths, and boost leadership training. We’ll also track progress better using objectives and key results (OKRs) and surveys. Everything we do aims to create a fairer, kinder workplace and help others while making beautiful, meaningful jewellery.',
    },
    {
        number: '02',
        title: 'Product',
        description:
            'Cullen exclusively uses lab-grown diamonds, sapphires and moissanite across our jewellery. We recycle precious metals. Most of our work happens online, helping us save energy and reduce waste. Our suppliers are chosen carefully—we want fair pay, no child labour, and low harm to the planet.',
        highlight:
            'In 2025, we plan to use more eco-friendly materials, cut down waste even more, and choose only suppliers who meet strict standards. We’ll also create clearer plans for how we make jewellery, so every piece is crafted the Cullen way.',
    },
    {
        number: '03',
        title: 'Planet',
        description:
            'Cullen has reduced its impact on the planet by using lab grown, carbon-neutral diamonds and made-to-order products. We recycle gold, use less paper, and plant one tree for every order. Our clients trust us to provide beautiful jewellery without harming the Earth. We’ve already helped plant 100,000+ trees.',
        highlight:
            'In 2025, we’ll continue cutting carbon, plant more trees, and teach our team more about sustainability. We want to keep doing business in a way that helps people, and the planet thrive.',
    },
];

const REPORT_DOWNLOADS = {
    current: {
        label: 'DOWNLOAD 2024/25 REPORT',
        href: 'https://drive.google.com/uc?export=download&id=1mVY0Hs_A20Rn-3Eo2R3CXaERqMCy8Zrr',
    },
    past: {
        label: 'DOWNLOAD 2023 REPORT',
        href: 'https://drive.google.com/uc?id=1bWrIODkqjmmemtrqo5TOGR-7WGp2gLDl&authuser=0&export=download',
    },
};

const FAQ_DATA = [
    {
        question: "How does Cullen ensure its diamonds are responsible?",
        answer: "All Cullen Jewellery diamonds are lab-grown and carbon neutral. These diamonds are produced in facilities using advanced processes like HPHT and CVD. Carbon emissions from production are offset via verified environmental projects such as renewable energy and reforestation. Additionally, Cullen Jewellery plants one tree for every order, helping restore ecosystems impacted by traditional diamond mining.",
    },
    {
        question: "What makes Cullen's approach to employee culture unique?",
        answer: "Cullen Jewellery practices a people-first philosophy rooted in their brand promise of “unreasonable care.” Employees receive above-award wages, structured career paths, and professional development opportunities. The company also supports volunteerism by offering an additional week of paid leave for volunteering, and sponsors a child through Baptist World Aid for every full-time hire. The company is also implementing a FAIR (Fairness, Access, Inclusion, Resources) model to embed diversity and inclusion into its workplace.",
    },
    {
        question: "What is Cullen’s strategy for responsible material sourcing and waste reduction?",
        answer:
            "Cullen Jewellery has expanded the use of recycled metals, and in 2024 alone, recovered over 516 grams of precious metals including gold, silver, and platinum. They maintain a Precious Metal Recycling Initiative, work with suppliers certified by the Responsible Jewellery Council, and are working toward a fully circular production system. For 2025, their goals include expanding sustainable sourcing, reducing packaging waste, and enhancing supplier accountability with a new Supplier Code of Conduct",
    },
    {
        question: "How does Cullen support global and local communities?",
        answer:
            "Beyond environmental sustainability, Cullen contributes to global and local causes. The company donates to Trees For The Future, Street Peace, Baptist World Aid, and more. Community engagement extends through volunteer work and sponsorships for local charities, sports clubs, and research institutes like Peter MacCallum Cancer Centre. Their social impact includes both philanthropy and direct community engagement.",
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