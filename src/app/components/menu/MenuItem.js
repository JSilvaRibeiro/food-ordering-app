import React from "react";
import Image from "next/image";

export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/50 transition-all cursor-pointer">
      <div className="text-center">
        <Image
          alt="Pizza"
          className="mx-auto"
          src={"/pizza.png"}
          width={100}
          height={100}
        />
      </div>

      <h4 className="font-semibold text-xl mb-2">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis rerum
        dolorem optio sunt debitis,
      </p>
      <button className="bg-primary text-white rounded-full mt-2 px-6 py-2">
        Add to cart $12
      </button>
    </div>
  );
}
