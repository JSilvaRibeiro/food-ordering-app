import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const createdMenuItem = await MenuItem.create(data);
    return Response.json(createdMenuItem);
  } catch (error) {
    console.error("Error creating item:", error.message);
    return NextResponse.json(error.message, { status: 500 });
  }
}
