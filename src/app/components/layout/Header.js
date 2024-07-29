"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CartContext } from "../AppContext";
import { useContext, useState } from "react";
import CartIcon from "../icons/CartIcon";
import { useRouter } from "next/navigation";
import MenuBarIcon from "../icons/MenuBarIcon";

function AuthLinks({ status, userName, logOut }) {
  if (status === "authenticated") {
    return (
      <>
        <Link className="whitespace-nowrap" href={"/profile"}>
          Hello, {userName.split(" ")[0]}
        </Link>
        <button
          type="button"
          onClick={logOut}
          className="bg-primary hover:bg-red-400 hover:border-red-400 rounded-full px-8 py-2 text-white"
        >
          Logout
        </button>
      </>
    );
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Link href={"/login"}>Login</Link>
        <Link
          href={"/register"}
          className="bg-primary rounded-full px-8 py-2 text-white"
        >
          Register
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const userName = userData?.name || userData?.email;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { cartProducts } = useContext(CartContext);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };
  return (
    <>
      <header className="">
        <div className="flex items-center justify-between md:hidden">
          <Link className="text-primary font-extrabold text-4xl" href="/">
            JK Pizza
          </Link>
          <div className="flex gap-6 items-center">
            <Link href={"/cart"} className="relative">
              <CartIcon />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-sm p-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button
              className="p-0 border-hidden hover:cursor-pointer"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <MenuBarIcon />
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
          >
            <Link className="hover:underline" href={"/"}>
              Home
            </Link>
            <Link className="hover:underline" href={"/menu"}>
              Menu
            </Link>
            <Link className="hover:underline" href={"/#about"}>
              About
            </Link>
            <Link className="hover:underline" href={"/#contact"}>
              Contact
            </Link>
            <AuthLinks
              status={status}
              userName={userName}
              logOut={handleLogout}
            />
          </div>
        )}

        <div className="hidden md:flex items-center justify-between">
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
            <AuthLinks
              status={status}
              userName={userName}
              logOut={handleLogout}
            />

            <Link href={"/cart"} className="relative">
              <CartIcon />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-sm p-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
