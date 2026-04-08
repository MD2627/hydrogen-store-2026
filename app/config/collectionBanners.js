// Collection Banner Configuration
// Add custom banner images or videos for each collection with desktop and mobile versions
// 
// Configuration options:
// - type: 'image' (default) or 'video'
// - desktop: URL for desktop image/video
// - mobile: URL for mobile image/video (optional, falls back to desktop)
// - title: Custom title (optional)
// - description: Custom description (optional)
// - videoOptions: Object with video settings (autoplay, loop, muted, controls, etc.)

export const COLLECTION_BANNERS = {
    'engagement': {
        type: 'image', // 'image' or 'video'
        desktop: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/02_Sasha_and_Holly_Banner_2000x2000_5f4e8ec1-b7b5-4d1e-ac55-136ea9673b8e.jpg?v=1768801658',
        mobile: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/02_Sasha_and_Holly_Banner_Mobile_2000x2000_2cd360ec-70f4-4314-abc2-e038e3ba0dae.jpg?v=1768801890',
        title: 'Engagement Rings',
        description: 'Crafted by our jewelers with care and precision.'
        // Example video config:
        // type: 'video',
        // desktop: 'https://example.com/video-desktop.mp4',
        // mobile: 'https://example.com/video-mobile.mp4',
        // videoOptions: {
        //     autoplay: true,
        //     loop: true,
        //     muted: true,
        //     controls: false,
        //     playsInline: true
        // }
    },
    'wedding-rings-women': {
        type: 'image',
        desktop: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/Banner_-_Wedding_Ring_-_womens_-_desktop_2000x2000_7c09d5de-29e7-4a26-bfba-01f1137d38c8.jpg?v=1768803948',
        mobile: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/banner_-_Wedding_Rings_-_womens_-_phone_2000x2000_090edea8-33a2-4547-bb39-421a4bedff92.png?v=1768803950',
        title: 'Women\'s Wedding Rings and Bands',
        description: 'Choose from our range of women\'s lab grown diamond wedding rings. Pick the perfect pairing for your engagement ring now.'
    },
    'wedding-rings-men': {
        type: 'image',
        desktop: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/banner_-_wedding_-_mens_-_desktop_2000x2000_c2df7a92-bb15-4881-a1de-1c2a3f1ce380.jpg?v=1768803889',
        mobile: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/banner_-_wedding_-_mens_-_phone_2000x2000_07a09b01-bf5f-4955-b6dc-3bef96fac43f.jpg?v=1768803889',
        title: 'Men\'s Wedding Rings and Bands',
        description: 'Choose from our range of men\'s wedding rings. Select your ideal metal type and setting style.'
    },
    'wedding': {
        type: 'image',
        desktop: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/wedding_banner_desktop.jpg',
        mobile: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/wedding_banner_mobile.jpg',
        title: 'Wedding Rings',
        description: 'Timeless symbols of your eternal love.'
    },
    'all': {
        type: 'image',
        desktop: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/all_rings_banner_desktop.jpg',
        mobile: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/all_rings_banner_mobile.jpg',
        title: 'All Rings',
        description: 'Explore our complete collection of fine jewelry.'
    },
    'frontpage': {
        type: 'image',
        desktop: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/all_rings_banner_desktop.jpg',
        mobile: 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/all_rings_banner_mobile.jpg',
        title: 'All Rings',
        description: 'Explore our complete collection of fine jewelry.'
    },
    'engagement-rings': {
        type: 'video',
        desktop: 'https://cdn.shopify.com/videos/c/o/v/2f3ddc1e328b4dc1b7fb13837208b3d1.mp4',
        mobile: 'https://cdn.shopify.com/videos/c/o/v/2f3ddc1e328b4dc1b7fb13837208b3d1.mp4',
        // desktop: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/02_Sasha_and_Holly_Banner_2000x2000_5f4e8ec1-b7b5-4d1e-ac55-136ea9673b8e.jpg?v=1768801658',
        // mobile: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/02_Sasha_and_Holly_Banner_Mobile_2000x2000_2cd360ec-70f4-4314-abc2-e038e3ba0dae.jpg?v=1768801890',
        title: 'Ready-to-Ship Engagement Rings',
        description: 'Crafted by our jewelers with care and precision.',
        videoOptions: {
            autoplay: true,
            loop: true,
            muted: true,
            controls: false,
            playsInline: true
        }
    },
    'gifting': {
        type: 'video',
        desktop: 'https://cdn.shopify.com/videos/c/o/v/aea546cde2434e3dab5d9b88c347d368.mp4',
        mobile: 'https://cdn.shopify.com/videos/c/o/v/aea546cde2434e3dab5d9b88c347d368.mp4',
        // desktop: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/02_Sasha_and_Holly_Banner_2000x2000_5f4e8ec1-b7b5-4d1e-ac55-136ea9673b8e.jpg?v=1768801658',
        // mobile: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/02_Sasha_and_Holly_Banner_Mobile_2000x2000_2cd360ec-70f4-4314-abc2-e038e3ba0dae.jpg?v=1768801890',
        title: 'Responsible. Meaningful. Made to be gifted.',
        description: 'Explore our collection of expertly crafted jewellery and choose a piece they’ll treasure forever.',
        videoOptions: {
            autoplay: true,
            loop: true,
            muted: true,
            controls: false,
            playsInline: true
        }
    },
    'bracelets': {
        type: 'image',
        desktop: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/02_Sasha_and_Holly_Banner_2000x2000_5f4e8ec1-b7b5-4d1e-ac55-136ea9673b8e.jpg?v=1768801658',
        mobile: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/02_Sasha_and_Holly_Banner_Mobile_2000x2000_2cd360ec-70f4-4314-abc2-e038e3ba0dae.jpg?v=1768801890',
        title: 'Bracelets',
        description: 'Crafted by our jewelers with care and precision.'
    },
    'impact-report': {
        type: 'image',
        desktop: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/impact_banner.jpg?v=1769066494',
        mobile: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/impact_banner.jpg?v=1769066494',
        title: 'Impact Report',
        description: 'Our commitment to conscious progress.'
    },
    'custom-rings': {
        type: 'image',
        desktop: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/ImageBanner_web_2000x2000_9d45b8a2-bf67-4dbd-9036-dccfed486dfc.png?v=1769086528',
        mobile: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/ImageBanner_mob_2000x2000_3e71f659-7c78-4f63-98f2-e8cf60454b91.png?v=1769086526',
        title: 'Custom Engagement Rings',
        description: 'Brought to life by our jewellers.'
    },
    'careers': {
        type: 'image',
        desktop: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/career_banner_desktop.png?v=1769063114',
        mobile: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/career_banner_mob.png?v=1769063112',
        title: null,
        description: null
    },
    'fine-jewellery': {
        type: 'video',
        desktop: 'https://cdn.shopify.com/videos/c/o/v/aea546cde2434e3dab5d9b88c347d368.mp4',
        mobile: 'https://cdn.shopify.com/videos/c/o/v/aea546cde2434e3dab5d9b88c347d368.mp4',
        title: 'Fine Jewelry',
        description: 'Explore our fine jewelry collection, featuring timeless tennis bracelets, initial necklaces and more.',
        videoOptions: {
            autoplay: true,
            loop: true,
            muted: true,
            controls: false,
            playsInline: true
        }
    },
    'recycling-brilliance': {
        type: 'image',
        desktop: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/career_banner_desktop.png?v=1769063114', // Using careers banner as placeholder
        mobile: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/career_banner_mob.png?v=1769063112',
        title: 'Recycling Brilliance',
        description: 'Our commitment to a circular and sustainable future.'
    },
    'collections': {
        type: 'image',
        desktop: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/career_banner_desktop.png?v=1769063114', // Using careers banner as placeholder
        mobile: 'https://cdn.shopify.com/s/files/1/0801/7317/0906/files/career_banner_mob.png?v=1769063112',
        title: 'Collections',
        description: 'Our commitment to a circular and sustainable future.'
    }
};

/**
 * Get banner configuration for a collection
 * @param {string} handle - Collection handle (e.g., 'engagement', 'wedding')
 * @returns {object|null} Banner configuration or null if not found
 */
export function getCollectionBanner(handle) {
    return COLLECTION_BANNERS[handle] || null;
}
