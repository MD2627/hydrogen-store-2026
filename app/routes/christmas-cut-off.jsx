import { useLoaderData } from 'react-router';
import { useRef, useState, useEffect } from 'react';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import '../styles/christmas-cut-off.css';
import { Link } from "react-router";


/**
 * @type {Route.MetaFunction}
 */

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
    throw new Response("Not Found", { status: 404 });
  return {
    importantDates: IMPORTANT_DATES
  };
}

export default function ChristmasCutOff() {
  const data = useLoaderData();


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="christmas-cut-off">
      <h1 className='main-heading w-300 l-h-1-1 black-color'>{MAIN_HEADING.heading}</h1>
      <div className='christmas-details'>
        <div className="important-dates">
          <h3 className='w-300 l-h-1-1 black-color'>{IMPORTANT_DATES.heading}</h3>
          <div className='w-300 l-h-1-2 black-color' dangerouslySetInnerHTML={{ __html: IMPORTANT_DATES.content }} />
        </div>

        <div className="standard-orders">
          <h3 className='w-300 l-h-1-1 black-color'>{STANDARD_ORDERS.heading}</h3>
          <div className='w-300 l-h-1-2 black-color' dangerouslySetInnerHTML={{ __html: STANDARD_ORDERS.content }} />
        </div>

        <div className="expedited-orders">
          <h3 className='w-300 l-h-1-1 black-color'>{EXPEDITED_ORDERS.heading}</h3>
          <div className='w-300 l-h-1-2 black-color' dangerouslySetInnerHTML={{ __html: EXPEDITED_ORDERS.content }} />
        </div>

        <div className="ready-to-ship">
          <h3 className='w-300 l-h-1-1 black-color'>{READY_TO_SHIP.heading}</h3>
          <div className='w-300 l-h-1-2 black-color' dangerouslySetInnerHTML={{ __html: READY_TO_SHIP.content }} />
        </div>

        <div className="delivery">
          <h3 className='w-300 l-h-1-1 black-color'>{DELIVERY.heading}</h3>
          <div className='w-300 l-h-1-2 black-color' dangerouslySetInnerHTML={{ __html: DELIVERY.content }} />
        </div>
      </div>
     
      {/* Footer UVPs */}
      <UvpIconFooter data={OUR_STORY_UVPS} />
    </div>
  );
}

// ============================================
// DATA CONFIGURATIONS
// ============================================
const MAIN_HEADING = {
  heading: 'Christmas Completion Cut-Off'
};

const IMPORTANT_DATES = {
  heading: 'Important Dates',

  content: `
    <ul>
      <li><strong>Standard Orders:</strong> October 14 11:59PM AEST</li>
      <li><strong>40 Business Day Expediting:</strong> October 28 11:59PM AEST</li>
      <li><strong>30 Business Day Expediting:</strong> November 12 11:59PM AEST</li>
      <li><strong>Ready-To-Ship:</strong> December 13 11:59PM AEST</li>
    </ul>

    <p>
      While we can’t guarantee Christmas delivery for orders placed after the deadlines,
      we’ll still be taking orders for completion in the new year.
    </p>
  `
};


const STANDARD_ORDERS = {
  heading: 'Standard Orders',

  content: `
    <p>
      <strong>Standard Orders</strong> need to be placed through the website or finalised with our team on or before October 14.
    </p>
  `
};

const EXPEDITED_ORDERS = {
  heading: 'Expedited Orders',

  content: `
    <p>
      <strong>40 Business Day Expedited Orders</strong> need to be placed through the website
      or finalised with our team on or before October 28.
    </p>

    <p>
      <strong>30 Business Day Expedited Orders</strong> need to be placed through the website
      or finalised with our team on or before November 12.
    </p>
  `
};


const READY_TO_SHIP = {
  heading: 'Ready-To-Ship Orders',

  content: `
    <p>
      <strong>Ready-To-Ship Orders</strong> that require resizing need to be placed through
      the website or finalised with our team on or before December 13.
    </p>
  `
};


const DELIVERY = {
  heading: 'Delivery',

  content: `
    <p>
      If your ring is ordered by the specified deadlines, we’ll have it ready by Christmas.
      However, <strong>shipping times are not included</strong> and are outside of our control
      during the holiday season. We recommend placing your order well ahead of time if you need it shipped,
      to ensure it arrives in time.
    </p>

    <p>
      If you have any questions regarding the Christmas Cut-Off please get in touch with our team.
    </p>
  `
};


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

/** @typedef {import('./+types/careers').Route} Route */
