const stripe = require("stripe")(process.env.STRIPE_SK);
import { Order } from "@/app/models/Order";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const buf = await req.text();
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    console.log(event);
  } catch (error) {
    console.error(`Webhook Error: ${error.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }
  if (event.type === "checkout.session.completed") {
    console.log(event);
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";
    console.log(isPaid);
    if (isPaid) {
      try {
        await mongoose.connect(process.env.MONGO_URL);
        const result = await Order.updateOne({ _id: orderId }, { paid: true });
        if (result.nModified === 0) {
          console.error(`Order with ID ${orderId} was not updated.`);
        } else {
          console.log(`Order with ID ${orderId} was successfully updated.`);
        }
      } catch (error) {
        console.error(`Database Update Error: ${error.message}`);
        return NextResponse.json(
          { error: `Database Update Error: ${error.message}` },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json("ok", { status: 200 });
}
