import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
function Header() {
  return (
    <div className="flex justify-between p-5 shadow-md">
      <Image src={"/logo.svg"} width={150} height={50} alt="logo" />
      <Button className="font-bold text-white">Get Started</Button>
    </div>
  );
}
export default Header;
