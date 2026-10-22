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

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "projects",
        element: <ProjectsPage />,
        routeMetadata: {
          pageIdentifier: 'projects',
        },
      },
      {
        path: "projects/:id",
        element: <ProjectDetailPage />,
        routeMetadata: {
          pageIdentifier: 'project-detail',
        },
      },
      {
        path: "accreditations",
        element: <AccreditationsPage />,
        routeMetadata: {
          pageIdentifier: 'accreditations',
        },
      },
      {
        path: "experience",
        element: <ExperiencePage />,
        routeMetadata: {
          pageIdentifier: 'experience',
        },
      },
      {
        path: "blog",
        element: <BlogPage />,
        routeMetadata: {
          pageIdentifier: 'blog',
        },
      },
      {
        path: "blog/:id",
        element: <BlogDetailPage />,
        routeMetadata: {
          pageIdentifier: 'blog-detail',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
        routeMetadata: {
          pageIdentifier: 'privacy',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
