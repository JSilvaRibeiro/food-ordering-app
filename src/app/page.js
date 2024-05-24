import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About Us"} />
        <div className="max-w-md mx-auto mt-4 text-gray-600 space-y-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            veniam officiis, beatae sunt id minima placeat deserunt quos ex
            consectetur eius. Mollitia, hic at ut labore laudantium quo cumque
            necessitatibus?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
            corporis quas magni deleniti amet quidem assumenda, quasi, quisquam
            officia perspiciatis officiis dolor atque nesciunt ullam voluptatum
            itaque? Omnis, sunt eum?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
            corporis commodi ipsam quasi, animi id, obcaecati, doloremque nulla
            fuga iusto odit consectetur cum voluptatem. Consequatur est rem
            libero omnis perferendis.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-6">
          <a className="text-4xl underline" href="tel:+19541234567">
            +1 (954) 123-4567
          </a>
        </div>
      </section>
    </>
  );
}
