import { useLoaderData, data } from 'react-router';
import { CartForm } from '@shopify/hydrogen';
import { CartMain } from '~/components/CartMain';
import cartPageStyles from '~/styles/cart-page.css?url';

export const links = () => {
  return [{ rel: 'stylesheet', href: cartPageStyles }];
};

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: `Hydrogen | Cart` }];
};

/**
 * @type {HeadersFunction}
 */
export const headers = ({ actionHeaders }) => actionHeaders;

/**
 * Helper to retry operations on throttling
 * Uses iterative approach to preserve stack/context better than recursion
 */
async function performCartOperation(operationName, operationFn) {
  const MAX_RETRIES = 8; // Increased from 5 to 8 for better handling
  let attempt = 0;
  let lastError = null;

  while (attempt < MAX_RETRIES) {
    try {
      const result = await operationFn();
      if (attempt > 0) {
        console.log(`[Cart] ${operationName} succeeded after ${attempt} retries`);
      }
      return result;
    } catch (error) {
      lastError = error;
      const errorMsg = error.message || error.toString();
      const isThrottled = errorMsg.includes('Throttled') ||
        errorMsg.includes('Too Many Requests') ||
        (error.errors && error.errors.some(e => e.message?.includes('Throttled')));

      if (isThrottled && attempt < MAX_RETRIES - 1) {
        attempt++;
        // Exponential backoff: 800ms, 1600ms, 3200ms, 6400ms...
        const delay = 800 * Math.pow(2, attempt - 1);
        console.warn(`[Cart] ${operationName} throttled. Attempt ${attempt}/${MAX_RETRIES}. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      // If not throttled or max retries reached
      throw error;
    }
  }
  // If we ran out of retries
  throw lastError;
}


/**
 * @param {Route.ActionArgs}
 */
export async function action({ request, context }) {
  const { cart } = context;
  const formData = await request.formData();
  const { action, inputs } = CartForm.getFormInput(formData);

  console.log('===== CART ACTION DEBUG =====');
  console.log('Action:', action);
  console.log('Inputs:', JSON.stringify(inputs, null, 2));

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;

  try {
    switch (action) {
      case CartForm.ACTIONS.LinesAdd:
        const lines = inputs.lines.map(({ merchandiseId, quantity, attributes, sellingPlanId }) => ({
          merchandiseId,
          quantity,
          attributes,
          sellingPlanId,
        }));
        console.log('Adding lines:', JSON.stringify(lines, null, 2));
        result = await performCartOperation('LinesAdd', () => cart.addLines(lines));
        break;

      case CartForm.ACTIONS.LinesUpdate:
        console.log('Updating lines:', JSON.stringify(inputs.lines, null, 2));
        result = await performCartOperation('LinesUpdate', () => cart.updateLines(inputs.lines));
        break;

      case CartForm.ACTIONS.LinesRemove:
        console.log('Removing lines:', JSON.stringify(inputs.lineIds, null, 2));
        result = await performCartOperation('LinesRemove', () => cart.removeLines(inputs.lineIds));
        break;

      case CartForm.ACTIONS.DiscountCodesUpdate: {
        const formDiscountCode = inputs.discountCode;
        const discountCodes = formDiscountCode ? [formDiscountCode] : [];
        discountCodes.push(...inputs.discountCodes);
        result = await performCartOperation('DiscountCodesUpdate', () => cart.updateDiscountCodes(discountCodes));
        break;
      }

      case CartForm.ACTIONS.GiftCardCodesUpdate: {
        const formGiftCardCode = inputs.giftCardCode;
        const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];
        giftCardCodes.push(...inputs.giftCardCodes);
        result = await performCartOperation('GiftCardCodesUpdate', () => cart.updateGiftCardCodes(giftCardCodes));
        break;
      }

      case CartForm.ACTIONS.GiftCardCodesRemove: {
        const appliedGiftCardIds = inputs.giftCardCodes;
        result = await performCartOperation('GiftCardCodesRemove', () => cart.removeGiftCardCodes(appliedGiftCardIds));
        break;
      }

      case CartForm.ACTIONS.BuyerIdentityUpdate: {
        result = await performCartOperation('BuyerIdentityUpdate', () => cart.updateBuyerIdentity({
          ...inputs.buyerIdentity,
        }));
        break;
      }

      default:
        throw new Error(`${action} cart action is not defined`);
    }

    console.log('===== CART RESULT =====');
    console.log('Cart ID:', result?.cart?.id);
    console.log('Total Quantity:', result?.cart?.totalQuantity);
    console.log('Lines count:', result?.cart?.lines?.nodes?.length);
    if (result?.cart?.lines?.nodes) {
      result.cart.lines.nodes.forEach((line, index) => {
        console.log(`Line ${index}:`, {
          id: line.id,
          quantity: line.quantity,
          merchandiseId: line.merchandise?.id,
          price: line.merchandise?.price?.amount
        });
      });
    }
    console.log('Errors:', result?.errors);
    console.log('Warnings:', result?.warnings);
    console.log('=========================');

  } catch (error) {
    console.error('Cart Action Failed:', error);
    return data({
      errors: [{ message: error.message || 'Cart action failed', code: 'CART_ERROR' }]
    }, { status: 500 });
  }

  const cartId = result?.cart?.id;

  // Ensure we get headers for the updated cart
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();

  const { cart: cartResult, errors, warnings } = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return data(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    { status, headers },
  );
}

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ context }) {
  const { cart } = context;
  return await cart.get();
}

export default function Cart() {
  /** @type {LoaderReturnData} */
  const cart = useLoaderData();

  return (
    <div className="cart">
      <CartMain layout="page" cart={cart} />
    </div>
  );
}