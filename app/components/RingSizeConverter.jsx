import { useState } from 'react';
import { NewContactBig } from '~/components/newContactBig';

const REGIONS = [
    { label: 'Australia & UK', value: 'AUS' },
    { label: 'United States & Canada', value: 'US' },
    { label: 'Europe', value: 'EUR' },
    { label: 'Diameter (mm)', value: 'Diameter' },
    { label: 'Circumference (mm)', value: 'Circumference' }
];

const SIZE_DATA = [
    { aus: 'E', us: '2.25', eur: '42.5', dia: '13.5', circ: '42.4' },
    { aus: 'E 1/2', us: '2.5', eur: '43', dia: '13.7', circ: '43.0' },
    { aus: 'F', us: '2.75', eur: '43.5', dia: '14', circ: '43.6' },
    { aus: 'F 1/2', us: '3', eur: '44', dia: '14.2', circ: '44.2' },
    { aus: 'G', us: '3.25', eur: '45', dia: '14.4', circ: '44.8' },
    { aus: 'G 1/2', us: '3.5', eur: '45.5', dia: '14.5', circ: '45.5' },
    { aus: 'H', us: '3.75', eur: '46', dia: '14.8', circ: '46.1' },
    { aus: 'H 1/2', us: '4', eur: '47', dia: '15', circ: '46.8' },
    { aus: 'I', us: '4.25', eur: '47.5', dia: '15.2', circ: '47.4' },
    { aus: 'I 1/2', us: '4.5', eur: '48', dia: '15.4', circ: '48.0' },
    { aus: 'J', us: '4.75', eur: '48.5', dia: '15.6', circ: '48.7' },
    { aus: 'J 1/2', us: '5', eur: '49', dia: '15.8', circ: '49.3' },
    { aus: 'K', us: '5.25', eur: '50', dia: '16', circ: '50.0' },
    { aus: 'K 1/2', us: '5.5', eur: '50.5', dia: '16.2', circ: '50.6' },
    { aus: 'L', us: '5.75', eur: '51', dia: '16.4', circ: '51.2' },
    { aus: 'L 1/2', us: '6', eur: '52', dia: '16.6', circ: '51.9' },
    { aus: 'M', us: '6.25', eur: '52.5', dia: '16.8', circ: '52.5' },
    { aus: 'M 1/2', us: '6.5', eur: '53', dia: '17', circ: '53.1' },
    { aus: 'N', us: '6.75', eur: '53.5', dia: '17.2', circ: '53.8' },
    { aus: 'N 1/2', us: '7', eur: '54', dia: '17.4', circ: '54.4' },
    { aus: 'O', us: '7.25', eur: '55', dia: '17.6', circ: '55.1' },
    { aus: 'O 1/2', us: '7.5', eur: '55.5', dia: '17.8', circ: '55.7' },
    { aus: 'P', us: '7.75', eur: '56', dia: '18', circ: '56.3' },
    { aus: 'P 1/2', us: '8', eur: '57', dia: '18.2', circ: '57.0' },
    { aus: 'Q', us: '8.25', eur: '57.5', dia: '18.4', circ: '57.6' },
    { aus: 'Q 1/2', us: '8.5', eur: '58', dia: '18.6', circ: '58.3' },
    { aus: 'R', us: '8.75', eur: '59', dia: '18.8', circ: '58.9' },
    { aus: 'R 1/2', us: '9', eur: '59.5', dia: '19', circ: '59.5' },
    { aus: 'S', us: '9.25', eur: '60', dia: '19.2', circ: '60.2' },
    { aus: 'S 1/2', us: '9.5', eur: '61', dia: '19.4', circ: '60.8' },
    { aus: 'T', us: '9.75', eur: '61.5', dia: '19.6', circ: '61.4' },
    { aus: 'T 1/2', us: '10', eur: '62', dia: '19.8', circ: '62.1' },
    { aus: 'U', us: '10.25', eur: '62.5', dia: '20', circ: '62.7' },
    { aus: 'U 1/2', us: '10.5', eur: '63', dia: '20.2', circ: '63.4' },
    { aus: 'V', us: '10.75', eur: '64', dia: '20.4', circ: '64.0' },
    { aus: 'V 1/2', us: '11', eur: '64.5', dia: '20.6', circ: '64.6' },
    { aus: 'W', us: '11.25', eur: '65', dia: '20.8', circ: '65.3' },
    { aus: 'W 1/2', us: '11.5', eur: '66', dia: '21', circ: '65.9' },
    { aus: 'X', us: '11.75', eur: '66.5', dia: '21.2', circ: '66.6' },
    { aus: 'X 1/2', us: '12', eur: '67', dia: '21.4', circ: '67.2' },
    { aus: 'Y', us: '12.25', eur: '67.5', dia: '21.6', circ: '67.8' },
    { aus: 'Y 1/2', us: '12.5', eur: '67.5', dia: '21.8', circ: '67.8' },
    { aus: 'Z', us: '12.75', eur: '68', dia: '22', circ: '68.5' },
    { aus: 'Z 1/2', us: '13', eur: '69', dia: '22.2', circ: '69.1' },
    { aus: 'Z+1', us: '13.25', eur: '70.5', dia: '22.4', circ: '70.4' },
    { aus: 'Z+2', us: '13.5', eur: '71', dia: '22.6', circ: '71.0' }
];

