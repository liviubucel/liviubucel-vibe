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
