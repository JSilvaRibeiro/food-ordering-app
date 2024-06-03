"use client";
import axios, { Axios } from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import avatarIcon from "../../../public/avatarIcon.jpg";
import UserTabs from "../components/layout/UserTabs";
import UploadImage from "../components/layout/UploadImage";

const ProfilePage = () => {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(avatarIcon);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, session]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/profile");
      const {
        name,
        userImage,
        phoneNumber,
        streetAddress,
        city,
        postalCode,
        isAdmin,
      } = response.data;
      setUserName(name || "");
      setUserImage(userImage || avatarIcon);
      setPhoneNumber(phoneNumber || "");
      setStreetAddress(streetAddress || "");
      setCity(city || "");
      setPostalCode(postalCode || "");
      setIsAdmin(isAdmin || false);
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
        phoneNumber,
        streetAddress,
        city,
        postalCode,
        isAdmin,
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

  if (status === "loading") {
    return "loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-4">
          <div className="p-2 relative max-w-[120px]">
            <UploadImage link={userImage} setLink={setUserImage} />
          </div>
          <form action="" className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>Full Name</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="First and Last Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              id=""
              disabled={true}
              value={session.data.user.email || ""}
            />
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(ev) => setPhoneNumber(ev.target.value)}
            />
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <div className="flex gap-2">
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </div>
            </div>

            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
