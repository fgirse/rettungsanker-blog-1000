
import Hero from "@/components/Hero";
import About from "@/components/About";
import Bento from "@/components/Bento";
import World from "@/components/World";
import Sportarena from "@/components/Sportarena";
import Team from "@/components/Team";
import Wohin from "@/components/Wohin";

// Mark this page as dynamic since it may fetch data
export const dynamic = 'force-dynamic';


export default function Home() {
  return (
    <div className=" bg-black flex flex-col min-h-screen items-center justify-center  font-sans dark:bg-black">
      <Hero />
      <About />
      <Bento />
      <World />
      <Sportarena />
      <Team />
      <Wohin />
    </div>
  );
}
