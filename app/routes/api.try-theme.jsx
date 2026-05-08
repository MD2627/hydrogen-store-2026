export async function action({ request, context }) {
  const { storefront, env } = context;

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

    // Shopify date metafields require "YYYY-MM-DD" — NOT a full ISO timestamp
    const now = new Date();
    const submittedAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    console.log('=== TRY THEME SUBMISSION ===');
    console.log('firstName:', firstName);
    console.log('email:', email);
    console.log('formId:', formId);
    console.log('submissionId:', submissionId);
    console.log('submittedAt:', submittedAt);

    // 1. ATTEMPT TO USE ADMIN API FOR METAOBJECT
    const adminApiToken = env?.SHOPIFY_ADMIN_API_TOKEN || env?.PRIVATE_STOREFRONT_API_TOKEN;
    const shopDomain = env?.PUBLIC_STORE_DOMAIN?.replace(/\/$/, '');

    console.log('adminApiToken present:', !!adminApiToken);
    console.log('shopDomain:', shopDomain);

    if (adminApiToken && shopDomain) {
      const adminApiUrl = `https://${shopDomain}/admin/api/2024-01/graphql.json`;

      const metaobjectMutation = `
        mutation UpsertMetaobject($handle: MetaobjectHandleInput!, $metaobject: MetaobjectUpsertInput!) {
          metaobjectUpsert(handle: $handle, metaobject: $metaobject) {
            metaobject {
              id
              handle
            }
            userErrors {
              field
              message
            }
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

      console.log('metaobjectFields:', JSON.stringify(metaobjectFields, null, 2));

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
              handle: {
                type: 'try_theme',
                handle: submissionId.toLowerCase()
              },
              metaobject: {
                fields: metaobjectFields,
              },
            },
          }),
        });

        console.log('Admin API HTTP status:', adminResponse.status);

        const rawText = await adminResponse.text();
        console.log('Admin API raw response:', rawText);

        let adminResult;
        try {
          adminResult = JSON.parse(rawText);
        } catch (parseErr) {
          console.error('Failed to parse Admin API response as JSON');
          throw new Error('Admin API returned non-JSON response');
        }

        const userErrors = adminResult.data?.metaobjectUpsert?.userErrors;
        const createdMetaobject = adminResult.data?.metaobjectUpsert?.metaobject;

        console.log('userErrors:', JSON.stringify(userErrors, null, 2));
        console.log('createdMetaobject:', JSON.stringify(createdMetaobject, null, 2));
        console.log('top-level errors:', JSON.stringify(adminResult.errors, null, 2));

        if (
          !adminResult.errors &&
          (!userErrors || userErrors.length === 0) &&
          createdMetaobject?.id
        ) {
          console.log('✅ Metaobject upserted successfully:', createdMetaobject.id);
          return Response.json({ success: true, submissionId });
        }

        console.error(
          '❌ Admin API Metaobject Error:',
          JSON.stringify(adminResult.errors || userErrors, null, 2),
        );
      } catch (adminErr) {
        console.error('❌ Admin API Fetch Error:', adminErr.message);
        // Continue to fallback
      }
    } else {
      console.warn('⚠️ Skipping Admin API: SHOPIFY_ADMIN_API_TOKEN/PRIVATE_STOREFRONT_API_TOKEN or PUBLIC_STORE_DOMAIN is missing');
    }

    // 2. FALLBACK: USE STOREFRONT API (Customer Create)
    console.log('Falling back to Storefront API customer creation...');
    let formattedLastName = `Try Theme | ID:${submissionId} | Form:${formId} | ${submittedAt}`;
    if (formattedLastName.length > 255) {
      formattedLastName = formattedLastName.slice(0, 255);
    }

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
    console.log('Storefront mutate result:', JSON.stringify(result, null, 2));

    const customerErrors = result.customerCreate?.customerUserErrors;

    if (customerErrors && customerErrors.length > 0) {
      const firstError = customerErrors[0];

      // Email already taken = treat as success
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
    console.error('Try Theme Form API Error:', error.message);
    return Response.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}

export async function loader() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}
