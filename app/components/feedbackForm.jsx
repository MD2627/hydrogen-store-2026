import { useState } from 'react';
import { Link } from 'react-router-dom';

export function FeedBackForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        interactionType: 'Other',
        feedback: '',
        wantResponse: false,
    });

    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMessage, setErrorMessage] = useState('');

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');


        const payload = {
            ...form,
            formType: 'feedback', // 👈 IMPORTANT (used later in api.contact.jsx)
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
                    name: '',
                    email: '',
                    interactionType: 'Other',
                    feedback: '',
                    wantResponse: false,
                });
            } else {
                const data = await res.json();
                setStatus('error');
                setErrorMessage(data?.error || 'Submission failed');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Network error. Please try again.');
        }
    }

    return (
        <div className="feedback-form-wrapper">
            <h2 className='ff-n'>Feedback</h2>
            <p className="feedback-intro">
                At Cullen Jewellery, we're passionate about offering an unparalleled experience
                in our jewellery and service. We'd be grateful if you'd share your thoughts with us.
                Your feedback will help us shine brighter!
            </p>
            <form className="feedback-form" onSubmit={handleSubmit}>

                {/* Name & Email */}
                <div className="form-row contact-grid-wrapper">
                    <div className="form-group contact-grid contact-grid-lnm">
                        <label htmlFor="name">NAME (OPTIONAL)</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group contact-grid contact-grid-lnm">
                        <label htmlFor="email">EMAIL (OPTIONAL)</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Interaction Type */}
                <div className="form-group contact-grid contact-grid-lnm">
                    <label htmlFor="interactionType">TYPE OF INTERACTION</label>
                    <select
                        id="interactionType"
                        name="interactionType"
                        value={form.interactionType}
                        onChange={handleChange}
                    >
                        <option value="Made a purchase">Made a purchase</option>
                        <option value="Browsed online store">Browsed online store</option>
                        <option value="Visited showroom">Visited showroom</option>
                        <option value="Engaged with client care">Engaged with client care</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Feedback */}
                <div className="form-group contact-grid contact-grid-lnm">
                    <label htmlFor="feedback">FEEDBACK *</label>
                    <textarea
                        id="feedback"
                        rows="5"
                        name="feedback"
                        placeholder="Please give as much detail as possible"
                        required
                        value={form.feedback}
                        onChange={handleChange}
                    />
                </div>

                {/* Checkbox */}
                <div className="form-group contact-grid contact-grid-lnm checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="wantResponse"
                            checked={form.wantResponse}
                            onChange={handleChange}
                        />
                        Would you like a response?
                    </label>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                    <div className="status-message success ff-c f-14 w-500 accent-color" suppressHydrationWarning>
                        Thank you! Your feedback has been submitted.
                    </div>
                )}

                {status === 'error' && (
                    <div className="status-message error ff-c f-14 w-500" style={{ color: 'red' }}>
                        {errorMessage}
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="submit-button btn"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT'}
                </button>

                {/* reCAPTCHA text */}
                <p className="recaptcha-text contact-recaptcha ff-c">
                    This site is protected by reCAPTCHA. The Google{' '}
                    <Link to="/privacy-policy">Privacy Policy</Link> and{' '}
                    <Link to="/terms-and-conditions">Terms of Service</Link> apply.
                </p>
            </form>
        </div>
    );
}
