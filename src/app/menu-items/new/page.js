"use client";

import { useState } from "react";
import UseProfile from "../../components/UseProfile";
import UploadImage from "../../components/layout/UploadImage";
import UserTabs from "../../components/layout/UserTabs";
import pizzaPic from "@/app/components/icons/menuItemPlaceholder.png";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const NewMenuItemPage = () => {
  const { loading, data } = UseProfile();
  const [menuImage, setMenuImage] = useState(pizzaPic);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const saveMenuItem = async () => {
      try {
        const imageUrl =
          typeof menuImage === "string" ? menuImage : menuImage.src;
        const response = await axios.post("/api/menu-items", {
          image: imageUrl,
          name: itemName,
          description: itemDescription,
          price: itemPrice,
        });

        if (response.statusText == "OK") {
          //clear input fields
          //refresh menu items list
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

  if (loading) {
    return "Loading...";
  }

  if (!data) {
    return "not an admin";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-xs mx-auto">
        <Link href={"/menu-items"} className="button">
          <span>Show all menu items</span>
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className="mt-8">
        <div
          className="grid gap-4 items-start"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div>
            <UploadImage link={menuImage} setLink={setMenuImage} />
          </div>
          <div className="grow">
            <label>Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(ev) => setItemName(ev.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={itemDescription}
              onChange={(ev) => setItemDescription(ev.target.value)}
            />
            <label>Base Price</label>
            <input
              type="text"
              value={itemPrice}
              onChange={(ev) => setItemPrice(ev.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default NewMenuItemPage;
