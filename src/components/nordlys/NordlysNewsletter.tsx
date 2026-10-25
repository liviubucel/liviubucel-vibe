import {useState,type FormEvent} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {submissions} from '@wix/forms';
import {getLanguage,localizedPath} from '@/lib/portfolio';

/** Native Wix Forms -> Wix Contacts subscription field with mandatory consent. */
const NEWSLETTER_FORM_ID='e85c654a-1a61-44dd-beb7-54868f6c7014';
export default function NordlysNewsletter(){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const [email,setEmail]=useState(''),[consent,setConsent]=useState(false);
  const [busy,setBusy]=useState(false),[success,setSuccess]=useState(false),[error,setError]=useState('');
  async function subscribe(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(busy||!consent)return;
    setBusy(true);setSuccess(false);setError('');
    try{
      await submissions.createSubmission({formId:NEWSLETTER_FORM_ID,submissions:{email:email.trim().toLowerCase(),consent:true}});
      setSuccess(true);setEmail('');setConsent(false);
    }catch{
      setError(ro?'Solicitarea nu a putut fi trimisă. Încearcă din nou.':'Your request could not be sent. Please try again.');
    }finally{setBusy(false)}
  }
  return <section className="nordlys-section nordlys-newsletter" aria-label={ro?'Actualizări de securitate':'Security updates'}>
    <h2 className="nordlys-section-title">{ro?'Actualizări de securitate':'Security updates'}</h2>
    <p className="nordlys-item-description">{ro
      ? 'Primește prin email actualizări despre articole și cercetări în cybersecurity, atunci când serviciul de livrare este activat.'
      : 'Request email updates about cybersecurity articles and research when the mailing service is activated.'}</p>
    <form onSubmit={subscribe}>
      <div className="nordlys-field">
        <label htmlFor="nordlys-newsletter-email">Email</label>
        <input id="nordlys-newsletter-email" autoComplete="email" type="email" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)}/>
      </div>
      <label className="nordlys-newsletter-consent">
        <input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)}/>
        <span>{ro?'Sunt de acord să primesc actualizări prin email. Mă pot dezabona oricând.':'Yes, I consent to receiving security updates by email. I can unsubscribe at any time.'}</span>
      </label>
      <p className="nordlys-item-meta">{ro?'Detalii în':'See our'} <Link viewTransition className="nordlys-inline-link" to={localizedPath('/privacy',lang)}>{ro?'Politica de confidențialitate':'Privacy Policy'}</Link>.</p>
      <button className="nordlys-btn" type="submit" disabled={busy||!consent}>{busy?(ro?'Se trimite…':'Sending…'):(ro?'Solicită actualizări':'Request updates')}</button>
      {success&&<p role="status" className="nordlys-feedback">{ro?'Solicitarea a fost înregistrată. Actualizările vor fi trimise doar după activarea serviciului.':'Your request is recorded. Updates will only be sent after the mailing service is activated.'}</p>}
      {error&&<p role="alert" className="nordlys-feedback">{error}</p>}
    </form>
  </section>;
}
