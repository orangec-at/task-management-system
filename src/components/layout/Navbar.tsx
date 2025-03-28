"use client";

import { usePathname } from "next/navigation";
import UserStatus from "./UserStatus";
import { menu } from "@/types/menu";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="border-b w-full bg-white dark:bg-gray-900">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold">
            {menu.find((i) => i.url === pathname)?.pageTitle}
          </span>
        </div>

        <div className="flex items-center">
          <UserStatus />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
