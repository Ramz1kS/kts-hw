import { type RouteObject } from 'react-router';
import App from '../App/App.tsx';
import ProductList from '../App/pages/ProductList';
import ProductPage from '../App/pages/ProductPage';
import NotFound from '../App/pages/NotFound';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ProductList />,
      },
      {
        path: '/product/:documentId',
        element: <ProductPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
