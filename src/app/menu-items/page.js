"use client";

import Link from "next/link";
import UseProfile from "../components/UseProfile";
import UserTabs from "../components/layout/UserTabs";

const MenuItemsPage = () => {
  const { loading, data } = UseProfile();

  if (loading) {
    return "Loading...";
  }

  if (!data) {
    return "not an admin";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8 bg-">
        <Link className="button" href={"/menu-items/new"}>
          Create new menu item
        </Link>
      </div>
    </section>
  );
};

export default MenuItemsPage;
