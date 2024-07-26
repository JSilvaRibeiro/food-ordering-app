"use client";

import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../components/AppContext";
import AddressInputs from "../components/layout/AddressInputs";
import UseProfile from "../components/UseProfile";
import axios from "axios";
import toast from "react-hot-toast";
import CartProduct from "../components/menu/CartProduct";

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({
    phone: "",
    streetAddress: "",
    city: "",
    postalCode: "",
  });
  const { data: userData } = UseProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("cancelled=1")) {
        toast.error("Payment failed");
      }
    }
  }, []);

  useEffect(() => {
    if (userData?.city) {
      const { phoneNumber: phone, streetAddress, city, postalCode } = userData;
      const addressFromUser = { phone, streetAddress, city, postalCode };
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

    const createOrder = async () => {
      try {
        const response = await axios.post("/api/checkout", {
          address,
          cartProducts,
        });
        if (response.status === 200) {
          window.location = response.data.url;
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.error("Error sending request:", error);
        throw error;
      }
    };
    toast.promise(createOrder(), {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          {cartProducts.map((product, index) => (
            <CartProduct
              key={index}
              index={index}
              product={product}
              onRemove={removeCartProduct}
            />
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
            <AddressInputs
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
