import {useState,type FormEvent} from 'react';
import {useLocation,Link} from 'react-router-dom';
import {submissions} from '@wix/forms';
import {getLanguage,localizedPath,portfolio} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';

const CONTACT_FORM_ID='350bbd87-09af-4295-9dbc-7e9cab1123bb';
export default function ContactPage(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const [name,setName]=useState(''),[email,setEmail]=useState(''),[subject,setSubject]=useState(''),[message,setMessage]=useState('');
  const [busy,setBusy]=useState(false),[sent,setSent]=useState(false),[error,setError]=useState('');
  async function send(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(busy)return;setBusy(true);setError('');setSent(false);
    try{
      await submissions.createSubmission({formId:CONTACT_FORM_ID,submissions:{first_name:name.trim(),email:email.trim().toLowerCase(),subject:subject.trim(),message:message.trim()}});
      setSent(true);setName('');setEmail('');setSubject('');setMessage('');
    }catch{
      setError(ro?'Trimiterea a eșuat. Poți trimite direct un email.':'Message could not be sent. Please try email instead.');
    }finally{setBusy(false)}
  }
  return <>
    <NordlysPageHeading eyebrow={ro?'Colaborări':'Professional enquiries'} title={ro?'Contact':'Contact'} intro={ro?'Pentru colaborări, oportunități profesionale și proiecte de securitate.':'For cybersecurity engagements, professional opportunities and collaborations.'}/>
    <form onSubmit={send} aria-label={ro?'Formular de contact':'Contact form'}>
      <div className="nordlys-field"><label htmlFor="n-contact-name">{ro?'Nume':'Name'}</label><input id="n-contact-name" type="text" autoComplete="name" required maxLength={120} value={name} onChange={e=>setName(e.target.value)}/></div>
      <div className="nordlys-field"><label htmlFor="n-contact-email">Email</label><input id="n-contact-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)}/></div>
      <div className="nordlys-field"><label htmlFor="n-contact-subject">{ro?'Subiect':'Subject'}</label><input id="n-contact-subject" required maxLength={180} value={subject} onChange={e=>setSubject(e.target.value)}/></div>
      <div className="nordlys-field"><label htmlFor="n-contact-message">{ro?'Mesaj':'Message'}</label><textarea id="n-contact-message" required minLength={10} maxLength={6000} value={message} onChange={e=>setMessage(e.target.value)}/></div>
      <p className="nordlys-item-meta">{ro?'Mesajele sunt procesate prin Wix Forms, conform':'Submissions are processed using Wix Forms, as described in the'} <Link viewTransition className="nordlys-inline-link" to={localizedPath('/privacy',lang)}>{ro?'politicii de confidențialitate':'privacy policy'}</Link>.</p>
      <button className="nordlys-btn" type="submit" disabled={busy}>{busy?(ro?'Se trimite…':'Sending…'):(ro?'Trimite mesajul':'Send message')}</button>
      {sent&&<p className="nordlys-feedback" role="status">{ro?'Mesaj trimis. Mulțumesc!':'Message sent. Thank you!'}</p>}
      {error&&<p className="nordlys-feedback" role="alert">{error}</p>}
    </form>
    <section className="nordlys-section"><h2 className="nordlys-section-title">{ro?'Alte metode de contact':'Other ways to connect'}</h2>
      <p className="nordlys-item-description"><a className="nordlys-inline-link" href={'mailto:'+portfolio.email}>{portfolio.email}</a></p>
      <p className="nordlys-item-description"><a className="nordlys-inline-link" href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></p>
      <p className="nordlys-item-description">{ro?'Pentru CV, trimite un mesaj cu subiectul „CV Request”.':'To request a CV, use the subject “CV Request”.'}</p>
    </section>
  </>;
}
