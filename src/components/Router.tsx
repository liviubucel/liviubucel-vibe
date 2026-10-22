import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ProjectsPage from '@/components/pages/ProjectsPage';
import ProjectDetailPage from '@/components/pages/ProjectDetailPage';
import AccreditationsPage from '@/components/pages/AccreditationsPage';
import ExperiencePage from '@/components/pages/ExperiencePage';
import BlogPage from '@/components/pages/BlogPage';
import BlogDetailPage from '@/components/pages/BlogDetailPage';
import ContactPage from '@/components/pages/ContactPage';
import PrivacyPage from '@/components/pages/PrivacyPage';
import RomaniaCyberMonitorPage from '@/components/pages/RomaniaCyberMonitorPage';
import LegacySectionPage from '@/components/pages/LegacySectionPage';

function Layout() {
  return <><ScrollToTop /><Outlet /></>;
}

const pages = [
  { path: 'about', element: <AboutPage />, identifier: 'about' },
  { path: 'projects', element: <ProjectsPage />, identifier: 'projects' },
  { path: 'projects/:id', element: <ProjectDetailPage />, identifier: 'project-detail' },
  { path: 'accreditations', element: <AccreditationsPage />, identifier: 'accreditations' },
  { path: 'experience', element: <ExperiencePage />, identifier: 'experience' },
  { path: 'blog', element: <BlogPage />, identifier: 'blog' },
  { path: 'blog/:id', element: <BlogDetailPage />, identifier: 'blog-detail' },
  { path: 'romania-cyber-monitor', element: <RomaniaCyberMonitorPage />, identifier: 'monitor' },
  { path: 'romania-cyber-monitor/:category', element: <RomaniaCyberMonitorPage />, identifier: 'monitor-category' },
  { path: 'romania-cyber-monitor/incidents/:slug', element: <RomaniaCyberMonitorPage />, identifier: 'monitor-incident' },
  { path: 'contact', element: <ContactPage />, identifier: 'contact' },
  { path: 'privacy', element: <PrivacyPage />, identifier: 'privacy' },
  { path: 'design-works', element: <LegacySectionPage section='design' />, identifier: 'design-works' },
  { path: 'travel', element: <LegacySectionPage section='travel' />, identifier: 'travel' },
  { path: 'playground', element: <LegacySectionPage section='playground' />, identifier: 'playground' },
];

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  errorElement: <ErrorPage />,
  children: [
    { index: true, element: <HomePage />, routeMetadata: { pageIdentifier: 'home' } },
    ...pages.map(page => ({ path: page.path, element: page.element, routeMetadata: { pageIdentifier: page.identifier } })),
    { path: 'ro', element: <HomePage />, routeMetadata: { pageIdentifier: 'home-ro' } },
    ...pages.map(page => ({ path: 'ro/' + page.path, element: page.element, routeMetadata: { pageIdentifier: page.identifier + '-ro' } })),
    { path: '*', element: <Navigate to="/" replace /> },
  ],
}], { basename: import.meta.env.BASE_NAME });

export default function AppRouter() {
  return <MemberProvider><RouterProvider router={router} /></MemberProvider>;
}
