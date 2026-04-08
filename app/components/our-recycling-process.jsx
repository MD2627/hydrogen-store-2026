import React, { useEffect } from 'react';

export function OurRecyclingProcess() {
    useEffect(() => {
        const elements = document.querySelectorAll('.process-step.reveal');

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
                threshold: 0.1,
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="our-recycling-process">
            <div className="page-width">
                <header className="recycling-process-header">
                    <h2 className="ff-a f-32 w-300">Our Recycling Process</h2>
                </header>

                <div className="process-steps">
                    {/* STEP 1 */}
                    <div className="process-step reveal">
                        <div className="process-image-container">
                            <img
                                src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/3397-4x5_800x800.jpg?v=1733718537"
                                alt="Step 1: Collection"
                                className="process-image"
                            />
                        </div>
                        <div className="process-content">
                            <h3 className="ff-a f-24 w-300">Step 1: Collection</h3>
                            <div className="process-description ff-c f-13 w-300">
                                <p>
                                    Initially, our process begins with meticulously collecting all workshop dust, shavings, and filings. Every speck and fragment is carefully gathered, either manually or through our industrial equipment, ensuring no material goes to waste. These precious remnants undergo a thorough sorting and refining procedure.
                                </p>
                                <p>
                                    In addition to our waste collection, we reuse the precious metals from rings created in our R&D initiatives. This is where we test new designs and different crafting techniques. Of those that do not pass our strict quality control or durability tests, we collect them, refine them and reuse the precious metal again.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* STEP 2 */}
                    <div className="process-step reveal">
                        <div className="process-image-container">
                            <img
                                src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/3449-4x5_800x800.jpg?v=1726125746"
                                alt="Step 2: Refining"
                                className="process-image"
                            />
                        </div>
                        <div className="process-content">
                            <h3 className="ff-a f-24 w-300">Step 2: Refining</h3>
                            <div className="process-description ff-c f-13 w-300">
                                <p>
                                    The refining process involves smelting the collected material and separating the precious metal from the impurities. This is then followed by chemical treatments to purify further. Electrolysis is then used for additional refinement, ultimately resulting in a pure precious metal ready for use.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* STEP 3 */}
                    <div className="process-step reveal">
                        <div className="process-image-container">
                            <img
                                src="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/3546-4x5_small_36ef694a-5d0b-4a07-8d7b-787fecc914bc_800x800.jpg?v=1726125747"
                                alt="Step 3: Reuse"
                                className="process-image"
                            />
                        </div>
                        <div className="process-content">
                            <h3 className="ff-a f-24 w-300">Step 3: Reuse</h3>
                            <div className="process-description ff-c f-13 w-300">
                                <p>
                                    Once we have refined the precious metals in our desired alloys or pure metals, we use them in our clients' resizes and repairs, eliminating the need to use virgin gold.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
