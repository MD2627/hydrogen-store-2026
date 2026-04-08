import { useLoaderData, useNavigate } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { YouMayAlsoLikeBlog } from '~/components/YouMayAlsoLikeBlog';
/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.article.title ?? ''} article` }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context, request, params }) {
  const { blogHandle, articleHandle } = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', { status: 404 });
  }

  const [{ blog }] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: { blogHandle, articleHandle },
    }),
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(
    request,
    { handle: articleHandle, data: blog.articleByHandle },
    { handle: blogHandle, data: blog },
  );

  return {
    article: blog.articleByHandle,
    blog,
  };

}

function loadDeferredData() {
  return {};
}

export default function Article() {
  const { article, blog } = useLoaderData();
  const navigate = useNavigate();

  const { title, image, contentHtml, author, publishedAt } = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(publishedAt));

  /* 🔥 THIS IS THE FIX */
  const handleContentClick = (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Intercept internal links only
    if (href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <>
      <div className="article-wrapper">

        <div className="article">
          <h2>
            <p>{title}</p>
          </h2>

          {/* {image && <Image data={image} sizes="90vw" loading="eager" />} */}

          {/* BLOG CONTENT */}
          <div
            className="article-content"
            onClick={handleContentClick}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
        <YouMayAlsoLikeBlog blog={blog} content={ARTICLE_RELATED_CONTENT} />

      </div>
    </>
  );
}

const ARTICLE_RELATED_CONTENT = {
  title: 'You Might Also Like',
  subtitle: '',
};

/* ---------------- GRAPHQL ---------------- */

const ARTICLE_QUERY = `#graphql
      query Article(
      $articleHandle: String!
      $blogHandle: String!
      $country: CountryCode
      $language: LanguageCode
      ) @inContext(language: $language, country: $country) {
        blog(handle: $blogHandle) {
        handle

      articles(first: 12) {
        nodes {
        id
          handle
      title
      image {
        url
            altText
      width
      height
          }
        }
      }

      articleByHandle(handle: $articleHandle) {
        id
        handle
      title
      contentHtml
      publishedAt
      author: authorV2 {
        name
      }
      image {
        id
          altText
      url
      width
      height
        }
      seo {
        description
          title
        }
      }
    }
  }
      `;

/** @typedef {import('./+types/blogs.$blogHandle.$articleHandle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
