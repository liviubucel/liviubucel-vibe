/** Authored service catalog. Presentation remains the unmodified Nordlys PageLayout/ToC. */
export type Locale = 'en'|'ro';
export type ServiceDescription = {
  name:string;lead:string;introduction:string;
  deliverables:string[];process:string[];forWhom:string[];scopeNote:string;
}
export type ServiceOffering = {
  slug:string; icon:string;
  en:ServiceDescription; ro:ServiceDescription;
}
export const serviceOfferings:ServiceOffering[]=[
{
  slug:'cloudflare-managed',icon:'tabler--cloud',
  en:{
    name:'Cloudflare Managed',
    lead:'Operational Cloudflare security and performance management for websites and APIs.',
    introduction:'I help website owners review, deploy and maintain Cloudflare controls in a defined scope. The work focuses on practical security and measured changes, from DNS and certificates through WAF and edge caching. This is an independent service, not an official Cloudflare Professional Services engagement.',
    deliverables:['Cloudflare zone, DNS/DNSSEC, SSL/TLS and security header configuration review','WAF managed/custom rules, sensible rate limiting and bot-risk controls','CDN caching and origin protection review, including rules for authenticated/private pages','Configuration change log, findings and follow-up recommendations','Optional ongoing monitoring and periodic hardening reviews under an agreed service scope'],
    process:['Review current setup, plan, traffic profile and administrative access','Identify security gaps and likely side effects before editing production rules','Apply only authorised changes, preferably in tested, reversible stages','Validate legitimate traffic, logs, errors and performance after rollout'],
    forWhom:['Business and personal websites','WordPress and other hosted applications','Public API and web application operators'],
    scopeNote:'Features depend on the customer’s Cloudflare plan. DNS ownership and customer consent are required before configuration changes; no guaranteed attack prevention or performance uplift is implied.'
  },
  ro:{
    name:'Cloudflare Managed',
    lead:'Administrare practică a securității și performanței Cloudflare pentru site-uri și API-uri.',
    introduction:'Ajut proprietarii de site-uri să analizeze, să configureze și să mențină protecțiile Cloudflare într-un scop contractual definit. Accentul este pe securitate, schimbări controlate și verificări tehnice, de la DNS și certificate până la WAF și cache. Este un serviciu independent, nu Cloudflare Professional Services oficial.',
    deliverables:['Verificarea zonei Cloudflare, DNS/DNSSEC, SSL/TLS și antetelor de securitate','Reguli WAF gestionate/personalizate, rate limiting și protecții anti-bot adecvate','Analiza cache CDN și a protecției originului, inclusiv excluderea zonelor autentificate','Jurnal al modificărilor, probleme identificate și recomandări','Monitorizare și revizuiri periodice opționale, conform serviciului contractat'],
    process:['Analizăm configurația actuală, planul Cloudflare și caracteristicile traficului','Evaluăm riscurile și posibilele efecte secundare înainte de schimbările în producție','Aplicăm doar modificări autorizate, controlate și reversibile','Verificăm traficul legitim, logurile, erorile și performanța după implementare'],
    forWhom:['Site-uri personale și de afaceri','Aplicații WordPress și alte platforme găzduite','Operatori de API-uri și aplicații web'],
    scopeNote:'Funcționalitățile depind de planul Cloudflare al clientului. Modificările necesită acord și acces autorizat; nu sunt promise eliminarea totală a atacurilor sau câștiguri garantate de performanță.'
  }
},
{
  slug:'security-assessment',icon:'tabler--shield-check',
  en:{
    name:'Security assessment',
    lead:'Scope-led security configuration reviews and authorised web application assessment.',
    introduction:'I review exposed services and security controls against a written list of systems and allowed testing methods. The goal is to give owners an understandable, actionable picture of risk, not a generic scanner score.',
    deliverables:['Scoped surface and configuration review','Authentication, TLS and HTTP response security observations','Prioritised technical findings with evidence and recommended fixes','Clear separation between confirmed findings, possibilities and out-of-scope systems'],
    process:['Agree assets, owners, written permission and boundaries','Review authorised configuration and non-destructive evidence','Explain severity and practical remediation options','Summarise findings and plan revalidation'],
    forWhom:['Website and small-business owners','Teams preparing for security improvements','Operators with an existing web service'],
    scopeNote:'Any active testing requires written authorisation, defined targets, and explicit rules of engagement. This is not a certification or guarantee of compliance.'
  },
  ro:{
    name:'Evaluare de securitate',
    lead:'Analiza configurărilor de securitate și a aplicațiilor web într-un scop autorizat.',
    introduction:'Verific serviciile expuse și mecanismele de protecție în baza unei liste scrise de sisteme și a metodelor de testare permise. Obiectivul este un diagnostic util și recomandări clare, nu doar un scor generic generat de un scaner.',
    deliverables:['Revizuirea suprafeței expuse și a configurării în scopul aprobat','Observații privind autentificarea, TLS și securitatea răspunsurilor HTTP','Constatări tehnice prioritizate, dovezi și recomandări concrete','Delimitarea problemelor confirmate de ipoteze și componente în afara scopului'],
    process:['Stabilim sistemele, proprietarul, acordul scris și limitele testării','Evaluăm configurațiile autorizate și dovezile fără afectare intenționată','Explicăm severitatea și variantele de remediere','Documentăm concluziile și verificarea ulterioară'],
    forWhom:['Proprietari de site-uri și afaceri mici','Echipe care pregătesc îmbunătățiri de securitate','Operatori de aplicații web existente'],
    scopeNote:'Testarea activă necesită autorizare scrisă, ținte și reguli clare. Serviciul nu reprezintă o certificare sau o garanție de conformitate.'
  }
},
{
  slug:'website-hardening',icon:'tabler--server-bolt',
  en:{
    name:'Website & hosting hardening',
    lead:'Reduce common configuration weaknesses in hosting, DNS and application infrastructure.',
    introduction:'Security depends as much on operational maintenance and platform configuration as on code. I review the practical foundations used by public websites and hosting environments.',
    deliverables:['DNS, certificate and HTTPS configuration observations','HTTP response headers, access and origin-restriction review','Patch/backup visibility and hosting operations checklist','Implementation guidance and handover notes'],
    process:['Identify the hosting platform and critical services','Review change windows, backups and current protective controls','Apply agreed, reversible configuration changes','Test normal browsing, forms and administration after the update'],
    forWhom:['WordPress site owners','Hosted business applications','Small operations with limited in-house infrastructure support'],
    scopeNote:'Platform access and responsibilities remain under the customer’s control. Third-party product licences or hosting fees are outside the assessment unless specified.'
  },
  ro:{
    name:'Securizarea site-urilor și hostingului',
    lead:'Reducerea problemelor de configurare din hosting, DNS și infrastructura aplicațiilor.',
    introduction:'Securitatea depinde și de întreținere, actualizări și configurarea platformei, nu numai de cod. Analizez elementele de bază care protejează site-urile publice și serviciile găzduite.',
    deliverables:['Verificări DNS, certificate și configurări HTTPS','Analiza antetelor HTTP, accesului și protecției originului','Listă de verificare privind actualizările, backupurile și operarea hostingului','Recomandări de implementare și documentație de predare'],
    process:['Identificăm platforma și serviciile critice','Verificăm backupuri, ferestre de schimbare și controale actuale','Aplicăm schimbări autorizate și reversibile','Testăm navigarea, formularele și administrarea după modificări'],
    forWhom:['Proprietari de site-uri WordPress','Aplicații web de afaceri','Echipe fără suport intern extins pentru infrastructură'],
    scopeNote:'Accesul și responsabilitatea platformei rămân la client. Costurile platformelor externe și licențele nu sunt incluse decât dacă sunt menționate expres.'
  }
},
{
  slug:'vulnerability-review',icon:'tabler--scan',
  en:{
    name:'Vulnerability review',
    lead:'Understand whether a reported CVE or exposure actually affects your systems.',
    introduction:'Public vulnerability alerts can be noisy. I help translate advisory information into a scoped technical review and a ranked remediation plan.',
    deliverables:['Identify affected technologies and version or configuration dependencies','Assess public exploitability context without unsafe testing','Prioritised patch and mitigation guidance','Documented results and follow-up verification steps'],
    process:['Collect relevant product and environment information','Compare the exposure to vendor guidance and system configuration','Agree the safest remediation approach','Review patch/application status and document remaining risk'],
    forWhom:['Website owners receiving urgent CVE alerts','Small IT teams maintaining web applications','Platform administrators evaluating security advisories'],
    scopeNote:'A public advisory alone does not prove compromise. Exploit attempts are not performed without explicit written authorisation.'
  },
  ro:{
    name:'Analiza vulnerabilităților',
    lead:'Stabilim dacă un CVE sau o vulnerabilitate raportată afectează efectiv sistemul tău.',
    introduction:'Alertele de securitate pot produce mult zgomot. Transform informațiile publice despre vulnerabilități într-o analiză contextuală și într-un plan de remediere.',
    deliverables:['Identificarea tehnologiilor, versiunilor și configurărilor afectate','Evaluarea contextului tehnic fără testare intruzivă neautorizată','Prioritizarea actualizărilor și a măsurilor de reducere a riscului','Documentarea concluziilor și a etapelor de verificare'],
    process:['Colectăm date relevante despre produs și infrastructură','Comparăm expunerea cu recomandările furnizorului și configurarea reală','Stabilim remedierea cu risc operațional minim','Verificăm modificările și documentăm riscul rămas'],
    forWhom:['Proprietari de site-uri care primesc alerte CVE','Echipe IT mici care administrează aplicații web','Administratori care evaluează buletine de securitate'],
    scopeNote:'O alertă publică nu dovedește compromiterea. Nu efectuez exploatări fără autorizare explicită.'
  }
},
{
  slug:'incident-triage',icon:'tabler--activity-heartbeat',
  en:{
    name:'Incident triage & defensive guidance',
    lead:'Structured first steps when a website or online service may be compromised.',
    introduction:'The initial response matters. I can help collect context, preserve technical evidence and identify appropriate containment and recovery actions within the agreed scope.',
    deliverables:['Initial symptom and timeline review','Evidence preservation and log collection checklist','Containment options and incident escalation advice','Recommendations for recovery, monitoring and follow-up investigation'],
    process:['Record what happened and determine access/authority','Identify time-sensitive evidence and business impact','Plan containment with the system owner','Document next steps and specialist escalation where necessary'],
    forWhom:['Small organisations responding to a website incident','Hosting and website administrators','Owners needing an initial technical assessment'],
    scopeNote:'Not a 24/7 emergency response retainer. Complex forensics, regulated disclosures and legal matters may require qualified external specialists.'
  },
  ro:{
    name:'Evaluare inițială a incidentelor',
    lead:'Primii pași organizați când un site sau serviciu online ar putea fi compromis.',
    introduction:'Primele acțiuni contează. Pot ajuta la colectarea contextului, păstrarea dovezilor tehnice și identificarea măsurilor potrivite de izolare și recuperare, în scopul stabilit.',
    deliverables:['Analiza simptomelor și a cronologiei inițiale','Listă de colectare a logurilor și păstrare a probelor','Opțiuni de izolare și recomandări de escaladare','Pași de recuperare, monitorizare și investigație ulterioară'],
    process:['Documentăm evenimentul și confirmăm autoritatea de intervenție','Identificăm dovezile sensibile la timp și impactul operațional','Stabilim măsurile de izolare cu proprietarul sistemului','Documentăm următorii pași și necesitatea specialiștilor suplimentari'],
    forWhom:['Organizații mici în cazul unui incident web','Administratori de hosting și site-uri','Proprietari care au nevoie de o evaluare tehnică inițială'],
    scopeNote:'Nu este un serviciu de intervenție de urgență 24/7. Investigațiile complexe, obligațiile de raportare și aspectele juridice pot necesita alți specialiști.'
  }
}
];
export const lookupService=(slug:string)=>serviceOfferings.find(s=>s.slug===slug);
