import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Image src="/logo.png" width={30} height={100} alt="logo" />
      <UserButton />
    </div>
  );
};

export default DashboardHeader;
