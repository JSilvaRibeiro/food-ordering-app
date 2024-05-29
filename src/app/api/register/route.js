import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Function to handle database connection
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection error:", error);
      throw new Error("Database connection failed");
    }
  }
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validate the received fields
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    await connectDB();

    // The password validation is handled in the User schema
    const createdUser = await User.create({
      name,
      email,
      password,
    });
    return NextResponse.json(createdUser);
  } catch (error) {
    console.error("Error creating user:", error.message);
    return NextResponse.json(error.message, { status: 500 });
  }
}

//food-ordering-app
//t683tmrvEE5sVPpv
