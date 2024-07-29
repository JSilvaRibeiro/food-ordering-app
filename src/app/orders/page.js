"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTabs from "../components/layout/UserTabs";
import UseProfile from "../components/UseProfile";
import { formatDateTime } from "@/libs/formatDateTime";
import Link from "next/link";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: userData } = UseProfile();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data.reverse());
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={userData?.admin} />
      <div className="mt-8">
        {loadingOrders && <div>Loading orders...</div>}
        {!loadingOrders && orders.length === 0 && <div>No orders found.</div>}
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
          >
            <div className="grow flex flex-col md:flex-row items-center gap-6">
              <div>
                <div
                  className={`${
                    order.paid ? "bg-green-500" : "bg-red-500"
                  } p-2 rounded-md text-white w-24 text-center`}
                >
                  {order.paid ? "Paid" : "Pending"}
                </div>
              </div>
              <div className="grow">
                <div className="flex gap-2 items-center mb-1">
                  <div className="grow">{order.userEmail}</div>
                  <div className="text-gray-500 text-sm">
                    {formatDateTime(order.createdAt)}
                  </div>
                </div>
                <div className="text-gray-500 text-xs">
                  {order.cartProducts.map((p) => p.name).join(", ")}
                </div>
              </div>
            </div>
            <div className="justify-end flex items-center gap-2 whitespace-nowrap">
              <Link
                className="button hover:bg-gray-300"
                href={`/orders/${order._id}`}
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
