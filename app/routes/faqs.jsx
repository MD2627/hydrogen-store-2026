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
    <>
      <div className="faq-page page-width">
        <section className="txt-center shop-by-style-header">
          <h2>
            Faqs
          </h2>
          <p className="main-sub-heading">
            If you have any questions at all that we do not cover below please
            get in touch via our{' '}
            <Link className="fancy" to="/contact">
              Contact
            </Link>{' '}
            page.
          </p>

          <div className="banner-faq-content">
            <button
              className="banner-btn"
              onClick={() => scrollToSection('faq-two')}
            >
              Lab Grown Diamond FAQs
            </button>

            <button
              className="banner-btn"
              onClick={() => scrollToSection('faq-three')}
            >
              Moissanite FAQs
            </button>

          </div>
        </section>
        <div id="faq-one" className="faq-section">
          <header className="shop-by-style-header">
            <h2>Client Care FAQs</h2>
          </header>
          <ProductFAQ data={PAGE_FAQ_ONE} />
        </div>

        <div id="faq-two" className="faq-section">
          <header className="shop-by-style-header">
            <h2>Lab Grown Diamond FAQs</h2>
          </header>
          <ProductFAQ data={PAGE_FAQ_TWO} />
        </div>

        <div id="faq-three" className="faq-section">
          <header className="shop-by-style-header">
            <h2>Moissanite FAQs</h2>
          </header>
          <ProductFAQ data={PAGE_FAQ_THREE} />
        </div>

        <div id="faq-four" className="faq-section">
          <header className="shop-by-style-header">
            <h2>Sapphire FAQs</h2>
          </header>
          <ProductFAQ data={PAGE_FAQ_FOUR} />
        </div>

      </div>
      <UvpIconFooter data={OUR_STORY_UVPS} />
    </>
  );
}


