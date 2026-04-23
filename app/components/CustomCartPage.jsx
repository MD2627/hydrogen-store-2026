import React from 'react';
import { CartForm, Money, Image } from '@shopify/hydrogen';
import { Link, useFetchers } from 'react-router';

// Spinner for the loaders
function Spinner({ width = 20, height = 20 }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                animation: 'spin 1s linear infinite',
                color: 'currentColor'
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
 * Custom Cart Page - Premium 2-Column Layout
 */
export function CustomCartPage({ initialCart }) {
    const cart = initialCart;
    const allLines = cart?.lines?.nodes || cart?.lines || [];
    const fetchers = useFetchers();

    // Detect if ANY fetcher is working on the cart
    const isUpdating = fetchers.some((fetcher) => {
        if (fetcher.state === 'idle') return false;
        return fetcher.formAction === '/cart' || fetcher.formAction?.endsWith('/cart');
    });

    // 1. Initialize optimistic state for ALL lines
    const [optimisticLines, setOptimisticLines] = React.useState({});

    // Sync state with server cart when it changes
    // Depend on cart ID and total quantity to update state, preventing infinite loops from unstable array refs
    React.useEffect(() => {
        const newOptimisticLines = {};
        allLines.forEach(line => {
            newOptimisticLines[line.id] = line.quantity;
        });
        setOptimisticLines(newOptimisticLines);
    }, [cart?.id, cart?.totalQuantity, allLines.length]);

    // Helper to update a single line's qty
    const updateQuantity = (lineId, newQty) => {
        setOptimisticLines(prev => ({
            ...prev,
            [lineId]: newQty
        }));
    };

    // Filter out items that are visibly removed (qty 0)
    const lines = allLines.filter(line => {
        const optQty = optimisticLines[line.id];
        return optQty !== undefined ? optQty > 0 : line.quantity > 0;
    });

    const isEmpty = lines.length === 0;

    // Calculate Item Count based on OPTIMISTIC values
    const itemCount = lines.reduce((total, line) => {
        return total + (optimisticLines[line.id] ?? line.quantity);
    }, 0);

    if (isEmpty) {
        return (
            <div className="cart-page-empty">
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any elegant pieces yet.</p>
                <Link to="/engagement-rings" className="btn btn">
                    Explore Engagement Rings
                </Link>
            </div>
        );
    }

    return (
        <div className="page-width">
            <div className="cart-page-header f-32 f-m-20 w-400 ff-n black-color">
                <h1>Your Cart ({itemCount})</h1>
                <Link to="/engagement-rings" className="continue-shopping-link">
                    Continue Shopping
                </Link>
            </div>

            <div className="cart-page-grid">
                {/* Left Column: Items */}
                <div className="cart-page-items">

                    {lines.map((line) => (
                        <CartPageLineItem
                            key={line.id}
                            line={line}
                            optimisticQty={optimisticLines[line.id] ?? line.quantity}
                            onUpdateQty={updateQuantity}
                        />
                    ))}
                </div>

                {/* Right Column: Summary */}
                <div className="cart-page-sidebar">
                    <div className="cart-summary-card" style={{ position: 'relative', overflow: 'hidden' }}>
                        {isUpdating && (
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                    zIndex: 10,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Spinner width={40} height={40} />
                            </div>
                        )}
                        <h3>Order Summary</h3>

                        <div className="summary-row subtotal">
                            <span>Subtotal</span>
                            {cart?.cost?.subtotalAmount && <Money data={cart.cost.subtotalAmount} />}
                        </div>

                        {/* Discount Section */}
                        <div className="summary-section">
                            <CartDiscounts discountCodes={cart?.discountCodes || []} />
                        </div>

                        {/* Note Section */}
                        <div className="summary-section">
                            <CartNote note={cart?.note || ''} />
                        </div>

                        <div className="summary-row total">
                            <span>Estimated Total</span>
                            {cart?.cost?.totalAmount && <Money data={cart.cost.totalAmount} />}
                        </div>
                        <p className="shipping-note">Shipping & taxes calculated at checkout</p>

                        {cart?.checkoutUrl && (
                            <a href={cart.checkoutUrl} className="btn btn">
                                Proceed to Checkout
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function CartPageLineItem({ line, optimisticQty, onUpdateQty }) {
    const { merchandise, cost } = line;
    const { product, title, image, selectedOptions, price } = merchandise || {};

    // State to track if the item is being removed or updated
    const [isRemoving, setIsRemoving] = React.useState(false);
    const [isUpdatingQty, setIsUpdatingQty] = React.useState(false);

    if (!merchandise || !product) return null;

    const prevQuantity = Math.max(0, optimisticQty - 1);
    const nextQuantity = optimisticQty + 1;

    const handleUpdate = (newQuantity) => {
        // Optimistic UI handled by parent, but we trigger it here
        setTimeout(() => {
            onUpdateQty(line.id, newQuantity);
        }, 0);
    };

    // Reset removing/updating state if we get a new cart line data that matches (update finished)
    // or if the component unmounts/remounts
    React.useEffect(() => {
        setIsRemoving(false);
        setIsUpdatingQty(false);
    }, [line]);

    const buildProductUrl = () => {
        const params = new URLSearchParams();
        (selectedOptions || []).forEach(opt => {
            params.append(opt.name, opt.value);
        });
        return `/engagement/${product.handle}?${params.toString()}`;
    };

    // Calculate line total based on optimistic quantity
    let lineTotal = cost?.totalAmount;
    const unitPriceAmount = cost?.amountPerQuantity?.amount || price?.amount || 0;
    const currency = cost?.amountPerQuantity?.currencyCode || price?.currencyCode || 'INR';

    if (optimisticQty !== line.quantity) {
        lineTotal = {
            amount: (parseFloat(unitPriceAmount) * optimisticQty).toFixed(2),
            currencyCode: currency
        };
    }

    return (
        <div className="cart-page-item">
            <div className="item-product-col">
                <Link to={buildProductUrl()} className="item-image">
                    {image && (
                        <Image
                            data={image}
                            alt={title || product.title}
                            width={120}
                            height={120}
                            loading="lazy"
                        />
                    )}
                </Link>
                <div className="item-details">
                    <div className="item-header-row">
                        <Link to={buildProductUrl()} className="item-title">
                            {product.title}
                        </Link>
                        <div className="item-price-display">
                            {/* <Money data={cost?.amountPerQuantity || price} /> */}
                            <Money data={lineTotal || { amount: 0, currencyCode: 'INR' }} />
                        </div>
                    </div>

                    <div className="item-options-grid">
                        {selectedOptions && selectedOptions.length > 0 && selectedOptions.map((option) => {
                            if (option.name === 'Item' || option.name === 'Title') return null;
                            return (
                                <div key={option.name} className="option-row">
                                    <span className="option-label">{option.name}:</span>
                                    <span className="option-value">{option.value}</span>
                                </div>
                            );
                        })}

                        {line.attributes && line.attributes.length > 0 && line.attributes.map((attr) => {
                            if (attr.key.startsWith('_') || !attr.value) return null;
                            return (
                                <div key={attr.key} className="option-row">
                                    <span className="option-label">{attr.key}:</span>
                                    <span className="option-value">{attr.value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="item-qty-col">
                <div className="quantity-controls page-style">
                    <CartForm
                        route="/cart"
                        action={CartForm.ACTIONS.LinesUpdate}
                        inputs={{ lines: [{ id: line.id, quantity: prevQuantity }] }}
                    >
                        <button
                            type="submit"
                            onClick={() => {
                                handleUpdate(prevQuantity);
                                setIsUpdatingQty(true);
                            }}
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
                            onClick={() => {
                                handleUpdate(nextQuantity);
                                setIsUpdatingQty(true);
                            }}
                        >
                            +
                        </button>
                    </CartForm>
                </div>
            </div>

            <div className="item-total-col">
                <div className="item-remove">
                    {/* Show loader if refreshing quantity or removing */}
                    {(isRemoving || isUpdatingQty) && (
                        <div style={{ marginRight: '0px', display: 'inline-block' }}>
                            <Spinner width={12} height={12} />
                        </div>
                    )}

                    <CartForm
                        route="/cart"
                        action={CartForm.ACTIONS.LinesRemove}
                        inputs={{ lineIds: [line.id] }}
                    >
                        <button
                            type="submit"
                            className="text-remove-btn f-11 f-m-11 ff-c w-300 black-color"
                            onClick={() => setIsRemoving(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                opacity: (isRemoving || isUpdatingQty) ? 0.7 : 1,
                                cursor: (isRemoving || isUpdatingQty) ? 'wait' : 'pointer',
                                pointerEvents: (isRemoving || isUpdatingQty) ? 'none' : 'auto'
                            }}
                        >
                            {/* Only show spinner inside button if specifically removing */}
                            {isRemoving ? 'Remove' : 'Remove'}
                        </button>
                    </CartForm>
                </div>
            </div>
        </div>
    );
}

/**
 * Reusing components for Discount and Note
 * (Note: Styles will need to be scoped or shared)
 */

function CartDiscounts({ discountCodes }) {
    const [showInput, setShowInput] = React.useState(false);
    return (
        <div className="cart-discounts page-style">
            {discountCodes.length > 0 ? (
                <div className="discount-applied">
                    {discountCodes.map((discount) => (
                        <div key={discount.code} className="discount-item">
                            <span>{discount.code}</span>
                            <CartForm route="/cart" action={CartForm.ACTIONS.DiscountCodesUpdate} inputs={{ discountCodes: [] }}>
                                <button type="submit" className="remove-discount">×</button>
                            </CartForm>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="discount-container">
                    {!showInput ? (
                        <button type="button" onClick={() => setShowInput(true)} className="toggle-action-btn">
                            + Add discount code
                        </button>
                    ) : (
                        <CartForm route="/cart" action={CartForm.ACTIONS.DiscountCodesUpdate}>
                            <div className="discount-form page-style">
                                <input type="text" name="discountCode" placeholder="Discount code" required />
                                <button type="submit">Apply</button>
                            </div>
                        </CartForm>
                    )}
                </div>
            )}
        </div>
    );
}

function CartNote({ note }) {
    const [showNote, setShowNote] = React.useState(!!note);
    return (
        <div className="cart-note page-style">
            {!showNote ? (
                <button type="button" onClick={() => setShowNote(true)} className="toggle-action-btn">
                    + Add order note
                </button>
            ) : (
                <CartForm route="/cart" action={CartForm.ACTIONS.NoteUpdate}>
                    <div className="note-form page-style">
                        <textarea name="note" placeholder="Special instructions..." defaultValue={note} rows="3" />
                        <button type="submit">Save Note</button>
                    </div>
                </CartForm>
            )}
        </div>
    );
}
