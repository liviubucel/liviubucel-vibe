import { posts } from '@wix/blog';

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
}
export interface RichNode {
  type: string;
  id?: string;
  nodes?: RichNode[];
  textData?: { text?: string; decorations?: unknown[] };
  headingData?: { level?: number };
  imageData?: { altText?: string; image?: { src?: { url?: string; id?: string } } };
}

export const legacySlugs: Record<string,string> = {
  'cnd-brandingul-e-mai-puternic-dect-securitatea-cum-a-fost-compromis-the-real-world-platforma-lui-andrew-tate':
    'cnd-brandingul-e-mai-puternic-dect-securitatea-cum-a-fost-compromis-the-real-world-platforma-lui-and',
  'vulnerabilitate-critic-wordpress-cve-2026-23550-permite-preluarea-complet-a-site-urilor-prin-pluginul-modular-ds':
    'vulnerabilitate-critic-wordpress-cve-2026-23550-permite-preluarea-complet-a-site-urilor-prin-pluginu',
};

export async function getPublishedBlogPosts(): Promise<NativeBlogPost[]> {
  const response = await posts.listPosts({ paging: { limit: 100 } });
  return (response.posts ?? []) as NativeBlogPost[];
}

export async function getPublishedBlogPost(slugOrId: string): Promise<NativeBlogPost | undefined> {
  const resolvedSlug = legacySlugs[slugOrId] || slugOrId;
  const all = await getPublishedBlogPosts();
  const entry = all.find(item => item.slug === resolvedSlug || item._id === resolvedSlug || item.id === resolvedSlug);
  const postId = entry?._id || entry?.id;
  if (!postId) return undefined;
  const response = await posts.getPost(postId, {fieldsets: ['RICH_CONTENT', 'URL']});
  return (response.post || entry) as NativeBlogPost;
}
