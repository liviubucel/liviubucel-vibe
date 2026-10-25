import {useState,type ReactNode} from 'react';
import {Plus} from 'lucide-react';
/** Nordlys FlipCard interaction: 500 ms opacity/visibility transition. */
export function FlipCard({title,front,back}:{title:string;front:ReactNode;back:ReactNode}){
  const [open,setOpen]=useState(false);
  return <div className="nordlys-flipcard" data-flipped={open} aria-label={title}>
    <div className="nordlys-flip-front">{front}</div>
    <div className="nordlys-flip-back">{back}</div>
    <button type="button" className="nordlys-flip-button" onClick={()=>setOpen(v=>!v)} aria-label={open?'Show front of '+title:'Show details of '+title} aria-expanded={open}><Plus size={22}/></button>
  </div>;
}
