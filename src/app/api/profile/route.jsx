import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const email = session.user.email;

    const result = await User.updateOne({ email }, data);
    console.log({ email, update: data });
    return NextResponse.json(true);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const email = session.user.email;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({
        name: user.name,
        email: user.email,
        image: user.image,
        phoneNumber: user.phoneNumber,
        streetAddress: user.streetAddress,
        city: user.city,
        postalCode: user.postalCode,
        admin: user.admin,
      });
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