export function RingSizeConverter() {
    const [activeTab, setActiveTab] = useState('convert');
    const [fromRegion, setFromRegion] = useState('AUS');
    const [toRegion, setToRegion] = useState('US');
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);

    const getKey = (region) => {
        switch (region) {
            case 'AUS': return 'aus';
            case 'US': return 'us';
            case 'EUR': return 'eur';
            case 'Diameter': return 'dia';
            case 'Circumference': return 'circ';
            default: return 'aus';
        }
    };

    const fromKey = getKey(fromRegion);
    const toKey = getKey(toRegion);
    const convertedSize = selectedSizeIndex !== null ? SIZE_DATA[selectedSizeIndex][toKey] : '';

    return (
        <section className="ring-size-converter-section">
            <div className="page-width">

                {/* ── Tab Switcher ── */}
                <div className="rsc-tab-switcher">
                    <button
                        id="rsc-tab-convert"
                        className={`rsc-tab-btn ${activeTab === 'convert' ? 'active' : ''}`}
                        onClick={() => setActiveTab('convert')}
                    >
                        <span className="rsc-tab-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8l4 4-4 4" /></svg>
                        </span>
                        Convert Ring Size
                    </button>
                    <button
                        id="rsc-tab-request"
                        className={`rsc-tab-btn ${activeTab === 'request' ? 'active' : ''}`}
                        onClick={() => setActiveTab('request')}
                    >
                        <span className="rsc-tab-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                        </span>
                        Free Ring Sizer
                    </button>
                </div>

                {/* ── Mobile Select ── */}
                <div className="rsc-mobile-select">
                    <div className="select-wrapper">
                        <select
                            className="ff-c f-13 w-400 accent-color"
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                        >
                            <option value="convert">Convert Ring Size</option>
                            <option value="request">Free Ring Sizer</option>
                        </select>
                    </div>
                </div>

                {/* ── Content ── */}
                <div className="rsc-content">
                    {activeTab === 'convert' ? (

                        <div className="rsc-convert-layout">

                            {/* Left: heading + from selector + size grid */}
                            <div className="rsc-left-panel">
                                <div className="rsc-panel-header">
                                    <h2 className="section-title">Convert Ring Size</h2>
                                    <div className="border-line"></div>
                                    <p className="sb-description">Select your size below to instantly see your international equivalent.</p>
                                </div>

                                <div className="rsc-region-row">
                                    <label className="rsc-region-label ff-c f-11 w-600">YOUR REGION</label>
                                    <div className="select-wrapper">
                                        <select
                                            className="ff-c f-13 w-400 accent-color"
                                            value={fromRegion}
                                            onChange={(e) => setFromRegion(e.target.value)}
                                        >
                                            {REGIONS.map(r => (
                                                <option key={r.value} value={r.value}>{r.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="rsc-size-grid ff-c f-13 w-400">
                                    {SIZE_DATA.map((item, index) => (
                                        <button
                                            key={index}
                                            id={`rsc-size-${index}`}
                                            className={`rsc-size-btn ${selectedSizeIndex === index ? 'active' : ''}`}
                                            onClick={() => setSelectedSizeIndex(index)}
                                        >
                                            {item[fromKey]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right: convert-to selector + result */}
                            <div className="rsc-right-panel">
                                <div className="rsc-sticky-result">
                                    <p className="rsc-result-eyebrow ff-c f-11 w-600">CONVERT TO</p>
                                    <div className="select-wrapper rsc-to-select">
                                        <select
                                            className="ff-c f-13 w-400 accent-color"
                                            value={toRegion}
                                            onChange={(e) => setToRegion(e.target.value)}
                                        >
                                            {REGIONS.map(r => (
                                                <option key={r.value} value={r.value}>{r.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="rsc-result-card">
                                        <div className="rsc-ring-visual">
                                            <div className="rsc-ring-outer">
                                                <div className="rsc-ring-inner">
                                                    {convertedSize ? (
                                                        <span className="rsc-result-value ff-c w-700">{convertedSize}</span>
                                                    ) : (
                                                        <span className="rsc-result-placeholder">—</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="rsc-result-label ff-c f-11 w-500">
                                            {convertedSize
                                                ? `Your size in ${REGIONS.find(r => r.value === toRegion)?.label}`
                                                : 'Select a size on the left'}
                                        </p>
                                    </div>

                                    {/* <div className="rsc-hint-box">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                        <p className="ff-c f-11 w-400">Sizes are approximate. We recommend trying a physical ring sizer for best accuracy.</p>
                                    </div> */}
                                </div>
                            </div>

                        </div>

                    ) : (

                        <div className="rsc-sizer-layout">

                            {/* Left: Info panel */}
                            <div className="rsc-sizer-info">
                                <div className="rsc-sizer-icon-wrap">
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                </div>
                                <h2 className="rsc-sizer-title section-title">Free Ring<br/>Sizing Kit</h2>
                                <div className="border-line rsc-sizer-line"></div>
                                <p className="rsc-sizer-desc sb-description">
                                    Don't know your ring size? No problem. Fill out the form and we'll post you a free sizing kit so you can measure comfortably at home.
                                </p>
                                <ul className="rsc-sizer-benefits">
                                    <li>
                                        <span className="rsc-benefit-icon">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        </span>
                                        Completely free — no strings attached
                                    </li>
                                    <li>
                                        <span className="rsc-benefit-icon">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        </span>
                                        Ships to Australia, US, UK & NZ
                                    </li>
                                    <li>
                                        <span className="rsc-benefit-icon">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        </span>
                                        Measure from the comfort of home
                                    </li>
                                    <li>
                                        <span className="rsc-benefit-icon">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        </span>
                                        Expert support included
                                    </li>
                                </ul>
                            </div>

                            {/* Right: Form card */}
                            <div className="rsc-sizer-form-wrap">
                                <div className="rsc-sizer-form-card">
                                    <p className="rsc-sizer-form-eyebrow ff-c f-11 w-600">YOUR DETAILS</p>
                                    <NewContactBig />
                                </div>
                            </div>

                        </div>

                    )}
                </div>

            </div>
        </section>
    );
}
