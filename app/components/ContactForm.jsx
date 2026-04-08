import { useState } from 'react';
import { Link } from 'react-router';

export function ContactForm({ mode = 'contact' }) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        subscribe: true,
        stones: [],
        centreStoneType: null,
        centreStoneOther: '',
    });

    const isOrderStatusPage = mode === 'order-status';
    const allowSubscribe = !isOrderStatusPage;

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const [radioError, setRadioError] = useState(false);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        // Stones checkbox (multiple)
        if (type === 'checkbox' && name === 'stones') {
            setForm((prev) => ({
                ...prev,
                stones: checked
                    ? [...prev.stones, value]
                    : prev.stones.filter((s) => s !== value),
            }));
            return;
        }
        // Subscribe checkbox
        if (type === 'checkbox' && name === 'subscribe') {
            if (!allowSubscribe) return;

            setForm((prev) => ({
                ...prev,
                subscribe: checked,
                stones: checked ? prev.stones : [],
            }));
            return;
        }
        if (type === 'radio') {
            setForm((prev) => ({
                ...prev,
                [name]: value,
                centreStoneOther: value === 'Other' ? prev.centreStoneOther : '',
            }));
            setRadioError(false); // ✅ clear error on select
            return;
        }
        // Normal inputs
        setForm((prev) => ({ ...prev, [name]: value }));
    }


    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');
        const isContactPage = mode === 'contact';

        if (!isContactPage && !isOrderStatusPage && !form.centreStoneType) {
            setRadioError(true);
            setStatus('idle');
            return;
        }
        const payload = { ...form };

        if (!allowSubscribe) {
            delete payload.subscribe;
            delete payload.stones;
        }

        if (payload.centreStoneType === 'Other') {
            if (payload.centreStoneOther?.trim()) {
                payload.centreStoneType = payload.centreStoneOther.trim();
            } else {
                delete payload.centreStoneType;
            }
        }

        // Remove helper field
        delete payload.centreStoneOther;

        // Optional cleanups
        if (!payload.stones?.length) delete payload.stones;

        // Remove radio field if not selected
        if (!payload.centreStoneType) {
            delete payload.centreStoneType;
        }

        // Optional: also remove s tones if empty
        if (!payload.stones || payload.stones.length === 0) {
            delete payload.stones;
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload), // 👈 send CLEAN payload
            });

            if (res.ok) {
                setStatus('success');
                setForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: '',
                    subscribe: allowSubscribe,
                    stones: [],
                    centreStoneType: null, // reset
                });
                e.target.reset();
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
                console.error('❌ Submission failed:', data);
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Network error, please try again later');
            console.error('❌ Submission failed', err);
        }
    }


    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            {/* Name + Email + Phone */}
            <div className="contact-grid-wrapper">
                <div className="contact-grid contact-grid-fnm">
                    <label htmlFor="firstName">YOUR FIRST NAME *</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="Your first name"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="contact-grid contact-grid-lnm">
                    <label htmlFor="lastName">YOUR LAST NAME *</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Your last name"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="contact-grid contact-grid-email">
                    <label htmlFor="email">YOUR EMAIL *</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="contact-grid contact-grid-number">

                    <label htmlFor="phone">
                        {!isOrderStatusPage ? 'YOUR PHONE NUMBER (OPTIONAL)' : 'YOUR PHONE NUMBER *'}
                    </label>

                    <input
                        id="phone"
                        type="tel"
                        required={isOrderStatusPage}
                        name="phone"
                        placeholder="Enter your phone number"
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Centre Stone Type - Only show if NOT on order-status page */}
            {!isOrderStatusPage && (
                <div className="contact-radio-group centre-stone-type">
                    <p className="contact-radio-title">Centre Stone Type *</p>

                    {/* <label htmlFor="centre-moissanite">
                        <input
                            id="centre-moissanite"
                            type="radio"
                            name="centreStoneType"
                            value="Moissanite"
                            checked={form.centreStoneType === 'Moissanite'}
                            onChange={handleChange}
                        />
                        Moissanite
                    </label> */}

                    <label htmlFor="centre-lab">
                        <input
                            id="centre-lab"
                            type="radio"
                            name="centreStoneType"
                            value="Lab grown diamond"
                            checked={form.centreStoneType === 'Lab grown diamond'}
                            onChange={handleChange}
                        />
                        Lab grown diamond
                    </label>

                    <label htmlFor="centre-later">
                        <input
                            id="centre-later"
                            type="radio"
                            name="centreStoneType"
                            value="Choose later"
                            checked={form.centreStoneType === 'Choose later'}
                            onChange={handleChange}
                        />
                        Choose later
                    </label>

                    <label htmlFor="centre-other">
                        <input
                            id="centre-other"
                            type="radio"
                            name="centreStoneType"
                            value="Other"
                            checked={form.centreStoneType === 'Other'}
                            onChange={handleChange}
                        />
                        Other
                    </label>

                    {form.centreStoneType === 'Other' && (
                        <input
                            id="centreStoneOther"
                            type="text"
                            name="centreStoneOther"
                            placeholder="Please specify"
                            value={form.centreStoneOther}
                            onChange={handleChange}
                            className="contact-other-input"
                        />
                    )}

                    {radioError && (
                        <p className="contact-error">
                            Please select a centre stone type.
                        </p>
                    )}
                </div>
            )}

            {/* Message */}
            <div className="contact-full">
                <label htmlFor="message">
                    {isOrderStatusPage ? 'MESSAGE (OPTIONAL)' : 'MESSAGE *'}
                </label>

                <textarea
                    id="message"
                    name="message"
                    placeholder="Ask your questions"
                    required={!isOrderStatusPage}
                    onChange={handleChange}
                />
            </div>

            {/* Subscribe */}
            {allowSubscribe && (
                <>
                    <label className="subscribe-check" htmlFor="subscribe">
                        <input
                            id="subscribe"
                            type="checkbox"
                            name="subscribe"
                            checked={form.subscribe}
                            onChange={handleChange}
                        />
                        Subscribe to our mailing list
                    </label>

                    {form.subscribe && (
                        <div className="contact-stone">
                            <p>What stone type are you interested in?</p>
                            <div className="contact-stone-wrapper">
                                <label htmlFor="stone-lab">
                                    <input
                                        id="stone-lab"
                                        type="checkbox"
                                        name="stones"
                                        value="Lab Grown Diamonds"
                                        checked={form.stones.includes('Lab Grown Diamonds')}
                                        onChange={handleChange}
                                    />
                                    Lab Grown Diamonds
                                </label>

                                {/* <label htmlFor="stone-moissanite">
                                    <input
                                        id="stone-moissanite"
                                        type="checkbox"
                                        name="stones"
                                        value="Moissanite"
                                        checked={form.stones.includes('Moissanite')}
                                        onChange={handleChange}
                                    />
                                    Moissanite
                                </label> */}
                            </div>
                        </div>
                    )}
                </>
            )}



            <div className="contact-submit-container">
                {status === 'success' && (
                    <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>
                        Thank you! Your message has been sent successfully.
                    </div>
                )}

                {status === 'error' && (
                    <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                        {errorMessage || 'Something went wrong. Please try again.'}
                    </div>
                )}

                <button
                    type="submit"
                    className="contact-submit common-button"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'SENDING...' : 'SUBMIT'}
                </button>

                <p className="contact-recaptcha ff-c">
                    This site is protected by reCAPTCHA. The Google{' '}
                    <Link to="/policies/privacy-policy" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link to="/policies/terms-of-service" target="_blank" rel="noopener noreferrer">
                        Terms of Service
                    </Link>{' '}
                    apply.
                </p>
            </div>
        </form>

    );
}
