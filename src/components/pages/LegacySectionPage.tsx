import {Link,useLocation} from 'react-router-dom';
import {getLanguage,localizedPath} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';
export default function LegacySectionPage({section}:{section:'design'|'travel'|'playground'}){
  const lang=getLanguage(useLocation().pathname),ro=lang==='ro';
  const titles={design:ro?'Design și experimente':'Design & experiments',travel:ro?'Călătorii':'Travel',playground:'Playground'};
  return <>
    <NordlysPageHeading eyebrow={ro?'Arhivă personală':'Personal archive'} title={titles[section]} intro={ro?'Această secțiune din portofoliul anterior este în curs de migrare. Nu afișăm conținut demonstrativ.':'This section of the previous portfolio is being migrated. No demo content is presented as real work.'}/>
    <div className="nordlys-actions"><Link viewTransition className="nordlys-btn nordlys-btn-outline" to={localizedPath('/projects',lang)}>{ro?'Proiecte':'Projects'}</Link><Link viewTransition className="nordlys-btn" to={localizedPath('/',lang)}>{ro?'Acasă':'Home'}</Link></div>
  </>;
}
