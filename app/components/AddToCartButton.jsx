import { CartForm } from '@shopify/hydrogen';
import { useEffect, useState, useRef } from 'react';
import { useAside } from './Aside';
import { useNavigate } from 'react-router';

// Spinner component for loading state
function Spinner() {
  return (
    <svg
      className="add-to-cart-spinner"
      width="20"
      height="20"
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

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className,
  redirectToCart = false,
}) {
  return (
    <CartForm
      route="/cart"
      inputs={{ lines }}
      action={CartForm.ACTIONS.LinesAdd}
    >
      {(fetcher) => (
        <AddToCartButtonContent
          fetcher={fetcher}
          onClick={onClick}
          className={className}
          disabled={disabled}
          redirectToCart={redirectToCart}
        >
          {children}
        </AddToCartButtonContent>
      )}
    </CartForm>
  );
}

function AddToCartButtonContent({ fetcher, onClick, className, disabled, children, redirectToCart }) {
  const { open, close } = useAside();
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  // Track if we have submitted the form
  const hasSubmitted = useRef(false);

  useEffect(() => {
    // 1. Detect when submission starts
    if (isAdding && fetcher.state === 'submitting') {
      hasSubmitted.current = true;
    }

    // 2. Detect when submission finishes (state back to idle OR we have data)
    // We check hasSubmitted to ensure we only react to *our* submission finishing
    if (isAdding && hasSubmitted.current && fetcher.state === 'idle') {

      const errors = fetcher.data?.errors || [];
      const warnings = fetcher.data?.warnings || [];

      if (errors.length || warnings.length) {
        console.error('Add to cart failed/warning', errors, warnings);
        setIsAdding(false);
        hasSubmitted.current = false;
        close();
        return;
      }

      // Success path
      setIsAdding(false);
      hasSubmitted.current = false;

      if (typeof window !== 'undefined') {
        if (redirectToCart) {
          navigate('/cart');
        } else {
          open('cart');
          window.dispatchEvent(new CustomEvent('cart-item-added', {
            detail: fetcher.data?.cart
          }));
        }
      }
    }
  }, [fetcher.state, fetcher.data, isAdding]);

  return (
    <button
      className={className}
      type="submit"
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
        setIsAdding(true);
      }}
      disabled={disabled ?? isAdding}
      aria-label="Add to cart"
    >
      {isAdding ? <Spinner /> : children}
    </button>
  );
}