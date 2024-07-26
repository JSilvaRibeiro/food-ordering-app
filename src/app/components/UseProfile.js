import axios from "axios";
import React, { useEffect, useState } from "react";

const UseProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/profile");
      if (response.status === 200) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("User not logged in.");
        setData(null);
      } else {
        console.error("Error fetching user data:", error);
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, data };
};

export default UseProfile;
