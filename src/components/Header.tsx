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
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const language = getLanguage(location.pathname);
  const t = labels[language];
  const switchLanguage = language === 'en' ? 'ro' : 'en';
  const unprefixedPath = location.pathname.replace(/^\/ro(?=\/|$)/, '') || '/';
  const languageHref = localizedPath(unprefixedPath, switchLanguage);
  const nav = navigation.map(item => ({
    ...item,
    href: localizedPath(item.path, language),
    label: t[item.key],
  }));

  return (
    <header className="sticky top-0 z-50 bg-secondary border-b border-divider/10">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-16">
        <div className="min-h-20 flex items-center justify-between gap-6">
          <Link to={localizedPath('/', language)} aria-label={portfolio.name} className="font-heading text-xl font-bold text-secondary-foreground">
            {portfolio.name}
          </Link>
          <nav aria-label={language === 'ro' ? 'Navigare principală' : 'Main navigation'} className="hidden xl:flex gap-5 items-center">
            {nav.map(item => (
              <Link key={item.href} to={item.href}
                aria-current={location.pathname === item.href ? 'page' : undefined}
                className={location.pathname === item.href ? 'text-primary font-semibold text-sm' : 'text-secondary-foreground/80 hover:text-primary text-sm'}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to={languageHref} hrefLang={switchLanguage} aria-label={switchLanguage === 'ro' ? 'Română' : 'English'}
              className="rounded border border-divider/30 px-3 py-2 text-sm text-secondary-foreground hover:text-primary">
              {switchLanguage.toUpperCase()}
            </Link>
            <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen} aria-controls="portfolio-mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden p-2 text-secondary-foreground">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="portfolio-mobile-nav" aria-label="Mobile navigation" className="xl:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 py-6 border-t border-divider/10">
            {nav.map(item => (
              <Link key={item.href} to={item.href} onClick={() => setMenuOpen(false)}
                aria-current={location.pathname === item.href ? 'page' : undefined}
                className="text-secondary-foreground hover:text-primary py-2 text-sm">
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
