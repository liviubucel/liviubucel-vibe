import {useEffect,useMemo,useState,type ReactNode} from 'react';
import {Link,useLocation,useParams} from 'react-router-dom';
import {ZoomIn} from 'lucide-react';
import {openNordlysPhotoSwipe} from '@/components/nordlys/PhotoSwipeViewer';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {getPublishedBlogPost,getPublishedBlogPosts,type NativeBlogPost,type RichNode} from '@/lib/wix-blog';
import {NordlysTableOfContents} from '@/components/nordlys/NordlysArticleInteractions';

type Heading={id:string;level:number;text:string};
type ImageEntry={src:string;alt:string};
const safeId=(node:RichNode,index:number)=>'section-'+String(node.id||index).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,70);
const textOf=(node:RichNode):string=>(node.textData?.text||'')+(node.nodes||[]).map(textOf).join('');
function ArticleProgress(){
  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    let frame=0;
    const measure=()=>{
      if(frame)return;
      frame=requestAnimationFrame(()=>{
        const range=document.documentElement.scrollHeight-window.innerHeight;
        setProgress(range>0?Math.min(100,Math.max(0,window.scrollY/range*100)):0);
        frame=0;
      });
    };
    measure();window.addEventListener('scroll',measure,{passive:true});window.addEventListener('resize',measure);
    return()=>{window.removeEventListener('scroll',measure);window.removeEventListener('resize',measure);if(frame)cancelAnimationFrame(frame)};
  },[]);
  return <div className="nordlys-reading-progress" aria-hidden="true"><div style={{width:progress+'%'}}/></div>;
}
function renderNode(node:RichNode,index:number,openImage:(src:string)=>void):ReactNode{
  const children=node.nodes?.map((child,i)=>renderNode(child,i,openImage))??[];
  if(node.type==='TEXT'){
    const raw=node.textData?.text||'';
    // Preserve the source's meaning without treating user-authored HTML as code.
    const decorations=node.textData?.decorations||[];
    let content:ReactNode=raw;
    for(const d of decorations){
      if(d.type==='BOLD')content=<strong>{content}</strong>;
      if(d.type==='ITALIC')content=<em>{content}</em>;
      if(d.type==='UNDERLINE')content=<u>{content}</u>;
    }
    return <span key={node.id||index}>{content}</span>;
  }
  if(node.type==='PARAGRAPH'){
    const raw=textOf(node).trim();
    if(!raw || /^#{3,8}$/.test(raw))return null;
    // Legacy imported posts contain Markdown-style heading lines as text.
    const markdownHeading=/^(#{2,5})\s+(.+)$/.exec(raw);
    if(markdownHeading){
      const depth=Math.min(markdownHeading[1].length,4);
      const headingId='legacy-'+String(node.id||index).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,70);
      const inner=<>{markdownHeading[2]}<a className="nordlys-heading-anchor" href={'#'+headingId} aria-label={'Link to '+markdownHeading[2]}>#</a></>;
      if(depth===2)return <h2 id={headingId} key={node.id||index}>{inner}</h2>;
      if(depth===3)return <h3 id={headingId} key={node.id||index}>{inner}</h3>;
      return <h4 id={headingId} key={node.id||index}>{inner}</h4>;
    }
    return <p key={node.id||index}>{children}</p>;
  }
  if(node.type==='HEADING'){
    const level=Math.max(2,Math.min(4,Number(node.headingData?.level)||2));
    const id=safeId(node,index);
    const content=<>{children}<a className="nordlys-heading-anchor" href={'#'+id} aria-label={'Link to '+textOf(node)}>#</a></>;
    if(level===2)return <h2 id={id} key={node.id||index}>{content}</h2>;
    if(level===3)return <h3 id={id} key={node.id||index}>{content}</h3>;
    return <h4 id={id} key={node.id||index}>{content}</h4>;
  }
  if(node.type==='BLOCKQUOTE')return <blockquote key={node.id||index}>{children}</blockquote>;
  if(node.type==='BULLETED_LIST')return <ul key={node.id||index}>{children}</ul>;
  if(node.type==='ORDERED_LIST')return <ol key={node.id||index}>{children}</ol>;
  if(node.type==='LIST_ITEM')return <li key={node.id||index}>{children}</li>;
  if(node.type==='DIVIDER')return <hr key={node.id||index}/>;
  if(node.type==='IMAGE'){
    const src=node.imageData?.image?.src?.url;
    if(src?.startsWith('https://'))return <button type="button" key={node.id||index} className="nordlys-zoomable-image" aria-label="Enlarge image" onClick={()=>openImage(src)}>
      <img src={src} alt={node.imageData?.altText||''} loading="lazy"/><ZoomIn aria-hidden="true" size={22}/>
    </button>;
    return null;
  }
  return children.length?<div key={node.id||index}>{children}</div>:null;
}
export default function BlogDetailPage(){
  const {id}=useParams<{id:string}>();
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const [article,setArticle]=useState<NativeBlogPost>();
  const [allPosts,setAllPosts]=useState<NativeBlogPost[]>([]);
  const [loading,setLoading]=useState(true),[error,setError]=useState('');
  const [imageError,setImageError]=useState(false);
  useEffect(()=>{
    let active=true;if(!id){setLoading(false);return;}
    setLoading(true);setError('');setImageError(false);
    Promise.all([getPublishedBlogPost(id),getPublishedBlogPosts()])
      .then(([post,list])=>{if(active){setArticle(post);setAllPosts(list)}})
      .catch(()=>{if(active)setError(ro?'Articolul nu a putut fi încărcat.':'Article could not be loaded.')})
      .finally(()=>{if(active)setLoading(false)});
    return()=>{active=false};
  },[id,ro]);
  const headings=useMemo<Heading[]>(()=>article?.richContent?.nodes
    ?.map((node,i)=>node.type==='HEADING'?{id:safeId(node,i),level:Number(node.headingData?.level)||2,text:textOf(node)}:null)
    .filter((h):h is Heading=>!!h)||[],[article]);
  const photos=useMemo<ImageEntry[]>(()=>article?.richContent?.nodes?.flatMap(node=>{
    const images:ImageEntry[]=[];
    function find(n:RichNode){
      if(n.type==='IMAGE'){
        const src=n.imageData?.image?.src?.url;
        if(src?.startsWith('https://'))images.push({src,alt:n.imageData?.altText||''});
      }
      n.nodes?.forEach(find);
    }
    find(node);return images;
  })||[],[article]);
  const idx=allPosts.findIndex(p=>p.slug===article?.slug||p.id===article?._id);
  const prev=idx>0?allPosts[idx-1]:undefined;
  const next=idx>=0&&idx<allPosts.length-1?allPosts[idx+1]:undefined;
  const linkTo=(p:NativeBlogPost)=>localizedPath('/blog/'+(p.slug||p._id||p.id),lang);
  return <article>
    <ArticleProgress/>
    <p className="nordlys-item-meta"><Link viewTransition className="nordlys-inline-link" to={localizedPath('/blog',lang)}>← {ro?'Toate articolele':'Back to all posts'}</Link></p>
    {loading?<p role="status">{ro?'Se încarcă…':'Loading article…'}</p>:article?<><header className="nordlys-section">
      <h1 className="nordlys-page-title">{article.title}</h1>
      <p className="nordlys-page-lead">{article.excerpt}</p>
      <p className="nordlys-item-meta">{article.firstPublishedDate&&new Date(article.firstPublishedDate).toLocaleDateString(ro?'ro-RO':'en-GB',{day:'numeric',month:'long',year:'numeric'})} · Liviu Bucel{article.minutesToRead?' · '+article.minutesToRead+' min':''}</p>
    </header>
    {headings.length>2&&<NordlysTableOfContents headings={headings.map(h=>({id:h.id,label:h.text,level:h.level}))}/>}
    <div className="nordlys-article">{article.richContent?.nodes?.length?
      article.richContent.nodes.map((node,index)=>renderNode(node,index,(src:string)=>{void openNordlysPhotoSwipe(photos,photos.findIndex(p=>p.src===src)).catch(()=>setImageError(true))})):
      <p>{article.contentText||article.excerpt}</p>}
    </div>
    <nav className="nordlys-adjacent-posts" aria-label="Adjacent posts">
      <div>{prev&&<Link viewTransition to={linkTo(prev)}><span className="nordlys-item-meta">← {ro?'Anterior':'Previous'}</span><span>{prev.title}</span></Link>}</div>
      <div>{next&&<Link viewTransition to={linkTo(next)}><span className="nordlys-item-meta">{ro?'Următor':'Next'} →</span><span>{next.title}</span></Link>}</div>
    </nav>
    {imageError&&<p className="nordlys-feedback" role="alert">{ro?'Vizualizarea imaginii nu este disponibilă momentan.':'Image viewer is currently unavailable.'}</p>}
    </>:<p role={error?'alert':'status'}>{error||(ro?'Articolul nu există.':'Post not found.')}</p>}
  </article>;
}
