"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

const ProfilePage = () => {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, session]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/profile");
      const { name, image } = response.data;
      setUserName(name);
      setUserImage(image);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  //Handles user profile save
  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    const saveProfile = async () => {
      const response = await axios.put("/api/profile", {
        name: userName,
        image: userImage,
      });
      if (response.statusText === "OK") {
        fetchUserData();
      }
    };
    toast.promise(saveProfile(), {
      loading: "Saving...",
      success: <b>Profile saved!</b>,
      error: <b>Could not save profile.</b>,
    });
  }

  //Handles user profile image upload
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = async () => {
        const response = await axios.post("/api/upload", data);
        const link = response.data;
        setUserImage(link);
      };

      toast.promise(uploadPromise(), {
        loading: "Uploading...",
        success: <b>Image uploaded successfully!</b>,
        error: <b>Could not upload image.</b>,
      });
    }
  }

  if (status === "loading") {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl font-semibold mb-6">
        Profile
      </h1>

      <div className="max-w-md mx-auto ">
        {/* {isSaving && <LoadingMessage>Saving...</LoadingMessage>}
        {infoUpdated && <SuccessMessage>User info updated!</SuccessMessage>} */}

        <div className="flex gap-4 items-center">
          <div className="p-2 relative max-w-[120px]">
            {userImage && (
              <Image
                className="rounded-full w-full h-full mb-1"
                src={userImage}
                width={200}
                height={200}
                alt="avatar"
              />
            )}

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
