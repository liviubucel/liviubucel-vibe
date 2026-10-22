import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Youtube, Mail } from 'lucide-react';
import { getLanguage, labels, localizedPath, portfolio } from '@/lib/portfolio';

export default function Footer() {
  const language = getLanguage(useLocation().pathname);
  const t = labels[language];
  const socials = [
    { label: 'GitHub', url: portfolio.links.github, icon: Github },
    { label: 'LinkedIn', url: portfolio.links.linkedin, icon: Linkedin },
    { label: 'YouTube', url: portfolio.links.youtube, icon: Youtube },
  ];

  return (
    <footer className="w-full bg-secondary border-t border-divider/10">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-heading font-bold text-secondary-foreground text-xl">{portfolio.name}</p>
            <p className="mt-3 text-secondary-foreground/70 text-sm">{portfolio.title}</p>
            <p className="mt-3 text-secondary-foreground/60 text-sm">{t.profile}</p>
          </div>
          <nav aria-label={language === 'ro' ? 'Linkuri în subsol' : 'Footer links'}>
            <p className="text-secondary-foreground font-semibold mb-4">{language === 'ro' ? 'Navigare' : 'Explore'}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {([
                ['projects', '/projects'],
                ['blog', '/blog'],
                ['monitor', '/romania-cyber-monitor'],
                ['contact', '/contact'],
                ['privacy', '/privacy'],
              ] as const).map(([key, path]) => (
                <Link key={path} to={localizedPath(path, language)} className="text-secondary-foreground/70 hover:text-primary">{t[key]}</Link>
              ))}
            </div>
          </nav>
          <div>
            <p className="text-secondary-foreground font-semibold mb-4">{language === 'ro' ? 'Conectează-te' : 'Connect'}</p>
            <div className="flex gap-4 mb-5">
              {socials.map(({ label, url, icon: Icon }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  aria-label={label} className="text-secondary-foreground/70 hover:text-primary"><Icon className="w-5 h-5" /></a>
              ))}
              <a href={'mailto:' + portfolio.email} aria-label="Email" className="text-secondary-foreground/70 hover:text-primary"><Mail className="w-5 h-5" /></a>
            </div>
            <a href={'mailto:' + portfolio.email} className="text-secondary-foreground/70 hover:text-primary text-sm">{portfolio.email}</a>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-divider/10 flex flex-wrap justify-between gap-3 text-secondary-foreground/60 text-xs">
          <span>© {new Date().getFullYear()} {portfolio.name}. {t.motto}</span>
          <span>{language === 'ro' ? 'Conținut editabil în Wix CMS' : 'Content managed with Wix CMS'}</span>
        </div>
      </div>
    </footer>
  );
}
