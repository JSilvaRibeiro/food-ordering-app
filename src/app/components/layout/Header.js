"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CartContext } from "../AppContext";
import { useContext } from "react";
import CartIcon from "../icons/CartIcon";
import { useRouter } from "next/navigation";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const userName = userData?.name || userData?.email;

  const { cartProducts } = useContext(CartContext);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };
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
                onClick={handleLogout}
                className="bg-primary hover:bg-red-400 hover:border-red-400 rounded-full px-8 py-2 text-white"
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
          <Link href={"/cart"} className="relative">
            <CartIcon />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-sm p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </header>
    </>
  );
}
