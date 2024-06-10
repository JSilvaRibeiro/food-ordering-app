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
      setData(response.data.admin);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setData(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data };
};

export default UseProfile;
