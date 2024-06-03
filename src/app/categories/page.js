"use client";

import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import axios from "axios";
import { redirect } from "next/navigation";
import UseProfile from "../components/UseProfile";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const { loading, data } = UseProfile();
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

  //loads all existing categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategoryList(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  //Handles creating or updating category
  const handleCategorySubmit = async (ev) => {
    ev.preventDefault();
    const saveCategory = async () => {
      try {
        let response;
        if (editCategory) {
          response = await axios.put("/api/categories", {
            _id: editCategory._id,
            name: categoryName,
          });
          setEditCategory(null);
        } else {
          response = await axios.post("/api/categories", {
            name: categoryName,
          });
        }

        if (response.status === 200 || response.status === 201) {
          setCategoryName(""); // Clear the input field after successful submission
          fetchCategories(); // Refresh the category list
        }
      } catch (error) {
        throw error; // Re-throw the error to be caught by toast.promise
      }
    };
    toast.promise(saveCategory(), {
      loading: editCategory ? "Updating category..." : "Creating category...",
      success: editCategory
        ? "Category updated successfully!"
        : "Category created successfully!",
      error: editCategory
        ? "Error updating category"
        : "Error creating category",
    });
  };

  if (loading) {
    return "Loading...";
  }

  if (!data) {
    return "not an admin";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 justify-center items-center">
          <div className="grow">
            <label>
              {editCategory ? (
                <>
                  Edit Category:{" "}
                  <span className="font-extrabold">{editCategory.name}</span>
                </>
              ) : (
                "New Category Name"
              )}
            </label>
            <input
              type="text"
              name=""
              id=""
              value={categoryName}
              onChange={(ev) => {
                setCategoryName(ev.target.value);
              }}
            />
          </div>
          <div className="pt-3">
            <button type="submit">{editCategory ? "Update" : "Create"}</button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit Categories:</h2>
        {categoryList?.length > 0 &&
          categoryList.map((category) => (
            <button
              onClick={() => {
                setEditCategory(category);
                setCategoryName(category.name);
              }}
              key={category.name}
              className="bg-gray-200 rounded-xl p-2 px-4 flex mb-1"
            >
              <span>{category.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
