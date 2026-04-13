import { useState, useEffect } from "react";
import { useFetcher } from "react-router";

export function TryThemeModal({ isOpen, onClose, formId = "theme-showcase" }) {
  const fetcher = useFetcher();
  const [submitted, setSubmitted] = useState(false);
  
  const isSubmitting = fetcher.state === "submitting";
  const error = fetcher.data?.error;
  const success = fetcher.data?.success;

  useEffect(() => {
    if (success) {
      setSubmitted(true);
      const timer = setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* <img 
          src="https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Thanasi_Home_Page_Select_Final-1_1600x1600.webp?v=1774585640" 
          alt="Hydrogen Theme" 
          className="modal-header-img"
        /> */}

        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
              <h2 className="modal-title">Success!</h2>
              <p className="modal-subtitle">Your request has been submitted. Our team will reach out shortly.</p>
            </div>
          ) : (
            <>
              <h2 className="modal-title">Try Hydrogen Theme</h2>
              <p className="modal-subtitle">Experience the future of headless commerce. Enter your details to get started.</p>

              <fetcher.Form method="post" action="/api/try-theme" className="modal-form">
                <input type="hidden" name="form_id" value={formId} />
                
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input 
                    name="first_name" 
                    placeholder="Jane" 
                    required 
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    name="email" 
                    type="email" 
                    placeholder="jane@example.com" 
                    required 
                    className="form-input"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="form-submit"
                >
                  {isSubmitting ? "Submitting..." : "Send Request"}
                </button>

                {error && (
                  <p style={{ color: "#d32f2f", fontSize: "13px", marginTop: "8px", textAlign: "center" }}>
                    {error}
                  </p>
                )}
              </fetcher.Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
