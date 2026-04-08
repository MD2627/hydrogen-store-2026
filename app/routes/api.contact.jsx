/**
 * Handle POST request from the contact form
 * This is the simplest, most stable version of the code.
 * It combines all data into the lastName to ensure it works every time.
 */
export async function action({ request, context }) {
  const { storefront } = context;

  try {
    const body = await request.json();
    const formType = body.formType || 'default';

    let formattedLastName;

    /* ==========FEEDBACK FORM========== */
    if (formType === 'feedback') {
      formattedLastName = `
      Feedback Form
      Name: ${body.name || 'Anonymous'}
      Email: ${body.email || 'Not provided'}
      Interaction Type: ${body.interactionType || 'Other'}
      Wants Response: ${body.wantResponse ? 'Yes' : 'No'}
      Feedback:
      ${body.feedback}
      `.trim();
    }

    /* ==========COMING SOON FORM========== */
    else if (formType === 'coming_soon') {
      formattedLastName = `
      Coming Soon Notification
      First Name: ${body.firstName}
      Last Name: ${body.lastName}
      City: ${body.city || 'N/A'}
      Phone: ${body.phone || 'N/A'}
      Marketing: ${body.subscribe ? 'Yes' : 'No'}
      `.trim();
    }

    /* ==========NEW CONTACT BIG FORM========== */
    else if (body.address || body.city || body.country) {
      formattedLastName = `
      Ring Size Contact Form
      First Name: ${body.firstName}
      Last Name: ${body.lastName}
      Phone: ${body.phone || 'N/A'}
      Interested Stones: ${(body.stones || []).join(', ') || 'None'}
      Address: ${body.address || ''}, ${body.city || ''}
      ${body.province || ''}, ${body.country || ''} ${body.postcode || ''}
      Message: ${body.message || 'None'}
      `.trim();
    }

    /* ==========GRADUATION CONTACT FORM========== */
    else if (body.institutionName) {
      const rings = body.productDetails?.rings || {};
      const necklaces = body.productDetails?.necklaces || {};

      formattedLastName = `
      Graduation Form
      Last Name: ${body.lastName}
      Phone: ${body.phone || 'N/A'}
      Institution: ${body.institutionName}
      Rings: SS:${rings.sterlingSilver || 0}, YG:${rings.yellowGold || 0}, WG:${rings.whiteGold || 0}, RG:${rings.roseGold || 0}
      Necklaces: SS:${necklaces.sterlingSilver || 0}, YG:${necklaces.yellowGold || 0}, WG:${necklaces.whiteGold || 0}, RG:${necklaces.roseGold || 0}
      Message: ${body.message || 'None'}
      `.trim();
    }

    /* ==========DEFAULT CFONTACT FORM========== */
    else {
      formattedLastName = `
      Contact Form
      First Name: ${body.firstName}
      Last Name: ${body.lastName}
      Phone: ${body.phone || 'N/A'}
      Stones: ${(body.stones || []).join(', ') || 'None'}
      Centre Stone Type: ${body.centreStoneType || 'None'}
      Message: ${body.message || 'None'}
      `.trim();
    }

    if (formattedLastName.length > 255) {
      formattedLastName = formattedLastName.slice(0, 255);
    }

    const mutation = `#graphql
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer { id email }
          customerUserErrors { field message }
        }
      }
    `;

    const variables = {
      input: {
        firstName: body.firstName || body.name || 'Feedback',
        lastName: formattedLastName,
        email: body.email ? body.email.toLowerCase().trim() : undefined,
        password: Math.random().toString(36).slice(-12) + 'Aa1!',
        acceptsMarketing: body.subscribe === true,
      },
    };

    const result = await storefront.mutate(mutation, { variables });

    if (result.customerCreate?.customerUserErrors?.length) {
      const error = result.customerCreate.customerUserErrors[0];

      if (
        error.message.toLowerCase().includes('taken') ||
        error.message.toLowerCase().includes('exists')
      ) {
        return Response.json({ success: true });
      }

      return Response.json({ success: false, error: error.message }, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Contact Form API Error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function loader() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}
