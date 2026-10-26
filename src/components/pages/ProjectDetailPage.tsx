import {useEffect,useState} from 'react';
import {Link,useLocation,useParams} from 'react-router-dom';
import {ExternalLink} from 'lucide-react';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {setNordlysDocumentSEO} from '@/components/nordlys/NordlysSeo';
import {getNativeProject,projectExternalLink,projectTechnologies,type NativeProject} from '@/lib/wix-portfolio';

/** Nordlys-style project detail. Data is still from native Wix Portfolio. */
export default function ProjectDetailPage(){
  const {id}=useParams<{id:string}>();
  const lang=getLanguage(useLocation().pathname);
  const ro=lang==='ro';
  const [project,setProject]=useState<NativeProject|undefined>();
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);

  useEffect(()=>{
    let active=true;
    setLoading(true);setError(false);
    if(!id){setLoading(false);return;}
    getNativeProject(id)
      .then(value=>{if(active)setProject(value)})
      .catch(()=>{if(active)setError(true)})
      .finally(()=>{if(active)setLoading(false)});
    return()=>{active=false};
  },[id]);

  useEffect(()=>{
    if(project?.title)setNordlysDocumentSEO(project.title,project.description||'Cybersecurity project by Liviu Bucel');
  },[project]);

  const external=project?projectExternalLink(project):undefined;
  const tags=(project?projectTechnologies(project):'')?.split(',').map(s=>s.trim()).filter(Boolean)||[];

  return <article className="nordlys-article nordlys-upstream-project-detail">
    <div className="nordlys-upstream-back"><Link viewTransition to={localizedPath('/projects',lang)}>← {ro?'Toate proiectele':'Back to all projects'}</Link></div>

    {loading&&<p role="status">{ro?'Se încarcă…':'Loading project…'}</p>}
    {error&&<p role="alert">{ro?'Proiectul nu poate fi încărcat.':'Project is currently unavailable.'}</p>}
    {!loading&&!error&&!project&&<p>{ro?'Proiectul nu a fost găsit.':'Project not found.'}</p>}

    {project&&<>
      <h1 className="nordlys-page-title">{project.title}</h1>
      {!!tags.length&&<div className="nordlys-upstream-tags" aria-label={ro?'Tehnologii':'Technologies'}>
        {tags.map(tag=><span key={tag} className="nordlys-upstream-tag">{tag}</span>)}
      </div>}
      {!!project.description&&<p>{project.description}</p>}

      {project.details?.filter(item=>item.label!=='Technologies'&&item.label!=='Project link').map((item,index)=>
        <section key={index}>
          {item.label&&<h2>{item.label}</h2>}
          {item.text&&<p style={{whiteSpace:'pre-line'}}>{item.text}</p>}
          {item.link?.url?.startsWith('https://')&&<p><a href={item.link.url} target="_blank" rel="noopener noreferrer">{item.link.text||'Project link'} <ExternalLink size={16} aria-hidden="true"/></a></p>}
        </section>)}

      {external&&<p className="nordlys-upstream-project-links">
        <a href={external} target="_blank" rel="noopener noreferrer">{ro?'Deschide proiectul':'Open project'} <ExternalLink size={17} aria-hidden="true"/></a>
      </p>}
    </>}
  </article>;
}
