import fs from 'node:fs';

const read = file => fs.readFileSync(new URL('../'+file, import.meta.url),'utf8');
const requireTrue=(ok,msg)=>{if(!ok)throw new Error('Native-Protocol migration test: '+msg)};
const pkg=JSON.parse(read('package.json'));
const checks=[
  ['Official Mozilla Protocol 22 CSS loaded',read('src/pages/[...slug].astro').includes('protocol-core-22.css')&&read('src/pages/[...slug].astro').includes('protocol-components-22.css')],
  ['Mozilla Protocol license retained',read('protocol-MPL-2.0.txt').includes('Mozilla Public License Version 2.0')],
  ['Original site identity retained',read('src/lib/portfolio.ts').includes('Liviu Bucel')],
  ['Native Wix Blog for all posts',read('src/lib/wix-blog.ts').includes("from '@wix/blog'")],
  ['Native Blog list page',read('src/components/pages/BlogPage.tsx').includes('getPublishedBlogPosts')],
  ['Native Blog rich-content detail',read('src/components/pages/BlogDetailPage.tsx').includes("getPublishedBlogPost")],
  ['Native Wix Portfolio dependency',Boolean(pkg.dependencies['@wix/portfolio'])],
  ['Native Wix Portfolio project index',read('src/components/pages/ProjectsPage.tsx').includes('getNativeProjects')],
  ['Native Wix Portfolio project detail',read('src/components/pages/ProjectDetailPage.tsx').includes('getNativeProject')],
  ['Native homepage project cards',read('src/components/pages/HomePage.tsx').includes('getNativeProjects')],
  ['Native homepage blog cards',read('src/components/pages/HomePage.tsx').includes('getPublishedBlogPosts')],
  ['Native Wix Forms contact',read('src/components/pages/ContactPage.tsx').includes("from '@wix/forms'")],
  ['Native Wix Forms newsletter',read('src/components/pages/HomePage.tsx').includes("from '@wix/forms'")],
  ['Original security monitor retained',read('src/components/pages/RomaniaCyberMonitorPage.tsx').includes('romaniaCyberIncidents')],
  ['Responsive navigation + labels',read('src/components/Header.tsx').includes('mzp-c-navigation') && read('src/components/Header.tsx').includes('aria-expanded')],
  ['Protocol footer',read('src/components/Footer.tsx').includes('mzp-c-footer')],
  ['Canonical contact domain',read('src/lib/portfolio.ts').includes('contact@liviubucel.com')],
  ['Protocol style for privacy',read('src/components/pages/PrivacyPage.tsx').includes('mzp-c-article')],
  ['Original placeholder routes restored',read('src/components/Router.tsx').includes("'design-works'")&&read('src/components/Router.tsx').includes("'travel'")&&read('src/components/Router.tsx').includes("'playground'")],
  ['No fake projects or media coverage',!['Modern Interiors','PRO TV','Digi24','Agro TV'].some(term=>read('src/components/pages/AboutPage.tsx').includes(term))],
];
for(const [name,ok] of checks) {requireTrue(ok,name);console.log('PASS',name)}
console.log('TOTAL',checks.length,'PASS');
