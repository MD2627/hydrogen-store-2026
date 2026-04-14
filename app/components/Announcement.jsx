import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export function Announcement() {
    const announcements = [
        {
            text: "Documents & Resources",
            link: "/documentation"
        },
        {
            text: "Theme Showcase",
            link: "/theme-showcase"
        },
        {
            text: "Documents & Resources",
            link: "/documentation"
        },
        {
            text: "Theme Showcase",
            link: "/theme-showcase"
        },
        {
            text: "Documents & Resources",
            link: "/documentation"
        },
        {
            text: "Theme Showcase",
            link: "/theme-showcase"
        },
        {
            text: "Documents & Resources",
            link: "/documentation"
        },
        {
            text: "Theme Showcase",
            link: "/theme-showcase"
        },
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
