import { createBrowserRouter } from 'react-router';
import Home from '../src/pages/Home';
import Root from '../src/pages/Root';
import Signup from '../src/pages/Signup';
import Blog from '../src/pages/Blog'
import Login from '../src/pages/Login'
import AllBlogs from '../src/pages/AllBlogs';
import RootErrorBoundary from '../src/pages/404';
import { apiFetch } from '../src/api/client';

const router = createBrowserRouter([
  {
    path: '/',
    ErrorBoundary: RootErrorBoundary,
    Component: Root,
    children: [
      { index: true,
        loader: async () => await apiFetch('/b'),
        Component: Home
      },
      {
        path:'b/all',
        loader: async () => await apiFetch('/b/all'),
        Component: AllBlogs
      },
      {
        path: 'b/:slug',
        loader: async ({ params }) => await apiFetch(`/b/${params.slug}`),
        Component: Blog,
      },
    ]
  },
  { path: '/sign-up', Component: Signup },
  { path: '/login', Component: Login }
]);

export default router;