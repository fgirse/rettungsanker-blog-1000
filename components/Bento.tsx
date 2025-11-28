"use client";

import Image from "next/image";
import LogoNeu from "@/public/Assets/Img/LogoNeu.png";
import Astra from "@/public/Assets/Img/astraglaswbg.png";
import HeroImage from "@/public/Assets/Img/Hero.png";
import LogoAlt from "@/public/Assets/Img/LogoAlt.png";
import Wine from "@/public/Assets/Img/bottles03.png";
import Cocktail from "@/public/Assets/Svg/Cocktailglas.svg";
import Football from "@/public/Assets/Svg/Fussball.svg";
import Crowdparty from "@/public/Assets/Img/Crowdparty.png";
import HansAlbers from "@/public/Assets/Img/albers.jpg";

export default function Bento() {
  return (
    <>
      <div className="flex flex-col items-center justify-center relative top-[2vh]">
        <Image
          src={HeroImage}
          alt="Hero Image"
          width={1900}
          height={600}
          className="border-2 border-amber-50 shadow-lg shadow-stone-300 w-2/3 h-auto object-cover"
        />
      </div>
      <h1 className="relative top-[5vh] text-center text-[3.2rem] lg:text-[6vw] lg: leading-12 headingA text-yellow-600">
        gastlichkeit ist unsere philosophie
      </h1>
      <section className="mt-12 rounded-xl py-20 w-[90vw] flex flex-col items-center justify-center">
        {/* Gridcontainer Start */}
        <div className=" bg-slate-800 grid grid-cols-3 md:grid-cols-7 grid-rows-20 md:grid-rows-11 gap-2 md:gap-2 m-4">
          <div className="col-start-1 row-start-1 col-span-3 md:col-start-1 md:row-start-1 md:col-span-4 md:row-span-2 bg-slate-900 rounded-md p-10">
            <h1 className="text-center text-5xl text-gray-800 font-bold headingA lg:leading-[8vh] lg:text-[10vh]">
              angebot <br /> und <br /> service
            </h1>
          </div>
          <div className="col-start-1 row-start-2 col-span-3 md:col-start-5 md:row-start-1 md:col-span-3 md:row-span-2 bg-slate-900 rounded-md p-10">
            <div className="flex flex-col items-center justify-center h-full">
              <Image
                src={LogoNeu}
                alt="Logo Rettungsanker"
                width={350}
                height={200}
                className="object-contain"
              />
            </div>
          </div>
          <div className="col-start-1 row-start-3 col-span-3 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-3 bg-red-900/70 rounded-md p-10">
            <div className="lg:transform lg:scale-150 w-full h-full lg:flex lg:flex-col lg:items-center lg:justify-center">
              <Image
                src={Astra}
                alt="Astra Bier"
                width={350}
                height={500}
                className="mx-auto"
              />
            </div>
          </div>
          <div className="col-start-1 row-start-4 col-span-3 md:col-start-2 md:row-start-3 md:col-span-2 md:row-span-3 bg-red-900/70 rounded-md p-10">
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="headingA text-center text-3xl text-yellow-600 lg:text-4xl">
                bier vom Fass
              </h1>
              <p className="text-white text-center text-xl mt-4">
                Flensburger Pils, das Kühle blonde von der Waterkant - Astra
                dasKultbier natürlich direkt vom Kiez
              </p>
            </div>
          </div>
          <div className="col-start-1 row-start-5 col-span-3 md:col-start-4 md:row-start-3 md:col-span-2 md:row-span-2 bg-slate-900 rounded-md p-10">
            <div className="w-full h-full lg:flex lg:flex-col lg:items-center lg:justify-center lg:transform lg:scale-110">
              <Image
                src={Wine}
                alt="Illustration Weinflaschen"
                width={350}
                height={500}
                className="mx-auto"
              />
            </div>
          </div>
          <div className="col-start-1 row-start-6 col-span-3 md:col-start-6 md:row-start-3 md:col-span-2 md:row-span-3 bg-slate-900 rounded-md p-10">
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="headingA text-center text-3xl text-yellow-600 lg:text-4xl">
                regionale weine
              </h1>
              <p className="text-white text-center text-xl mt-4">
                Qualitativ hochwertige Weine aus der Region Kaiserstuhl und dem
                Markgräflerland. Hauslieferant Weingut Heinemann Scherzingen
              </p>
            </div>
          </div>
          <div className="col-start-1 row-start-7 col-span-3 md:col-start-1 md:row-start-6 md:col-span-1 md:row-span-3 bg-slate-900 rounded-md p-10">
            <div className="w-full h-full lg:flex lg:flex-col lg:items-center lg:justify-center lg:transform lg:scale-150">
              <Image
                src="/Assets/Svg/Cocktailglas.svg"
                alt="Illustration Cocktail"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
          </div>
          <div className="col-start-1 row-start-8 col-span-3 md:col-start-2 md:row-start-6 md:col-span-2 md:row-span-3 bg-slate-900 rounded-md p-10">
            <h1 className="headingA text-center text-3xl text-yellow-600 lg:text-4xl">
              cocktails & longdrinks
            </h1>
            <p className="text-white text-center text-xl mt-4">
              Zahlreiche internationale Longdrinks und Cocktails - alles was das
              Herz begehrt. Zahlreiche &quot;Kurze&quot; für jeden Geschmack.
            </p>
          </div>
          <div className="col-start-1 row-start-9 col-span-3 md:col-start-4 md:row-start-6 md:col-span-2 md:row-span-3 bg-red-900/70 rounded-md p-10">
            <div className="w-full h-full lg:flex lg:flex-col lg:items-center lg:justify-center lg:transform lg:scale-150">
              <Image
                src="/Assets/Svg/Fussball.svg"
                alt="Illustration Fussball"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
          </div>
          <div className="col-start-1 row-start-10 col-span-3 md:col-start-6 md:row-start-6 md:col-span-2 md:row-span-3 bg-red-900/70 rounded-md p-10">
            <h1 className="headingA text-center text-3xl text-yellow-600 lg:text-4xl">
              live tv bundesliga
            </h1>
            <p className="text-white text-center text-xl mt-4">
              Jeden Samstag-Spieltag der laufenden Bundesliga-Saison Live TV
              Event in unserer Sportarena natürlich mit Schwerpunkt unseres SC
              Freiburgs. Wann immer möglich auch Spiele der Champions League und
              natürlich der grossen Turniere von EM und WM. Bei Topspielen des
              SC Freiburg mit grosser Publikumsnachfrage sind Reservierungen
              über unser Booking-Tool zu empfehlen - Unten folgender Button und
              Du bist direkt dabei !
            </p>
          </div>
          <div className="col-start-1 row-start-11 col-span-3 md:col-start-1 md:row-start-9 md:col-span-2 md:row-span-3 bg-slate-900 rounded-md p-10">
            <div className="w-full h-full lg:flex lg:flex-col lg:items-center lg:justify-center">
              <Image
                src={Crowdparty}
                alt="Illustration Crowd Party"
                width={350}
                height={500}
                className="mx-auto"
              />
            </div>
          </div>
          <div className="col-start-1 row-start-12 col-span-3 md:col-start-3 md:row-start-9 md:col-span-2 md:row-span-3 bg-slate-900 rounded-md p-10">
            <h1 className="headingA text-center text-3xl text-yellow-600 lg:text-4xl">
              Event oder Party?
            </h1>
            <p className="text-white text-center text-xl mt-4">
              Der Rettungsanker ist die ideale Location für Ihren privaten oder
              Business Event. Im Rahmen einer &quot;geschlossenen
              Gesellschaft&quot; stehen Ihnen die Räumlichkeiten des
              Rettungsankers zur Verfügung. Auf Wunsch Catering durch unseren
              Kooperationspartner möglich ! Sprechen Sie uns an oder
              kontaktieren Sie uns per e.mail.
            </p>
          </div>
          <div className="col-start-1 row-start-13 col-span-3 md:col-start-5 md:row-start-9 md:col-span-1 md:row-span-2 bg-slate-900 rounded-md p-10">
            <div className="w-full h-full lg:flex lg:flex-col lg:items-center lg:justify-center lg:transform lg:scale-150">
              <div>
                <Image
                  src={HansAlbers}
                  alt="Illustration Hans Albers"
                  width={350}
                  height={500}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
          <div className="col-start-1 row-start-14 col-span-3 md:col-start-6 md:row-start-9 md:col-span-2 md:row-span-3 bg-slate-900 rounded-md p-10">
            <h1 className="headingA text-center text-3xl text-yellow-600 lg:text-4xl">
              hans albers
            </h1>
            <p className="text-white text-center text-xl mt-4">
              Hans Phillip August Albers (* 22.September 1891 in Hamburg , 24.
              Juli 1960 in Berg, Bayern) war ein deutscher Schauspieler und
              Sänger, der als &quot;blonder Hans&quot; Volkssidol wurde. Zu den
              bekanntesten Spielfilmen in denen er mitwirkte gehören &quot;der
              Mann, der Sherlock Holmes war&quot; (1937),
              &quot;Münchhausen&quot; (1943), &quot;die grosse Freiheit
              Nr.7&quot; (1943) sowie &quot;Auf fer Reeperbahn Nachts um halb
              eins&quot;
            </p>
          </div>
          {/*<div className="col-start-1 row-start-15 col-span-3 md:hidden bg-slate-900 rounded-md p-10">
            14
          </div>
          <div className="col-start-1 row-start-16 col-span-3 md:hidden bg-slate-900 rounded-md p-10">
            15
          </div>
          <div className="col-start-1 row-start-17 col-span-3 md:hidden bg-slate-900 rounded-md p-10">
            16
          </div>
          <div className="col-start-1 row-start-18 col-span-3 md:hidden bg-slate-900 rounded-md p-10">
            17
          </div>
          <div className="col-start-1 row-start-19 col-span-3 md:hidden bg-slate-900 rounded-md p-10">
            18
          </div>
          <div className="col-start-1 row-start-20 col-span-3 md:hidden bg-slate-900 rounded-md p-10">
            19
          </div>*/}
        </div>
      </section>
    </>
  );
}
