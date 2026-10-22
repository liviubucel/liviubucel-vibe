import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail, ShieldCheck, BookOpen, ExternalLink } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import type { AbonaiNewsletter, BlogArticles, Proiecte } from '@/entities';
import { getLanguage, labels, localizedPath, portfolio } from '@/lib/portfolio';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const lang = getLanguage(useLocation().pathname);
  const t = labels[lang];
  const [projects, setProjects] = useState<Proiecte[]>([]);
  const [posts, setPosts] = useState<BlogArticles[]>([]);
  const [email, setEmail] = useState('');
  const [consented, setConsented] = useState(false);
  const [busy, setBusy] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchContent() {
      const responses = await Promise.allSettled([
        BaseCrudService.getAll<Proiecte>('proiecte', [], { limit: 30 }),
        BaseCrudService.getAll<BlogArticles>('articoleblog', [], { limit: 30 }),
      ]);
      if (!mounted) return;
      if (responses[0].status === 'fulfilled') setProjects(responses[0].value.items);
      if (responses[1].status === 'fulfilled') {
        setPosts(responses[1].value.items.slice().sort((a, b) =>
          String(b.publicationDate || '').localeCompare(String(a.publicationDate || ''))));
      }
      setHasLoaded(true);
    }
    fetchContent();
    return () => { mounted = false; };
  }, []);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consented || !email.trim() || busy) return;
    setBusy(true);
    setResultMessage('');
    try {
      await BaseCrudService.create<AbonaiNewsletter>('abonatinewsletter', {
        emailAddress: email.trim().toLowerCase(),
        privacyPolicyAgreement: true,
        subscriptionDate: new Date().toISOString(),
      });
      setEmail('');
      setConsented(false);
      setResultMessage(t.submitted);
    } catch {
      setResultMessage(t.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="bg-secondary text-secondary-foreground">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-16 py-20 lg:py-28 grid gap-12 lg:grid-cols-[1.5fr_0.7fr] items-center">
            <div>
              <p className="text-primary uppercase tracking-[0.2em] text-xs font-semibold mb-6">{t.heading}</p>
              <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl leading-[1.05] font-bold tracking-tight mb-8">
                {lang === 'ro' ? 'Salut, sunt' : "Hello, I'm"} <span className="text-primary">{portfolio.name}</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-secondary-foreground/80 max-w-3xl">{t.intro}</p>
              <p className="mt-7 font-semibold tracking-widest text-sm">{t.motto}</p>
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <Link className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded inline-flex gap-2 items-center" to={localizedPath('/projects', lang)}>
                  {t.latestProjects} <ArrowRight size={18} />
                </Link>
                <Link className="border border-secondary-foreground/30 text-secondary-foreground font-semibold px-6 py-3 rounded" to={localizedPath('/contact', lang)}>
                  {t.cta}
                </Link>
              </div>
              <div className="flex gap-6 items-center mt-10">
                <a href={portfolio.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-secondary-foreground/70 hover:text-primary"><Github size={22}/></a>
                <a href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-secondary-foreground/70 hover:text-primary"><Linkedin size={22}/></a>
                <a href={'mailto:' + portfolio.email} aria-label="Email" className="text-secondary-foreground/70 hover:text-primary"><Mail size={22}/></a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 sm:w-80 lg:w-full max-w-sm overflow-hidden rounded-lg border border-secondary-foreground/10">
                <Image src={portfolio.media.portrait} alt={lang === 'ro' ? 'Portret Liviu Bucel' : 'Portrait of Liviu Bucel'} className="w-full h-auto object-cover" width={620} />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[100rem] mx-auto px-6 lg:px-16 py-20">
          <div className="flex items-center gap-3 mb-8"><ShieldCheck className="text-primary" /><h2 className="font-heading text-3xl sm:text-4xl font-bold">{lang === 'ro' ? 'Domenii de interes' : 'Core focus'}</h2></div>
          <p className="text-foreground/75 text-lg max-w-4xl mb-10">{t.profile}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.areas.map(area => <div key={area} className="border border-divider/30 bg-secondary text-secondary-foreground rounded p-6 font-semibold">{area}</div>)}
          </div>
          <div className="mt-8 text-sm text-foreground/75">
            <a href={portfolio.links.tryhackme} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">TryHackMe</a>
            <span className="mx-3">·</span>
            <a href={portfolio.links.zebrabyte} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">ZebraByte</a>
          </div>
        </section>

        <section className="bg-secondary text-secondary-foreground">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-16 py-20">
            <div className="flex flex-wrap justify-between items-end gap-5 mb-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold">{t.latestProjects}</h2>
              <Link to={localizedPath('/projects',lang)} className="text-primary flex items-center gap-2">{t.more} <ArrowRight size={16}/></Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6 min-h-32">
              {projects.slice(0,4).map(project => (
                <Link to={localizedPath('/projects/' + project._id, lang)} key={project._id}
                  className="border border-secondary-foreground/20 rounded p-8 hover:border-primary transition-colors">
                  <h3 className="font-heading text-2xl font-semibold mb-3">{project.projectTitle}</h3>
                  <p className="text-secondary-foreground/75 mb-5 line-clamp-3">{project.detailedDescription}</p>
                  {project.technologiesUsed && <p className="text-sm text-primary">{project.technologiesUsed}</p>}
                  <span className="mt-5 flex gap-2 items-center text-sm"><ExternalLink size={16}/>{lang === 'ro' ? 'Detalii' : 'Details'}</span>
                </Link>
              ))}
              {hasLoaded && projects.length === 0 && <p className="text-secondary-foreground/70">{t.emptyProjects}</p>}
            </div>
          </div>
        </section>

        <section className="max-w-[100rem] mx-auto px-6 lg:px-16 py-20">
          <div className="flex flex-wrap justify-between items-end gap-5 mb-10">
            <div className="flex items-center gap-3"><BookOpen className="text-primary"/><h2 className="font-heading text-3xl sm:text-4xl font-bold">{t.latestPosts}</h2></div>
            <Link to={localizedPath('/blog',lang)} className="text-primary flex items-center gap-2">{t.more} <ArrowRight size={16}/></Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 min-h-32">
            {posts.slice(0,4).map(post => (
              <Link key={post._id} to={localizedPath('/blog/' + (post.slug || post._id), lang)}
                className="rounded border border-divider/30 p-7 hover:border-primary transition-colors">
                <p className="text-sm text-foreground/60 mb-3">{post.publicationDate ? String(post.publicationDate).slice(0,10) : ''}</p>
                <h3 className="font-heading text-xl font-semibold mb-3">{post.articleTitle}</h3>
                <p className="text-foreground/75 line-clamp-3">{post.excerpt}</p>
              </Link>
            ))}
            {hasLoaded && posts.length === 0 && <p className="text-foreground/70">{t.emptyPosts}</p>}
          </div>
        </section>

        <section className="bg-secondary text-secondary-foreground">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-16 py-20 grid md:grid-cols-2 gap-10">
            <div><h2 className="font-heading text-3xl sm:text-4xl font-bold mb-5">{t.subscribe}</h2><p className="text-secondary-foreground/75">{t.subscribeText}</p></div>
            <form onSubmit={subscribe} className="space-y-5">
              <label className="block text-sm" htmlFor="subscription-email">Email</label>
              <input id="subscription-email" type="email" autoComplete="email" required value={email}
                onChange={event => setEmail(event.target.value)}
                className="w-full rounded bg-background text-foreground border border-divider/30 px-4 py-3" placeholder="you@example.com"/>
              <label className="flex gap-3 items-start text-sm text-secondary-foreground/80">
                <input type="checkbox" required checked={consented} onChange={event => setConsented(event.target.checked)} className="mt-1"/>
                <span>{t.consent} <Link className="underline" to={localizedPath('/privacy', lang)}>{t.privacy}</Link></span>
              </label>
              <button type="submit" disabled={busy || !consented} className="rounded bg-primary text-primary-foreground font-semibold px-6 py-3 disabled:opacity-50">{busy ? t.subscribing : t.subscribeAction}</button>
              <p aria-live="polite" role="status" className="text-sm">{resultMessage}</p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
