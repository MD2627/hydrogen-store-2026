/**
 * Redirect Configuration
 * Define paths that should redirect to other pages.
 * Format: '/path-from': '/path-to'
 */
export const REDIRECTS = {
    // Example:
    '/collections/engagement-rings': '/engagement-rings',
    // '/old-collection': '/collections',
    // '/hidden-page': '/404', // You can map to a specific 404 path if you created one, or just let it redirect to home
};

/**
 * Blocked/Hidden Paths
 * Paths that should explicitly return a 404 Not Found.
 * Useful for hiding specific collections or products temporarily.
 */
export const BLOCKED_PATHS = [
    '/collections',
];
