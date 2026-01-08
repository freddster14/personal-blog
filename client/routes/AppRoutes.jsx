import { createBrowserRouter } from 'react-router';
import Home from '../src/pages/Home';
import Root from '../src/pages/Root';
import Signup from '../src/pages/Signup';
import { fetchLatestBlogs } from '../src/api/blog';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true,
        loader: fetchLatestBlogs,
        Component: Home
      },
    ]
  },
  {
    path: '/sign-up',
    Component: Signup
  }
]);

export default router;