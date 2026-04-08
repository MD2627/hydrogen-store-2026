import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { TopImageWithText } from '~/components/top-image-with-text';

const banner = {
    imageSrc:
        'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01_Amanda-18k-Yellow-Gold-Round-8mm-scaled_2000x2000.webp?v=1655858691',
    title: 'Our Top 10 Rings',
    extraClass: 'story-craft-banner--our-story',
}

const TOP_10_RINGS_DATA1 = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01_Ava-18k-Yellow-Gold-Moissanite-Elongated-Cushion-9x7mm-2_600x.webp?v=1655858691',
        title: 'Ava',
        subtitle: 'Elongated Cushion Solitaire',
        description: "Ava is an exquisite Cushion Solitaire engagement ring that boasts a delicate beauty. Featuring a divine 9x7mm (2.5ct) Elongated Cushion cut moissanite, Ava's 4 claw setting is partnered with a dainty 1.8mm band and sparkling Hidden Halo.",
        buttonText: 'MEET AVA',
        buttonUrl: '/engagement-rings/ring-ava',
        AddClass: 'top-image-with-text--first',
        AddSteps: '01',
    },
];

const TOP_10_RINGS_DATA2 = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01_Emma-18k-Yellow-Gold-Moissanite-Oval-10x7mm-1-scaled_600x.webp?v=1655858691',
        title: 'Emma',
        subtitle: 'Oval Solitaire with Hidden Halo',
        description: "Sophisticated and stunning, Emma is a four-claw low set Solitaire featuring a hidden halo for extra sparkle. Emma features a gorgeous 10x7mm (2.5ct) Oval cut moissanite on a delicate 1.8mm band.",
        buttonText: 'MEET EMMA',
        buttonUrl: '/engagement-rings/ring-emma',
        AddClass: 'top-image-with-text--second',
        AddSteps: '02',
    },
];

const TOP_10_RINGS_DATA3 = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01_Alyssa-Platinum-Moissanite-Oval-9x6.5mm-1-scaled_600x.webp?v=1655858691',
        title: 'Alyssa',
        subtitle: 'Oval Solitaire with Accent Stones',
        description:
            "Alyssa is a graceful 8x6mm (1.5ct) Oval Solitaire engagement ring seated in a charming high set 4 claw setting. The Alyssa ring is sure to turn heads with her glittering 1.8mm band, featuring two pairs of beautiful Round and Marquise cut moissanite side stones.",
        buttonText: 'MEET ALYSSA',
        buttonUrl: '/engagement-rings/ring-alyssa',
        AddClass: 'top-image-with-text--first',
        AddSteps: '03',
    },
];

const TOP_10_RINGS_DATA4 = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01_Alexandria-Platinum-Moissanite-Round-8mm-1-scaled_600x.webp?v=1655858691',
        title: 'Alexandria',
        subtitle: '6 Claw Pavé Round Solitaire',
        description:
            'Classically beautiful, Alexandria is our signature 6 claw Pavé Solitaire. A supremely popular choice, this exquisite design has claws that are set above the band, making a statement on the finger and allowing the wedding band to fit flush against the engagement ring when that time comes.',
        buttonText: 'MEET ALEXANDRIA',
        buttonUrl: '/engagement-rings/ring-alexandria',
        AddClass: 'top-image-with-text--second',
        AddSteps: '04',
    },
];

const TOP_10_RINGS_DATA5 = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Louise_LS_011_2022_600x.webp?v=1655858691',
        title: 'Louise',
        subtitle: '6 Claw Solitaire',
        description:
            'Louise is a classically beautiful 6 claw Solitaire featuring a stunning 8.5mm (2.25ct) Round cut moissanite with elegant eagle tipped claws, on a 1.8mm band.',
        buttonText: 'MEET LOUISE',
        buttonUrl: '/engagement-rings/ring-louise',
        AddClass: 'top-image-with-text--first',
        AddSteps: '05',
    },
];

const TOP_10_RINGS_DATA6 = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Julia_DT_LS_002-e1641206996151_600x.webp?v=1655858691',
        title: 'Julia',
        subtitle: 'Oval Solitaire with Hidden Halo and Pavé',
        description:
            'Julia is is a modern 4 claw Solitaire featuring a Pavé band as well as a Hidden Halo for extra sparkle. The Pavé Solitaire is a very popular choice as an engagement ring and this particular design is a classic. The claws are set above the band to both make a statement on the hand and also to allow for a wedding band to fit flush against the engagement ring when that time comes.',
        buttonText: 'MEET JULIA',
        buttonUrl: '/engagement-rings/ring-julia',
        AddClass: 'top-image-with-text--second',
        AddSteps: '06',
    },
];

