import {useEffect,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {ExternalLink} from 'lucide-react';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {getNativeProjects,projectTechnologies,projectExternalLink,type NativeProject} from '@/lib/wix-portfolio';

/**
 * Native Wix Portfolio rendered with the structure of the Nordlys
 * ProjectsList + ProjectsListItem components (no boxed card or hover shift).
 */
const PAGE_SIZE=3;
export default function ProjectsPage(){
  const lang=getLanguage(useLocation().pathname);
  const ro=lang==='ro';
  const [projects,setProjects]=useState<NativeProject[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const [page,setPage]=useState(0);

  useEffect(()=>{
    let active=true;
    getNativeProjects()
      .then(items=>{if(active)setProjects(items)})
      .catch(()=>{if(active)setError(true)})
      .finally(()=>{if(active)setLoading(false)});
    return()=>{active=false};
  },[]);

  const pageCount=Math.max(1,Math.ceil(projects.length/PAGE_SIZE));
  const visible=projects.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE);
  const changePage=(next:number)=>{
    setPage(next);
    window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  };

  return <section aria-label={ro?'Portofoliu de proiecte':'Portfolio projects'}>
    <h1 className="nordlys-page-title">{ro?'Proiecte':'Projects'}</h1>
    <p className="nordlys-page-lead">{ro
      ?'Proiectele mele tehnice, dezvoltate în domeniul securității și infrastructurii.'
      :'Selected cybersecurity, infrastructure and development projects.'}</p>

    {loading&&<p role="status">{ro?'Se încarcă proiectele…':'Loading projects…'}</p>}
    {error&&<p role="alert">{ro?'Proiectele nu sunt disponibile momentan.':'Projects are temporarily unavailable.'}</p>}
    {!loading&&!error&&projects.length===0&&<p>{ro?'Nu există proiecte publicate.':'No projects published yet.'}</p>}

    <ul className="nordlys-upstream-index">
      {visible.map((project,index)=>{
        const id=project.slug||project.id||project._id;
        const external=projectExternalLink(project);
        const tags=(projectTechnologies(project)||'').split(',').map(s=>s.trim()).filter(Boolean).slice(0,7);
        return <li className="nordlys-upstream-list-item" key={project.id||project._id||project.slug}>
          <article className="nordlys-upstream-post">
            <div className="nordlys-upstream-post-body">
              <div className="nordlys-upstream-heading-row">
                <h2><Link viewTransition to={localizedPath('/projects/'+id,lang)}>{project.title}</Link></h2>
                {external&&<a className="nordlys-upstream-external" href={external} target="_blank" rel="noopener noreferrer" aria-label={(ro?'Deschide proiectul ':'Open project ')+(project.title||'')}><ExternalLink size={19}/></a>}
              </div>
              {tags.length>0&&<div className="nordlys-upstream-tags" aria-label={ro?'Tehnologii':'Technologies'}>
                {tags.map(tag=><span className="nordlys-upstream-tag" key={tag}>{tag}</span>)}
              </div>}
              {!!project.description&&<p className="nordlys-upstream-description">{project.description}</p>}
            </div>
          </article>
          {index!==visible.length-1&&<hr className="nordlys-upstream-separator"/>}
        </li>;
      })}
    </ul>

    {pageCount>1&&<nav className="nordlys-upstream-pagination" aria-label={ro?'Paginarea proiectelor':'Project pagination'}>
      <button type="button" disabled={page===0} onClick={()=>changePage(page-1)}>{ro?'Anterior':'Previous'}</button>
      <span>{page+1} / {pageCount}</span>
      <button type="button" disabled={page===pageCount-1} onClick={()=>changePage(page+1)}>{ro?'Următor':'Next'}</button>
    </nav>}
  </section>;
}
