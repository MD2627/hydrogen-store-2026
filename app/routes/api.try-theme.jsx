export async function action({ request, context }) {
  const { storefront, env, session } = context;

  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const firstName = formData.get('first_name');
    const email = formData.get('email');
    const formId = formData.get('form_id') || 'try_theme';

    if (!firstName || !email) {
      return Response.json({ error: 'Please provide both first name and email' }, { status: 400 });
    }

    const submissionId = `TRY-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const submittedAt = new Date().toISOString();

    // Try to get customer ID if logged in
    let customerId = null;
    if (session) {
      const customerAccessToken = await session.get('customerAccessToken');
      if (customerAccessToken) {
        // In a real scenario, fetch the customer GID here.
        // For now, we'll keep it null.
      }
    }

    // 1. ATTEMPT TO USE ADMIN API FOR METAOBJECT
    const adminApiToken = env?.SHOPIFY_ADMIN_API_TOKEN;

    if (adminApiToken && env?.PUBLIC_STORE_DOMAIN) {
      const shopDomain = env.PUBLIC_STORE_DOMAIN;
      const adminApiUrl = `https://${shopDomain}/admin/api/2024-01/graphql.json`;

      const metaobjectMutation = `
        mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
          metaobjectCreate(metaobject: $metaobject) {
            metaobject { id handle }
            userErrors { field message }
          }
        }
      `;

      const metaobjectFields = [
        { key: 'first_name', value: String(firstName) },
        { key: 'email', value: String(email) },
        { key: 'submitted_at', value: submittedAt },
        { key: 'form_id', value: String(formId) },
        { key: 'submission_id', value: submissionId },
      ];

      // Only add submitted_by if we have a valid customer GID
      if (customerId) {
        metaobjectFields.push({ key: 'submitted_by', value: customerId });
      }

      try {
        const adminResponse = await fetch(adminApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': adminApiToken,
          },
          body: JSON.stringify({
            query: metaobjectMutation,
            variables: {
              metaobject: {
                type: 'try_theme',
                fields: metaobjectFields,
              },
            },
          }),
        });

        const adminResult = await adminResponse.json();
        const userErrors = adminResult.data?.metaobjectCreate?.userErrors;

        if (!adminResult.errors && (!userErrors || userErrors.length === 0)) {
          return Response.json({ success: true, submissionId });
        }

        console.error(
          'Admin API Metaobject Error:',
          JSON.stringify(adminResult.errors || userErrors, null, 2),
        );
      } catch (adminErr) {
        console.error('Admin API Fetch Error:', adminErr);
        // Continue to fallback
      }
    }

    // 2. FALLBACK: USE STOREFRONT API (Customer Create)
    // Pack all info into the lastName field as a reliable fallback
    let formattedLastName = `Try Theme | ID:${submissionId} | Form:${formId} | ${submittedAt}`;
    if (formattedLastName.length > 255) {
      formattedLastName = formattedLastName.slice(0, 255);
    }

    // NOTE: Do NOT use #graphql tag here — storefront.mutate handles it differently
    const mutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer { id email }
          customerUserErrors { field message code }
        }
      }
    `;

    const variables = {
      input: {
        firstName: String(firstName),
        lastName: formattedLastName,
        email: email.toLowerCase().trim(),
        password: Math.random().toString(36).slice(-12) + 'Aa1!',
        acceptsMarketing: true,
      },
    };

    const result = await storefront.mutate(mutation, { variables });

    // Check user errors — in storefront.mutate result, the data is unwrapped one level
    const customerErrors = result.customerCreate?.customerUserErrors;

    if (customerErrors && customerErrors.length > 0) {
      const firstError = customerErrors[0];

      // Email already taken = user already exists → treat as success
      if (
        firstError.code === 'TAKEN' ||
        firstError.message.toLowerCase().includes('taken') ||
        firstError.message.toLowerCase().includes('exists') ||
        firstError.message.toLowerCase().includes('already')
      ) {
        return Response.json({ success: true, submissionId });
      }

      return Response.json({ success: false, error: firstError.message }, { status: 400 });
    }

    return Response.json({ success: true, submissionId });

  } catch (error) {
    console.error('Try Theme Form API Error:', error);
    return Response.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}

export async function loader() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}
