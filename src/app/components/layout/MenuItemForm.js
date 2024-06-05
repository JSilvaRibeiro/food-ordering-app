import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import pizzaPic from "@/app/components/icons/menuItemPlaceholder.png";
import MenuItemPriceProps from "./MenuItemPriceProps";

const MenuItemForm = ({ onSubmit, menuItem }) => {
  const [menuItemImage, setMenuItemImage] = useState(pizzaPic);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [extraIngredients, setExtraIngredients] = useState([]);

  useEffect(() => {
    if (menuItem) {
      setMenuItemImage(menuItem.image || pizzaPic);
      setItemName(menuItem.name || "");
      setItemDescription(menuItem.description || "");
      setItemPrice(menuItem.price || "");
      setSizes(menuItem.sizes || []);
      setExtraIngredients(menuItem.extraIngredients || []);
    }
  }, [menuItem]);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          menuItemImage,
          itemName,
          itemDescription,
          itemPrice,
          sizes,
          extraIngredients,
        })
      }
      className="mt-8"
    >
      <div
        className="grid gap-4 items-start"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
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
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
