import { data } from 'react-router';

/**
 * Custom Cart API Route
 * Provides direct cart access without complex Hydrogen state management
 */

/**
 * GET /api/cart - Fetch current cart
 */
export async function loader({ context }) {
    const { cart } = context;

    try {
        const cartData = await cart.get();
        return data(cartData, {
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error('Cart fetch error:', error);
        return data(
            { error: error.message, lines: [] },
            { status: 500 }
        );
    }
}

/**
 * POST /api/cart - Update cart (add, update, remove lines)
 */
export async function action({ request, context }) {
    const { cart } = context;

    try {
        let body;
        const contentType = request.headers.get('content-type');

        // Handle both JSON and form data
        if (contentType?.includes('application/json')) {
            body = await request.json();
        } else {
            // Parse form data
            const formData = await request.formData();

            // Helper to safely parse JSON
            const safeJsonParse = (value, fieldName) => {
                if (!value) return undefined;
                try {
                    return JSON.parse(value);
                } catch (error) {
                    console.error(`Failed to parse ${fieldName}:`, error);
                    throw new Error(`Invalid JSON in ${fieldName}: ${error.message}`);
                }
            };

            body = {
                action: formData.get('action'),
                lines: safeJsonParse(formData.get('lines'), 'lines'),
                lineIds: safeJsonParse(formData.get('lineIds'), 'lineIds'),
            };
        }

        const { action: cartAction, lines, lineIds } = body;

        let result;

        // Retry logic for throttling
        const performWithRetry = async (operation, maxRetries = 5) => {
            for (let attempt = 0; attempt < maxRetries; attempt++) {
                try {
                    return await operation();
                } catch (error) {
                    const isThrottled = error.message?.includes('Throttled') ||
                        error.toString().includes('Throttled');

                    if (isThrottled && attempt < maxRetries - 1) {
                        const delay = 500 * Math.pow(2, attempt);
                        console.warn(`Throttled, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
                        await new Promise(resolve => setTimeout(resolve, delay));
                        continue;
                    }
                    throw error;
                }
            }
        };

        switch (cartAction) {
            case 'addLines':
                result = await performWithRetry(() => cart.addLines(lines));
                break;

            case 'updateLines':
                result = await performWithRetry(() => cart.updateLines(lines));
                break;

            case 'removeLines':
                result = await performWithRetry(() => cart.removeLines(lineIds));
                break;

            default:
                return data({ error: 'Invalid action' }, { status: 400 });
        }

        const headers = new Headers();
        if (result?.cart?.id) {
            const cartHeaders = cart.setCartId(result.cart.id);
            cartHeaders.forEach((value, key) => {
                headers.set(key, value);
            });
        }

        return data(
            {
                cart: result.cart,
                errors: result.errors,
                warnings: result.warnings,
            },
            {
                status: 200,
                headers,
            }
        );

    } catch (error) {
        console.error('Cart action error:', error);
        return data(
            {
                error: error.message,
                cart: null,
            },
            { status: 500 }
        );
    }
}
