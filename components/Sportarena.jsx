"use client";

import { motion } from "framer-motion";
import styles from "@/styles/index";
import { TypingText } from "@/components/CustomTexts";
import { planetVariants, staggerContainer, fadeIn } from "../utils/motion";
import Modale16 from "@/components/Modale/Modale16";
import Marquee from "@/components/ticker";
import Fussball from "@/public/Assets/Svg/5555.svg";
import Image from "next/image";

const SportArena = () => (
  <section
    id="section-sportarena"
    className={`${styles.paddings} relative w-[100vw] z-10 bg-sportarena flex flex-col justify-beetween top-20`}
  >
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        className="flex-1 flex justify-center flex-col"
      >
        <TypingText title="| Sportarena" />
        <h1 className=" headingA text-yellow-500 text-[2.33rem] lg:text-9xl">
          Sportarena
        </h1>
        <div className="mt-12 flex flex-wrap items-center justify-between md:flex md:flex-row gap-6">
          <div>
            <Marquee />

            <h1 className="text-white text-[2.33rem]">SC Freiburg Info</h1>
            <h1 className="text-white text-[1.33rem]">
              Zahlen-Fakten-Punkte-Tore
            </h1>
          </div>
          <div className="">
            <Modale16 />
            <h1 className="text-center text-white text-[2.33rem]">
              Die Bundesliga Saison 2025/2026
            </h1>
            <h1 className="text-center text-white text-[1.35rem]">Tabelle</h1>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={planetVariants("right")}
        className={`flex-1 ${styles.flexCenter}`}
      >
        <Image
          src={Fussball}
          alt="get-started"
          className="md:w-60 md:h-60 w-[60%] h-[60%] object-contain"
        />
      </motion.div>
    </motion.div>
  </section>
);

export default SportArena;