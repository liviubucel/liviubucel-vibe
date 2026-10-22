import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {getLanguage,localizedPath,portfolio} from '@/lib/portfolio';
export default function ExperiencePage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  return <div className="lb-page"><Header/><main>
    <section className="lb-section lb-section-alt"><div className="lb-container">
      <p className="lb-eyebrow">{ro?'Experiență și practică':'Practical work'}</p>
      <h1 className="lb-headline">{ro?'Din teorie în practică.':'Practice over promises.'}</h1>
      <p className="lb-summary">{ro?'Aici prezint lucrări publice, proiecte verificate și domenii tehnice în care îmi dezvolt experiența.':'This page focuses on publicly verifiable projects, practical engineering work and professional development.'}</p>
    </div></section>
    <section className="lb-section"><div className="lb-container">
      <h2 className="lb-headline">{ro?'Lucrările mele.':'Selected engineering work.'}</h2>
      <div className="lb-feature-grid">
        <div className="lb-feature"><h3>ZebraByte</h3><p>{ro?'Securitate cibernetică și platforme defensive.':'Cybersecurity and defensive security platforms.'}</p>
        <a className="lb-text-link" href={portfolio.links.zebrabyte} target="_blank" rel="noopener noreferrer">ZebraByte ↗</a></div>
        <div className="lb-feature"><h3>Threat Intelligence</h3><p>{ro?'Monitorizare defensivă și corelare de semnalări publice.':'Defensive monitoring and correlation of public threat reports.'}</p></div>
        <div className="lb-feature"><h3>PKI / ACME</h3><p>{ro?'Automatizare a certificatelor TLS și validare DNS.':'TLS certificate lifecycle and DNS validation automation.'}</p></div>
      </div>
      <div className="lb-actions"><Link to={localizedPath('/projects',lang)} className="mzp-c-button">{ro?'Explorează proiectele':'Explore projects'}</Link></div>
      <p className="lb-privacy-note" style={{marginTop:35}}>{ro?'Nu public experiențe profesionale neconfirmate sau joburi fictive.':'No unverified employment roles or fictional client work are listed.'}</p>
    </div></section>
  </main><Footer/></div>;
}
