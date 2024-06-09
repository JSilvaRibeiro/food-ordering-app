"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const UserTabs = ({ isAdmin }) => {
  const path = usePathname();

  return (
    <div className="flex justify-center gap-2 tabs">
      <Link
        className={path === "/profile" ? "active" : "hover:bg-gray-200"}
        href={"/profile"}
      >
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : "hover:bg-gray-200"}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            className={
              path.includes("menu-items") ? "active" : "hover:bg-gray-200"
            }
            href={"/menu-items"}
          >
            Menu Items
          </Link>
          <Link
            className={path.includes("users") ? "active" : "hover:bg-gray-200"}
            href={"/users"}
          >
            Users
          </Link>
          <Link
            className={path === "/orders" ? "active" : "hover:bg-gray-200"}
            href={"/orders"}
          >
            Orders
          </Link>
        </>
      )}
    </div>
  );
};

export default UserTabs;
