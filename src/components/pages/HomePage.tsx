import {useEffect,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {getPublishedBlogPosts,type NativeBlogPost} from '@/lib/wix-blog';
import {getLanguage,localizedPath,portfolio} from '@/lib/portfolio';
import {AuroraMark,NordlysBottom} from '@/components/nordlys/NordlysFrame';

export default function HomePage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const [latest,setLatest]=useState<NativeBlogPost|null>(null);
  useEffect(()=>{let active=true;getPublishedBlogPosts().then(posts=>{if(active)setLatest(posts[0]||null)}).catch(()=>{});return()=>{active=false}},[]);
  return <div className="nordlys-landing">
    <div className="nordlys-landing-content">
      <h1 className="nordlys-brand"><span className="nordlys-brand-glow"/><AuroraMark size={80}/><span>{portfolio.name}</span></h1>
      <div className="nordlys-landing-copy">
        {ro?<>Sunt pasionat de <Link className="nordlys-inline-link" to={localizedPath('/about',lang)}>cybersecurity și investigații digitale</Link>. Aici găsești <Link className="nordlys-inline-link" to={localizedPath('/projects',lang)}>proiectele</Link>, <Link className="nordlys-inline-link" to={localizedPath('/blog',lang)}>articolele</Link>, <Link className="nordlys-inline-link" to={localizedPath('/experience',lang)}>CV-ul meu</Link> și <Link className="nordlys-inline-link" to={localizedPath('/services',lang)}>serviciile profesionale</Link>. Pentru colaborări, <Link className="nordlys-inline-link" to={localizedPath('/contact',lang)}>contactează-mă</Link>.</>:
        <>A cybersecurity and digital investigation portfolio. Explore my <Link className="nordlys-inline-link" to="/blog">blog</Link>, <Link className="nordlys-inline-link" to="/projects">projects</Link>, <Link className="nordlys-inline-link" to="/experience">resume</Link>, and <Link className="nordlys-inline-link" to="/services">professional services</Link>. Learn more <Link className="nordlys-inline-link" to="/about">about me</Link> or <Link className="nordlys-inline-link" to="/contact">get in touch</Link>.</>}
        {latest?.title&&<p style={{marginTop:32,fontSize:'.83em'}}>{ro?'Cel mai recent articol: ':'Read my latest post: '}<Link className="nordlys-inline-link" to={localizedPath('/blog/'+(latest.slug||latest.id||latest._id),lang)}>{latest.title}</Link></p>}
      </div>
    </div>
    <NordlysBottom landing/>
  </div>;
}
