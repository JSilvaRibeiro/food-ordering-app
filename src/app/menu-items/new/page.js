"use client";

import { useState } from "react";
import UseProfile from "../../components/UseProfile";
import UserTabs from "../../components/layout/UserTabs";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import LeftArrow from "@/app/components/icons/LeftArrow";
import { redirect } from "next/navigation";
import MenuItemForm from "@/app/components/layout/MenuItemForm";

const NewMenuItemPage = () => {
  const { loading, data } = UseProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(
    ev,
    {
      menuItemImage,
      itemName,
      itemDescription,
      itemPrice,
      sizes,
      extraIngredients,
    }
  ) {
    ev.preventDefault();
    const saveMenuItem = async () => {
      try {
        const imageUrl =
          typeof menuItemImage === "string" ? menuItemImage : menuItemImage.src;
        const response = await axios.post("/api/menu-items", {
          image: imageUrl,
          name: itemName,
          description: itemDescription,
          price: itemPrice,
          sizes: sizes,
          extraIngredients: extraIngredients,
        });

        if (response.status === 200) {
          setRedirectToItems(true);
        }
      } catch (error) {
        throw error;
      }
    };

    toast.promise(saveMenuItem(), {
      loading: "Saving menu item...",
      success: "Item created successfully!",
      error: "Error",
    });
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading...";
  }

  if (!data) {
    return "not an admin";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-full mx-auto">
        <Link href={"/menu-items"} className="button">
          <LeftArrow />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
    </section>
  );
};

export default NewMenuItemPage;
