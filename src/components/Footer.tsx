import { Link, useLocation } from 'react-router-dom';
import { getLanguage, labels, localizedPath, portfolio } from '@/lib/portfolio';

export default function Footer() {
  const language = getLanguage(useLocation().pathname);
  const t = labels[language];
  const sections = [
    { key: 'about', url: '/about' },
    { key: 'projects', url: '/projects' },
    { key: 'experience', url: '/experience' },
    { key: 'blog', url: '/blog' },
    { key: 'monitor', url: '/romania-cyber-monitor' },
    { key: 'contact', url: '/contact' },
    { key: 'privacy', url: '/privacy' },
  ] as const;
  return (
    <footer className="mzp-c-footer lb-footer">
      <div className="mzp-l-content">
        <div className="lb-footer-grid">
          <div>
            <div className="lb-footer-logo">{portfolio.name}</div>
            <p style={{marginTop:18,opacity:.75}}>{t.heading}</p>
            <p style={{marginTop:20}}>{t.motto}</p>
          </div>
          <nav aria-label={language==='ro'?'Navigare subsol':'Footer navigation'}>
            <h3 className="lb-footer-title">{language==='ro'?'Explorează':'Explore'}</h3>
            <div className="lb-footer-links">
              {sections.map(({key,url})=><Link key={url} to={localizedPath(url,language)}>{t[key]}</Link>)}
            </div>
          </nav>
          <div>
            <h3 className="lb-footer-title">{language==='ro'?'Conectează-te':'Connect'}</h3>
            <div className="lb-footer-links">
              <a href={'mailto:'+portfolio.email}>{portfolio.email}</a>
              <a href={portfolio.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={portfolio.links.tryhackme} target="_blank" rel="noopener noreferrer">TryHackMe</a>
              <a href={portfolio.links.zebrabyte} target="_blank" rel="noopener noreferrer">ZebraByte</a>
            </div>
          </div>
        </div>
        <div className="lb-footer-bottom">
          <span>© {new Date().getFullYear()} {portfolio.name}. {t.motto}</span>
          <span>{language==='ro'?'Website personal independent.':'Independent personal website.'}</span>
        </div>
      </div>
    </footer>
  );
}
