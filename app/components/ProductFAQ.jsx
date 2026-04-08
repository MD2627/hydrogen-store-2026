import { useRef, useState } from 'react';
import { RichText } from './RichText';

export function ProductFAQ({ data = [], title = "FAQ", subtitle = "Your questions, answered." }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const contentRefs = useRef([]);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (!Array.isArray(data) || data.length === 0) return null;

    return (
        <>
            <div className="faq-geral-wrpper">
                <div className="faq-header">
                    <h2 className='w-300'>{title}</h2>
                    <p className='w-300'>{subtitle}</p>
                </div>

                <section className="faq-body" >
                    <div className="faq-container">
                        {data.map((item, index) => {
                            const isOpen = activeIndex === index;
                            const contentEl = contentRefs.current[index];

                            return (
                                <div
                                    key={index}
                                    className={`faq-item ${isOpen ? 'active' : ''}`}
                                >
                                    <div
                                        className="faq-question w-400"
                                        onClick={() => toggle(index)}
                                    >
                                        <span className="faq-icon">
                                            <svg
                                                className="icon-closed"
                                                viewBox="0 0 16.933 16.933"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="m2.117 5.292 6.35 6.35 6.35-6.35"
                                                    style={{
                                                        fill: 'none',
                                                        stroke: '#000',
                                                        strokeWidth: 1.058,
                                                        strokeLinecap: 'round',
                                                        strokeLinejoin: 'round',
                                                    }}
                                                />
                                            </svg>

                                            <svg
                                                className="icon-open"
                                                viewBox="0 0 16.933 16.933"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M2.117 8.467h12.7"
                                                    style={{
                                                        fill: 'none',
                                                        stroke: '#000',
                                                        strokeWidth: 1.058,
                                                        strokeLinecap: 'round',
                                                    }}
                                                />
                                            </svg>
                                        </span>

                                        <span>{item.question}</span>
                                    </div>

                                    <div
                                        className="faq-answer"
                                        style={{
                                            height:
                                                isOpen && contentEl
                                                    ? contentEl.scrollHeight
                                                    : 0,
                                        }}
                                    >
                                        <div
                                            ref={(el) => (contentRefs.current[index] = el)}
                                            className="faq-answer-inner w-300"
                                        >
                                            {typeof item.answer === 'string' ? (
                                                <RichText html={item.answer} />
                                            ) : (
                                                item.answer
                                            )}
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </>
    );
}
