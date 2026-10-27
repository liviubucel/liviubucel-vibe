import type {APIRoute} from 'astro';
/** Wix Blog's SEO-generated RSS discovery path, resolved on Wix managed hosting. */
export const prerender=false;
export const GET:APIRoute=()=>new Response(null,{status:308,headers:{location:'/rss.xml','cache-control':'public, max-age=86400'}});
