"use client";
import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import UseProfile from "../components/UseProfile";
import axios from "axios";
import Link from "next/link";

const UsersPage = () => {
  const { loading, data } = UseProfile();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUserList(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  if (loading) {
    return "Loading...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {userList?.length > 0 &&
          userList.map((user) => (
            <div
              className="bg-gray-100 rounded-lg mb-2 p-2 px-4 flex gap-2 items-center justify-between"
              key={user._id}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <span className="text-gray-700 font-semibold">{user.name}</span>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link
                  href={"/users/" + user._id}
                  className="button hover:bg-gray-300"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UsersPage;
