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
  return [{ title: 'Terms and Conditions | Cullen Jewellery' }];
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
        imageSrc="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Sydney_showroom_1300x1300.jpg?v=1740089318"
        title="Terms and Conditions"
        subtitle="Please read our terms and conditions carefully."
        extraClass="story-craft-banner--terms"
      />

      <div className='terms-and-conditions-details'>
        <div className="about-the-website">
          <h3 className='w-300 l-h-1-1 black-color ff-a'>{ABOUT_THE_WEBSITE.heading}</h3>
          <div className='w-300 l-h-1-2 black-color ff-c' dangerouslySetInnerHTML={{ __html: ABOUT_THE_WEBSITE.content }} />
        </div>

        <div className="legal-rights">
          <h3 className='w-300 l-h-1-1 black-color ff-a'>{LEGAL_RIGHTS.heading}</h3>
          <div className='w-300 l-h-1-2 black-color ff-c' dangerouslySetInnerHTML={{ __html: LEGAL_RIGHTS.content }} />
        </div>

        <div className="information-and-pricing">
          <h3 className='w-300 l-h-1-1 black-color ff-a'>{INFORMATION_AND_PRICING.heading}</h3>
          <div className='w-300 l-h-1-2 black-color ff-c' dangerouslySetInnerHTML={{ __html: INFORMATION_AND_PRICING.content }} />
        </div>

        <div className="payment-information">
          <h3 className='w-300 l-h-1-1 black-color ff-a'>{PAYMENT_INFORMATION.heading}</h3>
          <div className='w-300 l-h-1-2 black-color ff-c' dangerouslySetInnerHTML={{ __html: PAYMENT_INFORMATION.content }} />
        </div>

        <div className="information-on-site">
          <h3 className='w-300 l-h-1-1 black-color ff-a'>{INFORMATION_ON_SITE.heading}</h3>
          <div className='w-300 l-h-1-2 black-color ff-c' dangerouslySetInnerHTML={{ __html: INFORMATION_ON_SITE.content }} />
        </div>

        <div className="privacy-policy">
          <h3 className='w-300 l-h-1-1 black-color ff-a'>{PRIVACY_POLICY.heading}</h3>
          <div className='w-300 l-h-1-2 black-color ff-c' dangerouslySetInnerHTML={{ __html: PRIVACY_POLICY.content }} />
        </div>

        <div className="copyright">
          <h3 className='w-300 l-h-1-1 black-color ff-a'>{COPYRIGHT.heading}</h3>
          <div className='w-300 l-h-1-2 black-color ff-c' dangerouslySetInnerHTML={{ __html: COPYRIGHT.content }} />
        </div>

        <div className="indemnification">
          <h3 className='w-300 l-h-1-1 black-color ff-a'>{INDEMNIFICATION.heading}</h3>
          <div className='w-300 l-h-1-2 black-color ff-c' dangerouslySetInnerHTML={{ __html: INDEMNIFICATION.content }} />
        </div>

        <div className="submissions">
          <h3 className='w-300 l-h-1-1 black-color ff-a'>{SUBMISSIONS.heading}</h3>
          <div className='w-300 l-h-1-2 black-color ff-c' dangerouslySetInnerHTML={{ __html: SUBMISSIONS.content }} />
        </div>

        <div className="custom-jewellery">
          <h3 className='w-300 l-h-1-1 black-color ff-a'>{CUSTOM_JEWELLERY.heading}</h3>
          <div className='w-300 l-h-1-2 black-color ff-c' dangerouslySetInnerHTML={{ __html: CUSTOM_JEWELLERY.content }} />
        </div>
      </div>

      <UvpIconFooter data={TERMS_UVPS} />
    </div>
  );
}

const ABOUT_THE_WEBSITE = {
  heading: 'About the Website',
  content: `
     <p>
      These Terms and Conditions apply to the Cullen Jewellery website located at www.cullenjewellery.com, and all associated websites linked to www.cullenjewellery.com by Cullen Investment Group Pty Ltd ('the Site'). 
      Please read these Terms and Conditions (the 'Terms and Conditions') carefully.
    </p>
    <ul>
      <li>By using the Site, you agree to be bound by these Terms and Conditions.</li>
      <li>These Terms and Conditions govern your use of, and any purchase from, the Site, and constitute an agreement between you and Cullen Jewellery.</li>
      <li>Cullen Jewellery reserves the right to change any of these Terms and Conditions or any policy of the Site at any time. Any change will be effective immediately from their date of publication.</li>
      <li>You accept these Terms and Conditions by remaining on the Site.</li>
      <li>If you do not agree to these Terms and Conditions, you must stop using the Site.</li>
    </ul>
  `
};

const LEGAL_RIGHTS = {
  heading: 'Legal Rights',
  content: `
     <p>
      The purchase of our products and services come with guarantees subject to the Australian Consumer Law. Under these laws all products must be of acceptable quality, 
      reasonably fit for purpose and must correspond to the relevant description.
    </p>
    <ul>
      <li>If you experience a major failure with our goods or services you are entitled to a replacement or refund and compensation for any other reasonably foreseeable loss or 
        damage resulting from our product or service</li>
      <li>If the goods fail to be of acceptable quality but the problem does not amount to a major failure, you are entitled to have the goods repaired or replaced.</li>
    </ul>
  `
};