const PAGE_FAQ_ONE = [
  {
    question: 'How long will it take to get my order?',
    answer: (
      <p>
        Crafting of your ring typically takes 50 business days, with expediting
        options available if you need it sooner. The exact completion date can be
        conveniently found on each product page. Please note that shipping is not
        included within this date and you can find all our{' '}
        <Link className="fancy" to="/shipping">
          shipping information here
        </Link>
        . For all timeframe information please visit our{' '}
        <Link className="fancy" to="/crafting-timeframes">
          crafting timeframes page
        </Link>
        .
      </p>
    ),
  },

  {
    question: 'What if I need help placing an order through your website?',
    answer: (
      <p>
        If you need help selecting from our range of diamond engagement rings or
        lab grown engagement rings, please{' '}
        <Link className="fancy" to="/contact">
          contact us here
        </Link>
        . Our team, experienced in both lab created diamonds and moissanite, will
        assist you.
      </p>
    ),
  },

  {
    question: 'What type of warranty do I receive?',
    answer: (
      <p>
        Cullen Jewellery offers a Lifetime Manufacturing Warranty on all our
        rings, including engagement, wedding and fashion rings, giving you
        confidence and peace of mind with every purchase. For all other fine
        jewellery pieces, such as earrings, chains, pendants, bracelets and more,
        we provide a 2-Year Manufacturer Warranty. View our full warranty details{' '}
        <Link className="fancy" to="/warranty" title="Cullen Jewellery Lifetime Warranty">
          here
        </Link>
        .
      </p>
    ),
  },

  {
    question: 'Do you ship worldwide?',
    answer: (
      <>
        <p>
          Yes! At Cullen Jewellery, we offer free international shipping on all
          orders, including those for the perfect diamond engagement ring. Shop
          online and add your chosen piece to your shopping bag with ease.
        </p>

        <p>
          <b>Import Duties and Taxes</b>
        </p>

        <p>
          Most of our orders are sent as DDP (Delivery Duty Paid – this means
          import duties &amp; taxes are covered). However, there may be cases
          where you may have to pay local import taxes and duties, which Cullen
          Jewellery does not cover, as some countries do not allow us to pay them
          as the sender. For more details, please check our{' '}
          <Link className="fancy" to="/shipping">
            Shipping
          </Link>{' '}
          page or contact your local customs agency.
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
        <Link className="fancy" to="/visit">
          by appointment only
        </Link>
        . Discover our collection of lab grown diamond engagement rings and
        moissanite in person or online.
      </p>
    ),
  },

  {
    question: 'How do I find out my ring size?',
    answer: (
      <p>
        At Cullen Jewellery, we offer free ring sizers for our entire range.{' '}
        <Link className="fancy" to="/ring-size-guidance" title="Free Ring Sizer">
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
          surprise gifts for events such as an engagement. For this reason, we
          use subtle packaging that will not give away the contents of the
          package.
        </p>

        <p>
          Please let us know if we can help you in any other way to keep your
          purchase a surprise!
        </p>
      </>
    ),
  },

  {
    question: 'What payment methods do you accept?',
    answer: (
      <p>
        At Cullen Jewellery, we accept payments via direct debit or card.
        Additionally, depending on your location, you can pay via PayPal and
        local “buy now, pay later” (BNPL) services such as Humm, Zip, Afterpay, or
        Klarna. All online and showroom orders require payment to begin
        production.
      </p>
    ),
  },

  {
    question: 'Can I return a product?',
    answer: (
      <p>
        At Cullen Jewellery, we value the craftsmanship and dedication involved
        in making each unique piece of special occasion jewellery. Therefore, we
        do not offer refunds, returns or exchanges unless the item is faulty or
        damaged. Please see our{' '}
        <Link className="fancy" to="/returns">
          Returns Policy
        </Link>{' '}
        for more information.
      </p>
    ),
  },

  {
    question: 'The fit of my ring is not quite right, can I resize it?',
    answer: (
      <>
        <p>
          Absolutely! At Cullen Jewellery, we offer{' '}
          <b>One Free Resize</b> for engagement and wedding rings to use within
          the first 12 months of your ring&apos;s completion (subject to eligible
          design style/metal type).
        </p>

        <p className="smallprint" style={{ textAlign: 'left' }}>
          *There are certain resizing restrictions for each ring design. The
          specific information can be found on the product page of each ring.{' '}
          <Link className="fancy" to="/free-resizing" title="Free Resizing">
            Read more about resizing
          </Link>
          .
        </p>
      </>
    ),
  },
];

