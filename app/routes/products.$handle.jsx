import { useLoaderData, useNavigate } from 'react-router';
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
      href: `/products/${data?.product.handle}`,
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context, params, request }) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle, data: product });

  return {
    product
  };
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

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { title, descriptionHtml } = product;

  return (
    <main className="product-page">

      {/* PRODUCT SECTION */}
      <div className="main-product">
        <div className='page-width'>
          <div className="back-navigation-wrapper">
            <button onClick={() => navigate(-1)} className="btn f-11 f-m-11 w-400 ff-n black-color l-h-1-2">
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
              let media = product.media.nodes;

              if (variantMedia && variantMedia.length > 0) {
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
                resizingInfoMetafield={product.resizing_info}
                shippingInfoMetafield={product.shipping_info}
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
        description="Receive custom engagement ring guidance from our expert team in person and online."
        items={ServicesshopByStyleItems} />

      <ProductRingCollections
        defaultImage="https://cdn.shopify.com/s/files/1/0644/3067/0060/files/initiatives_image_1000x1000.jpg?v=1759807949"
        data={PRODUCT_RING_COLLECTIONS} />

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
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/our_services_-_showrooms_23899665-c6e7-4523-9ff3-0a13892b4566_900x900.jpg?v=1741236795',
    link: '/collections/ready-to-ship',
  },
  {
    name: 'Appointments',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Our_Services_-_Appointments_900x900.jpg?v=1741060900',
    link: '/collections/ready-to-ship',
  },
  {
    name: 'Custom Rings',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Our_Services_-_Customised_Rings_900x900.jpg?v=1741060896',
    link: '/collections/ready-to-ship',
  },
  {
    name: 'Get in touch',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Our_Services_-_Get_In_Touch_900x900.jpg?v=1741060901',
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
    image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/one_tree_planted_900x900_f57e0fc8-6e09-4932-bb6c-7e234d41c296.webp?v=1770629164',
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


const PRODUCT_FAQ = [

  {
    question: 'How long will it take to get my order?',
    answer: (
      <p>
        Crafting of your ring typically takes 50 business days, with expediting
        options available if you need it sooner. The exact completion date can
        be conveniently found on each product page. Please note that shipping
        is not included within this date and you can find all our{' '}
        <Link to="/shipping" className="fancy">shipping information here</Link>.
        {' '}For all timeframe information please visit our{' '}
        <Link to="/crafting-timeframes" className="fancy">
          crafting timeframes page
        </Link>.
      </p>
    ),
  },

  {
    question: 'What if I need help placing an order through your website?',
    answer: (
      <p>
        If you need help selecting from our range of diamond engagement rings or
        lab grown engagement rings, please{' '}
        <Link to="/contact" className="fancy">contact us</Link>.
        Our team, experienced in both lab created diamonds and moissanite,
        will assist you.
      </p>
    ),
  },

  {
    question: 'What type of warranty do I receive?',
    answer: (
      <p>
        Cullen Jewellery offers a{' '}
        Lifetime Manufacturing Warranty On all our rings,
        including engagement, wedding and fashion rings, giving you confidence
        and peace of mind with every purchase. For all other fine jewellery
        pieces, such as earrings, chains, pendants, bracelets and more, we
        provide a 2-Year Manufacturer Warranty.{' '}
        <Link
          to="/warranty"
          className="fancy"
          title="Cullen Jewellery Lifetime Warranty"
        >
          View our full warranty details.
        </Link>
      </p>
    ),
  },

  {
    question: 'Do you ship worldwide?',
    answer: (
      <>
        <p>
          Yes! At Cullen Jewellery, we offer free international shipping on all
          orders, including those for the perfect diamond engagement ring.
          Shop online and add your chosen piece to your shopping bag with ease.
        </p>
        <p><strong>Import Duties and Taxes</strong></p>
        <p>
          Most of our orders are sent as DDP (Delivery Duty Paid – import duties &
          taxes are covered). However, there may be cases where you may have to
          pay local import taxes and duties, which Cullen Jewellery does not
          cover. For more details, please check our{' '}
          <Link to="/shipping" className="fancy">Shipping</Link> page or contact
          your local customs agency.
        </p>
      </>
    ),
  },

  {
    question: 'Can I just drop in to the showroom?',
    answer: (
      <p>
        Our showroom, featuring a range of lab grown diamond rings and moissanite
        pieces, is open{' '}
        <Link to="/visit" className="fancy">by appointment only</Link>.
        Discover our collection in person or online.
      </p>
    ),
  },

  {
    question: 'How do I find out my ring size?',
    answer: (
      <p>
        At Cullen Jewellery, we offer free ring sizers for our entire range.{' '}
        <Link
          to="/ring-size-guidance"
          className="fancy"
          title="Free Ring Sizer"
        >
          Measure your ring size
        </Link>{' '}
        comfortably at home for that perfect fit.
      </p>
    ),
  },

  {
    question: 'Can you help me keep my purchase a surprise?',
    answer: (
      <>
        <p>
          Absolutely! We understand that many of our products are purchased as
          surprise gifts for special occasions such as an engagement.
        </p>
        <p>
          For this reason, we use subtle packaging that will not give away the
          contents of the package. Please let us know if we can help you in any
          other way to keep your purchase a surprise!
        </p>
      </>
    ),
  },

  {
    question: 'What payment methods do you accept?',
    answer: (
      <p>
        At Cullen Jewellery, we accept payments via direct debit, cash (Melbourne
        only), or card. If you are looking for an extended payment plan, we also
        offer interest-free finance via Humm.
      </p>
    ),
  },

  {
    question: 'Can I return a product?',
    answer: (
      <p>
        At Cullen Jewellery, we value the craftsmanship involved in making each
        unique piece. Therefore, we do not offer refunds, returns or exchanges
        unless the item is faulty or damaged. Please see our{' '}
        <Link to="/returns" className="fancy">Returns Policy</Link> for more
        information.
      </p>
    ),
  },

  {
    question: 'The fit of my ring is not quite right, can I resize it?',
    answer: (
      <>
        <p>
          Absolutely! We offer <strong>One Free Resize</strong> for engagement and
          wedding rings within the first 12 months of completion (subject to
          eligible design style and metal type).
        </p>
        <p className="smallprint">
          *There are certain resizing restrictions for each ring design. The
          specific information can be found on the product page.{' '}
          <Link
            to="/free-resizing"
            className="fancy"
            title="Free Resizing"
          >
            Read more about resizing
          </Link>.
        </p>
      </>
    ),
  },
]



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
    video: 'https://cdn.shopify.com/videos/c/o/v/ea7967227d8a4705ae27f8538ecdf703.mov',
    poster: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/shop_by_stype_-_trilogy_400x400.jpg?v=1741067285',
    link: '',
  },
  {
    name: '',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/shop_by_stype_-_trilogy_400x400.jpg?v=1741067285',
    video: '',
    poster: '',
    link: '',
  },
  {
    name: '',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/2023_11_14_Cullen_Website_1x1_02_400x400.jpg?v=1700787282',
    video: '',
    poster: '',
    link: '',
  },
];

