import {useEffect,useRef,useState} from 'react';
import {ChevronDown,Maximize2,X} from 'lucide-react';

export type ArticleHeading = {id:string;label:string;level:number};

/** Port of Nordlys ToC.astro: expandable outline, scroll anchoring and current section highlighting. */
export function NordlysTableOfContents({headings}:{headings:ArticleHeading[]}){
  const [open,setOpen]=useState(false);
  const [active,setActive]=useState<string|null>(null);
  useEffect(()=>{
    if(!headings.length)return;
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if(visible[0])setActive(visible[0].target.id);
    },{rootMargin:'-15% 0px -63% 0px',threshold:[0,0.33,0.66,1]});
    headings.forEach(h=>{const el=document.getElementById(h.id);if(el)observer.observe(el)});
    return()=>observer.disconnect();
  },[headings]);
  if(headings.length===0)return null;
  return <aside className="nordlys-article-toc" aria-label="Table of contents">
    <button className="nordlys-toc-toggle" type="button" aria-expanded={open} aria-controls="nordlys-toc-links" onClick={()=>setOpen(v=>!v)}>
      Table of Contents <ChevronDown size={17} aria-hidden="true" className="nordlys-toc-chevron"/>
    </button>
    <div className="nordlys-toc-collapse" data-open={open} id="nordlys-toc-links">
      <div className="nordlys-toc-collapse-inner">
        <nav aria-label="Article sections" className="nordlys-toc-list">
          {headings.map(h=><a href={'#'+h.id} key={h.id}
             data-active={h.id===active} style={{paddingLeft:(h.level-2)*13}}
             tabIndex={open?0:-1} onClick={()=>setOpen(false)}>{h.label}</a>)}
        </nav>
      </div>
    </div>
  </aside>;
}

/** Keyboard-accessible photo zoom comparable to the native Nordlys gallery UX.
 * Does not pull extra third-party scripts into Wix Vibe.
 */
export function NordlysImage({src,alt}:{src:string;alt:string}){
  const [open,setOpen]=useState(false);
  const closer=useRef<HTMLButtonElement|null>(null);
  useEffect(()=>{
    if(!open)return;
    const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};
    document.addEventListener('keydown',onKey);
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    closer.current?.focus();
    return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=oldOverflow};
  },[open]);
  return <figure className="nordlys-inline-figure">
    <button type="button" className="nordlys-image-open" aria-label={'Enlarge image'+(alt?': '+alt:'')} onClick={()=>setOpen(true)}>
      <img src={src} alt={alt} loading="lazy"/>
      <Maximize2 className="nordlys-image-zoom-icon" aria-hidden="true" size={21}/>
    </button>
    {alt&&<figcaption>{alt}</figcaption>}
    {open&&<div className="nordlys-image-overlay" role="presentation" onPointerDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}>
      <div role="dialog" aria-modal="true" aria-label={alt||'Enlarged image'} className="nordlys-image-dialog">
        <button className="nordlys-image-close" ref={closer} type="button" aria-label="Close image viewer" onClick={()=>setOpen(false)}><X size={28}/></button>
        <img src={src} alt={alt}/>
      </div>
    </div>}
  </figure>;
}
