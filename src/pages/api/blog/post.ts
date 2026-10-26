import type { APIRoute } from 'astro';
import { posts } from '@wix/blog';
export const prerender = false;

const legacySlugs: Record<string,string> = {
  'cnd-brandingul-e-mai-puternic-dect-securitatea-cum-a-fost-compromis-the-real-world-platforma-lui-andrew-tate':
    'cnd-brandingul-e-mai-puternic-dect-securitatea-cum-a-fost-compromis-the-real-world-platforma-lui-and',
  'vulnerabilitate-critic-wordpress-cve-2026-23550-permite-preluarea-complet-a-site-urilor-prin-pluginul-modular-ds':
    'vulnerabilitate-critic-wordpress-cve-2026-23550-permite-preluarea-complet-a-site-urilor-prin-pluginu',
};

/** An individual published Blog post with rich Wix content. */
export const GET: APIRoute = async ({ url }) => {
  const original = url.searchParams.get('slug') ?? '';
  const slug = legacySlugs[original] ?? original;
  if (!slug || slug.length > 256) {
    return new Response(JSON.stringify({ error: 'Invalid slug' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const list = await posts.listPosts({ paging: { limit: 100 } });
    const entry = (list.posts ?? []).find(p => p.slug === slug || p._id === slug || p.id === slug);
    if (!entry) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    const postId = entry._id || entry.id;
    if (!postId) return new Response(JSON.stringify({ error: 'Post ID missing' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    const response = await posts.getPost(postId, { fieldsets: ['RICH_CONTENT', 'URL'] });
    return new Response(JSON.stringify({ post: response.post ?? entry }), {
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=60, s-maxage=120', 'X-Content-Type-Options': 'nosniff' }
    });
  } catch (error) {
    console.error('[public-blog-post] Wix Blog read failed', error instanceof Error ? error.message : 'Unknown error');
    return new Response(JSON.stringify({ error: 'Blog post temporarily unavailable' }), {
      status: 503, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }
};
