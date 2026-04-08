import { Link, useLoaderData } from 'react-router';
import styles from '../styles/site-map.css?url';

export const links = () => [{ rel: 'stylesheet', href: styles }];

const EXCLUDED_PATHS = [
    '/cart',
    '/search',
    '/collections',
    '/blogs',
];

const EXCLUDED_PREFIXES = [
    '/account',
    '/debug',
];

function isValidPublicPage(handle) {
    if (!handle) return false;

    if (EXCLUDED_PATHS.includes(handle)) return false;

    if (EXCLUDED_PREFIXES.some((p) => handle.startsWith(p))) {
        return false;
    }

    return true;
}

export async function loader({ context }) {
    const { storefront } = context;

    const QUERY = `#graphql
      query SiteMapData {
        collections(first: 250) {
          nodes {
            title
            handle
            products(first: 250) {
              nodes {
                title
                handle
              }
            }
          }
        }
        blogs(first: 50) {
          nodes {
            title
            handle
            articles(first: 250) {
              nodes {
                title
                handle
              }
            }
          }
        }
        pages(first: 250) {
          nodes {
            title
            handle
          }
        }
      }
    `;

    const data = await storefront.query(QUERY);

    /* Hydrogen system routes */
    const modules = import.meta.glob('./*.jsx');

    const systemRoutes = Object.keys(modules)
        .map((path) => {
            let name = path.replace(/^\.\//, '').replace(/\.jsx$/, '');

            if (
                name.includes('$') ||
                name.includes('[') ||
                name.startsWith('api.')
            ) {
                return null;
            }

            if (name === '_index') return { title: 'Home', handle: '/' };

            let handle = '/' + name
                .replace(/\./g, '/')
                .replace(/\/_index$/, '')
                .replace(/_/g, '');

            const title = handle
                .split('/')
                .pop()
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase());

            return { title, handle };
        })
        .filter(Boolean);

    return {
        collections: data.collections.nodes,
        blogs: data.blogs.nodes,
        pages: data.pages.nodes,
        systemRoutes,
    };
}

export default function SiteMap() {
    const { collections, blogs, pages, systemRoutes } = useLoaderData();

    /* ---- CLEAN + DEDUPED PAGES ---- */
    const pageMap = new Map();

    [...systemRoutes, ...pages.map((p) => ({
        title: p.title,
        handle: `/${p.handle}`,
    }))].forEach((page) => {
        if (isValidPublicPage(page.handle)) {
            pageMap.set(page.handle, page);
        }
    });

    const cleanPages = Array.from(pageMap.values()).sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    return (
        <div className="site-map">
            <h2 className="page-heading-wrapper">Site Map</h2>

            {/* COLLECTIONS + PRODUCTS */}
            <div className="site-map-section">
                {collections
                    .filter((c) => c.products.nodes.length > 0)
                    .map((collection) => (
                        <div key={collection.handle} className="site-map-group">
                            <h3 className="main-heading-parent">
                                {collection.title}
                            </h3>

                            <ul>
                                {collection.products.nodes.map((product) => (
                                    <li key={product.handle}>
                                        <Link
                                            className="fancy f-13 ff-c w-300"
                                            to={`/products/${product.handle}`}
                                        >
                                            {product.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
            </div>

            {/* BLOGS + ARTICLES */}
            <div className="site-map-section">
                {blogs
                    .filter((b) => b.articles.nodes.length > 0)
                    .map((blog) => (
                        <div key={blog.handle} className="site-map-group">
                            <h3 className="main-heading-parent">
                                {blog.title}
                            </h3>

                            <ul>
                                {blog.articles.nodes.map((article) => (
                                    <li key={article.handle}>
                                        <Link
                                            className="fancy f-13 ff-c w-300"
                                            to={`/blogs/${blog.handle}/${article.handle}`}
                                        >
                                            {article.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
            </div>

            {/* PAGES */}
            <div className="site-map-section">
                <div className="site-map-group">
                    <h3 className="main-heading-parent">Pages</h3>

                    <ul>
                        {cleanPages.map((page) => (
                            <li key={page.handle}>
                                <Link
                                    className="fancy f-13 ff-c w-300"
                                    to={page.handle}
                                >
                                    {page.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
