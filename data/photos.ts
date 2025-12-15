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
] as Photo[];

export default photos;
