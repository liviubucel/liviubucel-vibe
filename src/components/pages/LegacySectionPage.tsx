import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {getLanguage,localizedPath} from '@/lib/portfolio';
export default function LegacySectionPage({section}:{section:'design'|'travel'|'playground'}){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const content={
    design:{en:['Design works','Design works section coming soon.'],ro:['Lucrări de design','Secțiunea de design va fi disponibilă în curând.']},
    travel:{en:['Travel','Travel section coming soon.'],ro:['Călătorii','Secțiunea de călătorii va fi disponibilă în curând.']},
    playground:{en:['Playground','Interactive playground coming soon.'],ro:['Playground','Secțiunea interactivă va fi disponibilă în curând.']}
  }[section][lang];
  return <div className="lb-page"><Header/><main><section className="lb-section lb-section-alt"><div className="lb-container">
    <p className="lb-eyebrow">{lang==='ro'?'Explorare personală':'Personal explorations'}</p>
    <h1 className="lb-headline">{content[0]}</h1><p className="lb-summary">{content[1]}</p>
    <div className="lb-actions"><Link className="mzp-c-button" to={localizedPath('/',lang)}>{ro?'← Înapoi acasă':'← Back home'}</Link></div>
  </div></section></main><Footer/></div>;
}
