import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import  cn  from "@/lib/utils"

interface BentoItem {
  id: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  isMain?: boolean
}

const bentoItems: BentoItem[] = [
  {
    id: "bier",
    title: "Bier vom Fass",
    description: "Frisch gezapftes Flensburger und andere regionale Biere – eiskalt serviert wie es sein muss.",
    imageSrc: "/Assets/Img/frisch-gezapftes-flens.webp",
    imageAlt: "Frisch gezapftes Flensburger Bier",
    isMain: true,
  },
  {
    id: "weine",
    title: "Regionale Weine",
    description: "Ausgewählte Weine aus der Region – für jeden Geschmack das passende Glas.",
    imageSrc: "/Assets/Img/bottles03.png",
    imageAlt: "Bunte Weinflaschen in Aquarell-Stil",
  },
  {
    id: "cocktails",
    title: "Cocktails & Longdrinks",
    description:
      "Von klassischen Cocktails bis zu kreativen Eigenkreationen – unsere Barkeeper zaubern Ihnen den perfekten Drink.",
    imageSrc: "/Assets/Svg/Cocktailglas.svg",
    imageAlt: "Cocktailglas Illustration",
  },
  {
    id: "fussball",
    title: "Fußball Live-TV",
    description: "Alle wichtigen Spiele live auf Großbildschirm – mit Freunden anfeuern und mitfiebern.",
    imageSrc: "/Assets/Svg/Fussball.svg",
    imageAlt: "Fußball Illustration",
    isMain: true,
  },
  {
    id: "party",
    title: "Party & Events",
    description: "Private Feiern, Firmenfeste oder spontane Partys – bei uns ist immer was los!",
    imageSrc: "/Assets/Img/crowdparty.png",
    imageAlt: "Party Crowd in Aquarell-Stil",
  },
  {
    id: "albers",
    title: "Hans Albers",
    description: "Unser Namensgeber und Hamburger Legende – seine Seemanns-Romantik lebt bei uns weiter.",
    imageSrc: "/Assets/Img/Albers_Illu_white.png",
    imageAlt: "Hans Albers Illustration als Seemann",
  },
]

function BentoCard({ item, className }: { item: BentoItem; className?: string }) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-xl",
        item.isMain ? "bg-amber-50 border-amber-400 border-2 ring-2 ring-amber-200" : "bg-card border-border",
        className,
      )}
    >
      {item.isMain && (
        <Badge className="absolute top-3 right-3 z-10 bg-amber-500 text-white hover:bg-amber-600">Highlight</Badge>
      )}
      <div className="relative w-full h-40 md:h-48 lg:h-52 overflow-hidden">
        <Image
          src={item.imageSrc || "/placeholder.svg"}
          alt={item.imageAlt}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className={cn("pb-2", item.isMain ? "bg-amber-50" : "")}>
        <CardTitle className={cn("text-lg md:text-xl font-bold", item.isMain ? "text-amber-900" : "text-foreground")}>
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(item.isMain ? "bg-amber-50" : "")}>
        <CardDescription
          className={cn(
            "text-sm md:text-base leading-relaxed",
            item.isMain ? "text-amber-800" : "text-muted-foreground",
          )}
        >
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default function BentoGrid() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl headingA md:text-4xl lg:text-7xl font-bold text-yellow-500 mb-7 text-balance">
            Gastlichkeit ist unsere Philosophie
          </h1>
          <h2 className="text-3xl headingA md:text-4xl lg:text-5xl font-bold text-slate-500 mb-4 text-balance">
            Was wir bieten
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-pretty">
            Entdecken Sie unser vielfältiges Angebot – von frisch gezapftem Bier bis zu unvergesslichen Events.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Bier vom Fass - Main item, larger on desktop */}
          <BentoCard item={bentoItems[0]} className="md:col-span-1 lg:col-span-1 lg:row-span-1" />

          {/* Regionale Weine */}
          <BentoCard item={bentoItems[1]} className="md:col-span-1 lg:col-span-1" />

          {/* Cocktails & Longdrinks */}
          <BentoCard item={bentoItems[2]} className="md:col-span-1 lg:col-span-1" />

          {/* Fußball Live-TV - Main item */}
          <BentoCard item={bentoItems[3]} className="md:col-span-1 lg:col-span-1" />

          {/* Party & Events */}
          <BentoCard item={bentoItems[4]} className="md:col-span-1 lg:col-span-1" />

          {/* Hans Albers */}
          <BentoCard item={bentoItems[5]} className="md:col-span-2 lg:col-span-1" />
        </div>
      </div>
    </section>
  )
}
