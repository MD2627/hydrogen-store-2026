import { Link, useNavigate, useSearchParams, useLocation } from 'react-router';
import { AddToCartButton } from './AddToCartButton';
import { useAside } from './Aside';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Money } from '@shopify/hydrogen';

// Configuration: Set to true to redirect to /cart page after adding to cart.
// Set to false to open the Cart Drawer (default behavior).
const ADD_TO_CART_REDIRECTS_TO_CART = false;


/**
 * =====================================================
 * RING SIZES CONFIGURATION - Easy to Add/Remove Sizes
 * =====================================================
 * Each size object has:
 * - value: The size value (what gets saved to cart)
 * - label: Display label shown to customer
 * - format: Size format indicator (e.g., AU/UK, US, EU)
 */
const RING_SIZES_CONFIG = [
  { value: '3', label: '3', format: 'US' },
  { value: '3.25', label: '3.25', format: 'US' },
  { value: '3.50', label: '3.50', format: 'US' },
  { value: '3.75', label: '3.75', format: 'US' },
  { value: '4', label: '4', format: 'US' },
  { value: '4.25', label: '4.25', format: 'US' },
  { value: '4.50', label: '4.50', format: 'US' },
  { value: '4.75', label: '4.75', format: 'US' },
  { value: '5', label: '5', format: 'US' },
  { value: '5.25', label: '5.25', format: 'US' },
  { value: '5.50', label: '5.50', format: 'US' },
  { value: '5.75', label: '5.75', format: 'US' },
  { value: '6', label: '6', format: 'US' },
  { value: '6.25', label: '6.25', format: 'US' },
  { value: '6.50', label: '6.50', format: 'US' },
  { value: '6.75', label: '6.75', format: 'US' },
  { value: '7', label: '7', format: 'US' },
  { value: '7.25', label: '7.25', format: 'US' },
  { value: '7.50', label: '7.50', format: 'US' },
  { value: '7.75', label: '7.75', format: 'US' },
  { value: '8', label: '8', format: 'US' },
  { value: '8.25', label: '8.25', format: 'US' },
  { value: '8.50', label: '8.50', format: 'US' },
  { value: '8.75', label: '8.75', format: 'US' },
  { value: '9', label: '9', format: 'US' },
  { value: '9.25', label: '9.25', format: 'US' },
  { value: '9.50', label: '9.50', format: 'US' },
  { value: '9.75', label: '9.75', format: 'US' },
  { value: '10', label: '10', format: 'US' },
];

/**
 * =====================================================
 * GEMSTONE CONFIGURATION
 * =====================================================
 */
