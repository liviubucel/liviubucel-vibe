import type {APIRoute} from 'astro';
/** Backwards-compatible feed alias to the real RSS endpoint, never React HTML. */
export const prerender=false;
export const GET:APIRoute=()=>new Response(null,{
  status:308,
  headers:{'location':'/rss.xml','cache-control':'public, max-age=86400'}
});
