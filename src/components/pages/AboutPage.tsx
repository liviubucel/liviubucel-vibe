import {Link,useLocation} from 'react-router-dom';
import {getLanguage,localizedPath,portfolio} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';
const topics=[
  ['Ethical hacking','Authorised security testing and attack-surface analysis'],
  ['Digital forensics','Evidence-led investigation of security events'],
  ['Threat intelligence','Public reporting, verification and risk context'],
  ['Cloud & network security','DNS, identity, authentication, TLS and secure configuration'],
  ['Vulnerability research','Risk assessment and actionable mitigations']
];
export default function AboutPage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  return <>
    <NordlysPageHeading eyebrow={ro?'Cine sunt':'About'} title={ro?'Despre mine':'About me'} intro={ro?'Sunt Liviu Bucel și mă concentrez pe securitate cibernetică, investigații digitale și inginerie de securitate.':'I’m Liviu Bucel, focused on practical cybersecurity, digital investigation and security engineering.'}/>
    <div className="nordlys-article"><p>{ro?'Îmi place să înțeleg de ce apar vulnerabilitățile, cum sunt analizate incidentele și cum reducem riscurile reale. Îmi prezint aici lucrările tehnice, pregătirea și experiența.':'My work emphasises understanding why systems fail, how security events can be investigated and how evidence leads to practical risk reduction. This website contains my projects, learning and professional experience.'}</p>
      <p>{ro?'Mai multe despre parcursul meu profesional:':'Explore my professional background:'} <Link viewTransition className="nordlys-inline-link" to={localizedPath('/experience',lang)}>{ro?'CV și experiență':'Resume and experience'}</Link>, <Link viewTransition className="nordlys-inline-link" to={localizedPath('/accreditations',lang)}>{ro?'certificări':'credentials'}</Link>.</p>
      <h2>{ro?'Domenii principale':'Technical focus'}</h2>
      <div className="nordlys-post-list">{topics.map(([title,desc])=><div className="nordlys-list-item" key={title}><h3 className="nordlys-item-title">{title}</h3><p className="nordlys-item-description">{desc}</p></div>)}</div>
      <h2>{ro?'Colaborări':'Work together'}</h2><p>{ro?'Pentru proiecte autorizate de cybersecurity și colaborări profesionale, poți':'For authorised security projects and professional collaboration, you can'} <Link viewTransition className="nordlys-inline-link" to={localizedPath('/services',lang)}>{ro?'vedea serviciile':'explore services'}</Link> {ro?'sau mă poți contacta.':'or contact me.'}</p>
      <p><a className="nordlys-inline-link" href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></p>
    </div>
  </>;
}
