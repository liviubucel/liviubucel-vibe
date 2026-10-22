import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { submissions } from '@wix/forms';
import { getNativeProjects,projectTechnologies,type NativeProject } from '@/lib/wix-portfolio';
import { getPublishedBlogPosts, type NativeBlogPost } from '@/lib/wix-blog';
import { getLanguage, labels, localizedPath, portfolio } from '@/lib/portfolio';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SIGNUP_FORM_ID = 'e85c654a-1a61-44dd-beb7-54868f6c7014';
const areas = [
  ['Ethical Hacking', 'Understand attacks and validate weaknesses'],
  ['Digital Forensics', 'Investigate incidents and preserve evidence'],
  ['Threat Intelligence', 'Separate attacker claims from verified facts'],
  ['Security Engineering', 'Build defensible systems and secure infrastructure'],
  ['PKI & TLS', 'Certificate management and ACME automation'],
  ['Vulnerability Research', 'Assess exploitability and practical remediation']
];

function LondonClock({ro}:{ro:boolean}) {
  const [time,setTime] = useState('');
  useEffect(()=>{
    const update=()=>setTime(new Intl.DateTimeFormat(ro?'ro-RO':'en-GB',{
      hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Europe/London'
    }).format(new Date()));
    update();
    const interval=setInterval(update,30000);
    return ()=>clearInterval(interval);
  },[ro]);
  return <div className="lb-feature">
    <div className="lb-eyebrow">{ro?'Ora locală':'Local time'} · UK</div>
    <h3 style={{fontSize:'clamp(2rem,4vw,3.5rem)',fontVariantNumeric:'tabular-nums',margin:0}}>{time || '—'}</h3>
    <p>{ro?'Europa/Londra':'Europe/London'}</p>
  </div>;
}

