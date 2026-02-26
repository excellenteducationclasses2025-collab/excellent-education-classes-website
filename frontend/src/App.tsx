import { createRouter, RouterProvider, createRoute, createRootRoute } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import LiveClasses from './pages/LiveClasses';
import RegistrationPage from './pages/RegistrationPage';
import Layout from './components/Layout';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-login',
  component: AdminLogin,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
});

const liveClassesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/live-classes',
  component: LiveClasses,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegistrationPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  adminLoginRoute,
  adminRoute,
  liveClassesRoute,
  registerRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
