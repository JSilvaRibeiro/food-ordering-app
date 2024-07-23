"use client";

import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../components/AppContext";
import Image from "next/image";
import TrashIcon from "../components/icons/TrashIcon";
import CheckoutForm from "../components/layout/AddressInputs";
import UseProfile from "../components/UseProfile";
import axios from "axios";

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({
    phoneNumber: "",
    streetAddress: "",
    city: "",
    postalCode: "",
  });
  const { data: userData } = UseProfile();

  useEffect(() => {
    if (userData?.city) {
      const { phoneNumber, streetAddress, city, postalCode } = userData;
      const addressFromUser = { phoneNumber, streetAddress, city, postalCode };
      setAddress(addressFromUser);
    }
  }, [userData]);

  const subtotal = cartProducts
    .map((product) => cartProductPrice(product))
    .reduce((acc, price) => acc + price, 0);

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/api/checkout", {
        address,
        cartProducts,
      });
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 border-b py-4"
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
          <div className="py-4 flex justify-end text-right">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subtotal.toFixed(2)}
              <br />
              $5.00
              <br />${(subtotal + 5).toFixed(2)}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 h-fit rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <CheckoutForm
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${(subtotal + 5).toFixed(2)}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
