import { useState } from 'react';
import { useFetcher } from 'react-router';

export function Newsletter() {
  const fetcher = useFetcher();
  const [email, setEmail] = useState('');
  const [acceptsMarketing, setAcceptsMarketing] = useState(true);

  const isSubmitting = fetcher.state === 'submitting';
  const isSuccess = fetcher.data?.success;
  const error = fetcher.data?.error;

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }

    fetcher.submit(
      { email, acceptsMarketing: acceptsMarketing.toString() },
      { method: 'POST', action: '/api/newsletter' }
    );
  }

  // Reset form on success
  if (isSuccess && email) {
    setTimeout(() => {
      setEmail('');
      setAcceptsMarketing(true);
    }, 100);
  }

  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <div className="newsletter-header">
          <h2 className="newsletter-title">Join Our Newsletter</h2>
          <p className="newsletter-subtitle">
            Be the first to know about new collections, exclusive offers, and special events.
          </p>
        </div>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-input-wrapper">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="newsletter-input f-m-12 f-12 ff-n"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="newsletter-button f-m-12 f-12 ff-n"
              disabled={isSubmitting || !email}
            >
              {isSubmitting ? (
                <span className="newsletter-loading">
                  <span className="spinner"></span>
                  Subscribing...
                </span>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>

          <label className="newsletter-consent">
            <input
              type="checkbox"
              checked={acceptsMarketing}
              onChange={(e) => setAcceptsMarketing(e.target.checked)}
              disabled={isSubmitting}
            />
            <span>I agree to receive marketing emails and special offers</span>
          </label>

          {isSuccess && (
            <div className="newsletter-message newsletter-success">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Thank you for subscribing! Check your email for confirmation.</span>
            </div>
          )}

          {error && (
            <div className="newsletter-message newsletter-error">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
