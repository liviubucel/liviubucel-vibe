import {useEffect,useMemo,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';
import {getNativeProjects,projectTechnologies,type NativeProject} from '@/lib/wix-portfolio';
const PAGE_SIZE=3;
export default function ProjectsPage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const [all,setAll]=useState<NativeProject[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState(false);
  const [query,setQuery]=useState(''),[page,setPage]=useState(0);
  useEffect(()=>{let active=true;getNativeProjects().then(v=>{if(active)setAll(v)}).catch(()=>{if(active)setError(true)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[]);
  const filtered=useMemo(()=>all.filter(p=>[p.title,p.description,projectTechnologies(p)].join(' ').toLowerCase().includes(query.toLowerCase())),[all,query]);
  const total=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  return <>
    <NordlysPageHeading eyebrow={ro?'Lucrări tehnice':'Portfolio'} title={ro?'Proiecte':'Projects'} intro={ro?'Cercetare și proiecte de securitate cibernetică.':'Selected technical work in threat analysis, network security and digital investigations.'}/>
    <label className="nordlys-field" htmlFor="n-search-projects"><span className="nordlys-kicker">{ro?'Filtrează proiectele':'Find a project'}</span><input className="nordlys-search" id="n-search-projects" type="search" value={query} onChange={e=>{setQuery(e.target.value);setPage(0)}} placeholder={ro?'Titlu sau tehnologie':'Title or technology'}/></label>
    {loading&&<p role="status">{ro?'Se încarcă…':'Loading projects…'}</p>}
    {error&&<p role="alert">{ro?'Proiectele nu sunt disponibile.':'Projects are unavailable.'}</p>}
    <div className="nordlys-post-list">{filtered.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE).map(p=><Link viewTransition key={p.id||p._id} to={localizedPath('/projects/'+(p.slug||p.id||p._id),lang)} className="nordlys-list-item">
      <h2 className="nordlys-item-title">{p.title}</h2><p className="nordlys-item-meta">{projectTechnologies(p)||'Cybersecurity'}</p><p className="nordlys-item-description">{p.description}</p>
    </Link>)}</div>
    {!loading&&!error&&filtered.length===0&&<p>{ro?'Niciun proiect găsit.':'No projects found.'}</p>}
    {total>1&&<div className="nordlys-pager"><button disabled={page===0} onClick={()=>setPage(p=>Math.max(0,p-1))}>← {ro?'Anterior':'Previous'}</button><span>{page+1} / {total}</span><button disabled={page>=total-1} onClick={()=>setPage(p=>p+1)}>{ro?'Următor':'Next'} →</button></div>}
  </>;
}
