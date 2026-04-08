import { useEffect, useState } from 'react';

export function SingleImage({ image = 'https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Product_Pages_Updates_2025_logo_strip_V2_2600x2600_e5c9718d-2dd7-40a5-a193-c856accdb3c2_1300x1300.webp?v=1764044759' }) {
    return (
        <section className="single-image-section" style={{ background: '#f5eeec', padding: '0', textAlign: 'center' }}>
            <img src={`${image}`} alt="" />
        </section>
    );
}
