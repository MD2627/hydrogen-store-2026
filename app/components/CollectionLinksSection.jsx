import React from 'react';
import { Link } from 'react-router';

/**
 * Component to display a list of collection links (pills).
 * @param {Object} props
 * @param {Object[]} props.data - Array of link objects { label, url }
 */
export function CollectionLinksSection({ data }) {
    if (!data || !Array.isArray(data)) return null;

    return (
        <section className="collection-links-section">
            <div className="page-width collection-links-wrapper">
                <h3 className="collection-links-heading ff-c f-13 w-300 black-color">
                    Looking for a specific style? Choose from our collections below:
                </h3>
                <div className="collection-links-grid">
                    {data.map((link, index) => (
                        <Link key={index} to={link.url} className="collection-link-pill ff-c f-12 w-300 black-color">
                            {link.label}
                            <span className="arrow-icon">
                                <svg
                                    viewBox="0 0 16.933 16.933"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ width: '14px', height: '14px', display: 'block' }}
                                >
                                    <path
                                        d="m5.292 14.816 6.35-6.35-6.35-6.35"
                                        className="stroke"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.05831"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeOpacity="1"
                                    />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
