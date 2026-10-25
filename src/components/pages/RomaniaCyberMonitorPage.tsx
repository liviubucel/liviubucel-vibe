import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { items } from '@wix/data';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';

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
  return <>
    <NordlysPageHeading eyebrow={ro?'Date publice și context':'Open-source intelligence'} title="Romania Cyber Monitor" intro={ro?'Raportări publice despre amenințări cu legătură documentată cu România. Afirmațiile atacatorilor nu sunt confirmarea incidentului.':'Public reports linked to Romania. Threat-actor claims are not evidence that a victim was actually compromised.'}/>
    <p className="nordlys-notice">{ro?'Înregistrările istorice pot conține semnalări neverificate, nu incidente confirmate independent.':'Historical records may contain unverified claims, not independently confirmed incidents.'}</p>
    <nav aria-label="Monitor categories" className="nordlys-taglist">
      <Link to={base} className="nordlys-tag">{ro?'Toate':'All'}</Link>
      {sections.map(section=><Link className="nordlys-tag" key={section.slug} to={base+'/'+section.slug} aria-current={category===section.slug?'page':undefined}>{section[lang]}</Link>)}
    </nav>
    {slug&&<p><Link className="nordlys-inline-link" to={base}>← {ro?'Toate rapoartele':'All reports'}</Link></p>}
    <label className="nordlys-field" htmlFor="monitor-search">{ro?'Caută rapoarte':'Search reports'}<input id="monitor-search" type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder={ro?'Organizație, titlu…':'Organisation or title…'}/></label>
    {loading&&<p role="status">{ro?'Se încarcă…':'Loading reports…'}</p>}
    {error&&<p role="alert">{error}</p>}
    {!loading&&!error&&visible.length===0&&<p role="status">{ro?'Nu există rapoarte publicate pentru această selecție.':'No published reports match this selection.'}</p>}
    <div className="nordlys-post-list">{visible.map(incident=><article className="nordlys-list-item" key={incident._id}>
      <p className="nordlys-item-meta">{incident.recordType?.replace(/_/g,' ')} · {incident.verificationStatus?.replace(/_/g,' ')}</p>
      <h2 className="nordlys-item-title">{incident.slug&&!slug?<Link className="nordlys-inline-link" to={base+'/incidents/'+encodeURIComponent(incident.slug)}>{incident.title||incident.organisation}</Link>:(incident.title||incident.organisation)}</h2>
      <p className="nordlys-item-description">{(incident.summary||'').replace(/<[^>]*>/g,'')}</p>
      <p className="nordlys-item-meta">{incident.independentlyConfirmed?(ro?'Confirmat independent':'Independently confirmed'):(ro?'Afirmație neconfirmată':'Unverified claim')}</p>
      {incident.sourceName&&incident.sourceLanding?.startsWith('https://')&&<p className="nordlys-item-meta">{ro?'Sursă de agregare':'Feed source'}: <a className="nordlys-inline-link" href={incident.sourceLanding} target="_blank" rel="noopener noreferrer">{incident.sourceName} ↗</a></p>}
    </article>)}</div>
  </>;
}
