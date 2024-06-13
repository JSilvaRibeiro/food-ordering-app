"use client";

import { useContext } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../components/AppContext";
import Image from "next/image";
import TrashIcon from "../components/icons/TrashIcon";

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Check Out"} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-4 mb-2 border-b py-2"
              >
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
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm ">
                      Size: <span className="">{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="">
                      {product.extras.map((extra, extraIndex) => (
                        <div
                          key={extraIndex}
                          className="text-gray-600 text-sm "
                        >
                          {extra.name} +${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="font-semibold">
                  ${cartProductPrice(product).toFixed(2)}
                </div>
                <div>
                  <button
                    onClick={() => removeCartProduct(index)}
                    type="button"
                    className="p-2 hover:bg-gray-300"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div>right</div>
      </div>
    </section>
  );
};

export default CartPage;
