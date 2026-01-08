import { createBrowserRouter } from 'react-router';
import Home from '../src/pages/Home';
import Root from '../src/pages/Root';
import Signup from '../src/pages/Signup';
import Blog from '../src/pages/Blog'
import Login from '../src/pages/Login'
import apiBlog from '../src/api/blog';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true,
        loader: async () => await apiBlog('/b'),
        Component: Home
      },
      {
        path: 'b/:slug',
        loader: async ({ params }) => await apiBlog(`/b/${params.slug}`),
        Component: Blog,
      },
    ]
  },
  { path: '/sign-up', Component: Signup },
  { path: '/login', Component: Login }
]);

export default router;