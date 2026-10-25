import type {APIRoute} from 'astro';
import {getPublishedBlogPosts} from '@/lib/wix-blog';
export const prerender=false;
const esc=(v:string)=>v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
export const GET:APIRoute=async()=>{
  try{
    const entries=await getPublishedBlogPosts();
    const base='https://www.liviubucel.com';
    const items=entries.slice(0,100).map(p=>{
      const title=esc(p.title||'Untitled');
      const link=base+'/blog/'+encodeURIComponent(p.slug||p.id||p._id||'');
      const description=esc(p.excerpt||'');
      const date=p.firstPublishedDate?new Date(p.firstPublishedDate).toUTCString():'';
      return '<item><title>'+title+'</title><link>'+esc(link)+'</link><guid>'+esc(link)+'</guid><description>'+description+'</description>'+(date?'<pubDate>'+date+'</pubDate>':'')+'</item>';
    }).join('');
    const xml='<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Liviu Bucel — Cybersecurity Blog</title><link>'+base+'/blog</link><description>Cybersecurity research and practical security articles</description><language>en-gb</language>'+items+'</channel></rss>';
    return new Response(xml,{headers:{'Content-Type':'application/rss+xml; charset=utf-8','Cache-Control':'public, max-age=600'}});
  }catch{
    return new Response('Feed temporarily unavailable',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'}});
  }
};
