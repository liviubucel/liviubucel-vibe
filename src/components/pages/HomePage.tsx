import { ArrowUpRight, Github, Linkedin, Youtube, Mail, ShieldCheck, FolderKanban, BriefcaseBusiness, BookOpen, Palette, Heart, Globe2 } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { submissions } from '@wix/forms';
import { getNativeProjects, type NativeProject } from '@/lib/wix-portfolio';
import { BaseCrudService } from '@/integrations';
import type { Accreditations } from '@/entities';
import { getPublishedBlogPosts, type NativeBlogPost } from '@/lib/wix-blog';
import { getLanguage, labels, localizedPath, portfolio } from '@/lib/portfolio';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SIGNUP_FORM_ID = 'e85c654a-1a61-44dd-beb7-54868f6c7014';

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
  const [credentials,setCredentials]=useState<Accreditations[]>([]);
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
      getPublishedBlogPosts(),
      BaseCrudService.getAll<Accreditations>('acreditari', [], {limit: 20})
    ]).then(result=>{
      if(!mounted)return;
      if(result[0].status==='fulfilled')setProjects(result[0].value);
      if(result[1].status==='fulfilled')setArticles(result[1].value);
      if(result[2].status==='fulfilled')setCredentials(result[2].value.items);
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

  return <div className="lb-page lb-portfolio-home">
    <Header/>
    <main id="main-content" className="lb-bento-stage">
      <div className="lb-bento-grid">
        <section className="lb-bento-panel lb-bento-hero">
          <div className="lb-bento-hero-copy">
            <p className="lb-bento-eyebrow">{t.heading}</p>
            <h1>{ro ? 'Salut 👋' : 'Hello 👋'}<span>{ro ? 'Sunt Liviu Bucel' : "I'm Liviu Bucel"}</span></h1>
            <p className="lb-bento-intro">{t.intro}</p>
            <p className="lb-bento-motto">{t.motto}</p>
            <nav className="lb-bento-socials" aria-label={ro ? 'Profiluri sociale' : 'Social profiles'}>
              <a href={portfolio.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={21}/></a>
              <a href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={21}/></a>
              <a href={portfolio.links.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={21}/></a>
              <a href={portfolio.links.tryhackme} target="_blank" rel="noopener noreferrer" aria-label="TryHackMe"><ShieldCheck size={21}/></a>
              <a href={'mailto:'+portfolio.email} aria-label="Email"><Mail size={21}/></a>
            </nav>
          </div>
          <Image src={portfolio.media.portrait} className="lb-bento-avatar"
            alt={ro ? 'Avatarul lui Liviu Bucel' : 'Liviu Bucel personal avatar'} loading="eager" />
        </section>

        <section className="lb-bento-panel lb-bento-about">
          <h2>{ro?'Despre mine':'About me'}</h2>
          <p>{ro?'Sunt Liviu, pasionat de securitatea cibernetică și investigațiile digitale.':'Hi, I am Liviu, focused on practical cybersecurity and digital investigation.'}</p>
          <p className="lb-bento-muted">{ro?'Domenii de interes:':'Areas of focus:'}</p>
          <ul>{t.areas.map(area=><li key={area}>{area}</li>)}</ul>
          <p>{t.profile}</p>
          <Link to={localizedPath('/about',lang)} className="lb-bento-inline-link">
            {ro?'Mai multe despre mine':'Learn more'} <ArrowUpRight size={17}/></Link>
        </section>

        <Link className="lb-bento-panel lb-bento-tile lb-bento-credentials" to={localizedPath('/accreditations',lang)}>
          <ShieldCheck size={22} aria-hidden="true"/>
          <h2>{t.accreditations}</h2>
          <p>{ro?'Certificări și pregătire profesională':'Certifications and professional learning'}</p>
          <ul className="lb-bento-credential-list">
            {credentials.map(item => <li key={item._id}>
              <strong>{item.certificationName}</strong>
              <span>{item.description?.replace('Status: ','').replace('.','') || '—'}</span>
            </li>)}
          </ul>
          <ArrowUpRight className="lb-bento-arrow" size={18} aria-hidden="true" />
        </Link>
        <div className="lb-bento-panel lb-bento-clock"><LocalTimes ro={ro}/></div>
        <Link className="lb-bento-panel lb-bento-tile lb-bento-projects" to={localizedPath('/projects',lang)}>
          <FolderKanban size={22} aria-hidden="true"/>
          <h2>{t.projects}</h2>
          <p>{projects.length>0 ? String(projects.length)+' '+(ro?'proiecte tehnice':'technical projects') : (ro?'Portofoliul meu tehnic':'My technical portfolio')}</p>
          <ArrowUpRight className="lb-bento-arrow" size={18} aria-hidden="true"/>
        </Link>
        <Link className="lb-bento-panel lb-bento-tile lb-bento-experience" to={localizedPath('/experience',lang)}>
          <BriefcaseBusiness size={22} aria-hidden="true"/>
          <h2>{t.experience}</h2>
          <p><span className="lb-bento-pulse" aria-hidden="true"/> {ro?'Deschis la oportunități':'Open to opportunities'}</p>
          <ArrowUpRight className="lb-bento-arrow" size={18} aria-hidden="true"/>
        </Link>
        <Link className="lb-bento-panel lb-bento-tile lb-bento-contact" to={localizedPath('/contact',lang)}>
          <Mail size={22} aria-hidden="true"/>
          <h2>{t.contact}</h2>
          <p>{ro?'Hai să discutăm':'Let us connect'}</p>
          <ArrowUpRight className="lb-bento-arrow" size={18} aria-hidden="true"/>
        </Link>
        <Link className="lb-bento-panel lb-bento-tile lb-bento-blog" to={localizedPath('/blog',lang)}>
          <BookOpen size={22} aria-hidden="true"/>
          <h2>{t.blog}</h2>
          <p>{articles[0]?.title || (ro?'Articole și cercetare':'Writing and research')}</p>
          <ArrowUpRight className="lb-bento-arrow" size={18} aria-hidden="true"/>
        </Link>
        <Link className="lb-bento-panel lb-bento-tile lb-bento-design" to={localizedPath('/design-works',lang)}>
          <Palette size={22} aria-hidden="true"/>
          <h2>{ro?'Lucrări de design':'Design works'}</h2>
          <ArrowUpRight className="lb-bento-arrow" size={18} aria-hidden="true"/>
        </Link>
        <a className="lb-bento-panel lb-bento-tile lb-bento-support" href="https://buymeacoffee.com/liviubucel" target="_blank" rel="noopener noreferrer">
          <Heart size={22} aria-hidden="true"/>
          <h2>{ro?'Susține munca mea':'Support my work'}</h2>
          <ArrowUpRight className="lb-bento-arrow" size={18} aria-hidden="true"/>
        </a>

        <section className="lb-bento-panel lb-bento-newsletter">
          <div>
            <h2>{ro?'Actualizări Romania Cyber Monitor':'Romania Cyber Monitor updates'}</h2>
            <p>{ro?'Înregistrare nativă Wix Forms. Activarea alertelor prin email urmează separat.':'Native Wix Forms signup. Email alerts will be enabled separately.'}</p>
          </div>
          <form onSubmit={subscribe}>
            <div className="lb-bento-input-row">
              <label className="lb-screen-reader" htmlFor="bento-email">Email</label>
              <input id="bento-email" type="email" required autoComplete="email" value={email}
                placeholder={ro?'Adresa ta de email':'Email address'} onChange={event=>setEmail(event.target.value)}/>
              <button type="submit" disabled={!consent||busy}>{busy?t.subscribing:t.subscribeAction}</button>
            </div>
            <label className="lb-bento-consent"><input type="checkbox" checked={consent} required onChange={event=>setConsent(event.target.checked)}/>
              <span>{t.consent} <Link to={localizedPath('/privacy',lang)}>{t.privacy}</Link></span>
            </label>
            {error&&<p role="alert" className="lb-bento-error">{error}</p>}
            {submitted&&<p role="status" className="lb-bento-success">{t.submitted}</p>}
          </form>
        </section>
        <section className="lb-bento-panel lb-bento-meta">
          <div>© {new Date().getFullYear()} · {t.motto}</div>
          <div className="lb-bento-meta-links">
            <Link to={localizedPath('/privacy',lang)}>{t.privacy}</Link>
            <Link to={ro?'/':'/ro'}>{ro?'EN':'RO'}</Link>
          </div>
        </section>
      </div>
      <nav className="lb-bento-extra-links" aria-label={ro?'Mai multe pagini':'More pages'}>
        <Link to={localizedPath('/romania-cyber-monitor',lang)}><Globe2 size={18}/>{t.monitor}<ArrowUpRight size={16}/></Link>
        <Link to={localizedPath('/contact',lang)}><Mail size={18}/>{ro?'Solicită CV-ul':'Request CV'}<ArrowUpRight size={16}/></Link>
      </nav>
    </main>
    <Footer/>
  </div>;
}
