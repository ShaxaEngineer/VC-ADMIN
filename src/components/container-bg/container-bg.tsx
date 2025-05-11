import React, { memo } from 'react';

interface ContainerBgProps {
  children: React.ReactNode;
  className?: string;
}

export const ContainerBg: React.FC<ContainerBgProps> = memo(({ children, className }) => {
  return <div className={`panel ${className}`}>{children}</div>;
});
