"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);
    setRegisterError(false);
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      console.log("User registered successfully:", response.data);
      setUserCreated(true);
    } catch (error) {
      console.error("Error registering user:", error);
      setRegisterError(true);
    }
    setCreatingUser(false);
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
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            disabled={creatingUser}
            onChange={(ev) => setName(ev.target.value)}
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            disabled={creatingUser}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="mt-6" type="submit" disabled={creatingUser}>
            Register
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
            Existing account?{" "}
            <Link className="font-medium underline" href={"/login"}>
              Login here
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
