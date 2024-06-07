import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const createdMenuItem = await MenuItem.create(data);
    return NextResponse.json(createdMenuItem);
  } catch (error) {
    console.error("Error creating item:", error.message);
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { _id, ...data } = await req.json();
    const updatedItem = await MenuItem.findByIdAndUpdate(_id, data);
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error.message);
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    return NextResponse.json(await MenuItem.find());
  } catch (error) {}
}

export async function DELETE(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const _id = req.nextUrl.searchParams.get("_id");
    await MenuItem.deleteOne({ _id });
    return NextResponse.json(true);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json(
      { error: "Error deleting menu item" },
      { status: 500 }
    );
  }
}
