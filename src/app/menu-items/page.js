"use client";

import Link from "next/link";
import UseProfile from "../components/UseProfile";
import UserTabs from "../components/layout/UserTabs";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import PlusSign from "../components/icons/PlusSign";
import EditIcon from "../components/icons/EditIcon";

const MenuItemsPage = () => {
  const { loading, data } = UseProfile();
  const [menuItemsList, setMenuItemsList] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  async function fetchMenuItems() {
    try {
      const response = await axios.get("/api/menu-items");
      setMenuItemsList(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  if (loading) {
    return "Loading...";
  }

  if (!data) {
    return "not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-full mx-auto">
        <Link className="button hover:bg-gray-300" href={"/menu-items/new"}>
          <PlusSign />
          Create New Menu Item
        </Link>
      </div>
      <div className="mt-2">
        <h2 className="text-sm text-gray-500 mt-8">Edit Menu Items:</h2>
        <div className="grid grid-cols-3 gap-4">
          {menuItemsList.map((menuItem) => (
            <Link
              href={"/menu-items/edit/" + menuItem._id}
              key={menuItem.name}
              className="flex flex-col justify-center bg-gray-200 rounded-lg p-4 text-center shadow-xl hover:bg-white"
            >
              <Image
                src={menuItem.image}
                width={90}
                height={90}
                alt="menu item image"
                className="rounded-md mx-auto"
              />
              {menuItem.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItemsPage;
