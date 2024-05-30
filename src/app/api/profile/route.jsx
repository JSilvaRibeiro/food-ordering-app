import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  const update = {};

  if ("name" in data) {
    update.name = data.name;
  }

  if ("image" in data) {
    update.image = data.image;
  }

  if (Object.keys(update).length > 0) {
    const result = await User.updateOne({ email }, update);
    console.log({ email, update: { name: data.name } });
  }
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
      image: user.image,
    });
  }

  return Response.json({}, { status: 404 });
}