const PAGE_FAQ_TWO = [
  {
    question: 'Are lab grown diamonds real?',
    answer: (
      <p>
        Yes! Lab grown diamonds, also known as laboratory grown diamonds or
        ethical lab grown diamonds, are chemically identical to mined diamonds
        or natural diamonds. They offer the same level of beauty and are an
        extremely popular choice.
      </p>
    ),
  },

  {
    question:
      'What is the difference between a simulant and a lab grown diamond?',
    answer: (
      <p>
        A lab grown diamond, unlike a simulant, has the same chemical and
        physical properties as a mined diamond. They are aesthetically
        identical to naturally mined diamonds, offering the same fire and
        brilliance.
      </p>
    ),
  },

  {
    question:
      'What is the difference between a mined diamond and a lab grown diamond?',
    answer: (
      <p>
        The only difference between a mined diamond and a lab grown diamond is
        their origin. Lab grown diamonds are an ethical and sustainable option,
        offering the same fire, clarity, and carat weights as mined diamonds.
      </p>
    ),
  },

  {
    question: 'Are lab grown diamonds ethical?',
    answer: (
      <p>
        Lab grown diamonds are a sustainable option, created using advanced
        technology under high pressure, which is much more ethical than
        traditional diamond mining methods.
      </p>
    ),
  },

  {
    question:
      'How does Cullen Jewellery ensure a seamless purchase experience?',
    answer: (
      <p>
        We specialise in lab grown diamond engagement rings. Our collection,
        available to shop online, ranges in carat weight and design, ensuring
        you find the perfect diamond for your needs.
      </p>
    ),
  },

  {
    question:
      'Are lab grown diamonds less expensive than mined diamonds?',
    answer: (
      <p>
        Lab grown diamonds are an excellent alternative to mined diamonds as
        they provide much more value. Without sacrificing quality for price,
        lab grown diamonds will be more affordable than mined diamonds of the
        same quality and size.
      </p>
    ),
  },

  {
    question: 'Are lab created diamonds flawless?',
    answer: (
      <p>
        Just like their mined counterparts, every lab created diamond is
        unique. Grown under the same intense heat and pressure as a mined
        diamond, a lab grown diamond undergoes the same growth process and may
        still contain minor internal or surface imperfections like a mined
        diamond will. This means every lab grown diamond will vary in colour,
        clarity and cut. Expert gemological labs such as the IGI and GIA
        evaluate and certify every single lab created diamond using the same
        strict standards applied to mined diamonds.
      </p>
    ),
  },

  {
    question: 'Do lab grown diamonds get cloudy?',
    answer: (
      <p>
        Absolutely not! Since lab grown diamonds have the exact same physical
        and chemical properties as mined diamonds, they are just as durable
        and scratch-resistant, meaning they will never become cloudy.
      </p>
    ),
  },

  {
    question: 'What is the history of lab grown diamonds?',
    answer: (
      <p>
        Scientists have attempted to grow diamonds in a laboratory since the
        late 1800s. The first company to successfully produce large quantities
        of lab grown diamonds was General Electric in the 1950s. However, these
        were largely created for industrial use and were not suitable to be
        worn in fine jewellery. Gem quality lab grown diamonds have only been
        available from the late 1980s.
      </p>
    ),
  },

  {
    question: 'Will a lab grown diamond pass a diamond tester?',
    answer: (
      <p>
        Yes, lab grown diamonds will pass a diamond tester. Since lab grown
        diamonds are made of pure carbon and have the same thermal
        conductivity and chemical properties as real diamonds, they will
        record a positive test on a diamond tester.
      </p>
    ),
  },

  {
    question: 'Are your lab grown diamonds laser inscribed?',
    answer: (
      <p>
        To ensure consistency of certification, every lab created diamond is
        inspected and certified by a gemological expert at the IGI. Using a
        very fine and precise laser beam, every lab grown diamond is inscribed
        with the report number and the words “lab grown”, assuring you of your
        diamond’s origin and authentic certification. This inscription is
        invisible to the naked eye and can only be seen under a jeweller’s
        loupe. In no way will this impact your diamond’s quality or light
        performance.
      </p>
    ),
  },

  {
    question: 'Are your lab grown diamonds certified?',
    answer: (
      <p>
        Absolutely! All of our lab grown diamonds are evaluated on cut,
        clarity, colour and carat weight and are IGI or GIA certified. Most of
        our lab grown diamonds are certified by IGI, the most popular
        lab-created diamond certifier. This consistency allows customers to
        easily compare lab grown diamonds and be assured they are getting what
        they’re paying for.
      </p>
    ),
  },

  {
    question: 'Are lab grown diamonds truly conflict-free?',
    answer: (
      <p>
        Lab grown diamonds are produced in controlled laboratory environments
        and do not need to be mined from the earth. Unlike mined diamonds, only
        lab created diamonds can be 100% conflict-free, as the origins of
        mined diamonds are often difficult to verify.
      </p>
    ),
  },

  {
    question: 'Are lab grown diamonds truly eco-friendly?',
    answer: (
      <p>
        Lab grown diamonds are the eco-friendly alternative to mined diamonds.
        Over 250 tons of ore must be moved to mine just 1 carat of a mined
        diamond. By removing the need for mining, lab grown diamonds reduce
        environmental damage and protect habitats and communities.
      </p>
    ),
  },

  {
    question: 'Do you also sell mined diamonds?',
    answer: (
      <p>
        No, we do not sell mined diamonds. At Cullen Jewellery, we are
        committed to offering 100% conflict-free diamonds. Lab created
        diamonds are fully traceable, allowing us to deliver ethical and
        environmentally-friendly jewellery every time.
      </p>
    ),
  },

  {
    question:
      'Why should I purchase a lab grown diamond ring from Cullen Jewellery?',
    answer: (
      <>
        <p>
          We believe every couple deserves a ring as unique as their love. Our
          skilled craftsmen create beautiful lab grown diamond rings that are
          designed to be cherished for a lifetime. Lab grown diamonds are
          physically identical to mined diamonds, offering the same fire,
          scintillation and sparkle.
        </p>

        <p>
          Our certified lab grown diamonds are conflict-free, eco-friendly,
          and available in a wide range of shapes and settings. When you
          purchase a Cullen Jewellery diamond engagement ring or wedding band,
          you can be confident you are receiving a truly special piece,
          complete with gem certification identifying it as legitimate.
        </p>
      </>
    ),
  },
];


