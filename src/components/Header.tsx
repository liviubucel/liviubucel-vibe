import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getLanguage, labels, localizedPath, portfolio } from '@/lib/portfolio';

const navigation = [
  { path: '/', key: 'home' },
  { path: '/about', key: 'about' },
  { path: '/projects', key: 'projects' },
  { path: '/accreditations', key: 'accreditations' },
  { path: '/experience', key: 'experience' },
  { path: '/blog', key: 'blog' },
  { path: '/romania-cyber-monitor', key: 'monitor' },
  { path: '/contact', key: 'contact' },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const language = getLanguage(pathname);
  const otherLanguage = language === 'en' ? 'ro' : 'en';
  const currentBase = pathname.replace(/^\/ro(?=\/|$)/, '') || '/';
  const t = labels[language];
  return (
    <header className="mzp-c-navigation lb-navigation" role="banner">
      <div className="mzp-c-navigation-l-content">
        <div className="mzp-c-navigation-container">
          <div className="mzp-c-navigation-logo">
            <Link to={localizedPath('/',language)} aria-label={portfolio.name}>{portfolio.name}</Link>
          </div>
          <button type="button" className="lb-mobile-button"
            aria-controls="lb-protocol-menu" aria-expanded={open}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen(value => !value)}>
            {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
            <span style={{ marginLeft: 8 }}>{language === 'ro' ? 'Meniu' : 'Menu'}</span>
          </button>
          <div className={'mzp-c-navigation-items' + (open ? ' lb-menu-open' : '')} id="lb-protocol-menu">
            <div className="mzp-c-navigation-menu">
              <nav className="mzp-c-menu mzp-is-basic" aria-label={language === 'ro' ? 'Navigare principală' : 'Main navigation'}>
                <ul className="mzp-c-menu-category-list">
                  {navigation.map(({path,key}) => {
                    const href = localizedPath(path,language);
                    return (
                      <li className="mzp-c-menu-category" key={path}>
                        <Link className="mzp-c-menu-title" to={href}
                          aria-current={pathname === href ? 'page' : undefined}
                          onClick={() => setOpen(false)}>{t[key]}</Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            <Link to={localizedPath(currentBase,otherLanguage)} hrefLang={otherLanguage}
              onClick={()=>setOpen(false)} className="lb-language"
              aria-label={otherLanguage === 'ro' ? 'Vezi în română' : 'View in English'}>
              {otherLanguage.toUpperCase()}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