const TOP_10_RINGS_DATA7 = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01_Sheridan-High-Setting-Platinum-Moissanite-Oval-10x7mm-scaled_600x.webp?v=1655858691',
        title: 'Sheridan',
        subtitle: 'Oval Trilogy',
        description:
            'Emma is our simple yet sophisticated Oval Solitaire. Featuring a gorgeous 10x7mm (2.5ct) Oval cut moissanite in a graceful 4 claw setting with a sparkling Hidden Halo, finished by a delicate 1.8mm band.',
        buttonText: 'MEET SHERIDAN',
        buttonUrl: '/engagement-rings/ring-sheridan',
        AddClass: 'top-image-with-text--first',
        AddSteps: '07',
    },
];

const TOP_10_RINGS_DATA8 = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Theresa_LS_004_2022_600x.webp?v=1655858691',
        title: 'Emma',
        subtitle: 'Oval Solitaire with Hidden Halo',
        description:
            'Emma is our simple yet sophisticated Oval Solitaire. Featuring a gorgeous 10x7mm (2.5ct) Oval cut moissanite in a graceful 4 claw setting with a sparkling Hidden Halo, finished by a delicate 1.8mm band.',
        buttonText: 'MEET EMMA',
        buttonUrl: '/engagement-rings/ring-emma',
        AddClass: 'top-image-with-text--second',
        AddSteps: '08',
    },
];

const TOP_10_RINGS_DATA9 = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01_Paige-18k-White-Gold-Oval-10x7mm-scaled_600x.webp?v=1655858691',
        title: 'Paige',
        subtitle: 'Oval Solitaire with Hidden Halo and Pavé',
        description:
            'A simply stunning Oval Solitaire, Paige is certainly a piece to be admired. Featuring a gorgeous 9×6.5mm (2ct) Oval cut moissanite, held gracefully in a 4 claw setting with a Hidden Halo, completed by a stylish 1.8mm band with 2/3 Pavé.',
        buttonText: 'MEET PAIGE',
        buttonUrl: '/engagement-rings/ring-paige',
        AddClass: 'top-image-with-text--first',
        AddSteps: '09',
    },
];

const TOP_10_RINGS_DATA10 = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/01_Amanda-18k-Yellow-Gold-Round-8mm-scaled_600x.webp?v=1655858691',
        title: 'Amanda',
        subtitle: '6 Claw Pavé Round Solitaire with Hidden Halo',
        description:
            'Lovingly crafted and handset here in Australia, our beautiful Amanda engagement ring is a truly sophisticated solitaire. With breathtaking elegance, Amanda features a stunning 10mm (3.65ct) Round cut moissanite in a 6 claw setting with a gorgeous wrap around Hidden Halo, finished beautifully by a 2mm Pavé band.',
        buttonText: 'MEET AMANDA',
        buttonUrl: '/engagement-rings/ring-amanda',
        AddClass: 'top-image-with-text--second',
        AddSteps: '10',
    },
];

const TOP_10_RINGS_UVPS = [
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

export async function loader() {
    return null;
}

export default function Top10Rings() {
    return (
        <>
            <StoryCraftBanner {...banner} />

            <div className="top-page-rich-text">
                <p className='top-page-rich-text__para'>While wedding traditions have changed throughout history,
                    what hasn’t is the desire for the very best engagement
                    ring! Whether you shop together or you leave it to your
                    soon-to-be spouse, an engagement ring should last a lifetime
                    and keep heads turning.
                </p>
                <p>Our list of the 10 Most Popular Engagement Rings is sure to help
                    inspire you. Even if your choice of ring is not from the list below,
                    it can act as a guide to help you understand the different styles and
                    influence your likes and dislikes.
                </p>
            </div>

            <TopImageWithText data={TOP_10_RINGS_DATA1} />

            <TopImageWithText data={TOP_10_RINGS_DATA2} />

            <TopImageWithText data={TOP_10_RINGS_DATA3} />

            <TopImageWithText data={TOP_10_RINGS_DATA4} />

            <TopImageWithText data={TOP_10_RINGS_DATA5} />

            <TopImageWithText data={TOP_10_RINGS_DATA6} />

            <TopImageWithText data={TOP_10_RINGS_DATA7} />

            <TopImageWithText data={TOP_10_RINGS_DATA8} />

            <TopImageWithText data={TOP_10_RINGS_DATA9} />

            <TopImageWithText data={TOP_10_RINGS_DATA10} />

            <UvpIconFooter data={TOP_10_RINGS_UVPS} />
        </>
    );
} 