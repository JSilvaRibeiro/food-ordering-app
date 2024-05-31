import axios from "axios";
import React, { useEffect, useState } from "react";

const UseProfile = () => {
  const [data, setData] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/profile");
      setData(response.data.isAdmin);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return { loading, data };
};

export default UseProfile;
