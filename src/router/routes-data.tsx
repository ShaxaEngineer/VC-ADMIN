import React from 'react';

import {
  ClockCircleOutlined,
  ContactsOutlined,
  MonitorOutlined,
  SettingOutlined,
  SketchOutlined,
  UsergroupAddOutlined,
  WechatOutlined,
} from '@ant-design/icons';

import { ALLROLE, ROUTES, SUPER_ADMIN_ROLES } from '@/constants';
import { idCreate } from '@/utils';

import {
  Admin,
  Candinates,
  Contacts,
  Home,
  LetsTalk,
  OrganizationAdmin,
  Partners,
  Vacancies,
} from './lazy.routes';

interface Route {
  id?: string;
  title?: string;
  text?: boolean;
  see?: boolean;
  index?: boolean;
  path?: string;
  element?: React.ReactNode;
  icon?: React.ReactNode;
  layout?: 'blank' | 'default';
  role?: string[];
  page?: string; // page propertyni qo'shing
  children?: Route[];
}

export const routesData: Route[] = [
  // --------------------------------------------------------------------------------------------- ALL_ROLE
  // home
  {
    id: idCreate(),
    index: false,
    path: ROUTES.home,
    element: <Home />,
    layout: 'default',
    role: ALLROLE,
  },
  // --------------------------------------------------------------------------------------------- SUPER_ADMIN
  {
    id: idCreate(),
    title: 'Super boshqaruvchi',
    index: true,
    text: true,
    role: [SUPER_ADMIN_ROLES],
  },
  // Boshqaruvchi
  {
    id: idCreate(),
    title: 'Boshqaruvchi',
    index: true,
    icon: <SettingOutlined />,
    path: ROUTES.admin,
    element: <Admin />,
    layout: 'default',
    role: [SUPER_ADMIN_ROLES],
  },
  // Jamoa
  {
    id: idCreate(),
    title: 'Jamoa',
    index: true,
    icon: <UsergroupAddOutlined />,
    path: ROUTES.team,
    element: <OrganizationAdmin />,
    layout: 'default',
    role: [SUPER_ADMIN_ROLES],
  },
  // Vakansiyalar
  {
    id: idCreate(),
    title: 'Vakansiyalar',
    index: true,
    icon: <ClockCircleOutlined />,
    path: ROUTES.vacancies,
    element: <Vacancies />,
    layout: 'default',
    role: [SUPER_ADMIN_ROLES],
  },
  // Nomzodlar
  {
    id: idCreate(),
    title: 'Nomzodlar',
    index: true,
    icon: <MonitorOutlined />,
    path: ROUTES.candinates,
    element: <Candinates />,
    layout: 'default',
    role: [SUPER_ADMIN_ROLES],
  },
  // Aloqalar
  {
    id: idCreate(),
    title: 'Aloqalar',
    index: true,
    icon: <ContactsOutlined />,
    path: ROUTES.contacts,
    element: <Contacts />,
    layout: 'default',
    role: [SUPER_ADMIN_ROLES],
  },
  // Keling, gaplashaylik
  {
    id: idCreate(),
    title: 'Keling, gaplashaylik',
    index: true,
    icon: <WechatOutlined />,
    path: ROUTES.letsTalk,
    element: <LetsTalk />,
    layout: 'default',
    role: [SUPER_ADMIN_ROLES],
  },
  // Hamkorlar
  {
    id: idCreate(),
    title: 'Hamkorlar',
    index: true,
    icon: <SketchOutlined />,
    path: ROUTES.partners,
    element: <Partners />,
    layout: 'default',
    role: [SUPER_ADMIN_ROLES],
  },
  // --------------------------------------------------------------------------------------------- 404
  // 404
  {
    id: idCreate(),
    title: '404',
    index: false,
    path: '*',
    element: <>404</>,
    layout: 'default',
  },
];
