/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTES, SUPER_ADMIN_ROLES } from '@/constants';

export const employeeEnterRole = (role: typeof SUPER_ADMIN_ROLES): string => {
  if (role.includes(SUPER_ADMIN_ROLES)) return ROUTES.admin;
  else return ROUTES.admin;
};
