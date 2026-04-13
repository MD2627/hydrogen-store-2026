// app/routes/theme-showcase.jsx
import { useState, useEffect } from "react";
import { TryThemeModal } from "~/components/TryThemeModal";
import themeShowcaseStyles from "~/styles/theme-showcase.css?url";

export function links() {
    return [
        { rel: "stylesheet", href: themeShowcaseStyles },
    ];
}

/* ─── DATA ──────────────────────────────────────────────────── */

const FEATURES_HIGHLIGHTS = [
    {
        title: "Limitless Customization",
        desc: "Advanced filtering, predictive search, and mega menus help customers find exactly what they need — even with thousands of products.",
        img: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Ring_Collections_-_Ready_to_Ship_1000x1000_9bf208e2-50f9-4944-87e5-a3bc5fcc7e6c.webp?v=1774584021",
    },
    {
        title: "Speed Without Compromise",
        desc: "Lazy loading, minimal scripts, and clean code deliver fast Core Web Vitals - keeping customers engaged and checkout friction low.",
        img: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Ring_Collections_-_Statement_1000x1000_6dd7a1c8-b1ba-4df6-97b9-ee76c190df70.webp?v=1774584137",
    },
    {
        title: "Grow Revenue Per Order",
        desc: "Countdown timers, cart upsells, stock indicators, and product recommendations work together to lift your average order value.",
        img: "https://cdn.shopify.com/s/files/1/0610/2194/5934/files/Emma_Front_1000x1000_a83ee659-b3bc-40ae-9d6e-9970d15c4240.webp?v=1774585549",
    },
];

const FEATURES_LIST = {
    "Hydrogen Technology": ["Server-side rendering (Remix)", "Edge deployment (Oxygen)", "Sub-request caching", "Predictive storefront search", "Optimistic variant switching", "Direct Storefront API integration", "Optimized image components", "High-performance architecture"],
    "Sustainability": ["Carbon neutral lab diamonds", "Trees For The Future partnership", "Gold and Platinum recycling", "Conflict-free gemstone sourcing", "Reforestation initiatives", "Verified renewable energy usage", "Minimal carbon footprint design"],
    "Premium Services": ["Showroom appointments", "Virtual ring consultations", "Custom ring design service", "Expert gemstone advice", "Bespoke jewellery crafting", "Heirloom story sessions", "Professional ring cleaning"],
    "Customer Guarantees": ["Lifetime manufacturing warranty", "Worldwide express shipping", "Free first-year resizing", "Conflict-free guarantee", "Insured discreet delivery", "Free ring sizing kit", "24/7 expert support"],
    "Expert Education": ["Engagement ring guidance", "Lab grown diamond advice", "Moissanite stone education", "Anatomy of a ring", "Precious metal selection guide", "Gemstone guide"],
};

const PRESETS = [
    {
        label: "Homepage",
        img: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/gemstone_cover_image_1000x1000.jpg?v=1741149642",
        url: "/"
    },
    {
        label: "Collection Page",
        img: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/cover_for_categories_1000x1000.jpg?v=1741150140",
        url: "/collections/all"
    },
    {
        label: "Product Page",
        img: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Cullen_Website_4x5_2500px_03_2_400x400.jpg?v=1741064516",
        url: "/products/sophia-engagement-ring-round-lab-diamond-platinum"
    },
    {
        label: "About Us",
        img: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Thanasi_Home_Page_Select_Final-1_1600x1600.jpg?v=1767837146",
        url: "/our-story"
    },
    {
        label: "Visit Us",
        img: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/initiatives_image_1000x1000.jpg?v=1759807949",
        url: "/visit"
    },
    {
        label: "Review Page",
        img: "https://cdn.shopify.com/s/files/1/0644/3067/0060/files/Ring_Collections_-_Ready_to_Ship_1000x1000.webp?v=1741734665",
        url: "/reviews"
    },
];

const TABS = ["Overview", "What's Included", "Reviews", "Page Varieties"];

/* ─── COMPONENTS ────────────────────────────────────────────── */

function Stars({ count = 5, filled = 5 }) {
    return (
        <span style={{ color: "#ffb800", fontSize: 13, letterSpacing: 1 }}>
            {Array.from({ length: count }, (_, i) => (
                <span key={i} style={{ opacity: i < filled ? 1 : 0.25 }}>★</span>
            ))}
        </span>
    );
}

