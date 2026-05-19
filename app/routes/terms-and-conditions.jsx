import { useLoaderData } from 'react-router';
import { useRef, useState, useEffect } from 'react';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { Link } from "react-router";
import termsStyles from '~/styles/terms-and-conditions.css?url';

/**
 * @type {Route.LinksFunction}
 */
export const links = () => [
  { rel: 'stylesheet', href: termsStyles },
];

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Terms and Conditions | Diamond Jewellery' }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  return {
    aboutTheWebsite: ABOUT_THE_WEBSITE
  };
}

export default function TermsAndConditions() {
  const data = useLoaderData();

  return (
    <div className="terms-and-conditions">
      <StoryCraftBanner
        imageSrc="https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Jewellery_London_153_1a_retouched_high_res_2000x2000_955a3419-44fe-4982-a8b6-5ca4c5c7dd18.webp?v=1777283263"
        title="Terms & Conditions"
        subtitle="Please read our terms and conditions carefully."
        extraClass="story-craft-banner--terms"
      />

      <section className="terms-editorial-section">
        <div className="terms-editorial-container">
          <div className="terms-intro">
            <h2 className="section-title">Important Information</h2>
            <p className="sb-description">Everything you need to know about our policies, services, and customer experience.</p>
          </div>

          <div className="terms-section">
            <h3 className='terms-heading'>{ABOUT_THE_WEBSITE.heading}</h3>
            <div className='terms-content' dangerouslySetInnerHTML={{ __html: ABOUT_THE_WEBSITE.content }} />
          </div>

          <div className="terms-section">
            <h3 className='terms-heading'>{LEGAL_RIGHTS.heading}</h3>
            <div className='terms-content' dangerouslySetInnerHTML={{ __html: LEGAL_RIGHTS.content }} />
          </div>

          <div className="terms-section">
            <h3 className='terms-heading'>{INFORMATION_AND_PRICING.heading}</h3>
            <div className='terms-content' dangerouslySetInnerHTML={{ __html: INFORMATION_AND_PRICING.content }} />
          </div>

          <div className="terms-section">
            <h3 className='terms-heading'>{PAYMENT_INFORMATION.heading}</h3>
            <div className='terms-content' dangerouslySetInnerHTML={{ __html: PAYMENT_INFORMATION.content }} />
          </div>

          <div className="terms-section">
            <h3 className='terms-heading'>{INFORMATION_ON_SITE.heading}</h3>
            <div className='terms-content' dangerouslySetInnerHTML={{ __html: INFORMATION_ON_SITE.content }} />
          </div>

          <div className="terms-section">
            <h3 className='terms-heading'>{PRIVACY_POLICY.heading}</h3>
            <div className='terms-content' dangerouslySetInnerHTML={{ __html: PRIVACY_POLICY.content }} />
          </div>

          <div className="terms-section">
            <h3 className='terms-heading'>{COPYRIGHT.heading}</h3>
            <div className='terms-content' dangerouslySetInnerHTML={{ __html: COPYRIGHT.content }} />
          </div>

          <div className="terms-section">
            <h3 className='terms-heading'>{INDEMNIFICATION.heading}</h3>
            <div className='terms-content' dangerouslySetInnerHTML={{ __html: INDEMNIFICATION.content }} />
          </div>

          <div className="terms-section">
            <h3 className='terms-heading'>{SUBMISSIONS.heading}</h3>
            <div className='terms-content' dangerouslySetInnerHTML={{ __html: SUBMISSIONS.content }} />
          </div>

          <div className="terms-section">
            <h3 className='terms-heading'>{CUSTOM_JEWELLERY.heading}</h3>
            <div className='terms-content' dangerouslySetInnerHTML={{ __html: CUSTOM_JEWELLERY.content }} />
          </div>
        </div>
      </section>

      <UvpIconFooter data={TERMS_UVPS} />
    </div>
  );
}

const ABOUT_THE_WEBSITE = {
  heading: 'Website Terms & Use',
  content: `
     <p>
      These Terms and Conditions apply to the Diamond Jewellery website located at https://hydrogen-store-2026.pages.dev/ and all related services, pages, and content operated by Diamond Investment Group Pty Ltd ('Diamond Jewellery', 'we', 'our', or 'us').
    </p>
    <ul>
      <li>By accessing or using this Site, you agree to comply with these Terms and Conditions.</li>
      <li>These Terms govern your use of the Site, including browsing, purchasing products, and interacting with our services.</li>
      <li>Diamond Jewellery may update or modify these Terms at any time without prior notice.</li>
      <li>Changes become effective immediately upon publication on the Site.</li>
      <li>If you do not agree with these Terms, please discontinue use of the Site.</li>
    </ul>
  `
};

