import { StoryCraftBanner } from '~/components/StoryCraftBanner';
import { UvpIconFooter } from '~/components/UvpIconFooter';
import { ProductRingCollections } from '~/components/ProductRingCollections';
const banner = {
    imageSrc:
        'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_5ec4ur5ec4ur5ec4.png?v=1779174605',
    title: 'Our Top 10 Rings',
    extraClass: 'story-craft-banner--our-story',
}

const TOP_10_RINGS_COLLECTION = [
    {
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_nnlge2nnlge2nnlg.png?v=1779174662',
        title: 'Celeste',
        description: '<p><strong>Oval Hidden Halo Solitaire</strong></p><p>Celeste features a refined oval centre stone set in a delicate hidden halo design. Finished with a slim polished band, it offers timeless elegance with modern brilliance.</p>',
        linkText: 'MEET CELESTE',
        link: '/engagement-rings/ring-celeste',
        bgColor: '#fcfcfc'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_5tbmjy5tbmjy5tbm.png?v=1779172542',
        title: 'Elara',
        description: '<p><strong>Pear Solitaire Engagement Ring</strong></p><p>Elara showcases a graceful pear-cut centre stone secured in a refined claw setting. The elegant silhouette creates a soft and sophisticated appearance.</p>',
        linkText: 'MEET ELARA',
        link: '/engagement-rings/ring-elara',
        bgColor: '#fff'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_bgaug9bgaug9bgau.png?v=1777440856',
        title: 'Aurora',
        description: '<p><strong>Radiant Cut Pavé Ring</strong></p><p>Aurora blends contemporary sparkle with timeless design, featuring a radiant-cut centre stone accented by a fine pavé band for added brilliance.</p>',
        linkText: 'MEET AURORA',
        link: '/engagement-rings/ring-aurora',
        bgColor: '#fcfcfc'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_bgaug9bgaug9bgau.png?v=1777440856',
        title: 'Isla',
        description: '<p><strong>Classic Round Solitaire</strong></p><p>Isla is a timeless round solitaire crafted with clean lines and an elevated setting designed to maximise brilliance and everyday elegance.</p>',
        linkText: 'MEET ISLA',
        link: '/engagement-rings/ring-isla',
        bgColor: '#fff'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_5ec4ur5ec4ur5ec4.png?v=1779174605',
        title: 'Vivienne',
        description: '<p><strong>Emerald Cut Hidden Halo</strong></p><p>Vivienne features a striking emerald-cut centre stone paired with a hidden halo and slim polished band, creating a sophisticated and luxurious finish.</p>',
        linkText: 'MEET VIVIENNE',
        link: '/engagement-rings/ring-vivienne',
        bgColor: '#fcfcfc'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_nnlge2nnlge2nnlg.png?v=1779174662',
        title: 'Sienna',
        description: '<p><strong>Oval Pavé Solitaire</strong></p><p>Sienna combines a brilliant oval centre stone with a delicate pavé band, delivering a romantic design filled with sparkle and refinement.</p>',
        linkText: 'MEET SIENNA',
        link: '/engagement-rings/ring-sienna',
        bgColor: '#fff'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_5tbmjy5tbmjy5tbm.png?v=1779172542',
        title: 'Luna',
        description: '<p><strong>Pear Trilogy Engagement Ring</strong></p><p>Luna features a stunning pear-shaped centre stone complemented by elegant side stones, creating a balanced and luminous trilogy design.</p>',
        linkText: 'MEET LUNA',
        link: '/engagement-rings/ring-luna',
        bgColor: '#fcfcfc'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_bgaug9bgaug9bgau.png?v=1777440856',
        title: 'Amelia',
        description: '<p><strong>Radiant Solitaire Ring</strong></p><p>Amelia highlights a radiant-cut centre stone in a sleek solitaire setting, designed for a bold yet timeless appearance.</p>',
        linkText: 'MEET AMELIA',
        link: '/engagement-rings/ring-amelia',
        bgColor: '#fff'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_5ec4ur5ec4ur5ec4.png?v=1779174605',
        title: 'Harper',
        description: '<p><strong>Emerald Cut Pavé Engagement Ring</strong></p><p>Harper pairs a clean emerald-cut centre stone with a shimmering pavé band for a refined and contemporary engagement ring style.</p>',
        linkText: 'MEET HARPER',
        link: '/engagement-rings/ring-harper',
        bgColor: '#fcfcfc'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Gemini_Generated_Image_nnlge2nnlge2nnlg.png?v=1779174662',
        title: 'Evelyn',
        description: '<p><strong>Oval Hidden Halo Pavé Ring</strong></p><p>Evelyn is designed with an elegant oval centre stone, hidden halo detailing, and a sparkling pavé band for maximum brilliance and sophistication.</p>',
        linkText: 'MEET EVELYN',
        link: '/engagement-rings/ring-evelyn',
        bgColor: '#fff'
    }
];

const TOP_10_RINGS_UVPS = [
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

export async function loader() {
    return null;
}

export default function Top10Rings() {
    return (
        <>
            <StoryCraftBanner {...banner} />

            <div className="top-page-rich-text">
                <p className='sb-description'>
                    While trends evolve over time, the desire for a truly exceptional engagement ring remains unchanged. Whether you choose together or plan a surprise, your ring should be timeless, meaningful, and designed to be admired for a lifetime.
                </p>
                <p className='sb-description'>
                    Our selection of the 10 most popular engagement rings is designed to inspire your journey. Even if your perfect ring isn’t featured below, this guide will help you explore different styles and discover what truly speaks to you.
                </p>
            </div>

            <ProductRingCollections
                title="Our Top 10 Rings"
                data={TOP_10_RINGS_COLLECTION}
            />

            <UvpIconFooter data={TOP_10_RINGS_UVPS} />
        </>
    );
} 