"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const session = useSession();
  const { status } = session;
  const [infoUpdated, setInfoUpdated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name || "");
    }
  }, [status, session]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setInfoUpdated(false);
    const response = await axios.put("/api/profile", { name: userName });
    if (response.ok) {
      setInfoUpdated(true);
    }
  }

  function handleFileChange(ev) {
    console.log(ev);
  }

  if (status === "loading") {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session.data.user.image;
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl font-semibold mb-6">
        Profile
      </h1>

      <div className="max-w-md mx-auto ">
        {infoUpdated && (
          <div className="text-center bg-green-200 rounded-md mx-auto px-4 py-2">
            User info updated!
          </div>
        )}

        <div className="flex gap-4 items-center">
          <div className="p-2 relative">
            <Image
              className="rounded-full w-full h-full mb-1"
              src={userImage}
              width={200}
              height={200}
              alt="avatar"
            />
            <label>
              <input
                type="file"
                name=""
                id=""
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="block border border-gray-300 rounded-lg text-center cursor-pointer">
                Edit
              </span>
            </label>
          </div>
          <form action="" className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              name=""
              id=""
              placeholder="First and Last Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input
              type="email"
              name="email"
              id=""
              disabled={true}
              value={session.data.user.email}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
