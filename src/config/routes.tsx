import { type RouteObject } from 'react-router';
import App from '../App/App.tsx';
import ProductList from '../App/pages/ProductList';
import ProductPage from '../App/pages/ProductPage';
import Cart from '../App/pages/Cart';
import ErrorPage from '../App/pages/ErrorPage';

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
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/error/:code',
        element: <ErrorPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
];