const PAGE_FAQ_THREE = [
  {
    question: 'Is moissanite worth buying?',
    answer: (
      <p>
        <Link
          className="fancy"
          to="/education/moissanite-guidance/buying-a-moissanite-ring/is-moissanite-worth-buying"
          target="_blank"
          rel="noopener noreferrer"
        >
          Moissanite is a brilliant choice
        </Link>{' '}
        for those seeking an alternative to a lab diamond engagement ring. It
        offers exceptional clarity and is hand-selected and inspected by our
        expert quality control team to ensure the best quality, just like our
        lab grown diamond collections.
      </p>
    ),
  },

  {
    question: 'Can moissanite pass diamond tester?',
    answer: (
      <p>
        Yes. Due to its similar properties to diamonds (both lab grown and mined
        or natural diamond rings), moissanite can pass a diamond tester.
        However, our specialised equipment can distinguish between moissanite
        and diamonds, ensuring you know exactly what you&apos;re purchasing.
      </p>
    ),
  },

  {
    question: 'Is moissanite the best fake diamond?',
    answer: (
      <p>
        <Link
          className="fancy"
          to="/education/moissanite-guidance/what-is-a-moissanite-diamond-is-it-real/can-you-tell-the-difference-between-moissanite-and-diamond/is-moissanite-the-best-fake-diamond"
          target="_blank"
          rel="noopener noreferrer"
        >
          Moissanite is not a fake diamond
        </Link>{' '}
        but a gemstone that offers stunning lab grown beauty. It&apos;s perfect
        for those looking for the same level of sparkle and clarity found in
        diamonds, but at a more accessible price point.
      </p>
    ),
  },

  {
    question: 'Are moissanite rings tacky?',
    answer: (
      <p>
        Absolutely not! Due to its diamond-like appearance, many people believe
        the misconception that moissanite is a fake diamond when it is in fact
        a high quality, beautiful gemstone in its own right.{' '}
        <Link
          className="fancy"
          to="/education/moissanite-guidance/why-moissanite/is-a-moissanite-engagement-ring-tacky"
          target="_blank"
          rel="noopener noreferrer"
        >
          Moissanite is becoming an increasingly popular choice of stone
        </Link>{' '}
        in engagement rings due to its dazzling beauty, durability, ease of
        customisation and affordability.
      </p>
    ),
  },

  {
    question: 'Do moissanite rings look fake?',
    answer: (
      <p>
        No, moissanite rings are crafted to exhibit a sparkle that, to the naked
        eye, is akin to that of diamonds.{' '}
        <Link
          className="fancy"
          to="/education/moissanite-guidance/what-is-a-moissanite-diamond-is-it-real/can-you-tell-the-difference-between-moissanite-and-diamond/does-moissanite-look-fake"
          target="_blank"
          rel="noopener noreferrer"
        >
          They offer timeless beauty and are an aesthetically identical choice
          for those who admire the appearance of mined diamonds.
        </Link>
      </p>
    ),
  },

  {
    question: 'Does moissanite lose its sparkle?',
    answer: (
      <p>
        <Link
          className="fancy"
          to="/education/moissanite-guidance/what-is-a-moissanite-diamond-is-it-real/will-moissanite-last-forever/does-moissanite-lose-its-sparkle"
          target="_blank"
          rel="noopener noreferrer"
        >
          Moissanite retains its sparkle indefinitely
        </Link>
        , much like our lab grown diamonds. Its clarity and carat weight remain
        intact, ensuring a lifetime of brilliance.
      </p>
    ),
  },

  {
    question:
      'How can I find the perfect moissanite engagement ring at Cullen Jewellery?',
    answer: (
      <p>
        We make it easy to find your ideal moissanite engagement ring. Request a
        free ring sizer to determine your correct ring size, and browse our wide
        selection of moissanite engagement rings on our website. To create a
        custom ring design, schedule an appointment with our expert team. Our
        specialists will assist you through the entire design process. Cullen
        Jewellery offers exceptional value{' '}
        <Link
          className="fancy"
          to="/education/why-cullen/found-a-better-price"
          target="_blank"
          rel="noopener noreferrer"
        >
          compared to other jewellers
        </Link>
        .
      </p>
    ),
  },

  {
    question: 'What is a moissanite diamond? Is it real?',
    answer: (
      <p>
        A moissanite diamond does not exist. Despite having a similar appearance
        to a diamond, moissanite is a real gemstone in its own right. First
        discovered in a meteor crater by Henry Moissan in 1893, moissanite is
        now lab created, making it affordable and ethical. With a hardness
        rating of 9.25–9.5, it is incredibly durable and suitable for daily
        wear.{' '}
        <Link
          className="fancy"
          to="/education/moissanite-guidance/what-is-a-moissanite-diamond-is-it-real"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </Link>
        .
      </p>
    ),
  },

  {
    question: 'Can you shower with a moissanite ring?',
    answer: (
      <p>
        Yes, you can shower with a moissanite ring. However, frequent exposure
        to soaps, dirt and chemicals can cause build-up. To maintain sparkle,
        avoid heavy housework while wearing your ring.{' '}
        <Link
          className="fancy"
          to="/education/moissanite-guidance/how-to-clean-and-care-for-your-moissanite-engagement-ring"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more about caring for your moissanite ring
        </Link>
        .
      </p>
    ),
  },

  {
    question: 'Can you scratch moissanite?',
    answer: (
      <p>
        No. With a hardness of 9.25–9.5, moissanite is harder than all gemstones
        except diamonds and can only be scratched by a diamond or another
        moissanite stone — which is extremely unlikely.{' '}
        <Link
          className="fancy"
          to="/education/moissanite-guidance/what-is-a-moissanite-diamond-is-it-real/will-moissanite-last-forever"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </Link>
        .
      </p>
    ),
  },

  {
    question: 'Is it bad to get a moissanite engagement ring?',
    answer: (
      <p>
        Not at all! Moissanite is an ethical, sustainable and affordable
        engagement ring choice. It offers exceptional sparkle, durability and
        long-lasting beauty, making it a responsible alternative without
        sacrificing quality.{' '}
        <Link
          className="fancy"
          to="/education/moissanite-guidance/why-moissanite"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </Link>
        .
      </p>
    ),
  },

  {
    question: 'How much is a 1 carat moissanite worth?',
    answer: (
      <p>
        A 1 carat moissanite is worth approximately $990 AUD, depending on cut.{' '}
        <Link
          className="fancy"
          to="/engagement-rings/moissanite"
          title="/engagement-rings/moissanite"
        >
          View moissanite pricing by shape and size here
        </Link>
        .
      </p>
    ),
  },

  {
    question:
      'Why should I purchase a moissanite engagement ring from Cullen Jewellery?',
    answer: (
      <>
        <p>
          Cullen Jewellery offers a wide selection of moissanite engagement
          rings crafted for durability, sparkle and timeless beauty. Our expert
          jewellers combine stunning stones with beautiful settings to bring
          your vision to life.
        </p>

        <p>
          With free ring sizers, virtual appointments and showroom visits, we
          make it easy to create your dream ring. So{' '}
          <Link className="fancy" to="/visit">
            schedule your appointment today
          </Link>
          !
        </p>
      </>
    ),
  },
];