export default function HomePage() {
  const lang = getLanguage(useLocation().pathname);
  const ro = lang==='ro';
  const t = labels[lang];
  const [projects,setProjects]=useState<NativeProject[]>([]);
  const [articles,setArticles]=useState<NativeBlogPost[]>([]);
  const [email,setEmail]=useState('');
  const [consent,setConsent]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    let mounted=true;
    Promise.allSettled([
      getNativeProjects(),
      getPublishedBlogPosts()
    ]).then(result=>{
      if(!mounted)return;
      if(result[0].status==='fulfilled')setProjects(result[0].value);
      if(result[1].status==='fulfilled')setArticles(result[1].value);
      setLoading(false);
    });
    return ()=>{mounted=false};
  },[]);

  async function subscribe(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(busy||!consent||!email.trim())return;
    setBusy(true);setError('');setSubmitted(false);
    try {
      await submissions.createSubmission({
        formId:SIGNUP_FORM_ID,
        submissions:{email:email.trim().toLowerCase(),consent:true}
      });
      setSubmitted(true);setEmail('');setConsent(false);
    } catch {
      setError(ro?'Solicitarea nu a putut fi înregistrată.':'Your request could not be saved.');
    } finally {setBusy(false);}
  }

  return <div className="lb-page">
    <Header/>
    <main>
      <section className="lb-section">
        <div className="lb-container lb-intro">
          <div>
            <p className="lb-eyebrow">{ro?'Liviu Bucel · Securitate cibernetică':'Liviu Bucel · Cybersecurity'}</p>
            <h1 className="lb-display">{ro?'Securitate. Dovezi. Impact.':'Security. Evidence. Impact.'}</h1>
            <p className="lb-summary">{t.intro}</p>
            <p style={{fontWeight:700,letterSpacing:'.1em',fontSize:'.85rem',marginTop:32}}>{t.motto}</p>
            <div className="lb-actions">
              <Link className="mzp-c-button" to={localizedPath('/projects',lang)}>{t.projects}</Link>
              <Link className="mzp-c-button mzp-t-secondary" to={localizedPath('/contact',lang)}>{t.cta}</Link>
            </div>
            <div style={{display:'flex',gap:24,flexWrap:'wrap',marginTop:28}}>
              <a className="lb-text-link" href={portfolio.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a className="lb-text-link" href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a className="lb-text-link" href={portfolio.links.tryhackme} target="_blank" rel="noopener noreferrer">TryHackMe ↗</a>
            </div>
          </div>
          <div>
            <img src={portfolio.media.portrait} alt={ro?'Portret Liviu Bucel':'Liviu Bucel portrait'} loading="eager"/>
          </div>
        </div>
      </section>
      <hr className="lb-rule"/>
      <section className="lb-section lb-section-alt">
        <div className="lb-container">
          <p className="lb-eyebrow">{ro?'Despre mine':'What I do'}</p>
          <h2 className="lb-headline">{ro?'Explorez cum eșuează sistemele.':'Understanding how systems fail.'}</h2>
          <p className="lb-summary" style={{marginBottom:40}}>{t.profile}</p>
          <div className="lb-feature-grid">
            {areas.map(([name,desc])=><div className="lb-feature" key={name}>
              <h3>{name}</h3><p>{desc}</p>
            </div>)}
          </div>
          <div className="lb-actions"><Link className="lb-text-link" to={localizedPath('/about',lang)}>{ro?'Despre mine →':'Read more about me →'}</Link></div>
        </div>
      </section>
      <section className="lb-section">
        <div className="lb-container">
          <div style={{display:'flex',alignItems:'end',justifyContent:'space-between',gap:20,flexWrap:'wrap',marginBottom:32}}>
            <div><p className="lb-eyebrow">{ro?'Portofoliu':'Portfolio'}</p><h2 className="lb-headline">{t.latestProjects}</h2></div>
            <Link className="lb-text-link" to={localizedPath('/projects',lang)}>{ro?'Toate proiectele →':'All projects →'}</Link>
          </div>
          <div className="lb-cards">
            {projects.slice(0,4).map(project=><article className="mzp-c-card mzp-c-card-medium" key={project.id||project._id}>
              <Link to={localizedPath('/projects/'+(project.slug||project.id||project._id),lang)} className="lb-card">
                <p className="lb-card-meta">{projectTechnologies(project)||'Security engineering'}</p>
                <h3 className="lb-card-title">{project.title}</h3>
                <p>{project.description}</p>
                <span className="lb-text-link" aria-hidden="true">{ro?'Detalii →':'Details →'}</span>
              </Link>
            </article>)}
            {!loading && projects.length===0 && <p>{t.emptyProjects}</p>}
          </div>
        </div>
      </section>
      <section className="lb-section lb-section-alt">
        <div className="lb-container">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:20,flexWrap:'wrap',marginBottom:32}}>
            <div><p className="lb-eyebrow">{ro?'Articole':'Insights'}</p><h2 className="lb-headline">{t.latestPosts}</h2></div>
            <Link className="lb-text-link" to={localizedPath('/blog',lang)}>{ro?'Toate articolele →':'All articles →'}</Link>
          </div>
          <div className="lb-cards">
            {articles.slice(0,4).map(post=><article className="mzp-c-card mzp-c-card-medium" key={post._id||post.id}>
              <Link className="lb-card" to={localizedPath('/blog/'+(post.slug||post._id||post.id),lang)}>
                <p className="lb-card-meta">{post.language?.toUpperCase()}{post.firstPublishedDate?' · '+new Date(post.firstPublishedDate).toLocaleDateString(ro?'ro-RO':'en-GB'):''}</p>
                <h3 className="lb-card-title">{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="lb-text-link" aria-hidden="true">{ro?'Citește →':'Read →'}</span>
              </Link>
            </article>)}
          </div>
          {!loading && articles.length===0 && <p>{t.emptyPosts}</p>}
        </div>
      </section>
      <section className="lb-section">
        <div className="lb-container">
          <p className="lb-eyebrow">{ro?'Conectat cu lumea':'Beyond the page'}</p>
          <h2 className="lb-headline">{ro?'În prezent.':'Now & next.'}</h2>
          <div className="lb-feature-grid">
            <LondonClock ro={ro}/>
            <div className="lb-feature"><h3>{ro?'Experiență':'Experience'}</h3><p>{ro?'Lucrări și proiecte de securitate aplicată.':'Practical security projects and engineering work.'}</p>
              <Link className="lb-text-link" to={localizedPath('/experience',lang)}>{ro?'Vezi experiența →':'Explore experience →'}</Link></div>
            <div className="lb-feature"><h3>{ro?'Lucrări de design':'Design works'}</h3><p>{ro?'Explorări vizuale și proiecte personale.':'Selected visual explorations and personal work.'}</p>
              <Link className="lb-text-link" to={localizedPath('/design-works',lang)}>{ro?'Explorează →':'Explore work →'}</Link></div>
          </div>
          <p className="lb-privacy-note" style={{marginTop:24}}><a className="lb-text-link" href="https://buymeacoffee.com/liviubucel" target="_blank" rel="noopener noreferrer">{ro?'Susține proiectele mele ↗':'Support my independent work ↗'}</a></p>
        </div>
      </section>
      <section className="lb-section lb-section-alt">
        <div className="lb-container lb-split">
          <div>
            <p className="lb-eyebrow">Newsletter</p>
            <h2 className="lb-headline">{ro?'Actualizări de securitate.':'Security updates.'}</h2>
            <p className="lb-summary">{t.subscribeText}</p>
            <p className="lb-privacy-note">{ro?'Cererea și consimțământul sunt gestionate în Wix Forms și Wix Contacts. Trimiterea alertelor va fi activată separat.':'Your request and consent are managed in Wix Forms and Wix Contacts. Email delivery will be activated separately.'}</p>
          </div>
          <form className="mzp-c-form lb-form" onSubmit={subscribe}>
            <div className="mzp-c-field"><label className="mzp-c-field-label" htmlFor="updates-email">Email</label>
              <input className="mzp-c-field-control" id="updates-email" type="email" value={email} required autoComplete="email" onChange={e=>setEmail(e.target.value)}/></div>
            <label style={{display:'flex',gap:12,alignItems:'start',marginBottom:20}}>
              <input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)}/>
              <span>{t.consent} <Link className="lb-text-link" to={localizedPath('/privacy',lang)}>{t.privacy}</Link></span>
            </label>
            <div className="lb-actions"><button className="mzp-c-button" type="submit" disabled={busy||!consent}>{busy?t.subscribing:t.subscribeAction}</button></div>
            <div role="status" aria-live="polite">{submitted&&<p className="lb-notice">{t.submitted}</p>}{error&&<p role="alert" className="lb-notice">{error}</p>}</div>
          </form>
        </div>
      </section>
    </main>
    <Footer/>
  </div>;
}
