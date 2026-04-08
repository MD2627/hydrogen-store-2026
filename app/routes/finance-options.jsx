import { useState } from 'react';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductFAQ } from '~/components/ProductFAQ';
import '../styles/christmas-cut-off.css';

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
    <div className="finance-options-details">
      <h1 className="main-heading w-300 l-h-1-1 black-color">
        {MAIN_HEADING.heading}
      </h1>
      <p className="finance-subtext ff-a l-h-1-1 w-300 black-color l-0 txt-center">
        {MAIN_HEADING.description}
      </p>
      <div className="finance-options-information">
        <div className="finance-tabs">
          {Object.keys(FINANCE_DATA).map((country) => (
            <button
              key={country}
              className={`finance-tab-btn black-color ${activeTab === country ? 'active' : ''}`}
              onClick={() => setActiveTab(country)}
            >
              {country}
            </button>
          ))}
        </div>
        <div className="finance-card-wrapper">
          {currentData.map((item, index) => (
            <div className="finance-card" key={index}>
              <div className="finance-logo">
                <img src={item.logo} alt="logo" />
              </div>
              <div
                className="finance-content"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
              <div className='finance-button'>
                <a href={item.link} className="finance-link ff-c">
                  READ FULL DETAILS
                </a>
                <div className='icon' dangerouslySetInnerHTML={{ __html: FINANCE_BUTTON.content }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="custom-rings-faq-section">
        <ProductFAQ data={FAQ_DATA} title="FAQs" />
      </div>
      {/* Footer UVPs */}
      <UvpIconFooter data={OUR_STORY_UVPS} />
    </div>
  );
}
/* ================================
   DATA
================================ */
const MAIN_HEADING = {
  heading: 'Finance Options',
  description: `At Cullen, we offer a range of flexible finance options to make owning your dream fine jewellery piece stress-free and straightforward. You can choose from our trusted “buy now, pay later” partners below to make your dream piece a reality. These services allow you to spread your payments over time, and we can start crafting your order once your payment or finance approval is confirmed.`
};
const FINANCE_DATA = {
  AU: [
    {
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/download.svg?v=1771324038',
      link: 'https://www.hummloan.com/how-it-works/',
      content: `
        <ul>
          <li>$2,000-$18,000AUD credit limit.</li>
          <li>6% interest rate</li>
          <li>One-off establishment fee of $30-$110AUD.</li>
          <li>Ongoing $8AUD monthly payment fee.</li>
          <li>2k to 5k = 13, 26, 39, 52 months (0% deposit).</li>
          <li>5k to 12k = 52 months (0% deposit).</li>
          <li>12k to 18k = 78 months (0% deposit).</li>
          <li>This payment method can be used at checkout.</li>
        </ul>
      `
    },
    {
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/download_1.svg?v=1771324135',
      link: 'https://zip.co/au/zip-pay',
      content: `
        <ul>
          <li>$350-$1,000AUD credit limit.</li>
          <li>Interest free.</li>
          <li>Late payments will incur a fee of $7.50AUD.</li>
          <li>$0AUD establishment fee.</li>
          <li>$9.95AUD monthly payment fee.</li>
          <li>This payment method can be used at checkout.</li>
        </ul>
      `
    },
    {
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/download_2.svg?v=1771324193',
      link: 'https://zip.co/au/zip-money',
      content: `
        <ul>
          <li>$1,000-$5,000AUD credit limit.</li>
          <li>Up to 12 months interest-free available</li>
          <li>$9.95AUD monthly account fee.</li>
          <li>Late payments will incur a fee of $15.00AUD.</li>
          <li>One-off establishment fee up to $99AUD may apply</li>
          <li>Flexible fortnightly or monthly payments</li>
          <li>This payment method can be used at checkout.</li>
        </ul>
      `
    }
  ],

  NZ: [
    {
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/Afterpay_logo.xF_AGNBq.svg?v=1771329951',
      link: 'https://www.afterpay.com/en-NZ/how-it-works',
      content: `
      <ul>
        <li>Allows transactions of up to $2000 NZD.</li>
        <li>The maximum credit limit at any one time is $4000 NZD.</li>
        <li>Interest-free.</li>
        <li>Split your order into 4 fortnightly payments.</li>
        <li>Late payments will incur a fee of $10.00 NZD.</li>
        <li>Our team can only process this payment method manually and cannot be used through the website.</li>
      </ul>
      `
    }
  ],

  US: [
    {
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/klarna.Bd0gJPtS.svg?v=1771329779',
      link: 'https://www.klarna.com/us/',
      content: `
        <ul>
          <li>The maximum credit limit is $6000 USD.</li>
          <li>Pay in 30 Days – Must pay the full amount within 30 days, no interest, soft credit check.</li>
          <li>Pay in 30 Days – Must pay the full amount within 30 days, no interest, soft credit check.</li>
          <li>Pay in 4 Instalments – Split into 4 equal payments every 30 days, no interest, soft credit check.</li>
          <li>Financing (12 Months) – Spread payments over 12 months.</li>
          <li>Our team can only process this payment method manually and cannot be used through the website.</li>
        </ul>
      `
    }
  ],

  CA: [
    {
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/download.svg?v=1771324038',
      link: 'https://www.shophumm.com/en-ca/',
      content: `
        <ul>
          <li>Up to $30,000 CAD credit limit.</li>
          <li>9.99% interest rate.</li>
          <li>One-off establishment fee (no ongoing monthly fees).</li>
          <li>Repayment terms up to 60 months.</li>
          <li>This payment method can be used at checkout.</li>
        </ul>
      `
    }
  ],

  UK: [
    {
      logo: 'https://cdn.shopify.com/s/files/1/0691/6191/0512/files/klarna.Bd0gJPtS.svg?v=1771329779',
      link: 'https://www.klarna.com/uk/',
      content: `
        <ul>
          <li>The maximum credit limit is £5000.</li>
          <li>Pay in 30 Days – Must pay the full amount within 30 days, no interest, soft credit check.</li>
          <li>Pay in 3 Instalments – Split into 3 equal payments every 30 days, no interest, soft credit check.</li>
          <li>Financing (6–36 Months) – Spread payments over 6–36 months, variable interest (27.9% representative APR), full credit check, FCA regulated.</li>
          <li>Our team can only process this payment method manually and cannot be used through the website.</li>
        </ul>
      `
    }
  ]

};
const FINANCE_BUTTON = {
  content: `
    <svg viewBox="0 0 16.933 16.933" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7"
        transform="rotate(180 8.466 8.466)"
        style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 1.05831; stroke-linecap: round; stroke-linejoin: round;"
      ></path>
    </svg>
  `
};

const FAQ_DATA = [
  {
    question: "What payment methods can I use for my order?",
    answer: "Depending on your location, you can pay using various methods, including debit/credit card, bank transfer, PayPal, and local “buy now, pay later” (BNPL) services such as Humm, Zip, Afterpay, or Klarna. All online and showroom orders require payment to begin production.",
  },
  {
    question: "Can I pay only a portion of my order with finance?",
    answer: "At this time, if you’d like to use financing for an online order, you must finance the full amount of your order. Payments processed through our showrooms can be made in part through finance and another payment method.",
  },
  {
    question: "Are there any additional fees for financing?",
    answer: "Yes, depending on the finance provider and your location, there may be establishment fees, monthly account fees, or interest charges. Fees vary by provider and loan amount. Be sure to review the terms and conditions of the service you choose before committing.",
  },
  {
    question: "When will my order go into production if I pay with finance?",
    answer: "When paying with finance, production begins once your application is approved and the contract is activated.",
  },
  {
    question: "What happens if my financing application is declined?",
    answer: "If your application is declined, don’t worry, it’s often a simple matter of confirming additional identification or financial details. We’ll guide you through the next steps and can help you reapply once the requirements are met.",
  },
  {
    question: "When do my repayments start?",
    answer: "Your repayments will begin once your order has been activated, which happens when the creation of your ring has commenced.",
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
