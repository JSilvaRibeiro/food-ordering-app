"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl font-semibold mb-6">
        Login
      </h1>
      <form action="" className="block max-w-xs mx-auto">
        <input
          type="email"
          name=""
          id=""
          placeholder="Email"
          value={email}
          disabled={false}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="Password"
          value={password}
          disabled={false}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">Login</button>
        <div className="text-center my-4 text-gray-500">or</div>
        <button className="flex gap-4 justify-center">
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
