import { lazy } from 'react';

export const Home = lazy(() => import('@/pages').then((module) => ({ default: module.Home })));
export const Login = lazy(() => import('@/pages').then((module) => ({ default: module.Login })));
// super admin role
export const OrganizationAdmin = lazy(() =>
  import('@/pages').then((module) => ({ default: module.OrganizationAdmin })),
);
export const Vacancies = lazy(() =>
  import('@/pages').then((module) => ({ default: module.Vacancies })),
);
export const Candinates = lazy(() =>
  import('@/pages').then((module) => ({ default: module.Candinates })),
);
export const Contacts = lazy(() =>
  import('@/pages').then((module) => ({ default: module.Contacts })),
);
export const LetsTalk = lazy(() =>
  import('@/pages').then((module) => ({ default: module.LetsTalk })),
);
export const Partners = lazy(() =>
  import('@/pages').then((module) => ({ default: module.Partners })),
);
export const Admin = lazy(() => import('@/pages').then((module) => ({ default: module.Admin })));
