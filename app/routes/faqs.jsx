import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductFAQ } from '~/components/ProductFAQ';
import { Link } from 'react-router';


/**
 * @param {Route.LoaderArgs} args
 */
export async function loader() {
  return {};
}

export default function Faqs() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = window.innerWidth < 768 ? 100 : 160;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <div className="faq-page-v3">
      <StoryCraftBanner
        imageSrc="https://cdn.shopify.com/s/files/1/0610/2194/5934/files/new.jpg?v=1778041776"
        title="Frequently Asked Questions"
        subtitle="Your journey to the perfect piece, guided by expert care."
        h1={true}
      />

      <section className="faq-sticky-nav-bar">
        <div className="faq-navigation-pills page-width">
          <button onClick={() => scrollToSection('faq-one')} className="pill-btn">Client Care</button>
          <button onClick={() => scrollToSection('faq-two')} className="pill-btn">Lab Diamonds</button>
          <button onClick={() => scrollToSection('faq-three')} className="pill-btn">Moissanite</button>
          <button onClick={() => scrollToSection('faq-four')} className="pill-btn">Sapphires</button>
        </div>
      </section>

      <ProductFAQ
        id="faq-one"
        data={PAGE_FAQ_ONE}
        title="Client Care"
        subtitle="Support for your purchase and delivery."
      />

      <ProductFAQ
        id="faq-two"
        data={PAGE_FAQ_TWO}
        title="Lab Diamonds"
        subtitle="Everything you need to know about eco-friendly brilliance."
      />

      <ProductFAQ
        id="faq-three"
        data={PAGE_FAQ_THREE}
        title="Moissanite"
        subtitle="Dazzling alternatives with unmatched fire."
      />

      <ProductFAQ
        id="faq-four"
        data={PAGE_FAQ_FOUR}
        title="Sapphires"
        subtitle="Timeless elegance in every vibrant hue."
      />

      <UvpIconFooter data={OUR_STORY_UVPS} />
    </div>
  );
}


const PAGE_FAQ_ONE = [
  {
    question: 'What Are Your Jewellery Production Timeframes?',
    answer: `
      <p>
        Every piece is carefully handcrafted with attention to detail and quality craftsmanship.
        Production timelines may vary depending on the design and customization requirements.
      </p>
      <p>
        For more information, please visit our
        <a href="/shipping" class="fancy">Shipping Information</a> and
        <a href="/crafting-timeframes" class="fancy">Crafting Timeframes</a>.
      </p>
    `,
  },
  {
    question: 'Can I Receive Help Choosing a Ring?',
    answer: `
      <p>
        Absolutely. Our jewellery specialists are here to guide you through selecting the perfect design, gemstone, and setting.
      </p>
      <p>
        <a href="/contact" class="fancy">Contact our team</a> for personalised assistance.
      </p>
    `,
  },
  {
    question: 'Do Your Rings Include a Warranty?',
    answer: `
      <p>
        Yes, our jewellery is backed by a manufacturing warranty for added confidence and peace of mind.
      </p>
      <p>
        Learn more by visiting our
        <a href="/warranty" class="fancy">Warranty Information</a> page.
      </p>
    `,
  },
  {
    question: 'Do You Ship Internationally?',
    answer: `
      <p>
        Yes, we offer secure international shipping for engagement rings, wedding bands, and fine jewellery.
      </p>
      <p>
        Visit our <a href="/shipping" class="fancy">Shipping page</a> for complete details.
      </p>
    `,
  },
  {
    question: 'Can I Visit a Showroom?',
    answer: `
      <p>
        Yes, showroom visits are available by appointment for a personalised jewellery consultation experience.
      </p>
      <p>
        <a href="/visit" class="fancy">Book your appointment</a> to explore our collections in person.
      </p>
    `,
  },
  {
    question: 'How Can I Find My Ring Size?',
    answer: `
      <p>
        We provide guidance and tools to help you confidently determine your ideal ring size from home.
      </p>
      <p>
        <a href="/ring-size-guidance" class="fancy">View our ring size guide</a>.
      </p>
    `,
  },
  {
    question: 'Is Discreet Packaging Available?',
    answer: `
      <p>
        Yes, all orders are packaged securely and discreetly to ensure your surprise remains private.
      </p>
      <p>
        Feel free to contact us for any special delivery requests.
      </p>
    `,
  },
  {
    question: 'What Payment Options Do You Accept?',
    answer: `
      <p>
        We accept a range of secure payment methods including card payments and flexible payment options.
      </p>
      <p>
        Additional payment assistance may also be available depending on your location.
      </p>
    `,
  },
  {
    question: 'What Is Your Returns Policy?',
    answer: `
      <p>
        Return eligibility may vary depending on the product type and customization details.
      </p>
      <p>
        Please review our <a href="/returns" class="fancy">Returns Policy</a> for full information.
      </p>
    `,
  },
  {
    question: 'Can Rings Be Resized After Purchase?',
    answer: `
      <p>
        Many ring designs can be resized depending on the style and metal type.
      </p>
      <p>
        Learn more on our <a href="/free-resizing" class="fancy">Ring Resizing</a> page.
      </p>
    `,
  },
];

