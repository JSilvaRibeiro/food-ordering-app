import { MenuItem } from "@/app/models/MenuItem";
import { NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
import { connectDB } from "@/libs/connectDB";

export async function POST(req) {
  try {
    await connectDB();
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const data = await req.json();
    const createdMenuItem = await MenuItem.create(data);
    return NextResponse.json(createdMenuItem);
  } catch (error) {
    console.error("Error creating item:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const { _id, ...data } = await req.json();
    const updatedItem = await MenuItem.findByIdAndUpdate(_id, data, {
      new: true,
    });
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const items = await MenuItem.find();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const _id = req.nextUrl.searchParams.get("_id");
    await MenuItem.deleteOne({ _id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting menu item:", error.message);
    return NextResponse.json(
      { error: "Error deleting menu item" },
      { status: 500 }
    );
  }
}
