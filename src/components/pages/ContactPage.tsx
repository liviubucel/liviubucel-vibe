import { Link, useLocation } from 'react-router-dom';
import { Mail, Github, Linkedin, Youtube, ExternalLink, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLanguage, localizedPath, portfolio } from '@/lib/portfolio';

const accounts = [
  { name: 'GitHub', url: portfolio.links.github, Icon: Github },
  { name: 'LinkedIn', url: portfolio.links.linkedin, Icon: Linkedin },
  { name: 'TryHackMe', url: portfolio.links.tryhackme, Icon: ExternalLink },
  { name: 'YouTube', url: portfolio.links.youtube, Icon: Youtube },
];

export default function ContactPage() {
  const lang = getLanguage(useLocation().pathname);
  const isRo = lang === 'ro';
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-secondary py-20 text-secondary-foreground">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-16">
            <p className="text-primary text-sm uppercase tracking-widest mb-6">Contact</p>
            <h1 className="font-heading font-bold text-5xl sm:text-6xl mb-5">
              {isRo ? 'Hai să vorbim' : "Let's talk"}
            </h1>
            <p className="text-secondary-foreground/75 text-lg max-w-3xl">
              {isRo ? 'Sunt deschis la oportunități și colaborări în securitate cibernetică, ingineria securității și investigații digitale.' : 'Open to roles, collaborations and professional conversations in cybersecurity, security engineering and digital forensics.'}
            </p>
          </div>
        </section>
        <section className="max-w-[100rem] mx-auto px-6 lg:px-16 py-20 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-3xl font-bold mb-6">{isRo ? 'Contact direct' : 'Direct contact'}</h2>
            <a href={'mailto:' + portfolio.email} className="flex items-center gap-3 text-xl text-primary underline break-all">
              <Mail size={22}/>{portfolio.email}
            </a>
            <p className="mt-6 text-foreground/70">
              {isRo ? 'Pentru recrutare, colaborări și solicitări profesionale, trimite-mi un email cu subiectul și contextul.' : 'For hiring, collaborations and professional enquiries, email me with a subject and some context.'}
            </p>
            <div className="mt-10 border border-divider/30 rounded p-6">
              <FileText className="text-primary mb-3"/>
              <h3 className="font-heading font-semibold text-xl mb-3">{isRo ? 'CV profesional' : 'Professional CV'}</h3>
              <p className="text-foreground/75 mb-5">
                {isRo ? 'CV-ul este disponibil la cerere, nu printr-un link public neprotejat.' : 'My CV is available on request, rather than through an unprotected public download.'}
              </p>
              <a className="inline-block bg-primary text-primary-foreground font-semibold px-6 py-3 rounded"
                href={'mailto:' + portfolio.email + '?subject=' + encodeURIComponent('CV request – Liviu Bucel')}>
                {isRo ? 'Solicită CV-ul' : 'Request CV'}
              </a>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold mb-6">{isRo ? 'Profiluri oficiale' : 'Official profiles'}</h2>
            <ul className="grid gap-4">
              {accounts.map(({name,url,Icon}) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 border border-divider/30 rounded p-5 hover:border-primary transition-colors">
                    <span className="flex items-center gap-3"><Icon size={22}/>{name}</span><ExternalLink size={16}/>
                  </a>
                </li>
              ))}
              <li>
                <Link to={localizedPath('/projects',lang)} className="flex items-center gap-3 text-primary underline pt-4">
                  {isRo ? 'Vezi proiectele mele tehnice' : 'Browse my technical projects'}
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
