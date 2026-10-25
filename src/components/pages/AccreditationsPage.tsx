import {useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import {BaseCrudService} from '@/integrations';
import type {Accreditations} from '@/entities';
import {getLanguage} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';
export default function AccreditationsPage(){
  const ro=getLanguage(useLocation().pathname)==='ro';
  const [records,setRecords]=useState<Accreditations[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState(false);
  useEffect(()=>{let active=true;BaseCrudService.getAll<Accreditations>('acreditari',[],{limit:100})
    .then(r=>{if(active)setRecords(r.items)}).catch(()=>{if(active)setError(true)}).finally(()=>{if(active)setLoading(false)});
    return()=>{active=false}},[]);
  return <>
    <NordlysPageHeading eyebrow={ro?'Dezvoltare':'Professional development'} title={ro?'Certificări și studii':'Credentials & learning'} intro={ro?'Statutul certificărilor: obținută, în curs sau planificată.':'Credentials are explicitly labelled as earned, in progress or planned.'}/>
    {loading&&<p role="status">{ro?'Se încarcă…':'Loading credentials…'}</p>}
    {error&&<p role="alert">{ro?'Eroare de încărcare.':'Credentials unavailable.'}</p>}
    <div className="nordlys-post-list">{records.map(record=><section key={record._id} className="nordlys-list-item">
      <h2 className="nordlys-item-title">{record.certificationName}</h2>
      <p className="nordlys-item-meta">{record.issuingOrganization}</p>
      {record.description&&<p className="nordlys-item-description">{record.description}</p>}
      {record.dateObtained&&<p className="nordlys-item-meta">{String(record.dateObtained).slice(0,10)}</p>}
      {record.verificationLink&&<a className="nordlys-inline-link" href={record.verificationLink} target="_blank" rel="noopener noreferrer">{ro?'Verifică acreditarea':'Verify credential'} ↗</a>}
    </section>)}</div>
    {!loading&&!error&&records.length===0&&<p>{ro?'Nu există încă înregistrări.':'No entries published yet.'}</p>}
  </>;
}
