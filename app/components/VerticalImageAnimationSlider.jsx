import React, { useEffect, useRef, useState } from 'react';

export default function VerticalImageAnimationSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const slideRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.dataset.index);
                        setActiveIndex(index);
                    }
                });
            },
            {
                threshold: 0.6,
            }
        );

        slideRefs.current.forEach((slide) => observer.observe(slide));

        return () => observer.disconnect();
    }, []);

    const sectionRef = useRef(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        if (typeof window === 'undefined') return; // SSR safety

        lastScrollY.current = window.scrollY;

        const section = sectionRef.current;
        if (!section) return;

        const topTrigger = section.querySelector('.vs-trigger--top');
        const bottomTrigger = section.querySelector('.vs-trigger--bottom');

        const observer = new IntersectionObserver(
            (entries) => {
                const currentScrollY = window.scrollY;
                const scrollingDown = currentScrollY > lastScrollY.current;
                lastScrollY.current = currentScrollY;

                entries.forEach((entry) => {
                    // TOP trigger
                    if (entry.target === topTrigger) {
                        if (entry.isIntersecting && scrollingDown) {
                            section.classList.add('is-inview');
                        }
                        if (entry.isIntersecting && !scrollingDown) {
                            section.classList.remove('is-inview');
                        }
                    }

                    // BOTTOM trigger
                    if (entry.target === bottomTrigger) {
                        if (entry.isIntersecting && scrollingDown) {
                            section.classList.remove('is-inview');
                        }
                        if (entry.isIntersecting && !scrollingDown) {
                            section.classList.add('is-inview');
                        }
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: '0px 0px -20% 0px',
            }
        );

        observer.observe(topTrigger);
        observer.observe(bottomTrigger);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="vertical-story" ref={sectionRef}>
            <div className="vs-trigger vs-trigger--top" />
            <div className="vs-trigger vs-trigger--bottom" />
            {/* Fixed Background */}
            <div className="bg-wrapper">
                {SLIDES.map((slide, i) =>
                    slide.bg ? (
                        <div
                            key={slide.id}
                            className={`bg-image ${activeIndex === i ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${slide.bg})` }}
                        />
                    ) : null
                )}
            </div>

            {/* Scroll Content */}
            <div className="slides">
                {SLIDES.map((slide, i) => (

                    <div
                        key={slide.id}
                        className={`slide ${activeIndex === i ? 'active' : ''}`}
                        ref={(el) => (slideRefs.current[i] = el)}
                        data-index={i}
                    >

                        <div className="slide-content">
                            <div className="text-content-animation">
                                <h2>{slide.title}</h2>

                                {slide.text &&
                                    slide.text.map((t, idx) => <p key={idx}>{t}</p>)}
                            </div>

                            {slide.image && (
                                <img src={slide.image} alt="" className="inline-image" />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress Dots */}
            <div className="progress">
                <div className="progress-line">
                    <div
                        className="progress-fill"
                        style={{
                            height: `${(activeIndex / (SLIDES.length - 1)) * 100}%`,
                        }}
                    />
                </div>

                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        className={`progress-dot ${activeIndex === i ? 'active' : ''}`}
                        onClick={() => {
                            slideRefs.current[i]?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                            });
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

const SLIDES = [
    {
        id: 1,
        bg: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01_365ef31c-b3ef-4d05-a4f9-9619b283e429_1500x.png?v=1742169068',
        title: 'There is no debating the impact of mined diamonds.',
        text: [
            'Waterway contamination. Deforestation. Permanent habitat loss. Unsafe working conditions. Air pollution. Human rights abuse.',
            'Diamond mining is inherently unsustainable',
            'Armed with this knowledge, as a brand we have always exclusively offered lab grown diamonds.',
        ],
    },
    {
        id: 2,
        bg: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/02_d6a4e347-7cd4-4f2a-b267-f2a4f769806f_1500x.png?v=1742169067',
        title: 'The truth is: lab grown diamonds and gemstones aren’t sustainable either.',
        text: [
            'Producing a finished diamond, whether mined or lab, requires significant energy resources.',
            'Growing a 1 carat diamond requires up to 215 kWh of energy.',
            'The carbon footprint of a 1 carat lab diamond can be over 1 tonne of CO2e emissions — equivalent to almost 5000 kilometres driven by an average gasoline-powered car.',
        ],
    },
    {
        id: 3,
        bg: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/03_b340d020-0ab8-4ea0-802a-1b7b39afb9cc_1500x.png?v=1742169063',
        title: 'Diamonds last forever, their carbon footprint shouldn’t.',
        text: [
            'Through our industry leading methodology we offset more carbon than produced so you can be sure that your lab grown diamond is carbon neutral... and some.',
            'This is made possible through the investment in verified renewable energy projects in the countries and communities where the gemstones are grown, ensuring that the carbon emissions from the diamond-growing process are fully offset.',
            'By doing so we achieve carbon neutrality for all of our lab grown gemstones.',
        ],
    },
    {
        id: 4,
        bg: null,
        title: 'Carbon neutral gemstones are the',
        text: [
            'new standard.',
        ],
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Screenshot_2025-03-20_at_5.33.51_pm_1500x.png?v=1742531937',
    },
];
