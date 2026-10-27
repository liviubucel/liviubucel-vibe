import type {APIRoute} from 'astro';
import {publishedSiteBase} from '@/lib/site-sitemap';
export const prerender=false;
export const GET:APIRoute=async()=>{
  const sitemap=new URL('/liviubucel-pages.xml',publishedSiteBase).href;
  const xml='<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>'+sitemap+'</loc></sitemap></sitemapindex>';
  return new Response(xml,{headers:{
    'content-type':'application/xml; charset=utf-8',
    'cache-control':'public, max-age=600, s-maxage=1800',
    'x-content-type-options':'nosniff'
  }});
};