const PAGE_FAQ_TWO = [
  {
    question: 'What Makes Lab Grown Diamonds Popular?',
    answer: (
      <p>
        Lab grown diamonds offer the same brilliance, durability, and beauty as mined diamonds while providing a modern and responsible alternative for fine jewellery.
      </p>
    ),
  },

  {
    question: 'How Are Lab Grown Diamonds Different?',
    answer: (
      <p>
        Lab grown diamonds share the same physical and chemical properties as natural diamonds. The primary difference is that they are created in controlled laboratory environments.
      </p>
    ),
  },

  {
    question: 'Do Lab Grown Diamonds Look Real?',
    answer: (
      <p>
        Yes. Lab grown diamonds are visually and structurally identical to mined diamonds, offering exceptional sparkle and clarity.
      </p>
    ),
  },

  {
    question: 'Are Lab Grown Diamonds a Responsible Choice?',
    answer: (
      <p>
        Many clients choose lab grown diamonds for their modern approach to luxury, combining beauty with more conscious sourcing practices.
      </p>
    ),
  },

  {
    question: 'Why Choose Diamond Jewellery for Lab Diamonds?',
    answer: (
      <p>
        We specialise in beautifully crafted lab grown diamond jewellery, offering timeless designs, expert guidance, and exceptional craftsmanship.
      </p>
    ),
  },

  {
    question: 'Are Lab Grown Diamonds Good Value?',
    answer: (
      <p>
        Lab grown diamonds provide outstanding beauty and quality while often allowing greater flexibility in size and design compared to mined alternatives.
      </p>
    ),
  },

  {
    question: 'Are Lab Grown Diamonds Certified?',
    answer: (
      <p>
        Yes. Our lab grown diamonds are carefully graded and certified by recognised gemological laboratories to ensure quality and authenticity.
      </p>
    ),
  },

  {
    question: 'Do Lab Grown Diamonds Last Forever?',
    answer: (
      <p>
        Absolutely. Lab grown diamonds are highly durable and designed to maintain their brilliance for generations with proper care.
      </p>
    ),
  },

  {
    question: 'Can Lab Grown Diamonds Pass Diamond Testers?',
    answer: (
      <p>
        Yes. Because lab grown diamonds have the same composition as mined diamonds, they will test as genuine diamonds.
      </p>
    ),
  },

  {
    question: 'Why Are Lab Grown Diamonds Becoming So Popular?',
    answer: (
      <p>
        Their combination of beauty, innovation, value, and responsible sourcing has made lab grown diamonds an increasingly popular choice for modern engagement rings.
      </p>
    ),
  },
];

