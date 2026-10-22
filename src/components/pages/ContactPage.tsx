import { useState, type FormEvent } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { submissions } from '@wix/forms';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLanguage, localizedPath, portfolio } from '@/lib/portfolio';

/** Owned and editable in Wix Forms → Liviu Bucel — Contact. */
const CONTACT_FORM_ID = '350bbd87-09af-4295-9dbc-7e9cab1123bb';

export default function ContactPage() {
  const lang = getLanguage(useLocation().pathname);
  const isRo = lang==='ro';
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [subject,setSubject]=useState('');
  const [message,setMessage]=useState('');
  const [busy,setBusy]=useState(false);
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState('');

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);setSuccess(false);setError('');
    try {
      await submissions.createSubmission({
        formId: CONTACT_FORM_ID,
        submissions: {
          first_name: name.trim(),
          email: email.trim().toLowerCase(),
          subject: subject.trim(),
          message: message.trim()
        }
      });
      setSuccess(true);
      setName('');setEmail('');setSubject('');setMessage('');
    } catch {
      setError(isRo ? 'Trimiterea nu a reușit. Poți folosi adresa de email de mai jos.' : 'Your message was not sent. You can contact me directly using the email below.');
    } finally {setBusy(false);}
  }

  return <div className="lb-page">
    <Header/>
    <main>
      <section className="lb-section lb-section-alt">
        <div className="lb-container">
          <p className="lb-eyebrow">{isRo?'Contact profesional':'Professional enquiries'}</p>
          <h1 className="lb-headline">{isRo?'Hai să discutăm.':"Let's talk."}</h1>
          <p className="lb-summary">{isRo
            ? 'Oportunități în cybersecurity, colaborări, proiecte tehnice și investigații digitale.'
            : 'Cybersecurity opportunities, collaborations, technical projects, and digital investigations.'}</p>
        </div>
      </section>
      <section className="lb-section"><div className="lb-container lb-split">
        <div>
          <h2 className="lb-headline" style={{fontSize:'clamp(2rem,3vw,3rem)'}}>{isRo?'Trimite un mesaj':'Send a message'}</h2>
          <form className="mzp-c-form lb-form" onSubmit={send}>
            <div className="mzp-c-field"><label className="mzp-c-field-label" htmlFor="contact-name">{isRo?'Nume':'Name'}</label>
              <input id="contact-name" className="mzp-c-field-control" type="text" value={name} autoComplete="name" required maxLength={120} onChange={e=>setName(e.target.value)}/></div>
            <div className="mzp-c-field"><label className="mzp-c-field-label" htmlFor="contact-email">Email</label>
              <input id="contact-email" className="mzp-c-field-control" type="email" value={email} autoComplete="email" required maxLength={254} onChange={e=>setEmail(e.target.value)}/></div>
            <div className="mzp-c-field"><label className="mzp-c-field-label" htmlFor="contact-subject">{isRo?'Subiect':'Subject'}</label>
              <input id="contact-subject" className="mzp-c-field-control" type="text" value={subject} required maxLength={180} onChange={e=>setSubject(e.target.value)}/></div>
            <div className="mzp-c-field"><label className="mzp-c-field-label" htmlFor="contact-message">{isRo?'Mesaj':'Message'}</label>
              <textarea id="contact-message" className="mzp-c-field-control" value={message} required minLength={10} maxLength={6000} onChange={e=>setMessage(e.target.value)}/></div>
            <p className="lb-privacy-note">{isRo?'Prin trimitere, datele introduse sunt prelucrate pentru răspuns, prin Wix Forms.':'Messages are processed through native Wix Forms so I can reply.'}{' '}
              <Link className="lb-text-link" to={localizedPath('/privacy',lang)}>{isRo?'Confidențialitate':'Privacy policy'}</Link>
            </p>
            <div className="lb-actions"><button className="mzp-c-button" type="submit" disabled={busy}>{busy?(isRo?'Se trimite…':'Sending…'):(isRo?'Trimite mesajul':'Send message')}</button></div>
            <div aria-live="polite" role="status">
              {success && <p className="lb-notice">{isRo?'Mesajul a fost trimis. Mulțumesc!':'Your message was sent. Thank you!'}</p>}
              {error && <p className="lb-notice" role="alert">{error}</p>}
            </div>
          </form>
        </div>
        <aside>
          <h2 style={{fontSize:'1.4rem',fontWeight:700,marginBottom:24}}>{isRo?'Date de contact':'Other ways to connect'}</h2>
          <div className="lb-footer-links" style={{gap:18}}>
            <a className="lb-text-link" href={'mailto:'+portfolio.email}>{portfolio.email}</a>
            <a className="lb-text-link" href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a className="lb-text-link" href={portfolio.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a className="lb-text-link" href={portfolio.links.tryhackme} target="_blank" rel="noopener noreferrer">TryHackMe ↗</a>
          </div>
          <hr className="lb-rule" style={{margin:'32px 0'}}/>
          <h3 style={{fontWeight:700,fontSize:'1.35rem'}}>{isRo?'Ai nevoie de CV?':'Need my CV?'}</h3>
          <p className="lb-privacy-note">{isRo?'Solicită o copie prin formularul de contact sau email. Nu există un link public neprotejat.':'Request a copy through this form or email. No unprotected public CV link is provided.'}</p>
          <a className="lb-text-link" href={'mailto:'+portfolio.email+'?subject='+encodeURIComponent('CV request – Liviu Bucel')}>{isRo?'Solicită CV-ul →':'Request CV →'}</a>
        </aside>
      </div></section>
    </main>
    <Footer/>
  </div>;
}
