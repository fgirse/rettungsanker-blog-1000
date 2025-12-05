"use client";
import Modale01 from "../components/Modale/Modale01";
import Modale02 from "../components/Modale/Modale02";
import Image from "next/image";
import VAG from "../public/Assets/Img/VAGLogo.png";

const Wohin = () => (
  <section
    id="section-wohin"
    className="mb-[4vh] bg-wohin bg-no-repeat w-full h-[130%] text-center text-yellow-500 flex flex-col items-center justify-between"
  >
    <h1 className="mt-[12vh] text-yellow-500 headingA text-[3rem] md:text-[6rem] ">
      Wohin ?
    </h1>
    <div className="flex flex-col justify-center items-center">
      <h1 className="px-5 mb-[3vh] text-[1.33rem] text-white md:w-[33vw] md:text-3xl">
        Sie finden die genaue Lage unseres Rettungsankers in der
        Kartenillustration der Altstadt Freiburg oder ganz profesionelle in
        Open-Street-Map
      </h1>
      <Modale01 />

      <Modale02 />
      <div className="mb-[5vh] w-[66vw]  bg-slate-800/10 rounded-2xl border flex flex-col justify-center items-center lg:flex-row">
        <Image
          className="mt-[5vh]  "
          src={VAG}
          width="200"
          height="160"
          alt="VAG Logo"
        />
        <h1 className="text-orange text-[2rem] ">Haltestelle</h1>

        <p className="text-2xl">Holzmarkt</p>
        <h1 className="text-orange text-[2rem] ">Linie 1, 3 und 5</h1>
      </div>
    </div>
  </section>
);

export default Wohin;
