"use client";
import Image from "next/legacy/image";
import React, { useEffect } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import axios from "axios";

export default function HomeMenu() {
  useEffect(() => {
    async function fetchMenuItems() {
      const response = await axios.get("/api/menu-items");

      const latestMenuItems = response.data.slice(-3);
      console.log(latestMenuItems);
    }

    fetchMenuItems();
  }, []);
  return (
    <section>
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[50px] text-left -z-10">
          <Image
            src={"/salad1.png"}
            width={109}
            height={189}
            alt="Picture of salad"
          />
        </div>
        <div className="absolute -top-[65px] right-0 -z-10">
          <Image
            src={"/salad2.png"}
            width={107}
            height={195}
            alt="Picture of salad"
          />
        </div>
      </div>
      <div className="text-center">
        <SectionHeaders
          subHeader={"check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 my-4  mx-auto">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}
