// src/app/page.tsx

import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/content-sections/Hero";
import Story from "@/components/content-sections/Story";
import MenuShowcase from "@/components/content-sections/MenuShowcase";
import Gallery from "@/components/content-sections/Gallery";
import Reservation from "@/components/content-sections/Reservation";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Story />
      <MenuShowcase />
      <Gallery />
      <Reservation />
      {/* <div className="h-[3000px] flex flex-col">
        <img
          src="https://cdn.pixabay.com/photo/2020/06/30/15/03/table-5356682_1280.jpg"
          alt=""
        />
        <h1 className="text-white self-center text-5xl">Test Heading</h1>
      </div> */}
    </>
  );
}
