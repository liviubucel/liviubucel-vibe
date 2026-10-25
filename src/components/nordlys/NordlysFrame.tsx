import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {Link,Outlet,useLocation} from 'react-router-dom';
import {Github,Linkedin,Menu,Moon,Search,Sun,X,Rss} from 'lucide-react';
import {getLanguage,localizedPath,portfolio,type Language} from '@/lib/portfolio';
type ThemeMode='dark'|'light';
const ThemeContext=createContext<{mode:ThemeMode;toggle:()=>void}>({mode:'dark',toggle:()=>{}});
export function NordlysProvider({children}:{children:ReactNode}){
  const [mode,setMode]=useState<ThemeMode>('dark');
  useEffect(()=>{const saved=localStorage.getItem('liviubucel-nordlys-mode');if(saved==='light'||saved==='dark')setMode(saved)},[]);
  useEffect(()=>{document.documentElement.setAttribute('data-mode',mode);localStorage.setItem('liviubucel-nordlys-mode',mode)},[mode]);
  return <ThemeContext.Provider value={{mode,toggle:()=>setMode(m=>m==='dark'?'light':'dark')}}>{children}</ThemeContext.Provider>;
}
/* Original Nordlys glyph (GPL-3.0-only; see NORDLYS-LICENSE.md). */
export function AuroraMark({size=28}:{size?:number}){
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" aria-hidden="true"><path d="M2 3c.55 0 1 .45 1 1v9h2V5c0-.55.45-1 1-1s1 .45 1 1v8h2V6c0-.55.45-1 1-1s1 .45 1 1v7h1.5c.17 0 .34 0 .5.05V7c0-.55.45-1 1-1s1 .45 1 1v8.5a2.5 2.5 0 0 1-2.5 2.5h-1c-.28 0-.5.22-.5.5s.22.5.5.5H17V8c0-.55.45-1 1-1s1 .45 1 1v11h2V9c0-.55.45-1 1-1s1 .45 1 1v11c0 .55-.45 1-1 1H11.5a2.5 2.5 0 0 1 0-5h1c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H2c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1"/></svg>;
}
export function NordlysModeToggle(){
  const {mode,toggle}=useContext(ThemeContext);
  return <button type="button" className="nordlys-icon-button" onClick={toggle} aria-label={mode==='dark'?'Switch to light mode':'Switch to dark mode'} title={mode==='dark'?'Light mode':'Dark mode'}>{mode==='dark'?<Sun/>:<Moon/>}</button>;
}
function ExternalLinks(){return <>
  <a className="nordlys-iconlink" href={portfolio.links.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer"><Github/></a>
  <a className="nordlys-iconlink" href={portfolio.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin/></a>
  <a className="nordlys-iconlink" href="/rss.xml" aria-label="RSS feed"><Rss/></a>
</>;}
function LanguageSwitch({lang}:{lang:Language}){
  const {pathname}=useLocation();
  const path=pathname.startsWith('/ro')?pathname.slice(3)||'/':pathname;
  return <Link className="nordlys-iconlink" style={{fontSize:'.82rem',fontWeight:700}} to={localizedPath(path,lang==='ro'?'en':'ro')}>{lang==='ro'?'EN':'RO'}</Link>;
}
export function NordlysBottom({landing=false}:{landing?:boolean}){
  const lang=getLanguage(useLocation().pathname);
  return <footer className={landing?'nordlys-landing-footer':'nordlys-footer'}>
    <hr className="nordlys-separator"/>
    <div className={landing?'nordlys-bottom-bar':'nordlys-footer-row'}>
      {!landing&&<span>© {new Date().getFullYear()} {portfolio.name}</span>}
      <ExternalLinks/><span className="nordlys-grow"/><LanguageSwitch lang={lang}/><NordlysModeToggle/>
    </div>
  </footer>;
}
export function NordlysNavigation(){
  const loc=useLocation(),lang=getLanguage(loc.pathname),ro=lang==='ro';
  const [open,setOpen]=useState(false);
  useEffect(()=>setOpen(false),[loc.pathname]);
  const items=[
    ['/blog','Blog'],['/projects',ro?'Proiecte':'Projects'],
    ['/services',ro?'Servicii':'Services'],['/experience',ro?'Experiență':'Resume'],
    ['/tools',ro?'Instrumente':'Tools'],['/about',ro?'Despre':'About'],['/contact','Contact']
  ] as const;
  return <header className="nordlys-navbar">
    <a href="#main" style={{position:'absolute',top:'-200px'}} onFocus={e=>e.currentTarget.style.top='0'} onBlur={e=>e.currentTarget.style.top='-200px'}>Skip to content</a>
    <div className="nordlys-nav-row">
      <Link className="nordlys-logo-link" to={localizedPath('/',lang)}><AuroraMark/> {portfolio.name}</Link>
      <nav className="nordlys-navlinks" data-open={open} aria-label={ro?'Navigare principală':'Main navigation'}>
        {items.map(([path,label])=><Link key={path} to={localizedPath(path,lang)} aria-current={loc.pathname===localizedPath(path,lang)?'page':undefined}>{label}</Link>)}
        <Link to={localizedPath('/search',lang)} aria-label={ro?'Căutare':'Search'}><Search size={19}/></Link>
        <NordlysModeToggle/>
      </nav>
      <button type="button" className="nordlys-icon-button nordlys-mobile-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
    </div><hr className="nordlys-separator" style={{marginTop:26}}/>
  </header>;
}
export function NordlysFrame(){
  const {pathname}=useLocation();
  const isHome=pathname==='/'||pathname==='/ro'||pathname==='/ro/';
  return <div className="nordlys-root"><div className="nordlys-container">
    {isHome?<Outlet/>:<div className="nordlys-main"><NordlysNavigation/><main id="main" className="nordlys-main-body"><Outlet/></main><NordlysBottom/></div>}
  </div></div>;
}
export function NordlysPageHeading({eyebrow,title,intro}:{eyebrow?:string;title:string;intro?:string}){
  return <div className="nordlys-section">{eyebrow&&<p className="nordlys-kicker">{eyebrow}</p>}<h1 className="nordlys-page-title">{title}</h1>{intro&&<p className="nordlys-page-lead">{intro}</p>}</div>;
}
