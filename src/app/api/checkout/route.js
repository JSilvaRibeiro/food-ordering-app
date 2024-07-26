import { MenuItem } from "@/app/models/MenuItem";
import { Order } from "@/app/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { cartProducts, address } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDocument = await Order.create({
      userEmail,
      phone: address.phone, // Use 'phone' instead of 'phoneNumber'
      streetAddress: address.streetAddress,
      city: address.city,
      postalCode: address.postalCode,
      cartProducts,
      paid: false,
    });

    const stripeLineItems = [];
    let calculatedTotal = 0; // Initialize total calculation

    for (const cartProduct of cartProducts) {
      const productInfo = await MenuItem.findById(cartProduct._id);
      let productPrice = productInfo.price;
      if (cartProduct.size) {
        const size = productInfo.sizes.find(
          (size) => size._id.toString() === cartProduct.size._id.toString()
        );
        productPrice += size.price;
      }
      if (cartProduct.extras?.length > 0) {
        for (const cartProductExtra of cartProduct.extras) {
          const extraItemInfo = productInfo.extraIngredients.find(
            (extraIngredient) =>
              extraIngredient._id.toString() === cartProductExtra._id.toString()
          );
          productPrice += extraItemInfo.price;
        }
      }

      const productName = cartProduct.name;
      calculatedTotal += productPrice; // Add to total calculation

      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(productPrice * 100), // Stripe expects the amount to be in cents
          product_data: {
            name: productName,
          },
        },
      });
    }

    // Add delivery fee to total
    const deliveryFee = 5.0;
    calculatedTotal += deliveryFee;

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      customer_email: userEmail,
      success_url:
        process.env.NEXTAUTH_URL +
        "orders/" +
        orderDocument._id.toString() +
        "?clear-cart=1",
      cancel_url: process.env.NEXTAUTH_URL + "cart?cancelled=1",
      metadata: { orderId: orderDocument._id.toString() },
      payment_intent_data: {
        metadata: { orderId: orderDocument._id.toString() },
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: {
              amount: Math.round(deliveryFee * 100),
              currency: "usd",
            },
          },
        },
      ],
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(error.message, { status: 500 });
  }
}

