"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";
import UseProfile from "../components/UseProfile";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoggingIn(true);

    await signIn("credentials", {
      username: email,
      password,
      callbackUrl: "/",
    });
    setLoggingIn(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl font-semibold mb-6">
        Login
      </h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          id=""
          placeholder="Email"
          value={email}
          disabled={loggingIn}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Password"
          value={password}
          disabled={loggingIn}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="mt-6" type="submit" disabled={loggingIn}>
          Login
        </button>
        <div className="text-center my-4 text-gray-500">or</div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image
            src="/googleIcon.png"
            alt="Google Icon"
            width={20}
            height={20}
          />
          Login with Google
        </button>
        <div className="text-center mt-4 text-gray-600 border-t pt-4">
          Don&apos;t have an account?{" "}
          <Link className="font-medium underline" href={"/register"}>
            Register here
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
