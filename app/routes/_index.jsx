import { Await, useLoaderData, Link } from 'react-router';
import { Suspense } from 'react';
import { SplitBanner } from '~/components/SplitBanner';
import { VideoBanner } from '~/components/VideoBanner';
import { ShopByStyle } from '~/components/ShopByStyle';
import { CraftsmanshipBanner } from '~/components/CraftsmanshipBanner';
import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { RingCollections } from '~/components/RingCollections';
import { ProductItem } from '~/components/ProductItem';
import { ProductFAQ } from '~/components/ProductFAQ';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductRingCollections } from '~/components/ProductRingCollections';
import { ShopByStyleScroll } from '~/components/ShopByStyleScroll';
import { InstagramSection } from '~/components/instagram-section';
import ReviewMeta from '~/components/reviewMeta';
import { RichText } from '~/components/RichText';

import { Image } from '@shopify/hydrogen';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Hydrogen | Home' }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data nec essary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context }) {
  const [
    { collections },
    metaobjectData,
    faqMetaobjectData,
    shopByStyleMetaobject,
    ringCollectionsData,
    instagramMetaobjectData,
    reviewsResult
  ] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    context.storefront.query(HOME_BANNER_QUERY),
    context.storefront.query(FAQ_QUERY),
    context.storefront.query(SHOP_BY_STYLE_METAOBJECT_QUERY),
    context.storefront.query(RING_COLLECTIONS_QUERY),
    context.storefront.query(INSTAGRAM_METAOBJECT_QUERY),
    context.storefront.query(REVIEWS_QUERY),
  ]);

  const { metaobjects: reviewsMeta } = reviewsResult || {};

  const reviews = (reviewsMeta?.nodes || []).map(node => {
    const fields = (node.fields || []).reduce((acc, field) => {
      acc[field.key] = field.value;
      if (field.reference?.image) acc[`${field.key}_image`] = field.reference.image.url;
      return acc;
    }, {});

    return {
      id: fields.review_id || node.id,
      author: fields.author_name || '',
      initial: fields.author_initial || (fields.author_name ? fields.author_name[0] : ''),
      rating: parseInt(fields.rating) || 5,
      time: fields.review_time || '',
      text: fields.review_text || '',
      source: fields.review_source || 'Google',
      sourceLogo: fields.source_logo_image || null
    };
  });


  return {
    featuredCollection: collections.nodes[0],
    homeBanner: metaobjectData?.metaobjects?.nodes?.[0] || null,
    faqMetaobject: faqMetaobjectData?.metaobjects?.nodes?.[0] || null,
    ringCollectionsMeta: ringCollectionsData?.ringCollections || null,
    gemstoneGuidanceMeta: ringCollectionsData?.gemstoneGuidance || null,
    initiativesMeta: ringCollectionsData?.initiatives?.nodes?.[0] || null,
    splitBannerMeta: ringCollectionsData?.splitBanner || null,
    storyCraftMeta: ringCollectionsData?.storyCraft?.nodes?.[0] || null,
    shopByStyleMetas: shopByStyleMetaobject?.metaobjects?.nodes || [],
    instagramMeta: instagramMetaobjectData?.metaobjects?.nodes?.[0] || null,
    reviews: reviews || [],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({ context }) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

/**
 * Helper to parse Ring Collection Metaobjects
 */
const parseRingCollection = (metaobject, fallbackData) => {
  if (!metaobject) return fallbackData;

  const fields = metaobject.fields || [];
  const getField = (key) => fields.find(f => f.key === key);

  // Strictly target 'section_title' field
  const title = getField('section_title')?.value ||
    getField('title')?.value ||
    getField('heading')?.value ||
    fallbackData.title;

  // Strictly target 'section_content' field for the items list
  const referencesField = getField('section_content');

  // If we have references, parse them
  if (referencesField?.references?.nodes && referencesField.references.nodes.length > 0) {
    const categories = referencesField.references.nodes.map(node => {
      const entryFields = node.fields || [];
      const getEntryField = (key) => entryFields.find(f => f.key === key);

      return {
        name: getEntryField('display_name')?.value ||
          getEntryField('name')?.value ||
          getEntryField('title')?.value || '',
        image: getEntryField('image')?.reference?.image?.url ||
          getEntryField('image_url')?.value || '',
        link: getEntryField('link')?.value ||
          getEntryField('url')?.value || '',
      };
    }).filter(cat => cat.name || cat.image);

    if (categories.length > 0) {
      return {
        title,
        defaultImage: categories[0]?.image || fallbackData.defaultImage,
        categories
      };
    }
  }

  // If no specific references were found/parsed, then use fallback
  return fallbackData;
};

/**
 * Helper function to parse Shopify Rich Text JSON to HTML
 */
const parseRichText = (richTextJson) => {
  if (!richTextJson) return '';

  try {
    const parsed = typeof richTextJson === 'string' ? JSON.parse(richTextJson) : richTextJson;

    const renderNode = (node) => {
      if (!node) return '';

      if (node.type === 'root') {
        return node.children?.map(renderNode).join('') || '';
      }

      if (node.type === 'paragraph') {
        const content = node.children?.map(renderNode).join('') || '';
        return `<p>${content}</p>`;
      }

      if (node.type === 'text') {
        let text = node.value || '';
        if (node.bold) text = `<strong>${text}</strong>`;
        if (node.italic) text = `<em>${text}</em>`;
        return text;
      }

      if (node.type === 'link') {
        const content = node.children?.map(renderNode).join('') || '';
        const url = node.url || '#';
        const target = node.target || '_self';
        return `<a href="${url}" target="${target}" class="fancy">${content}</a>`;
      }

      if (node.type === 'list') {
        const listTag = node.listType === 'ordered' ? 'ol' : 'ul';
        const content = node.children?.map(renderNode).join('') || '';
        return `<${listTag}>${content}</${listTag}>`;
      }

      if (node.type === 'list-item') {
        const content = node.children?.map(renderNode).join('') || '';
        return `<li>${content}</li>`;
      }

      if (node.type === 'heading') {
        const level = node.level || 2;
        const content = node.children?.map(renderNode).join('') || '';
        return `<h${level}>${content}</h${level}>`;
      }

      // Fallback for unknown types
      if (node.children) {
        return node.children.map(renderNode).join('');
      }

      return node.value || '';
    };

    return renderNode(parsed);
  } catch (e) {
    // If parsing fails, return the original string
    return richTextJson;
  }
};

/**
 * Helper to parse Initiatives Metaobjects
 */
const parseInitiatives = (metaobject, fallbackData) => {
  if (!metaobject) return { title: 'Initiatives', items: fallbackData };

  const fields = metaobject.fields || [];
  const getField = (key) => fields.find(f => f.key === key);

  const title = getField('section_title')?.value || 'Initiatives';
  const referencesField = getField('section_content');

  let initiatives = fallbackData;
  if (referencesField?.references?.nodes && referencesField.references.nodes.length > 0) {
    initiatives = referencesField.references.nodes.map(node => {
      const entryFields = node.fields || [];
      const getEntryField = (key) => entryFields.find(f => f.key === key);

      return {
        title: getEntryField('title')?.value || '',
        image: getEntryField('image')?.reference?.image?.url || '',
        description: parseRichText(getEntryField('content')?.value) || '',
        link: getEntryField('button_url')?.value || '',
      };
    }).filter(item => item.title && (item.image || item.description));
  }

  return { title, items: initiatives };
};

/**
 * Helper function to convert long Shopify video URLs to short CDN format
 */
const convertToShortVideoUrl = (longUrl) => {
  if (!longUrl) return null;

  // Extract video ID from the long URL
  // Format: https://shop.myshopify.com/cdn/shop/videos/c/vp/{id}/{id}.HD-1080p-4.8Mbps-67516284.mp4
  // Target: https://cdn.shopify.com/videos/c/o/v/${id}.mp4
  const match = longUrl.match(/\/vp\/([a-f0-9]+)\//);
  if (match && match[1]) {
    return `https://cdn.shopify.com/videos/c/o/v/${match[1]}.mp4`;
  }

  // If pattern doesn't match, return original URL
  return longUrl;
};

/**
 * Helper to parse Split Banner Metaobjects
 */
const parseSplitBanners = (metaobject) => {
  if (!metaobject) return [];

  const fields = metaobject.fields || [];
  const getField = (key) => fields.find(f => f.key === key);

  const referencesField = getField('section_content');

  if (referencesField?.references?.nodes && referencesField.references.nodes.length > 0) {
    return referencesField.references.nodes.map(node => {
      const entryFields = node.fields || [];
      const getEntryField = (key) => entryFields.find(f => f.key === key);

      return {
        left: {
          image: getEntryField('left_image')?.reference?.image?.url || '',
          title: getEntryField('left_title')?.value || '',
          description: getEntryField('left_description')?.value || '',
          linkText: getEntryField('left_link_text')?.value || '',
          linkTo: getEntryField('left_link_url')?.value || '',
        },
        right: {
          video: convertToShortVideoUrl(getEntryField('right_video')?.reference?.sources?.[0]?.url) || '',
        },
        middle: {
          heading: getEntryField('middle_heading')?.value || '',
          description: getEntryField('middle_description')?.value || '',
        }
      };
    });
  }

  return [];
};

/**
 * Helper to parse Story Craft Metaobjects
 */
const parseStoryCraft = (metaobject, fallbackData) => {
  if (!metaobject) return fallbackData;

  const fields = metaobject.fields || [];
  const contentField = fields.find(f => f.key === 'section_content');
  const storyItem = contentField?.reference;

  if (!storyItem) return fallbackData;

  const itemFields = storyItem.fields || [];
  const getField = (key) => itemFields.find(f => f.key === key);

  const videoUrl = convertToShortVideoUrl(getField('video')?.reference?.sources?.[0]?.url);
  const imageUrl = getField('image')?.reference?.image?.url;

  return {
    title: getField('title')?.value || fallbackData.title,
    subtitle: getField('subtitle')?.value || fallbackData.subtitle,
    videoSrc: videoUrl,
    imageSrc: imageUrl,
    ctaText: getField('cta_text')?.value || fallbackData.ctaText,
    ctaLink: getField('cta_link')?.value || fallbackData.ctaLink,
  };
};

/**
 * Helper to parse Shop By Style Metaobjects
 */
const parseShopByStyle = (metaobject, fallbackData) => {
  if (!metaobject) return fallbackData;

  const fields = metaobject.fields || [];
  const getField = (key) => fields.find(f => f.key === key);

  const title = getField('section_title')?.value || getField('title')?.value || fallbackData.title;
  const subtitle = getField('section_subtitle')?.value || getField('subtitle')?.value || fallbackData.subtitle;

  const referencesField = getField('collection_list') || getField('items');
  let items = fallbackData.items;

  if (referencesField?.references?.nodes && referencesField.references.nodes.length > 0) {
    items = referencesField.references.nodes.map(node => {
      // Check if it's a collection or a metaobject acting as an item
      // Assuming it invokes a collection or similar structure
      // For now, let's assume it might be a metaobject with fields
      const entryFields = node.fields || [];
      const getEntryField = (key) => entryFields.find(f => f.key === key);

      // If it's a collection reference, we might need access to collection fields directly, which depends on query
      // If the reference is a Metaobject (custom item)
      const name = getEntryField('title')?.value || getEntryField('name')?.value || '';
      const image = getEntryField('image')?.reference?.image?.url || '';
      const link = getEntryField('link')?.value || '';

      if (name) {
        return { name, image, link };
      }

      // Fallback: if it is a collection object from the storefront API (not metaobject)
      if (node.title && node.handle) {
        return {
          name: node.title,
          image: node.image?.url || '',
          link: `/collections/${node.handle}`
        };
      }

      return null;
    }).filter(Boolean);
  }

  return { title, subtitle, items };
};

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  const parseHeadingMetaobject = (meta) => {

    const fields = meta?.fields || [];
    const getField = (key) => fields.find(f => f.key === key);

    const title = getField("title")?.value;
    const subtitle = parseRichText(getField("sub_title")?.value);

    const sliderRefs = getField("slider_content")?.references?.nodes || [];

    const items = sliderRefs.map((item) => {
      const itemFields = item.fields || [];
      const getItemField = (key) => itemFields.find(f => f.key === key);

      return {
        name: getItemField("title")?.value,
        image: getItemField("image")?.reference?.image?.url,
        link: getItemField("url")?.value,
      };
    });

    return { title, subtitle, items };
  };

  const parseInstagramMetaobject = (meta) => {

    const fields = meta?.fields || [];
    const getField = (key) => fields.find(f => f.key === key);

    const title = getField("title")?.value;
    const description = parseRichText(getField("sub_title")?.value);

    const sliderRefs = getField("content")?.references?.nodes || [];

    const posts = sliderRefs.map((item, i) => {

      const itemFields = item.fields || [];
      const getItemField = (key) => itemFields.find(f => f.key === key);

      return {
        id: i,
        img: getItemField("image")?.reference?.image?.url,   // CHANGE HERE
        link: getItemField("url")?.value,
        alt: getItemField("image")?.reference?.image?.altText
      };
    });

    return { title, description, posts };
  };

  // const fields = data.shopByStyleMeta?.fields || [];
  const headingMetas = data.shopByStyleMetas || [];

  const shopLabSlider = parseHeadingMetaobject(headingMetas[0]);
  const bestSellingSlider = parseHeadingMetaobject(headingMetas[1]);
  const shopByCategorySlider = parseHeadingMetaobject(headingMetas[2]);
  const servicesSlider = parseHeadingMetaobject(headingMetas[3] || {});
  const educationSlider = parseHeadingMetaobject(headingMetas[4] || {});
  const instagramSectionData = parseInstagramMetaobject(data.instagramMeta);

  const shopByStyleItems = [
    {
      name: 'SOLITAIREXXXXXX',
      image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/2023_11_14_Cullen_Website_4x5_07_400x400.jpg?v=1701322555',
      link: '/engagement?style=solitaire',
    },
    {
      name: 'BEZEL',
      image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Shop_by_style_-_Bezel_400x400.jpg?v=1741067285',
      link: '/engagement?style=bezel',
    },
    {
      name: 'TOI ET MOI',
      image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/shop_by_style_-_toi_et_moi_400x400.jpg?v=1741067284',
      link: '/engagement?style=toi-et-moi',
    },
    {
      name: 'TRILOGY',
      image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/shop_by_stype_-_trilogy_400x400.jpg?v=1741067285',
      link: '/engagement?style=trilogy',
    },
    {
      name: 'HALO',
      image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/2023_11_14_Cullen_Website_1x1_02_400x400.jpg?v=1700787282',
      link: '/engagement?style=halo',
    },
  ];

  const featuredRingsItems = [
    {
      name: 'Emma',
      image: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/1jazwhhoq51qrlnyyobqd45h_prlqnduj_fdbae3e19cb08610356e1b14708e8558.jpg?v=1768038347',
      link: '/products/ring-emma',
    },
    {
      name: 'Bella',
      image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Website_4x5_2500px_03_2_400x400.jpg?v=1741064516',
      link: '/products/bella',
    },
    {
      name: 'Francesca',
      image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Website_4x5_2500px_05_400x400.jpg?v=1741064515',
      link: '/products/francesca',
    },
    {
      name: 'Imani',
      image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Website_4x5_2500px_02_1_400x400.jpg?v=1741064516',
      link: '/products/imani',
    },
    {
      name: 'Sheridan',
      image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Website_4x5_2500px_01_400x400.jpg?v=1741064515',
      link: '/products/ring-sheridan',
    },
    {
      name: 'Paige',
      image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Website_4x5_2500px_01_400x400.jpg?v=1741064515',
      link: '/products/paige',
    }
  ];

  const ringCollectionsData = {
    defaultImage:
      'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Ring_Collections_-_Ready_to_Ship_1000x1000.webp?v=1741734665',
    categories: [
      {
        name: 'ENGAGEMENT',
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/cover_for_categories_1000x1000.jpg?v=1741150140',
        link: '/collections/engagement',
      },
      {
        name: 'WEDDING',
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Ring_Collections_-_Statement_1000x1000.jpg?v=1741059912',
        link: '/collections/wedding',
      },
      {
        name: 'ALL RINGS',
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Emma_Front_1000x1000.png?v=1741845742',
        link: '/collections/all',
      },
      {
        name: 'BEZEL',
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Ring_Collections_-_Bezel_1000x1000.jpg?v=1741059908',
        link: '/collections/engagement?style=bezel',
      },
      {
        name: 'SOLITAIRE',
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Ring_Collections_-_Stacker_1000x1000.png?v=1741059913',
        link: '/collections/engagement?style=solitaire',
      },
      {
        name: 'HALO',
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Ring_Collections_-_East_West_1000x1000.jpg?v=1741059910',
        link: '/collections/engagement?style=halo',
      },
    ],
  };


  const gemstoneCollections = {
    defaultImage:
      'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/gemstone_cover_image_1000x1000.jpg?v=1741149642',
    categories: [
      {
        name: 'LAB GROWN DIAMONDS',
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Gemstones_-_Lab_Grown_Diamonds_b7943164-25c4-4302-8c9b-cb04230add93_700x700.jpg?v=1741060106',
        link: '/collections/lab-grown-diamonds',
      },
      {
        name: 'COLOURED LAB GROWN DIAMONDS',
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/gemstones_-_coloured_lab_diamonds_700x700.jpg?v=1741060107',
        link: '/collections/coloured-lab-grown-diamonds',
      },
      {
        name: 'LAB GROWN SAPPHIRES',
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Gemstones_-_Lab_Grown_Sapphires_700x700.jpg?v=1741060295',
        link: '/collections/lab-grown-sapphires',
      },
      {
        name: 'MOISSANITE',
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Gemstones_-_Moissanite_600x600.jpg?v=1741060106',
        link: '/collections/moissanite',
      },
      {
        name: 'COLOURED MOISSANITE',
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Gemstones_-_Coloured_Moissanite_700x700.jpg?v=1741060269',
        link: '/collections/coloured-moissanite',
      },
    ],
  };

  return (
    <div className="home">

      {/* <RecommendedProducts products={data.recommendedProducts} /> */}

      {/* Video Banner from Metaobject */}
      {(() => {
        // Extract fields from metaobject
        const fields = data.homeBanner?.fields || [];
        const getField = (key) => fields.find(f => f.key === key);

        const desktopVideoField = getField('banner_desktop_video');
        const desktopImageField = getField('banner_desktop_image');
        const mobileVideoField = getField('banner_mobile_video');
        const mobileImageField = getField('banner_mobile_image');

        // Get URLs and convert video URLs to short format
        const desktopVideoLong = desktopVideoField?.reference?.sources?.[0]?.url;
        const mobileVideoLong = mobileVideoField?.reference?.sources?.[0]?.url;

        const desktopVideo = convertToShortVideoUrl(desktopVideoLong);
        const mobileVideo = convertToShortVideoUrl(mobileVideoLong);
        const desktopImage = desktopImageField?.reference?.image?.url;
        const mobileImage = mobileImageField?.reference?.image?.url;

        const heading = getField('banner_heading')?.value || 'Heirloom in the Making';
        const description = getField('banner_description')?.value || 'A handcrafted piece whose story begins with you.';
        const buttonText = getField('banner_button')?.value || 'Explore Bezels';
        const buttonUrl = getField('banner_button_url')?.value || '/pages/visit';

        // console.log('Video URL Conversion:', {
        //   desktopVideoLong,
        //   desktopVideoShort: desktopVideo,
        //   mobileVideoLong,
        //   mobileVideoShort: mobileVideo
        // });

        return (
          <VideoBanner
            desktopVideo={desktopVideo}
            desktopImage={desktopImage}
            mobileVideo={mobileVideo}
            mobileImage={mobileImage}
            heading={heading}
            description={description}
            buttonText={buttonText}
            buttonUrl={buttonUrl}
          />
        );
      })()}

      <ShopByStyle
        variant="lab-home home"
        title={shopLabSlider.title}
        description={shopLabSlider.subtitle}
        items={shopLabSlider.items}
      />

      {
        (() => {
          const ringData = parseRingCollection(data.ringCollectionsMeta, {
            title: "Ring Collections",
            defaultImage: ringCollectionsData.defaultImage,
            categories: ringCollectionsData.categories
          });

          return (
            <RingCollections
              title={ringData.title}
              defaultImage={ringData.defaultImage}
              categories={ringData.categories}
              className='rings'
            />
          );
        })()
      }

      <ShopByStyle
        variant="home"
        title={bestSellingSlider.title}
        description={bestSellingSlider.subtitle}
        items={bestSellingSlider.items}
      />

      {(() => {
        const splitBanners = parseSplitBanners(data.splitBannerMeta);

        if (splitBanners.length === 0) {
          // Fallback if no metaobject entries found
          return (
            <SplitBanner
              left={{
                image: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Thanasi_Home_Page_Select_Final-1_1600x1600.jpg?v=1767837146",
                title: "Serving Brilliance",
                description: "Consciously crafted for the long game",
                linkText: "Explore the range",
                linkTo: "/collections/all"
              }}
              right={{
                video: "https://cdn.shopify.com/videos/c/o/v/bc9828414ce64185b90c71128e7fbf02.mp4"
              }}
              middleBanner={<CraftsmanshipBanner />}
            />
          );
        }

        return splitBanners.map((banner, index) => (
          <SplitBanner
            key={index}
            left={banner.left}
            right={banner.right}
            middleBanner={
              <CraftsmanshipBanner
                heading={banner.middle.heading}
                description={banner.middle.description}
              />
            }
          />
        ));
      })()}

      {/* <CraftsmanshipBanner /> */}
      {
        (() => {
          const storyCraftData = parseStoryCraft(data.storyCraftMeta, {
            videoSrc: "https://cdn.shopify.com/videos/c/o/v/5b695d502aea4a4295774e56c902bab2.mp4",
            title: "Your story, our craft.",
            ctaText: "EXPLORE CUSTOM RINGS",
            ctaLink: "/pages/custom-engagement-rings"
          });

          return (
            <StoryCraftBanner
              videoSrc={storyCraftData.videoSrc}
              imageSrc={storyCraftData.imageSrc}
              title={storyCraftData.title}
              subtitle={storyCraftData.subtitle}
              ctaText={storyCraftData.ctaText}
              ctaLink={storyCraftData.ctaLink}
              extraClass="story-craft-banner--home"
            />
          );
        })()
      }

      <ShopByStyleScroll
        variant="shop-by-category"
        title={shopByCategorySlider?.title}
        description={

          <RichText html={shopByCategorySlider?.subtitle} />
        }
        items={shopByCategorySlider?.items || []}
      />

      {
        (() => {
          const gemstoneData = parseRingCollection(data.gemstoneGuidanceMeta, {
            title: "Gemstone Guidance",
            defaultImage: gemstoneCollections.defaultImage,
            categories: gemstoneCollections.categories
          });

          return (
            <RingCollections
              title={buildGemstoneTitle(gemstoneData.title)}
              defaultImage={gemstoneData.defaultImage}
              categories={gemstoneData.categories}
              className='gemstones'
            />
          );

          function buildGemstoneTitle(title) {
            // If title is just "Gemstone Guidance", we might want to keep it or add some flair
            return title;
          }
        })()
      }

      <ShopByStyleScroll
        variant="section-services"
        archLayout={true}
        title={servicesSlider?.title}
        description={
          <RichText html={servicesSlider?.subtitle} />
        }
        items={servicesSlider?.items || []}
      />

      {
        (() => {
          const { title, items } = parseInitiatives(data.initiativesMeta, PRODUCT_RING_COLLECTIONS);
          return <ProductRingCollections title={title} items={items} />;
        })()
      }

      <ShopByStyleScroll
        variant="education"
        title={educationSlider.title}
        description={
          <RichText html={educationSlider.subtitle} />
        }
        items={educationSlider.items}
      />


      {/* Review Section (Bento Redesign) */}
      <ReviewMeta reviews={data.reviews} />

      <InstagramSection data={instagramSectionData} />

      {/* Dynamic FAQ from Metaobject */}
      {
        (() => {
          // Helper function to parse Shopify Rich Text JSON to HTML
          const parseRichText = (richTextJson) => {
            if (!richTextJson) return '';

            try {
              const parsed = typeof richTextJson === 'string' ? JSON.parse(richTextJson) : richTextJson;

              const renderNode = (node) => {
                if (!node) return '';

                if (node.type === 'root') {
                  return node.children?.map(renderNode).join('') || '';
                }

                if (node.type === 'paragraph') {
                  const content = node.children?.map(renderNode).join('') || '';
                  return `<p>${content}</p>`;
                }

                if (node.type === 'text') {
                  let text = node.value || '';
                  if (node.bold) text = `<strong>${text}</strong>`;
                  if (node.italic) text = `<em>${text}</em>`;
                  return text;
                }

                if (node.type === 'link') {
                  const content = node.children?.map(renderNode).join('') || '';
                  const url = node.url || '#';
                  const target = node.target || '_self';
                  return `<a href="${url}" target="${target}" class="fancy">${content}</a>`;
                }

                if (node.type === 'list') {
                  const listTag = node.listType === 'ordered' ? 'ol' : 'ul';
                  const content = node.children?.map(renderNode).join('') || '';
                  return `<${listTag}>${content}</${listTag}>`;
                }

                if (node.type === 'list-item') {
                  const content = node.children?.map(renderNode).join('') || '';
                  return `<li>${content}</li>`;
                }

                if (node.type === 'heading') {
                  const level = node.level || 2;
                  const content = node.children?.map(renderNode).join('') || '';
                  return `<h${level}>${content}</h${level}>`;
                }

                // Fallback for unknown types
                if (node.children) {
                  return node.children.map(renderNode).join('');
                }

                return node.value || '';
              };

              return renderNode(parsed);
            } catch (e) {
              // If parsing fails, return the original string
              return richTextJson;
            }
          };

          const faqMetaobject = data.faqMetaobject;
          let dynamicFaqData = [];
          let faqTitle = 'FAQ';

          let faqSubtitle = 'Your questions, answered.';

          if (faqMetaobject?.fields) {
            // Get heading and subtitle
            const headingField = faqMetaobject.fields.find(f => f.key === 'heading');
            const subtitleField = faqMetaobject.fields.find(f => f.key === 'subtitle');
            const faqContentField = faqMetaobject.fields.find(f => f.key === 'faq_content');

            if (headingField?.value) faqTitle = headingField.value;
            if (subtitleField?.value) faqSubtitle = subtitleField.value;

            if (faqContentField?.references?.nodes) {
              dynamicFaqData = faqContentField.references.nodes.map(node => {
                const fields = node.fields || [];
                const getFieldValue = (key) => fields.find(f => f.key === key)?.value || '';

                return {
                  question: getFieldValue('question'),
                  answer: parseRichText(getFieldValue('answer')),
                };
              }).filter(item => item.question);
            }
          }

          // Use dynamic data if available, otherwise fallback to static
          const faqDataToRender = dynamicFaqData.length > 0 ? dynamicFaqData : PRODUCT_FAQ;

          return <ProductFAQ data={faqDataToRender} title={faqTitle} subtitle={faqSubtitle} />;
        })()
      }
      <UvpIconFooter data={PRODUCT_UVPS} />
    </div >
  );
}

const REVIEWS_QUERY = `#graphql
  query Reviews($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    metaobjects(type: "review", first: 50) {
      nodes {
        id
        handle
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
// function FeaturedCollection({ collection }) {
//   if (!collection) return null;
//   const image = collection?.image;
//   return (
//     <Link
//       className="featured-collection"
//       to={`/collections/${collection.handle}`}
//     >
//       {image && (
//         <div className="featured-collection-image">
//           <Image data={image} sizes="100vw" />
//         </div>
//       )}
//       <h1>{collection.title}</h1>
//     </Link>
//   );
// }

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({ products }) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

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

const instagramData = {
  title: "Instagram",
  description:
    "Learn, engage and grow. Connect with Cullen for all things engagement, wedding and fine jewelry.",
  posts: [
    {
      id: 1,
      img: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/image1.png?v=1769419693",
      link: "https://www.instagram.com/reel/DT1j4yXDL3x/",
      alt: "Image 1",
    },
    {
      id: 2,
      img: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/image2.png?v=1769419693",
      link: "https://www.instagram.com/reel/DT1j4yXDL3x/",
      alt: "Image 2",
    },
    {
      id: 3,
      img: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/image3.png?v=1769419693",
      link: "https://www.instagram.com/reel/DT1j4yXDL3x/",
      alt: "Image 3",
    },
    {
      id: 4,
      img: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/image4.png?v=1769419693",
      link: "https://www.instagram.com/reel/DT1j4yXDL3x/",
      alt: "Image 4",
    },
  ],
};

const CategoryshopByStyleItems = [
  {
    name: 'Engagement',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Shop_By_Category_-_Engagement_-_version_2_1300x1300.jpg?v=1741217971',
    link: '/collections/ready-to-ship',
  },
  {
    name: 'Wedding',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Shop_By_Category_-_Wedding_700x700.jpg?v=1741048871',
    link: '/collections/ready-to-ship',
  },
  {
    name: 'Fine jewelry',
    image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Shop_By_Category_-_Fine_Jewellery_500x500.jpg?v=1741048817',
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
        is not included within this date. You can find all our shipping
        information on our{' '}
        <Link className="fancy" to="/shipping">shipping page</Link>. For all
        timeframe information please visit our{' '}
        <Link className="fancy" to="/crafting-timeframes">
          crafting timeframes page
        </Link>.
      </p>
    ),
  },

  {
    question: 'Do you ship worldwide?',
    answer: (
      <p>
        Yes! At Cullen, we provide free express and insured international
        shipping on all orders over $500. Plus, we cover duties and taxes for
        most countries. For full details,{' '}
        <Link className="fancy" to="/shipping">visit our shipping page</Link>.
      </p>
    ),
  },

  {
    question: 'Are lab grown diamonds a simulant or real?',
    answer: (
      <>
        <p>
          Yes – Lab grown diamonds, also known as laboratory grown diamonds or
          ethical lab grown diamonds, are chemically identical to mined diamonds
          or natural diamonds. They offer the same level of beauty and are an
          extremely popular choice.
        </p>
        <p>
          A lab grown diamond, unlike a simulant, has the same chemical and
          physical properties as a mined diamond. They are aesthetically and
          physically identical to mined diamonds, offering the same fire and
          brilliance.
        </p>
      </>
    ),
  },

  {
    question: 'What lab diamond stone shapes do you offer?',
    answer: (
      <p>
        Our range of lab grown diamonds are available in{' '}
        <Link className="fancy" to="/engagement-rings/round-cut">round</Link>,{' '}
        <Link className="fancy" to="/engagement-rings/oval-cut">oval</Link>,{' '}
        <Link className="fancy" to="/engagement-rings/pear-cut">pear</Link>,{' '}
        <Link className="fancy" to="/engagement-rings/emerald-cut">emerald</Link>,{' '}
        <Link className="fancy" to="/engagement-rings/radiant-cut">radiant</Link>,{' '}
        <Link className="fancy" to="/engagement-rings/cushion-cut">cushion</Link>,{' '}
        <Link className="fancy" to="/engagement-rings/marquise-cut">marquise</Link>,{' '}
        <Link
          className="fancy"
          to="/engagement-rings/elongated-hexagon-cut"
        >
          elongated hexagon
        </Link>,{' '}
        <Link className="fancy" to="/engagement-rings/princess-cut">princess</Link>,{' '}
        <Link className="fancy" to="/engagement-rings/asscher-cut">asscher</Link>,{' '}
        <Link className="fancy" to="/engagement-rings/heart-cut">heart</Link> and{' '}
        <Link
          className="fancy"
          to="/engagement-rings/elongated-cushion-cut"
        >
          elongated cushion
        </Link>.
        We offer fancy coloured lab grown diamonds in all shapes and sizes.
      </p>
    ),
  },

  {
    question: 'What is the difference between a mined diamond and an ethical lab grown diamond?',
    answer: (
      <>
        <p>
          The only difference between a mined diamond and a lab grown diamond is
          the origin. Lab grown diamonds are free from the ethical concerns
          associated with mined diamonds.
        </p>
        <p>
          Lab diamonds are created under high pressure in a laboratory using
          advanced technology and offer the same fire, clarity, and carat
          weight as mined diamonds.
        </p>
      </>
    ),
  },

  {
    question: 'How does Cullen Jewellery ensure a seamless purchase experience?',
    answer: (
      <>
        <p>
          We offer a personalised in-person showroom experience to explore
          gemstone shapes, carat weight, compare engagement ring designs and
          purchase our ready-to-wear range.
        </p>
        <p>
          Our collection is also available to shop online, with the option to
          customise a ring unique to you. We provide comprehensive support,
          with a specialist guiding you through each step of your engagement
          ring journey.
        </p>
      </>
    ),
  },

  {
    question: 'What type of warranty do I receive?',
    answer: (
      <>
        <p>
          Cullen Jewellery offers a Lifetime Manufacturing Warranty on all our
          rings, including engagement, wedding and fashion rings.
        </p>
        <p>
          For all other fine jewelry pieces such as earrings, chains, pendants,
          bracelets and more, we provide a 2-Year Manufacturer Warranty.{' '}
          <Link className="fancy" to="/warranty">
            View our full warranty details here
          </Link>.
        </p>
      </>
    ),
  },

  {
    question: 'Is Moissanite a Good Choice for an Engagement Ring?',
    answer: (
      <>
        <p>
          Yes – Moissanite is a brilliant alternative to a lab diamond
          engagement ring. It offers exceptional clarity, durability, and
          sparkle.
        </p>
        <p>
          Unlike a "fake diamond," moissanite is a high-quality lab grown
          gemstone that provides the same level of brilliance as a diamond at
          a more accessible price.
        </p>
        <p>
          Moissanite engagement rings are becoming increasingly popular due to
          their beauty, durability, ease of customisation, and affordability.
          They retain their sparkle indefinitely.
        </p>
        <p>
          Explore{' '}
          <Link className="fancy" to="/engagement-rings/moissanite">
            our collection
          </Link>{' '}
          today or{' '}
          <Link className="fancy" to="/visit">
            schedule an appointment
          </Link>{' '}
          with our expert team.
        </p>
      </>
    ),
  },

  {
    question: 'Where are your showrooms located?',
    answer: (
      <>
        <p>
          We have conveniently placed showrooms in Melbourne, Sydney,
          Brisbane, Adelaide, Perth and Auckland, New Zealand.
        </p>
        <p>
          To visit one of our showrooms please{' '}
          <Link className="fancy" to="/visit">
            book an appointment
          </Link>.
        </p>
      </>
    ),
  },

  {
    question: 'What is a carbon neutral lab grown diamond?',
    answer: (
      <>
        <p>
          A carbon-neutral lab grown diamond is a diamond that has been created
          with net-zero carbon emissions, meaning any carbon produced during
          its growth and manufacturing process is offset through verified
          sustainability initiatives.
        </p>
        <p>
          Learn more{' '}
          <Link className="fancy" to="/carbon-neutral">
            here
          </Link>.
        </p>
      </>
    ),
  },
];

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

const HOME_BANNER_QUERY = `#graphql
  query HomeBanner($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    metaobjects(type: "home_banner", first: 1) {
      nodes {
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
                altText
                width
                height
              }
            }
            ... on Video {
              sources {
                url
                mimeType
                format
                height
                width
              }
            }
          }
        }
      }
    }
  }
