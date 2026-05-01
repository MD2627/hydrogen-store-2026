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
            <div className="page-width">
                <div className="collection-links-container">
                    <div className="collection-links-header">
                        <h3 className="section-title">
                            Shop by Style
                        </h3>
                    </div>
                    <nav className="collection-links-grid" aria-label="Collection directory">
                        {data.map((link, index) => (
                            <Link key={index} to={link.url} className="collection-link-item ff-c f-13 f-m-12 w-400 black-color">
                                <span className="link-label">{link.label}</span>
                                <span className="link-arrow">
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </section>
    );
}
