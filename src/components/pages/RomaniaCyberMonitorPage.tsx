import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { items } from '@wix/data';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLanguage, localizedPath } from '@/lib/portfolio';

type Incident = {
  _id: string;
  title?: string;
  slug?: string;
  organisation?: string;
  recordType?: string;
  verificationStatus?: string;
  editorialStatus?: string;
  independentlyConfirmed?: boolean;
  incidentDate?: string;
  publishedAt?: string;
  summary?: string;
  sourceUrl?: string;
  romaniaRelationshipBasis?: string;
};

const categories = [
  { path: 'ransomware', type: 'ransomware_claim', en: 'Ransomware', ro: 'Ransomware' },
  { path: 'breaches', type: 'verified_breach', en: 'Breaches', ro: 'Breșe' },
  { path: 'exposures', type: 'public_exposure', en: 'Exposures', ro: 'Expuneri' },
  { path: 'threat-infrastructure', type: 'threat_indicator', en: 'Threat infrastructure', ro: 'Infrastructură' },
  { path: 'malware', type: 'malware_intelligence', en: 'Malware', ro: 'Malware' },
] as const;

export default function RomaniaCyberMonitorPage() {
  const path = useLocation().pathname;
  const lang = getLanguage(path);
  const { category, slug } = useParams<{ category?: string; slug?: string }>();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const selected = categories.find(item => item.path === category);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setFailed(false);
      try {
        let query = items.query('romaniaCyberIncidents').eq('editorialStatus', 'published');
        if (selected) query = query.eq('recordType', selected.type);
        if (slug) query = query.eq('slug', slug);
        const response = await query.limit(100).find();
        if (active) setIncidents(response.items as Incident[]);
      } catch {
        if (active) setFailed(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [selected?.type, slug]);

  const title = lang === 'ro' ? 'Monitorizarea amenințărilor cibernetice din România' : 'Romania Cyber Monitor';
  const description = lang === 'ro'
    ? 'Semnalări publice de ransomware, breșe și expuneri cu o legătură documentată cu România. Afirmațiile neconfirmate sunt separate de incidentele verificate.'
    : 'Publicly reported ransomware claims, breaches and exposures with documented Romania links. Unconfirmed claims are clearly distinguished from independently verified incidents.';
  const base = localizedPath('/romania-cyber-monitor', lang);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-secondary py-20 text-secondary-foreground">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-16">
            <div className="flex gap-3 items-center text-primary mb-6"><ShieldCheck size={24} /> THREAT INTELLIGENCE</div>
            <h1 className="font-heading text-4xl sm:text-6xl font-bold mb-6">{title}</h1>
            <p className="text-secondary-foreground/75 text-lg leading-relaxed max-w-4xl">{description}</p>
          </div>
        </section>
        <div className="max-w-[100rem] mx-auto px-6 lg:px-16 py-12">
          <nav aria-label="Incident categories" className="flex flex-wrap gap-3 mb-10">
            <Link to={base} aria-current={!category && !slug ? 'page' : undefined}
              className="border border-divider/30 rounded px-4 py-2 hover:text-primary">
              {lang === 'ro' ? 'Toate' : 'All'}
            </Link>
            {categories.map(item => (
              <Link to={base + '/' + item.path} key={item.path} aria-current={category === item.path ? 'page' : undefined}
                className="border border-divider/30 rounded px-4 py-2 hover:text-primary">
                {item[lang]}
              </Link>
            ))}
          </nav>
          {slug && <Link to={base} className="inline-flex items-center gap-2 text-primary mb-8"><ArrowLeft size={17}/>{lang === 'ro' ? 'Toate incidentele' : 'All incidents'}</Link>}
          {loading ? (
            <p role="status">{lang === 'ro' ? 'Se încarcă...' : 'Loading…'}</p>
          ) : failed ? (
            <p role="alert">{lang === 'ro' ? 'Nu am putut încărca datele. Încearcă din nou.' : 'Unable to load incident records. Please retry.'}</p>
          ) : incidents.length === 0 ? (
            <p role="status" className="border border-divider/30 rounded p-8 text-foreground/75">
              {lang === 'ro' ? 'Nu există încă înregistrări publicate în noul sistem Wix CMS.' : 'No incidents are published in the new Wix CMS yet.'}
            </p>
          ) : (
            <ul className="grid gap-5">
              {incidents.map(incident => (
                <li key={incident._id} className="border border-divider/30 rounded p-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/60 mb-4">
                    <span>{incident.recordType?.replace(/_/g,' ')}</span>
                    <span>·</span><span>{incident.verificationStatus?.replace(/_/g,' ')}</span>
                    {incident.independentlyConfirmed && <strong className="text-primary">{lang === 'ro' ? 'Confirmat independent' : 'Independently verified'}</strong>}
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-semibold mb-3">
                    {incident.slug && !slug ? <Link to={base + '/incidents/' + encodeURIComponent(incident.slug)} className="hover:text-primary">{incident.title || incident.organisation}</Link> : incident.title || incident.organisation}
                  </h2>
                  {incident.incidentDate && <p className="text-sm text-foreground/60 mb-4">{incident.incidentDate}</p>}
                  {incident.summary && <p className="whitespace-pre-line leading-relaxed text-foreground/80 mb-4">{incident.summary.replace(/<[^>]*>/g,'')}</p>}
                  {incident.sourceUrl && /^https:\/\//i.test(incident.sourceUrl) && (
                    <a href={incident.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center text-primary text-sm"><ExternalLink size={16}/>{lang === 'ro' ? 'Sursă publică' : 'Public source'}</a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
