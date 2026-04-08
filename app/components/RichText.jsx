import { useNavigate } from 'react-router';
import { useCallback } from 'react';

/**
 * RichText component renders HTML and intercepts internal links
 * to perform client-side navigation instead of full page reloads.
 * 
 * @param {{
 *   html: string;
 *   className?: string;
 *   tag?: string;
 * }}
 */
export function RichText({ html, className = '', tag: Tag = 'div' }) {
  const navigate = useNavigate();

  const handleLinkClick = useCallback((event) => {
    // Find closest anchor tag
    const anchor = event.target.closest('a');
    
    // If we clicked a link
    if (anchor) {
      const href = anchor.getAttribute('href');
      const target = anchor.getAttribute('target');

      // Check if it's an internal link
      // 1. Starts with / (but not //)
      // 2. Not an external URL (http/https) unless it's the same domain
      // 3. Doesn't have a target="_blank"
      // 4. Not a download link
      const isInternal = 
        href && 
        href.startsWith('/') && 
        !href.startsWith('//') && 
        (!target || target === '_self');

      if (isInternal) {
        event.preventDefault();
        navigate(href);
      }
    }
  }, [navigate]);

  if (!html) return null;

  return (
    <Tag 
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={handleLinkClick}
    />
  );
}
