/**
 * Authored portfolio case studies grounded in public source repos/portfolio.
 * No invented achievements, traffic metrics or unverified production claims.
 * Screenshots are REAL browser captures of the linked public website/repository.
 */
export const projectStories:Record<string,{
  en:{problem:string;approach:string;outcomes:string[];security:string[]};
  ro:{problem:string;approach:string;outcomes:string[];security:string[]};
  screenshot:string;imageCaption:{en:string;ro:string};repository?:string;demo?:string
}>={
'zebrabyte-dark-web-intelligence':{
  en:{
    problem:'An exposure-monitoring platform needs more than a search box: investigation state, isolated evidence, tenant access controls and defensible monitoring workflows.',
    approach:'The public implementation uses Cloudflare Workers for the application/API; Workflows and Queues for orchestrated investigations; D1 for structured state; R2 for retained evidence; and Workers AI for constrained defensive analysis. A short-lived Tor collector is isolated in a Cloudflare Container.',
    outcomes:['Tenant-scoped investigations, monitoring jobs, quotas and audit metadata','Cloudflare-native evidence retention and asynchronous processing','Separate clear-web enrichment, private collection and AI-assisted analysis'],
    security:['Tor retrieval is constrained to validated .onion addresses; no generic proxy or internal-network scanner.','Evidence is treated as untrusted input; service credentials do not belong in the collector.','Optional features require provisioning; the public README explicitly distinguishes them from configured functionality.']
  },ro:{
    problem:'Monitorizarea expunerilor necesită controlul accesului, izolare pe clienți, păstrarea probelor și fluxuri de analiză verificabile, nu doar un motor de căutare.',
    approach:'Aplicația publică folosește Cloudflare Workers pentru API, Workflows și Queues pentru investigații, D1 pentru starea structurată, R2 pentru dovezi și Workers AI pentru analiză defensivă. Un colector Tor temporar este izolat într-un Cloudflare Container.',
    outcomes:['Investigații izolate pe clienți, monitorizare, cote și audit','Retenția dovezilor și procesare asincronă în Cloudflare','Separarea colectării, analizei AI și interfeței publice'],
    security:['Colecția Tor acceptă numai adrese .onion validate, fără proxy generic ori scaner de rețele interne.','Datele colectate sunt tratate ca neîncredere, separat de acreditări.','Modulele opționale necesită configurare; nu sunt prezentate ca active implicit.']
  },
  screenshot:'/project-shots/zebrabyte-dark-web-intelligence.png',
  imageCaption:{en:'Real screenshot of the public GitHub source repository',ro:'Captură reală din repository-ul public GitHub'},
  repository:'https://github.com/liviubucel/darkweb-scan'
},
'zebrabyte':{
  en:{
    problem:'Websites and online services need reliable infrastructure alongside risk-focused security configuration.',
    approach:'ZebraByte is the technical business through which I work on secure web infrastructure, hosting and practical cybersecurity services. The public site is the best place to review current offerings.',
    outcomes:['Technical support for website infrastructure and secure deployment','DNS, SSL/TLS, Cloudflare and web-protection configuration','A professional environment in which to connect practical engineering with client needs'],
    security:['Any security testing requires an agreed scope and written system-owner authorisation.','Client systems, outcomes and private configuration data are not disclosed on this personal portfolio.']
  },ro:{
    problem:'Site-urile și serviciile online au nevoie de infrastructură fiabilă, împreună cu configurări de securitate adaptate riscurilor.',
    approach:'ZebraByte este activitatea tehnică prin care lucrez cu infrastructuri web securizate, hosting și servicii de cybersecurity. Oferta actuală poate fi consultată pe site-ul public.',
    outcomes:['Suport pentru infrastructură și implementări web','Configurări DNS, SSL/TLS, Cloudflare și protecție web','Legătura dintre dezvoltarea tehnică și problemele concrete ale clienților'],
    security:['Testarea de securitate se efectuează numai cu acord scris și scop stabilit.','Nu public date, configurații private sau rezultate sensibile ale clienților.']
  },
  screenshot:'/project-shots/zebrabyte.png',imageCaption:{en:'Real screenshot of the ZebraByte public website',ro:'Captură reală a site-ului public ZebraByte'},
  demo:'https://zebrabyte.ro/'
},
'ssl-certificate-generator-acme-automation-tool':{
  en:{
    problem:'Manually issuing and renewing TLS certificates can introduce operational mistakes and expired certificates.',
    approach:'The open-source generator implements ACME workflows in a Cloudflare Worker. ZeroSSL is accessed directly; Let’s Encrypt requests can pass through a restricted Railway ACME proxy. The project documents HTTP-01/DNS-01 validation, wildcard certificates and renewal scheduling.',
    outcomes:['Certificate-issuance UI in English and Romanian','Support for Let’s Encrypt and ZeroSSL, DNS-01 wildcard validation and downloadable certificate bundles','Cloudflare KV for certificate state and renewal schedules; optional email notifications'],
    security:['CA credentials and renewal tokens are configured as secrets, never bundled in a public front-end.','The proxy restricts CA destinations and uses a shared authentication token.','The live demo can block automated access; the screenshot here is from the actual open-source repository, not a simulated certificate.']
  },ro:{
    problem:'Emiterea și reînnoirea manuală a certificatelor TLS poate produce erori și perioade în care certificatele expiră.',
    approach:'Generatorul open-source implementează fluxuri ACME într-un Cloudflare Worker. ZeroSSL poate fi apelat direct, iar cererile Let’s Encrypt trec printr-un proxy ACME restricționat pe Railway. Sunt documentate verificările HTTP-01/DNS-01 și reînnoirea.',
    outcomes:['Interfață de emitere certificate în română și engleză','Let’s Encrypt și ZeroSSL, wildcard prin DNS-01 și descărcarea pachetelor','Cloudflare KV pentru stare și programări; notificări email opționale'],
    security:['Tokenurile și acreditările se gestionează ca secrete, nu în interfața publică.','Proxy-ul acceptă doar destinații CA permise și folosește autentificare.','Demo-ul blochează uneori accesul automat; captura este din repository-ul real, nu o simulare.']
  },
  screenshot:'/project-shots/ssl-certificate-generator-acme-automation-tool.png',imageCaption:{en:'Real screenshot of the open-source SSL Generator repository',ro:'Captură reală din repository-ul open-source SSL Generator'},
  repository:'https://github.com/liviubucel/ssl-generator',demo:'https://ssl-gratis.zebrabyte.ro/'
},
'acme-ssl-engine':{
  en:{
    problem:'ACME issuance and renewal need a repeatable, deployable environment rather than manual certificate commands.',
    approach:'An educational automation project built around ACME.sh, OpenSSL and shell scripts, packaged with Docker and a Railway configuration. The repository documents installation, domain validation and renewal routines.',
    outcomes:['Portable ACME.sh runtime and shell scripts','Repeatable Docker/Railway packaging for controlled experiments','Documentation of DNS validation, renewal and certificate lifecycle concepts'],
    security:['Private keys must stay outside version control with restrictive file permissions.','DNS provider tokens must use minimal access and safe secret storage.','This repository is described as an educational DevOps/security project, not an audited commercial certificate service.']
  },ro:{
    problem:'Emiterea și reînnoirea ACME au nevoie de un mediu repetabil, nu de comenzi manuale executate ocazional.',
    approach:'Proiect educațional construit cu ACME.sh, OpenSSL și scripturi shell, împachetat în Docker cu configurare Railway. Repository-ul documentează instalarea, validarea domeniului și reînnoirea.',
    outcomes:['Runtime ACME.sh portabil și scripturi shell','Împachetare Docker/Railway pentru experimente repetabile','Documentarea validării DNS și a ciclului de viață TLS'],
    security:['Cheile private nu se salvează în Git și necesită permisiuni restrictive.','Tokenurile DNS trebuie păstrate în secret și limitate la permisiunile necesare.','Este prezentat ca proiect educațional, nu ca serviciu comercial auditat.']
  },
  screenshot:'/project-shots/acme-ssl-engine.png',imageCaption:{en:'Real screenshot of the public ACME Engine GitHub repository',ro:'Captură reală a repository-ului public ACME Engine'},
  repository:'https://github.com/liviubucel/ssl-acme-engine'
}
};
