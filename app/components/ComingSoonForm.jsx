import { useState } from 'react';
import { Link } from 'react-router-dom';
import countryCodes from '../data/countryCodes.json';

export function ComingSoonForm({ cityName }) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subscribe: true,
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

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

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const payload = {
            ...form,
            formType: 'coming_soon',
            city: cityName,
            phone: `${selectedCountry.dial_code}${form.phone}`
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
                    subscribe: true,
                });
            } else {
                const data = await res.json();
                setStatus('error');
                setErrorMessage(data.error || 'Submission failed');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Network error, please try again later');
        }
    }

    return (
        <div className="coming-soon-form-section">
            <div className="coming-soon-form-container page-width">
                <div className="coming-soon-form-header text-center">
                    <h2 className="ff-a text-center f-32 w-300">Get Notified When We Open</h2>
                    <p className="ff-c text-center f-13 w-300">
                        Enter your details below and we&apos;ll let you know when we open our {cityName} showroom.
                    </p>
                </div>

                <form className="contact-form new-contact-form" onSubmit={handleSubmit}>
                    <div className="form-row contact-grid-wrapper">
                        <div className="form-group contact-grid contact-grid-number">
                            <label htmlFor="firstName">YOUR FIRST NAME *</label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                placeholder="Your First Name"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group contact-grid contact-grid-number">
                            <label htmlFor="lastName">YOUR LAST NAME *</label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                placeholder="Your Last Name"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="email">YOUR EMAIL *</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="Your Email"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <div className="phone-input-wrapper">
                                <div
                                    className="country-flag-select"
                                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                >
                                    <img
                                        src={selectedCountry.image}
                                        alt={selectedCountry.code}
                                        className="country-flag-icon"
                                    />
                                    <span className="country-code">{selectedCountry.code}</span>

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
                                                    />
                                                    {country.code} ({country.dial_code})
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
                                    placeholder="(201) 555-0123"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-footer-coming-soon">
                        <div className="footer-top-row">
                            <label className="subscribe-check checkbox-label marketing-checkbox">
                                <input
                                    type="checkbox"
                                    name="subscribe"
                                    checked={form.subscribe}
                                    onChange={handleChange}
                                />
                                <span className="custom-checkbox"></span>
                                <span className="label-text">Send me Cullen Jewellery updates and emails.</span>
                            </label>

                            <p className="recaptcha-text-coming">
                                This site is protected by reCAPTCHA. The Google <Link to="/privacy-policy" className="fancy">Privacy Policy</Link> and <Link to="/terms-and-conditions" className="fancy">Terms of Service</Link> apply.
                            </p>
                        </div>

                        {status === 'success' && (
                            <div className="status-message success ff-c f-14 w-500 accent-color text-center">
                                Thank you! We&apos;ll notify you when we open.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="status-message error ff-c f-14 w-500 text-center" style={{ color: 'red' }}>
                                {errorMessage || 'Something went wrong. Please try again.'}
                            </div>
                        )}

                        <div className="submit-btn-wrapper">
                            <button
                                type="submit"
                                className="submit-button contact-submit btn"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'SENDING...' : 'SEND'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
