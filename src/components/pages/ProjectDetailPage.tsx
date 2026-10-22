import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLanguage, localizedPath } from '@/lib/portfolio';
import {getNativeProject,projectExternalLink,projectTechnologies,type NativeProject} from '@/lib/wix-portfolio';

export default function ProjectDetailPage(){
  const {id}=useParams<{id:string}>();
  const lang=getLanguage(useLocation().pathname);
  const ro=lang==='ro';
  const [project,setProject]=useState<NativeProject | undefined>();
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  useEffect(()=>{
    let active=true;
    if(!id){setLoading(false);return;}
    getNativeProject(id).then(x=>{if(active)setProject(x)}).catch(()=>{if(active)setError(true)}).finally(()=>{if(active)setLoading(false)});
    return()=>{active=false};
  },[id]);
  const link=project?projectExternalLink(project):undefined;
  return <div className="lb-page"><Header/><main>
    <section className="lb-section lb-section-alt"><div className="lb-container">
      <Link className="lb-text-link" to={localizedPath('/projects',lang)}>{ro?'← Toate proiectele':'← All projects'}</Link>
      {loading?<p role="status">{ro?'Se încarcă…':'Loading…'}</p>:project?<>
        <p className="lb-eyebrow" style={{marginTop:48}}>{projectTechnologies(project)||'Cybersecurity'}</p>
        <h1 className="lb-headline">{project.title}</h1>
        <p className="lb-summary">{project.description}</p>
        {link&&<div className="lb-actions"><a className="mzp-c-button" href={link} target="_blank" rel="noopener noreferrer">{ro?'Deschide proiectul ↗':'View project ↗'}</a></div>}
      </>:<p role={error?'alert':'status'}>{error?(ro?'Nu am putut încărca proiectul.':'Unable to load project.'):(ro?'Proiectul nu a fost găsit.':'Project not found.')}</p>}
    </div></section>
    {project&&<section className="lb-section"><div className="lb-container lb-article">
      <h2>{ro?'Descriere și tehnologie':'Details and technology'}</h2>
      <p style={{whiteSpace:'pre-line'}}>{project.description}</p>
      {project.details?.map((item,i)=><div key={i} style={{margin:'22px 0'}}><strong>{item.label}</strong><p>{item.text}{item.link&&<a className="lb-text-link" href={item.link.url} target="_blank" rel="noopener noreferrer">{item.link.text||'Open project ↗'}</a>}</p></div>)}
    </div></section>}
  </main><Footer/></div>;
}
