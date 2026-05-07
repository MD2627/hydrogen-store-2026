import { redirect, useLoaderData, useNavigate } from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import { ProductPrice } from '~/components/ProductPrice';
import { ProductImage } from '~/components/ProductImage';
import { ProductForm } from '~/components/ProductForm';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { StickySwiper } from '~/components/stickySwiper';
import { VideoBanner } from '~/components/VideoBanner';
import { ShopByStyle } from '~/components/ShopByStyle';
import { ProductFAQ } from '~/components/ProductFAQ';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductRingCollections } from '~/components/ProductRingCollections';
import { ShopByStyleScroll } from '~/components/ShopByStyleScroll';
import { SingleImage } from '~/components/SingleImage';
import { Link } from 'react-router';
/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [
    { title: `Hydrogen | ${data?.product.title ?? ''}` },
    {
      rel: 'canonical',
      href: `/engagement/${data?.product.handle}`,
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const { params, request } = args;
  const url = new URL(request.url);
  const search = url.search;
  return redirect(`/engagement-rings/${params.handle}${search}`, 301);
}

async function loadCriticalData({ context, params, request }) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions: getSelectedProductOptions(request),
      },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  // --- PARTIAL MATCH LOGIC ---
  // If the default selected variant doesn't match our requested options,
  // try to find a variant that matches what we provided.
  const urlOptions = (() => {
    const url = new URL(request.url);
    const options = [];
    for (const [key, value] of url.searchParams) {
      options.push({
        name: decodeURIComponent(key.replace(/\+/g, ' ')),
        value: decodeURIComponent(value.replace(/\+/g, ' ')),
      });
    }
    return options;
  })();


  if (urlOptions.length > 0 && product.variants?.nodes) {
    const currentSelected = product.selectedOrFirstAvailableVariant;

    // Check if the current selection actually matches our requests
    const isMismatch = urlOptions.some(reqOpt => {
      const selectedOpt = currentSelected?.selectedOptions?.find(
        o => o.name === reqOpt.name
      );
      // If the option doesn't exist on the variant, or value mismatches
      // Note: check case-insensitivity just in case
      return !selectedOpt || selectedOpt.value.toLowerCase() !== reqOpt.value.toLowerCase();
    });

    if (isMismatch) {
      // Find a better match
      const betterVariant = product.variants.nodes.find(variant => {
        return urlOptions.every(reqOpt => {
          const vOpt = variant.selectedOptions.find(o => o.name === reqOpt.name);
          return vOpt && vOpt.value.toLowerCase() === reqOpt.value.toLowerCase();
        });
      });

      if (betterVariant) {
        product.selectedOrFirstAvailableVariant = betterVariant;
      }
    }
  }
  // ---------------------------

  redirectIfHandleIsLocalized(request, { handle, data: product });

  return { product };
}

function loadDeferredData() {
  return {};
}

