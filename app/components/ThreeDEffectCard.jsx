import { useEffect, useRef, useState } from 'react';

export function ThreeDEffectCard({ stones = [] }) {
    const cardRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const stone = stones[activeIndex];

    /* ---------------------------
       AUTO ROTATE (every 3.5s)
       pauses when flipped
    ---------------------------- */
    useEffect(() => {
        if (isFlipped || stones.length <= 1) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % stones.length);
        }, 3500);

        return () => clearInterval(timer);
    }, [isFlipped, stones.length]);

    /* ---------------------------
       HOVER TILT
    ---------------------------- */
    const handleMouseMove = (e) => {
        if (isFlipped || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - rect.height / 2) / rect.height) * -10;
        const rotateY = ((x - rect.width / 2) / rect.width) * 10;

        cardRef.current.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    };

    const resetTilt = () => {
        if (cardRef.current) {
            cardRef.current.style.transform =
                'rotateX(0deg) rotateY(0deg)';
        }
    };

    if (!stone) return null;

    return (
        <section className="certification-section">
            <h2 className="certification-title our-gemstones-title curation-process-title f-38 f-m-34 w-300 l-h-1-1">Certification</h2>
            <hr className="our-gemstones-title-line"></hr>

            <div className="certification-stage">
                <div
                    className="certification-card"
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={resetTilt}
                    onClick={() => setIsFlipped((p) => !p)}
                >
                    <div className="inner-green-radiant">
                        <div
                            className={`certification-flip ${isFlipped ? 'is-flipped' : ''
                                }`}
                        >
                            {/* FRONT */}
                            <div className="certification-face front">
                                <div className="top-title-card">
                                    <h3 className="certification-brand">
                                        Cullen Curated
                                    </h3>
                                    <span className="certification-label">
                                        CERTIFICATION
                                    </span>
                                </div>

                                <img
                                    src={stone.image}
                                    alt={stone.title}
                                    className="certification-stone"
                                />

                                <h4 className="certification-stone-title">
                                    {stone.title}
                                </h4>

                                <div className="certification-details">
                                    {Object.entries(stone.details).map(
                                        ([k, v]) => (
                                            <div
                                                key={k}
                                                className="certification-row"
                                            >
                                                <span>{k}:</span>
                                                <span>{v}</span>
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="disclaimer">
                                    <p className="disclaimer-title">Lifetime Manufacturing Warranty:</p>
                                    <p className="disclaimer-text">
                                        THE SOLE AND EXCLUSIVE REMEDY FOR ANY DEFECT COVERED BY THE LIFETIME MANUFACTURING WARRANTY IS THAT, DURING YOUR LIFETIME, CULLEN JEWELLERY WILL, AT ITS OPTION, REPAIR THE ITEM(S), OR REPLACE WITH ITEM(S) OF EQUAL OR GREATER VALUE, WITHOUT CHARGE TO YOU. ALL IMPLIED
                                        WARRANTIES, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, ARE HEREBY DISCLAIMED.
                                    </p>
                                </div>

                            </div>

                            {/* BACK */}
                            <div className="certification-face back">
                                <div className="certification-back-logo">
                                    <svg
                                        viewBox="0 0 512 512"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="m35.842 212.644 235.429 233.617 197.267-195.697h-11.05L271.271 398.318 
               87.106 212.644l79.825-81.636h240.44l-37.316-37.135h-215.2Z"
                                            fill="#fff"
                                            style={{ strokeWidth: 3.77944 }}
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="certification-cta">
                ⓘ You can access your certification in your Client Portal
            </div>
        </section >
    );
}
