import React from 'react';
import { CartForm, Money, Image } from '@shopify/hydrogen';
import { Link, useFetchers } from 'react-router';
import { useAside } from './Aside';

// Spinner for the summary loader
function Spinner() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: 'spin 1s linear infinite',
        color: 'black'
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
 * Professional Cart Drawer
 * Displays cart items with proper quantity and pricing
 */
export function CustomCartDrawer({ initialCart }) {
  const { close, open } = useAside();
  const fetchers = useFetchers();

  // Detect if ANY fetcher is working on the cart
  const isUpdating = fetchers.some((fetcher) => {
    // Check if this fetcher is active
    if (fetcher.state === 'idle') return false;

    // Check if it's targeting the cart route
    // Note: formAction might be full URL or relative, check both
    return fetcher.formAction === '/cart' ||
      fetcher.formAction?.endsWith('/cart');
  });

  // State to hold instant/optimistic cart data from the AddButton
  const [tempCart, setTempCart] = React.useState(null);

  // Use (tempCart or initialCart) - prefer tempCart if recent add happened
  const cart = tempCart || initialCart;
  const allLines = cart?.lines?.nodes || cart?.lines || [];

  // State for toggling extras (Discounts/Notes)
  // Check if we already have a note or discount applied to show it by default
  const hasExtras = (cart?.discountCodes?.length > 0) || (!!cart?.note);
  const [showExtras, setShowExtras] = React.useState(hasExtras);

  // 1. Initialize optimistic state for ALL lines
  // We use a ref to track if we just initialized to avoid infinite loops if cart changes
  const [optimisticLines, setOptimisticLines] = React.useState({});

  // Listen for the add-to-cart event
  React.useEffect(() => {
    const handleItemAdded = (event) => {

      if (event.detail) {
        // 1. Update with the fast data immediately
        setTempCart(event.detail);

        // 2. Open drawer immediately (no waiting for server!)
        // 2. Open drawer immediately (no waiting for server!)
        open('cart');
      }
    };
    window.addEventListener('cart-item-added', handleItemAdded);
    return () => window.removeEventListener('cart-item-added', handleItemAdded);
  }, [open]);

  // Sync state with server cart when it changes (and clear temp)
  React.useEffect(() => {
    // If real server data updated, we can discard the temp data
    if (initialCart) {
      setTempCart(null);
    }

    if (allLines.length > 0) {
      // Data updated
    }
    const newOptimisticLines = {};
    allLines.forEach(line => {
      newOptimisticLines[line.id] = line.quantity;
    });
    setOptimisticLines(newOptimisticLines);
  }, [cart?.lines]); // Depend on the lines object reference

  // Helper to update a single line's qty
  const updateQuantity = (lineId, newQty) => {
    setOptimisticLines(prev => ({
      ...prev,
      [lineId]: newQty
    }));
  };

  // Filter out items that are visibly removed (qty 0)
  // We use optimistic values for filtering/displaying
  const lines = allLines.filter(line => {
    const optQty = optimisticLines[line.id];
    // If we have an optimistic value, use it. Otherwise default to line.quantity.
    // If optQty is undefined, it means we haven't synced yet, so show the line (unless real qty is 0)
    return optQty !== undefined ? optQty > 0 : line.quantity > 0;
  });

  const isEmpty = lines.length === 0;

  // Calculate Item Count based on OPTIMISTIC values
  const itemCount = lines.reduce((total, line) => {
    return total + (optimisticLines[line.id] ?? line.quantity);
  }, 0);

  // Only log if there are items with quantity 0 (this indicates a problem)
  if (allLines.length > 0 && lines.length === 0) {
    // Log suppressed
  }

  return (
    <div className="custom-cart-drawer">
      <div className="cart-header">
        <h2>Your Cart ({itemCount})</h2>
        <button onClick={close} className="close-drawer-btn" aria-label="Close cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {isEmpty ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <Link
            to="/collections"
            onClick={close}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-lines">
            {lines.map((line) => {
              return (
                <CartLineItem
                  key={line.id}
                  line={line}
                  onClose={close}
                  // Pass optimistic qty and updater
                  optimisticQty={optimisticLines[line.id] ?? line.quantity}
                  onUpdateQty={updateQuantity}
                />
              );
            })}
          </div>

          <div
            className="cart-summary"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {/* Loading Overlay for Summary */}
            {isUpdating && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(2px)',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.2s ease',
                }}
              >
                <Spinner />
              </div>
            )}

            {/* Extras Toggle */}
            <div className="cart-extras-toggle">
              <label className="extras-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '16px' }}>
                <input
                  type="checkbox"
                  checked={showExtras}
                  onChange={(e) => setShowExtras(e.target.checked)}
                  style={{ accentColor: 'black', width: '16px', height: '16px' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Add Order Note or Discount Code</span>
              </label>
            </div>

            {/* Collapsible Extras Section */}
            {showExtras && (
              <div className="cart-extras-content" style={{ animation: 'fadeIn 0.3s ease' }}>
                {/* Discount Code Section */}
                <CartDiscounts discountCodes={cart?.discountCodes || []} />

                {/* Order Note Section */}
                <CartNote note={cart?.note || ''} />
              </div>
            )}

            {/* Summary */}
            {cart?.cost?.subtotalAmount && (
              <dl className="summary-row subtotal">
                <dt>Subtotal</dt>
                <dd><Money data={cart.cost.subtotalAmount} /></dd>
              </dl>
            )}

            <p className="shipping-note">Shipping & taxes calculated at checkout</p>

            {cart?.cost?.totalAmount && (
              <dl className="summary-row total">
                <dt>Total</dt>
                <dd><Money data={cart.cost.totalAmount} /></dd>
              </dl>
            )}

            {cart?.checkoutUrl && (
              <a href={cart.checkoutUrl} className="checkout-btn">
                Proceed to Checkout
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Discount Code Component
 */
function CartDiscounts({ discountCodes }) {
  const [showInput, setShowInput] = React.useState(false);

  return (
    <div className="cart-discounts">
      {discountCodes.length > 0 ? (
        <div className="discount-applied">
          {discountCodes.map((discount) => (
            <div key={discount.code} className="discount-item">
              <span>{discount.code}</span>
              <CartForm
                route="/cart"
                action={CartForm.ACTIONS.DiscountCodesUpdate}
                inputs={{ discountCodes: [] }}
              >
                <button type="submit" className="remove-discount">×</button>
              </CartForm>
            </div>
          ))}
        </div>
      ) : (
        <>
          {!showInput ? (
            <button
              type="button"
              onClick={() => setShowInput(true)}
              className="toggle-discount"
            >
              Add discount code
            </button>
          ) : (
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.DiscountCodesUpdate}
            >
              <div className="discount-form">
                <input
                  type="text"
                  name="discountCode"
                  placeholder="Discount code"
                  required
                />
                <button type="submit">Apply</button>
              </div>
            </CartForm>
          )}
        </>
      )}
    </div>
  );
}

/**
 * Order Note Component
 */
function CartNote({ note }) {
  const [showNote, setShowNote] = React.useState(!!note);

  return (
    <div className="cart-note">
      {!showNote ? (
        <button
          type="button"
          onClick={() => setShowNote(true)}
          className="toggle-note"
        >
          Add order note
        </button>
      ) : (
        <CartForm
          route="/cart"
          action={CartForm.ACTIONS.NoteUpdate}
        >
          <div className="note-form">
            <textarea
              name="note"
              placeholder="Special instructions or gift message"
              defaultValue={note}
              rows="3"
            />
            <button type="submit">Save Note</button>
          </div>
        </CartForm>
      )}
    </div>
  );
}

function CartLineItem({ line, onClose, optimisticQty, onUpdateQty }) {
  const { merchandise, cost } = line;
  const { product, title, image, selectedOptions, price } = merchandise || {};

  // Safety check
  if (!merchandise || !product) {
    return null;
  }

  const [isRemoving, setIsRemoving] = React.useState(false);

  const prevQuantity = Math.max(0, optimisticQty - 1);
  const nextQuantity = optimisticQty + 1;

  // Handler for optimistic updates
  const handleUpdate = (newQuantity) => {
    // 1. Call parent to update state (for Header total)
    // We use setTimeout to ensure the form submission (which happens on click)
    // captures the current 'inputs' before we trigger a re-render that changes them.
    setTimeout(() => {
      onUpdateQty(line.id, newQuantity);
    }, 0);
  };

  // Build product URL from selected options
  const buildProductUrl = () => {
    const params = new URLSearchParams();
    (selectedOptions || []).forEach(opt => {
      params.append(opt.name, opt.value);
    });
    return `/ engagement / ${product.handle}?${params.toString()} `;
  };

  // Calculate line total based on optimistic quantity
  let lineTotal = cost?.totalAmount;

  // Calculate price per unit
  const unitPriceAmount = cost?.amountPerQuantity?.amount || price?.amount || 0;
  const currency = cost?.amountPerQuantity?.currencyCode || price?.currencyCode || 'INR';

  // If we are updating optimistically, recalculate the visible total
  if (optimisticQty !== line.quantity) {
    lineTotal = {
      amount: (parseFloat(unitPriceAmount) * optimisticQty).toFixed(2),
      currencyCode: currency
    };
  }

  return (
    <div className="cart-line-item">
      <div className="line-image">
        {image && (
          <Link to={buildProductUrl()} onClick={onClose}>
            <Image
              data={image}
              alt={title || product.title}
              width={90}
              height={90}
              loading="lazy"
            />
          </Link>
        )}
      </div>

      <div className="line-details">
        <div className="line-info">
          <Link to={buildProductUrl()} onClick={onClose} className="line-title">
            {product.title}
          </Link>

          <div className="line-options">
            {/* Variant Options */}
            {selectedOptions && selectedOptions.length > 0 && selectedOptions.map((option) => (
              <span key={option.name} className="option">
                {option.name !== 'Item' && option.name !== 'Title' && <span className="option-name">{option.name}: </span>}
                <span className="option-value">{option.value}</span>
              </span>
            ))}

            {/* Custom Attributes (Properties) */}
            {line.attributes && line.attributes.length > 0 && line.attributes.map((attr) => {
              // Skip private attributes (start with _) or empty values
              if (attr.key.startsWith('_') || !attr.value) return null;

              return (
                <span key={attr.key} className="option">
                  <span className="option-name">{attr.key}: </span>
                  <span className="option-value">{attr.value}</span>
                </span>
              );
            })}
          </div>

          <div className="line-price">
            <Money data={lineTotal || { amount: 0, currencyCode: 'INR' }} />
          </div>
        </div>

        <div className="line-controls">
          <div className="quantity-controls">
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.LinesUpdate}
              inputs={{ lines: [{ id: line.id, quantity: prevQuantity }] }}
            >
              <button
                type="submit"
                aria-label="Decrease quantity"
                className="quantity-btn"
                onClick={() => handleUpdate(prevQuantity)}
                disabled={optimisticQty <= 1}
              >
                −
              </button>
            </CartForm>

            <span className="quantity">{optimisticQty}</span>

            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.LinesUpdate}
              inputs={{ lines: [{ id: line.id, quantity: nextQuantity }] }}
            >
              <button
                type="submit"
                aria-label="Increase quantity"
                className="quantity-btn"
                onClick={() => handleUpdate(nextQuantity)}
              >
                +
              </button>
            </CartForm>
          </div>

          <div className="cart-actions-right">
            {optimisticQty !== line.quantity ? (
              <span className="updating-text f-11 f-m-11 ff-c w-300 black-color" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ animation: 'spin 1s linear infinite' }}
                >
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M10 2a8 8 0 0 1 8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                REMOVE
              </span>
            ) : (
              <CartForm
                route="/cart"
                action={CartForm.ACTIONS.LinesRemove}
                inputs={{ lineIds: [line.id] }}
              >
                <button
                  type="submit"
                  className="remove-btn f-11 f-m-11 ff-c w-300 black-color"
                  onClick={() => setIsRemoving(true)}
                  style={{
                    cursor: isRemoving ? 'wait' : 'pointer',
                    pointerEvents: isRemoving ? 'none' : 'auto',
                    opacity: isRemoving ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {isRemoving && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ animation: 'spin 1s linear infinite' }}
                    >
                      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                      <path d="M10 2a8 8 0 0 1 8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  )}
                  REMOVE
                </button>
              </CartForm>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
