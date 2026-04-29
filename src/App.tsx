import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from './components/home/HomePage';
import MapPage from './components/map/MapPage';

const router = createBrowserRouter([
  { path: '/',         element: <HomePage /> },
  { path: '/:mapSlug', element: <MapPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
