import {Link,useLocation} from 'react-router-dom';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';

/**
 * Verified real Unsplash photos imported to this site's native Wix Media Manager.
 * These are editorial illustrations, NEVER evidence of services delivered to a
 * named customer or screenshots from a Cloudflare product/dashboard.
 */
const services=[
  {
    en:'Security assessments',ro:'Evaluări de securitate',
    detailEn:'Scope-based reviews of exposed services, web applications, authentication and secure configuration. No testing without written authorisation.',
    detailRo:'Analize ale serviciilor expuse, aplicațiilor web, autentificării și configurațiilor de securitate, numai într-un cadru autorizat în scris.',
    image:'https://static.wixstatic.com/media/a4f45c_fb25f917c6a54110916e913e1c8a9627~mv2.jpg',
    altEn:'Real editorial stock photograph of a technical workspace',
    altRo:'Fotografie de stoc reală cu un spațiu de lucru tehnic'
  },
  {
    en:'DNS, TLS and Cloudflare hardening',ro:'Securizare DNS, TLS și Cloudflare',
    detailEn:'Review of certificate lifecycles, DNS security, access policies, WAF settings and secure web infrastructure.',
    detailRo:'Verificarea certificatelor TLS, securității DNS, politicilor de acces, regulilor WAF și infrastructurii web.',
    image:'https://static.wixstatic.com/media/a4f45c_e621dd399f7144c4830ab5095e624406~mv2.jpg',
    altEn:'Authentic stock photograph of server infrastructure',
    altRo:'Fotografie de stoc autentică a infrastructurii de servere'
  },
  {
    en:'Vulnerability review',ro:'Analiza vulnerabilităților',
    detailEn:'Assess the relevance of publicly reported vulnerabilities and prioritise realistic remediation.',
    detailRo:'Evaluarea relevanței vulnerabilităților publice și stabilirea priorităților de remediere.',
    image:'https://static.wixstatic.com/media/a4f45c_bf6e407fc6a3429ea6ab2a9c29fa3f7e~mv2.jpg',
    altEn:'Authentic stock photograph of network and data centre equipment',
    altRo:'Fotografie de stoc autentică cu echipamente de rețea'
  },
  {
    en:'Incident triage and defensive guidance',ro:'Triaj de incidente și consultanță defensivă',
    detailEn:'Initial technical assessment, evidence-preservation guidance, containment planning and escalation recommendations.',
    detailRo:'Evaluare tehnică inițială, conservarea probelor digitale, planificarea izolării și recomandări de escaladare.',
    image:'https://static.wixstatic.com/media/a4f45c_9601be1262184e8c8d47b54d4bdd66f5~mv2.jpg',
    altEn:'Real stock photo of an IT working environment',
    altRo:'Fotografie de stoc reală cu un mediu de lucru IT'
  }
];
export default function ServicesPage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  return <>
    <NordlysPageHeading eyebrow={ro?'Colaborări profesionale':'Professional services'} title={ro?'Servicii':'Services'} intro={ro?'Servicii de securitate cibernetică pentru proiecte cu obiective și autorizări clare.':'Cybersecurity assistance and security reviews within a written, authorised scope.'}/>
    <div className="nordlys-post-list nordlys-services-list">
      {services.map(service=><article className="nordlys-list-item nordlys-service-item" key={service.en}>
        <figure className="nordlys-service-photo">
          <img src={service.image} loading="lazy" decoding="async" alt={ro?service.altRo:service.altEn}/>
          <figcaption>{ro?'Fotografie ilustrativă · Unsplash':'Illustrative stock photograph · Unsplash'}</figcaption>
        </figure>
        <div className="nordlys-service-copy">
          <h2 className="nordlys-item-title">{ro?service.ro:service.en}</h2>
          <p className="nordlys-item-description">{ro?service.detailRo:service.detailEn}</p>
        </div>
      </article>)}
    </div>
    <p className="nordlys-notice">{ro?'Fotografiile sunt ilustrative, nu exemple de clienți sau capturi din console private. Nicio testare activă nu este efectuată fără autorizarea proprietarului sistemului și un domeniu convenit în scris.':'Photographs are illustrative, not client case studies or private product dashboards. Active testing requires system-owner authorisation and an agreed written scope.'}</p>
    <div className="nordlys-actions"><Link viewTransition to={localizedPath('/contact',lang)} className="nordlys-btn">{ro?'Solicită o discuție':'Discuss a project'}</Link><Link viewTransition to={localizedPath('/projects',lang)} className="nordlys-btn nordlys-btn-outline">{ro?'Vezi proiectele':'View projects'}</Link></div>
  </>;
}
