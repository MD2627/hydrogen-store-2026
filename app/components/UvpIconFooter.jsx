import React from 'react';
import { Link } from 'react-router';

export function UvpIconFooter({ data = [] }) {
    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <>

            <section className='uvp-icon-section'>
                <div className="icons-container">
                    {data.map((item, index) => {
                        if (!item.link || !item.svg || !item.label) return null;

                        return (
                            <Link key={index} to={item.link} className="uvp-promo">
                                <div
                                    className="uvp-icon"
                                    dangerouslySetInnerHTML={{ __html: item.svg }}
                                />
                                <div
                                    className="uvp-label w-300"
                                    dangerouslySetInnerHTML={{ __html: item.label }}
                                />
                            </Link>

                        );
                    })}
                </div>
            </section>
        </>
    );
}
