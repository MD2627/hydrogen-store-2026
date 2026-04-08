import React from 'react';
import { RichText } from './RichText';

/**
 * Component to display SEO content sections on collection pages.
 * @param {Object} props
 * @param {Object} props.data - Data object containing sections
 * @param {Array} props.data.sections - Array of section objects { heading, paragraphs[] }
 */
export function CollectionContentSection({ data }) {
    if (!data || !Array.isArray(data.sections)) return null;

    return (
        <section className="collection-content-section">
            <div className="collection-content-wrapper">
                {data.sections.map((section, index) => (
                    <div className="collection-content-block" key={index}>
                        {/* HEADING */}
                        <h2 className="collection-content-heading ff-n f-16 w-400 black-color">
                            {section.heading}
                        </h2>

                        {/* TEXT */}
                        <div className="collection-content-text ff-c f-13 w-300 black-color">
                            {section.paragraphs.map((text, i) => (
                                <RichText
                                    key={i}
                                    tag="p"
                                    html={text}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
