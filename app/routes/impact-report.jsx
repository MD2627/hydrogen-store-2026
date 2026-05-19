import { useLoaderData } from 'react-router';
import { useEffect } from 'react';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductFAQ } from '~/components/ProductFAQ';
import { CollectionBanner } from '~/components/CollectionBanner';

export const meta = () => {
    return [{ title: 'Impact Report | Diamond Jewellery' }];
};

export async function loader(args) {
    throw new Response("Not Found", { status: 404 });
    return {
        bannerData: BANNER_DATA
    };
}

export default function DiamondInitiatives() {
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
                            className="btn"
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
                            className="btn"
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
            'At Diamond, people matter — our clients, team, and communities. We already make accessible, responsible jewellery using lab-grown diamonds, treat staff fairly, and support good causes like child sponsorships and tree planting. We’ve improved training, career paths, and created a workplace where people feel they belong.',
        highlight:
            'In 2025, we plan to do even more: improve safety, grow our volunteer leave program, give clearer job paths, and boost leadership training. We’ll also track progress better using objectives and key results (OKRs) and surveys. Everything we do aims to create a fairer, kinder workplace and help others while making beautiful, meaningful jewellery.',
    },
    {
        number: '02',
        title: 'Product',
        description:
            'Diamond exclusively uses lab-grown diamonds, sapphires and moissanite across our jewellery. We recycle precious metals. Most of our work happens online, helping us save energy and reduce waste. Our suppliers are chosen carefully—we want fair pay, no child labour, and low harm to the planet.',
        highlight:
            'In 2025, we plan to use more eco-friendly materials, cut down waste even more, and choose only suppliers who meet strict standards. We’ll also create clearer plans for how we make jewellery, so every piece is crafted the Diamond way.',
    },
    {
        number: '03',
        title: 'Planet',
        description:
            'Diamond has reduced its impact on the planet by using lab grown, carbon-neutral diamonds and made-to-order products. We recycle gold, use less paper, and plant one tree for every order. Our clients trust us to provide beautiful jewellery without harming the Earth. We’ve already helped plant 100,000+ trees.',
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
        question: "How does Diamond ensure its diamonds are responsible?",
        answer: "All Diamond Jewellery diamonds are lab-grown and carbon neutral. These diamonds are produced in facilities using advanced processes like HPHT and CVD. Carbon emissions from production are offset via verified environmental projects such as renewable energy and reforestation. Additionally, Diamond Jewellery plants one tree for every order, helping restore ecosystems impacted by traditional diamond mining.",
    },
    {
        question: "What makes Diamond's approach to employee culture unique?",
        answer: "Diamond Jewellery practices a people-first philosophy rooted in their brand promise of “unreasonable care.” Employees receive above-award wages, structured career paths, and professional development opportunities. The company also supports volunteerism by offering an additional week of paid leave for volunteering, and sponsors a child through Baptist World Aid for every full-time hire. The company is also implementing a FAIR (Fairness, Access, Inclusion, Resources) model to embed diversity and inclusion into its workplace.",
    },
    {
        question: "What is Diamond’s strategy for responsible material sourcing and waste reduction?",
        answer:
            "Diamond Jewellery has expanded the use of recycled metals, and in 2024 alone, recovered over 516 grams of precious metals including gold, silver, and platinum. They maintain a Precious Metal Recycling Initiative, work with suppliers certified by the Responsible Jewellery Council, and are working toward a fully circular production system. For 2025, their goals include expanding sustainable sourcing, reducing packaging waste, and enhancing supplier accountability with a new Supplier Code of Conduct",
    },
    {
        question: "How does Diamond support global and local communities?",
        answer:
            "Beyond environmental sustainability, Diamond contributes to global and local causes. The company donates to Trees For The Future, Street Peace, Baptist World Aid, and more. Community engagement extends through volunteer work and sponsorships for local charities, sports clubs, and research institutes like Peter MacCallum Cancer Centre. Their social impact includes both philanthropy and direct community engagement.",
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