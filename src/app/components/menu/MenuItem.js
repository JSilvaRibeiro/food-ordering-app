import React, { useContext, useState } from "react";
import Image from "next/image";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";

export default function MenuItem({ item }) {
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  function handleAddToCartButtonClick() {
    const addToCartAndReset = () => {
      addToCart(item, selectedSize, selectedExtras);
      setSelectedSize(item.sizes?.[0] || null);
      setSelectedExtras([]);
      toast.success("Added to cart!");
      setShowPopup(false);
    };

    if (showPopup) {
      addToCartAndReset();
      return;
    }

    const hasCustomizations =
      item.sizes.length > 0 || item.extraIngredients.length > 0;
    if (!hasCustomizations) {
      toast.success("Added to cart!");
      addToCart(item);
    } else {
      setShowPopup(true);
    }
  }

  function handleExtrasSelectionClick(ev, extraIngredient) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraIngredient]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraIngredient.name);
      });
    }
  }

  // Calculate total item price
  let totalPrice = item.price;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => {
            setShowPopup(false);
            setSelectedExtras([]);
          }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white py-2 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll py-2 px-4"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              <Image
                src={item.image}
                width={270}
                height={270}
                className="mx-auto w-auto h-full"
                alt=""
              />

              <h2 className="text-lg font-bold text-center mb-4">
                {item.name}
              </h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {item.description}
              </p>
              {/* Item size selection */}
              {item.sizes?.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {item.sizes.map((size) => (
                    <label
                      key={size.name}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"
                        id=""
                      />
                      {size.name} ${(item.price + size.price).toFixed(2)}
                    </label>
                  ))}
                </div>
              )}
              {/* Extra ingredients selection  */}
              {item.extraIngredients?.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>

                  {item.extraIngredients.map((extraIngredient) => (
                    <label
                      key={extraIngredient.name}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        onChange={(ev) =>
                          handleExtrasSelectionClick(ev, extraIngredient)
                        }
                        name={extraIngredient.name}
                        id=""
                      />
                      {extraIngredient.name} +${extraIngredient.price}
                    </label>
                  ))}
                </div>
              )}
              <div className="px-2 sticky bottom-0">
                <button
                  onClick={handleAddToCartButtonClick}
                  className="primary"
                  type="button"
                >
                  Add to cart ${totalPrice.toFixed(2)}
                </button>
              </div>
              <div className="px-2 mt-2">
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setSelectedExtras([]);
                  }}
                  className="hover:bg-gray-300"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile item={item} onAddToCart={handleAddToCartButtonClick} />
    </>
  );
}
