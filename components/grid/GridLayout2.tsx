"use client";
import cn from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";


export default function BentoGridThirdDemo() {
  return (

    <>
    <h1 className="text-4xl text-yellow-600 text-center mb-8 mt-8 headingA md:text-5xl lg:text-8xl">gastlichkeit ist unsere philosophie</h1>
    <h1 className="text-4xl text-red-700 text-center mb-8 mt-8 headingA md:text-5xl lg:text-8xl">unser angebot</h1>
    <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[24rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon} />
      ))}
    </BentoGrid></>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-[url('/Assets/Img/frisch-gezapftes-flens.webp')] bg-contain bg-no-repeat flex-col space-y-2"
    >
      
      
    </motion.div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-[url('/Assets/Img/bottles03.png')] bg-contain bg-no-repeat flex-col space-y-2"
    >
      
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-[url('/Assets/Svg/Cocktailglas.svg')] bg-contain bg-no-repeat flex-col space-y-2"
      
    >

    </motion.div>
  );
};
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-[url('/Assets/Svg/Fussball.svg')] bg-contain bg-no-repeat flex-col space-y-2"
    >

    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-[url('/Assets/Img/crowdparty.png')] bg-contain bg-no-repeat flex-col space-y-2"
    >
     
    </motion.div>
  );
};
const SkeletonSix = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-[url('/Assets/Img/Albers_Illu_white.png')] bg-contain bg-no-repeat flex-col space-y-2"
    >
      
      
    </motion.div>
  );
};
const items = [
  {
    title: <span className="text-4xl headingA text-yellow-500 ">bier vom fass</span>,
    description: (
      <span className="text-sm lg:text-xl ">
        Flensburger Pilsener - das kühle Blonde aus dem hohen Norden - Astra das Kultbier direkt vom Kiez!
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1 md:row-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: <span className="text-4xl headingA text-yellow-500 ">regionale weine</span>,
    description: (
      <span className="text-sm lg:text-xl ">
        Regionale, qualitativ hochwertige Weine aus dem Markgräflerland und dem Kaiserstuhl. Hauslieferant Weingut Heinemann Scherzingen
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1 md:row-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
    {
    title: <span className="text-4xl headingA text-yellow-500 ">cocktails und longdrinks</span>,
    description: (
      <span className="text-sm lg:text-xl ">
        Internationale Cocktails und Longdrinks, frisch gemixt von unseren Barkeepern. Perfekt für jeden Anlass und Geschmack. Zahlreiche Kurze.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1 md:row-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
    {
    title: <span className="text-4xl headingA text-yellow-500 ">fussball live-tv</span>,
    description: (
      <span className="text-sm lg:text-xl ">
        Jeden Samstag-Spieltag der laufenden Bundesliga-Saison Live TV Event in unserer Sportarena natürlich mit Schwerpunkt unseres SC Freiburgs. Wann immer möglich auch Spiele der Champions League und natürlich der grossen Turniere von EM und WM. Bei Topspielen des SC Freiburg mit grosser Publikumsnachfrage sind Reservierungen über unser Booking-Tool zu empfehlen - Unten folgender Button und Du bist direkt dabei !',

      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-1 md:row-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },

    {
    title: <span className="text-4xl headingA text-yellow-500 ">party event?</span>,
    description: (
      <span className="text-sm lg:text-xl ">
        Der Rettungsanker ist die ideale Location für Ihren privaten oder Business Event. Im Rahmen einer "gesckossenen Gesellschaft" stehen Ihnen die Räumlichkeiten des Rettungsankers zur Verfügung. Auf Wunsch Catering durch unseren Kooperationspartner möglich ! Sprechen Sie uns an oder kontaktieren Sie uns per e-mail.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1 md:row-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
   {
    title: <span className="text-4xl headingA text-yellow-500 ">hans albers</span>,
    description: (
      <span className="text-sm lg:text-xl ">
        Hans Phillip August Albers (* 22.September 1891 in Hamburg , 24. Juli 1960 in Berg, Bayern) war ein deutscher Schauspieler und Sänger, der als "blonder Hans" Volkssidol wurde. Zu den bekanntesten Spielfilmen in denen er mitwirkte gehören "der Mann, der Sherlock Holmes war" (1937), "Münchhausen" (1943), "die grosse Freiheit Nr.7" (1943) sowie "Auf fer Reeperbahn Nachts um halb eins".
      </span>
    ),
    header: <SkeletonSix />,
    className: "md:col-span-1 md:row-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
];
