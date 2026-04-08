/**
 * API endpoint to fetch menu data from Shopify
 * GET /api/menus?handles=quick-links,about-us,client-care
 */
export async function loader({ request, context }) {
  // Only allow GET requests
  if (request.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const url = new URL(request.url);
  const handlesParam = url.searchParams.get('handles');
  
  if (!handlesParam) {
    return Response.json({ error: 'Missing handles parameter' }, { status: 400 });
  }

  const handles = handlesParam.split(',').map(h => h.trim());
  
  try {
    const { storefront } = context;
    
    // Fetch each menu by handle
    const menuPromises = handles.map(handle =>
      storefront.query(GET_MENU_QUERY, {
        variables: { handle },
        cache: storefront.CacheLong(),
      })
    );

    const results = await Promise.all(menuPromises);
    
    // Transform results into a more usable format
    const menus = {};
    handles.forEach((handle, index) => {
      const menuData = results[index]?.menu;
      if (menuData) {
        console.log(`Menu "${handle}":`, JSON.stringify(menuData, null, 2));
      }
      menus[handle] = menuData || null;
    });

    return Response.json({ menus });
  } catch (error) {
    console.error('Error fetching menus:', error);
    return Response.json(
      { error: 'Failed to fetch menus', message: error.message },
      { status: 500 }
    );
  }
}

const GET_MENU_QUERY = `#graphql
  query GetMenu($handle: String!) {
    menu(handle: $handle) {
      id
      title
      items {
        id
        resourceId
        tags
        title
        type
        url
      }
    }
  }
`;
