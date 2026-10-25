import {Link,useLocation} from 'react-router-dom';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';
const services=[
 {en:'Security assessments',ro:'Evaluări de securitate',detail:'Scope-based reviews of exposed services, web applications, authentication and secure configuration. No testing without written authorisation.'},
 {en:'DNS, TLS and Cloudflare hardening',ro:'Securizare DNS, TLS și Cloudflare',detail:'Review of certificate lifecycles, DNS security, access policies, WAF settings and secure web infrastructure.'},
 {en:'Vulnerability review',ro:'Analiza vulnerabilităților',detail:'Assess the relevance of publicly reported vulnerabilities and prioritise realistic remediation.'},
 {en:'Incident triage and defensive guidance',ro:'Triaj de incidente și consultanță defensivă',detail:'Initial technical assessment, evidence-preservation guidance, containment planning and escalation recommendations.'}
];
export default function ServicesPage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  return <>
    <NordlysPageHeading eyebrow={ro?'Colaborări profesionale':'Professional services'} title={ro?'Servicii':'Services'} intro={ro?'Servicii de securitate cibernetică pentru proiecte cu obiective și autorizări clare.':'Cybersecurity assistance and security reviews within a written, authorised scope.'}/>
    <div className="nordlys-post-list">{services.map(service=><div className="nordlys-list-item" key={service.en}>
      <h2 className="nordlys-item-title">{ro?service.ro:service.en}</h2><p className="nordlys-item-description">{service.detail}</p>
    </div>)}</div>
    <p className="nordlys-notice">{ro?'Nicio testare activă nu este efectuată fără autorizarea proprietarului sistemului și un domeniu de aplicare convenit în scris.':'Active testing requires system-owner authorisation and an agreed written scope.'}</p>
    <div className="nordlys-actions"><Link to={localizedPath('/contact',lang)} className="nordlys-btn">{ro?'Solicită o discuție':'Discuss a project'}</Link><Link to={localizedPath('/projects',lang)} className="nordlys-btn nordlys-btn-outline">{ro?'Vezi proiectele':'View projects'}</Link></div>
  </>;
}
