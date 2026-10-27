/**
 * Real media previously uploaded into this site's Wix Media Manager.
 * Photographs are illustrative stock images; the ZebraByte frame is a real
 * capture of the business website. None is presented as a client security finding.
 */
type ServiceMedia={
  url:string;
  alt:{en:string;ro:string};
  caption:{en:string;ro:string};
  kind:'illustrative'|'public-site';
};
const wixImage=(id:string)=>'https://static.wixstatic.com/media/'+id;
const media:Record<string,ServiceMedia>={
  'cloudflare-managed':{
    url:wixImage('a4f45c_e621dd399f7144c4830ab5095e624406~mv2.jpg'),
    alt:{en:'Photograph of real network server racks',ro:'Fotografie reală a infrastructurii de servere'},
    caption:{en:'Illustrative infrastructure photograph · Unsplash',ro:'Fotografie ilustrativă de infrastructură · Unsplash'},
    kind:'illustrative'
  },
  'security-assessment':{
    url:wixImage('a4f45c_fb25f917c6a54110916e913e1c8a9627~mv2.jpg'),
    alt:{en:'Real photograph of a laptop workstation',ro:'Fotografie reală a unui spațiu de lucru cu laptop'},
    caption:{en:'Illustrative working environment · Unsplash',ro:'Spațiu de lucru ilustrativ · Unsplash'},
    kind:'illustrative'
  },
  'website-hardening':{
    url:wixImage('a4f45c_26ee653dff9b40d6a8443e34ff197f72~mv2.png'),
    alt:{en:'Screenshot of the live ZebraByte cybersecurity website',ro:'Captură a site-ului public ZebraByte'},
    caption:{en:'Real ZebraByte website, not a customer security assessment',ro:'Site-ul real ZebraByte, nu rezultatul unui audit al unui client'},
    kind:'public-site'
  },
  'vulnerability-review':{
    url:wixImage('a4f45c_bf6e407fc6a3429ea6ab2a9c29fa3f7e~mv2.jpg'),
    alt:{en:'Real data centre infrastructure photograph',ro:'Fotografie reală cu infrastructură de centru de date'},
    caption:{en:'Illustrative infrastructure photograph · Unsplash',ro:'Fotografie ilustrativă de infrastructură · Unsplash'},
    kind:'illustrative'
  },
  'incident-triage':{
    url:wixImage('a4f45c_9601be1262184e8c8d47b54d4bdd66f5~mv2.jpg'),
    alt:{en:'Photograph of a real IT workstation',ro:'Fotografie reală a unui post de lucru IT'},
    caption:{en:'Illustrative technical workspace · Unsplash',ro:'Spațiu tehnic de lucru ilustrativ · Unsplash'},
    kind:'illustrative'
  }
};
export const getServiceMedia=(slug:string):ServiceMedia|undefined=>media[slug];
