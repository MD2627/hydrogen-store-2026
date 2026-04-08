import { data } from 'react-router';
import { useLoaderData } from 'react-router';

export async function loader({ context }) {
    const { cart } = context;

    try {
        const cartData = await cart.get();

        return data({
            cart: cartData,
            rawData: JSON.stringify(cartData, null, 2)
        });
    } catch (error) {
        return data({
            error: error.message,
            stack: error.stack
        });
    }
}

export default function DebugCart() {
    const data = useLoaderData();

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>Cart Debug</h1>

            {data.error ? (
                <div style={{ color: 'red' }}>
                    <h2>Error:</h2>
                    <pre>{data.error}</pre>
                    <pre>{data.stack}</pre>
                </div>
            ) : (
                <>
                    <h2>Cart Data:</h2>
                    <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
                        {data.rawData}
                    </pre>

                    <h2>Quick Stats:</h2>
                    <ul>
                        <li>Cart ID: {data.cart?.id}</li>
                        <li>Total Quantity: {data.cart?.totalQuantity}</li>
                        <li>Lines Count: {data.cart?.lines?.nodes?.length || 0}</li>
                    </ul>

                    <h2>Line Items:</h2>
                    {data.cart?.lines?.nodes?.map((line, index) => (
                        <div key={line.id} style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0' }}>
                            <h3>Line {index + 1}</h3>
                            <ul>
                                <li>ID: {line.id}</li>
                                <li>Quantity: {line.quantity}</li>
                                <li>Merchandise ID: {line.merchandise?.id}</li>
                                <li>Product: {line.merchandise?.product?.title}</li>
                                <li>Price: {line.merchandise?.price?.amount} {line.merchandise?.price?.currencyCode}</li>
                                <li>Total: {line.cost?.totalAmount?.amount} {line.cost?.totalAmount?.currencyCode}</li>
                            </ul>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
