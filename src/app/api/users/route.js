import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";

const connectDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }
};

export async function GET(req) {
  try {
    await connectDB();
    const isAdminUser = await isAdmin();
    if (isAdminUser) {
      const users = await User.find();
      return NextResponse.json(users);
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  } catch (error) {
    console.error("Error fetching users", error);
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

// Mark the route as dynamic
export const dynamic = "force-dynamic";
