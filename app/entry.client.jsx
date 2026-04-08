// Prevent Shopify object redefinition error during HMR
// This must run before any Hydrogen imports
if (typeof window !== 'undefined') {
  const originalDefineProperty = Object.defineProperty;
  Object.defineProperty = function(obj, prop, descriptor) {
    if (obj === window && prop === 'Shopify') {
      // Check if Shopify already exists
      if (window.Shopify) {
        // Just update the existing property instead of redefining
        window.Shopify = descriptor.value || window.Shopify;
        return window;
      }
      // If it doesn't exist, make it configurable so it can be updated later
      descriptor = { ...descriptor, configurable: true };
    }
    return originalDefineProperty.call(this, obj, prop, descriptor);
  };
}

import {HydratedRouter} from 'react-router/dom';
import {startTransition, StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import {NonceProvider} from '@shopify/hydrogen';

if (!window.location.origin.includes('webcache.googleusercontent.com')) {
  startTransition(() => {
    // Extract nonce from existing script tags
    const existingNonce = document.querySelector('script[nonce]')?.nonce;

    hydrateRoot(
      document,
      <StrictMode>
        <NonceProvider value={existingNonce}>
          <HydratedRouter />
        </NonceProvider>
      </StrictMode>,
    );
  });
}
