import {useState,type CSSProperties} from 'react';
import {useLocation} from 'react-router-dom';
import {Activity,Cloud,Code2,Container,FileCode2,KeyRound,Laptop,Network,Radar,Shield,Terminal,Workflow, type LucideIcon} from 'lucide-react';
import {getLanguage} from '@/lib/portfolio';
import {NordlysPageHeading} from '@/components/nordlys/NordlysFrame';

/**
 * Nordlys Tools-page behavior: icon-led tool groups; active icon expands one
 * details panel with grid-template-rows/opacity 300ms. Selecting any other
 * tool closes the previous selection (from original tools.astro).
 */
type Tool={name:string;description:string;icon:LucideIcon;color:string};
type Group={en:string;ro:string;icon:LucideIcon;items:Tool[]};
const groups:Group[]=[
  {en:'Security assessment',ro:'Evaluare de securitate',icon:Shield,items:[
    {name:'Nmap',description:'Network enumeration and service discovery in authorised labs.',icon:Radar,color:'#52acdb'},
    {name:'Wireshark',description:'Protocol and network packet analysis.',icon:Activity,color:'#51a2d8'},
    {name:'Burp Suite',description:'Web security testing workflows and HTTP traffic analysis.',icon:Shield,color:'#e69a46'}
  ]},
  {en:'Operating systems',ro:'Sisteme de operare',icon:Laptop,items:[
    {name:'Linux',description:'System administration, shell tooling and security analysis.',icon:Terminal,color:'#d0b156'},
    {name:'Kali Linux',description:'Hands-on cyber security labs and assessment methodology.',icon:KeyRound,color:'#78b3d9'},
    {name:'Windows',description:'System configuration, support and endpoint security.',icon:Laptop,color:'#69a6ee'}
  ]},
  {en:'Infrastructure & cloud',ro:'Infrastructură și cloud',icon:Network,items:[
    {name:'Cloudflare',description:'DNS, TLS, web protections and defensive edge configuration.',icon:Cloud,color:'#f2ab52'},
    {name:'Docker',description:'Containerised experiments and repeatable deployments.',icon:Container,color:'#389bd8'},
    {name:'PKI / ACME',description:'Certificate automation, issuance and renewal workflows.',icon:Workflow,color:'#8db9a1'}
  ]},
  {en:'Development',ro:'Dezvoltare',icon:Code2,items:[
    {name:'Python',description:'Automation and technical experiments.',icon:Code2,color:'#dfc05c'},
    {name:'TypeScript',description:'Typed application and API development.',icon:FileCode2,color:'#5a9aea'},
    {name:'Bash',description:'Command-line workflows and scripting.',icon:Terminal,color:'#76b88b'}
  ]}
];
export default function ToolsPage(){
  const ro=getLanguage(useLocation().pathname)==='ro';
  const [active,setActive]=useState<string|null>(null);
  return <>
    <NordlysPageHeading eyebrow={ro?'Instrumente și studiu':'Tools & technologies'} title={ro?'Instrumente':'Tools'}
      intro={ro?'Instrumente întâlnite în proiectele și laboratoarele mele. Apasă pe un instrument pentru detalii.':'A practical selection of tools used in projects and security labs. Choose an icon to see more.'}/>
    <div className="nordlys-tool-groups">{groups.map(group=>{
      const selected=group.items.find(item=>group.en+':'+item.name===active);
      const GroupIcon=group.icon;
      const SelectedIcon=selected?.icon;
      return <section className="nordlys-tool-group" key={group.en}>
        <h2 className="nordlys-tool-group-title"><GroupIcon size={22} aria-hidden="true"/>{ro?group.ro:group.en}</h2>
        <hr className="nordlys-separator"/>
        <div className="nordlys-tool-choices">
          {group.items.map(tool=>{
            const ToolIcon=tool.icon;
            const selectedTool=active===group.en+':'+tool.name;
            return <button type="button" key={tool.name} className="nordlys-tool-choice"
              data-active={selectedTool} style={{'--tool-highlight':tool.color} as CSSProperties}
              aria-expanded={selectedTool} aria-label={(ro?'Detalii ':'Show details for ')+tool.name}
              onClick={()=>setActive(current=>current===group.en+':'+tool.name?null:group.en+':'+tool.name)}>
              <ToolIcon size={45} strokeWidth={1.5} aria-hidden="true"/>
              <span>{tool.name}</span>
            </button>;
          })}
        </div>
        <div className="nordlys-tool-details" data-open={!!selected} aria-hidden={!selected}>
          <div className="nordlys-tool-details-inner">
            <div className="nordlys-tool-selected" style={{'--tool-highlight':selected?.color||'#ffffff'} as CSSProperties}>
              {selected&&<>{SelectedIcon&&<SelectedIcon size={50} strokeWidth={1.4} aria-hidden="true"/>}<div>
                <h3>{selected.name}</h3><p>{selected.description}</p>
              </div></>}
            </div>
          </div>
        </div>
      </section>;
    })}</div>
  </>;
}
