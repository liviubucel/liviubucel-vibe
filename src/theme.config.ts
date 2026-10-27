import { defineThemeConfig } from './types'

// The FjellOverflow/Nordlys original configuration, with identity,
// menu targets, metadata and social destination personalized ONLY.
export default defineThemeConfig({
  site: 'https://www.liviubucel.com',
  title: 'Liviu Bucel',
  description: 'Cybersecurity, digital investigations and technical projects',
  author: 'Liviu Bucel',
  navbarItems: [
    { label: 'Blog', href: '/blog/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Tags', href: '/tags/' },
    {
      label: 'Other pages',
      children: [
        { label: 'Services', href: '/services/' },
        { label: 'Resume', href: '/experience/' },
        { label: 'Tools', href: '/tools/' },
        { label: 'Contact', href: '/contact/' }
      ]
    },
    { label: 'About', href: '/about/' }
  ],
  footerItems: [
    {icon:'tabler--brand-github',href:'https://github.com/liviubucel',label:'GitHub'},
    {icon:'tabler--brand-linkedin',href:'https://www.linkedin.com/in/liviubucel/',label:'LinkedIn'},
    {icon:'tabler--brand-x',href:'https://x.com/liviubucel',label:'X'},
    {icon:'tabler--mail',href:'mailto:contact@liviubucel.com',label:'Email'},
    {icon:'tabler--rss',href:'/rss.xml',label:'RSS feed'}
  ],
  locale:'en',
  mode:'dark',
  modeToggle:true,
  colorScheme:'scheme-mono',
  openGraphImage:undefined,
  postsPerPage:5,
  postsView:'list',
  projectsPerPage:3,
  projectsView:'list',
  scrollProgress:false,
  scrollToTop:true,
  tagIcons:{},
  expressiveCodeThemes:['vitesse-light','vitesse-black']
})
