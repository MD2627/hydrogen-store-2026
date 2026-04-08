import { CartForm, Image, Money } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { Link } from 'react-router';
import { useAside } from './Aside';

// Small Spinner component for loading state in cart
function SmallSpinner() {
  return (
    <svg
      className="cart-remove-spinner"
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: 'spin 1s linear infinite',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M10 2a8 8 0 0 1 8 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 * @param {{
 *   layout: CartLayout;
 *   line: CartLine;
 * }}
 */
export function CartLineItem({ layout, line }) {
  const { id, merchandise, quantity } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside();

  return (
    <li key={id} className="cart-line">
      {image && (
        <div className="cart-line-image">
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
          >
            <Image
              alt={title}
              aspectRatio="1/1"
              data={image}
              loading="lazy"
              width={100}
              height={100}
            />
          </Link>
        </div>
      )}

      <div className="cart-line-details">
        <div className="cart-line-header">
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
            className="cart-line-title"
          >
            <h3>{product.title}</h3>
          </Link>
          <div className="cart-line-price">
            {(() => {
              const total = line?.cost?.totalAmount;
              const unit = line?.merchandise?.price;
              const qty = quantity || 1;
              let final = total;
              // If amount is 0, try to calc from unit price
              if ((!final || parseFloat(final?.amount || '0') === 0) && unit && parseFloat(unit?.amount || '0') > 0) {
                final = { ...unit, amount: (parseFloat(unit.amount) * qty).toFixed(2) };
              }
              return <Money data={final} />;
            })()}
          </div>
        </div>

        <ul className="cart-line-options">
          {selectedOptions.map((option) => (
            <li key={option.name}>
              <span className="option-name">{option.name}: </span>
              {option.value}
            </li>
          ))}
        </ul>

        <div className="cart-line-footer">
          <CartLineQuantity line={line} />
        </div>
      </div>
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 * @param {{line: CartLine}}
 */
function CartLineQuantity({ line }) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="cart-line-quantity">
      <div className="quantity-controls">
        <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
          {(fetcher) => (
            <button
              aria-label="Decrease quantity"
              disabled={quantity <= 1 || !!isOptimistic || fetcher.state !== 'idle'}
              name="decrease-quantity"
              value={prevQuantity}
              className="quantity-btn"
            >
              {fetcher.state !== 'idle' ? <SmallSpinner /> : <span>&#8722;</span>}
            </button>
          )}
        </CartLineUpdateButton>

        <span className="quantity-display">{quantity}</span>

        <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
          {(fetcher) => (
            <button
              aria-label="Increase quantity"
              name="increase-quantity"
              value={nextQuantity}
              disabled={!!isOptimistic || fetcher.state !== 'idle'}
              className="quantity-btn"
            >
              {fetcher.state !== 'idle' ? <SmallSpinner /> : <span>&#43;</span>}
            </button>
          )}
        </CartLineUpdateButton>
      </div>

      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 * @param {{
 *   lineIds: string[];
 *   disabled: boolean;
 * }}
 */
function CartLineRemoveButton({ lineIds, disabled }) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds }}
    >
      {(fetcher) => (
        <button
          disabled={disabled || fetcher.state !== 'idle'}
          type="submit"
          className="remove-btn f-11 f-m-11 ff-c w-300 black-color"
        >
          {fetcher.state !== 'idle' ? <SmallSpinner /> : 'Remove'}
        </button>
      )}
    </CartForm>
  );
}

/**
 * @param {{
 *   children: React.ReactNode | ((fetcher: any) => React.ReactNode);
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({ children, lines }) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {(fetcher) => (typeof children === 'function' ? children(fetcher) : children)}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @returns
 * @param {string[]} lineIds - line ids affected by the update
 */
function getUpdateKey(lineIds) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

/** @typedef {OptimisticCartLine<CartApiQueryFragment>} CartLine */

/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
