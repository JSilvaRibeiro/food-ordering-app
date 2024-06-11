import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import pizzaPic from "@/app/components/icons/menuItemPlaceholder.png";
import MenuItemPriceProps from "./MenuItemPriceProps";
import { usePathname } from "next/navigation";
import DeleteButton from "../DeleteButton";
import axios from "axios";

const MenuItemForm = ({ onSubmit, menuItem, onDelete }) => {
  const path = usePathname();
  const [menuItemImage, setMenuItemImage] = useState(pizzaPic);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (menuItem) {
      setMenuItemImage(menuItem.image || pizzaPic);
      setItemName(menuItem.name || "");
      setItemDescription(menuItem.description || "");
      setItemPrice(menuItem.price || "");
      setSizes(menuItem.sizes || []);
      setExtraIngredients(menuItem.extraIngredients || []);
      setSelectedCategory(menuItem.category || "");
    }
  }, [menuItem]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching catergories", error);
    }
  }

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit(ev, {
          menuItemImage,
          itemName,
          itemDescription,
          itemPrice,
          sizes,
          extraIngredients,
          category: selectedCategory,
        });
      }}
      className="mt-8"
    >
      <div
        className="grid gap-4 items-start"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="">
          <UploadImage link={menuItemImage} setLink={setMenuItemImage} />
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
          <label>Category</label>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(ev) => {
              setSelectedCategory(ev.target.value);
            }}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories?.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <label>Base Price</label>
          <input
            type="text"
            value={itemPrice}
            onChange={(ev) => setItemPrice(ev.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes"}
            props={sizes}
            setProps={setSizes}
            addLabel={"Add Item Size"}
          />
          <MenuItemPriceProps
            name={"Extra Ingredients"}
            addLabel={"Add Extra Ingredients"}
            props={extraIngredients}
            setProps={setExtraIngredients}
          />
          <div className="space-y-3">
            <button type="submit">Save</button>
            {path.includes("menu-items/edit") && (
              <DeleteButton label="Delete this item" onDelete={onDelete} />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
