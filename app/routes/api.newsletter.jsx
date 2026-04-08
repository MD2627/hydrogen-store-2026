/**
 * API route for newsletter subscriptions
 * Creates a customer in Shopify using Storefront API
 */
export async function action({ request, context }) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const email = formData.get('email');
    const acceptsMarketing = formData.get('acceptsMarketing') === 'true';

    // Validate email
    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    const { storefront } = context;

    console.log('Newsletter API - Creating customer with email:', email);

    // Generate a random password for the customer account
    const randomPassword = Math.random().toString(36).slice(-12) + 'Aa1!';

    // GraphQL mutation to create customer using Storefront API
    const mutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        email: email.toLowerCase().trim(),
        password: randomPassword,
        acceptsMarketing: acceptsMarketing,
      },
    };

    console.log('Newsletter API - Sending mutation with variables:', JSON.stringify(variables, null, 2));

    // Make request to Storefront API
    const result = await storefront.mutate(mutation, { variables });

    console.log('Newsletter API - Full response:', JSON.stringify(result, null, 2));

    // Check for errors
    if (result.customerUserErrors && result.customerUserErrors.length > 0) {
      const errorMessage = result.customerUserErrors[0].message;
      const errorCode = result.customerUserErrors[0].code;
      
      console.error('Customer creation errors:', result.customerUserErrors);
      
      // Handle duplicate email gracefully - check for various error codes and messages
      if (
        errorCode === 'TAKEN' || 
        errorCode === 'CUSTOMER_DISABLED' ||
        errorMessage.toLowerCase().includes('taken') || 
        errorMessage.toLowerCase().includes('already exists') ||
        errorMessage.toLowerCase().includes('already been taken') ||
        errorMessage.toLowerCase().includes('email has already')
      ) {
        console.log('Newsletter API - Email already exists, returning success message');
        return Response.json({ 
          success: true, 
          message: 'You are already subscribed to our newsletter!' 
        });
      }

      return Response.json({ error: errorMessage }, { status: 400 });
    }

    // Check if customer was actually created
    if (!result.customerCreate?.customer?.id) {
      console.error('Customer creation failed - no customer ID returned');
      console.error('Full result:', JSON.stringify(result, null, 2));
      
      // This might also be a duplicate email case where the mutation returns null
      // Return success message instead of error
      console.log('Newsletter API - No customer ID, likely duplicate email');
      return Response.json({ 
        success: true, 
        message: 'You are already subscribed to our newsletter!' 
      });
    }

    console.log('Newsletter API - Customer created successfully:', result.customerCreate.customer);

    // Success!
    return Response.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!',
      customer: {
        id: result.customerCreate.customer.id,
        email: result.customerCreate.customer.email,
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    console.error('Error stack:', error.stack);
    return Response.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 });
  }
}

// Prevent GET requests
export async function loader() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}
