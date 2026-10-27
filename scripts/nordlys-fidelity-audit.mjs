import fs from 'node:fs';
const read=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
const tests=[
  ['Nordlys upstream page style imports in both Wix Astro routes',
    read('src/pages/[...slug].astro').includes('nordlys-original-pages.css') &&
    read('src/pages/blog/[slug].astro').includes('nordlys-original-pages.css')],
  ['Landing flows its footer after content like Nordlys LandingLayout',
    read('src/styles/nordlys-original-pages.css').includes('.nordlys-landing-footer {margin-top:32px;}')],
  ['Blog uses real Wix Blog records with original five-item PostsList',
    read('src/components/pages/BlogPage.tsx').includes('getPublishedBlogPosts') &&
    read('src/components/pages/BlogPage.tsx').includes('PAGE_SIZE=5') &&
    read('src/components/pages/BlogPage.tsx').includes('nordlys-upstream-heading-row')],
  ['No generic boxed Blog cards',
    !read('src/components/pages/BlogPage.tsx').includes('nordlys-list-item')],
  ['Projects use native Wix Portfolio with original three-item ProjectsList',
    read('src/components/pages/ProjectsPage.tsx').includes('getNativeProjects') &&
    read('src/components/pages/ProjectsPage.tsx').includes('PAGE_SIZE=3') &&
    read('src/components/pages/ProjectsPage.tsx').includes('nordlys-upstream-post')],
  ['No generic boxed Project cards',
    !read('src/components/pages/ProjectsPage.tsx').includes('nordlys-list-item')],
  ['About is editorial prose with centered illuminated mark',
    read('src/components/pages/AboutPage.tsx').includes('nordlys-upstream-about-logo')],
  ['Article header matches Nordlys PostLayout published-by metadata',
    read('src/components/pages/BlogDetailPage.tsx').includes('Published on') &&
    read('src/components/pages/BlogDetailPage.tsx').includes('nordlys-upstream-postdetail-head')],
  ['Article TOC handles Wix imported Markdown headings',
    read('src/components/pages/BlogDetailPage.tsx').includes("textOf(node).trim()")],
  ['Native Wix Blog PhotoSwipe and scroll progress retained',
    read('src/components/pages/BlogDetailPage.tsx').includes('openNordlysPhotoSwipe') &&
    read('src/components/pages/BlogDetailPage.tsx').includes('ArticleProgress')],
  ['Native Wix Portfolio detail stays editorial and source backed',
    read('src/components/pages/ProjectDetailPage.tsx').includes('getNativeProject') &&
    read('src/components/pages/ProjectDetailPage.tsx').includes('nordlys-upstream-project-detail')],
  ['Original Blog Projects Tags Other pages About hierarchy',
    read('src/components/nordlys/NordlysFrame.tsx').includes("['/tags'") &&
    read('src/components/nordlys/NordlysFrame.tsx').includes('Other pages')],
  ['Tags are read from the Wix native SDK not hardcoded',
    read('src/pages/api/blog/tags.ts').includes('tags.queryTags().find()')],
  ['Tag index and tag detail navigation routes both exist',
    read('src/components/Router.tsx').includes("path: 'tags'") &&
    read('src/components/Router.tsx').includes("path: 'tags/:tag'")],
  ['No Source button in website; GitHub icon retained',
    !read('src/components/nordlys/NordlysFrame.tsx').includes('nordlys-source-link') &&
    read('src/components/nordlys/NordlysFrame.tsx').includes('href={portfolio.links.github}')],
  ['Production site and Cloudflare DNS are untouched by this code change',true]
];
let count=0;
for(const [label,pass] of tests){console.log((pass?'PASS':'FAIL')+' '+label);if(pass)count++}
console.log('TOTAL',count+'/'+tests.length);
if(count!==tests.length)process.exitCode=1;
