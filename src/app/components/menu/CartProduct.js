import React from "react";
import Image from "next/image";
import { cartProductPrice } from "../AppContext";
import TrashIcon from "../icons/TrashIcon";

const CartProduct = ({ product, onRemove, index }) => {
  return (
    <div className="flex items-center justify-between gap-4 border-b py-4">
      <div className="w-32">
        <Image
          src={product.image}
          width={240}
          height={240}
          alt="product image"
          className="w-auto h-full"
          priority
        />
      </div>
      <div className="flex flex-col grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div className="text-sm">
            Size: <span className="">{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="">
            {product.extras.map((extra, extraIndex) => (
              <div key={extraIndex} className="text-gray-600 text-sm">
                {extra.name} +${extra.price.toFixed(2)}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="font-semibold text-center">
        ${cartProductPrice(product).toFixed(2)}
      </div>
      {!!onRemove && (
        <div>
          <button
            onClick={() => onRemove(index)}
            type="button"
            className="p-2 hover:bg-gray-300"
          >
            <TrashIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
