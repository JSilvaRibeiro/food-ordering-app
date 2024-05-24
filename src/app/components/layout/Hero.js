import Image from "next/legacy/image";
import RightArrow from "../icons/RightArrow";
import InformationIcon from "../icons/InformationIcon";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-bold">
          Everything
          <br /> is better
          <br /> with a&nbsp;<span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500">
          Pizza so good, pizza so yummy. Pizza feel amazing in my tummy!
        </p>
        <div className="flex gap-6 items-center text-base">
          <button className="bg-primary flex gap-2 text-white py-2 px-6 items-center rounded-full">
            Order&nbsp;now
            <RightArrow />
          </button>
          <button className="flex gap-2 text-gray-700 font-semibold items-center">
            Learn&nbsp;more
            <InformationIcon />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/pizza.png"
          objectFit="contain"
          layout="fill"
          alt="pizza"
          priority
        />
      </div>
    </section>
  );
}
