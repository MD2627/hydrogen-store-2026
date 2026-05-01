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
            <div className='page-width'>
                <div className="collection-content-grid">
                    {data.sections.map((section, index) => (
                        <article className="collection-content-card" key={index}>
                            <div className="content-card-inner">
                                <h3 className="content-card-title ff-n f-24 f-m-20 w-400 black-color">
                                    {section.heading}
                                </h3>
                                <div className="collection-content-text">
                                    {section.paragraphs.map((text, i) => (
                                        <RichText
                                            key={i}
                                            tag="p"
                                            html={text}
                                            className="sb-description"
                                        />
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
