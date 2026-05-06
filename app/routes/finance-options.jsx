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
    label: 'Worldwide<br>Express Shipping',
    svg: `
      <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16.75H2v-1.5h10v1.5Zm13.074 8.417c-.332.37-.807.583-1.304.583H8.196a1.752 1.752 0 0 1-1.74-1.942l.448-4.058H4v-1.5h4.578l-.63 5.723a.248.248 0 0 0 .248.277H23.77a.247.247 0 0 0 .186-.083.247.247 0 0 0 .062-.194l-1.47-13.223H9.454l-.312 2.827-1.492-.165.46-4.162h3.641v-.92c0-2.344 1.907-4.25 4.25-4.25s4.25 1.906 4.25 4.25v.92h3.642l1.617 14.557Z" fill="#6b6b6b"/>
      </svg>
    `,
  },
  {
    link: '/free-resizing',
    label: 'Free<br>Resizing',
    svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M24.289 18.18c0 5.122-4.167 9.289-9.289 9.289s-9.289-4.167-9.289-9.29a9.286 9.286 0 0 1 5.615-8.533l.593 1.376a7.788 7.788 0 0 0-4.708 7.158c0 4.295 3.495 7.789 7.789 7.789s7.789-3.494 7.789-7.79c0-4.294-3.495-7.788-7.789-7.788-.259 0-.518.018-.768.044l-.367.037-4.585-4.84 2.495-3.382h6.45l2.492 3.377-2.55 2.733-1.097-1.024 1.7-1.82-1.302-1.766h-4.936l-1.3 1.761 3.22 3.4c.181-.013.364-.02.548-.02 5.122 0 9.289 4.167 9.289 9.289ZM11.75 18h-1.5v4.75H15v-1.5h-2.19l5.44-5.44V18h1.5v-4.75H15v1.5h2.19l-5.44 5.44V18Z" fill="#fff"></path></svg>`,
  },
  {
    link: '/warranty',
    label: 'Lifetime Ring<br>Warranty',
    svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 2.587 4.25 8.793v7.362a8.774 8.774 0 0 0 4.375 7.577L15 27.413l6.375-3.68a8.774 8.774 0 0 0 4.375-7.578V8.793L15 2.587Zm9.25 13.568a7.271 7.271 0 0 1-3.625 6.279L15 25.68l-5.625-3.247a7.271 7.271 0 0 1-3.625-6.28V9.66L15 4.32l9.25 5.34v6.495Zm-11.733.268 3.906-3.906a3.516 3.516 0 0 1 4.967 0 3.516 3.516 0 0 1 0 4.966c-.685.685-1.584 1.027-2.484 1.027s-1.799-.342-2.483-1.027l-.572-.571 1.06-1.06.572.57a2.015 2.015 0 0 0 2.846 0 2.014 2.014 0 0 0 0-2.845 2.015 2.015 0 0 0-2.846 0l-3.906 3.906a3.516 3.516 0 0 1-4.967 0 3.516 3.516 0 0 1 0-4.966 3.516 3.516 0 0 1 4.967 0l.589.588-1.061 1.06-.588-.588a2.015 2.015 0 0 0-2.846 0 2.014 2.014 0 0 0 0 2.846 2.015 2.015 0 0 0 2.846 0Z" fill="#fff"></path></svg>`,
  },
  {
    link: '/engagement-rings?metal=yellow_gold',
    label: 'Free Ring<br>Customisation',
    svg: `<svg data-name="Icons Expanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="m28.42 9.978-4.77 4.769a4.152 4.152 0 0 1-2.331 1.166l-4.204.6-3.11 3.11-1.06-1.061 3.11-3.11.6-4.203a4.15 4.15 0 0 1 1.166-2.332l4.77-4.77 1.06 1.061-4.77 4.77a2.642 2.642 0 0 0-.741 1.483l-.494 3.46 3.46-.494a2.638 2.638 0 0 0 1.484-.741l4.769-4.769 1.06 1.06ZM8.07 21.118c-2.905 0-5.097-2.256-5.097-5.28 0-3.01 2.213-5.28 5.147-5.28 1.144 0 2.063.238 2.894.749.371.228.734.513 1.14.896l1.028-1.092A8.466 8.466 0 0 0 11.8 10.03c-1.077-.662-2.247-.97-3.68-.97-3.727 0-6.647 2.977-6.647 6.813 0 3.782 2.898 6.746 6.597 6.746 2.586 0 4.076-1.136 5.193-2.247l-1.057-1.063c-1.093 1.086-2.214 1.81-4.136 1.81Zm7.936-.38h4v-1.5h-4v1.5Zm-1.408 1.9 2.828 2.83 1.06-1.061-2.828-2.829-1.06 1.06Z" fill="#fff"></path></svg>`,
  },
];
