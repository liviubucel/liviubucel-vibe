import {Link,useLocation} from 'react-router-dom';
import {getLanguage,localizedPath,portfolio} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';
const roles=[
  {en:'Technical Support Specialist',where:'ZebraByte',when:'April 2022 – January 2024 · United Kingdom',
   description:'Web hosting support, cPanel, DNS, email troubleshooting, SSL certificate renewals, WordPress connectivity and Cloudflare protection basics.'},
  {en:'IT Technician',where:'Intact Media Group',when:'November 2019 – September 2020 · Bucharest, Romania',
   description:'Level 1 IT support in a media environment: workstations, Windows applications, email, networks and escalation of infrastructure issues.'},
  {en:'Practical cybersecurity labs and projects',where:'Independent practice and learning',when:'Ongoing',
   description:'Defensive threat-analysis simulations, security-awareness training, Python and security labs covering Linux, Windows, enumeration, incident response and network security.'}
];
export default function ExperiencePage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  return <>
    <NordlysPageHeading eyebrow={ro?'Profil profesional':'Career profile'} title={ro?'CV / Experiență':'Resume & experience'} intro={ro?'Experiență relevantă în IT, infrastructură, suport și securitate cibernetică.':'Practical background in IT support, web infrastructure and security engineering, alongside cybersecurity studies and labs.'}/>
    <div className="nordlys-post-list">{roles.map(role=><section className="nordlys-list-item" key={role.en}><h2 className="nordlys-item-title">{role.en}</h2><p className="nordlys-item-meta">{role.where} · {role.when}</p><p className="nordlys-item-description">{role.description}</p></section>)}</div>
    <section className="nordlys-section nordlys-article"><h2>{ro?'Proiecte și competențe':'Projects and credentials'}</h2>
      <p>{ro?'Poți consulta':'Explore'} <Link viewTransition className="nordlys-inline-link" to={localizedPath('/projects',lang)}>{ro?'proiectele tehnice':'technical projects'}</Link> {ro?'și':'and'} <Link viewTransition className="nordlys-inline-link" to={localizedPath('/accreditations',lang)}>{ro?'certificările':'credentials'}</Link> {ro?'pentru informații verificabile.':'for supporting details.'}</p>
      <h2>{ro?'Solicită CV-ul':'Request my CV'}</h2>
      <p>{ro?'CV-ul actualizat este disponibil la cerere, nu printr-un link public.':'A current CV is available on request rather than through an unprotected public download.'}</p>
      <div className="nordlys-actions"><Link viewTransition className="nordlys-btn" to={localizedPath('/contact',lang)}>{ro?'Solicită CV':'Request CV'}</Link><a className="nordlys-btn nordlys-btn-outline" href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
    </section>
  </>;
}
