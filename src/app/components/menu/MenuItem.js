import React, { useContext, useState } from "react";
import Image from "next/image";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";

export default function MenuItem({ item }) {
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  function handleAddToCartButtonClick() {
    if (item.sizes.length === 0 && item.extraIngredients.length === 0) {
      toast.success("Added to cart!");
      addToCart(item);
    } else {
      setShowPopup(true);
    }
  }

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-md max-h-screen overflow-scroll">
            <Image
              src={item.image}
              width={300}
              height={300}
              className="mx-auto"
              alt=""
            />
            <h2 className="text-lg font-bold text-center mb-4">{item.name}</h2>
            <p className="text-center text-gray-500 line-clamp-2 text-sm mb-2">
              {item.description}
            </p>
            {item.sizes?.length > 0 && (
              <div className="p-2">
                <h3 className="text-center text-gray-700">Pick your size</h3>
                {item.sizes.map((size) => (
                  <label
                    key={size.name}
                    className="flex items-center gap-2 p-4 border rounded-md mb-1"
                  >
                    <input type="radio" name="size" id="" />
                    {size.name} $
                    {parseFloat(item.price) + parseFloat(size.price)}
                  </label>
                ))}
              </div>
            )}
            {item.extraIngredients?.length > 0 && (
              <div className="p-2">
                <h3 className="text-center text-gray-700">Extra Ingredients</h3>
                {item.extraIngredients.map((extraIngredient) => (
                  <label
                    key={extraIngredient.name}
                    className="flex items-center gap-2 p-4 border rounded-md mb-1"
                  >
                    <input type="checkbox" name={extraIngredient.name} id="" />
                    {extraIngredient.name} +${parseFloat(extraIngredient.price)}
                  </label>
                ))}
              </div>
            )}
            <div className="p-2">
              <button className="primary" type="button">
                Add to cart {}
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile item={item} onAddToCart={handleAddToCartButtonClick} />
    </>
  );
}
