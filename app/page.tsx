
import Hero from "@/components/Hero";
import About from "@/components/About";
import Bento from "@/components/Bento";
import Event from "@/components/Event";
import Sportarena from "@/components/Sportarena";
import Team from "@/components/Team";
import Wohin from "@/components/Wohin";
import GridLayout from "@/components/GridLayout";
import PhotoGallery from "@/components/PhotoGallery";

// Mark this page as dynamic since it may fetch data
export const dynamic = 'force-dynamic';


export default function Home() {
  return (
    <div className=" bg-black flex flex-col min-h-screen items-center font-sans dark:bg-black">
      <Hero />
      <About />
      <GridLayout />
      <PhotoGallery />
      <Event />
      <Sportarena />
      <Team />
      <Wohin />
    </div>
  );
}
