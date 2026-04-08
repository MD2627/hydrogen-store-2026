/**
 * Utility functions for managing footer menus
 */

/**
 * Map of footer menu sections with their Shopify menu handles
 * Update these handles to match your Shopify menus from:
 * https://admin.shopify.com/store/diamondjewellery-8864/content/menus
 */
export const FOOTER_MENU_HANDLES = {
  QUICK_LINKS: 'quick-links',
  ABOUT_US: 'about-us',
  CLIENT_CARE: 'client-care',
  SOCIAL_LINKS: 'social-links',
  LEGAL_LINKS: 'legal-links',
};

/**
 * Get all footer menu handles
 * @returns {string[]} Array of menu handles
 */
export function getFooterMenuHandles() {
  return Object.values(FOOTER_MENU_HANDLES);
}

/**
 * Get specific menu handle by section key
 * @param {string} section - The section key (e.g., 'QUICK_LINKS')
 * @returns {string|null} The menu handle or null
 */
export function getMenuHandle(section) {
  return FOOTER_MENU_HANDLES[section] || null;
}

/**
 * Format menu items for display
 * @param {Object[]} items - Raw menu items from Shopify
 * @returns {Object[]} Formatted menu items
 */
export function formatMenuItems(items = []) {
  if (!Array.isArray(items)) return [];
  
  return items.map(item => ({
    id: item.id,
    title: item.title || '',
    url: item.url || '#',
    type: item.type,
    resourceId: item.resourceId,
  }));
}

/**
 * Validate menu data structure
 * @param {Object} menu - Menu object to validate
 * @returns {boolean} Whether menu is valid
 */
export function isValidMenu(menu) {
  return (
    menu &&
    typeof menu === 'object' &&
    Array.isArray(menu.items) &&
    menu.items.length > 0
  );
}
