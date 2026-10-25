import {useEffect,useState} from 'react';
import {Link,useLocation,useParams} from 'react-router-dom';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {setNordlysDocumentSEO} from '@/components/nordlys/NordlysSeo';
import {getNativeProject,projectExternalLink,projectTechnologies,type NativeProject} from '@/lib/wix-portfolio';
export default function ProjectDetailPage(){
  const {id}=useParams<{id:string}>();const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const [project,setProject]=useState<NativeProject>(),[loading,setLoading]=useState(true),[error,setError]=useState(false);
  useEffect(()=>{let active=true;if(!id){setLoading(false);return}getNativeProject(id).then(v=>{if(active)setProject(v)}).catch(()=>{if(active)setError(true)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[id]);
  useEffect(()=>{if(project?.title)setNordlysDocumentSEO(project.title,project.description||'Cybersecurity portfolio project by Liviu Bucel');},[project]);
  const link=project?projectExternalLink(project):undefined;
  return <article>
    <p className="nordlys-item-meta"><Link viewTransition className="nordlys-inline-link" to={localizedPath('/projects',lang)}>← {ro?'Toate proiectele':'All projects'}</Link></p>
    {loading?<p role="status">{ro?'Se încarcă…':'Loading project…'}</p>:project?<><header className="nordlys-section">
      <p className="nordlys-kicker">{projectTechnologies(project)||'Cybersecurity'}</p><h1 className="nordlys-page-title">{project.title}</h1><p className="nordlys-page-lead">{project.description}</p>
    </header><div className="nordlys-article">
      {project.details?.map((item,i)=><section key={i}><h2>{item.label}</h2><p style={{whiteSpace:'pre-line'}}>{item.text}</p>
        {item.link&&<p><a className="nordlys-inline-link" href={item.link.url} target="_blank" rel="noopener noreferrer">{item.link.text||'Open source project'} ↗</a></p>}
      </section>)}
      {link&&<div className="nordlys-actions"><a className="nordlys-btn" href={link} target="_blank" rel="noopener noreferrer">{ro?'Deschide proiectul':'View project'} ↗</a></div>}
    </div></>:<p role={error?'alert':'status'}>{ro?'Proiect indisponibil.':'Project unavailable.'}</p>}
  </article>;
}
