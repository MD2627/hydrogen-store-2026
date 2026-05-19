import { useState } from 'react';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductFAQ } from '~/components/ProductFAQ';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import styles from '~/styles/finance.css?url';

export const meta = () => {
  return [{ title: 'Finance Options | Diamond Jewellery' }];
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader() {
  return {};
}

export default function FinanceOptions() {
  const [activeTab, setActiveTab] = useState('AU');
  const currentData = FINANCE_DATA[activeTab] || [];

  return (
    <div className="finance-options-page">
      <StoryCraftBanner
        imageSrc="https://cdn.shopify.com/s/files/1/0801/7317/0906/files/IMG_6792_2000x2000_25e4319d-689d-48c9-8351-02a83f97c520.webp?v=1771218574"
        title="Finance Options"
        subtitle="Flexible ways to make your dream piece a reality."
        h1={true}
      />

      <div className="page-width">
        <div className="finance-tabs-container">
          {Object.keys(FINANCE_DATA).map((country) => (
            <button
              key={country}
              className={`finance-tab-pill ${activeTab === country ? 'active' : ''}`}
              onClick={() => setActiveTab(country)}
            >
              {country}
            </button>
          ))}
        </div>

        <div className="finance-options-grid">
          {currentData.map((item, index) => (
            <div className="finance-option-card" key={index}>
              <div className="finance-card-top">
                <div className="finance-card-logo">
                  <img src={item.logo} alt={item.name || 'Finance Provider'} />
                </div>
                <div className="finance-card-features">
                  <ul>
                    {item.features.map((feature, fIndex) => (
                      <li key={fIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="finance-card-bottom">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="finance-card-link">
                  READ FULL DETAILS
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductFAQ
        data={FAQ_DATA}
        title="Financing FAQ"
        subtitle="Everything you need to know about our payment plans."
      />

      <UvpIconFooter data={OUR_STORY_UVPS} />
    </div>
  );
}

/* ================================
   DATA
================================ */

const FINANCE_DATA = {
  AU: [
    {
      name: 'Humm',
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/download.svg?v=1771324038',
      link: 'https://www.hummloan.com/how-it-works/',
      features: [
        '$2,000 – $18,000 AUD credit limit',
        'Competitive 6% interest rate',
        'One-off establishment fee ($30–$110 AUD)',
        'Ongoing $8 AUD monthly payment fee',
        'Terms from 13 to 78 months (0% deposit)',
        'Available directly at checkout'
      ]
    },
    {
      name: 'Zip Pay',
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/download_1.svg?v=1771324135',
      link: 'https://zip.co/au/zip-pay',
      features: [
        '$350 – $1,000 AUD credit limit',
        'Completely interest-free',
        'No establishment fees',
        '$9.95 AUD monthly payment fee',
        'Flexible weekly or fortnightly payments',
        'Available directly at checkout'
      ]
    },
    {
      name: 'Zip Money',
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/download_2.svg?v=1771324193',
      link: 'https://zip.co/au/zip-money',
      features: [
        '$1,000 – $5,000 AUD credit limit',
        'Up to 12 months interest-free available',
        '$9.95 AUD monthly account fee',
        'Establishment fee up to $99 AUD may apply',
        'Flexible fortnightly or monthly payments',
        'Available directly at checkout'
      ]
    }
  ],
  NZ: [
    {
      name: 'Afterpay',
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/Afterpay_logo.xF_AGNBq.svg?v=1771329951',
      link: 'https://www.afterpay.com/en-NZ/how-it-works',
      features: [
        'Transactions up to $2,000 NZD',
        'Total credit limit up to $4,000 NZD',
        '100% interest-free',
        'Split into 4 fortnightly payments',
        'Simple, transparent fee structure',
        'Manual processing via our team'
      ]
    }
  ],
  US: [
    {
      name: 'Klarna',
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/klarna.Bd0gJPtS.svg?v=1771329779',
      link: 'https://www.klarna.com/us/',
      features: [
        'Maximum credit limit of $6,000 USD',
        'Pay in 30 Days – No interest, soft credit check',
        'Pay in 4 Instalments – 4 equal payments, no interest',
        'Financing (12 Months) – Spread payments over a year',
        'Safe and secure checkout experience',
        'Manual processing via our team'
      ]
    }
  ],
  CA: [
    {
      name: 'Humm',
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/download.svg?v=1771324038',
      link: 'https://www.shophumm.com/en-ca/',
      features: [
        'Up to $30,000 CAD credit limit',
        'Fixed 9.99% interest rate',
        'One-off establishment fee (no monthly fees)',
        'Repayment terms up to 60 months',
        'Available directly at checkout'
      ]
    }
  ],
  UK: [
    {
      name: 'Klarna',
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/klarna.Bd0gJPtS.svg?v=1771329779',
      link: 'https://www.klarna.com/uk/',
      features: [
        'Maximum credit limit of £5,000',
        'Pay in 30 Days – Full amount, no interest',
        'Pay in 3 Instalments – 3 equal payments, no interest',
        'Financing (6–36 Months) – Variable interest rates',
        'FCA regulated and secure',
        'Manual processing via our team'
      ]
    }
  ]
};

const FAQ_DATA = [
  {
    question: "What payment methods are available?",
    answer: "We offer a range of payment options depending on your location, including debit/credit cards, bank transfers, PayPal, and buy now, pay later (BNPL) services such as Humm, Zip, Afterpay, and Klarna. Full payment or approved financing is required before production begins, whether your order is placed online or in-store.",
  },
  {
    question: "Can I partially pay using finance?",
    answer: "For online orders, financing must be applied to the full order amount. In our showrooms, you may have the option to split your payment between financing and another payment method.",
  },
  {
    question: "Are there any fees associated with financing?",
    answer: "Financing providers may charge additional fees such as setup fees, monthly account charges, or interest, depending on your location and selected plan. We recommend reviewing the provider’s terms carefully before proceeding.",
  },
  {
    question: "When does production begin for financed orders?",
    answer: "Production starts once your financing application is approved and your agreement has been fully activated.",
  },
  {
    question: "What if my financing application is declined?",
    answer: "If your application is not approved, it may be due to missing or incomplete information. Our team can assist you with the next steps and guide you through reapplying if needed.",
  },
  {
    question: "When do repayments start?",
    answer: "Repayments typically begin once your order is confirmed and production of your ring has started.",
  }
];

const OUR_STORY_UVPS = [
  {
    link: '/shipping',
    label: 'Global Insured<br>Delivery',
    svg: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    `,
  },
  {
    link: '/free-resizing',
    label: 'Perfect Fit<br>Guarantee',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="5" /></svg>`,
  },
  {
    link: '/warranty',
    label: 'Lifetime<br>Craftsmanship',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l9 4.5v9l-9 4.5-9-4.5v-9z" /><path d="M12 9l.3 1.2 1.2.3-1.2.3-.3 1.2-.3-1.2-1.2-.3 1.2-.3z" fill="currentColor" stroke="none"/></svg>`,
  },
  {
    link: '/engagement-rings?metal=yellow_gold',
    label: 'Bespoke Design<br>Service',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7" /><path d="M21 21l-6-6" /><circle cx="10" cy="10" r="2" stroke-width="1"/></svg>`,
  },
];
