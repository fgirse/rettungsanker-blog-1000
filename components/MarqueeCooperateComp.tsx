import { Marquee } from "@devnomic/marquee";
// if you copy ala shadcn, no need import css.
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";
import LogoFlens from "../public/Assets/Svg/LogoFlens.svg";
import LogoNeu from "../public/Assets/Img/LogoNeu.png";
import LogoLeckerladen from "../public/Assets/Svg/LogoLeckerladen.svg";

function MarqueeCooperateComp() {
    // Use fade props
    return (
        <Marquee fade={true}>
            <section className ="flex items-center ">
            <div className="mr-36 py-24 ">
                <Image src={LogoNeu} alt="LogoNeu" width={200} height={80} />
            </div>
            <div className="mr-36 py-24">
                <Image src={LogoFlens} alt="LogoFlens" width={500} height={300} />
            </div>
            <div className="mr-36 ">
                <Image src={LogoLeckerladen} alt="LogoLeckerladen" width={500} height={300} />
            </div>
            </section>
        </Marquee>
    );
}

export default MarqueeCooperateComp;
