import {Link,useLocation} from 'react-router-dom';
import {AuroraMark} from '@/components/nordlys/NordlysFrame';
import {getLanguage,localizedPath,portfolio} from '@/lib/portfolio';

/**
 * Nordlys About: native markdown-like prose in the original PageLayout
 * with its characteristic centered aurora mark and blurred accent glow.
 * Replace only the example author's biography with the owner's real content.
 */
export default function AboutPage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  return <div className="nordlys-article nordlys-upstream-about">
    <h1 className="nordlys-page-title">{ro?'Despre mine':'About'}</h1>
    <p>{ro
      ?'Sunt Liviu Bucel și mă concentrez pe securitatea cibernetică, analiza vulnerabilităților și investigații digitale.'
      :'I’m Liviu Bucel. I focus on cybersecurity, vulnerability research and practical digital investigations.'}</p>
    <p>{ro
      ?'Acest site reunește proiectele mele, articolele tehnice și experiența profesională. Îmi place să înțeleg cum funcționează tehnologia, de ce apar problemele de securitate și cum pot fi reduse riscurile.'
      :'This is my personal space for technical writing, projects and professional experience. I’m interested in how systems work, why vulnerabilities emerge, and how evidence-led security work can reduce real risks.'}</p>

    <div className="nordlys-upstream-about-logo" aria-label="Liviu Bucel logo">
      <div className="nordlys-upstream-about-logo-inner"><AuroraMark size={130}/></div>
    </div>

    <h2>{ro?'Ce găsești aici':'Explore this website'}</h2>
    <p>{ro?<>Poți citi <Link viewTransition to={localizedPath('/blog',lang)}>articolele</Link>, explora <Link viewTransition to={localizedPath('/projects',lang)}>proiectele</Link>, consulta <Link viewTransition to={localizedPath('/experience',lang)}>CV-ul și experiența mea</Link>, precum și <Link viewTransition to={localizedPath('/tools',lang)}>instrumentele</Link> utilizate în activitatea tehnică.</>:<>You can read my <Link viewTransition to={localizedPath('/blog',lang)}>blog</Link>, explore my <Link viewTransition to={localizedPath('/projects',lang)}>projects</Link>, review my <Link viewTransition to={localizedPath('/experience',lang)}>resume and experience</Link>, and see the <Link viewTransition to={localizedPath('/tools',lang)}>tools</Link> I use in practical security work.</>}</p>

    <h2>{ro?'Domenii de interes':'Areas of focus'}</h2>
    <ul>
      <li>{ro?'Testare de securitate autorizată și analiză a suprafeței de atac':'Authorised security testing and attack-surface analysis'}</li>
      <li>{ro?'Investigații digitale și răspuns la incidente':'Digital forensics and incident response'}</li>
      <li>{ro?'Threat intelligence și cercetarea vulnerabilităților':'Threat intelligence and vulnerability research'}</li>
      <li>{ro?'Securitatea rețelelor, DNS, TLS și cloud':'Network, DNS, TLS and cloud security'}</li>
    </ul>

    <h2>{ro?'Colaborări':'Professional work'}</h2>
    <p>{ro?<>Pentru colaborări profesionale, consultă pagina de <Link viewTransition to={localizedPath('/services',lang)}>servicii</Link> sau <Link viewTransition to={localizedPath('/contact',lang)}>contactează-mă</Link>. Îmi poți vedea și <Link viewTransition to={localizedPath('/accreditations',lang)}>certificările și pregătirea</Link>.</>:<>For authorised security projects and professional enquiries, see my <Link viewTransition to={localizedPath('/services',lang)}>services</Link> or <Link viewTransition to={localizedPath('/contact',lang)}>get in touch</Link>. My <Link viewTransition to={localizedPath('/accreditations',lang)}>credentials and learning</Link> are also available.</>}</p>
    <p><a href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
  </div>;
}
