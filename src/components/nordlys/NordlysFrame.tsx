import {createContext,useContext,useEffect,useRef,useState,type MouseEvent,type ReactNode} from 'react';
import {Link,Outlet,useLocation} from 'react-router-dom';
import {Github,Linkedin,Menu,Moon,Search,Sun,X,Rss,ChevronDown,ArrowUp} from 'lucide-react';
import {getLanguage,localizedPath,portfolio,type Language} from '@/lib/portfolio';
import NordlysSeo from '@/components/nordlys/NordlysSeo';

/**
 * React adaptation of Nordlys original theme UI/animations:
 * src/components/mode/ModeToggle.astro, Header.astro, Dropdown.astro,
 * MobileNavToggle.astro, ScrollToTopPlugin.astro. GPL-3.0-only.
 */
type ThemeMode='dark'|'light';
const ThemeContext=createContext<{mode:ThemeMode;setMode:(mode:ThemeMode)=>void}>({mode:'dark',setMode:()=>{}});
const modeKey='liviubucel-nordlys-mode';
export function NordlysProvider({children}:{children:ReactNode}){
  const [mode,setMode]=useState<ThemeMode>(()=>{
    if(typeof window==='undefined')return 'dark';
    try{return localStorage.getItem(modeKey)==='light'?'light':'dark'}catch{return 'dark'}
  });
  useEffect(()=>{
    document.documentElement.dataset.mode=mode;
    document.documentElement.style.colorScheme=mode;
    try{localStorage.setItem(modeKey,mode)}catch{}
  },[mode]);
  return <ThemeContext.Provider value={{mode,setMode}}>{children}</ThemeContext.Provider>;
}
/** Original Nordlys logo glyph (GPL-3.0-only). */
export function AuroraMark({size=28}:{size?:number}){
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" aria-hidden="true"><path d="M2 3c.55 0 1 .45 1 1v9h2V5c0-.55.45-1 1-1s1 .45 1 1v8h2V6c0-.55.45-1 1-1s1 .45 1 1v7h1.5c.17 0 .34 0 .5.05V7c0-.55.45-1 1-1s1 .45 1 1v8.5a2.5 2.5 0 0 1-2.5 2.5h-1c-.28 0-.5.22-.5.5s.22.5.5.5H17V8c0-.55.45-1 1-1s1 .45 1 1v11h2V9c0-.55.45-1 1-1s1 .45 1 1v11c0 .55-.45 1-1 1H11.5a2.5 2.5 0 0 1 0-5h1c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H2c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1"/></svg>;
}
type NativeTransition={ready:Promise<void>;finished:Promise<void>};
type TransitionDoc=Document & {startViewTransition?: (callback:()=>void)=>NativeTransition};
export function NordlysModeToggle(){
  const {mode,setMode}=useContext(ThemeContext);
  const toggle=(event:MouseEvent<HTMLButtonElement>)=>{
    const next:ThemeMode=mode==='dark'?'light':'dark';
    const update=()=>{
      document.documentElement.dataset.mode=next;
      document.documentElement.style.colorScheme=next;
      setMode(next);
    };
    const start=(document as TransitionDoc).startViewTransition;
    if(!start || window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      update();return;
    }
    const x=event.clientX,y=event.clientY;
    const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
    document.documentElement.classList.add('theme-switching');
    try{
      const transition=start.call(document,update);
      void transition.ready.then(()=>{
        document.documentElement.animate(
          {clipPath:['circle(0px at '+x+'px '+y+'px)','circle('+radius+'px at '+x+'px '+y+'px)']},
          {duration:600,easing:'cubic-bezier(.76,.32,.29,.99)',pseudoElement:'::view-transition-new(root)'}
        );
      }).catch(()=>{});
      void transition.finished.finally(()=>document.documentElement.classList.remove('theme-switching'));
    }catch{
      document.documentElement.classList.remove('theme-switching');
      update();
    }
  };
  return <button type="button" className="nordlys-icon-button" onClick={toggle}
    aria-label={mode==='dark'?'Switch to light mode':'Switch to dark mode'}
    title={mode==='dark'?'Light mode':'Dark mode'}>{mode==='dark'?<Moon/>:<Sun/>}</button>;
}
function ExternalLinks(){return <>
  <a className="nordlys-iconlink" href={portfolio.links.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer"><Github/></a>
  <a className="nordlys-iconlink" href={portfolio.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin/></a>
  <a className="nordlys-iconlink" href="/rss.xml" aria-label="RSS feed"><Rss/></a>
</>;}
function LanguageSwitch({lang}:{lang:Language}){
  const {pathname}=useLocation();
  const path=pathname.startsWith('/ro')?pathname.slice(3)||'/':pathname;
  return <Link viewTransition className="nordlys-iconlink" style={{fontSize:'.82rem',fontWeight:700}} to={localizedPath(path,lang==='ro'?'en':'ro')}>{lang==='ro'?'EN':'RO'}</Link>;
}
export function NordlysBottom({landing=false}:{landing?:boolean}){
  const lang=getLanguage(useLocation().pathname);
  return <footer className={landing?'nordlys-landing-footer':'nordlys-footer'}>
    <hr className="nordlys-separator"/>
    <div className={landing?'nordlys-bottom-bar':'nordlys-footer-row'}>
      {!landing&&<span>© {new Date().getFullYear()} {portfolio.name}</span>}
      <ExternalLinks/><span className="nordlys-grow"/>
      <LanguageSwitch lang={lang}/><NordlysModeToggle/>
    </div>
  </footer>;
}
function NordlysDropdown({items,label}:{items:readonly {path:string;label:string}[];label:string}){
  const [open,setOpen]=useState(false);
  const holder=useRef<HTMLDivElement>(null);
  const location=useLocation();
  useEffect(()=>setOpen(false),[location.pathname]);
  useEffect(()=>{
    function close(event:globalThis.MouseEvent){if(holder.current&&!holder.current.contains(event.target as Node))setOpen(false)}
    function escape(event:KeyboardEvent){if(event.key==='Escape'){setOpen(false);holder.current?.querySelector('button')?.focus()}}
    document.addEventListener('pointerdown',close);
    document.addEventListener('keydown',escape);
    return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',escape)};
  },[]);
  return <div ref={holder} className="nordlys-dropdown" data-open={open}>
    <button type="button" className="nordlys-dropdown-toggle" aria-haspopup="true" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>
      {label}<ChevronDown size={18} className="nordlys-dropdown-chevron"/>
    </button>
    <ul className="nordlys-dropdown-menu" aria-hidden={!open}>
      {items.map(item=><li key={item.path}><Link viewTransition tabIndex={open?0:-1} to={item.path}>{item.label}</Link></li>)}
    </ul>
  </div>;
}
export function NordlysNavigation(){
  const loc=useLocation(),lang=getLanguage(loc.pathname),ro=lang==='ro';
  const [open,setOpen]=useState(false);
  useEffect(()=>setOpen(false),[loc.pathname]);
  const mainItems=[
    ['/blog','Blog'],['/projects',ro?'Proiecte':'Projects'],['/services',ro?'Servicii':'Services']
  ] as const;
  const moreItems=[
    ['/experience',ro?'CV / Experiență':'Resume'],['/tools',ro?'Instrumente':'Tools'],
    ['/accreditations',ro?'Certificări':'Credentials'],['/romania-cyber-monitor','Cyber Monitor'],
    ['/about',ro?'Despre':'About'],['/contact','Contact']
  ].map(([path,label])=>({path:localizedPath(path,lang),label}));
  return <header className="nordlys-navbar">
    <a href="#main" className="nordlys-skip">Skip to main content</a>
    <div className="nordlys-nav-row">
      <Link viewTransition className="nordlys-logo-link" to={localizedPath('/',lang)} aria-label={portfolio.name}>
        <img className="nordlys-logo-img" width={68} height={68}
          src="https://static.wixstatic.com/media/a4f45c_7fb5025a965f4edf813cf097cb85783e~mv2.png"
          alt="" decoding="async"/>
        <span className="nordlys-brand-visually-hidden">{portfolio.name}</span>
      </Link>
      <nav className="nordlys-navlinks" aria-label={ro?'Navigare principală':'Main navigation'}>
        {mainItems.map(([path,label])=><Link viewTransition key={path} to={localizedPath(path,lang)} aria-current={loc.pathname===localizedPath(path,lang)?'page':undefined}>{label}</Link>)}
        <NordlysDropdown items={moreItems} label={ro?'Mai mult':'More'}/>
        <Link viewTransition to={localizedPath('/search',lang)} aria-label={ro?'Căutare':'Search'}><Search size={19}/></Link>
        <NordlysModeToggle/>
      </nav>
      <div className="nordlys-mobile-controls">
        <NordlysModeToggle/>
        <Link viewTransition className="nordlys-iconlink" to={localizedPath('/search',lang)} aria-label={ro?'Căutare':'Search'}><Search size={20}/></Link>
        <button type="button" className="nordlys-icon-button" aria-label={open?'Close navigation':'Open navigation'} aria-controls="nordlys-mobile-nav" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
      </div>
    </div>
    <hr className="nordlys-separator" style={{marginTop:26}}/>
    <div id="nordlys-mobile-nav" className="nordlys-mobile-panel" data-open={open} aria-hidden={!open}>
      <div className="nordlys-mobile-panel-inner">
        <nav aria-label={ro?'Meniu mobil':'Mobile navigation'}>
          {[...mainItems.map(([path,label])=>({path:localizedPath(path,lang),label})),...moreItems].map(item=>
            <Link viewTransition tabIndex={open?0:-1} to={item.path} key={item.path} aria-current={loc.pathname===item.path?'page':undefined}>{item.label}</Link>
          )}
        </nav>
      </div>
    </div>
  </header>;
}
/** Original Nordlys scroll-top widget appears after one viewport of scrolling. */
function ScrollTopControl(){
  const {pathname}=useLocation();
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    let frame=0;
    const onScroll=()=>{
      if(frame)return;
      frame=requestAnimationFrame(()=>{frame=0;setVisible(window.scrollY>document.documentElement.clientHeight)});
    };
    onScroll();
    window.addEventListener('scroll',onScroll,{passive:true});
    return()=>{window.removeEventListener('scroll',onScroll);if(frame)cancelAnimationFrame(frame)};
  },[pathname]);
  return <button className="nordlys-scroll-top" type="button" aria-label="Scroll to top" data-visible={visible} onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}><ArrowUp size={30}/></button>;
}
export function NordlysFrame(){
  const {pathname}=useLocation();
  const isHome=pathname==='/'||pathname==='/ro'||pathname==='/ro/';
  return <div className="nordlys-root"><NordlysSeo/><div className="nordlys-container">
    {isHome?<Outlet/>:<div className="nordlys-main"><NordlysNavigation/><main id="main" className="nordlys-main-body"><Outlet/></main><NordlysBottom/><ScrollTopControl/></div>}
  </div></div>;
}
export function NordlysPageHeading({eyebrow,title,intro}:{eyebrow?:string;title:string;intro?:string}){
  return <div className="nordlys-section">{eyebrow&&<p className="nordlys-kicker">{eyebrow}</p>}<h1 className="nordlys-page-title">{title}</h1>{intro&&<p className="nordlys-page-lead">{intro}</p>}</div>;
}
