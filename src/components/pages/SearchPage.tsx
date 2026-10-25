import {useEffect,useMemo,useState} from 'react';
import {Link,useLocation,useSearchParams} from 'react-router-dom';
import {getPublishedBlogPosts,type NativeBlogPost} from '@/lib/wix-blog';
import {getNativeProjects,type NativeProject} from '@/lib/wix-portfolio';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';
export default function SearchPage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const [params,setParams]=useSearchParams();
  const [query,setQuery]=useState(params.get('q')||'');
  const [posts,setPosts]=useState<NativeBlogPost[]>([]),[projects,setProjects]=useState<NativeProject[]>([]),[loading,setLoading]=useState(true);
  useEffect(()=>{let active=true;Promise.allSettled([getPublishedBlogPosts(),getNativeProjects()]).then(res=>{if(!active)return;if(res[0].status==='fulfilled')setPosts(res[0].value);if(res[1].status==='fulfilled')setProjects(res[1].value)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[]);
  const results=useMemo(()=>{
    const q=query.trim().toLowerCase();
    if(!q)return [];
    const foundPosts=posts.filter(p=>[p.title,p.excerpt].join(' ').toLowerCase().includes(q)).map(p=>({id:p.id||p._id||p.slug,title:p.title||'',snippet:p.excerpt||'',type:'Blog',path:'/blog/'+(p.slug||p.id||p._id)}));
    const foundProjects=projects.filter(p=>[p.title,p.description].join(' ').toLowerCase().includes(q)).map(p=>({id:p.id||p._id||p.slug,title:p.title||'',snippet:p.description||'',type:'Project',path:'/projects/'+(p.slug||p.id||p._id)}));
    return [...foundPosts,...foundProjects];
  },[query,posts,projects]);
  return <>
    <NordlysPageHeading eyebrow={ro?'Caută pe site':'Site search'} title={ro?'Căutare':'Search'} intro={ro?'Caută în articolele și proiectele publicate în Wix.':'Search published Wix Blog articles and projects.'}/>
    <form role="search" onSubmit={e=>{e.preventDefault();setParams(query?{q:query}:{})}}><label className="nordlys-field" htmlFor="n-global-search">{ro?'Termen de căutare':'Search term'}<input className="nordlys-search" type="search" id="n-global-search" value={query} autoFocus onChange={e=>setQuery(e.target.value)} placeholder={ro?'Introdu termenul':'Enter keywords'} /></label><button className="nordlys-btn" type="submit">{ro?'Caută':'Search'}</button></form>
    <div className="nordlys-post-list" style={{marginTop:40}}>{results.map(p=><Link className="nordlys-list-item" to={localizedPath(p.path,lang)} key={p.type+':'+p.id}><p className="nordlys-item-meta">{p.type}</p><h2 className="nordlys-item-title">{p.title}</h2><p className="nordlys-item-description">{p.snippet}</p></Link>)}</div>
    {loading&&<p role="status">{ro?'Se încarcă…':'Loading content…'}</p>}
    {!loading&&query&&results.length===0&&<p role="status">{ro?'Niciun rezultat.':'No matching results.'}</p>}
  </>;
}
