import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { Order } from "@/app/models/Order";

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  if (_id) {
    const order = await Order.findById(_id);
    return NextResponse.json(order);
  }

  if (admin) {
    const orders = await Order.find();
    return NextResponse.json(orders);
  }

  if (userEmail) {
    const userOrders = await Order.find({ userEmail });
    return NextResponse.json(userOrders);
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
