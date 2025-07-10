import React from 'react';
import { NavigationMenu } from './NavigationMenu';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showNavigation = true 
}) => {
  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen">
      {showNavigation && <NavigationMenu onNavigate={handleNavigate} />}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}; 