import { useState } from 'react';
import { RichText } from './RichText';

export function ProductFAQ({ data = [], title = "FAQ", subtitle = "Your questions, answered." }) {
    const [expandedIndex, setExpandedIndex] = useState(0); // Default first one open for discovery

    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <section className="faq-v3">
            <div className="page-width flex-container">
                <div className="faq-v3-sidebar">
                    <div className="faq-v3-sticky">
                        <span className="section-subtitle">Support</span>
                        <h2 className="section-title">{title}</h2>
                        <p className="faq-v3-subtitle">{subtitle}</p>
                        <div className="faq-v3-contact">
                            <p>Need more help?</p>
                            <a href="/contact" className="faq-v3-contact-link">Contact our team</a>
                        </div>
                    </div>
                </div>

                <div className="faq-v3-list">
                    {data.map((item, index) => {
                        const isExpanded = expandedIndex === index;
                        return (
                            <div 
                                key={index} 
                                className={`faq-v3-item ${isExpanded ? 'is-active' : ''}`}
                                onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                            >
                                <div className="faq-v3-item-header">
                                    <span className="faq-v3-item-num">{(index + 1).toString().padStart(2, '0')}</span>
                                    <h3 className="faq-v3-item-q">{item.question}</h3>
                                    <span className="faq-v3-item-arrow">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                </div>
                                <div className="faq-v3-item-body">
                                    <div className="faq-v3-item-ans">
                                        {typeof item.answer === 'string' ? (
                                            <RichText html={item.answer} />
                                        ) : (
                                            item.answer
                                        )}
                                    </div>
                                </div>
                                <div className="faq-v3-item-border"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
