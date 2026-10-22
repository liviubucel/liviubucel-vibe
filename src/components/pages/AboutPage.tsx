import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Github, ShieldCheck } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLanguage, labels, localizedPath, portfolio } from '@/lib/portfolio';

const focus = [
  { en: 'Ethical hacking and security assessment', ro: 'Ethical hacking și evaluări de securitate' },
  { en: 'Digital forensics and incident investigation', ro: 'Investigații digitale și analiza incidentelor' },
  { en: 'Threat intelligence and defensive monitoring', ro: 'Threat intelligence și monitorizare defensivă' },
  { en: 'Security engineering and cloud infrastructure', ro: 'Ingineria securității și infrastructură cloud' },
  { en: 'PKI, TLS and certificate automation', ro: 'PKI, TLS și automatizarea certificatelor' },
  { en: 'Vulnerability research and remediation', ro: 'Cercetarea vulnerabilităților și remediere' },
] as const;

export default function AboutPage() {
  const lang = getLanguage(useLocation().pathname);
  const t = labels[lang];
  const ro = lang === 'ro';
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-secondary text-secondary-foreground py-20">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-16">
            <p className="uppercase text-primary tracking-widest text-sm mb-6">{t.about}</p>
            <h1 className="font-heading text-5xl sm:text-7xl font-bold mb-6">
              {ro ? 'Salut, sunt Liviu Bucel' : "Hello, I'm Liviu Bucel"}
            </h1>
            <p className="text-lg md:text-xl max-w-4xl text-secondary-foreground/80 leading-relaxed">{t.profile}</p>
          </div>
        </section>
        <section className="max-w-[100rem] mx-auto px-6 lg:px-16 py-20">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-12 items-start">
            <div>
              <Image src={portfolio.media.portrait} width={620}
                alt={ro ? 'Fotografie Liviu Bucel' : 'Liviu Bucel portrait'}
                className="w-full h-auto rounded-lg"/>
              <p className="mt-5 text-sm tracking-wider font-bold">{t.motto}</p>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6">{ro ? 'Abordarea mea' : 'How I work'}</h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-7">
                {ro
                  ? 'Încerc să înțeleg sistemele suficient de bine încât să pot explica atât cum eșuează, cât și cum pot fi protejate. Prefer testarea practică și constatările verificabile, nu presupunerile.'
                  : 'I investigate how attacks work and build practical systems that reduce real-world security risk. I care about understanding systems deeply enough to explain how they fail and how to make them harder to break.'}
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed mb-9">
                {ro
                  ? 'O parte importantă a proiectelor mele de inginerie a securității este dezvoltată prin ZebraByte, în domenii precum threat intelligence, PKI/TLS, infrastructură cloud și platforme securizate.'
                  : 'A significant part of my applied security engineering work is developed through ZebraByte, spanning threat intelligence, PKI/TLS automation, cloud infrastructure and security-focused platform engineering.'}
              </p>
              <h2 className="font-heading text-3xl font-bold mb-6">{ro ? 'Direcții tehnice' : 'Technical focus'}</h2>
              <ul className="grid sm:grid-cols-2 gap-4 mb-9">
                {focus.map((item) => (
                  <li key={item.en} className="flex gap-3 items-start border border-divider/30 rounded p-4">
                    <ShieldCheck className="shrink-0 text-primary" size={21}/>
                    <span>{item[lang]}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground/70 mb-8">
                {ro
                  ? 'Proiectele publice sunt exemple selectate. Datele clienților, cheile și detaliile operaționale sensibile nu sunt publicate.'
                  : 'Public repositories document selected work; customer data, credentials and production-sensitive details are private by design.'}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to={localizedPath('/projects',lang)} className="inline-flex gap-2 items-center rounded bg-primary text-primary-foreground font-semibold px-6 py-3">
                  {t.projects}<ArrowRight size={18}/>
                </Link>
                <a href={portfolio.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline text-primary">
                  <Github size={19}/>GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
