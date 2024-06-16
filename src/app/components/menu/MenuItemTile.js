import Image from "next/image";
import React from "react";
import AddToCartButton from "./AddToCartButton";

function MenuItemTile({ item, onAddToCart }) {
  const maxDescriptionLength = 100;
  const truncatedDescription =
    item.description.length > maxDescriptionLength
      ? item.description.slice(0, maxDescriptionLength) + "..."
      : item.description;

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/50 transition-all flex flex-col justify-between h-full">
      <div className="text-center">
        <Image
          alt="Pizza"
          className="mx-auto w-auto"
          src={item.image}
          width={150}
          height={150}
          priority
        />
      </div>

      <h4 className="font-semibold text-xl my-3">{item.name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">
        {truncatedDescription}
      </p>

      <AddToCartButton onClick={onAddToCart} item={item} />
    </div>
  );
}

export default MenuItemTile;
