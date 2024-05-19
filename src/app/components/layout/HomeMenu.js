import Image from "next/image";
import React from "react";

export default function HomeMenu() {
  return (
    <section>
      <div>
        <div className="h-4 relative">
          <Image
            src={"/salad1.png"}
            objectFit="contain"
            layout="fill"
            alt="Picture of salad"
          />
        </div>
      </div>
      <div className="text-center">
        <h3 className="uppercase text-gray-500 font-semibold">Check out</h3>
        <h2 className="text-primary font-bold text-4xl">Menu</h2>
      </div>
    </section>
  );
}
