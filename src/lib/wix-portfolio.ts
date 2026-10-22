import { BaseCrudService } from '@/integrations';
import type { Proiecte } from '@/entities';

/**
 * Wix Vibe bridge for the four verified portfolio projects.
 *
 * The official Wix Portfolio app is installed, with the four source projects imported.
 * Wix Vibe's remote Vite runtime currently fails with HTTP 500 for an import of
 * '@wix/portfolio' (unavailable in its installed module graph).
 *
 * This conservative READ-ONLY fallback uses the previously migrated Wix CMS mirror
 * until the managed Vibe runtime supplies the @wix/portfolio SDK. It does not write
 * to CMS or replace native Wix Portfolio for editorial management.
 * Changes to the native Portfolio must be resynced with this legacy mirror before
 * this fallback will reflect them; don't mistake it for live native integration.
 */
export interface NativeProject {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  slug?: string;
  hidden?: boolean;
  details?: Array<{label?:string; text?:string; link?:{text?:string;url?:string;target?:string}}>;
}
export async function getNativeProjects(): Promise<NativeProject[]> {
  const result = await BaseCrudService.getAll<Proiecte>('proiecte', [], {limit: 100});
  return (result.items || []).map((item):NativeProject => ({
    _id: item._id,
    id: item._id,
    title: item.projectTitle,
    description: item.detailedDescription,
    details: [
      {label:'Technologies',text:item.technologiesUsed},
      ...(item.projectLink?.startsWith('https://') ? [{label:'Project link',link:{text:'Open source project',url:item.projectLink,target:'_blank'}}] : [])
    ]
  }));
}
export async function getNativeProject(idOrSlug:string):Promise<NativeProject | undefined> {
  const all = await getNativeProjects();
  return all.find(project => project.id === idOrSlug || project._id === idOrSlug || project.slug === idOrSlug);
}
export function projectExternalLink(project:NativeProject):string|undefined {
  return project.details?.map(item=>item.link?.url).find(link=>!!link && /^https:\/\//.test(link));
}
export function projectTechnologies(project:NativeProject):string|undefined {
  return project.details?.find(item=>item.label==='Technologies')?.text;
}