`;

const SHOP_BY_STYLE_METAOBJECT_QUERY = `#graphql
query ShopByStyleHeading($country: CountryCode, $language: LanguageCode)
@inContext(country:$country, language:$language){

  metaobjects(type:"collection_or_product_heading", first:10){
    nodes{
      fields{
        key
        value
        references(first:20){
          nodes{
            ... on Metaobject{
              fields{
                key
                value
                reference{
                  ... on MediaImage{
                    image{
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

}
`;

const INSTAGRAM_METAOBJECT_QUERY = `#graphql
query InstagramMetaobject($country: CountryCode, $language: LanguageCode)
@inContext(country:$country, language:$language){
  metaobjects(type:"instagram", first:1){
    nodes{
      fields{
        key
        value
        references(first:10){
          nodes{
            ... on Metaobject{
              fields{
                key
                value
                reference{
                  ... on MediaImage{
                    image{
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

const FAQ_QUERY = `#graphql
  query FaqMetaobject($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    metaobjects(type: "faq", first: 1) {
      nodes {
        fields {
          key
          value
          references(first: 50) {
            nodes {
              ... on Metaobject {
                fields {
                  key
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

const RING_COLLECTIONS_QUERY = `#graphql
  query RingCollections($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    ringCollections: metaobject(handle: {type: "ring_collections_splited", handle: "ring-collections"}) {
      handle
      fields {
        key
        value
        references(first: 20) {
          nodes {
            ... on Metaobject {
              handle
              fields {
                key
                value
                reference {
                  ... on MediaImage {
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    gemstoneGuidance: metaobject(handle: {type: "gemstone_guidance", handle: "gemstone-guidance"}) {
      handle
      fields {
        key
        value
        references(first: 20) {
          nodes {
            ... on Metaobject {
              handle
              fields {
                key
                value
                reference {
                  ... on MediaImage {
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    initiatives: metaobjects(type: "initiatives_splited", first: 1) {
      nodes {
        handle
        fields {
          key
          value
          references(first: 20) {
            nodes {
              ... on Metaobject {
                handle  
                fields {
                  key
                  value
                  reference {
                    ... on MediaImage {
                      image {
                        url
                        altText
                        width
                        height
                      }
                    }
                  } 
                }
              }
            }
          }
        }
      }
    }
    splitBanner: metaobject(handle: {type: "split_banner_splited", handle: "split-banner-splited"}) {
      handle
      fields {
        key
        value
        references(first: 20) {
          nodes {
            ... on Metaobject {
              handle
              fields {
                key
                value
                reference {
                  ... on MediaImage {
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                  ... on Video {
                    sources {
                      url
                      mimeType
                      format
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    storyCraft: metaobjects(type: "story_craft_parent", first: 1) {
      nodes {
        handle
        fields {
          key
          value
          reference {
            ... on Metaobject {
              fields {
                key
                value
                reference {
                  ... on MediaImage {
                    image {
                      url
                    }
                  }
                  ... on Video {
                    sources {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */

