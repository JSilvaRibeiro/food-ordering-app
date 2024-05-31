"use client";

import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import axios from "axios";
import { redirect } from "next/navigation";
import UseProfile from "../components/UseProfile";

const CategoriesPage = () => {
  const { loading, data } = UseProfile();

  if (loading) {
    return "Loading...";
  }

  if (!data) {
    return "not an admin";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8">
        <div className="flex gap-2 justify-center items-center">
          <div className="grow">
            <label>New category name</label>
            <input type="text" name="" id="" />
          </div>
          <div className="pt-3">
            <button type="submit">Create</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CategoriesPage;