const STORY_SLIDES = [
  {
    id: 1,
    title: 'Every Ring Tells A Story',
    text: `Crafting a piece is only one part of the journey. Before a ring is made, it's imagined. Every design begins as a thought - inspired by a passing trend, a timeless silhouette, or the wish of a client searching for something deeply personal. From there, sketches are drawn, refined, and reimagined until a story begins to take form.`,
    bgColor: 'var(--primary_color)',
    textColor: 'var(--white_color)',
    link: '/collections/engagementrings',
    linkText: 'LEARN MORE',
    linkColor: 'var(--accent_color_light_gold)',
    image: {
      src: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/shop_by_style_-_toi_et_moi_400x400.jpg?v=1741067284',
      alt: 'Crafting ring',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 2,
    title: 'Materials Matter',
    text: 'Personalise your ring with the diamond and precious metal that feels most like you - from 18k Yellow, Rose or White Gold to Platinum, all nickel-free and hypoallergenic. We work exclusively with lab-grown diamonds, identical in brilliance to mined gems but free from the environmental impact of mining. This allows every piece to balance timeless craftsmanship with innovation, sustainability, and individuality.',
    bgColor: 'var(--bg_light_secondary)',
    textColor: 'var(--black_color)',
    link: '/collections/engagement-rings',
    linkText: 'LEARN MORE',
    linkColor: 'var(--accent_color_gold)',
    image: {
      src: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/2023_11_14_Cullen_Website_4x5_07_400x400.jpg?v=1701322555',
      alt: 'Ring detail',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 3,
    title: 'The Highest Quality Control',
    text: 'Personalise your ring with the diamond and precious metal that feels most like you - from 18k Yellow, Rose or White Gold to Platinum, all nickel-free and hypoallergenic. We work exclusively with lab-grown diamonds, identical in brilliance to mined gems but free from the environmental impact of mining. This allows every piece to balance timeless craftsmanship with innovation, sustainability, and individuality.',
    bgColor: 'var(--primary_color)',
    textColor: 'var(--white_color)',
    link: '/collections/engagement',
    linkText: 'LEARN MORE',
    linkColor: 'var(--accent_color_light_gold)',
    image: {
      src: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Website_4x5_2500px_02_1_400x400.jpg?v=1741064516',
      alt: 'Quality control',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 4,
    title: 'Perfect Pairing',
    text: `Every Cullen ring undergoes a meticulous multi-stage process - casting, polishing, cleaning, and 50x microscopic inspections by dedicated quality control specicialists - to ensure flawless crafstmanship and lasting brilliance. Any piece that falls show of our standards is immediately rectified by our in-house jewellers.`,
    bgColor: 'var(--bg_light_secondary)',
    textColor: 'var(--black_color)',
    link: '/collections/rings',
    linkText: 'LEARN MORE',
    linkColor: 'var(--accent_color_gold)',
    image: {
      src: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Shop_by_style_-_Bezel_400x400.jpg?v=1741067285',
      alt: 'Ring pairing',
      width: 1600,
      height: 900,
    },
  },
];


const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment MainProductVariant on ProductVariant {
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
  fragment MainProduct on Product {
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
      ...MainProductVariant
        }
      }
    }
    selectedOrFirstAvailableVariant(
      selectedOptions: $selectedOptions
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      ...MainProductVariant
    }
    adjacentVariants(selectedOptions: $selectedOptions) {
      ...MainProductVariant
    }
    seo {
      description
      title
    }
    detail_info: metafield(namespace: "custom", key: "detail_info") {
      value
    }
    resizing_info: metafield(namespace: "custom", key: "resizing_info") {
      value
    }
    shipping_info: metafield(namespace: "custom", key: "shipping_info") {
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
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...MainProduct
    }
  }
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
