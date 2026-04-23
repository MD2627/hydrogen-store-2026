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
    const [toRegion, setToRegion] = useState('AUS');
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
                <div className="converter-tabs-container ff-c f-13 w-400 black-color">
                    <button
                        className={`converter-tab ${activeTab === 'convert' ? 'active' : ''}`}
                        onClick={() => setActiveTab('convert')}
                    >
                        CONVERT RING SIZE
                    </button>
                    <button
                        className={`converter-tab ${activeTab === 'request' ? 'active' : ''}`}
                        onClick={() => setActiveTab('request')}
                    >
                        REQUEST FREE RING SIZER
                    </button>
                </div>

                <div className="mobile-tabs-container">
                    <div className="select-wrapper">
                        <select
                            className="ff-c f-13 w-400 accent-color"
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                        >
                            <option value="convert">CONVERT RING SIZE</option>
                            <option value="request">REQUEST FREE RING SIZER</option>
                        </select>
                    </div>
                </div>

                <div className="converter-content">
                    {activeTab === 'convert' ? (
                        <>
                            <div className="converter-header">
                                <h2 className='ff-a f-32 w-300 black-color'>Convert Ring Size</h2>
                                <div className="border-line"></div>
                                <p className='ff-c f-13 w-300 black-color'>Convert your<br /> international ring size.</p>
                            </div>

                            <div className="converter-grid-layout">
                                <div className="from-column">
                                    <label className="region-label ff-c f-13 w-300 black-color">YOUR SIZE</label>
                                    <div className="select-wrapper">
                                        <select
                                            className='ff-c f-13 w-400 accent-color'
                                            value={fromRegion}
                                            onChange={(e) => setFromRegion(e.target.value)}
                                        >
                                            {REGIONS.map(r => (
                                                <option key={r.value} value={r.value}>{r.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="size-buttons-grid ff-c f-13 w-400">
                                        {SIZE_DATA.map((item, index) => (
                                            <button
                                                key={index}
                                                className={`size-btn ${selectedSizeIndex === index ? 'active' : ''}`}
                                                onClick={() => setSelectedSizeIndex(index)}
                                            >
                                                {item[fromKey]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="to-column">
                                    <label className="region-label ff-c f-13 w-300 black-color">CONVERT SIZE TO</label>
                                    <div className="select-wrapper">
                                        <select className='ff-c f-13 w-400 accent-color'
                                            value={toRegion}
                                            onChange={(e) => setToRegion(e.target.value)}
                                        >
                                            {REGIONS.map(r => (
                                                <option key={r.value} value={r.value}>{r.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="result-display">
                                        <div className="result-ring-circle">
                                            {convertedSize && (
                                                <span className="result-text ff-c f-16 w-700 black-color">{convertedSize}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="request-sizer-content">
                            <div className="converter-header">
                                <h2 className='ff-a f-32 w-300 black-color'>Request Free Ring Sizing Kit</h2>
                                <div className="border-line"></div>
                                <p className='ff-c f-13 w-300 black-color'>Don’t know your ring size? Not a problem at all. Fill out this form and we’ll send you a<br /> FREE sizing kit so you can measure from home.</p>
                            </div>

                            <div className="request-sizer-form">
                                <NewContactBig />
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
