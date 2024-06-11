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
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  console.log(data);

  return { loading, data };
};

export default UseProfile;
