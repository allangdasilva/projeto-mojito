"use client";

import gsap from "gsap";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { featureLists, goodLists } from "@/constants";
import { useMediaQuery } from "react-responsive";
gsap.registerPlugin(ScrollTrigger);

export default function Art() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  // Assim que o usuário rola a página, fixaremos a seção, esmaeceremos o conteúdo
  // inicial, dimensionaremos e revelaremos a máscara da imagem, e por fim esmaeceremos
  // a mensagem de fechamento na parte interior
  useGSAP(() => {
    const start = isMobile ? "top 20%" : "top top";
    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#art",
        start: start,
        end: "bottom center",
        // scrub: 1.5 = será um controle de rolagem suave, o progresso da animação
        // seguirá a rolagem, mas com algum atraso.
        scrub: 1.5,
        pin: true,
      },
    });
    maskTimeline
      .to(".will-fade", {
        opacity: 0,
        stagger: 0.2,
        ease: "power1.inOut",
      })
      .to(".masked-img", {
        scale: 1.3,
        maskPosition: "center",
        maskSize: "400%",
        duration: 1,
        ease: "power1.inOut",
      })
      .to("#masked-content", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      });
  }, []);
  return (
    <>
      <div id="art">
        <div className="container mx-auto h-full pt-20">
          <h2 className="will-fade">ARTE</h2>
          <div className="content">
            <ul className="space-y-4 will-fade">
              {goodLists.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Image
                    src={`/images/check.png`}
                    width={16}
                    height={16}
                    alt="check"
                  />
                  <p>{feature}</p>
                </li>
              ))}
            </ul>

            <div className="cocktail-img">
              <Image
                src={`/images/under-img.jpg`}
                width={1500}
                height={1000}
                alt="cocktail"
                className="abs-center masked-img size-full object-contain"
              />
            </div>

            <ul className="space-y-4 will-fade">
              {featureLists.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
                  <Image
                    src={`/images/check.png`}
                    width={16}
                    height={16}
                    alt="check"
                  />
                  <p className="md:w-fit w-60">{feature}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="masked-container">
            <h2 className="will-fade">Perfeição Digna de um Gole</h2>
            <div id="masked-content">
              <h3>Feito com Artesanato, Servido com Paixão</h3>
              <p>
                Isto não é apenas uma bebida. É um momento feito só para si.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
