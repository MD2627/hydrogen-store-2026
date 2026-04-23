const fs = require('fs');
const path = require('path');

const rootDir = process.argv[2] || '.';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(rootDir);

const standardButtonClasses = [
    'banner-btn',
    'btn-solid',
    'checkout-btn',
    'continue-shopping-btn',
    'newsletter-button',
    'promo-button',
    'common-button',
    'finance-button',
    'ring-banner-button',
    'select-btn',
    'submit-booking-btn',
    'career-mission-btn',
    'browse-settings-btn',
    'impact-report-download-btn',
    'browse-btn',
    'discovery-banner-btn',
    'account-form-button',
    'cta-banner-button',
    'summary-btn',
    'common-btn-cookie'
];

const outlineButtonClasses = [
    'btn-outline'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace standard buttons with just "btn" (keeping other classes)
    standardButtonClasses.forEach(baseClass => {
        const regex = new RegExp(`className="([^"]*)${baseClass}([^"]*)"`, 'g');
        content = content.replace(regex, (match, p1, p2) => {
            let classes = p1 + 'btn' + p2;
            // Clean up double spaces
            classes = classes.trim().replace(/\s+/g, ' ');
            return `className="${classes}"`;
        });
    });

    // Replace outline buttons with "btn btn--outline"
    outlineButtonClasses.forEach(baseClass => {
        const regex = new RegExp(`className="([^"]*)${baseClass}([^"]*)"`, 'g');
        content = content.replace(regex, (match, p1, p2) => {
            let classes = p1 + 'btn btn--outline' + p2;
            classes = classes.trim().replace(/\s+/g, ' ');
            return `className="${classes}"`;
        });
    });

    if (content !== original) {
        console.log(`Updated ${file}`);
        fs.writeFileSync(file, content);
    }
});
