import Image from "next/image";
import RightArrow from "../icons/RightArrow";
import InformationIcon from "../icons/InformationIcon";

export default function Hero() {
  return (
    <section className="hero">
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
            Order now
            <RightArrow />
          </button>
          <button className="flex gap-2 text-gray-700 font-semibold items-center">
            Learn more
            <InformationIcon />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/pizza.png"
          fill
          style={{
            objectFit: "contain",
            minWidth: "300px",
            minHeight: "200px",
          }}
          alt="pizza"
          priority // Use this if the image is above the fold
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes, adjust based on actual usage
        />
      </div>
    </section>
  );
}
