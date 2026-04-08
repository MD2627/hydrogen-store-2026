import { useState } from 'react';
import { Link } from 'react-router-dom';

import countryCodes from '../data/countryCodes.json';

export function NewContactBig() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        country: 'United States',
        province: '',
        postcode: '',
        city: '',
        stones: [],
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedCountry, setSelectedCountry] = useState({
        code: 'US',
        dial_code: '+1',
        image: 'https://flagcdn.com/w40/us.png'
    });
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    // Country codes imported from JSON

    function handleCountrySelect(country) {
        setSelectedCountry(country);
        setShowCountryDropdown(false);
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'stones') {
            setForm((prev) => ({
                ...prev,
                stones: checked
                    ? [...prev.stones, value]
                    : prev.stones.filter((s) => s !== value),
            }));
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const payload = { ...form };

        // Ensure subscribe is handled if needed by API, though not in UI. 
        // Defaulting to true as per "Consent is not a condition... you consent to receive marketing" text
        payload.subscribe = true;

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
                    address: '',
                    country: 'United States',
                    province: '',
                    postcode: '',
                    city: '',
                    stones: [],
                });
                // Optional: e.target.reset(); if we weren't controlling state
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
    }

    return (

        <div className="new-contact-big-section">

            <div className="new-contact-container">
                <form className="new-contact-form" onSubmit={handleSubmit}>

                    {/* First Name & Last Name */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">FIRST NAME *</label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                placeholder="Enter your name"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">LAST NAME *</label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                placeholder="Enter your name"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">EMAIL ADDRESS *</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="Enter your email address"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">YOUR PHONE NUMBER *</label>
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
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    placeholder="Enter your phone number"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="address">ADDRESS *</label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                value={form.address}
                                placeholder="Enter your address"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Country, Province, Postcode, City */}
                    <div className="form-row four-col">
                        <div className="form-group">
                            <label htmlFor="country">COUNTRY *</label>
                            <select
                                id="country"
                                name="country"
                                value={form.country}
                                required
                                onChange={handleChange}
                            >
                                <option value="Australia">Australia</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="province">PROVINCE *</label>
                            <input
                                id="province"
                                type="text"
                                name="province"
                                value={form.province}
                                placeholder="Province"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postcode">POSTCODE *</label>
                            <input
                                id="postcode"
                                type="text"
                                name="postcode"
                                value={form.postcode}
                                placeholder="Enter Postcode"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">CITY *</label>
                            <input
                                id="city"
                                type="text"
                                name="city"
                                value={form.city}
                                placeholder="Enter City"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Stone Type Checkboxes */}
                    <div className="form-group checkbox-group-wrapper">
                        <label className="checkbox-group-label">WHAT STONE TYPE ARE YOU INTERESTED IN?</label>
                        <div className="checkbox-options">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="stones"
                                    value="Lab Grown Diamonds"
                                    checked={form.stones.includes('Lab Grown Diamonds')}
                                    onChange={handleChange}
                                />
                                <span className="custom-checkbox"></span>
                                Lab Grown Diamonds
                            </label>
                            {/* <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="stones"
                                    value="Moissanite"
                                    checked={form.stones.includes('Moissanite')}
                                    onChange={handleChange}
                                />
                                <span className="custom-checkbox"></span>
                                Moissanite
                            </label> */}
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="stones"
                                    value="Sapphires"
                                    checked={form.stones.includes('Sapphires')}
                                    onChange={handleChange}
                                />
                                <span className="custom-checkbox"></span>
                                Sapphires
                            </label>
                        </div>
                    </div>

                    {/* Disclaimer & Submit */}
                    <div className="form-footer">
                        <p className="disclaimer-text-big">
                            By entering your details and submitting this form, you consent to receive marketing email and text messages (such as promotion codes and cart reminders) from Cullen Jewellery to the email and phone number provided. Consent is not a condition of any purchase. Message and data rates may apply. Message frequency varies. You can unsubscribe at any time.
                        </p>
                        <p className="disclaimer-links">
                            View our <Link to="/privacy-policy" className="fancy">Privacy Policy</Link>
                            and <Link to="/terms-and-conditions" className="fancy">Terms and Conditions</Link>.
                        </p>

                        {status === 'success' && (
                            <div className="status-message success">
                                Thank you! Your message has been sent successfully.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="status-message error">
                                {errorMessage || 'Something went wrong. Please try again.'}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="submit-button contact-submit common-button"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT'}
                        </button>

                        <p className="recaptcha-text">
                            This site is protected by reCAPTCHA. The Google <Link to="/privacy-policy" className="fancy">Privacy Policy</Link>
                            and <Link to="/terms-and-conditions" className="fancy">Terms of Service</Link> apply.
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}
