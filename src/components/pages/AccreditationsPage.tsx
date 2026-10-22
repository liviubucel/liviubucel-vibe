import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import type { Accreditations } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {getLanguage} from '@/lib/portfolio';
export default function AccreditationsPage(){
  const ro=getLanguage(useLocation().pathname)==='ro';
  const [records,setRecords]=useState<Accreditations[]>([]);
  const [loading,setLoading]=useState(true),[error,setError]=useState(false);
  useEffect(()=>{let active=true;BaseCrudService.getAll<Accreditations>('acreditari',[],{limit:100})
    .then(result=>{if(active)setRecords(result.items)})
    .catch(()=>{if(active)setError(true)})
    .finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[]);
  return <div className="lb-page"><Header/><main>
    <section className="lb-section lb-section-alt"><div className="lb-container"><p className="lb-eyebrow">{ro?'Învățare și dezvoltare':'Learning & development'}</p>
    <h1 className="lb-headline">{ro?'Certificări și dezvoltare profesională':'Credentials & development'}</h1>
    <p className="lb-summary">{ro?'Statutul fiecărei certificări este afișat explicit: obținută, în curs sau planificată.':'Each credential is labelled according to its actual status: earned, in progress or planned.'}</p></div></section>
    <section className="lb-section"><div className="lb-container">
    {loading&&<p role="status">{ro?'Se încarcă…':'Loading…'}</p>}
    {error&&<p role="alert">{ro?'Nu am putut încărca datele.':'Unable to retrieve credentials.'}</p>}
    <div className="lb-cards">{records.map(record=><article className="mzp-c-card mzp-c-card-medium" key={record._id}>
      <div className="lb-card"><p className="lb-card-meta">{record.issuingOrganization}</p><h2 className="lb-card-title">{record.certificationName}</h2>
      {record.description&&<p>{record.description}</p>}
      {record.dateObtained&&<p>{ro?'Data':'Date'}: {String(record.dateObtained).slice(0,10)}</p>}
      {record.verificationLink&&<a className="lb-text-link" href={record.verificationLink} target="_blank" rel="noopener noreferrer">{ro?'Verifică acreditarea ↗':'Verify credential ↗'}</a>}
      </div></article>)}</div>
    </div></section>
  </main><Footer/></div>;
}
