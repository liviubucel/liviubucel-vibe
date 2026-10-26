import type { NativeBlogPost, RichNode } from '@/lib/wix-blog';

/**
 * Convert authoritative Wix Blog Rich Content to semantic HTML for the
 * ORIGINAL Nordlys Astro PostLayout. This is a DATA adapter, not a theme.
 * All source strings/attributes are escaped; only http(s) URLs are accepted.
 */
export type OutlineHeading = { depth:number; slug:string; text:string };
const escapeHtml=(s:unknown)=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const plainText=(node:RichNode):string=>(node.textData?.text||'')+(node.nodes||[]).map(plainText).join('');
const cleanText=(s:string)=>s.replace(/\\n/g,'\n').replace(/\r/g,'').trim();
function url(raw:unknown):string|undefined{
  if(typeof raw!=='string')return undefined;
  try{const u=new URL(raw);return u.protocol==='https:'||u.protocol==='http:'?u.href:undefined}catch{return undefined}
}
function textMarkup(node:RichNode):string {
  let html=escapeHtml((node.textData?.text||'').replace(/\\n/g,'\n'));
  for(const mark of node.textData?.decorations||[]){
    if(mark.type==='BOLD')html='<strong>'+html+'</strong>';
    if(mark.type==='ITALIC')html='<em>'+html+'</em>';
    if(mark.type==='UNDERLINE')html='<u>'+html+'</u>';
    const link=url(mark.linkData?.link?.url);
    if(link)html='<a href="'+escapeHtml(link)+'" rel="noopener noreferrer">'+html+'</a>';
  }
  return html;
}
type HeadingNode={depth:number;text:string};
function heading(node:RichNode):HeadingNode|undefined{
  if(node.type==='HEADING')return {depth:Math.min(5,Math.max(2,Number(node.headingData?.level)||2)),text:cleanText(plainText(node))};
  if(node.type==='PARAGRAPH'){
    const match=/^(#{2,5})\s+(.+)$/.exec(cleanText(plainText(node)));
    if(match)return {depth:match[1].length,text:match[2]};
  }
  return undefined;
}
function renderNode(node:RichNode):string {
  if(node.type==='TEXT')return textMarkup(node);
  const inner=(node.nodes||[]).map(renderNode).join('');
  if(node.type==='PARAGRAPH'){
    const raw=cleanText(plainText(node));
    if(!raw||/^#{3,8}$/.test(raw))return '';
    return '<p>'+inner+'</p>';
  }
  if(node.type==='BULLETED_LIST')return '<ul>'+inner+'</ul>';
  if(node.type==='ORDERED_LIST')return '<ol>'+inner+'</ol>';
  if(node.type==='LIST_ITEM')return '<li>'+inner+'</li>';
  if(node.type==='BLOCKQUOTE')return '<blockquote>'+inner+'</blockquote>';
  if(node.type==='DIVIDER')return '<hr />';
  if(node.type==='IMAGE'){
    const src=url(node.imageData?.image?.src?.url);
    return src?'<figure><img src="'+escapeHtml(src)+'" alt="'+escapeHtml(node.imageData?.altText||'')+'" loading="lazy" data-action="zoom" /></figure>':'';
  }
  if(node.type==='HEADING')return inner;
  // A safe fallback for rich content structures without a dedicated renderer.
  return inner;
}
export function convertWixBlogPost(post:NativeBlogPost):{html:string;headings:OutlineHeading[]} {
  const nodes=post.richContent?.nodes||[];
  const counts=new Map<string,number>();
  const headings:OutlineHeading[]=[];
  const sections:string[]=[];
  let current='';
  let inSection=false;
  const flush=()=>{if(inSection){sections.push('<section>'+current+'</section>');current=''}else if(current){sections.push(current);current=''}};
  for(const node of nodes){
    const h=heading(node);
    if(h){
      flush();
      const stem=h.text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,70)||'section';
      const count=counts.get(stem)||0;
      counts.set(stem,count+1);
      const slug=count?stem+'-'+count:stem;
      headings.push({depth:h.depth,slug,text:h.text});
      current='<h'+h.depth+' id="'+escapeHtml(slug)+'">'+(node.type==='HEADING'?(node.nodes||[]).map(renderNode).join(''):escapeHtml(h.text))+'</h'+h.depth+'>';
      inSection=true;
    }else current+=renderNode(node);
  }
  flush();
  return {html:sections.join('\n')||'<p>'+escapeHtml(post.contentText||post.excerpt||'')+'</p>',headings};
}
