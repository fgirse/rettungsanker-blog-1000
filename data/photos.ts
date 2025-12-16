import type { Photo } from "react-photo-album";

function imageLink(path: string, width: number, height: number, size: number, extension: string) {
  return `https://images.react-photo-album.com/hiking/${path}.${width}x${height}.${size}w.${extension}`;
}

const photos = [
  { src: "/Assets/Img/SDX29209-400x267.jpg", alt: "Rettungsanker Eingang", width: 400, height: 267 },
  { src: "/Assets/Img/SDX29268-400x267.jpg", alt: "Bar Bereich", width: 400, height: 267 },
  { src: "/Assets/Img/SDX29325-400x267.jpg", alt: "Theke mit Getränken", width: 400, height: 267 },
  { src: "/Assets/Img/LogoNeu.png", alt: "Logo Rettungsanker alt", width: 200, height: 200 },
  { src: "/Assets/Img/frisch-gezapftes-flens-i-mori-ohlsdorf-1000x1000.webp", alt: "Flens vom Fass", width: 1000, height: 1000 },
  { src: "/Assets/Img/SDX29268-400x267.jpg", alt: "Bar Bereich", width: 400, height: 267 },
  { src:  "/Assets/Img/portraitmick.png", alt: "Portrait Mick", width: 600, height: 800 },
  { src:  "/Assets/Img/schild.jpg", alt: "RettungsankerSchild.jpg", width: 400, height: 267 },
  { src:  "/Assets/Img/steuer.jpg", alt: "Steuerboard.jpg", width: 1000, height: 1000 },
  { src:  "/Assets/Img/theke.jpg", alt: "Theke mit Getränken", width: 400, height: 267 },
  { src:  "/Assets/Img/adelhausserstrasse.jpg", alt: "Strasse Schilf", width: 400, height: 267 },
  { src:  "/Assets/Img/Albers_Illu_white.png.jpg", alt: "hansAlbers-Illustration", width: 400, height: 267 },    
  { src: "/Assets/Img/assorted-wine-bottles.png", alt: "Baransicht", width: 400, height:  267 },
  { src: "/Assets/Img/Hero.png", alt: "Hero Illustration", width: 400, height: 267 },
  { src: "/Assets/Img/Graffity_StPauli.png", alt: "Graffity", width: 400, height: 267 },
  { src: "/Assets/Img/hamburgmoin.png", alt: "Hamburg Moin", width: 400, height: 267 },
  { src: "/Assets/Img/schwabentor-freiburg.avif", alt: "Schwabentor Freiburg", width: 400, height: 267 },
] as Photo[];

export default photos;
