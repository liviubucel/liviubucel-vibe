import type {APIRoute} from 'astro';
import {getSiteSitemap,sitemapXml} from '@/lib/site-sitemap';
export const prerender=false;
export const GET:APIRoute=async()=>{
  try{
    const rows=await getSiteSitemap();
    return new Response(sitemapXml(rows),{status:200,headers:{
      'content-type':'application/xml; charset=utf-8',
      'cache-control':'public, max-age=600, s-maxage=1800',
      'x-content-type-options':'nosniff'
    }});
  }catch(error){
    console.error('[nordlys-sitemap]',error instanceof Error?error.message:'Upstream unavailable');
    return new Response('Sitemap temporarily unavailable',{status:503,headers:{'content-type':'text/plain; charset=utf-8','cache-control':'no-store'}});
  }
};
