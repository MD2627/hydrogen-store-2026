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

const replacements = [
    { from: /className="banner-btn"/g, to: 'className="btn"' },
    { from: /className="btn-solid"/g, to: 'className="btn"' },
    { from: /className="btn-outline"/g, to: 'className="btn btn--outline"' },
    { from: /className="checkout-btn"/g, to: 'className="btn checkout-btn"' },
    { from: /className="continue-shopping-btn"/g, to: 'className="btn continue-shopping-btn"' },
    { from: /className="newsletter-button([^"]*)"/g, to: 'className="btn newsletter-button$1"' },
    { from: /className="promo-button([^"]*)"/g, to: 'className="btn promo-button$1"' },
    { from: /className="common-button"/g, to: 'className="btn"' },
    { from: /className="finance-button"/g, to: 'className="btn finance-button"' },
    { from: /className="ring-banner-button"/g, to: 'className="btn ring-banner-button"' },
    { from: /className="banner-btn summary-btn read-reviews-btn"/g, to: 'className="btn read-reviews-btn"' },
    { from: /className="banner-btn summary-btn write-review-btn"/g, to: 'className="btn write-review-btn"' },
    // more specific ones if needed
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    replacements.forEach(rep => {
        content = content.replace(rep.from, rep.to);
    });
    if (content !== original) {
        console.log(`Updated ${file}`);
        fs.writeFileSync(file, content);
    }
});
