import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
    return url?.startsWith('https://') ? <figure key={node.id||index}><img src={url} alt={node.imageData?.altText||''} loading="lazy"/></figure> : null;
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
  return <div className="lb-page">
    <Header/>
    <main>
      <section className="lb-section lb-section-alt">
        <div className="lb-container">
          <Link className="lb-text-link" to={localizedPath('/blog',lang)}>{lang==='ro'?'← Toate articolele':'← All articles'}</Link>
          {loading ? <p style={{marginTop:32}} role="status">{lang==='ro'?'Se încarcă…':'Loading…'}</p> : article ? <>
            <p className="lb-eyebrow" style={{marginTop:48}}>{lang==='ro'?'Cercetare și analize':'Research & analysis'} · {article.language?.toUpperCase()}</p>
            <h1 className="lb-headline" style={{maxWidth:'20ch'}}>{article.title}</h1>
            <p className="lb-summary">{article.excerpt}</p>
            <p className="lb-card-meta" style={{marginTop:24}}>
              {article.firstPublishedDate && <time dateTime={String(article.firstPublishedDate)}>{new Date(article.firstPublishedDate).toLocaleDateString(lang==='ro'?'ro-RO':'en-GB',{year:'numeric',month:'long',day:'numeric'})}</time>}
              {' '}· Liviu Bucel
            </p>
          </>:error?<p role="alert">{error}</p>:<p>{lang==='ro'?'Articolul nu a fost găsit.':'Article not found.'}</p>}
        </div>
      </section>
      {article && <article className="lb-section"><div className="lb-container">
        <div className="mzp-c-article lb-article">
          {article.richContent?.nodes?.length
            ? article.richContent.nodes.map((node,index)=>renderNode(node,index))
            : <p>{article.contentText || article.excerpt}</p>}
        </div>
      </div></article>}
    </main>
    <Footer/>
  </div>;
}
