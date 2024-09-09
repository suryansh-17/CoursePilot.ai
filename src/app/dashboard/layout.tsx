import DashboardHeader from "@/components/Header/DashboardHeader";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <div className="md:w-full hidden md:block">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
