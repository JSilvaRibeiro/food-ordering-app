"use client";

import UseProfile from "@/app/components/UseProfile";
import UserInfoForm from "@/app/components/layout/UserInfoForm";
import UserTabs from "@/app/components/layout/UserTabs";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

const EditUserPage = () => {
  const { loading, data } = UseProfile();
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [redirectToUsers, setRedirectToUsers] = useState(false);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await axios.get("/api/users");

      const users = response.data;
      const user = users.find((i) => i._id === id);

      setUserInfo(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  async function handleUserSaveClick(ev, data) {
    ev.preventDefault();
    async function saveUserInfo() {
      try {
        let { image, ...otherUserData } = data;
        image = typeof image === "string" ? image : image.src;
        const updatedData = { image, ...otherUserData };
        const response = await axios.put("/api/profile", updatedData);

        if (response.status === 200) {
          fetchUserInfo();
          setRedirectToUsers(true);
        }
      } catch (error) {
        console.error("Error saving user info:", error);
        throw error;
      }
    }

    toast.promise(saveUserInfo(), {
      loading: "Updating user info...",
      success: "User info updated successfully!",
      error: "Error",
    });
  }

  if (redirectToUsers) {
    return redirect("/users");
  }

  if (loading) {
    return "Loading...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserInfoForm user={userInfo} onSave={handleUserSaveClick} />
      </div>
    </section>
  );
};

export default EditUserPage;
