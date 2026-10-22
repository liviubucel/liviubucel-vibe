import { Image } from '@/components/ui/image';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLanguage, localizedPath, portfolio } from '@/lib/portfolio';

const focus = [
  ['Ethical hacking & assessment','Vulnerability validation, attack surfaces, practical remediations'],
  ['Digital forensics & incident investigation','Preserving evidence and analysing security events'],
  ['Threat intelligence','Evidence-based monitoring of exposed data and ransomware reporting'],
  ['Security engineering','Authentication, least privilege, auditability, secure APIs'],
  ['PKI, TLS & internet infrastructure','ACME automation, DNS validation and certificate lifecycle'],
  ['Vulnerability research','Exploitability, security impact and mitigations']
] as const;
export default function AboutPage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  return <div className="lb-page"><Header/><main>
    <section className="lb-section lb-section-alt"><div className="lb-container">
      <p className="lb-eyebrow">{ro?'Despre mine':'About me'}</p>
      <h1 className="lb-headline">{ro?'Securitate prin înțelegere.':'Security through understanding.'}</h1>
      <p className="lb-summary">{ro?'Sunt Liviu Bucel. Îmi dezvolt activitatea în ingineria securității, ethical hacking, investigații digitale și cercetarea vulnerabilităților.':'I’m Liviu Bucel. My work spans practical cybersecurity, security engineering, ethical hacking, digital investigation and vulnerability research.'}</p>
    </div></section>
    <section className="lb-section"><div className="lb-container lb-intro">
      <div><p className="lb-eyebrow">Liviu Bucel</p>
        <h2 className="lb-headline">{ro?'Dovezi, nu presupuneri.':'Evidence over assumptions.'}</h2>
        <p className="lb-summary">{ro?'Îmi place să înțeleg cum funcționează atacurile, cum apar defecțiunile de securitate și cum pot fi investigate incidentele. Proiectele mele pun accentul pe rezultate verificabile, separarea responsabilităților și protecția datelor.':'I’m interested in how attacks work, why systems fail, and how incidents can be investigated. My work prioritises testable findings, secure boundaries and protecting real-world data.'}</p>
        <div className="lb-actions"><Link className="mzp-c-button" to={localizedPath('/projects',lang)}>{ro?'Vezi proiectele':'View my work'}</Link></div>
      </div>
      <Image src={portfolio.media.portrait} alt={ro?'Portret Liviu Bucel':'Liviu Bucel portrait'} loading="lazy"/>
    </div></section>
    <section className="lb-section lb-section-alt"><div className="lb-container">
      <p className="lb-eyebrow">{ro?'Domenii de interes':'Technical focus'}</p><h2 className="lb-headline">{ro?'Cum lucrez.':'What I work on.'}</h2>
      <div className="lb-feature-grid">{focus.map(([title,summary])=><div className="lb-feature" key={title}><h3>{title}</h3><p>{summary}</p></div>)}</div>
      <p className="lb-privacy-note" style={{marginTop:30}}>{ro?'Datele clienților, credențialele și detaliile operaționale sensibile rămân private.':'Customer data, credentials and sensitive production operations remain private by design.'}</p>
    </div></section>
  </main><Footer/></div>;
}
