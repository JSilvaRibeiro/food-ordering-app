import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import pizzaPic from "@/app/components/icons/menuItemPlaceholder.png";

const MenuItemForm = ({ onSubmit, menuItem }) => {
  const [menuImage, setMenuImage] = useState(pizzaPic);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  useEffect(() => {
    if (menuItem) {
      setMenuImage(menuItem.image || pizzaPic);
      setItemName(menuItem.name || "");
      setItemDescription(menuItem.description || "");
      setItemPrice(menuItem.price || "");
    }
  }, [menuItem]);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, { menuImage, itemName, itemDescription, itemPrice })
      }
      className="mt-8"
    >
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
  );
};

export default MenuItemForm;
