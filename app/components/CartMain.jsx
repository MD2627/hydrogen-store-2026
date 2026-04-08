import { CustomCartDrawer } from '~/components/CustomCartDrawer';
import { CustomCartPage } from '~/components/CustomCartPage';

/**
 * The main cart component that displays the cart items and summary.
 */
export function CartMain({ layout, cart: originalCart }) {
  if (layout === 'page') {
    return <CustomCartPage initialCart={originalCart} />;
  }

  return <CustomCartDrawer initialCart={originalCart} />;
}

/** @typedef {'page' | 'aside'} CartLayout */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: CartLayout;
 * }} CartMainProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
