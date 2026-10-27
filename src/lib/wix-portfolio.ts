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
  coverImage?:{imageInfo?:string|{id?:string;url?:string;altText?:string}};
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

/**
 * Wix Portfolio/Projects exposes coverImage.imageInfo as a wix:image:// URI,
 * unlike the REST Projects API which returns a nested Image object.
 * This converts the public Wix-managed media reference only; no external
 * hotlinks, data copies, user input or synthetic marketing imagery.
 */
export function wixPortfolioImageUrl(media: unknown): string | undefined {
  let value: unknown = media;
  if (value && typeof value === 'object') {
    const outer = value as {imageInfo?:unknown;url?:unknown;id?:unknown};
    value = outer.imageInfo ?? outer.url ?? outer.id;
    if (value && typeof value === 'object') {
      const image = value as {url?:unknown;id?:unknown};
      value = image.url ?? image.id;
    }
  }
  if (typeof value !== 'string') return undefined;
  if (value.startsWith('https://static.wixstatic.com/media/')) {
    try {
      const parsed = new URL(value);
      if (parsed.hostname === 'static.wixstatic.com' && parsed.pathname.startsWith('/media/'))
        return parsed.toString();
    } catch { /* malformed input: do not generate an image */ }
    return undefined;
  }
  const mediaId = /^wix:image:\/\/v1\/([a-z0-9_~.-]+)(?:\/|#|$)/i.exec(value)?.[1]
    ?? (/^[a-z0-9]+_[a-z0-9]+~mv2\.(?:png|jpg|jpeg|webp)$/i.test(value) ? value : undefined);
  return mediaId ? 'https://static.wixstatic.com/media/' + encodeURIComponent(mediaId) : undefined;
}
export function projectCoverUrl(project: NativeProject): string | undefined {
  return wixPortfolioImageUrl(project.coverImage);
}

/**
 * Wix's Portfolio/ProjectItems CMS projection currently omits its documented
 * 'project' relationship: `eq('project', projectId)` returns zero rows even
 * for an existing project. To avoid showing another project's photographs,
 * store the exact native Project Item IDs that were created for SSL Generator.
 * Image, title, order and alt source are still read live from native Wix CMS;
 * no binary files are bundled in the app.
 *
 * IDs were cross-checked against Wix Portfolio Project Items REST on 27 Oct.
 */
const verifiedProjectItemIds: Record<string,readonly string[]> = {
  'da19f867-bb22-45ca-befb-1b4eb2d9696c': [
    '87b2dbb2-8af5-488a-991a-3e5010b303d9',
    '167eca22-4d88-4083-b7ad-5b4059e49852',
    '8d846d7f-0a0e-425e-af76-461f5502b5f5'
  ]
};
export interface NativeProjectGalleryItem {
  _id?:string;
  type?:string;
  title?:string;
  description?:string;
  sortOrder?:number;
  image?:{imageInfo?:string|{id?:string;url?:string;altText?:string}};
}
export async function getNativeProjectGallery(project:NativeProject):Promise<NativeProjectGalleryItem[]> {
  const projectId = project.id || project._id;
  const allowlist = projectId ? verifiedProjectItemIds[projectId] : undefined;
  if (!allowlist?.length) return [];
  const result = await items.query('Portfolio/ProjectItems')
    .hasSome('_id',[...allowlist]).limit(100).find();
  return (result.items as unknown as NativeProjectGalleryItem[])
    .filter(item => item._id && allowlist.includes(item._id)
      && item.type === 'IMAGE' && wixPortfolioImageUrl(item.image))
    .sort((a,b) => (a.sortOrder??0)-(b.sortOrder??0));
}