const PAGE_FAQ_FOUR = [
  {
    question: 'What are lab grown sapphires?',
    answer: (
      <p>
        Lab grown sapphires are marvels of modern science, created in controlled
        environments that replicate the natural processes of mined sapphires.
        They share the same chemical composition, crystal structure, and physical
        properties as their mined counterparts. So choosing a lab grown sapphire
        is definitely the responsible choice!
      </p>
    ),
  },

  {
    question: 'How are lab grown sapphires made?',
    answer: (
      <p>
        Our lab grown sapphires are crafted using the Czochralski process. This
        involves melting aluminium oxide and inserting a rod with a seed crystal.
        As the rod is gently rotated and pulled, a stunning column of sapphire
        emerges, ready to be cut, polished and transformed into your next
        cherished piece.
      </p>
    ),
  },

  {
    question: 'What colours of lab grown sapphires are available?',
    answer: (
      <p>
        At Cullen Jewellery, we offer an exquisite palette of lab grown sapphires
        in blue, pink, purple, and red. Trace elements like iron, titanium, and
        chromium influence the vibrant hues of each sapphire.
      </p>
    ),
  },

  {
    question:
      'What are the advantages of lab grown sapphires over mined sapphires?',
    answer: (
      <p>
        Lab grown sapphires offer brilliant benefits. They are more cost-effective
        and free from the ethical concerns tied to mining. Plus, they boast fewer
        inclusions and more consistent colour, making them a responsible choice
        for conscientious jewellery lovers.
      </p>
    ),
  },

  {
    question:
      'How should I care for and maintain my lab grown sapphire jewellery?',
    answer: (
      <p>
        Thanks to their impressive durability, our lab-grown sapphires are
        perfect for everyday wear. Clean them with warm, soapy water, ultrasonic
        cleaners, or steam cleaners. To keep them pristine, store them separately
        to avoid scratches from harder gemstones like diamonds.
      </p>
    ),
  },

  {
    question:
      'What is the difference between lab grown sapphires and mined sapphires?',
    answer: (
      <p>
        Lab grown and mined sapphires are identical twins in terms of chemical
        composition, crystal structure, and physical properties. The key
        difference is their origin: lab grown sapphires are born in controlled
        environments, while mined sapphires are formed over millions of years in
        the Earth&apos;s crust.
      </p>
    ),
  },

  {
    question: 'What is the hardness of lab grown sapphires?',
    answer: (
      <p>
        Our lab grown sapphires boast a hardness of 9 on the Mohs scale, making
        them incredibly durable and scratch-resistant—ideal for jewellery that
        stands the test of time.
      </p>
    ),
  },

  {
    question:
      'Can I incorporate lab grown sapphires into existing jewellery designs?',
    answer: (
      <p>
        Absolutely! Cullen Jewellery offers a stunning range of lab grown
        sapphires that can be seamlessly incorporated into your existing
        jewellery designs. Whether you need loose stones or completed pieces,
        we&apos;ve got you covered.
      </p>
    ),
  },

  {
    question: 'What is the difference between a sapphire and a ruby?',
    answer: (
      <p>
        Sapphires and rubies are both members of the corundum family. The primary
        distinction lies in their colour: sapphires typically exhibit blue hues,
        while rubies are renowned for their rich red shades, courtesy of
        chromium.
      </p>
    ),
  },

  {
    question: 'What makes Cullen Jewellery’s lab grown sapphires unique?',
    answer: (
      <p>
        Cullen Jewellery’s lab grown sapphires are meticulously eye-clean,
        meaning they have no visible inclusions. Available in a variety of
        vibrant colours, each sapphire is carefully checked by our in-house
        experts to ensure it meets our highest standards of quality and
        brilliance.
      </p>
    ),
  },
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