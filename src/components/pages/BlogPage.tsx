import {useEffect,useMemo,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {getPublishedBlogPosts,type NativeBlogPost} from '@/lib/wix-blog';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';
const PAGE_SIZE=5;
export default function BlogPage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const [all,setAll]=useState<NativeBlogPost[]>([]);
  const [loading,setLoading]=useState(true),[error,setError]=useState(false);
  const [query,setQuery]=useState(''),[page,setPage]=useState(0);
  useEffect(()=>{let active=true;getPublishedBlogPosts().then(v=>{if(active)setAll(v)}).catch(()=>{if(active)setError(true)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[]);
  const filtered=useMemo(()=>all.filter(p=>[p.title,p.excerpt].join(' ').toLowerCase().includes(query.toLowerCase())),[all,query]);
  const total=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const items=filtered.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE);
  return <>
    <NordlysPageHeading eyebrow={ro?'Cercetare și articole':'Writing & research'} title="Blog" intro={ro?'Note, analize și articole din domeniul securității cibernetice.':'Technical writing, research notes and cybersecurity analysis.'}/>
    <label className="nordlys-field" htmlFor="n-search-posts"><span className="nordlys-kicker">{ro?'Caută în articole':'Search articles'}</span><input className="nordlys-search" id="n-search-posts" type="search" value={query} onChange={e=>{setQuery(e.target.value);setPage(0)}} placeholder={ro?'Titlu sau cuvânt cheie':'Title or keyword'} /></label>
    {loading&&<p role="status">{ro?'Se încarcă…':'Loading articles…'}</p>}
    {error&&<p role="alert">{ro?'Articolele nu sunt disponibile.':'Articles are currently unavailable.'}</p>}
    <div className="nordlys-post-list">{items.map(post=><Link className="nordlys-list-item" to={localizedPath('/blog/'+(post.slug||post.id||post._id),lang)} key={post.id||post._id}>
      <h2 className="nordlys-item-title">{post.title}</h2>
      <p className="nordlys-item-meta">{post.firstPublishedDate?new Date(post.firstPublishedDate).toLocaleDateString(ro?'ro-RO':'en-GB',{day:'numeric',month:'long',year:'numeric'}):''}{post.minutesToRead?' · '+post.minutesToRead+' min':''}</p>
      <p className="nordlys-item-description">{post.excerpt}</p>
    </Link>)}</div>
    {!loading&&!error&&filtered.length===0&&<p>{ro?'Niciun articol găsit.':'No matching posts.'}</p>}
    {total>1&&<div className="nordlys-pager"><button disabled={page===0} onClick={()=>setPage(p=>Math.max(0,p-1))}>← {ro?'Anterior':'Previous'}</button><span>{page+1} / {total}</span><button disabled={page>=total-1} onClick={()=>setPage(p=>p+1)}>{ro?'Următor':'Next'} →</button></div>}
  </>;
}
