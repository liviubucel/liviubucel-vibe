import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { items } from '@wix/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {getLanguage,localizedPath} from '@/lib/portfolio';

type Incident = {
  _id: string; title?: string; slug?: string;
  organisation?: string; summary?: string;
  recordType?: string; verificationStatus?: string; editorialStatus?: string;
  independentlyConfirmed?: boolean; publishedAt?: string | {$date:string};
  sourceName?: string; sourceLanding?: string; sourceUrl?: string;
};
const sections=[
  {slug:'ransomware',kind:'ransomware_claim',en:'Ransomware',ro:'Ransomware'},
  {slug:'breaches',kind:'verified_breach',en:'Breaches',ro:'Breșe'},
  {slug:'exposures',kind:'public_exposure',en:'Exposures',ro:'Expuneri'},
  {slug:'malware',kind:'malware_intelligence',en:'Malware',ro:'Malware'},
  {slug:'threat-infrastructure',kind:'threat_indicator',en:'Threat infrastructure',ro:'Infrastructură de atac'}
] as const;
const published=(incident:Incident) => incident.editorialStatus==='published';
export default function RomaniaCyberMonitorPage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const {category,slug}=useParams<{category?:string,slug?:string}>();
  const [data,setData]=useState<Incident[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [search,setSearch]=useState('');
  const selected=sections.find(s=>s.slug===category);
  const base=localizedPath('/romania-cyber-monitor',lang);
  useEffect(()=>{
    let active=true;setLoading(true);setError('');
    let query=items.query('romaniaCyberIncidents').eq('editorialStatus','published');
    if(selected)query=query.eq('recordType',selected.kind);
    if(slug)query=query.eq('slug',slug);
    query.limit(100).find().then(result=>{if(active)setData((result.items||[]) as Incident[])})
      .catch(()=>{if(active)setError(ro?'Nu am putut încărca raportările.':'Could not load incident reports.')})
      .finally(()=>{if(active)setLoading(false)});
    return()=>{active=false};
  },[selected?.kind,slug,ro]);
  const visible=useMemo(()=>data.filter(published).filter(i=>
    ((i.title||i.organisation||'')+' '+(i.summary||'')).toLocaleLowerCase().includes(search.toLocaleLowerCase())),[data,search]);
  return <div className="lb-page"><Header/><main>
    <section className="lb-section lb-section-alt"><div className="lb-container">
      <p className="lb-eyebrow">{ro?'Date publice și context':'Open-source intelligence'}</p>
      <h1 className="lb-headline">Romania Cyber Monitor</h1>
      <p className="lb-summary">{ro
        ? 'Raportări publice de ransomware și alte amenințări cu legătură documentată cu România. Afirmațiile agresorilor nu constituie confirmarea incidentelor.'
        : 'Publicly reported security threats linked to Romania. Threat actor claims are not evidence that a victim was actually compromised.'}</p>
      <div className="lb-notice" style={{maxWidth:800}}>{ro
        ? 'Majoritatea înregistrărilor istorice sunt semnalări neverificate, nu incidente confirmate independent.'
        : 'Historical records may be unverified ransomware listings, not independently confirmed incidents.'}</div>
    </div></section>
    <section className="lb-section"><div className="lb-container">
      <nav aria-label="Cyber Monitor categories" className="lb-actions" style={{margin:'0 0 40px'}}>
        <Link to={base} className={'mzp-c-button'+(!category&&!slug?'':' mzp-t-secondary')}>{ro?'Toate':'All'}</Link>
        {sections.map(section=><Link key={section.slug} to={base+'/'+section.slug} className={'mzp-c-button'+(category===section.slug?'':' mzp-t-secondary')}>{section[lang]}</Link>)}
      </nav>
      {slug&&<Link className="lb-text-link" to={base}>{ro?'← Toate semnalările':'← All reports'}</Link>}
      <div style={{marginTop:32}}>
        <label className="mzp-c-field-label" htmlFor="monitor-search">{ro?'Caută după organizație':'Search reports'}</label>
        <input className="lb-search" id="monitor-search" type="search" value={search} onChange={event=>setSearch(event.target.value)}
          placeholder={ro?'Caută organizație…':'Search organisations…'}/>
      </div>
      {loading&&<p role="status">{ro?'Se încarcă…':'Loading…'}</p>}
      {error&&<p role="alert" className="lb-notice">{error}</p>}
      {!loading&&!error&&visible.length===0&&<p role="status">{ro?'Nu sunt înregistrări publicate pentru această selecție.':'No published records match this selection.'}</p>}
      <div className="lb-cards">{visible.map(incident=><article className="mzp-c-card mzp-c-card-medium" key={incident._id}>
        <div className="lb-card">
          <p className="lb-card-meta">{incident.recordType?.replace(/_/g,' ')} · {incident.verificationStatus?.replace(/_/g,' ')}</p>
          <h2 className="lb-card-title">{incident.slug&&!slug?<Link className="lb-text-link" to={base+'/incidents/'+encodeURIComponent(incident.slug)}>{incident.title||incident.organisation}</Link>:(incident.title||incident.organisation)}</h2>
          <p>{(incident.summary||'').replace(/<[^>]*>/g,'')}</p>
          <p className="lb-privacy-note">{ro?'Statut:':'Status:'} <strong>{incident.independentlyConfirmed?(ro?'Verificat independent':'Independently verified'):(ro?'Afirmație neconfirmată':'Unverified claim')}</strong></p>
          {incident.sourceName&&incident.sourceLanding?.startsWith('https://')&&<p className="lb-privacy-note">
            {ro?'Sursă agregată:':'Source feed:'} <a className="lb-text-link" href={incident.sourceLanding} target="_blank" rel="noopener noreferrer">{incident.sourceName} ↗</a>
            {' '}— {ro?'nu reprezintă dovada incidentului individual.':'not independent verification of the specific report.'}
          </p>}
        </div>
      </article>)}</div>
    </div></section>
  </main><Footer/></div>;
}
