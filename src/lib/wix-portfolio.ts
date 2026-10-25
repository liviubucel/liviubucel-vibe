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