const INFORMATION_AND_PRICING = {
  heading: 'Information and Pricing',
  content: `
     <p>
      Information and prices of our jewellery and loose stones are subject to change without notice. Information we communicate is not a binding contract and should not be treated as such. 
      If a client acts on incorrect information they can request a cancellation of any order placed upon the basis of this incorrect information. We apologise for any inconvenience that this may cause. 
      If you have any questions, please do not hesitate to contact one of our diamond and jewellery experts via our contact form.
    </p>
    <ul>
      <li>We endeavour to provide updated and accurate information on our website, emails, SMS, social media and private messages in terms of information and pricing but it is possible errors can occur. 
        Data, including prices, may be inaccurately displayed on our Site due to system or typographical errors. While we make every attempt to avoid these errors, they may occur.</li>
      <li>We reserve the right to correct any and all errors when they do occur, and we do not honour inaccurate or erroneous prices. If a product's listed price is lower than its actual price, we will, 
        at our discretion, either contact you for instructions before crafting the product or cancel the order and notify you of such cancellation.</li>
      <li>We do not negotiate prices on our products and all our prices are final.</li>
    </ul>
  `
};

const PAYMENT_INFORMATION = {
  heading: 'Payment Information',
  content: `
     <p>
      After you have selected your jewellery and provided shipping information, you will see a prompt for your payment details, such as your credit card information and any promotional 
      codes or gift cards you may have. By entering your payment information and submitting your order, you authorise us and our third party payment processors to charge the amount of the 
      order to your selected payment method.
    </p>
  `
};

const INFORMATION_ON_SITE = {
  heading: 'Information On Our Site',
  content: `
    <p>
      At Cullen Jewellery, we make every attempt to ensure that our online catalogue is as accurate and complete as possible. In order to give you the opportunity to view our products in great detail, some products may appear larger or smaller than their actual size in our photographs, and since every computer monitor is set differently, colour and size may vary slightly.
    </p>
    <ul>
      <li>Moissanite stones are sold and described in millimetres (mm). All carat weights are quoted as approximate diamond equivalent carat weights.</li>
    </ul>
  `
};

const PRIVACY_POLICY = {
  heading: 'Privacy Policy',
  content: `
    <p>
      Please refer to our Privacy Policy for information on how Cullen Jewellery collects, uses, and discloses personally identifiable information from its clients.
    </p>
  `
};

const COPYRIGHT = {
  heading: 'Copyright and Intellectual Property',
  content: `
    <p>
      The Site and all content, including, but not limited to, the Cullen Jewellery logo, and all designs, text, graphics, logos, button icons, videos, sound files and software pictures, (the 'Content') used on or incorporated into the Site and in-store, and the selection, arrangement and/or integration of all such Content are either registered trademarks, trade names, service marks, copyrights or otherwise protected property of Cullen Jewellery, or used under license and all rights thereto are specifically reserved.
    </p>
    <ul>
      <li>The Cullen Jewellery Site, purchase services, jewellery designs and all Cullen Jewellery related products are subject to copyright. The Site’s material is protected by Australian copyright laws and international treaties.</li>
      <li>Unless otherwise indicated, all Site content is owned and controlled by Cullen Jewellery and may not be copied, imitated or used, in whole or in part, without the prior written permission of Cullen Jewellery or the applicable trademark holder.</li>
      <li>You may not copy, use, download, modify, frame, publish, transmit, transfer or sell, license, reproduce, create derivative works from, distribute or display the Content or third party content for any purpose without the prior written permission of Cullen Jewellery.</li>
      <li>All other trademarks, registered trademarks, product names and Cullen Jewellery names or logos mentioned in our Site are the property of their respective owners.</li>
    </ul>
  `
};

const INDEMNIFICATION = {
  heading: 'Indemnification',
  content: `
    <p>
      You agree to indemnify Cullen Jewellery, its affiliates, employees, independent contractors, service providers and consultants, from and against:
    </p>
    <ul>
      <li>any claims, damages, costs, liabilities, and expenses (including, but not limited to, reasonable attorneys' fees) arising out of or related to any Content you post, store or otherwise transmit on or through our Site or your use of or inability to use our Site;</li>
      <li>any direct or indirect consequences of your access, use or transactions on the Site; and/or</li>
      <li>any breach of the Terms.</li>
    </ul>
  `
};

const SUBMISSIONS = {
  heading: 'Submissions',
  content: `
    <p>
      You acknowledge and agree that any materials, including but not limited to questions, comments, suggestions, ideas, plans, notes, drawings, original or creative materials or other information, regarding this site, Cullen Jewellery, or our products or services that are provided by you to Cullen Jewellery are non-confidential and shall become the sole property of Cullen Jewellery.
    </p>
    <ul>
      <li>Cullen Jewellery will own exclusive rights, including all intellectual property rights, and will be entitled to the unrestricted use and dissemination of these materials for any purpose, commercial or otherwise, without acknowledgement or compensation to you.</li>
      <li>You grant Cullen Jewellery and its affiliates and sublicensees the right to use the name that you submit in connection with such content, if they choose.</li>
      <li>You represent and warrant that: (a) you own and control all of the rights to the content that you submit, or that you otherwise have the right to submit such content to this site; (b) the content is accurate and not misleading; and (c) use and posting of the content you supply will not violate any rights or cause injury to any person or entity.</li>
    </ul>
  `
};

const CUSTOM_JEWELLERY = {
  heading: 'Custom-Made Jewellery',
  content: `
    <ul>
      <li>Please choose carefully when purchasing a custom designed piece of fine jewellery. Since all custom jewellery is made to order, they cannot be returned or refunded.</li>
      <li>All custom-made jewellery designs, images and videos created by Cullen Jewellery are the intellectual property of Cullen Jewellery and may be reproduced at our discretion.</li>
    </ul>
  `
};

const TERMS_UVPS = [
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
/** @typedef {import('./+types/careers').Route} Route */