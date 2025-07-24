import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export const LayoutWithoutSidebar: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};
