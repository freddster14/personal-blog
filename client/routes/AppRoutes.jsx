import { createBrowserRouter } from 'react-router';
import Home from '../src/pages/Home';
import Signup from '../src/pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/sign-up',
    Component: Signup
  }
]);

export default router;