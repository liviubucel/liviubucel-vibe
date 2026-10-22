import fs from 'node:fs';
import path from 'node:path';

const root = new URL('../', import.meta.url);
const read = (file) => fs.readFileSync(new URL(file, root), 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error('Migration check failed: ' + message);
};

const router = read('src/components/Router.tsx');
const header = read('src/components/Header.tsx');
const identity = read('src/lib/portfolio.ts');
const home = read('src/components/pages/HomePage.tsx');
const about = read('src/components/pages/AboutPage.tsx');
const contact = read('src/components/pages/ContactPage.tsx');
const privacy = read('src/components/pages/PrivacyPage.tsx');
const posts = read('src/components/pages/BlogDetailPage.tsx');
const monitor = read('src/components/pages/RomaniaCyberMonitorPage.tsx');
const wixConfig = JSON.parse(read('wix.config.json'));

assert(wixConfig.siteId === '052c11d8-b2bb-4c1f-9436-5b8ec599f358', 'Unexpected Wix site target');
assert(router.includes("path: 'ro'") && router.includes("path: 'ro/'"), 'Bilingual routes not registered');
assert(router.includes("pageIdentifier"), 'Wix Vibe route metadata missing');
assert(router.includes('RomaniaCyberMonitorPage'), 'Cyber Monitor not in route tree');
assert(identity.includes('contact@liviubucel.com'), 'Canonical contact email missing');
assert(identity.includes('https://tryhackme.com/p/liviubucel'), 'Canonical TryHackMe link missing');
assert(header.includes('localizedPath'), 'Header must use localized routes');
assert(home.includes("BaseCrudService.getAll") && home.includes("'articoleblog'"), 'Homepage not connected to Wix CMS');
assert(about.includes('ZebraByte') && !/PRO TV|Digi24|Agro TV/.test(about), 'Unsupported media claims');
assert(contact.includes('mailto:') && !contact.includes('contact@liviubucel.ro'), 'Contact route incorrect');
assert(privacy.includes('22 October 2026') && !privacy.includes('contact@liviubucel.ro'), 'Privacy content stale');
assert(posts.includes("items.query('articoleblog').eq('slug', id)"), 'Blog detail not slug-aware');
assert(monitor.includes("items.query('romaniaCyberIncidents')") && monitor.includes("editorialStatus"), 'Wix CMS incident feed missing');
const touched = ['src/components/Router.tsx','src/components/Header.tsx','src/components/Footer.tsx',
  'src/components/pages/AboutPage.tsx','src/components/pages/HomePage.tsx',
  'src/components/pages/ContactPage.tsx','src/components/pages/PrivacyPage.tsx'];
for (const name of touched) {
  const body = read(name);
  assert(!/github\.com\/user\//.test(body), name + ' includes fake GitHub profile link');
  assert(!/contact@liviubucel\.ro/.test(body), name + ' includes an incorrect old email');
}
console.log('Migration static contract checks passed: Wix Vibe target, native CMS routes, bilingual navigation, source accuracy and privacy.');
