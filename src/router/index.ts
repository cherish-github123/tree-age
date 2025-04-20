import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../componens/Home';
import Login from '../componens/Login';
import Upload from '../componens/Upload';
import Mine from '../componens/Mine';
import Register from '../componens/Register';
import HistoryRecord from '../componens/HistoryRecord';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/',
    Component: Home,
    children: [
      { path: '/home', Component: Upload },
      { path: '/mine', Component: Mine },
      { path: '/history', Component: HistoryRecord }
    ]
  },
  {
    path: 'register',
    Component: Register,
  }
]);

export default router;