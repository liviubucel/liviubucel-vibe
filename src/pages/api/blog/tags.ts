import type {APIRoute} from 'astro';
import {tags} from '@wix/blog';

export const prerender=false;

/**
 * Nordlys tags, backed by Wix Blog's own tag taxonomy.
 * The site never invents labels and only returns publicly used tags.
 * Wix API: https://dev.wix.com/docs/api-reference/business-solutions/blog/tags/query-tags
 */
export const GET: APIRoute = async () => {
  try{
    const response=await tags.queryTags().find();
    const found=(response.items||[])
      .filter(tag=>(tag.publishedPostCount||0)>0)
      .map(tag=>({
        id:tag._id,
        label:tag.label,
        slug:tag.slug,
        publishedPostCount:tag.publishedPostCount
      }));
    return new Response(JSON.stringify({tags:found}),{
      headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=60, s-maxage=120'}
    });
  }catch(error){
    console.error('[public-blog-tags] Tags read failed',error instanceof Error?error.message:'Unknown error');
    return new Response(JSON.stringify({error:'Blog tags temporarily unavailable'}),{
      status:503,
      headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}
    });
  }
};
