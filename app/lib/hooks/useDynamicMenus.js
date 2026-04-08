import { useEffect, useState } from 'react';

/**
 * Hook to fetch menus dynamically from the menus API endpoint
 * @param {string[]} menuHandles - Array of menu handles to fetch
 * @returns {{menus: Object, loading: boolean, error: string|null}}
 */
export function useDynamicMenus(menuHandles) {
  const [menus, setMenus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!menuHandles || menuHandles.length === 0) {
      setLoading(false);
      return;
    }

    const fetchMenus = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const handlesQuery = menuHandles.join(',');
        const response = await fetch(`/api/menus?handles=${encodeURIComponent(handlesQuery)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch menus: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setMenus(data.menus || {});
      } catch (err) {
        console.error('Error fetching menus:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [menuHandles?.join(',')]);

  return { menus, loading, error };
}
