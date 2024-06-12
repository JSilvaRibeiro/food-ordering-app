"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CartContext } from "../AppContext";
import { useContext } from "react";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const userName = userData?.name || userData?.email;

  const { cartProducts } = useContext(CartContext);
  return (
    <>
      <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-extrabold text-4xl" href="/">
            JK Pizza
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          {status === "authenticated" && (
            <>
              <Link className="whitespace-nowrap" href={"/profile"}>
                Hello, {userName.split(" ")[0]}
              </Link>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  redirect("/login");
                }}
                className="bg-primary rounded-full px-8 py-2 text-white"
              >
                Logout
              </button>
            </>
          )}
          {status !== "authenticated" && (
            <>
              <Link href={"/login"}>Login</Link>
              <Link
                href={"/register"}
                className="bg-primary rounded-full px-8 py-2 text-white"
              >
                Register
              </Link>
            </>
          )}
          <Link href={"#"}>Cart ({cartProducts.length})</Link>
        </nav>
      </header>
    </>
  );
}
