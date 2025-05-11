import { PropsWithChildren } from 'react';

export const BlankLayout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-screen text-black dark:text-white-dark">{children}</div>;
};