const PAGE_FAQ_THREE = [
  {
    question: 'Why Choose Moissanite Jewellery?',
    answer: (
      <p>
        Moissanite is admired for its exceptional brilliance, durability, and modern appeal, making it a beautiful alternative gemstone for engagement rings.
      </p>
    ),
  },

  {
    question: 'Does Moissanite Look Similar to a Diamond?',
    answer: (
      <p>
        Yes. Moissanite offers remarkable sparkle and a diamond-like appearance while maintaining its own unique beauty and fire.
      </p>
    ),
  },

  {
    question: 'Is Moissanite a Real Gemstone?',
    answer: (
      <p>
        Absolutely. Moissanite is a genuine gemstone known for its durability, brilliance, and suitability for everyday jewellery.
      </p>
    ),
  },

  {
    question: 'Will Moissanite Lose Its Sparkle?',
    answer: (
      <p>
        No. Moissanite is designed to maintain its brilliance and sparkle over time with proper care and cleaning.
      </p>
    ),
  },

  {
    question: 'Is Moissanite Durable for Daily Wear?',
    answer: (
      <p>
        Yes. Moissanite is highly durable and suitable for engagement rings and jewellery worn every day.
      </p>
    ),
  },

  {
    question: 'Can I Customize a Moissanite Ring?',
    answer: (
      <p>
        Yes. Our moissanite rings can be customised with different settings, stone shapes, and precious metal options to suit your personal style.
      </p>
    ),
  },

  {
    question: 'How Do I Care for My Moissanite Ring?',
    answer: (
      <p>
        Regular cleaning with warm water and gentle soap will help maintain the brilliance and beauty of your moissanite jewellery.
      </p>
    ),
  },

  {
    question: 'Is Moissanite an Ethical Choice?',
    answer: (
      <p>
        Many clients choose moissanite for its responsible sourcing, affordability, and beautiful appearance.
      </p>
    ),
  },

  {
    question: 'Can Moissanite Be Worn Every Day?',
    answer: (
      <p>
        Absolutely. Its strength and resistance to scratching make moissanite ideal for everyday wear.
      </p>
    ),
  },

  {
    question: 'Why Choose Diamond Jewellery for Moissanite Rings?',
    answer: (
      <p>
        We combine premium moissanite gemstones with expert craftsmanship and timeless ring designs to create jewellery made to last.
      </p>
    ),
  },
];

const PAGE_FAQ_FOUR = [
  {
    question: 'What Are Lab Grown Sapphires?',
    answer: (
      <p>
        Lab grown sapphires are real sapphires created in controlled environments, offering the same beauty and durability as mined sapphires.
      </p>
    ),
  },

  {
    question: 'How Are Lab Grown Sapphires Created?',
    answer: (
      <p>
        They are produced using advanced techniques that replicate the natural sapphire-growing process while ensuring exceptional clarity and colour consistency.
      </p>
    ),
  },

  {
    question: 'What Colours Are Available?',
    answer: (
      <p>
        Our collection includes a range of beautiful sapphire colours including blue, pink, purple, and vibrant red tones.
      </p>
    ),
  },

  {
    question: 'Why Choose Lab Grown Sapphires?',
    answer: (
      <p>
        Lab grown sapphires combine timeless beauty, durability, and responsible sourcing, making them a popular modern jewellery choice.
      </p>
    ),
  },

  {
    question: 'How Durable Are Lab Grown Sapphires?',
    answer: (
      <p>
        With excellent hardness and durability, lab grown sapphires are well suited for everyday jewellery and engagement rings.
      </p>
    ),
  },

  {
    question: 'How Should Sapphire Jewellery Be Cleaned?',
    answer: (
      <p>
        Gentle cleaning with warm water, mild soap, and a soft cloth will help preserve the brilliance and appearance of sapphire jewellery.
      </p>
    ),
  },

  {
    question: 'Can Lab Grown Sapphires Be Customized Into Rings?',
    answer: (
      <p>
        Yes. Lab grown sapphires can be incorporated into a variety of custom engagement ring and fine jewellery designs.
      </p>
    ),
  },

  {
    question: 'What Makes Sapphire Jewellery Unique?',
    answer: (
      <p>
        Sapphire jewellery is admired for its vibrant colour, timeless elegance, and ability to create distinctive engagement ring designs.
      </p>
    ),
  },

  {
    question: 'Are Lab Grown Sapphires Real Sapphires?',
    answer: (
      <p>
        Yes. They share the same chemical composition and physical properties as mined sapphires while being created in a laboratory setting.
      </p>
    ),
  },

  {
    question: 'Why Choose Diamond Jewellery for Sapphire Rings?',
    answer: (
      <p>
        Our sapphire jewellery combines premium gemstones, elegant craftsmanship, and personalised design expertise to create meaningful pieces made to last.
      </p>
    ),
  },
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