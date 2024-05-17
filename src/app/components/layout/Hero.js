import Image from "next/image";
import RightArrow from "../icons/RightArrow";
import InformationIcon from "../icons/InformationIcon";

export default function Hero() {
  return (
    <section className="hero">
      <div className="py-12">
        <h1 className="text-4xl font-bold">Everything is better with Pizza</h1>
        <p className="my-4 text-gray-500">
          Pizza so good, pizza so yummy. Pizza feel amazing in my tummy!
        </p>
        <div className="flex gap-6 items-center text-base">
          <button className="bg-primary flex gap-2 text-white py-2 px-6 items-center rounded-full">
            Order now
            <RightArrow />
          </button>
          <button className="flex gap-2 text-gray-700 font-semibold items-center">
            Learn more
            <InformationIcon />
          </button>
        </div>
      </div>
      <div className="relative w-full h-[500px]">
        <Image
          src={"/pizza.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt="pizza"
        />
      </div>
    </section>
  );
}
