/** Public identity and contact data migrated from the original liviubucel.com source. */
export const portfolio = {
  name: 'Liviu Bucel',
  title: 'Cyber Security Specialist',
  website: 'https://www.liviubucel.com',
  email: 'contact@liviubucel.com',
  timeZone: 'Europe/London',
  links: {
    github: 'https://github.com/liviubucel/liviubucel-vibe',
    linkedin: 'https://www.linkedin.com/in/liviubucel/',
    twitter: 'https://x.com/liviubucel',
    youtube: 'https://www.youtube.com/@liviubucel',
    tryhackme: 'https://tryhackme.com/p/liviubucel',
    zebrabyte: 'https://zebrabyte.ro/',
  },
  media: {
    portrait: 'https://static.wixstatic.com/media/a4f45c_5de34da2a5014ab29d11bfa15ddc3f8e~mv2.webp',
    logoLight: 'https://static.wixstatic.com/media/a4f45c_cd61d51acdad492781f7abb9520104ce~mv2.png',
    logoDark: 'https://static.wixstatic.com/media/a4f45c_87d2b745a78244df8ffb70054744dca4~mv2.png',
    og: 'https://static.wixstatic.com/media/a4f45c_ce0f05a105b746aca62517c09dbae0e7~mv2.png',
  },
} as const;

export type Language = 'en' | 'ro';

export function getLanguage(pathname: string): Language {
  return pathname === '/ro' || pathname.startsWith('/ro/') ? 'ro' : 'en';
}

export function localizedPath(pathname: string, lang: Language): string {
  const clean = pathname === '/' ? '' : pathname.startsWith('/') ? pathname : '/' + pathname;
  return lang === 'ro' ? '/ro' + (clean || '') : clean || '/';
}

export const labels = {
  en: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    accreditations: 'Credentials',
    experience: 'Experience',
    blog: 'Blog',
    monitor: 'Cyber Monitor',
    contact: 'Contact',
    privacy: 'Privacy',
    heading: 'Cybersecurity · Ethical Hacking · Digital Investigation',
    intro: "I'm interested in how attacks work, how vulnerabilities are found, and how incidents can be investigated. This is where I share my projects and technical work.",
    motto: 'JUST DO IT, BUT DO IT WELL.',
    areas: ['Ethical Hacking', 'Digital Forensics', 'Cryptography', 'Penetration Testing', 'Security Assessments', 'Vulnerability Research'],
    profile: 'I focus on practical, evidence-led security work: understanding vulnerabilities, investigating incidents, and reducing real-world risk.',
    latestProjects: 'Selected projects',
    latestPosts: 'Latest writing',
    cta: 'Get in touch',
    more: 'View all',
    subscribe: 'Security updates',
    subscribeText: 'Receive updates about Romania-linked ransomware and data-breach reports. Unsubscribe at any time.',
    subscribeAction: 'Subscribe',
    subscribing: 'Submitting…',
    consent: 'I agree to receive email updates and have read the Privacy Policy.',
    submitted: 'Your request has been recorded. Alerts will start when email notifications are enabled.',
    failed: 'Your request could not be saved. Please try again.',
    emptyProjects: 'No projects published yet.',
    emptyPosts: 'No articles published yet.',
  },
  ro: {
    home: 'Acasă',
    about: 'Despre',
    projects: 'Proiecte',
    accreditations: 'Acreditări',
    experience: 'Experiență',
    blog: 'Blog',
    monitor: 'Monitorizare cyber',
    contact: 'Contact',
    privacy: 'Confidențialitate',
    heading: 'Securitate cibernetică · Ethical Hacking · Investigații digitale',
    intro: 'Mă interesează cum funcționează atacurile, cum sunt descoperite vulnerabilitățile și cum pot fi investigate incidentele. Aici îmi prezint proiectele și activitatea tehnică.',
    motto: 'JUST DO IT, BUT DO IT WELL.',
    areas: ['Ethical Hacking', 'Digital Forensics', 'Criptografie', 'Testare de penetrare', 'Evaluări de securitate', 'Cercetarea vulnerabilităților'],
    profile: 'Mă concentrez pe securitatea practică, bazată pe dovezi: înțelegerea vulnerabilităților, investigarea incidentelor și reducerea riscurilor reale.',
    latestProjects: 'Proiecte selectate',
    latestPosts: 'Articole recente',
    cta: 'Contactează-mă',
    more: 'Vezi toate',
    subscribe: 'Actualizări de securitate',
    subscribeText: 'Primește actualizări despre ransomware și breșe de date cu legătură verificată cu România. Te poți dezabona oricând.',
    subscribeAction: 'Abonează-te',
    subscribing: 'Se trimite…',
    consent: 'Accept să primesc actualizări prin email și am citit Politica de confidențialitate.',
    submitted: 'Cererea ta a fost înregistrată. Alertele vor începe când sunt activate notificările prin email.',
    failed: 'Cererea nu a putut fi salvată. Încearcă din nou.',
    emptyProjects: 'Nu sunt încă proiecte publicate.',
    emptyPosts: 'Nu sunt încă articole publicate.',
  },
} as const;