const LEGAL_RIGHTS = {
  heading: 'Consumer Rights',
  content: `
     <p>
      Our products and services are provided in accordance with applicable consumer protection laws, including the Australian Consumer Law where applicable.
    </p>
    <ul>
      <li>If a product experiences a major fault, you may be entitled to a repair, replacement, or refund.</li>
      <li>If an issue does not constitute a major failure, we may repair or replace the product within a reasonable timeframe.</li>
      <li>Your statutory rights remain unaffected by these Terms and Conditions.</li>
    </ul>
  `
};

const INFORMATION_AND_PRICING = {
  heading: 'Product Information & Pricing',
  content: `
     <p>
      We aim to ensure all information, imagery, and pricing displayed on our Site are accurate and current. However, occasional errors or inaccuracies may occur.
    </p>
    <ul>
      <li>Product prices, specifications, and availability may change without notice.</li>
      <li>If an incorrect price or product detail is displayed, we reserve the right to correct the error and cancel or amend affected orders.</li>
      <li>In the event of an order cancellation caused by pricing inaccuracies, clients will be notified promptly.</li>
      <li>All listed prices are final and non-negotiable unless otherwise stated.</li>
    </ul>
  `
};

const PAYMENT_INFORMATION = {
  heading: 'Payment Terms',
  content: `
     <p>
      By submitting payment information during checkout, you authorise Diamond Jewellery and our payment providers to process payment using your selected payment method.
    </p>
    <p>
      Orders will only proceed once payment has been successfully authorised and confirmed.
    </p>
  `
};

const INFORMATION_ON_SITE = {
  heading: 'Website Content & Imagery',
  content: `
    <p>
      We strive to present our jewellery as accurately as possible through photography, descriptions, and digital renders. Due to varying screen settings and image scaling, slight differences in colour, size, or appearance may occur.
    </p>
    <ul>
      <li>Some product images may appear enlarged to showcase fine details and craftsmanship.</li>
      <li>Gemstone measurements and dimensions are approximate and may vary slightly between pieces.</li>
    </ul>
  `
};

const PRIVACY_POLICY = {
  heading: 'Terms of Service',
  content: `
    <p>
      By using our Site and services, you agree to comply with our Terms of Service, policies, and conditions relating to purchases, payments, and website usage.
    </p>
  `
};

const COPYRIGHT = {
  heading: 'Copyright & Intellectual Property',
  content: `
    <p>
      All content featured on the Site, including logos, product designs, images, graphics, videos, text, and branding, is the property of Diamond Jewellery or used under licence and is protected by copyright and intellectual property laws.
    </p>
    <ul>
      <li>No content from the Site may be copied, reproduced, modified, or distributed without prior written consent.</li>
      <li>All jewellery designs, product imagery, and creative assets remain the intellectual property of Diamond Jewellery.</li>
      <li>Unauthorised commercial use of our content or branding is strictly prohibited.</li>
      <li>Third-party trademarks and brand names remain the property of their respective owners.</li>
    </ul>
  `
};

const INDEMNIFICATION = {
  heading: 'Liability & Indemnity',
  content: `
    <p>
      By using this Site, you agree to indemnify and hold harmless Diamond Jewellery and its affiliates, employees, and service providers against claims, damages, liabilities, or expenses arising from:
    </p>
    <ul>
      <li>Your misuse of the Site or breach of these Terms.</li>
      <li>Your violation of any applicable laws or third-party rights.</li>
      <li>Any content or material submitted through the Site by you.</li>
    </ul>
  `
};

const SUBMISSIONS = {
  heading: 'User Submissions',
  content: `
    <p>
      Any suggestions, reviews, feedback, ideas, or other materials submitted to Diamond Jewellery may be used by us without restriction or compensation.
    </p>
    <ul>
      <li>By submitting content, you grant Diamond Jewellery permission to use, reproduce, and publish that content for promotional or commercial purposes.</li>
      <li>You confirm that any submitted content does not infringe on the rights of third parties.</li>
      <li>Diamond Jewellery reserves the right to remove or refuse submitted content at its discretion.</li>
    </ul>
  `
};

const CUSTOM_JEWELLERY = {
  heading: 'Custom Jewellery Orders',
  content: `
    <ul>
      <li>Custom-made jewellery pieces are specially crafted to order and are therefore non-refundable and non-returnable.</li>
      <li>Production timelines for custom pieces may vary depending on design complexity and stone availability.</li>
      <li>All custom designs, renders, and related creative materials remain the intellectual property of Diamond Jewellery.</li>
    </ul>
  `
};

const TERMS_UVPS = [
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
/** @typedef {import('./+types/careers').Route} Route */