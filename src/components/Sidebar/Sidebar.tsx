"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { TbStackBack } from "react-icons/tb";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "../ui/progress";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>("");
  const path = usePathname();

  useEffect(() => {
    setCurrentPath(path);
  }, [path]);

  const Menu: MenuItem[] = [
    {
      name: "Dashboard",
      icon: <IoMdHome />,
      path: "/dashboard",
    },
    {
      name: "Explore",
      icon: <TbStackBack />,
      path: "/dashboard/explore",
    },
    {
      name: "Upgrade",
      icon: <MdOutlineWorkspacePremium />,
      path: "/dashboard/upgrade",
    },
    {
      name: "Logout",
      icon: <PiSignOut />,
      path: "/dashboard/logout",
    },
  ];

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src="/logo.png" width={30} height={100} alt="logo" />
      <hr className="my-5" />
      <ul>
        {Menu.map((item, index) => (
          <li key={index}>
            <Link href={item.path}>
              <div
                className={`flex items-center gap-2 p-3 my-1 cursor-pointer hover:bg-white hover:text-black rounded-lg ${
                  item.path === currentPath
                    ? "bg-gray-50 text-black"
                    : "text-white"
                }`}
              >
                <div className="text-3xl">{item.icon}</div>
                <div>{item.name}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-10 w-[80%]">
        <Progress value={50} />
        <h2>3 Out of 5 Courses created</h2>
        <h2>Upgrade your Plan for unlimited access</h2>
      </div>
    </div>
  );
};

export default Sidebar;
