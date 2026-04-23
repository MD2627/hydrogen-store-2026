
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '~/styles/graduation-jewellery.css?url';
import countryCodes from '../data/countryCodes.json';

export function GraduationContactForm() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        institutionName: '',
        message: '',
        rings: {
            sterlingSilver: 0,
            yellowGold: 0,
            whiteGold: 0,
            roseGold: 0,
        },
        necklaces: {
            sterlingSilver: 0,
            yellowGold: 0,
            whiteGold: 0,
            roseGold: 0,
        }
    });

    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Default country state as in newContactBig.jsx
    const [selectedCountry, setSelectedCountry] = useState({
        code: 'US',
        dial_code: '+1',
        image: 'https://flagcdn.com/w40/us.png'
    });
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    function handleCountrySelect(country) {
        setSelectedCountry(country);
        setShowCountryDropdown(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleQuantityChange = (category, metal, delta) => {
        setForm(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [metal]: Math.max(0, prev[category][metal] + delta)
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        // Construct the payload to match what the backend might expect
        // Similar to how other forms send data
        const payload = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone, // Note: You might want to combine prefix and phone if needed
            institutionName: form.institutionName, // Custom field for this form
            message: form.message,
            subscribe: true, // Auto-subscribe as per disclaimer
            // Flatten product choices into a description or custom object if API supports it
            // Or send as is if API handles it. Assuming we send a custom object or formatted message:
            productDetails: {
                rings: form.rings,
                necklaces: form.necklaces
            },
            // Add formatted details to message for fallback compatibility if API doesn't support custom fields
            additionalDetails: `
Institution: ${form.institutionName}
Rings:
  Sterling Silver: ${form.rings.sterlingSilver}
  Yellow Gold: ${form.rings.yellowGold}
  White Gold: ${form.rings.whiteGold}
  Rose Gold: ${form.rings.roseGold}
Necklaces:
  Sterling Silver: ${form.necklaces.sterlingSilver}
  Yellow Gold: ${form.necklaces.yellowGold}
  White Gold: ${form.necklaces.whiteGold}
  Rose Gold: ${form.necklaces.roseGold}
            `
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setStatus('success');
                setForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    institutionName: '',
                    message: '',
                    rings: { sterlingSilver: 0, yellowGold: 0, whiteGold: 0, roseGold: 0 },
                    necklaces: { sterlingSilver: 0, yellowGold: 0, whiteGold: 0, roseGold: 0 }
                });
            } else {
                const data = await res.json();
                setStatus('error');
                let msg = 'Submission failed';
                if (data.errors && Array.isArray(data.errors)) {
                    msg = data.errors.map(e => e.message).join(', ');
                } else if (data.error) {
                    msg = data.error;
                }
                setErrorMessage(msg);
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Network error, please try again later');
        }
    };

    const MetalQuantityRow = ({ label, category, metal }) => (
        <div className="metal-quantity-row">
            <span className="metal-label ff-n f-11 w-300">{label}</span>
            <div className="quantity-controls">
                <button type="button" className="ff-c f-13 w-400" onClick={() => handleQuantityChange(category, metal, -1)}>-</button>
                <span className="quantity-value ff-c f-13 w-400">{form[category][metal]}</span>
                <button type="button" className="ff-c f-13 w-400" onClick={() => handleQuantityChange(category, metal, 1)}>+</button>
            </div>
        </div>
    );

    return (
        <form className="graduation-contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="firstName" className="ff-n f-12 w-300 black-color">YOUR FIRST NAME *</label>
                    <input type="text" id="firstName" className="ff-n f-12 w-400 black-color" name="firstName" placeholder="Your first name" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName" className="ff-n f-12 w-300 black-color">YOUR LAST NAME *</label>
                    <input type="text" id="lastName" className="ff-n f-12 w-400 black-color" name="lastName" placeholder="Your last name" value={form.lastName} onChange={handleChange} required />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="email" className="ff-n f-12 w-300 black-color">YOUR EMAIL *</label>
                    <input type="email" id="email" className="ff-n f-12 w-400 black-color" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone" className="ff-n f-12 w-300 black-color">YOUR PHONE NUMBER (OPTIONAL)</label>

                    <div className="phone-input-wrapper">
                        <div
                            className="country-flag-select"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        >
                            <img src={selectedCountry.image} alt={selectedCountry.code} className="country-flag-icon" style={{ width: '20px', marginRight: '5px' }} /> {selectedCountry.code}

                            {showCountryDropdown && (
                                <div className="country-dropdown-list">
                                    {countryCodes.map((country) => (
                                        <div
                                            key={country.code}
                                            className="country-dropdown-item"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCountrySelect(country);
                                            }}
                                        >
                                            <img
                                                src={country.image}
                                                alt={country.code}
                                                className="country-flag-icon"
                                                style={{ width: '20px', marginRight: '5px' }} />
                                            {country.code}
                                            ({country.dial_code})
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <span className="phone-prefix">{selectedCountry.dial_code}</span>
                        <input
                            id="phone"
                            className="ff-n f-12 w-400 black-color"
                            type="tel"
                            name="phone"
                            value={form.phone}
                            placeholder="Enter your phone number"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="form-group full-width">
                <label htmlFor="institutionName" className="ff-n f-12 w-300 black-color">INSTITUTION NAME *</label>
                <input type="text" id="institutionName" className="ff-n f-12 w-400 black-color" name="institutionName" placeholder="eg. The Australian National University" value={form.institutionName} onChange={handleChange} required />
            </div>

            <div className="product-quantities-grid">
                <div className="quantity-column">
                    <h3 className="ff-c f-13 w-300 black-color txt-center">Signet Rings</h3>
                    <div className="metal-list">
                        <MetalQuantityRow label="STERLING SILVER" category="rings" metal="sterlingSilver" />
                        <MetalQuantityRow label="9K YELLOW GOLD" category="rings" metal="yellowGold" />
                        <MetalQuantityRow label="9K WHITE GOLD" category="rings" metal="whiteGold" />
                        <MetalQuantityRow label="9K ROSE GOLD" category="rings" metal="roseGold" />
                    </div>
                </div>
                <div className="quantity-column">
                    <h3 className="ff-c f-13 w-300 black-color txt-center">Necklaces</h3>
                    <div className="metal-list">
                        <MetalQuantityRow label="STERLING SILVER" category="necklaces" metal="sterlingSilver" />
                        <MetalQuantityRow label="9K YELLOW GOLD" category="necklaces" metal="yellowGold" />
                        <MetalQuantityRow label="9K WHITE GOLD" category="necklaces" metal="whiteGold" />
                        <MetalQuantityRow label="9K ROSE GOLD" category="necklaces" metal="roseGold" />
                    </div>
                </div>
            </div>

            <div className="form-group full-width">
                <label htmlFor="message" className="ff-n f-12 w-300 black-color">MESSAGE (OPTIONAL)</label>
                <textarea id="message" className="ff-n f-12 w-400 black-color" name="message" rows="4" value={form.message} onChange={handleChange}></textarea>
            </div>

            <div className="form-submit-container txt-center">
                {status === 'success' && (
                    <div className="status-message success ff-c f-14 w-500 accent-color" style={{ marginBottom: '10px' }}>
                        Thank you! Your message has been sent successfully.
                    </div>
                )}
                {status === 'error' && (
                    <div className="status-message error ff-c f-14 w-500" style={{ marginBottom: '10px', color: 'red' }}>
                        {errorMessage || 'Something went wrong. Please try again.'}
                    </div>
                )}

                <button type="submit" className="submit-btn btn f-11 w-400 white-color" disabled={status === 'loading'}>
                    {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT'}
                </button>
                <p className="recaptcha-text ff-c w-300 f-11 black-color">
                    This site is protected by reCAPTCHA. The Google <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/terms-and-conditions">Terms of Service</Link> apply.
                </p>
            </div>
        </form>
    );
}

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}
