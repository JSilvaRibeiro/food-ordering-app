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
import UserInfoForm from "../components/layout/UserInfoForm";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);

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
  }, [status]);

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
      setUserInfo(response.data);
      // setUserName(name || "");
      // setUserImage(userImage || avatarIcon);
      // setPhoneNumber(phoneNumber || "");
      // setStreetAddress(streetAddress || "");
      // setCity(city || "");
      // setPostalCode(postalCode || "");
      setIsAdmin(isAdmin || false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  //Handles user profile save
  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    const saveProfile = async () => {
      try {
        const response = await axios.put("/api/profile", {
          name: userName,
          image: userImage,
          phoneNumber,
          streetAddress,
          city,
          postalCode,
          isAdmin,
        });
        if (response.status === 200) {
          fetchUserData();
        }
      } catch (error) {
        throw error;
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
      <div className="max-w-2xl mx-auto mt-8">
        <UserInfoForm user={userInfo} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
};

export default ProfilePage;
