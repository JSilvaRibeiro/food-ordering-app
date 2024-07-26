"use client";
import { CartContext, cartProductPrice } from "@/app/components/AppContext";
import AddressInputs from "@/app/components/layout/AddressInputs";
import SectionHeaders from "@/app/components/layout/SectionHeaders";
import CartProduct from "@/app/components/menu/CartProduct";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const OrderPage = () => {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      if (typeof window !== "undefined") {
        if (window.location.href.includes("clear-cart=1")) {
          clearCart();
        }
      }
      if (id) {
        try {
          setLoadingOrder(true);
          const response = await axios.get("/api/orders?_id=" + id);
          setOrder(response.data);
          setLoadingOrder(false);
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      }
    };

    fetchOrder();
  }, [id, clearCart]);

  const calculateSubtotal = (cartProducts) => {
    return cartProducts
      .reduce((acc, product) => acc + cartProductPrice(product), 0)
      .toFixed(2);
  };

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your Order" />
        <div className="mt-4 mb-8">
          <p>Thank you for your order!</p>
          <p>We'll let you know when it's on the way.</p>
        </div>
      </div>
      {loadingOrder && <div>Loading order...</div>}
      {order && (
        <div className="grid grid-cols-2 gap-16">
          <div>
            {order.cartProducts.map((product, index) => (
              <CartProduct key={index} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-16">
                ${calculateSubtotal(order.cartProducts)}
              </span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-16">
                {" "}
                $5.00
              </span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-16">
                $
                {(
                  parseFloat(calculateSubtotal(order.cartProducts)) + 5
                ).toFixed(2)}
              </span>
              <br />
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
