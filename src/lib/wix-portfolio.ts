import { projects } from '@wix/portfolio';

/** Source of truth: native Wix Portfolio, managed in the Wix site dashboard. */
export interface NativeProject {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  slug?: string;
  hidden?: boolean;
  details?: Array<{label?: string; text?: string; link?: {text?: string; url?: string; target?: string}}>;
}
export async function getNativeProjects(): Promise<NativeProject[]> {
  // Portfolio read is privileged on some Wix site plans; use a server-side
  // projection of *published* projects, not a public elevated client token.
  const response = await fetch('/api/native-projects.json', { headers: {Accept:'application/json'} });
  if (response.ok) {
    const result = await response.json() as {projects: NativeProject[]};
    return result.projects || [];
  }
  // Wix Vibe preview can route differently than the published Astro site.
  // Native Wix SDK remains the same source of truth for both execution paths.
  const sdkResponse = await projects.listProjects({paging:{limit:100}});
  return (sdkResponse.projects || []).filter(project=>!project.hidden) as NativeProject[];
}
export async function getNativeProject(idOrSlug: string): Promise<NativeProject | undefined> {
  const all = await getNativeProjects();
  return all.find(item => item.slug === idOrSlug || item._id === idOrSlug || item.id === idOrSlug);
}
export function projectExternalLink(project: NativeProject): string | undefined {
  return project.details?.map(x=>x.link?.url).find(x=>!!x && /^https:\/\//.test(x));
}
export function projectTechnologies(project:NativeProject):string | undefined {
  return project.details?.find(x=>x.label === 'Technologies')?.text;
}