function StickyNav({ activeTab, setActiveTab, onTryTheme, stuck }) {
    const handleScroll = (t) => {
        setActiveTab(t);
        const id = t.toLowerCase().replace(/\s+/g, '-');
        if (t === 'Overview') {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const el = document.getElementById(id);
        if (el) {
            const offset = 20;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const offsetPosition = elementRect - bodyRect - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    return (
        <div className="sticky-nav-wrap" style={{ transform: stuck ? "translateY(0)" : "translateY(100%)" }}>
            <div className="sticky-nav-inner">
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {TABS.map((t) => (
                        <button
                            key={t}
                            onClick={() => handleScroll(t)}
                            className={`tab-btn ${activeTab === t ? "active" : ""}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                {/* <div style={{ display: "flex", gap: 12 }}>
                    <a href="/" className="btn-outline">View demo</a>
                    <button onClick={onTryTheme} className="btn-solid">Try theme</button>
                </div> */}
                <div style={{ display: "flex", gap: 12 }}>
                    <a href="/" className="btn-outline sticky-nav-view-demo">View demo</a>
                    <button onClick={onTryTheme} className="btn-solid">Try theme</button>
                </div>
            </div>
        </div>
    );
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */

export default function ThemeShowcase() {
    const [activeTab, setActiveTab] = useState("Overview");
    const [popupImg, setPopupImg] = useState(null);
    const [showTryTheme, setShowTryTheme] = useState(false);
    const [stuck, setStuck] = useState(false);

    useEffect(() => {
        const handler = () => setStuck(window.scrollY > 420);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <div className="theme-showcase-page">
            {/* ── HERO ── */}
            <section id="overview" className="hero-section">
                <div style={{ width: "100%", maxWidth: 1240, margin: "0 auto", textAlign: 'left' }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 60 }}>
                        <div>
                            <h1 className="hero-title">Hydrogen</h1>
                            <p className="hero-sub">
                                Unlock the power of image-focused design and super flexible layouts
                            </p>
                        </div>
                        {/* <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                            <button onClick={() => setShowTryTheme(true)} className="btn-solid">Try theme</button>
                            <a href="/" className="btn-outline">View demo</a>
                        </div> */}
                        <div style={{ display: "flex", gap: 12, marginTop: 4 }} className="hero-cta-row">
                            <button onClick={() => setShowTryTheme(true)} className="btn-solid">Try theme</button>
                            <a href="/" className="btn-outline">View demo</a>
                        </div>
                    </div>
                    <div className="feature-grid">
                        {FEATURES_HIGHLIGHTS.map((f, i) => (
                            <div key={i} className="feature-column" onClick={() => setPopupImg(f.img)}>
                                <div className="card-img-wrap" style={{ marginBottom: 16 }}>
                                    <img src={f.img} alt={f.title} />
                                </div>
                                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font_family_n)' }}>{f.title}</h3>
                                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.5 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STICKY NAV ── */}
            <StickyNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onTryTheme={() => setShowTryTheme(true)}
                stuck={stuck}
            />

            {/* ── TRY THEME MODAL ── */}
            <TryThemeModal
                isOpen={showTryTheme}
                onClose={() => setShowTryTheme(false)}
                formId="theme-showcase-bottom-nav"
            />

            {/* ── WHAT'S INCLUDED ── */}
            <section id="what's-included" className="showcase-section">
                <div className="section-container">
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
                        <span style={{ fontSize: 28 }}>✦</span>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>What's included</h2>
                    </div>
                    <div className="feature-grid" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
                        {Object.entries(FEATURES_LIST).map(([cat, items]) => (
                            <div key={cat} className="feature-column">
                                <h4 className="feature-category">{cat}</h4>
                                {items.map((item) => (
                                    <div key={item} className="feature-item">
                                        <span className="check-icon">✓</span> {item}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── REVIEWS ── */}
            <section id="reviews" className="showcase-section">
                <div className="section-container">
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
                        <Stars count={5} filled={5} />
                        <h2 className="section-title" style={{ marginBottom: 0 }}>Verified Performance</h2>
                    </div>
                    <div className="feature-grid">
                        <div className="feature-column">
                            <p style={{ fontSize: 42, fontWeight: 700, fontFamily: 'var(--font_family_n)', color: 'var(--primary_color)' }}>99/100</p>
                            <p style={{ color: "#666", fontWeight: 600 }}>Lighthouse Speed Score</p>
                        </div>
                        <div className="feature-column">
                            <p style={{ fontSize: 42, fontWeight: 700, fontFamily: 'var(--font_family_n)', color: 'var(--primary_color)' }}>0.2s</p>
                            <p style={{ color: "#666", fontWeight: 600 }}>Largest Contentful Paint</p>
                        </div>
                        <div className="feature-column">
                            <p style={{ fontSize: 42, fontWeight: 700, fontFamily: 'var(--font_family_n)', color: 'var(--primary_color)' }}>100%</p>
                            <p style={{ color: "#666", fontWeight: 600 }}>Core Web Vitals Pass</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PAGE VARIETIES ── */}
            <section id="page-varieties" className="showcase-section" style={{ background: "var(--gray_color)" }}>
                <div className="section-container">
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
                        <span style={{ fontSize: 28, color: 'var(--primary_color)' }}>◎</span>
                        <div>
                            <h2 className="section-title" style={{ marginBottom: 4 }}>Page Varieties</h2>
                            <p style={{ fontSize: 14, color: "#666", margin: 0 }}>Explore specialized templates for every customer journey</p>
                        </div>
                    </div>
                    <div className="presets-row">
                        {PRESETS.map((p) => (
                            <a key={p.label} href={p.url} className="feature-column" style={{ textDecoration: 'none' }}>
                                <div className="card-img-wrap">
                                    <img src={p.img} alt={p.label} />
                                </div>
                                <div className="preset-label">{p.label}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── IMAGE LIGHTBOX (Gallery) ── */}
            {popupImg && (
                <div className="lightbox-overlay" onClick={() => setPopupImg(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setPopupImg(null)}>×</button>
                        <img src={popupImg} alt="Enlarged Preview" className="lightbox-image" />
                    </div>
                </div>
            )}
        </div>
    );
}