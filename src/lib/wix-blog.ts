
/** Official Wix Blog is the single source for all published articles. */
export interface NativeBlogPost {
  _id?: string;
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  firstPublishedDate?: string | Date;
  language?: string;
  richContent?: { nodes?: RichNode[] };
  contentText?: string;
  minutesToRead?: number;
  tagIds?: string[];
}
export interface RichNode {
  type: string;
  id?: string;
  nodes?: RichNode[];
  textData?: { text?: string; decorations?: Array<{type?:string;linkData?:{link?:{url?:string}}}> };
  headingData?: { level?: number };
  imageData?: { altText?: string; image?: { src?: { url?: string; id?: string } } };
}

export const legacySlugs: Record<string,string> = {
  'cnd-brandingul-e-mai-puternic-dect-securitatea-cum-a-fost-compromis-the-real-world-platforma-lui-andrew-tate':
    'cnd-brandingul-e-mai-puternic-dect-securitatea-cum-a-fost-compromis-the-real-world-platforma-lui-and',
  'vulnerabilitate-critic-wordpress-cve-2026-23550-permite-preluarea-complet-a-site-urilor-prin-pluginul-modular-ds':
    'vulnerabilitate-critic-wordpress-cve-2026-23550-permite-preluarea-complet-a-site-urilor-prin-pluginu',
};

/** Published content comes from the official Wix Blog SDK via our
 * Wix-hosted same-origin Astro endpoint; never access Wix auth in the browser.
 */
export async function getPublishedBlogPosts(): Promise<NativeBlogPost[]> {
  const response = await fetch('/api/blog/posts', { credentials: 'same-origin' });
  if (!response.ok) throw new Error('Wix Blog posts request failed (' + response.status + ')');
  const data = await response.json() as { posts?: NativeBlogPost[] };
  return data.posts ?? [];
}

export async function getPublishedBlogPost(slugOrId: string): Promise<NativeBlogPost | undefined> {
  const resolvedSlug = legacySlugs[slugOrId] || slugOrId;
  const response = await fetch('/api/blog/post?slug='+encodeURIComponent(resolvedSlug), { credentials: 'same-origin' });
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error('Wix Blog post request failed (' + response.status + ')');
  const data = await response.json() as { post?: NativeBlogPost };
  return data.post;
}

/** Native Wix Blog tag taxonomy. Labels and counts originate in Wix. */
export interface NativeBlogTag {
  id: string;
  label: string;
  slug: string;
  publishedPostCount: number;
}
export async function getPublishedBlogTags(): Promise<NativeBlogTag[]> {
  const response = await fetch('/api/blog/tags', {credentials:'same-origin'});
  if (!response.ok) throw new Error('Wix Blog tags unavailable (' + response.status + ')');
  const data = await response.json() as {tags?:NativeBlogTag[]};
  return data.tags || [];
}
