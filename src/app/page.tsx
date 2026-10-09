// src/app/page.tsx

import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/content-sections/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
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
