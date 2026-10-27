import {items} from '@wix/data';

/**
 * The official Wix Portfolio app is authoritative, read through its
 * public, native Wix App Collection (Portfolio/Projects). This avoids
 * importing @wix/portfolio, unavailable in the Vibe Vite runtime.
 *
 * Wix documentation:
 * https://dev.wix.com/docs/api-reference/business-solutions/cms/collection-management/wix-app-collections/wix-portfolio-collections
 * The collection is publicly readable; no backend secrets are used.
 */
export interface NativeProject {
  _id?:string;
  id?:string;
  title?:string;
  description?:string;
  slug?:string;
  hidden?:boolean;
  coverImage?:{imageInfo?:string|{id?:string;url?:string}};
  details?:Array<{label?:string;text?:string;link?:{text?:string;url?:string;target?:string}}>;
}
export async function getNativeProjects():Promise<NativeProject[]> {
  const result=await items.query('Portfolio/Projects').limit(100).find();
  const records=result.items as unknown as NativeProject[];
  return (records||[]).filter(item=>!item.hidden).map(item=>({...item,id:item.id||item._id}));
}
export async function getNativeProject(idOrSlug:string):Promise<NativeProject|undefined> {
  const all=await getNativeProjects();
  return all.find(project=>project._id===idOrSlug||project.id===idOrSlug||project.slug===idOrSlug);
}
export function projectExternalLink(project:NativeProject):string|undefined {
  return project.details?.map(item=>item.link?.url).find(link=>!!link&&link.startsWith('https://'));
}
export function projectTechnologies(project:NativeProject):string|undefined {
  return project.details?.find(item=>item.label==='Technologies')?.text;
}

/** Resolve Wix Media Manager references to actual Wix CDN image URLs. */
export function wixPortfolioImageUrl(imageInfo:unknown):string|undefined {
  if(typeof imageInfo==='object' && imageInfo!==null){
    const data=imageInfo as {url?:unknown;id?:unknown};
    if(typeof data.url==='string' && data.url.startsWith('https://static.wixstatic.com/media/'))return data.url;
    if(typeof data.id==='string')imageInfo='wix:image://v1/'+data.id;
  }
  if(typeof imageInfo!=='string')return undefined;
  const match=/^wix:image:\/\/v1\/([^\/#?]+)/.exec(imageInfo);
  const id=match?.[1];
  return id&&/^[a-zA-Z0-9_-]+~mv2\.(?:png|jpe?g|webp|avif|gif)$/i.test(id)
    ?'https://static.wixstatic.com/media/'+id
    :undefined;
}
export const projectCoverUrl=(project:NativeProject):string|undefined=>
  wixPortfolioImageUrl(project.coverImage?.imageInfo);

export interface NativeProjectPhoto {
  id:string;url:string;title:string;description:string;sortOrder:number;
}
/**
 * Three verified SSL Generator gallery items from native Wix Portfolio.
 * The current public Wix Data collection omits the project-reference field;
 * use verified item IDs rather than mixing photographs from other projects.
 * Updating existing photos in Wix Portfolio changes what the site displays.
 */
const verifiedProjectGalleryIds:Record<string,string[]>={
  'ssl-certificate-generator-acme-automation-tool':[
    '87b2dbb2-8af5-488a-991a-3e5010b303d9',
    '167eca22-4d88-4083-b7ad-5b4059e49852',
    '8d846d7f-0a0e-425e-af76-461f5502b5f5'
  ]
};
export async function getNativeProjectGallery(slug:string):Promise<NativeProjectPhoto[]> {
  const ids=verifiedProjectGalleryIds[slug];
  if(!ids?.length)return [];
  const response=await items.query('Portfolio/ProjectItems').limit(100).find();
  return (response.items||[]).flatMap(row=>{
    const r=row as unknown as {id?:string;_id?:string;image?:{imageInfo?:unknown};title?:string;description?:string;sortOrder?:number;type?:string};
    const id=r.id||r._id||'';
    const url=wixPortfolioImageUrl(r.image?.imageInfo);
    return ids.includes(id)&&url&&r.type==='IMAGE'?[{
      id,url,title:r.title||'Original project image',description:r.description||'',sortOrder:r.sortOrder||0
    }]:[];
  }).sort((a,b)=>a.sortOrder-b.sortOrder);
}
