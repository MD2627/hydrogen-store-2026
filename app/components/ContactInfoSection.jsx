import { LocationIcon } from '~/components/icons/LocationIcon';
import { PhoneIcon } from '~/components/icons/PhoneIcon';
import { ClockIcon } from '~/components/icons/ClockIcon';
import { ChatIcon } from '~/components/icons/ChatIcon';
import { InfoIcon } from '~/components/icons/InfoIcon';
import { EmailIcon } from '~/components/icons/EmailIcon';

export function ContactInfoSection() {
  return (
    <section className="contact-info-section">
      <div className="page-width">
        {/* Left column */}
        <div className="contact-info-col">
          <div className="contact-info-item">
            <LocationIcon width={16} height={20} className="contact-info-svg" />
            <a href="/pages/book-an-appointment" className="contact-info-link w-300">
              BOOK AN APPOINTMENT
            </a>
          </div>

          <div className="contact-info-item">
            <PhoneIcon className="contact-info-svg" />
            <a href="tel:6186815688" className="contact-info-link w-300">
              (618) 681-5688
            </a>
          </div>
          <div className="contact-info-item">
            <ClockIcon className="contact-info-svg" />
            <div className="contact-info-text">
              <strong>CLIENT CARE HOURS:</strong>
              <span className='w-300'>WEEKDAYS 9AM – 5PM SATURDAY 8AM – 4PM</span>
            </div>
          </div>

          <div className="contact-info-item">
            <ChatIcon className="contact-info-svg" />
            <span className="contact-info-link w-300">LIVE CHAT</span>
          </div>
          <div className="contact-info-item">
            <InfoIcon className="contact-info-svg" />
            <a href="/faqs" className="contact-info-link w-300">
              VIEW FREQUENTLY ASKED QUESTIONS
            </a>
          </div>


          <div className="contact-info-item">
            <EmailIcon className="contact-info-svg" />
            <a
              href="mailto:contact@hopiant.com"
              className="contact-info-link w-300"
            >
              CONTACT@HOPIANT.COM
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
