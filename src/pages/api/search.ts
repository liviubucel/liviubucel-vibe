import type {APIRoute} from 'astro';
import {posts} from '@wix/blog';
import {getNativeProjects} from '@/lib/wix-portfolio';
export const prerender=false;
type SearchItem={title:string;excerpt:string;url:string;type:'Blog'|'Project'};
export const GET:APIRoute=async ()=>{
  let articles:SearchItem[]=[];
  let projects:SearchItem[]=[];
  let errors=0;
  try{
    const result=await posts.listPosts({paging:{limit:100}});
    articles=(result.posts||[]).filter(p=>p.slug&&p.title).map(p=>({
      title:p.title||'',excerpt:p.excerpt||'',url:'/blog/'+encodeURIComponent(p.slug||'')+'/',type:'Blog' as const
    }));
  }catch(e){errors++;console.error('[nordlys-search-blog]',e instanceof Error?e.message:'Wix Blog unavailable')}
  try{
    const found=await getNativeProjects();
    projects=found.filter(p=>(p.slug||p._id||p.id)&&p.title).map(p=>({
      title:p.title||'',excerpt:p.description||'',url:'/projects/'+encodeURIComponent(p.slug||p._id||p.id||'')+'/',type:'Project' as const
    }));
  }catch(e){errors++;console.error('[nordlys-search-projects]',e instanceof Error?e.message:'Wix Portfolio unavailable')}
  const status=errors===2?503:200;
  return new Response(JSON.stringify({items:[...articles,...projects]}),{
    status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'public, max-age=30, s-maxage=60','x-content-type-options':'nosniff'}
  });
};
