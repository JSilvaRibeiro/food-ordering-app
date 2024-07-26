import { Category } from "@/app/models/Category";
import { NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
import { connectDB } from "@/libs/connectDB";

export async function POST(req) {
  try {
    await connectDB();
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const { name } = await req.json();
    const createdCategory = await Category.create({ name });
    return NextResponse.json(createdCategory);
  } catch (error) {
    console.error("Error creating category:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const { _id, name } = await req.json();
    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      { name },
      { new: true }
    );
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error.message);
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
    await Category.deleteOne({ _id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
