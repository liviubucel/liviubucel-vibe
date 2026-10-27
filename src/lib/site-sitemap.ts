import {posts} from '@wix/blog';
import {getNativeProjects} from '@/lib/wix-portfolio';
import {serviceOfferings} from '@/lib/professional-services';

/** Current published WIX site. Move this setting when final DNS/site cutover is verified. */
export const publishedSiteBase='https://my-site-p444dlue-zebrabyte.wix-vibe-site.com';
const staticPaths=[
  '/', '/about/','/blog/','/projects/','/tags/','/tools/','/services/',
  '/contact/','/experience/','/accreditations/','/privacy/','/search/',
  '/romania-cyber-monitor/'
];
function escapeXml(v:string){
 return v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}
export type SitemapEntry={loc:string;lastmod?:string};
function addUrl(data:Map<string,SitemapEntry>,path:string,lastmod?:string){
 const full=new URL(path,publishedSiteBase).href;
 data.set(full,{loc:full,lastmod});
}
function validMod(value:unknown){
 if(typeof value!=='string'||!value)return;
 const d=new Date(value);return Number.isNaN(d.valueOf())?undefined:d.toISOString();
}
export async function getSiteSitemap():Promise<SitemapEntry[]>{
 const entries=new Map<string,SitemapEntry>();
 for(const path of staticPaths)for(const locale of ['','/ro']){
  if(path==='/romania-cyber-monitor/'&&locale==='/ro')continue;
  addUrl(entries,locale+(path==='/'?'/':path));
 }
 for(const service of serviceOfferings){
  for(const locale of ['','/ro'])addUrl(entries,locale+'/services/'+encodeURIComponent(service.slug)+'/');
 }
 // If a backend is unavailable, fail the sitemap rather than serving an incomplete index.
 const [postResponse,projects]=await Promise.all([
   posts.listPosts({paging:{limit:100}}),getNativeProjects()
 ]);
 for(const post of postResponse.posts||[]){
  const slug=post.slug||post._id||post.id;
  if(!slug)continue;
  const path='/blog/'+encodeURIComponent(slug)+'/';
  const lastmod=validMod(post.lastPublishedDate||post.firstPublishedDate);
  addUrl(entries,path,lastmod);
  // Both language shells resolve to the same Wix Blog content as authored.
  addUrl(entries,'/ro'+path,lastmod);
 }
 for(const project of projects){
  const slug=project.slug||project._id||project.id;
  if(!slug)continue;
  const path='/projects/'+encodeURIComponent(slug)+'/';
  addUrl(entries,path);addUrl(entries,'/ro'+path);
 }
 return [...entries.values()];
}
export function sitemapXml(entries:SitemapEntry[]){
 return '<?xml version="1.0" encoding="UTF-8"?>\n'+
 '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+
 entries.map(({loc,lastmod})=>'<url><loc>'+escapeXml(loc)+'</loc>'+(lastmod?'<lastmod>'+escapeXml(lastmod)+'</lastmod>':'')+'</url>').join('\n')+
 '\n</urlset>';
}