const GEMSTONE_CONFIG = {
  stoneType: {
    label: 'STONE TYPE',
    tooltip: 'Choose the perfect stone for your ring from our range of lab grown diamonds, moissanite and sapphires.',
    options: [
      { value: 'lab-diamond', label: 'Lab Grown Diamond' },
      // { value: 'moissanite', label: 'Moissanite' },
    ],
    defaultValue: 'lab-diamond',
  },
  clarity: {
    label: 'CLARITY',
    tooltip: 'Clarity measures the visual purity of the gemstone.',
    description: "Clarity measures a gemstone's visual purity: the fewer inclusions and blemishes, the higher the grade. Inclusions (naturally occuring specks within the stone) are common, but rarer in more valuable stones, which have little to none.",
    options: [
      { value: 'I1', label: 'I1', description: 'I1 - Included 1: Inclusions easily observed with 10x magnification and often able to be seen with the eye.', image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/clarity_i1.png?v=1768222288' },
      { value: 'SI2', label: 'SI2', description: 'SI2 - Slightly Included 2: Slightly more inclusions than a SI1 stone but still not easily seen by the eye.', image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/clarity_si2.png?v=1768222288' },
      { value: 'SI1', label: 'SI1', description: 'SI1 - Slightly Included 1: Inclusions that can be seen under 10x magnification but not easily seen by the eye.', image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/clarity_si1.png?v=1768222288' },
      { value: 'VS2', label: 'VS2', description: 'VS2 - Very Slightly Included 2: Slightly more small inclusions than a VS1. Still quite difficult to see and will mostly be invisible to the naked eye.', image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/clarity_vs2.png?v=1768222288' },
      { value: 'VS1', label: 'VS1', description: 'VS1 - Very Slightly Included 1: Small inclusions difficult to see with 10x magnification, and will almost always be invisible to the naked eye.', image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/clarity_vs1.png?v=1768222288' },
      { value: 'VVS2', label: 'VVS2', description: 'VVS2 - Very Very Slightly Included 2: Slightly more small inclusions than a VVS1. Still extremely difficult to see at 10x magnification.', image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/clarity_vvs2.png?v=1768222288' },
      { value: 'VVS1', label: 'VVS1', description: 'VVS1 - Very Very Slightly Included 1: Small inclusions extremely difficult to see at 10x magnification.', image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/clarity_vvs1.png?v=1768222288' },
      { value: 'IF', label: 'IF', description: 'IF - Internally Flawless: An extremely rare diamond, it has some slight surface blemishes or polish marks.', image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/clarity_if.png?v=1768222288' },
    ],
    defaultValue: 'VS1',
  },
  carat: {
    label: 'CARAT',
    description: "Carat measures a lab grown diamond's weight: one carat equals 0.2 grams (200mg). While carat and size usually increase together, the shape and cut of a gemstone can affect how large it appears.",
    handImageCaption: 'Actual diamond size on size 6 hand',
    minCarat: 0.25,
    maxCarat: 10,
    step: 0.01,
    defaultValue: '2.00-2.24',
    handImages: {
      light: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/hand_light.R2T1drhK.webp?v=1768282469',
      dark: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/hand_dark.BZClr1PQ.webp?v=1768282469',
      stone: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/hand_stone_round.DNPAivQg.webp?v=1768282386',
    },
    getScale: (caratValue) => {
      const minScale = 0.6;
      const maxScale = 4.7;
      const t = (caratValue - 0.25) / (10 - 0.25);
      return minScale + t * (maxScale - minScale);
    },
    options: [
      { value: '0.25-0.49', label: '0.25-0.49ct', caratWeight: 0.37 },
      { value: '0.50-0.74', label: '0.50-0.74ct', caratWeight: 0.62 },
      { value: '0.75-0.99', label: '0.75-0.99ct', caratWeight: 0.87 },
      { value: '1.00-1.24', label: '1.00-1.24ct', caratWeight: 1.12 },
      { value: '1.25-1.49', label: '1.25-1.49ct', caratWeight: 1.37 },
      { value: '1.50-1.74', label: '1.50-1.74ct', caratWeight: 1.62 },
      { value: '1.75-1.99', label: '1.75-1.99ct', caratWeight: 1.87 },
      { value: '2.00-2.24', label: '2.00-2.24ct', caratWeight: 2.12 },
      { value: '2.25-2.49', label: '2.25-2.49ct', caratWeight: 2.37 },
      { value: '2.50-2.74', label: '2.50-2.74ct', caratWeight: 2.62 },
      { value: '2.75-2.99', label: '2.75-2.99ct', caratWeight: 2.87 },
      { value: '3.00-3.24', label: '3.00-3.24ct', caratWeight: 3.12 },
      { value: '3.25-3.49', label: '3.25-3.49ct', caratWeight: 3.37 },
      { value: '3.50-3.74', label: '3.50-3.74ct', caratWeight: 3.62 },
      { value: '3.75-3.99', label: '3.75-3.99ct', caratWeight: 3.87 },
      { value: '4.00-4.24', label: '4.00-4.24ct', caratWeight: 4.12 },
      { value: '4.25-4.49', label: '4.25-4.49ct', caratWeight: 4.37 },
      { value: '4.50-4.74', label: '4.50-4.74ct', caratWeight: 4.62 },
      { value: '4.75-4.99', label: '4.75-4.99ct', caratWeight: 4.87 },
      { value: '5.00-5.24', label: '5.00-5.24ct', caratWeight: 5.12 },
      { value: '5.25-5.49', label: '5.25-5.49ct', caratWeight: 5.37 },
      { value: '5.50-5.74', label: '5.50-5.74ct', caratWeight: 5.62 },
      { value: '5.75-5.99', label: '5.75-5.99ct', caratWeight: 5.87 },
      { value: '6.00-6.24', label: '6.00-6.24ct', caratWeight: 6.12 },
      { value: '6.25-6.49', label: '6.25-6.49ct', caratWeight: 6.37 },
      { value: '6.50-6.74', label: '6.50-6.74ct', caratWeight: 6.62 },
      { value: '6.75-6.99', label: '6.75-6.99ct', caratWeight: 6.87 },
      { value: '7.00-7.24', label: '7.00-7.24ct', caratWeight: 7.12 },
      { value: '7.25-7.49', label: '7.25-7.49ct', caratWeight: 7.37 },
      { value: '7.50-7.74', label: '7.50-7.74ct', caratWeight: 7.62 },
      { value: '7.75-7.99', label: '7.75-7.99ct', caratWeight: 7.87 },
      { value: '8.00-8.24', label: '8.00-8.24ct', caratWeight: 8.12 },
      { value: '8.25-8.49', label: '8.25-8.49ct', caratWeight: 8.37 },
      { value: '8.50-8.74', label: '8.50-8.74ct', caratWeight: 8.62 },
      { value: '8.75-8.99', label: '8.75-8.99ct', caratWeight: 8.87 },
      { value: '9.00-9.24', label: '9.00-9.24ct', caratWeight: 9.12 },
      { value: '9.25-9.49', label: '9.25-9.49ct', caratWeight: 9.37 },
      { value: '9.50-9.74', label: '9.50-9.74ct', caratWeight: 9.62 },
      { value: '9.75-9.99', label: '9.75-9.99ct', caratWeight: 9.87 },
    ],
  },
  colour: {
    label: 'COLOUR',
    tooltip: 'Stone colour refers to the absence of colour in the diamond.',
    description: "Stone colour refers to the absence of colour: perfectly colourless lab grown diamonds and moissanite are the most valuable, while brown or yellowish stones rank lower in quality.",
    // Diamond images for color blending (yellow base, white overlay)
    diamondImages: {
      yellow: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/colour_j.png?v=1768284623',
      white: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/colour_d.png?v=1768284864',
    },
    options: [
      { value: 'J', label: 'J', description: 'J - Near Colourless: Still very clear but a yellow tint may be visible if compared next to a higher-grade stone.', whiteOpacity: 0 },
      { value: 'I', label: 'I', description: 'I - Near Colourless: Still very clear but a faint yellow tint may be visible if compared to a higher-grade stone.', whiteOpacity: 0.17 },
      { value: 'H', label: 'H', description: 'H - Near Colourless: Still extremely clear but some slight colour may be seen if compared next to a higher-grade stone.', whiteOpacity: 0.33 },
      { value: 'G', label: 'G', description: 'G - Near Colourless: Still extremely clear but some very slight colour may be seen if compared next to a higher-grade stone..', whiteOpacity: 0.50 },
      { value: 'F', label: 'F', description: 'F - Colourless: Still colourless to the untrained eye, however slight colour may be seen by an expert.', whiteOpacity: 0.67 },
      { value: 'E', label: 'E', description: 'E - Colourless: Very similar to D colour, except some minute colour differences may be spotted by an expert.', whiteOpacity: 0.83 },
      { value: 'D', label: 'D', description: 'D - Completely Colourless: The highest colour quality available.', whiteOpacity: 1.0 },
    ],
    defaultValue: 'D',
  },
};

/**
 * =====================================================
 * ENGRAVING CONFIGURATION
 * =====================================================
 */
const ENGRAVING_CONFIG = {
  maxCharacters: 15,
  fonts: [
    { value: 'bookman', label: 'Bookman Old Style', fontFamily: '"Bookman Old Style", Georgia, serif' },
    { value: 'sans-serif', label: 'Sans Serif', fontFamily: 'Arial, sans-serif' },
    { value: 'script', label: 'Script', fontFamily: 'Brush Script MT, cursive' },
    { value: 'serif', label: 'Serif', fontFamily: 'Georgia, serif' },
    { value: 'monospace', label: 'Monospace', fontFamily: 'Courier New, monospace' },
    { value: 'elegant', label: 'Elegant', fontFamily: 'Playfair Display, serif' },
  ]
};

/**
 * =====================================================
 * TIMELINE CONFIGURATION
 * =====================================================
 * daysToAdd: Business days added to today's date
 * deliveryDays: Additional days for shipping after completion
 */
const TIMELINE_CONFIG = {
  deliveryDays: 24,
  options: [
    { value: 'standard', label: 'Standard', daysToAdd: 50, extraCost: 0 },
  ]
};

/**
 * =====================================================
 * TRUST BADGES CONFIGURATION
 * =====================================================
 * Each badge has:
 * - label: Display text (uppercase)
 * - url: Link destination
 * - icon: SVG path data for the icon
 */
const TRUST_BADGES_CONFIG = [
  {
    label: 'Lifetime Warranty',
    url: '/pages/warranty',
    icon: 'M15 2.587 4.25 8.793v7.362a8.774 8.774 0 0 0 4.375 7.577L15 27.413l6.375-3.68a8.774 8.774 0 0 0 4.375-7.578V8.793L15 2.587Zm9.25 13.568a7.271 7.271 0 0 1-3.625 6.279L15 25.68l-5.625-3.247a7.271 7.271 0 0 1-3.625-6.28V9.66L15 4.32l9.25 5.34v6.495Zm-11.733.268 3.906-3.906a3.516 3.516 0 0 1 4.967 0 3.516 3.516 0 0 1 0 4.966c-.685.685-1.584 1.027-2.484 1.027s-1.799-.342-2.483-1.027l-.572-.571 1.06-1.06.572.57a2.015 2.015 0 0 0 2.846 0 2.014 2.014 0 0 0 0-2.845 2.015 2.015 0 0 0-2.846 0l-3.906 3.906a3.516 3.516 0 0 1-4.967 0 3.516 3.516 0 0 1 0-4.966 3.516 3.516 0 0 1 4.967 0l.589.588-1.061 1.06-.588-.588a2.015 2.015 0 0 0-2.846 0 2.014 2.014 0 0 0 0 2.846 2.015 2.015 0 0 0 2.846 0Z'
  },
  {
    label: 'Free Resizing',
    url: '/pages/free-resizing',
    icon: 'M24.289 18.18c0 5.122-4.167 9.289-9.289 9.289s-9.289-4.167-9.289-9.29a9.286 9.286 0 0 1 5.615-8.533l.593 1.376a7.788 7.788 0 0 0-4.708 7.158c0 4.295 3.495 7.789 7.789 7.789s7.789-3.494 7.789-7.79c0-4.294-3.495-7.788-7.789-7.788-.259 0-.518.018-.768.044l-.367.037-4.585-4.84 2.495-3.382h6.45l2.492 3.377-2.55 2.733-1.097-1.024 1.7-1.82-1.302-1.766h-4.936l-1.3 1.761 3.22 3.4c.181-.013.364-.02.548-.02 5.122 0 9.289 4.167 9.289 9.289ZM11.75 18h-1.5v4.75H15v-1.5h-2.19l5.44-5.44V18h1.5v-4.75H15v1.5h2.19l-5.44 5.44V18Z'
  },
  {
    label: 'Free Express & Insured Shipping',
    url: '/pages/shipping',
    icon: 'M12 16.75H2v-1.5h10v1.5Zm13.074 8.417c-.332.37-.807.583-1.304.583H8.196a1.752 1.752 0 0 1-1.74-1.942l.448-4.058H4v-1.5h4.578l-.63 5.723a.248.248 0 0 0 .248.277H23.77a.247.247 0 0 0 .186-.083.247.247 0 0 0 .062-.194l-1.47-13.223H9.454l-.312 2.827-1.492-.165.46-4.162h3.641v-.92c0-2.344 1.907-4.25 4.25-4.25s4.25 1.906 4.25 4.25v.92h3.642l1.617 14.557c.055.494-.104.99-.435 1.36ZM13.25 9.25h5.5v-.92c0-1.517-1.233-2.75-2.75-2.75s-2.75 1.233-2.75 2.75v.92Z'
  },
  {
    label: 'Shipped Discretely',
    url: '/pages/shipping',
    icon: 'M20.18 13.002 22.257 15l-2.62 2.52c-1.263 1.214-2.952 1.842-4.651 1.842a6.751 6.751 0 0 1-2.72-.567L9.53 21.53l-1.06-1.06 8.079-8.08c-1.756-.546-3.753-.169-5.145 1.172L9.907 15l.976.938-1.04 1.083L7.743 15l2.62-2.52c1.988-1.91 4.933-2.313 7.35-1.254L20.47 8.47l1.06 1.06-2.465 2.465-1.083 1.084-4.538 4.538c1.778.546 3.786.136 5.152-1.179L20.093 15l-.975-.937 1.062-1.06Zm5.57-6.996v17.988c0 .964-.785 1.75-1.75 1.75H6c-.965 0-1.75-.786-1.75-1.75V6.006c0-.964.785-1.75 1.75-1.75h18c.965 0 1.75.786 1.75 1.75Zm-1.5 0a.25.25 0 0 0-.25-.25H6a.25.25 0 0 0-.25.25v17.988c0 .137.112.25.25.25h18a.25.25 0 0 0 .25-.25V6.006Z'
  }
];

/**
 * =====================================================
 * PRODUCT ACCORDION CONFIGURATION
 * =====================================================
 * Each accordion item has:
 * - id: Unique identifier
 * - title: Display title (uppercase)
 * - content: JSX content to display when expanded
 */
// Helper function to render Shopify's rich text format
function renderRichText(richTextJson) {
  try {
    const data = typeof richTextJson === 'string' ? JSON.parse(richTextJson) : richTextJson;

    if (!data || !data.children) return null;

    const renderNode = (node, index) => {
      if (node.type === 'paragraph') {
        return (
          <p key={index} className="f-13 f-m-13 w-400 ff-n l-h-1-2 black-color" style={{ marginBottom: '8px' }}>
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </p>
        );
      }

      if (node.type === 'text') {
        let text = node.value;

        // Apply formatting
        if (node.bold && node.italic) {
          return <strong key={index}><em>{text}</em></strong>;
        }
        if (node.bold) {
          return <strong key={index}>{text}</strong>;
        }
        if (node.italic) {
          return <em key={index}>{text}</em>;
        }

        return <span key={index}>{text}</span>;
      }

      if (node.type === 'heading') {
        const HeadingTag = `h${node.level || 2}`;
        return (
          <HeadingTag key={index} className="f-16 f-m-16 w-500 ff-n l-h-1-2 black-color" style={{ marginBottom: '8px' }}>
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </HeadingTag>
        );
      }

      if (node.type === 'list') {
        const ListTag = node.listType === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={index} className="f-13 f-m-13 w-400 ff-n l-h-1-2 black-color" style={{ marginBottom: '8px', paddingLeft: '20px' }}>
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </ListTag>
        );
      }

      if (node.type === 'list-item') {
        return (
          <li key={index}>
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </li>
        );
      }

      return null;
    };

    return (
      <div>
        {data.children.map((child, index) => renderNode(child, index))}
      </div>
    );
  } catch (error) {
    console.error('Error rendering rich text:', error);
    return <p className="f-13 f-m-13 w-400 ff-n l-h-1-2 black-color">{richTextJson}</p>;
  }
}

// Helper function to get accordion config with metafield support
function getProductAccordionConfig(detailInfoMetafield, resizingInfoMetafield, shippingInfoMetafield) {
  const config = [
    {
      id: 'details',
      title: 'Details',
      content: detailInfoMetafield?.value ? (
        <div className="accordion-detail-content">
          {renderRichText(detailInfoMetafield.value)}
        </div>
      ) : (
        <>
          <table className="accordion-data-table">
            <tbody>
              <tr className="f-13 f-m-13 w-400 ff-n l-h-1-2 black-color">
                <th>Avg. No. Side Stones</th>
                <td>8*</td>
              </tr>
              <tr className="f-13 f-m-13 w-400 ff-n l-h-1-2 black-color">
                <th>Avg. Carat Total Weight</th>
                <td>0.70*</td>
              </tr>
              <tr className="f-13 f-m-13 w-400 ff-n l-h-1-2 black-color">
                <th>Average Band Width</th>
                <td>1.8mm</td>
              </tr>
              <tr className="f-13 f-m-13 w-400 ff-n l-h-1-2 black-color">
                <th>Center Stone Size</th>
                <td>8x6mm - 2.00ct**</td>
              </tr>
            </tbody>
          </table>

          <p className="accordion-footnote f-10 f-m-10 w-400 l-h-1-2 black-color ff-c">
            * The average carat total weight and number of stones is based on a ring of size M.
          </p>
          <p className="accordion-footnote f-10 f-m-10 w-400 l-h-1-2 black-color ff-c">
            ** Relates to size of center stone shown in product images. Center stone size may vary in lifestyle images and videos.
          </p>
        </>
      )
    }
  ];

  if (resizingInfoMetafield?.value) {
    config.push({
      id: 'resizing-info',
      title: 'Resizing Info',
      content: (
        <div className="accordion-detail-content">
          {renderRichText(resizingInfoMetafield.value)}
        </div>
      )
    });
  }

  if (shippingInfoMetafield?.value) {
    config.push({
      id: 'shipping-info',
      title: 'Shipping Info',
      content: (
        <div className="accordion-detail-content">
          {renderRichText(shippingInfoMetafield.value)}
        </div>
      )
    });
  }

  return config;
}

// Helper function to calculate future date
function getFutureDate(daysToAdd) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * @param {{
 *   productOptions: MappedProductOptions[];
 *   selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
 *   productTags: string[];
 *   showGemstoneOptions: boolean;
 *   detailInfoMetafield: { value: string } | null | undefined;
 * }}
 */
export function ProductForm({ productOptions, selectedVariant, productTags = [], showGemstoneOptions = true, detailInfoMetafield, resizingInfoMetafield, shippingInfoMetafield }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { open } = useAside();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showSizeModal, setShowSizeModal] = useState(false);

  // Set this to false to hide the entire "Your Gemstone" section (Ring Size and Stone Type)
  // When false, these properties will also NOT be added to the cart
  const SHOW_GEMSTONE_SECTION = true;

  // Set this to false to hide the Ring Size option specifically
  const SHOW_RING_SIZE_OPTION = true;

  // Set this to false to hide the Stone Type option specifically
  const SHOW_STONE_TYPE_OPTION = true;

  // Set this to true to hide Clarity, Carat, and Colour gemstone options
  const HIDE_GEMSTONE_DETAILS = true;

  // Get accordion config with metafield support
  const PRODUCT_ACCORDION_CONFIG = getProductAccordionConfig(detailInfoMetafield, resizingInfoMetafield, shippingInfoMetafield);

  // Read values from URL params
  const urlEngravingText = searchParams.get('engrave_text') || '';
  const urlEngravingFont = searchParams.get('engrave_font') || '';
  const urlRingSize = searchParams.get('ring_size') || '';
  const urlHelpMeLater = searchParams.get('ring_size') === 'help_me_later';

  // Ring size state - initialize from URL params
  const [selectedRingSize, setSelectedRingSize] = useState(() => {
    if (urlHelpMeLater) return null;
    if (urlRingSize) {
      // Check if it exists in config
      const matchingSize = RING_SIZES_CONFIIG.find(
        s => s.value.toLowerCase().replace(/\s+/g, '_') === urlRingSize.toLowerCase().replace(/\s+/g, '_') ||
          s.value.toLowerCase() === urlRingSize.toLowerCase()
      );
      return matchingSize ? matchingSize.value : null;
    }
    return null;
  });
  const [helpMeLater, setHelpMeLater] = useState(urlHelpMeLater);

  // Engraving state - initialize from URL params
  const [engravingText, setEngravingText] = useState(urlEngravingText);
  const [selectedFont, setSelectedFont] = useState(() => {
    // Find matching font from URL param or use default
    const matchingFont = ENGRAVING_CONFIG.fonts.find(
      f => f.label.toLowerCase().replace(/\s+/g, '-') === urlEngravingFont.toLowerCase().replace(/\s+/g, '-') ||
        f.value.toLowerCase() === urlEngravingFont.toLowerCase()
    );
    return matchingFont ? matchingFont.value : ENGRAVING_CONFIG.fonts[0].value;
  });

  // Timeline state
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_CONFIG.options[0].value);

  // Gemstone state
  const [selectedStoneType, setSelectedStoneType] = useState(GEMSTONE_CONFIG.stoneType.defaultValue);
  const [selectedClarity, setSelectedClarity] = useState(GEMSTONE_CONFIG.clarity.defaultValue);
  const [selectedCarat, setSelectedCarat] = useState(GEMSTONE_CONFIG.carat.defaultValue);
  const [selectedColour, setSelectedColour] = useState(GEMSTONE_CONFIG.colour.defaultValue);
  const [showClarityModal, setShowClarityModal] = useState(false);
  const [showCaratModal, setShowCaratModal] = useState(false);
  const [showColourModal, setShowColourModal] = useState(false);
  const [stoneTypeHover, setStoneTypeHover] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  // Toggle accordion function
  const toggleAccordion = (id) => {
    setExpandedAccordion(prev => prev === id ? null : id);
  };

  // Check if product has "ring" tag (case-insensitive)
  const isRingProduct = productTags.some(tag => tag.toLowerCase().includes('ring'));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.option-row') && !event.target.closest('.ring-size-modal-overlay')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHelpMeLaterConfirm = () => {
    setHelpMeLater(true);
    setSelectedRingSize(null);
    setShowSizeModal(false);
    setActiveDropdown(null);
    // Update URL with help_me_later
    updateRingSizeUrl('help_me_later');
  };

  const handleRingSizeSelect = (size) => {
    setSelectedRingSize(size);
    setHelpMeLater(false);
    setActiveDropdown(null);
    // Update URL with selected size
    updateRingSizeUrl(size);
  };

  // Helper function to update URL with ring size
  const updateRingSizeUrl = (size) => {
    const params = new URLSearchParams(location.search);

    if (size) {
      params.set('ring_size', size.replace(/\s+/g, '_'));
    } else {
      params.delete('ring_size');
    }

    navigate(`?${params.toString()}`, {
      replace: true,
      preventScrollReset: true,
    });
  };

  // Helper function to update URL with engraving params
  const updateEngravingUrl = (text, font) => {
    const params = new URLSearchParams(location.search);

    if (text && text.trim()) {
      params.set('engrave_text', text);
      const fontInfo = ENGRAVING_CONFIG.fonts.find(f => f.value === font);
      if (fontInfo) {
        params.set('engrave_font', fontInfo.label.replace(/\s+/g, '+'));
      }
    } else {
      params.delete('engrave_text');
      params.delete('engrave_font');
    }

    navigate(`?${params.toString()}`, {
      replace: true,
      preventScrollReset: true,
    });
  };

  // Handle engraving text change
  const handleEngravingTextChange = (e) => {
    const newText = e.target.value.slice(0, ENGRAVING_CONFIG.maxCharacters);
    setEngravingText(newText);
  };

  // Debounce sync engraving to URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (engravingText !== urlEngravingText) {
        updateEngravingUrl(engravingText, selectedFont);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [engravingText, selectedFont]);

  const handleFontChange = (fontValue) => {
    setSelectedFont(fontValue);
    if (engravingText.trim()) {
      updateEngravingUrl(engravingText, fontValue);
    }
  };

  const getCartAttributes = () => {
    const attributes = [];

    // Only add ring size and gemstone properties if the section is shown
    if (isRingProduct && showGemstoneOptions && SHOW_GEMSTONE_SECTION) {
      if (SHOW_RING_SIZE_OPTION) {
        if (helpMeLater) {
          attributes.push({
            key: 'Ring Size',
            value: 'Help me to select later'
          });
        } else if (selectedRingSize) {
          attributes.push({
            key: 'Ring Size',
            value: selectedRingSize
          });
        }
      }

      if (SHOW_STONE_TYPE_OPTION) {
        const stoneTypeLabel = GEMSTONE_CONFIG.stoneType.options.find(o => o.value === selectedStoneType)?.label;
        if (stoneTypeLabel) {
          attributes.push({
            key: 'Stone Type',
            value: stoneTypeLabel
          });
        }
      }

      if (!HIDE_GEMSTONE_DETAILS) {
        const clarityLabel = GEMSTONE_CONFIG.clarity.options.find(o => o.value === selectedClarity)?.label;
        if (clarityLabel) {
          attributes.push({
            key: 'Clarity',
            value: clarityLabel
          });
        }

        const caratLabel = GEMSTONE_CONFIG.carat.options.find(o => o.value === selectedCarat)?.label;
        if (caratLabel) {
          attributes.push({
            key: 'Carat',
            value: caratLabel
          });
        }

        const colourLabel = GEMSTONE_CONFIG.colour.options.find(o => o.value === selectedColour)?.label;
        if (colourLabel) {
          attributes.push({
            key: 'Colour',
            value: colourLabel
          });
        }
      }
    }

    if (engravingText.trim()) {
      const fontInfo = ENGRAVING_CONFIG.fonts.find(f => f.value === selectedFont);
      attributes.push({
        key: 'Engraving Text',
        value: engravingText
      });
      attributes.push({
        key: 'Engraving Font',
        value: fontInfo?.label || selectedFont
      });
    }
    return attributes;
  };

  const getRingSizeDisplayValue = () => {
    if (helpMeLater) return 'Help me to select later';
    if (selectedRingSize) return selectedRingSize;
    return 'Select a ring size';
  };

  const isRingSizeRequired = isRingProduct && !selectedRingSize && !helpMeLater;

  const getStoneTypeLabel = () => GEMSTONE_CONFIG.stoneType.options.find(o => o.value === selectedStoneType)?.label || 'Select';
  const getClarityLabel = () => GEMSTONE_CONFIG.clarity.options.find(o => o.value === selectedClarity)?.label || 'Select';
  const getCaratLabel = () => {
    return GEMSTONE_CONFIG.carat.options.find(o => o.value === selectedCarat)?.label || 'Select';
  };
  const getColourLabel = () => GEMSTONE_CONFIG.colour.options.find(o => o.value === selectedColour)?.label || 'Select';

  return (
    <div className="product-main-content">
      {/* ==================== YOUR GEMSTONE SECTION ==================== */}

      <div className="product-form-custom">
        <div className="gemstone-section product-form-custom-header">
          <h2 className="f-22 f-m-22 w-300 black-color l-h-1-2">Choose Metal & Diamond</h2>
          <div className="section-header-desc f-13 f-m-13 l-h-1-2 black-color w-400 ff-c">Your diamond will be IGI certified Lab-grown diamond.</div>
        </div>
        {/* <div className="section-header-desc f-13 f-m-13 l-h-1-2 black-color w-400 ff-c">
          Start by selecting your stone, metal, setting and ring size. Unsure of the size? Here are some handy{' '}
          <a href="/pages/size-guide" className="tips-link">tips</a> to guide you.
        </div> */}
        <div className="product-options-container">
          {productOptions.map((option) => (
            <OptionRow
              key={option.name}
              option={option}
              isOpen={activeDropdown === option.name}
              onToggle={() => setActiveDropdown(activeDropdown === option.name ? null : option.name)}
              navigate={navigate}
              selectedVariant={selectedVariant}
            />
          ))}
          {/* Stone Type - Hover Dropdown */}
          {SHOW_STONE_TYPE_OPTION && (
            <div className="option-row gemstone-row">
              <div className="option-header">
                <div className="option-trigger">
                  <span className="option-label f-10 f-m-10 w-300 black-color l-h-1-2 ff-n clickable-label"
                    onClick={() => setShowClarityModal(true)}
                  >
                    {GEMSTONE_CONFIG.stoneType.label}
                    <span className="info-icon-wrapper">
                      <span className="info-icon">
                        <svg className="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32"><path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path></svg>
                      </span>
                    </span>
                    <div className="tooltip-box">
                      {GEMSTONE_CONFIG.stoneType.tooltip}
                    </div>
                  </span>
                  <span className="option-value-display f-11 f-m-11 w-400 ff-c l-h-1-2 black-color clickable-label"
                    onClick={() => setActiveDropdown(activeDropdown === 'stone-type' ? null : 'stone-type')}
                  >
                    {getStoneTypeLabel()}
                    <ChevronDown rotated={activeDropdown === 'stone-type'} />
                  </span>
                </div>
              </div>
              {activeDropdown === 'stone-type' && (
                <div className="option-dropdown">
                  {GEMSTONE_CONFIG.stoneType.options.map((option) => (
                    <div
                      key={option.value}
                      className={`ring-size-item option-item-swatch f-13 f-m-13 w-400 black-color l-h-1-2 ff-c ${selectedStoneType === option.value ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedStoneType(option.value);
                        setActiveDropdown(null);
                      }}
                    >
                      <span className="option-name">{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isRingProduct && showGemstoneOptions && SHOW_GEMSTONE_SECTION && (
        <div className="product-form-custom gemstone-section">
          <div className="product-form-custom-header">
            <h2 className="f-22 f-m-22 w-300 black-color l-h-1-2">Choose Your Ring</h2>
          </div>
          {/* <div className="carbon-neutral-badge f-12 f-m-12 w-500 light-accent-color l-h-1-2 ff-c">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            CARBON NEUTRAL GEMSTONES
          </div>
          <div className="section-header-desc f-13 f-m-13 l-h-1-2 black-color w-400 ff-c">
            Select your Ring preferences to see recommended options.
          </div> */}

          {/* Custom Ring Size Row - Only for Ring Products */}
          <div className="option-row gemstone-row">
            {isRingProduct && SHOW_RING_SIZE_OPTION && (
              <div className="option-row">
                <div className="option-header">
                  <button
                    className="option-trigger"
                    onClick={() => setActiveDropdown(activeDropdown === 'ring-size' ? null : 'ring-size')}
                    type="button"
                  >
                    <span className={`option-label f-10 f-m-10 w-300 l-h-1-2 ff-n ${isRingSizeRequired ? 'ring-size-label-warning' : 'black-color'}`}>
                      RING SIZE
                      <span className="info-icon-wrapper" onClick={(e) => e.stopPropagation()}>
                        <span className="info-icon">
                          <svg className="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32"><path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path></svg>
                        </span>
                      </span>
                    </span>
                    <span className={`option-value-display f-11 f-m-11 w-400 ff-c l-h-1-2 black-color ${!selectedRingSize && !helpMeLater ? 'ring-size-trigger-text unselected' : ''}`}>
                      {getRingSizeDisplayValue()}
                      <ChevronDown rotated={activeDropdown === 'ring-size'} />
                    </span>
                  </button>
                </div>

                {activeDropdown === 'ring-size' && (
                  <div className="option-dropdown">
                    <div
                      className={`ring-size-item help-me-later ${helpMeLater ? 'selected' : ''}`}
                      onClick={() => setShowSizeModal(true)}
                    >
                      <span className="help-me-later-text f-13 f-m-13 w-400 light-accent-color l-h-1-2 ff-c">Help me to select later</span>
                    </div>

                    {RING_SIZES_CONFIG.map((size) => (
                      <div
                        key={size.value}
                        className={`ring-size-item f-13 f-m-13 w-400 black-color l-h-1-2 ff-c ${selectedRingSize === size.value && !helpMeLater ? 'selected' : ''}`}
                        onClick={() => handleRingSizeSelect(size.value)}
                      >
                        <div className="option-swatch-info">
                          <span className="option-name f-13 f-m-13 w-400 black-color l-h-1-2 ff-c">
                            {size.label}
                            <span className="size-format">&nbsp;({size.format})</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="section-header-desc f-13 f-m-13 l-h-1-2 black-color w-400 ff-c">
                  Don't know your ring size?{' '}
                  <a href="/pages/size-guide" className="tips-link">Here Are Some Guide you</a>
                </div>
              </div>
            )}



            {!HIDE_GEMSTONE_DETAILS && (
              <>
                {/* Clarity - Title opens modal, Value opens dropdown */}
                <div className="option-row gemstone-row">
                  <div className="option-header">
                    <div className="option-trigger gemstone-trigger">
                      <span
                        className="option-label f-10 f-m-10 w-300 black-color l-h-1-2 ff-n clickable-label"
                        onClick={() => setShowClarityModal(true)}
                      >
                        {GEMSTONE_CONFIG.clarity.label}
                        <span className="info-icon-wrapper" onClick={(e) => e.stopPropagation()}>
                          <span className="info-icon">
                            <svg className="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32"><path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path></svg>
                          </span>
                        </span>
                      </span>
                      <span
                        className="option-value-display f-11 f-m-11 w-400 ff-c l-h-1-2 black-color"
                        onClick={() => setActiveDropdown(activeDropdown === 'clarity' ? null : 'clarity')}
                      >
                        {getClarityLabel()}
                        <ChevronDown rotated={activeDropdown === 'clarity'} />
                      </span>
                    </div>
                  </div>
                  {activeDropdown === 'clarity' && (
                    <div className="option-dropdown">
                      {GEMSTONE_CONFIG.clarity.options.map((option) => (
                        <div
                          key={option.value}
                          className={`ring-size-item option-item-swatch f-13 f-m-13 w-400 black-color l-h-1-2 ff-c ${selectedClarity === option.value ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedClarity(option.value);
                            setActiveDropdown(null);
                          }}
                        >
                          <span className="option-name">{option.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Carat - Title opens modal, Value opens dropdown */}
                <div className="option-row gemstone-row">
                  <div className="option-header">
                    <div className="option-trigger gemstone-trigger">
                      <span
                        className="option-label f-10 f-m-10 w-300 black-color l-h-1-2 ff-n clickable-label"
                        onClick={() => setShowCaratModal(true)}
                      >
                        {GEMSTONE_CONFIG.carat.label}
                        <span className="info-icon-wrapper" onClick={(e) => e.stopPropagation()}>
                          <span className="info-icon">
                            <svg className="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32"><path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path></svg>
                          </span>
                        </span>
                      </span>
                      <span
                        className="option-value-display f-11 f-m-11 w-400 ff-c l-h-1-2 black-color"
                        onClick={() => setActiveDropdown(activeDropdown === 'carat' ? null : 'carat')}
                      >
                        {getCaratLabel()}
                        <ChevronDown rotated={activeDropdown === 'carat'} />
                      </span>
                    </div>
                  </div>
                  {activeDropdown === 'carat' && (
                    <div className="option-dropdown">
                      {GEMSTONE_CONFIG.carat.options.map((option) => (
                        <div
                          key={option.value}
                          className={`ring-size-item option-item-swatch f-13 f-m-13 w-400 black-color l-h-1-2 ff-c ${selectedCarat === option.value ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedCarat(option.value);
                            setActiveDropdown(null);
                          }}
                        >
                          <span className="option-name">{option.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Colour - Title opens modal, Value opens dropdown */}
                <div className="option-row gemstone-row">
                  <div className="option-header">
                    <div className="option-trigger gemstone-trigger">
                      <span
                        className="option-label f-10 f-m-10 w-300 black-color l-h-1-2 ff-n clickable-label"
                        onClick={() => setShowColourModal(true)}
                      >
                        {GEMSTONE_CONFIG.colour.label}
                        <span className="info-icon-wrapper" onClick={(e) => e.stopPropagation()}>
                          <span className="info-icon">
                            <svg className="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32"><path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path></svg>
                          </span>
                        </span>
                      </span>
                      <span
                        className="option-value-display f-11 f-m-11 w-400 ff-c l-h-1-2 black-color"
                        onClick={() => setActiveDropdown(activeDropdown === 'colour' ? null : 'colour')}
                      >
                        {getColourLabel()}
                        <ChevronDown rotated={activeDropdown === 'colour'} />
                      </span>
                    </div>
                  </div>
                  {activeDropdown === 'colour' && (
                    <div className="option-dropdown">
                      {GEMSTONE_CONFIG.colour.options.map((option) => (
                        <div
                          key={option.value}
                          className={`ring-size-item option-item-swatch f-13 f-m-13 w-400 black-color l-h-1-2 ff-c ${selectedColour === option.value ? 'selected' : ''}`}
                          onClick={() => {
                            setSelectedColour(option.value);
                            setActiveDropdown(null);
                          }}
                        >
                          <span className="option-name">{option.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

          </div>
        </div>
      )}
      {/* ==================== ENGRAVING SECTION ==================== */}
      {
        isRingProduct && (
          <div className="product-form-custom engraving-section">
            <div className="product-form-custom-header">
              <h2 className="f-22 f-m-22 w-300 black-color l-h-1-2">Engraving</h2>
            </div>
            <div className="section-header-desc f-13 f-m-13 l-h-1-2 black-color w-400 ff-c">
              Add a personal touch to your piece with free engraving. Enter your desired message to customize your jewellery with names, dates, or meaningful words, engraved forever.
              {/* Add an optional personal touch — type your message and choose a font to engrave names, dates or notes. */}
            </div>

            <div className="engraving-row">
              <div className="engraving-label-row">
                <span className="option-label f-10 f-m-10 w-300 black-color l-h-1-2 ff-n">
                  ENGRAVING:
                  <span className="info-icon-wrapper">
                    <span className="info-icon">
                      <svg className="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32"><path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path></svg>
                    </span>
                    <div className="tooltip-box">
                      Add a personal message to be engraved inside the ring band. Maximum {ENGRAVING_CONFIG.maxCharacters} characters.
                    </div>
                  </span>
                </span>
                <span className="engraving-char-count f-11 f-m-11 w-400 ff-c l-h-1-2">
                  <span className={engravingText.length > ENGRAVING_CONFIG.maxCharacters ? 'char-over' : ''}>
                    {engravingText.length}/{ENGRAVING_CONFIG.maxCharacters} characters
                  </span>
                </span>
              </div>

              {engravingText.trim().length > 0 && (
                <div className="engraving-preview-container">
                  <img
                    src={selectedVariant?.engraving_preview?.reference?.image?.url || 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/ring_band_engraving_yellow_gold.CZj2e0HK.jpg?v=1772520454'}
                    alt="Engraving Preview"
                    className="engraving-preview-image"
                  />
                  <svg
                    className="engraving-preview-svg"
                    viewBox="0 0 100 50"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <path
                        id="EngravingPath"
                        fill="none"
                        d="M 17,20 C 30,11.5 70,11.5 83,20"
                      />
                    </defs>
                    <text
                      style={{
                        fontFamily: ENGRAVING_CONFIG.fonts.find(f => f.value === selectedFont)?.fontFamily || 'serif',
                        fontSize: '6.5px',
                        fill: 'rgb(115, 86, 86)',
                        opacity: 0.8
                      }}
                    >
                      <textPath
                        href="#EngravingPath"
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        {engravingText}
                      </textPath>
                    </text>
                  </svg>
                </div>
              )}
              <input
                type="text"
                className="engraving-input f-20 f-m-18 w-400 black-color l-h-1-2 ff-c"
                placeholder="Type here"
                value={engravingText}
                onChange={handleEngravingTextChange}
                maxLength={ENGRAVING_CONFIG.maxCharacters}
                style={{ fontFamily: ENGRAVING_CONFIG.fonts.find(f => f.value === selectedFont)?.fontFamily }}
              />

              {/* {engravingText.length > 0 && (
                <div className="font-selector">
                  <span className="option-label f-10 f-m-10 w-300 black-color l-h-1-2 ff-n">FONT STYLE:</span>
                  <div className="font-options">
                    {ENGRAVING_CONFIG.fonts.map((font) => (
                      <button
                        key={font.value}
                        type="button"
                        className={`font-option f-12 f-m-12 ${selectedFont === font.value ? 'selected' : ''}`}
                        onClick={() => handleFontChange(font.value)}
                        style={{ fontFamily: font.fontFamily }}
                      >
                        {font.label}
                      </button>
                    ))}
                  </div>
                </div>
              )} */}


            </div>
          </div>
        )
      }

      {/* ==================== TIMELINE SECTION ==================== */}
      {
        isRingProduct && (
          <div className="product-form-custom timeline-section">
            <div className="product-form-custom-header">
              <h2 className="f-22 f-m-22 w-300 black-color l-h-1-2">Timeline</h2>
            </div>
            <div className="section-header-desc f-13 f-m-13 l-h-1-2 black-color w-400 ff-c">
              {/* If you require your ring sooner, we have priority crafting options available. Select these options from the dropdown below. */}
              Your ring is created exclusively for you, with love, care, and precision. For moments that cannot wait, priority crafting is available for an additional fee. Please reach out to us for priority service.
              <br />
              All orders are shipped fully insured and discreetly packaged for your peace of mind
            </div>

            <div className="option-row">
              <div className="option-header">
                <button
                  className="option-trigger"
                  onClick={() => setActiveDropdown(activeDropdown === 'timeline' ? null : 'timeline')}
                  type="button"
                >
                  <span className="option-label f-10 f-m-10 w-300 black-color l-h-1-2 ff-n">
                    ESTIMATE DELIVERY TIME
                    <span className="info-icon-wrapper" onClick={(e) => e.stopPropagation()}>
                      <span className="info-icon">
                        <svg className="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32"><path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path></svg>
                      </span>
                      <div className="tooltip-box">
                        Choose a crafting timeline based on when you need your ring. Priority options are available for an additional fee.
                      </div>
                    </span>
                  </span>
                  <span className="option-value-display f-11 f-m-11 w-400 ff-c l-h-1-2 black-color">
                    {/* {formatDate(getFutureDate(TIMELINE_CONFIG.options.find(t => t.value === selectedTimeline)?.daysToAdd || 50))}
                  <ChevronDown rotated={activeDropdown === 'timeline'} /> */}
                    3 to 4 Weeks
                  </span>
                </button>
              </div>

              {/* {activeDropdown === 'timeline' && (
              <div className="option-dropdown">
                {TIMELINE_CONFIG.options.map((option) => (
                  <div
                    key={option.value}
                    className={`ring-size-item f-13 f-m-13 w-400 black-color l-h-1-2 ff-c ${selectedTimeline === option.value ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedTimeline(option.value);
                      setActiveDropdown(null);
                    }}
                  >
                    <div className="option-swatch-info">
                      <span className="option-name f-13 f-m-13 w-400 black-color l-h-1-2 ff-c">
                        {option.label} - {formatDate(getFutureDate(option.daysToAdd))}
                        {option.extraCost > 0 && <span className="timeline-cost"> (+${option.extraCost})</span>}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )} */}
            </div>

            {/* Delivery Estimate Box */}
            {/* <div className="delivery-estimate-box">
            <div className="delivery-estimate-title f-11 f-m-11 w-600 black-color l-h-1-2 ff-n">
              ESTIMATE DELIVERY TIME: {formatDate(getFutureDate((TIMELINE_CONFIG.options.find(t => t.value === selectedTimeline)?.daysToAdd || 50) + TIMELINE_CONFIG.deliveryDays)).toUpperCase()}
              <span className="info-icon-wrapper">
                <span className="info-icon">
                  <svg className="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32"><path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path></svg>
                </span>
              </span>
            </div>
            <p className="delivery-estimate-text f-12 f-m-12 w-400 black-color l-h-1-4 ff-c">
              Once your order is complete, we will ship your order via express post. This typically takes 10 days in the United States.
            </p>
          </div> */}
          </div>
        )
      }
      <div className="add-to-cart-wrapper f-12 f-m-12 w-300 ff-n l-h-1-2 white-color" style={{ marginTop: '20px' }}>
        {/* Ring Size Warning */}
        {isRingSizeRequired && (
          <div className="ring-size-warning f-12 f-m-12 w-400 l-h-1-2 ff-c light-accent-color">
            Please select a ring size to continue
          </div>
        )}
        <AddToCartButton
          redirectToCart={ADD_TO_CART_REDIRECTS_TO_CART}
          className="submit"
          disabled={!selectedVariant || !selectedVariant.availableForSale || isRingSizeRequired}
          onClick={() => {
            // Optional: User might want to do something else
          }}
          lines={
            selectedVariant
              ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  attributes: getCartAttributes(),
                  selectedVariant, // Required for useOptimisticCart
                },
              ]
              : []
          }
        >
          {selectedVariant?.availableForSale ? (
            <>
              Add to cart | <Money data={selectedVariant.price} />
            </>
          ) : (
            'SOLD OUT'
          )}
        </AddToCartButton>
      </div>

      {/* Trust Badges Section */}
      <div className="trust-badges-grid">
        {TRUST_BADGES_CONFIG.map((badge, index) => (
          <a key={index} href={badge.url} className="trust-badge-item">
            <span className="trust-badge-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <path d={badge.icon} fill="currentColor" />
              </svg>
            </span>
            <span className="trust-badge-label f-10 f-m-10 w-400 black-color l-h-1-2 ff-n">
              {badge.label.toUpperCase()}
            </span>
          </a>
        ))}
      </div>

      {/* Product Accordion Section */}
      <div className="product-accordion">
        {PRODUCT_ACCORDION_CONFIG.map((item) => {
          const isExpanded = expandedAccordion === item.id;
          return (
            <div key={item.id} className={`accordion-item ${isExpanded ? 'expanded' : ''}`}>
              <button
                type="button"
                className="accordion-trigger"
                onClick={() => toggleAccordion(item.id)}
              >
                <div className="accordion-icon">
                  <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m2.117 5.292 6.35 6.35 6.35-6.35"
                      className="accordion-chevron"
                    />
                  </svg>
                </div>
                <span className="accordion-title f-10 f-m-10 w-400 ff-n l-h-1-2">
                  {isExpanded ? (
                    <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.117 8.467h12.7"
                        className="stroke"
                        fill="none"
                        stroke="var(--black_color)"
                        strokeWidth={1.05831}
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="m2.117 5.292 6.35 6.35 6.35-6.35"
                        className="stroke"
                        fill="none"
                        stroke="var(--black_color)"
                        strokeWidth={1.05831}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {item.title}
                </span>
              </button>
              <div
                className="accordion-content"
                style={{ maxHeight: isExpanded ? '1000px' : '0' }}
              >
                <div className="accordion-content-inner f-13 f-m-13 w-400 ff-c l-h-1-2 black-color">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ring Size Warning Modal */}
      {
        showSizeModal && (
          <RingSizeModal
            onClose={() => setShowSizeModal(false)}
            onConfirm={handleHelpMeLaterConfirm}
          />
        )
      }

      {/* Gemstone Modals */}
      {
        showClarityModal && (
          <GemstoneModal
            modalType="clarity"
            description={GEMSTONE_CONFIG.clarity.description}
            options={GEMSTONE_CONFIG.clarity.options}
            selectedValue={selectedClarity}
            onSelect={(value) => setSelectedClarity(value)}
            onClose={() => setShowClarityModal(false)}
          />
        )
      }

      {
        showCaratModal && (
          <CaratModal
            config={GEMSTONE_CONFIG.carat}
            selectedValue={selectedCarat}
            onSelect={(value) => setSelectedCarat(value)}
            onClose={() => setShowCaratModal(false)}
          />
        )
      }

      {
        showColourModal && (
          <ColourModal
            config={GEMSTONE_CONFIG.colour}
            selectedValue={selectedColour}
            onSelect={(value) => setSelectedColour(value)}
            onClose={() => setShowColourModal(false)}
          />
        )
      }
    </div >
  );
}


function getTooltipText(name) {
  const n = name.toUpperCase();
  if (n.includes('MELEE')) {
    return "Melee stones are the small accent stones in your ring. We use lab-grown diamonds graded E/F colour (near-colourless) and VS clarity (very slightly included), or moissanite graded DEF colour (colourless) and VVS1-2 clarity (very, very slightly included).";
  }
  if (n.includes('METAL')) {
    return "Choose from our premium range of durable, hypoallergenic metals including 18k Gold and Platinum.";
  }
  if (n.includes('SETTING')) {
    return "The setting style determines the height and profile of the main stone on your finger.";
  }
  return null;
}

function OptionRow({ option, isOpen, onToggle, navigate, selectedVariant }) {
  const selectedValue = option.optionValues.find((v) => v.selected);
  const tooltip = getTooltipText(option.name);

  // Get the current selected variant's price for comparison
  const currentPrice = selectedVariant?.price?.amount ? parseFloat(selectedVariant.price.amount) : 0;
  const currencyCode = selectedVariant?.price?.currencyCode || 'INR';

  const handleOptionClick = (value, e) => {
    if (!value.isDifferentProduct) {
      e.preventDefault();
      navigate(`?${value.variantUriQuery}`, {
        replace: true,
        preventScrollReset: true,
      });
    }
    onToggle();
  };

  return (
    <div className="option-row">
      <div className="option-header">
        <button className="option-trigger" onClick={onToggle} type="button">
          <span className="option-label f-10 f-m-10 w-300 black-color l-h-1-2 ff-n">
            {option.name}
            {tooltip && (
              <span className="info-icon-wrapper" onClick={(e) => e.stopPropagation()}>
                <span className="info-icon">
                  <svg className="h-6 w-6" fill="currentColor" aria-hidden="true" viewBox="0 0 32 32"><path d="M16 8.84a1.4 1.4 0 0 1 1.4 1.4 1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 1.4-1.4zm0 4.82a1.34 1.34 0 0 1 1.4 1.28v7a1.41 1.41 0 0 1-2.8 0v-7a1.34 1.34 0 0 1 1.4-1.28zM16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-25.8A11.8 11.8 0 1 0 27.8 16 11.81 11.81 0 0 0 16 4.2z"></path></svg>
                </span>
                <div className="tooltip-box">
                  {tooltip}
                </div>
              </span>
            )}
          </span>
          <span className="option-value-display f-11 f-m-11 w-400 ff-c l-h-1-2 black-color">
            {selectedValue ? selectedValue.name : 'Select'}
            <ChevronDown rotated={isOpen} />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="option-dropdown">
          {option.optionValues.map((value) => {
            const isSelected = value.selected;
            const ItemTag = value.isDifferentProduct ? Link : 'div';
            const itemProps = value.isDifferentProduct ? {
              to: `/products/${value.handle}?${value.variantUriQuery}`,
              prefetch: "intent",
              replace: true,
              className: "no-style-link"
            } : {};

            // Calculate price difference
            const variantPrice = value.variant?.price?.amount ? parseFloat(value.variant.price.amount) : 0;
            const priceDiff = variantPrice - currentPrice;
            const showPriceDiff = priceDiff !== 0 && variantPrice > 0;

            // Get variant image
            const variantImage = value.variant?.image?.url || value.swatch?.image?.previewImage?.url;

            return (
              <ItemTag
                key={value.name}
                {...itemProps}
                className={`option-item-swatch ${isSelected ? 'selected' : ''}`}
                onClick={(e) => handleOptionClick(value, e)}
                style={{ opacity: value.available ? 1 : 0.5, cursor: value.available ? 'pointer' : 'not-allowed' }}
              >
                {variantImage ? (
                  <img src={variantImage} alt={value.name} />
                ) : (
                  value.swatch?.color && <span className="swatch-color" style={{ background: value.swatch.color }}></span>
                )}

                <div className="option-swatch-info">
                  <span className="option-name f-13 f-m-13 w-400 black-color l-h-1-2 ff-c">
                    {value.name}
                  </span>
                  {showPriceDiff && (
                    <span className={`option-price-diff f-13 f-m-13 w-400 black-color l-h-1-2 ff-c ${priceDiff > 0 ? 'price-plus' : 'price-minus'}`}>
                      {priceDiff > 0 ? '+' : ''}{new Intl.NumberFormat('en-IN', { style: 'currency', currency: currencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(priceDiff)}
                    </span>
                  )}
                </div>
              </ItemTag>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ChevronDown({ rotated }) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      style={{
        transform: rotated ? 'rotate(180deg)' : 'rotate(0)',
        transition: 'transform 0.2s',
      }}
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Ring Size Warning Modal
function RingSizeModal({ onClose, onConfirm }) {
  return (
    <div className="ring-size-modal-overlay" onClick={onClose}>
      <div className="ring-size-modal" onClick={(e) => e.stopPropagation()}>
        <p className="ring-size-modal-text f-14 f-m-14 w-400 black-color l-h-1-5 ff-c">
          Please note that choosing your ring size later <strong>will delay when we can start crafting your ring</strong>.
          We aim to confirm your ring size as soon as possible to ensure your ring is delivered within the estimated timeframe.
        </p>
        <button
          className="ring-size-modal-btn f-12 f-m-12 w-400 white-color l-h-1-2 ff-n"
          onClick={onConfirm}
        >
          I UNDERSTAND
        </button>
      </div>
    </div>
  );
}

// Carat Selection Modal - New Design with Hand Preview
function CaratModal({ config, selectedValue, onSelect, onClose }) {
  const caratSliderRef = useRef(null);
  const skinToneSliderRef = useRef(null);
  const [isDraggingCarat, setIsDraggingCarat] = useState(false);
  const [isDraggingSkinTone, setIsDraggingSkinTone] = useState(false);
  const [skinTone, setSkinTone] = useState(0.5); // 0 = light, 1 = dark

  // Find the selected option and its index
  const selectedOption = config.options.find(o => o.value === selectedValue) || config.options[7]; // default to 2.00-2.24
  const selectedIndex = config.options.findIndex(o => o.value === selectedValue);
  const validIndex = selectedIndex >= 0 ? selectedIndex : 7;

  // Calculate percentage for carat slider position based on option index
  const caratPercentage = (validIndex / (config.options.length - 1)) * 100;

  // Get the carat weight for diamond scaling
  const caratWeight = selectedOption?.caratWeight || 2.12;

  // Calculate diamond scale
  const diamondScale = config.getScale(caratWeight);

  // Diamond positioning (centered on ring finger)
  const diamondPosition = {
    left: 81.5,
    top: 81.5,
  };

  // Update carat value from slider position - snaps to nearest option
  const updateCaratFromPosition = useCallback((clientX) => {
    if (!caratSliderRef.current) return;
    const rect = caratSliderRef.current.getBoundingClientRect();
    const posX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, posX / rect.width));
    const nearestIndex = Math.round(percentage * (config.options.length - 1));
    const clampedIndex = Math.max(0, Math.min(nearestIndex, config.options.length - 1));
    onSelect(config.options[clampedIndex].value);
  }, [config.options, onSelect]);

  // Update skin tone from slider position
  const updateSkinToneFromPosition = useCallback((clientX) => {
    if (!skinToneSliderRef.current) return;
    const rect = skinToneSliderRef.current.getBoundingClientRect();
    const posX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, posX / rect.width));
    setSkinTone(percentage);
  }, []);

  // Carat slider mouse events
  const handleCaratMouseDown = (e) => {
    e.preventDefault();
    setIsDraggingCarat(true);
    updateCaratFromPosition(e.clientX);
  };

  const handleCaratMouseMove = useCallback((e) => {
    if (!isDraggingCarat) return;
    updateCaratFromPosition(e.clientX);
  }, [isDraggingCarat, updateCaratFromPosition]);

  const handleCaratMouseUp = useCallback(() => {
    setIsDraggingCarat(false);
  }, []);

  // Skin tone slider mouse events
  const handleSkinToneMouseDown = (e) => {
    e.preventDefault();
    setIsDraggingSkinTone(true);
    updateSkinToneFromPosition(e.clientX);
  };

  const handleSkinToneMouseMove = useCallback((e) => {
    if (!isDraggingSkinTone) return;
    updateSkinToneFromPosition(e.clientX);
  }, [isDraggingSkinTone, updateSkinToneFromPosition]);

  const handleSkinToneMouseUp = useCallback(() => {
    setIsDraggingSkinTone(false);
  }, []);

  // Touch events for carat
  const handleCaratTouchStart = (e) => {
    setIsDraggingCarat(true);
    updateCaratFromPosition(e.touches[0].clientX);
  };

  const handleCaratTouchMove = useCallback((e) => {
    if (!isDraggingCarat) return;
    updateCaratFromPosition(e.touches[0].clientX);
  }, [isDraggingCarat, updateCaratFromPosition]);

  // Touch events for skin tone
  const handleSkinToneTouchStart = (e) => {
    setIsDraggingSkinTone(true);
    updateSkinToneFromPosition(e.touches[0].clientX);
  };

  const handleSkinToneTouchMove = useCallback((e) => {
    if (!isDraggingSkinTone) return;
    updateSkinToneFromPosition(e.touches[0].clientX);
  }, [isDraggingSkinTone, updateSkinToneFromPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDraggingCarat(false);
    setIsDraggingSkinTone(false);
  }, []);

  // Add/remove global event listeners for dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDraggingCarat) updateCaratFromPosition(e.clientX);
      if (isDraggingSkinTone) updateSkinToneFromPosition(e.clientX);
    };
    const handleGlobalMouseUp = () => {
      setIsDraggingCarat(false);
      setIsDraggingSkinTone(false);
    };
    const handleGlobalTouchMove = (e) => {
      if (isDraggingCarat) updateCaratFromPosition(e.touches[0].clientX);
      if (isDraggingSkinTone) updateSkinToneFromPosition(e.touches[0].clientX);
    };

    if (isDraggingCarat || isDraggingSkinTone) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDraggingCarat, isDraggingSkinTone, updateCaratFromPosition, updateSkinToneFromPosition, handleTouchEnd]);

  return (
    <div className="gemstone-modal-overlay" onClick={onClose}>
      <div className="carat-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="gemstone-modal-header">
          <button type="button" className="close-button-text" onClick={onClose}>
            <div className="icon">
              <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7" style={{ fill: 'none', stroke: '#000', strokeWidth: '1.05831', strokeLinecap: 'round', strokeLinejoin: 'round' }}></path>
              </svg>
            </div>
            <span className="ff-n f-12 f-m-12 w-400 l-h-1-2 black-color">CLOSE</span>
          </button>
          <button type="button" className="close-button-icon" aria-label="Close dialog" onClick={onClose}>
            <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
              <path d="m2.646 2.646 11.641 11.641M2.646 14.287 14.287 2.646" fill="none" stroke="#000" style={{ strokeWidth: '1.05831' }}></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="carat-modal-content">
          {/* Description */}
          <p className="carat-modal-description f-14 f-m-14 w-400 black-color l-h-1-5 ff-c">{config.description}</p>

          {/* Carat Value Badge */}
          <div className="carat-value-badge-container">
            <span className="carat-value-badge f-12 f-m-12 w-500 ff-c">{selectedOption?.label || 'Select'}</span>
          </div>

          {/* Carat Slider */}
          <div
            ref={caratSliderRef}
            className={`carat-slider ${isDraggingCarat ? 'dragging' : ''}`}
            onMouseDown={handleCaratMouseDown}
            onTouchStart={handleCaratTouchStart}
          >
            <div className="carat-rail"></div>
            <div className="carat-rail-container">
              {/* Min/Max Labels */}
              <div className="carat-tick-label left f-10 f-m-10 w-400 ff-c">{config.options[0].label}</div>
              <div className="carat-tick-label right f-10 f-m-10 w-400 ff-c">{config.options[config.options.length - 1].label}</div>
              {/* Filled Range */}
              <div className="carat-rail-range" style={{ right: `${100 - caratPercentage}%` }}></div>
              {/* Handle */}
              <div
                className={`carat-handle ${isDraggingCarat ? 'active' : ''}`}
                style={{ left: `calc(${caratPercentage}% - 8px)` }}
              ></div>
            </div>
          </div>

          {/* Hand Image Preview */}
          <div className="carat-hand-preview">
            <div className="carat-image-parent">
              {/* Light hand layer */}
              <div className="carat-hand-layer">
                <img
                  className="carat-hand-image"
                  src={config.handImages.light}
                  alt="Hand (Light)"
                />
              </div>
              {/* Dark hand layer with opacity based on skin tone */}
              <div className="carat-hand-layer">
                <img
                  className="carat-hand-image"
                  src={config.handImages.dark}
                  alt="Hand (Dark)"
                  style={{ opacity: skinTone }}
                />
              </div>
              {/* Diamond layer with scale */}
              <div className="carat-hand-layer">
                <div
                  className="carat-diamond-parent"
                >
                  <img
                    style={{
                      transform: `scale(${diamondScale})`,
                    }}
                    className="carat-diamond-image"
                    src={config.handImages.stone}
                    alt="Diamond Preview"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="carat-hand-caption f-12 f-m-12 w-400 black-color l-h-1-4 ff-c" style={{ fontStyle: 'italic' }}>
            {config.handImageCaption}
          </p>

          {/* Skin Tone Slider */}
          <div
            ref={skinToneSliderRef}
            className={`skin-tone-slider ${isDraggingSkinTone ? 'dragging' : ''}`}
            onMouseDown={handleSkinToneMouseDown}
            onTouchStart={handleSkinToneTouchStart}
          >
            <div className="skin-tone-rail"></div>
            <div className="skin-tone-rail-container">
              {/* Min/Max Labels */}
              <div className="skin-tone-tick-label left f-10 f-m-10 w-400 ff-c">Light</div>
              <div className="skin-tone-tick-label right f-10 f-m-10 w-400 ff-c">Dark</div>

              {/* Filled Range */}
              <div className="skin-tone-rail-range" style={{ right: `${(1 - skinTone) * 100}%` }}></div>

              {/* Handle */}
              <div
                className={`skin-tone-handle ${isDraggingSkinTone ? 'active' : ''}`}
                style={{ left: `calc(${skinTone * 100}% - 8px)` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColourModal({ config, selectedValue, onSelect, onClose }) {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const selectedOption = config.options.find(o => o.value === selectedValue) || config.options[6];
  const selectedIndex = config.options.findIndex(o => o.value === selectedValue);
  const validIndex = selectedIndex >= 0 ? selectedIndex : 6;

  const sliderPercentage = (validIndex / (config.options.length - 1)) * 100;

  // Get the white opacity for diamond color blending
  const whiteOpacity = selectedOption?.whiteOpacity ?? 1.0;

  // Update value from slider position - snaps to nearest option
  const updateValueFromPosition = useCallback((clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const posX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, posX / rect.width));
    const nearestIndex = Math.round(percentage * (config.options.length - 1));
    const clampedIndex = Math.max(0, Math.min(nearestIndex, config.options.length - 1));
    onSelect(config.options[clampedIndex].value);
  }, [config.options, onSelect]);

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateValueFromPosition(e.clientX);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    updateValueFromPosition(e.clientX);
  }, [isDragging, updateValueFromPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events
  const handleTouchStart = (e) => {
    setIsDragging(true);
    updateValueFromPosition(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    updateValueFromPosition(e.touches[0].clientX);
  }, [isDragging, updateValueFromPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove global event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className="gemstone-modal-overlay" onClick={onClose}>
      <div className="colour-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="gemstone-modal-header">
          <button type="button" className="close-button-text" onClick={onClose}>
            <div className="icon">
              <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7" style={{ fill: 'none', stroke: '#000', strokeWidth: '1.05831', strokeLinecap: 'round', strokeLinejoin: 'round' }}></path>
              </svg>
            </div>
            <span className="ff-n f-12 f-m-12 w-400 l-h-1-2 black-color">CLOSE</span>
          </button>
          <button type="button" className="close-button-icon" aria-label="Close dialog" onClick={onClose}>
            <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
              <path d="m2.646 2.646 11.641 11.641M2.646 14.287 14.287 2.646" fill="none" stroke="#000" style={{ strokeWidth: '1.05831' }}></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="colour-modal-content">
          {/* Description */}
          <p className="colour-modal-description f-13 f-m-13 w-400 black-color l-h-1-5 ff-c">{config.description}</p>

          {/* Colour Value Badge */}
          <div className="colour-value-badge-container">
            <span className="colour-value-badge f-12 f-m-12 w-500 ff-c">{selectedOption?.label || 'Select'}</span>
          </div>

          {/* Colour Slider */}
          <div
            ref={sliderRef}
            className={`colour-slider ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="colour-rail"></div>
            <div className="colour-rail-container">
              {config.options.map((option, index) => {
                const leftPercent = (index / (config.options.length - 1)) * 100;
                const isSelected = option.value === selectedValue;
                return (
                  <div
                    key={option.value}
                    className={`colour-tick ${isSelected ? 'selected' : ''}`}
                    style={{ left: `${leftPercent}%` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(option.value);
                    }}
                  >
                    <div className="colour-tick-label f-10 f-m-10 w-400 ff-c">{option.label}</div>
                  </div>
                );
              })}
              <div
                className={`colour-handle ${isDragging ? 'active' : ''}`}
                style={{ left: `calc(${sliderPercentage}% - 2px)` }}
              ></div>
            </div>
          </div>

          {/* Diamond Image Preview - Two layer blending */}
          <div className="colour-diamond-preview">
            <div className="colour-image-parent">
              {/* Yellow diamond layer (base) */}
              <div className="colour-diamond-layer">
                <img
                  className="colour-diamond-image"
                  src={config.diamondImages.yellow}
                  alt="Diamond (Yellow)"
                />
              </div>
              {/* White diamond layer with opacity based on colour grade */}
              <div className="colour-diamond-layer">
                <img
                  className="colour-diamond-image"
                  src={config.diamondImages.white}
                  alt="Diamond (White)"
                  style={{ opacity: whiteOpacity }}
                />
              </div>
            </div>
          </div>

          {/* Selected Option Description */}
          {selectedOption?.description && (
            <div className="colour-blurb f-13 f-m-13 w-400 black-color l-h-1-4 ff-c">
              {selectedOption.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Gemstone Selection Modal
function GemstoneModal({ modalType, description, options, selectedValue, onSelect, onClose, handImageCaption }) {
  const selectedOption = options.find(o => o.value === selectedValue);
  const selectedIndex = options.findIndex(o => o.value === selectedValue);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // State for smooth image transitions
  const [displayedImage, setDisplayedImage] = useState(selectedOption?.image);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle smooth image transition when selected option changes
  useEffect(() => {
    if (selectedOption?.image && selectedOption.image !== displayedImage) {
      setIsTransitioning(true);
      // Wait for fade-out, then update image and fade-in
      const transitionTimeout = setTimeout(() => {
        setDisplayedImage(selectedOption.image);
        setIsTransitioning(false);
      }, 200); // Match CSS transition duration
      return () => clearTimeout(transitionTimeout);
    }
  }, [selectedOption?.image, displayedImage]);

  // Calculate and select value based on position
  const updateValueFromPosition = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const posX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, posX / rect.width));
    const nearestIndex = Math.round(percentage * (options.length - 1));
    const clampedIndex = Math.max(0, Math.min(nearestIndex, options.length - 1));
    onSelect(options[clampedIndex].value);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateValueFromPosition(e.clientX);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    updateValueFromPosition(e.clientX);
  }, [isDragging, options, onSelect]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events
  const handleTouchStart = (e) => {
    setIsDragging(true);
    updateValueFromPosition(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    updateValueFromPosition(e.touches[0].clientX);
  }, [isDragging, options, onSelect]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className="gemstone-modal-overlay" onClick={onClose}>
      <div className="gemstone-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gemstone-modal-header">
          <button type="button" className="close-button-text" onClick={onClose}>
            <div className="icon">
              <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7" style={{ fill: 'none', stroke: '#000', strokeWidth: '1.05831', strokeLinecap: 'round', strokeLinejoin: 'round' }}></path>
              </svg>
            </div>
            <span className="ff-n f-12 f-m-12 w-400 l-h-1-2 black-color">CLOSE</span>
          </button>
          <button type="button" className="close-button-icon" aria-label="Close dialog" onClick={onClose}>
            <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
              <path d="m2.646 2.646 11.641 11.641M2.646 14.287 14.287 2.646" fill="none" stroke="#000" style={{ strokeWidth: '1.05831' }}></path>
            </svg>
          </button>
        </div>

        <div className="gemstone-modal-content">
          <p className="gemstone-modal-description f-13 f-m-13 w-400 black-color l-h-1-5 ff-c">{description}</p>

          <div className="gemstone-selected-label">
            <span className="gemstone-value-badge f-12 f-m-12 w-500 ff-c">{selectedOption?.label}</span>
          </div>

          <div
            ref={sliderRef}
            className={`gemstone-slider ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onClick={(e) => {
              if (!isDragging) {
                updateValueFromPosition(e.clientX);
              }
            }}
          >
            <div className="gemstone-rail"></div>
            <div className="gemstone-rail-container">
              {options.map((option, index) => {
                const leftPercent = (index / (options.length - 1)) * 100;
                const isSelected = option.value === selectedValue;
                return (
                  <div
                    key={option.value}
                    className={`gemstone-tick ${isSelected ? 'selected' : ''}`}
                    style={{ left: `${leftPercent}%` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(option.value);
                    }}
                  >
                    <div className="gemstone-tick-label f-10 f-m-10 w-400 ff-c">{option.label}</div>
                  </div>
                );
              })}
              {/* Handle */}
              <div
                className={`gemstone-handle ${isDragging ? 'active' : ''}`}
                style={{ left: `calc(${(selectedIndex / (options.length - 1)) * 100}% - 8px)` }}
              ></div>
            </div>
          </div>

          {/* Image Section - Different layout based on modalType with smooth crossfade */}
          {displayedImage && (
            <div className={`gemstone-image-section ${modalType}-image`}>
              <div className="gemstone-image-wrapper">
                <img
                  src={displayedImage}
                  alt={`${modalType} ${selectedOption?.label}`}
                  className={`gemstone-preview-image ${isTransitioning ? 'transitioning' : ''}`}
                />
              </div>
              {modalType === 'carat' && handImageCaption && (
                <p className="gemstone-image-caption f-12 f-m-12 w-400 black-color l-h-1-4 ff-c">{handImageCaption}</p>
              )}
            </div>
          )}

          {/* Selected Option Description */}
          {selectedOption?.description && (
            <div className={`gemstone-blurb f-13 f-m-13 w-400 black-color l-h-1-4 ff-c ${isTransitioning ? 'transitioning' : ''}`}>
              {selectedOption.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen').MappedProductOptions} MappedProductOptions */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