export default function Product() {
  const { product } = useLoaderData();
  const navigate = useNavigate();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const originalProductOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  // Use Shopify's native URL format without custom encoding
  const productOptions = originalProductOptions.map((option) => ({
    ...option,
    optionValues: option.optionValues.map((value) => ({
      ...value,
      // Keep Shopify's native variantUriQuery format
      variantUriQuery: value.variantUriQuery,
    })),
  }));

  const { title, descriptionHtml } = product;

  return (
    <main className="product-page">

      {/* PRODUCT SECTION */}
      <div className="main-product">
        <div className='page-width'>
          <div className="back-navigation-wrapper">
            <button
              onClick={() => {
                // Build collection URL with all filters from current variant
                const params = new URLSearchParams();

                selectedVariant?.selectedOptions?.forEach(option => {
                  const optionName = option.name.toLowerCase();
                  const optionValue = option.value.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/\//g, '')
                    .replace(/--/g, '-');

                  // Map option names to collection filter parameter names
                  if (optionName.includes('metal')) {
                    params.set('metal', optionValue);
                  } else if (optionName.includes('setting')) {
                    params.set('setting', optionValue);
                  } else if (optionName.includes('band')) {
                    params.set('band', optionValue);
                  } else if (optionName.includes('profile')) {
                    params.set('profile', optionValue);
                  }
                });

                const queryString = params.toString();
                navigate(queryString ? `/engagement?${queryString}` : '/engagement');
              }}
              className="btn f-11 f-m-11 w-400 ff-n black-color l-h-1-2"
            >
              <span className="arrow-icon">
                <svg viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.875 8.466H1.058M5.292 4.233 1.058 8.466 5.292 12.7"
                    className="stroke"
                    style={{
                      fill: 'none',
                      stroke: 'rgb(0, 0, 0)',
                      strokeWidth: 1.05831,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      strokeOpacity: 1,
                      strokeMiterlimit: 4,
                      strokeDasharray: 'none',
                    }}
                  />
                </svg>
              </span> BROWSE OTHER SETTINGS
            </button>
          </div>
          <div className="product-content">

            {(() => {
              const variantMedia = selectedVariant?.metafield?.references?.nodes;
              let media = [];

              if (variantMedia && variantMedia.length > 0) {
                // Variant has custom media - use it
                if (selectedVariant?.image) {
                  const mainImageMedia = {
                    mediaContentType: 'IMAGE',
                    image: selectedVariant.image,
                    id: selectedVariant.image.id,
                    previewImage: selectedVariant.image,
                  };
                  media = [mainImageMedia, ...variantMedia];
                } else {
                  media = variantMedia;
                }
              } else {
                // Fallback to all product media only if variant has no image at all
                media = product.media.nodes;
              }

              return (
                <ProductImage image={selectedVariant?.image} media={media} />
              );
            })()}

            <div className="product-main">
              {(() => {
                const parts = title.split(/\s*[-–—]\s*/);
                return (
                  <h1 className="product-title">
                    <span className="title-main f-32 f-m-31 ff-a w-300 l-h-1 black-color">{parts[0]}</span>
                    {parts[1] && <span className="title-sub f-23 f-m-22 ff-a w-300 l-h-1 black-color">{parts[1]}</span>}
                  </h1>
                );
              })()}

              <ProductPrice
                price={selectedVariant?.price}
                compareAtPrice={selectedVariant?.compareAtPrice}
              />
              <div className="product-description f-13 f-m-13 ff-n w-300 l-h-1 black-color" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
                productTags={product.tags}
                detailInfoMetafield={product.detail_info}
              />
            </div>
            <Analytics.ProductView
              data={{
                products: [
                  {
                    id: product.id,
                    title: product.title,
                    price: selectedVariant?.price.amount || '0',
                    vendor: product.vendor,
                    variantId: selectedVariant?.id || '',
                    variantTitle: selectedVariant?.title || '',
                    quantity: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>


      <ShopByStyle
        variant="section-gallery"
        title="Gallery"
        description=""
        items={shopByStyleItems} />

      <StickySwiper
        data={STORY_SLIDES}
      />

      <VideoBanner
        data={VIDEO_BANNER_DATA}
      />

      <ShopByStyleScroll
        title="Our Services"
        variant="section-services"
        description="Get personalized engagement ring support from our specialists, available both in-store and online."
        items={ServicesshopByStyleItems} />

      <ProductRingCollections defaultImage="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/initiatives_image_1000x1000.jpg?v=1759807949" data={PRODUCT_RING_COLLECTIONS} />

      <ShopByStyleScroll
        variant="education"
        title="Education"
        description="We provide industry-leading guidance on fine jewelry and in-depth education for lab grown diamonds and moissanite stones, along with the anatomy of an engagement ring."
        items={EducationshopByStyleItems} />

      <SingleImage />

      <ProductFAQ data={PRODUCT_FAQ} />

      <UvpIconFooter data={PRODUCT_UVPS} />

    </main >
  );
}

const VIDEO_BANNER_DATA = {
  desktopVideo: "https://cdn.shopify.com/videos/c/o/v/5b695d502aea4a4295774e56c902bab2.mp4",
  mobileVideo: "https://cdn.shopify.com/videos/c/o/v/5b695d502aea4a4295774e56c902bab2.mp4",
  heading: "Heirloom in the Making",
  description: "A handcrafted piece whose story begins with you.",
  buttonText: "BOOK AN APPOINTMENT",
  buttonUrl: "/pages/visit"
};

const ServicesshopByStyleItems = [
  {
    name: 'Showrooms',
    image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Diamond_Jewellery_London_153_1a_retouched_high_res_2000x2000_3c58c06f-db50-4e7e-93eb-c819d1c42f12.webp?v=1777438793',
    link: '/collections/ready-to-ship',
  },
  {
    name: 'Appointments',
    image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/pexels-shkrabaanthony-7167043.jpg?v=1778041592',
    link: '/collections/ready-to-ship',
  },
  {
    name: 'Custom Rings',
    image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/4097099a880f3f3165d2c7724dbe5a70.jpg?v=1776071858',
    link: '/collections/ready-to-ship',
  },
  {
    name: 'Get in touch',
    image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/b2473d66f964180e38ee574b8e6c7ad6.jpg?v=1777438991',
    link: '/collections/ready-to-ship',
  }
];

const EducationshopByStyleItems = [
  {
    name: 'Engagement Ring Advice',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Education_-_Engagement_Ring_Advice_1300x1300.jpg?v=1741061962',
    link: '/collections/ready-to-ship',
  },
  {
    name: 'Lab Grown Diamond Advice',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Education_-_Lab_Grown_Diamond_Advice_700x700.jpg?v=1741061911',
    link: '/collections/ready-to-ship',
  },
  {
    name: 'Moissanite Advice',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/our_services_-_moissanite_guidance_1_500x500.jpg?v=1741236912',
    link: '/collections/ready-to-ship',
  }
];

const PRODUCT_RING_COLLECTIONS = [
  {
    title: 'Carbon Neutral',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Carbon_neurtral_900x900.jpg?v=1759811968',
    description: 'We acknowledge that producing a finished diamond, whether mined or lab, requires significant energy resources. That’s why we offset the carbon footprint associated with all of our lab grown diamonds. We invest in verified renewable energy projects in the countries and communities where the diamonds are grown, ensuring that the carbon emissions from the diamonds are fully offset.',
    link: '/collections/ready-to-ship',
  },
  {
    title: 'Trees For The Future',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/one_tree_planted_900x900.jpg?v=1759807947',
    description: 'We plant 1 tree for every jewellery purchase through our partnership with Trees For The Future. This initiative focuses on reforestation efforts, particularly in Africa, where significant habitat loss has occurred due to mining. This reinforces our commitment to environmental responsibility and sustainable practices by reducing our carbon footprint.',
    link: '/collections/statement-rings',
  },
  {
    title: 'Gold Recycling',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/gold_recycling_900x900.jpg?v=1759807951',
    description: `Our in-house Precious Metal Recycling Initiative plays an integral part in our commitment to reducing waste and recycling finite resources like gold and platinum. Through this initiative, we diligently collect and reuse precious metals from the crafting process by collecting workshop dust, shavings, and filings. We can then refine the precious metals, allowing us to reuse them in our clients' resizes and repairs.`,
    link: '/collections/minimal-rings',
  },
];

const PRODUCT_UVPS = [
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

const PRODUCT_FAQ = [
  {
    question: 'How long does it take to receive my order?',
    answer: `
      <p>
        Each piece is carefully crafted and typically completed within <strong>50 business days</strong>.
        Need it sooner? Expedited options are available.
      </p>
      <p>
        Delivery time is separate from crafting. For full details, view our
        <a href="/shipping" class="fancy">Shipping Information</a> or
        <a href="/crafting-timeframes" class="fancy">Crafting Timeframes</a>.
      </p>
    `,
  },
  {
    question: 'Can I get help placing my order?',
    answer: `
      <p>
        Absolutely. Our experts are here to guide you through selecting the perfect piece.
      </p>
      <p>
        <a href="/contact" class="fancy">Contact us</a> for personalized assistance anytime.
      </p>
    `,
  },
  {
    question: 'What warranty do you offer?',
    answer: `
      <p>
        All rings come with a <strong>Lifetime Manufacturing Warranty</strong> for complete peace of mind.
      </p>
      <p>
        Other jewellery items include a <strong>2-Year Warranty</strong>.
        <a href="/warranty" class="fancy">View full warranty details</a>.
      </p>
    `,
  },
  {
    question: 'Do you offer international shipping?',
    answer: `
      <p>
        Yes, we provide <strong>free worldwide shipping</strong> on all orders.
      </p>
      <p>
        Most shipments are sent with duties and taxes included (DDP). In rare cases,
        local charges may apply. Learn more on our
        <a href="/shipping" class="fancy">Shipping page</a>.
      </p>
    `,
  },
  {
    question: 'Can I visit your showroom?',
    answer: `
      <p>
        Yes, our showroom visits are available <strong>by appointment only</strong>.
      </p>
      <p>
        <a href="/visit" class="fancy">Book your visit</a> to explore our collection in person.
      </p>
    `,
  },
  {
    question: 'How do I find my ring size?',
    answer: `
      <p>
        We offer complimentary ring sizers so you can measure your size at home with ease.
      </p>
      <p>
        <a href="/ring-size-guidance" class="fancy">Find your ring size</a>.
      </p>
    `,
  },
  {
    question: 'Can you keep my order a surprise?',
    answer: `
      <p>
        Of course. All orders are shipped in discreet packaging to keep your surprise safe.
      </p>
      <p>
        Let us know if you need any extra assistance.
      </p>
    `,
  },
  {
    question: 'What payment methods do you accept?',
    answer: `
      <p>
        We accept card payments, direct debit, and cash (Melbourne only).
      </p>
      <p>
        Flexible payment options, including interest-free plans, are also available.
      </p>
    `,
  },
  {
    question: 'Can I return or exchange a product?',
    answer: `
      <p>
        As each piece is made to order, returns or exchanges are not offered unless the item is faulty.
      </p>
      <p>
        Please review our <a href="/returns" class="fancy">Returns Policy</a> for details.
      </p>
    `,
  },
  {
    question: 'Can my ring be resized?',
    answer: `
      <p>
        Yes, we offer <strong>one complimentary resize</strong> within 12 months of purchase
        (subject to design and metal type).
      </p>
      <p>
        <a href="/free-resizing" class="fancy">Learn more about resizing</a>.
      </p>
    `,
  },
];


const shopByStyleItems = [
  {
    name: '',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Shop_by_style_-_Bezel_400x400.jpg?v=1741067285',
    video: '', // no video → image will show
    poster: '',
    link: '',
  },
  {
    name: '',
    image: '',
    video: 'https://cdn.shopify.com/videos/c/o/v/9c21baf38e4e45759ee90233bbe676e3.mp4',
    poster: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_ff5er4ff5er4ff5e.png?v=1777364392',
    link: '',
  },
  {
    name: '',
    image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_gzezklgzezklgzez.png?v=1777364392',
    video: '',
    poster: '',
    link: '',
  },
  {
    name: '',
    image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_ff5er4ff5er4ff5e.png?v=1777364392',
    video: '',
    poster: '',
    link: '',
  },
];

const STORY_SLIDES = [
  {
    id: 1,
    title: 'Where Every Ring Begins',
    text: `Every design starts as an idea, inspired by moments, styles, and personal stories. Through careful refinement, each ring becomes a piece with meaning.`,
    bgColor: 'var(--primary_color)',
    textColor: 'var(--white_color)',
    link: '/collections/engagementrings',
    linkText: 'LEARN MORE',
    linkColor: 'var(--black_color)',
    image: {
      src: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/565fbceadeeaaa6b7f0b1ffc2a191d38.jpg?v=1775818258',
      alt: 'Crafting ring',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 2,
    title: 'Thoughtfully Chosen Materials',
    text: 'From rich 18k gold tones to platinum, every metal is selected for comfort and quality. Paired with lab-grown diamonds that match the brilliance of natural stones, each ring is designed with care, sustainability, and personal expression in mind.',
    bgColor: 'var(--bg_light_secondary)',
    textColor: 'var(--black_color)',
    link: '/collections/engagement-rings',
    linkText: 'LEARN MORE',
    linkColor: 'var(--accent_color_gold)',
    image: {
      src: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/10a086ec9cd030c9f59411e31b26c762.jpg?v=1776074028',
      alt: 'Ring detail',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 3,
    title: 'Uncompromising Quality',
    text: 'Every ring is meticulously inspected at each stage of creation to ensure exceptional craftsmanship. From precise stone setting to flawless finishing, our quality control process guarantees a piece that meets the highest standards of excellence.',
    bgColor: 'var(--primary_color)',
    textColor: 'var(--white_color)',
    link: '/collections/engagement',
    linkText: 'LEARN MORE',
    linkColor: 'var(--accent_color_light_gold)',
    image: {
      src: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/pexels-ayseguldelice-30720972.jpg?v=1777030343',
      alt: 'Quality control',
      width: 1600,
      height: 900,
    },
  },
];


const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment EngagementProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    metafield(namespace: "custom", key: "variant_media") {
      references(first: 20) {
        nodes {
          ... on MediaImage {
            mediaContentType
            image {
              id
              url
              altText
              width
              height
            }
          }
          ... on Video {
            mediaContentType
            id
            sources {
              mimeType
              url
            }
            previewImage {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
    engraving_preview: metafield(namespace: "custom", key: "engraving_preview") {
      reference {
        ... on MediaImage {
          image {
            url
          }
        }
      }
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment EngagementProduct on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    tags
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
        ...EngagementProductVariant
        }
      }
    }
    selectedOrFirstAvailableVariant(
      selectedOptions: $selectedOptions
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      ...EngagementProductVariant
    }
    adjacentVariants(selectedOptions: $selectedOptions) {
      ...EngagementProductVariant
    }
    seo {
      description
      title
    }
    detail_info: metafield(namespace: "custom", key: "detail_info") {
      value
    }
    media(first: 20) {
      nodes {
        ... on MediaImage {
          mediaContentType
          image {
            id
            url
            altText
            width
            height
          }
        }
        ... on Video {
          mediaContentType
          id
          sources {
            mimeType
            url
          }
          previewImage {
            url
            altText
            width
            height
          }
        }
        ... on ExternalVideo {
          mediaContentType
          id
          embedUrl
          host
        }
        ... on Model3d {
          mediaContentType
          id
          sources {
            mimeType
            url
          }
          previewImage {
            url
            altText
            width
            height
          }
        }
      }
    }
    variants(first: 100) {
      nodes {
        ...EngagementProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query EngagementProduct(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...EngagementProduct
    }
  }
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
