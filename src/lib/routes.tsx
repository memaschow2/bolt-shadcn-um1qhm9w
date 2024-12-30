import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { App } from '@/App';
import { CasesPage } from '@/pages/CasesPage';
import { CaseDetailPage } from '@/pages/CaseDetailPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <CasesPage />,
      },
      {
        path: '/cases/:id',
        element: <CaseDetailPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);