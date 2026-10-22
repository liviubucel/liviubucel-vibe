import type { APIRoute } from 'astro';
import { projects } from '@wix/portfolio';
import { auth } from '@wix/essentials';

/**
 * Read-only public projection of native Wix Portfolio.
 * Elevation is server-side only; don't allow visitors to list hidden projects or modify content.
 * The frontend calls this endpoint when browser-level Wix Portfolio read permissions are unavailable.
 */
export const GET: APIRoute = async () => {
  try {
    const listProjects = auth.elevate(projects.listProjects);
    const result = await listProjects({ paging: { limit: 100 } });
    const data = (result.projects || [])
      .filter(p => !p.hidden)
      .map(p => ({
        id: p._id || (p as {id?:string}).id,
        title: p.title,
        description: p.description,
        slug: p.slug,
        details: p.details
      }));
    return new Response(JSON.stringify({projects:data}),{
      status:200,
      headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=120, stale-while-revalidate=300'}
    });
  } catch (error) {
    console.error('Native portfolio query unavailable',error);
    return new Response(JSON.stringify({error:'Portfolio temporarily unavailable'}),{
      status:503,
      headers:{'Content-Type':'application/json','Cache-Control':'no-store'}
    });
  }
};
