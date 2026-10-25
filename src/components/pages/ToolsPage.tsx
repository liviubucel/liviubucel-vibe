import {useLocation} from 'react-router-dom';
import {getLanguage} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';
import {FlipCard} from '@/components/nordlys/FlipCard';
const groups=[
 {en:'Network & assessment',ro:'Rețele și evaluare',items:['Wireshark','Nmap','Burp Suite']},
 {en:'Operating systems & investigations',ro:'Sisteme și investigații',items:['Linux','Kali Linux','Windows','PowerShell']},
 {en:'Infrastructure',ro:'Infrastructură',items:['Cloudflare','DNS','PKI / ACME','Docker']},
 {en:'Scripting',ro:'Scripting',items:['Python','TypeScript','Bash']}
];
export default function ToolsPage(){
 const ro=getLanguage(useLocation().pathname)==='ro';
 return <><NordlysPageHeading eyebrow={ro?'Instrumente și studiu':'Technical toolkit'} title={ro?'Tehnologii și instrumente':'Tools & skills'} intro={ro?'Tehnologii folosite în proiecte și exerciții practice; nu reprezintă certificări.':'Tools and technologies explored in projects and labs. This list is not a certification claim.'}/>
  <div className="nordlys-photo-grid">{groups.map(group=><FlipCard key={group.en} title={group.en}
   front={<div style={{padding:'28px 16px',border:'1px solid var(--n-border)',minHeight:210}}><h2 className="nordlys-item-title">{ro?group.ro:group.en}</h2><p className="nordlys-item-description">{group.items.slice(0,3).join(' · ')}</p></div>}
   back={<div style={{padding:'28px 16px',border:'1px solid var(--n-border)',minHeight:210}}><h2 className="nordlys-item-title">{ro?group.ro:group.en}</h2><div className="nordlys-taglist">{group.items.map(item=><span className="nordlys-tag" key={item}>{item}</span>)}</div></div>}/>)}</div>
 </>;
}
