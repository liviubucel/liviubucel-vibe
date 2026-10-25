import fs from 'node:fs';
const read=file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');
const frame=read('src/components/nordlys/NordlysFrame.tsx');
const css=read('src/styles/nordlys.css');
const tools=read('src/components/pages/ToolsPage.tsx');
const post=read('src/components/pages/BlogDetailPage.tsx');
const toc=read('src/components/nordlys/NordlysArticleInteractions.tsx');
const pages=fs.readdirSync(new URL('../src/components/pages/',import.meta.url)).filter(f=>f.endsWith('.tsx')).map(f=>read('src/components/pages/'+f));
const tests=[
  ['Route navigation uses React Router view transitions',pages.filter(x=>x.includes('<Link viewTransition')).length>=10],
  ['Logo has named shared-element transition',css.includes('view-transition-name:branding')],
  ['Home hero uses same logo element',read('src/components/pages/HomePage.tsx').includes('className="nordlys-brand"')],
  ['Radial mode animation ported from original',frame.includes('startViewTransition')&&frame.includes('clipPath:')&&frame.includes('duration:600')],
  ['Reduced-motion skips animated mode switching',frame.includes('prefers-reduced-motion: reduce')],
  ['Radial mode animation CSS layers correctly',css.includes('html.theme-switching ::view-transition-new(root)')],
  ['Dropdown has original 500ms animation',css.includes('transform .5s ease-in-out,opacity .5s ease-in-out')],
  ['Dropdown handles escape and outside click',frame.includes("event.key==='Escape'")&&frame.includes("document.addEventListener('pointerdown',close)")],
  ['Mobile menu uses 300ms grid transition',css.includes('grid-template-rows .3s ease-in-out')&&frame.includes('nordlys-mobile-panel')],
  ['Scroll-to-top appears after one viewport',frame.includes('window.scrollY>document.documentElement.clientHeight')],
  ['Tools icon accordion is interactive',tools.includes('setActive')&&css.includes('.nordlys-tool-details[data-open=true]')],
  ['Tools accent and hover CSS',css.includes('--tool-highlight')&&css.includes('.nordlys-tool-choice:hover')],
  ['Blog reading progress bar',post.includes('ArticleProgress')&&css.includes('.nordlys-reading-progress')],
  ['Blog headings and animated TOC',post.includes('NordlysTableOfContents')&&toc.includes('IntersectionObserver')&&css.includes('.nordlys-toc-collapse[data-open=true]')],
  ['Article lightbox zoom and keyboard arrows',post.includes('ArticleLightbox')&&post.includes("e.key==='ArrowRight'")],
  ['Animations respect reduced motion',css.includes('@media(prefers-reduced-motion:reduce)')]
];
for(const [label,ok] of tests)console.log(ok?'PASS':'FAIL',label);
const failed=tests.filter(([label,ok])=>!ok);
console.log('TOTAL '+tests.length+' PASSED '+(tests.length-failed.length));
if(failed.length)process.exitCode=1;
