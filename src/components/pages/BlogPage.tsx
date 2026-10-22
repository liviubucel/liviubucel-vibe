import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLanguage, localizedPath } from '@/lib/portfolio';
import { getPublishedBlogPosts, type NativeBlogPost } from '@/lib/wix-blog';

export default function BlogPage() {
  const lang = getLanguage(useLocation().pathname);
  const [items, setItems] = useState<NativeBlogPost[]>([]);
  const [query, setQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState<'all' | 'en' | 'ro'>('all');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getPublishedBlogPosts()
      .then(posts => { if (active) setItems(posts); })
      .catch(() => { if (active) setError(lang === 'ro' ? 'Articolele nu au putut fi încărcate.' : 'Could not load the articles.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [lang]);

  const filtered = useMemo(() =>
    items.filter(post => (languageFilter === 'all' || post.language === languageFilter)
      && (post.title || '').toLocaleLowerCase().includes(query.toLocaleLowerCase())),
    [items,languageFilter,query]);

  return <div className="lb-page">
    <Header/>
    <main>
      <section className="lb-section lb-section-alt">
        <div className="lb-container">
          <div className="lb-eyebrow">{lang === 'ro' ? 'Articole și analize' : 'Writing & research'}</div>
          <h1 className="lb-headline">{lang === 'ro' ? 'Blog și cercetare' : 'Security writing'}</h1>
          <p className="lb-summary">{lang === 'ro'
            ? 'Analize, explicații și observații despre vulnerabilități, incidente și securitate cibernetică.'
            : 'Original analysis and technical notes on vulnerabilities, incident response, and security engineering.'}</p>
        </div>
      </section>
      <section className="lb-section">
        <div className="lb-container">
          <div style={{display:'flex',flexWrap:'wrap',gap:18,alignItems:'center',justifyContent:'space-between',marginBottom:36}}>
            <label htmlFor="blog-search" style={{display:'block',width:'min(100%,560px)'}}>
              <span className="lb-eyebrow" style={{display:'block',marginBottom:9}}>{lang === 'ro' ? 'Caută un articol' : 'Find an article'}</span>
              <input id="blog-search" className="lb-search" value={query} onChange={event=>setQuery(event.target.value)}
                placeholder={lang==='ro'?'Caută după titlu…':'Search article titles…'} type="search" />
            </label>
            <div role="group" aria-label="Article language" className="lb-actions" style={{marginTop:0}}>
              {(['all','en','ro'] as const).map(choice=><button key={choice}
                type="button" className={'mzp-c-button' + (languageFilter!==choice?' mzp-t-secondary':'')}
                aria-pressed={languageFilter===choice} onClick={()=>setLanguageFilter(choice)}>
                {choice==='all'?(lang==='ro'?'Toate':'All'):choice.toUpperCase()}
              </button>)}
            </div>
          </div>
          {loading && <p role="status">{lang==='ro'?'Se încarcă articolele…':'Loading articles…'}</p>}
          {error && <div className="lb-notice" role="alert">{error}</div>}
          {!loading && !error && filtered.length === 0 && <p>{lang==='ro'?'Niciun articol pentru această căutare.':'No articles match this search.'}</p>}
          <div className="lb-cards">
            {filtered.map(post=><article key={post._id||post.id} className="mzp-c-card mzp-c-card-medium">
              <Link className="lb-card" to={localizedPath('/blog/'+(post.slug||post._id||post.id),lang)}>
                <div className="lb-card-meta">
                  {post.language?.toUpperCase()}
                  {post.firstPublishedDate && <> · <time dateTime={String(post.firstPublishedDate)}>{new Date(post.firstPublishedDate).toLocaleDateString(lang==='ro'?'ro-RO':'en-GB',{year:'numeric',month:'long',day:'numeric'})}</time></>}
                </div>
                <h2 className="lb-card-title">{post.title}</h2>
                <p>{post.excerpt || (lang==='ro'?'Citește articolul integral.':'Read the full article.')}</p>
                <span className="lb-text-link" aria-hidden="true">{lang==='ro'?'Citește articolul →':'Read article →'}</span>
              </Link>
            </article>)}
          </div>
          <p className="lb-privacy-note" style={{marginTop:32}}>{lang==='ro'?'Articolele se editează în aplicația Wix Blog.':'Articles are published and managed in the native Wix Blog app.'}</p>
        </div>
      </section>
    </main>
    <Footer/>
  </div>;
}
