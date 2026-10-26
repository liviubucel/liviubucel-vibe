import {Link,useLocation} from 'react-router-dom';
import {getLanguage,localizedPath,portfolio} from '@/lib/portfolio';
import {AuroraMark,NordlysBottom} from '@/components/nordlys/NordlysFrame';

export default function HomePage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  return <div className="nordlys-landing">
    <div className="nordlys-landing-content">
      <h1 className="nordlys-brand"><span className="nordlys-brand-glow"/><AuroraMark size={80}/><span>{portfolio.name}</span></h1>
      <div className="nordlys-landing-copy">
        {ro?<>Sunt pasionat de <Link viewTransition className="nordlys-inline-link" to={localizedPath('/about',lang)}>cybersecurity și investigații digitale</Link>. Aici găsești <Link viewTransition className="nordlys-inline-link" to={localizedPath('/projects',lang)}>proiectele</Link>, <Link viewTransition className="nordlys-inline-link" to={localizedPath('/blog',lang)}>articolele</Link>, <Link viewTransition className="nordlys-inline-link" to={localizedPath('/experience',lang)}>CV-ul meu</Link> și <Link viewTransition className="nordlys-inline-link" to={localizedPath('/services',lang)}>serviciile profesionale</Link>. Pentru colaborări, <Link viewTransition className="nordlys-inline-link" to={localizedPath('/contact',lang)}>contactează-mă</Link>.</>:
        <>A cybersecurity and digital investigation portfolio. Explore my <Link viewTransition className="nordlys-inline-link" to="/blog">blog</Link>, <Link viewTransition className="nordlys-inline-link" to="/projects">projects</Link>, <Link viewTransition className="nordlys-inline-link" to="/experience">resume</Link>, and <Link viewTransition className="nordlys-inline-link" to="/services">professional services</Link>. Learn more <Link viewTransition className="nordlys-inline-link" to="/about">about me</Link> or <Link viewTransition className="nordlys-inline-link" to="/contact">get in touch</Link>.</>}
      </div>
    </div>
    <NordlysBottom landing/>
  </div>;
}
