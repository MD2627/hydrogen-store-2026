import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export function Announcement() {
    const announcements = [
        {
            text: "VISIT US - APPOINTMENT ONLY",
            link: "/products/madeline",
            image: "https://cdn.shopify.com/s/files/1/0801/7317/0906/files/svgviewer-output.svg?v=1767866337",
            showImage: true
        },
        {
            text: "Your story, set in stone",
            link: "/products/arielle"
        },
        {
            text: "Certified & Ethical Lab-Grown Diamonds",
            link: "/products/arielle"
        },
        {
            text: "Book a Private Consultation",
            link: "/products/savannah"
        },
        {
            text: "Complimentary Insured Worldwide Delivery",
            link: "/products/arielle"
        },
        {
            text: "Complimentary Engraving & Cleaning",
            link: "/products/savannah"
        },
        {
            text: "FREE SHIPPING ON ORDERS OVER $50",
            link: "/products/arielle"
        },
        {
            text: "NEW COLLECTION AVAILABLE NOW",
            link: "/products/savannah"
        }
    ];




    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % announcements.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const current = announcements[index];

    return (
        <div className="announcement-bar">
            <div className="announcement-content" key={index}>
                <Link to={current.link} className="announcement-link">

                    {/* Render image only for specific text */}
                    {current.showImage && (
                        <img
                            src={current.image}
                            alt=""
                            className="announcement-icon"
                        />
                    )}

                    <span className='f-13 f-m-11 black-color l-0 w-300 l-h-1-2 ff-n'>{current.text}</span>
                </Link>
            </div>
        </div>
    );
}
