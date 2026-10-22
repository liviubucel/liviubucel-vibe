import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLanguage, portfolio } from '@/lib/portfolio';

const en = [
  ['Controller and scope', 'This personal website, including its Romania Cyber Monitor, is operated by Liviu Bucel. This notice describes personal data processed through the contact and newsletter functions and the technical data needed to operate the website.'],
  ['Information you submit', 'If you contact me by email, I receive your email address and message. The newsletter form records your email address, consent indication and submission timestamp in the Wix CMS. The CV is available by contacting me; there is no public download link.'],
  ['Purpose and lawful basis', 'I use contact information to answer enquiries, on the basis of legitimate interests in corresponding about requested matters. Email marketing would require your consent and a functioning opt-in/unsubscribe mechanism; storing a newsletter request alone does not mean email alerts are enabled.'],
  ['Providers and security', 'The replacement website uses Wix infrastructure, including native CMS storage and site hosting. External services may process limited request logs needed for security and operations. Historical functions remain on the old infrastructure until individually migrated and discontinued.'],
  ['Retention and your rights', 'Newsletter records are retained until consent withdrawal or deletion upon request, subject to applicable legal obligations. Depending on applicable data-protection law you may request access, correction, deletion, objection or restriction, and withdraw consent at any time.'],
  ['Public threat-intelligence reports', 'The Romania Cyber Monitor distinguishes unverified claims from independently verified incidents. Publication is not proof that a named organisation suffered a compromise. Contact me to request correction or review.'],
];
const ro = [
  ['Operator și domeniu', 'Acest site personal, inclusiv Romania Cyber Monitor, este administrat de Liviu Bucel. Această informare descrie datele prelucrate prin funcțiile de contact și newsletter și datele tehnice necesare funcționării site-ului.'],
  ['Date trimise de vizitatori', 'Dacă îmi trimiți un email, primesc adresa ta și mesajul. Formularul de newsletter înregistrează în Wix CMS adresa de email, acordul exprimat și data înscrierii. CV-ul se solicită prin contact direct și nu este descărcabil public.'],
  ['Scop și temei juridic', 'Folosesc datele de contact pentru răspunsuri la solicitări, pe baza interesului legitim de a comunica despre cererile primite. Comunicările de marketing prin email necesită consimțământ și un mecanism funcțional de confirmare/dezabonare; simpla înregistrare a cererii nu înseamnă că alertele sunt activate.'],
  ['Furnizori și securitate', 'Noul website folosește infrastructura Wix, inclusiv Wix CMS și hosting. Serviciile tehnice pot procesa date de diagnostic necesare funcționării și securității. Funcțiile istorice rămân pe infrastructura veche până la migrarea și dezactivarea lor individuală.'],
  ['Păstrarea datelor și drepturi', 'Înregistrările newsletter sunt păstrate până la retragerea consimțământului sau ștergerea la cerere, sub rezerva obligațiilor legale. În condițiile legislației aplicabile poți solicita acces, rectificare, ștergere, opoziție sau restricționare și îți poți retrage consimțământul.'],
  ['Raportări publice de amenințări', 'Romania Cyber Monitor diferențiază afirmațiile neconfirmate de incidentele verificate independent. O publicare nu demonstrează automat compromiterea unei organizații. Solicită o corectură sau verificare prin email.'],
];

export default function PrivacyPage() {
  const lang = getLanguage(useLocation().pathname);
  const sections = lang === 'ro' ? ro : en;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-secondary py-20 text-secondary-foreground">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-16">
            <h1 className="font-heading font-bold text-5xl mb-6">{lang === 'ro' ? 'Confidențialitate' : 'Privacy Policy'}</h1>
            <p className="text-secondary-foreground/70">{lang === 'ro' ? 'Actualizat: 22 octombrie 2026' : 'Updated: 22 October 2026'}</p>
          </div>
        </section>
        <div className="max-w-[100rem] mx-auto px-6 lg:px-16 py-16">
          <div className="max-w-4xl space-y-9">
            {sections.map(([title,body],index) => (
              <section key={title}>
                <h2 className="font-heading text-2xl font-semibold mb-3">{index + 1}. {title}</h2>
                <p className="text-foreground/80 leading-relaxed">{body}</p>
              </section>
            ))}
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-3">{lang === 'ro' ? 'Contact pentru solicitări de confidențialitate' : 'Privacy requests'}</h2>
              <a className="text-primary underline" href={'mailto:' + portfolio.email}>{portfolio.email}</a>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
