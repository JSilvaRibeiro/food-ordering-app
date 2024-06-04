import { Category } from "@/app/models/Category";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const { name } = await req.json();
  const createdCategory = await Category.create({ name });
  return NextResponse.json(createdCategory);
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);
  return NextResponse.json(await Category.find());
}

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const { _id, name } = await req.json();
  const updatedCategory = await Category.updateOne({ _id }, { name });
  console.log(updatedCategory);
  return NextResponse.json(true);
}
