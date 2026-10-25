import { Image } from '@/components/ui/image';
import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getLanguage, localizedPath } from '@/lib/portfolio';
import { getPublishedBlogPost, type NativeBlogPost, type RichNode } from '@/lib/wix-blog';

function renderNode(node: RichNode, index: number): ReactNode {
  const children = node.nodes?.map((child, i) => renderNode(child,i)) ?? [];
  if (node.type === 'TEXT') return <span key={index}>{node.textData?.text}</span>;
  if (node.type === 'PARAGRAPH') return <p key={node.id||index}>{children}</p>;
  if (node.type === 'HEADING') {
    const level = Math.max(2,Math.min(4,Number(node.headingData?.level)||2));
    return level===2 ? <h2 key={node.id||index}>{children}</h2>
      : level===3 ? <h3 key={node.id||index}>{children}</h3>
      : <h4 key={node.id||index}>{children}</h4>;
  }
  if (node.type === 'BLOCKQUOTE') return <blockquote key={node.id||index}>{children}</blockquote>;
  if (node.type === 'BULLETED_LIST') return <ul key={node.id||index}>{children}</ul>;
  if (node.type === 'ORDERED_LIST') return <ol key={node.id||index}>{children}</ol>;
  if (node.type === 'LIST_ITEM') return <li key={node.id||index}>{children}</li>;
  if (node.type === 'DIVIDER') return <hr key={node.id||index}/>;
  if (node.type === 'IMAGE') {
    const url = node.imageData?.image?.src?.url;
    return url?.startsWith('https://') ? <figure key={node.id||index}><Image src={url} alt={node.imageData?.altText||''} loading="lazy"/></figure> : null;
  }
  return children.length ? <div key={node.id||index}>{children}</div> : null;
}

export default function BlogDetailPage() {
  const { id } = useParams<{id:string}>();
  const lang = getLanguage(useLocation().pathname);
  const [article, setArticle] = useState<NativeBlogPost | undefined>();
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  useEffect(()=>{
    let active=true;
    if (!id) { setLoading(false); return; }
    setLoading(true);
    getPublishedBlogPost(id)
      .then(post => { if (active) setArticle(post); })
      .catch(()=> { if (active) setError(lang==='ro'?'Articolul nu poate fi încărcat.':'Unable to load article.'); })
      .finally(()=> { if(active) setLoading(false); });
    return ()=>{active=false};
  },[id,lang]);
  return <article>
    <p className="nordlys-item-meta"><Link className="nordlys-inline-link" to={localizedPath('/blog',lang)}>← {lang==='ro'?'Toate articolele':'All posts'}</Link></p>
    {loading?<p role="status">{lang==='ro'?'Se încarcă…':'Loading article…'}</p>:article?<><header className="nordlys-section">
      <p className="nordlys-kicker">{lang==='ro'?'Cercetare și analize':'Research & analysis'}</p>
      <h1 className="nordlys-page-title">{article.title}</h1>
      <p className="nordlys-page-lead">{article.excerpt}</p>
      <p className="nordlys-item-meta">{article.firstPublishedDate&&new Date(article.firstPublishedDate).toLocaleDateString(lang==='ro'?'ro-RO':'en-GB',{day:'numeric',month:'long',year:'numeric'})} · Liviu Bucel</p>
    </header><div className="nordlys-article">
      {article.richContent?.nodes?.length?article.richContent.nodes.map((node,index)=>renderNode(node,index)):<p>{article.contentText||article.excerpt}</p>}
    </div></>:<p role={error?'alert':'status'}>{error||(lang==='ro'?'Articolul nu există.':'Post not found.')}</p>}
  </article>;
}
