"use client"

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin, FiTwitter } from "react-icons/fi";
import { SiGithub, SiTiktok, SiYoutube } from "react-icons/si";
import Image from "next/image";
import LogoAlt from "@/public/Assets/Img/LogoAlt.png";
import Flens from "@/public/Assets/Img/frisch-gezapftes-flens.webp";
import Wine from "@/public/Assets/Img/bottles03.png";
import Cocktail from "@/public/Assets/Svg/Cocktailglas.svg";
import Event from "@/public/Assets/Img/Crowdparty.png";
import HansAlbers  from "@/public/Assets/Img/Albers_Illu_white.png"
import Fussball from"@/public/Assets/Svg/Fussball.svg";



export default function RevealBento() {
  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-12 text-zinc-50">
      <Logo />
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeroBlock />
        <HeaderBlock />
        {/*<SocialsBlock />*/}
        <BeerBlock />
        <WineBlock />
        <CocktailBlock  />
        <FootballBlock />
        <EventBlock />
        <AlbersBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
      {/*<Footer />*/}
    </div>
  );
}

const Block = ({ className, ...rest }: HTMLMotionProps<"div">) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
        className
      )}
      {...rest}
    />
  );
};
const HeroBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">

    <h1 className="mb-12 headingA text-center text-5xl text-yellow-500 leading-tight">
      gastlichkeit ist unsere passion
      </h1>
 
  </Block>
);


const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-12 bg-[url('/Assets/Img/schild.jpg ')] bg-cover bg-center ">

    <h1 className="mb-12 headingA text-7xl text-center lg:text-6xl text-red-700 leading-tight">
      unser angebot{" "}
      </h1>
 
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-red- md:col-span-3"
    >
      <a
        href="#"
        className=" grid h-full place-content-center text-3xl text-white"
      >
        <Image src={Flens} alt="Logo" width={550}  className="

        rounded-full" />
        
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-green-600 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiGithub />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-50 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-black"
      >
        <SiTiktok />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-blue-500 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <FiTwitter />
      </a>
    </Block>
  </>
);

const BeerBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <div className="lex flex-col justify-center items-center">
      <Image
        src={Flens}
        alt="Astra Bier"
        width={200}
        height={200}
        className="mx-auto rounded-full"
      />
    </div>
    <h1 className="mt-12 headingA text-center text-3xl text-yellow-600 lg:text-4xl">
      bier vom fass
    </h1>
    <p className="text-white text-center text-xl mt-4">
      Flensburger Pils, das Kühle blonde von der Waterkant - Astra
      dasKultbier natürlich direkt vom Kiez
    </p>
  </Block>
);

const WineBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <Image
      src={Wine}
      alt="Illustration Weinflaschen"
      width={250}
      height={250}
      className="mx-auto"
    />
    <h1 className="mt-12 headingA text-center text-3xl text-yellow-600 lg:text-4xl">
      regionale weine
    </h1>
    <p className="text-white text-center text-xl mt-4">
      Qualitativ hochwertige Weine aus der Region Kaiserstuhl und dem
      Markgräflerland. Hauslieferant Weingut Heinemann Scherzingen
    </p>
  </Block>
);

const CocktailBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <Image
      src={Cocktail}
      alt="Illustration Cocktail"
      width={250}
      height={250}
      className="mx-auto"
    />
   <h1 className="mt-12 headingA text-center text-3xl text-yellow-600 lg:text-4xl">
              cocktails & longdrinks
            </h1>
            <p className="text-white text-center text-xl mt-4">
              Zahlreiche internationale Longdrinks und Cocktails - alles was das
              Herz begehrt. Zahlreiche &quot;Kurze&quot; für jeden Geschmack.
            </p>
  </Block>
);



// Duplicate CocktailBlock removed (original CocktailBlock is defined earlier)

const FootballBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <Image
      src={Fussball}
      alt="Illustration Fussball"
      width={250}
      height={250}
      className="mx-auto"
    />
    <h1 className="mt-12 headingA text-center text-3xl text-yellow-600 lg:text-4xl">
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
  </Block>
);


const EventBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
             <Image
                src={Event}
                alt="Illustration Crowd Party"
                width={250}
                height={250}
                className="mx-auto"
              />
     <h1 className="mt-12 headingA text-center text-3xl text-yellow-600 lg:text-4xl">
              event oder party?
            </h1>
            <p className="text-white text-center text-xl mt-4">
              Der Rettungsanker ist die ideale Location für Ihren privaten oder
              Business Event. Im Rahmen einer &quot;geschlossenen
              Gesellschaft&quot; stehen Ihnen die Räumlichkeiten des
              Rettungsankers zur Verfügung. Auf Wunsch Catering durch unseren
              Kooperationspartner möglich ! Sprechen Sie uns an oder
              kontaktieren Sie uns per e.mail.
            </p>
  </Block>
);
const AlbersBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <Image
      src={HansAlbers}
      alt="Illustration Hans Albers"
      width={250}
      height={250}
      className="mx-auto"
    />
    <h1 className="mt-12 headingA text-center text-3xl text-yellow-600 lg:text-4xl">
      hans albers
    </h1>
    <p className="text-white text-center text-xl mt-4">
      Hans Phillip August Albers (22. September 1891 in Hamburg – 24. Juli 1960 in Berg, Bayern) war ein deutscher Schauspieler und Sänger, der als "blonder Hans" Volksschauspieler und Sänger bekannt wurde; zu seinen bekanntesten Filmen zählen "Der Mann, der Sherlock Holmes war" (1937), "Münchhausen" (1943) und "Die große Freiheit Nr. 7" (1943).
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Cyberspace</p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Join my mailing list</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiMail /> Join the list
      </button>
    </form>
  </Block>
);

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <Image
      src={LogoAlt}
      alt="Logo Rettungsanker"
      width={400}
      height={40}
      className="mx-auto mb-12"
    />
  );
};

{/*const Footer = () => {
  return (
    <footer className="mt-12">
      <p className="text-center text-zinc-400">
        Made with ❤️ by{" "}
        <a href="#" className="text-red-300 hover:underline">
          @tomisloading
        </a>
      </p>
    </footer>
  );
};*/}



