import type { APIRoute } from 'astro';
import { posts } from '@wix/blog';
export const prerender = false;

/** Native Wix Blog public posts, proxied through Wix-managed Astro to avoid
 * the Wix preview-domain CORS mismatch on edge.wixapis.com.
 * Only published posts are returned. No tokens/credentials go to visitors.
 */
export const GET: APIRoute = async () => {
  try {
    const result = await posts.listPosts({ paging: { limit: 100 } });
    return new Response(JSON.stringify({ posts: result.posts ?? [] }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=120',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (error) {
    console.error('[public-blog-posts] Wix Blog list failed', error instanceof Error ? error.message : 'Unknown error');
    return new Response(JSON.stringify({ error: 'Blog temporarily unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }
};
