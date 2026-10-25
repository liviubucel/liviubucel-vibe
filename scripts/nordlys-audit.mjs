import fs from 'node:fs';
const read = path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
const checks=[
['Original Nordlys GPL license is preserved',read('NORDLYS-LICENSE.md').includes('GNU GENERAL PUBLIC LICENSE')],
['Original author attribution is preserved',read('NORDLYS-ATTRIBUTION.md').includes('FjellOverflow')],
['Original Nordlys license publicly accessible',read('public/NORDLYS-GPL-3.0.txt').includes('GNU GENERAL PUBLIC LICENSE')],
['Nordlys theme replaces obsolete Mozilla styles',read('src/pages/[...slug].astro').includes('nordlys.css')&&!read('src/pages/[...slug].astro').includes('protocol-site.css')],
['Nordlys React shell mounted across all routes',read('src/components/Router.tsx').includes('NordlysFrame')],
['Dark light mode is interactive',read('src/components/nordlys/NordlysFrame.tsx').includes('setMode')],
['Homepage has Nordlys typography and inline links',read('src/components/pages/HomePage.tsx').includes('nordlys-landing-copy')],
['No old separate Header or Footer in page modules',!fs.readdirSync(new URL('../src/components/pages/',import.meta.url)).filter(n=>n.endsWith('.tsx')).some(n=>{let t=read('src/components/pages/'+n);return t.includes('<Header')||t.includes('<Footer')})],
['Official native Wix Blog API used',read('src/lib/wix-blog.ts').includes("from '@wix/blog'")],
['Official native Wix Portfolio collection (not CMS mirror)',read('src/lib/wix-portfolio.ts').includes("query('Portfolio/Projects')")&&!read('src/lib/wix-portfolio.ts').includes("'proiecte'")],
['Native Wix Forms contact preserved',read('src/components/pages/ContactPage.tsx').includes("from '@wix/forms'")],
['Cyber Monitor original native Wix dataset preserved',read('src/components/pages/RomaniaCyberMonitorPage.tsx').includes('romaniaCyberIncidents')],
['Search, Services, Tools and CV routes', ['search','services','tools','experience'].every(x=>read('src/components/Router.tsx').includes("path: '"+x+"'"))],
['Nordlys 500ms flip transition implemented',read('src/styles/nordlys.css').includes('opacity .5s')&&read('src/components/nordlys/FlipCard.tsx').includes('data-flipped')],
['Responsive navigation and reduced motion support',read('src/styles/nordlys.css').includes('max-width:920px')&&read('src/styles/nordlys.css').includes('prefers-reduced-motion')],
['English Romanian identity localization retained',read('src/lib/portfolio.ts').includes("export type Language = 'en' | 'ro'")],
['RSS source uses real native Wix Blog',read('src/pages/rss.xml.ts').includes('getPublishedBlogPosts')]
];
for(const [label,pass] of checks){if(!pass){console.error('FAIL',label);process.exitCode=1}else console.log('PASS',label)}
console.log('TOTAL',checks.length,'PASSED',checks.filter(x=>x[1]).length);
