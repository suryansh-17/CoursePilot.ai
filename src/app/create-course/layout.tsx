import DashboardHeader from "@/components/Header/DashboardHeader";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  );
};

export default Layout;
