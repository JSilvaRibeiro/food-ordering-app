import { Category } from "@/app/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { name } = await req.json();
  const createdCategory = await Category.create({ name });
  return Response.json(createdCategory);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(await Category.find());
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name } = await req.json();
  const updatedCategory = await Category.updateOne({ _id }, { name });
  console.log(updatedCategory);
  return Response.json(true);
}
