import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {getLanguage} from '@/lib/portfolio';
/**
 * The Astro SPA shell persists across client navigation; Wix's SEO.Tags
 * is SSR-only. Refresh the head for every React Router navigation, so the
 * native Wix-rendered title does not stay "Home" on every inner page.
 * Actual blog post titles are set by BlogDetailPage once the Wix Blog
 * SDK resolves the post.
 */
const routeSEO:Record<string,{en:string;ro:string;enDesc:string;roDesc:string}>={
 '/':{en:'Home',ro:'Acasă',enDesc:'Liviu Bucel — cybersecurity portfolio, projects, research, CV and professional services.',roDesc:'Liviu Bucel — portofoliu de cybersecurity, proiecte, cercetare, CV și servicii profesionale.'},
 '/blog':{en:'Blog',ro:'Blog',enDesc:'Cybersecurity research, technical articles and security analysis by Liviu Bucel.',roDesc:'Articole tehnice, cercetare și analize de cybersecurity de Liviu Bucel.'},
 '/tags':{en:'Tags',ro:'Etichete',enDesc:'Browse tags assigned to published cybersecurity articles in Wix Blog.',roDesc:'Explorează etichetele articolelor publicate în Wix Blog.'},
 '/projects':{en:'Projects',ro:'Proiecte',enDesc:'Selected cybersecurity and infrastructure projects by Liviu Bucel.',roDesc:'Proiecte de cybersecurity și infrastructură dezvoltate de Liviu Bucel.'},
 '/contact':{en:'Contact',ro:'Contact',enDesc:'Contact Liviu Bucel about cybersecurity work, partnerships or professional opportunities.',roDesc:'Contactează-l pe Liviu Bucel pentru colaborări și proiecte de cybersecurity.'},
 '/services':{en:'Cybersecurity Services',ro:'Servicii de cybersecurity',enDesc:'Security assessments, DNS, TLS, cloud security and responsible cybersecurity consulting.',roDesc:'Evaluări de securitate, DNS, TLS, cloud și consultanță responsabilă în cybersecurity.'},
 '/experience':{en:'Resume & Experience',ro:'CV și experiență',enDesc:'Liviu Bucel: professional experience, technical support, infrastructure and security practice.',roDesc:'Experiența profesională și practica de securitate a lui Liviu Bucel.'},
 '/about':{en:'About',ro:'Despre mine',enDesc:'About Liviu Bucel and his cybersecurity engineering, research and digital investigation interests.',roDesc:'Despre Liviu Bucel: cybersecurity, inginerie de securitate și investigații digitale.'},
 '/tools':{en:'Tools & Skills',ro:'Instrumente și competențe',enDesc:'Technical tools and security technologies used in practical labs and projects.',roDesc:'Instrumente și tehnologii utilizate în laboratoare și proiecte practice.'},
 '/accreditations':{en:'Credentials & Learning',ro:'Certificări și învățare',enDesc:'Professional development, qualifications and cybersecurity credentials.',roDesc:'Certificări, calificări și dezvoltare profesională în cybersecurity.'},
 '/search':{en:'Search',ro:'Căutare',enDesc:'Search cybersecurity articles and published projects.',roDesc:'Caută în articolele și proiectele publicate.'},
 '/romania-cyber-monitor':{en:'Romania Cyber Monitor',ro:'Romania Cyber Monitor',enDesc:'Public cyber threat reporting and contextual analysis for Romania.',roDesc:'Monitorizare și analize din surse publice privind amenințările cibernetice din România.'},
 '/privacy':{en:'Privacy Policy',ro:'Confidențialitate',enDesc:'Privacy information for this personal cybersecurity portfolio.',roDesc:'Informații despre confidențialitatea și protecția datelor personale.'}
};
const meta=(selector:string,attrs:Record<string,string>)=>{
  let el=document.head.querySelector<HTMLMetaElement>(selector);
  if(!el){el=document.createElement('meta');document.head.appendChild(el)}
  for(const [key,value]of Object.entries(attrs))el.setAttribute(key,value);
};
export function setNordlysDocumentSEO(title:string,description:string){
  document.title=title+' | Liviu Bucel';
  meta('meta[name="description"]',{name:'description',content:description});
  meta('meta[property="og:title"]',{'property':'og:title',content:title+' | Liviu Bucel'});
  meta('meta[property="og:description"]',{'property':'og:description',content:description});
  meta('meta[property="og:type"]',{'property':'og:type',content:'website'});
}
export default function NordlysSeo(){
  const {pathname}=useLocation();
  useEffect(()=>{
    const ro=getLanguage(pathname)==='ro';
    const path=ro?(pathname.slice(3)||'/'):pathname;
    const top='/'+path.split('/').filter(Boolean)[0];
    const entry=routeSEO[path]||routeSEO[top];
    document.documentElement.lang=ro?'ro':'en';
    if(entry)setNordlysDocumentSEO(ro?entry.ro:entry.en,ro?entry.roDesc:entry.enDesc);
    const canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if(canonical)canonical.href=window.location.origin+pathname;
  },[pathname]);
  return null;
}
