import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  const result = await User.updateOne({ email }, data);
  console.log({ email, update: data });
  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  const user = await User.findOne({ email });

  if (user) {
    return Response.json({
      name: user.name,
      userImage: user.image,
      phoneNumber: user.phoneNumber,
      streetAddress: user.streetAddress,
      city: user.city,
      postalCode: user.postalCode,
      isAdmin: user.admin,
    });
  }

  return Response.json({}, { status: 404 });
}
