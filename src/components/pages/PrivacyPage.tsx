import { useLocation } from 'react-router-dom';
import {getLanguage,portfolio} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';
const en = [
  ['Controller and scope','This independent personal website, including Romania Cyber Monitor, is operated by Liviu Bucel. It describes data processing through contact, updates and technical operations.'],
  ['Contact and form data','The native Wix Forms app processes the name, email address, subject and message you choose to send. Wix Contacts may retain contact details and a reply is sent only for the enquiry you make.'],
  ['Security updates','The Security Updates form captures email address and an explicit email-subscription choice using Wix Forms and Wix Contacts. Email campaigns are not sent until the relevant confirmation, delivery and unsubscribe systems are configured.'],
  ['Purpose and lawful bases','Contact replies are handled in response to your enquiry. Optional email marketing depends on consent. Technical logs support availability, abuse prevention and security. We do not sell personal data.'],
  ['Providers','The new site uses Wix for hosting, forms, portfolio content and native blog content. Parts of the former Cloudflare infrastructure remain active until migration and verification are completed.'],
  ['CV and retention','A professional CV is supplied only after a direct request, not by a publicly downloadable unprotected URL. Information is retained only where needed for the stated purpose and lawful operation.'],
  ['Cyber Monitor','Public threat-intelligence source reports are distinguished from independently confirmed incidents. A ransomware listing is not proof of an actual compromise. You may request correction.'],
  ['Your rights','Depending on applicable law, you may request access, correction, deletion, restriction, portability, objection or consent withdrawal. Contact us for a privacy enquiry.']
];
const ro = [
  ['Operator și domeniu','Acest website personal independent, inclusiv Romania Cyber Monitor, este administrat de Liviu Bucel. Politica descrie prelucrarea datelor prin formulare și serviciile necesare funcționării.'],
  ['Formularul de contact','Wix Forms prelucrează numele, adresa de email, subiectul și mesajul trimis. Wix Contacts poate păstra datele de contact în scopul răspunderii la solicitări.'],
  ['Actualizări de securitate','Formularul Security Updates colectează emailul și consimțământul explicit prin Wix Forms și Wix Contacts. Campaniile de email nu încep înainte de configurarea funcțiilor de confirmare, livrare și dezabonare.'],
  ['Scop și temei','Răspunsurile la solicitări sunt legate de mesajul primit. Marketingul opțional prin email necesită consimțământ. Jurnalele tehnice servesc securității și prevenirii abuzurilor. Datele nu sunt vândute.'],
  ['Furnizori','Noul website utilizează Wix pentru găzduire, formulare, portofoliu și blog nativ. Unele componente Cloudflare rămân active până la verificarea integrală a migrării.'],
  ['CV și păstrare','CV-ul este trimis la cerere directă, nu este oferit printr-un link public neprotejat. Datele sunt păstrate numai cât este justificat de scop și de legislația aplicabilă.'],
  ['Cyber Monitor','Semnalările din surse publice sunt separate de incidentele confirmate independent. Apariția într-o listă ransomware nu constituie dovada compromiterii unei organizații. Poți solicita corecturi.'],
  ['Drepturile tale','În condițiile legii aplicabile poți solicita acces, rectificare, ștergere, restricționare, portabilitate, opoziție sau retragerea consimțământului.']
];
export default function PrivacyPage(){
  const lang=getLanguage(useLocation().pathname),isRo=lang==='ro',sections=isRo?ro:en;
  return <>
    <NordlysPageHeading eyebrow={isRo?'Protecția datelor':'Data protection'} title={isRo?'Confidențialitate':'Privacy policy'} intro={isRo?'Actualizat la 22 octombrie 2026':'Updated 22 October 2026'}/>
    <article className="nordlys-article">{sections.map(([title,description],i)=><section key={title}>
      <h2>{i+1}. {title}</h2><p>{description}</p></section>)}
      <h2>{isRo?'Contact pentru confidențialitate':'Privacy contact'}</h2>
      <p><a href={'mailto:'+portfolio.email}>{portfolio.email}</a></p>
    </article>
  </>;
}
