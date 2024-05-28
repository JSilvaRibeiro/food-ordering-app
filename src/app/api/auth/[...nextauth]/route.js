import { User } from "@/app/models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

const handler = NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        const email = credentials?.username; // match the field name used in signIn
        const password = credentials?.password;

        await mongoose.connect(process.env.MONGO_URL);

        const user = await User.findOne({ email });

        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
  // session: {
  //   strategy: "jwt",
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
});

export { handler as GET, handler as POST };

// MONGO_URL="mongodb+srv://food-ordering-app:t683tmrvEE5sVPpv@cluster0.gnieq35.mongodb.net/food-ordering-app"
// NEXTAUTH_URL="http://localhost:3000/"
// SECRET="adlkfasdkfljakjfaldskfaj"
// GOOGLE_CLIENT_ID="621525719284-2iklpv51jjusvquipgi8bbtscc3i8dka.apps.googleusercontent.com"
// GOOGLE_CLIENT_SECRET="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"