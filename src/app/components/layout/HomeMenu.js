import Image from "next/legacy/image";
import React from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
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
        <SectionHeaders subHeader={"check out"} mainHeader={"Menu"} />
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
