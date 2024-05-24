"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [registerError, setRegisterError] = useState(true);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    try {
      const response = await axios.post("/api/register", {
        email,
        password,
      });
      console.log("User registered successfully:", response.data);
      setCreatingUser(false);
      setUserCreated(true);
    } catch (error) {
      console.error("Error registering user:", error);
      setRegisterError(true);
    }
  }

  return (
    <>
      <section className="mt-8">
        <h1 className="text-center text-primary text-4xl font-semibold mb-6">
          Register
        </h1>
        {userCreated && (
          <div className="text-center bg-green-200 rounded-md w-fit mx-auto mb-4 px-4 py-2">
            Account created. Please{" "}
            <Link className="font-semibold underline" href={"/login"}>
              login
            </Link>{" "}
            to your account.
          </div>
        )}
        {registerError && (
          <div className="text-center bg-red-200 rounded-md w-fit mx-auto mb-4 px-4 py-2">
            Error. Please try again later.
          </div>
        )}
        <form
          className="block max-w-xs mx-auto"
          onSubmit={handleFormSubmit}
          action=""
          method="post"
        >
          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            value={email}
            disabled={creatingUser}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            value={password}
            disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="mt-6" type="submit" disabled={creatingUser}>
            Register
          </button>
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
        </form>
      </section>
    </>
  );
}
