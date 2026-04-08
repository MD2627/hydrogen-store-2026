import { CartForm, Money } from '@shopify/hydrogen';
import { useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router';

/**
 * @param {CartSummaryProps}
 */
export function CartSummary({ cart, layout }) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div aria-labelledby="cart-summary" className={className}>
      <div className="cart-summary-header">
        <h4>Order Summary</h4>
      </div>

      <div className="cart-summary-content">
        <dl className="cart-subtotal">
          <dt>Subtotal</dt>
          <dd>
            {(() => {
              const subtotal = cart?.cost?.subtotalAmount;
              if (subtotal && parseFloat(subtotal.amount) > 0) {
                return <Money data={subtotal} />;
              }
              // Manual calc fallback
              const manualTotal = (cart?.lines?.nodes || []).reduce((acc, line) => {
                const lineCost = line?.cost?.totalAmount;
                if (lineCost && parseFloat(lineCost.amount) > 0) {
                  return acc + parseFloat(lineCost.amount);
                }
                const unit = line?.merchandise?.price;
                const qty = line?.quantity || 1;
                if (unit) {
                  return acc + (parseFloat(unit.amount) * qty);
                }
                return acc;
              }, 0);

              if (manualTotal > 0) {
                const currency = cart?.cost?.subtotalAmount?.currencyCode || 'INR';
                return <Money data={{ amount: manualTotal.toFixed(2), currencyCode: currency }} />;
              }
              return '-';
            })()}
          </dd>
        </dl>
        <p className="shipping-note">Shipping & taxes calculated at checkout</p>

        <CartDiscounts discountCodes={cart?.discountCodes} />
        <CartGiftCard giftCardCodes={cart?.appliedGiftCards} />
      </div>

      <div className="cart-summary-footer">
        <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
      </div>
    </div>
  );
}

/**
 * @param {{checkoutUrl?: string}}
 */
function CartCheckoutActions({ checkoutUrl }) {
  if (!checkoutUrl) return null;

  return (
    <div className="checkout-actions">
      <a href={checkoutUrl} target="_self" className="checkout-btn">
        Checkout
      </a>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: CartApiQueryFragment['discountCodes'];
 * }}
 */
function CartDiscounts({ discountCodes }) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({ code }) => code) || [];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="cart-discounts">
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="cart-discount-applied">
              <code>{codes?.join(', ')}</code>
              <button className="remove-discount-btn">Remove</button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <div className="discount-input-wrapper">
        <button className="toggle-discount-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close Discount Code' : 'Add Discount Code'}
        </button>
        {isOpen && (
          <UpdateDiscountForm discountCodes={codes}>
            <div className="discount-form">
              <input type="text" name="discountCode" placeholder="Discount code" />
              <button type="submit">Apply</button>
            </div>
          </UpdateDiscountForm>
        )}
      </div>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
function UpdateDiscountForm({ discountCodes, children }) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

/**
 * @param {{
 *   giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
 * }}
 */
function CartGiftCard({ giftCardCodes }) {
  const appliedGiftCardCodes = useRef([]);
  const giftCardCodeInput = useRef(null);
  const giftCardAddFetcher = useFetcher({ key: 'gift-card-add' });
  const [isOpen, setIsOpen] = useState(false);

  // Clear the gift card code input after the gift card is added
  useEffect(() => {
    if (giftCardAddFetcher.data) {
      giftCardCodeInput.current.value = '';
    }
  }, [giftCardAddFetcher.data]);

  function saveAppliedCode(code) {
    const formattedCode = code.replace(/\s/g, ''); // Remove spaces
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
  }

  return (
    <div className="cart-gift-cards">
      {/* Display applied gift cards with individual remove buttons */}
      {giftCardCodes && giftCardCodes.length > 0 && (
        <dl>
          <dt>Applied Gift Card(s)</dt>
          {giftCardCodes.map((giftCard) => (
            <RemoveGiftCardForm key={giftCard.id} giftCardId={giftCard.id}>
              <div className="cart-discount-applied">
                <code>***{giftCard.lastCharacters}</code>
                <Money data={giftCard.amountUsed} />
                <button type="submit" className="remove-discount-btn">Remove</button>
              </div>
            </RemoveGiftCardForm>
          ))}
        </dl>
      )}

      {/* Show an input to apply a gift card */}
      <div className="gift-card-input-wrapper">
        <button className="toggle-discount-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close Gift Card' : 'Add Gift Card'}
        </button>
        {isOpen && (
          <UpdateGiftCardForm
            giftCardCodes={appliedGiftCardCodes.current}
            saveAppliedCode={saveAppliedCode}
            fetcherKey="gift-card-add"
          >
            <div className="discount-form">
              <input
                type="text"
                name="giftCardCode"
                placeholder="Gift card code"
                ref={giftCardCodeInput}
              />
              <button type="submit" disabled={giftCardAddFetcher.state !== 'idle'}>
                Apply
              </button>
            </div>
          </UpdateGiftCardForm>
        )}
      </div>
    </div>
  );
}

/**
 * @param {{
 *   giftCardCodes?: string[];
 *   saveAppliedCode?: (code: string) => void;
 *   fetcherKey?: string;
 *   children: React.ReactNode;
 * }}
 */
function UpdateGiftCardForm({
  giftCardCodes,
  saveAppliedCode,
  fetcherKey,
  children,
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher) => {
        const code = fetcher.formData?.get('giftCardCode');
        if (code && saveAppliedCode) {
          saveAppliedCode(code);
        }
        return children;
      }}
    </CartForm>
  );
}

/**
 * @param {{
 *   giftCardId: string;
 *   children: React.ReactNode;
 * }}
 */
function RemoveGiftCardForm({ giftCardId, children }) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
    </CartForm>
  );
}

/**
 * @typedef {{
 *   cart: OptimisticCart<CartApiQueryFragment | null>;
 *   layout: CartLayout;
 * }} CartSummaryProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCart} OptimisticCart */
/** @typedef {import('react-router').FetcherWithComponents} FetcherWithComponents */
