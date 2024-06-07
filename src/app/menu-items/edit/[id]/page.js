"use client";
import { useEffect, useState } from "react";
import UseProfile from "@/app/components/UseProfile";
import UploadImage from "@/app/components/layout/UploadImage";
import UserTabs from "@/app/components/layout/UserTabs";
import pizzaPic from "@/app/components/icons/menuItemPlaceholder.png";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import LeftArrow from "@/app/components/icons/LeftArrow";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/app/components/layout/MenuItemForm";

const EditMenuItemPage = () => {
  const { id } = useParams();

  const { loading, data } = UseProfile();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetchMenuItem();
  }, []);

  async function fetchMenuItem() {
    try {
      const response = await axios.get("/api/menu-items");
      const items = response.data;
      const item = items.find((i) => i._id === id);

      setMenuItem(item);
    } catch (error) {
      console.error("Error fetching menu item:", error);
    }
  }

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const saveMenuItem = async () => {
      try {
        const response = await axios.put("/api/menu-items", {
          image: data.menuImage,
          name: data.itemName,
          description: data.itemDescription,
          price: data.itemPrice,
          _id: id,
          sizes: data.sizes,
          extraIngredients: data.extraIngredients,
          category: data.category,
        });

        if (response.status === 200) {
          setRedirectToItems(true);
        }
      } catch (error) {
        throw error;
      }
    };

    toast.promise(saveMenuItem(), {
      loading: "Updating menu item...",
      success: "Item updated successfully!",
      error: "Error",
    });
  }

  async function handleDeleteClick() {
    async function deleteItem() {
      try {
        const response = await axios.delete("/api/menu-items?_id=" + id);
        if (response.status === 200) {
          setRedirectToItems(true);
        }
      } catch (error) {
        console.error("Error deleting item", error);
        throw error;
      }
    }
    toast.promise(deleteItem(), {
      loading: "Deleting item...",
      success: "Item deleted successfully!",
      error: "Error deleting item",
    });
  }

  if (redirectToItems) {
    return redirect("/menu-items/");
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
      <div className="mt-8 max-w-2xl mx-auto">
        <Link href={"/menu-items"} className="button hover:bg-gray-300">
          <LeftArrow />
          <span>Show All Menu Items</span>
        </Link>
      </div>
      <MenuItemForm
        onSubmit={handleFormSubmit}
        menuItem={menuItem}
        onDelete={handleDeleteClick}
      />
    </section>
  );
};

export default EditMenuItemPage;
