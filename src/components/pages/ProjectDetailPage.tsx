import {useEffect,useState} from 'react';
import {Link,useLocation,useParams} from 'react-router-dom';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {setNordlysDocumentSEO} from '@/components/nordlys/NordlysSeo';
import {getNativeProject,getNativeProjectGallery,projectExternalLink,projectTechnologies,projectCoverUrl,wixPortfolioImageUrl,type NativeProject,type NativeProjectGalleryItem} from '@/lib/wix-portfolio';
export default function ProjectDetailPage(){
  const {id}=useParams<{id:string}>();const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const [project,setProject]=useState<NativeProject>(),[loading,setLoading]=useState(true),[error,setError]=useState(false);
  const [gallery,setGallery]=useState<NativeProjectGalleryItem[]>([]);
  useEffect(()=>{let active=true;if(!id){setLoading(false);return}getNativeProject(id).then(v=>{if(active)setProject(v)}).catch(()=>{if(active)setError(true)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[id]);
  useEffect(()=>{if(project?.title)setNordlysDocumentSEO(project.title,project.description||'Cybersecurity portfolio project by Liviu Bucel');},[project]);
  useEffect(()=>{
    if(!project){setGallery([]);return;}
    let active=true;
    getNativeProjectGallery(project).then(items=>{if(active)setGallery(items)})
      .catch(()=>{if(active)setGallery([])});
    return()=>{active=false};
  },[project]);
  const link=project?projectExternalLink(project):undefined;
  return <article>
    <p className="nordlys-item-meta"><Link viewTransition className="nordlys-inline-link" to={localizedPath('/projects',lang)}>← {ro?'Toate proiectele':'All projects'}</Link></p>
    {loading?<p role="status">{ro?'Se încarcă…':'Loading project…'}</p>:project?<><header className="nordlys-section">
      <p className="nordlys-kicker">{projectTechnologies(project)||'Cybersecurity'}</p><h1 className="nordlys-page-title">{project.title}</h1><p className="nordlys-page-lead">{project.description}</p>
    </header>
    {projectCoverUrl(project)&&<figure className="nordlys-project-hero">
      <img src={projectCoverUrl(project)} alt={ro?'Captură reală a proiectului '+project.title:'Authentic project capture: '+project.title}
        loading="eager" decoding="async" />
      <figcaption>{ro?'Captură din proiectul real, păstrată în Wix Portfolio.':'Real project image, managed in Wix Portfolio.'}</figcaption>
    </figure>}
    {gallery.length>0&&<section className="nordlys-project-gallery" aria-label={ro?'Capturi originale din proiect':'Original project screenshots'}>
      <h2 className="nordlys-section-title">{ro?'Capturi reale ale proiectului':'Original project screenshots'}</h2>
      <div className="nordlys-project-gallery-grid">
        {gallery.map((item)=>{
          const src=wixPortfolioImageUrl(item.image);
          return src?<figure key={item._id} className="nordlys-gallery-item">
            <a href={src} target="_blank" rel="noopener noreferrer" aria-label={ro?'Deschide captura originală: '+item.title:'Open original screenshot: '+item.title}>
              <img src={src} loading="lazy" decoding="async" alt={item.title||'Original project screenshot'}/>
            </a>
            <figcaption>{item.title}</figcaption>
          </figure>:null;
        })}
      </div>
    </section>}
    <div className="nordlys-article">
      {project.details?.map((item,i)=><section key={i}><h2>{item.label}</h2><p style={{whiteSpace:'pre-line'}}>{item.text}</p>
        {item.link&&<p><a className="nordlys-inline-link" href={item.link.url} target="_blank" rel="noopener noreferrer">{item.link.text||'Open source project'} ↗</a></p>}
      </section>)}
      {link&&<div className="nordlys-actions"><a className="nordlys-btn" href={link} target="_blank" rel="noopener noreferrer">{ro?'Deschide proiectul':'View project'} ↗</a></div>}
    </div></>:<p role={error?'alert':'status'}>{ro?'Proiect indisponibil.':'Project unavailable.'}</p>}
  </article>;
}
