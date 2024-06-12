"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import MenuItem from "../components/menu/MenuItem";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    }

    async function fetchMenuItems() {
      const response = await axios.get("/api/menu-items");
      setMenuItems(response.data);
    }

    fetchCategories();
    fetchMenuItems();
  }, []);

  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((category) => (
          <div key={category._id} className="">
            <div className="text-center">
              <SectionHeaders mainHeader={category.name} />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 mb-12 ">
              {menuItems
                .filter((menuItem) => menuItem.category === category._id)
                .map((item) => (
                  <div key={item._id} className="">
                    <MenuItem item={item} />
                  </div>
                ))}
            </div>
          </div>
        ))}
    </section>
  );
};

export default MenuPage;
