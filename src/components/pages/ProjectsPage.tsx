import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLanguage, localizedPath } from '@/lib/portfolio';
import { getNativeProjects,projectTechnologies,type NativeProject } from '@/lib/wix-portfolio';

export default function ProjectsPage(){
  const lang=getLanguage(useLocation().pathname);
  const ro=lang==='ro';
  const [projects,setProjects]=useState<NativeProject[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  useEffect(()=>{
    let active=true;
    getNativeProjects().then(data=>{if(active)setProjects(data)}).catch(()=>{if(active)setError(true)}).finally(()=>{if(active)setLoading(false)});
    return ()=>{active=false};
  },[]);
  return <div className="lb-page"><Header/><main>
    <section className="lb-section lb-section-alt"><div className="lb-container">
      <p className="lb-eyebrow">{ro?'Securitate și inginerie':'Security & engineering'}</p>
      <h1 className="lb-headline">{ro?'Proiecte și cercetare':'Selected projects'}</h1>
      <p className="lb-summary">{ro?'Lucrări tehnice autentice în threat intelligence, securitate cloud, PKI/TLS și investigații digitale.':'Original technical work across threat intelligence, cloud security, PKI/TLS, and digital investigations.'}</p>
    </div></section>
    <section className="lb-section"><div className="lb-container">
      {loading && <p role="status">{ro?'Se încarcă…':'Loading…'}</p>}
      {error && <p role="alert">{ro?'Nu am putut încărca proiectele.':'Projects are temporarily unavailable.'}</p>}
      <div className="lb-cards">{projects.map(project=><article className="mzp-c-card mzp-c-card-medium" key={project.id||project._id}>
        <Link className="lb-card" to={localizedPath('/projects/'+(project.slug||project.id||project._id),lang)}>
          <p className="lb-card-meta">{projectTechnologies(project) || 'Cybersecurity'}</p>
          <h2 className="lb-card-title">{project.title}</h2>
          <p>{project.description}</p><span className="lb-text-link" aria-hidden="true">{ro?'Deschide proiectul →':'Explore project →'}</span>
        </Link>
      </article>)}</div>
      {!loading&&!error&&projects.length===0&&<p>{ro?'Nu sunt proiecte publicate.':'No projects published.'}</p>}
      <p className="lb-privacy-note" style={{marginTop:32}}>{ro?'Proiectele sunt gestionate prin Wix Portfolio.':'Projects are managed in the native Wix Portfolio app.'}</p>
    </div></section>
  </main><Footer/></div>;
}
