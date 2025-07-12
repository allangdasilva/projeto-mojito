"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
gsap.registerPlugin(SplitText, ScrollTrigger);

export default function About() {
  useGSAP(() => {
    document.querySelectorAll(".gsap-init").forEach((el) => {
      el.classList.remove("gsap-init");
    });

    const titleSplit = SplitText.create("#about h2", { type: "words" });
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });

    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: "expo.out",
        stagger: 0.02,
      })
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.04,

          // esse segundo parâmetro faz com que a animação comece 0.5 segundos antes da
          // anterior terminar
        },
        "-=0.5"
      );
  }, []);
  return (
    <>
      <div id="about">
        <div className="mb-16 md:px-0 px-5">
          <div className="content">
            <div className="md:col-span-8">
              <p className="badge">Melhores Coqueteis</p>
              <h2 className="gsap-init">
                Onde cada detalhe importa<span className="text-white">-</span>
                da mistura até a guarnição
              </h2>
            </div>
            <div className="sub-content">
              <p>
                Cada cocktail que servimos é um reflexo da nossa obsessão pelos
                detalhes - desde a primeira mistura até à guarnição final. Esse
                cuidado é o que transforma uma simples bebida em algo
                verdadeiramente memorável.
              </p>
              <div>
                <p className="md:text-3xl text-xl font-bold">
                  <span>4.5</span>/5
                </p>
                <p className="text-sm text-white-100">
                  Mais de +12000 clientes
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="top-grid">
          <div className="md:col-span-3 gsap-init">
            <div className="noisy gsap-init" />
            <Image
              src={`/images/abt1.png`}
              alt="grid-img-1"
              width={330}
              height={285}
              priority
            />
          </div>

          <div className="md:col-span-6 gsap-init">
            <div className="noisy gsap-init" />
            <Image
              src={`/images/abt2.png`}
              alt="grid-img-2"
              width={580}
              height={285}
              priority
            />
          </div>

          <div className="md:col-span-3 gsap-init">
            <div className="noisy gsap-init" />
            <Image
              src={`/images/abt5.png`}
              alt="grid-img-5"
              width={860}
              height={860}
              priority
            />
          </div>
        </div>

        <div className="bottom-grid">
          <div className="md:col-span-8 gsap-init">
            <div className="noisy gsap-init" />
            <Image
              src={`/images/abt3.png`}
              alt="grid-img-3"
              width={780}
              height={285}
              priority
            />
          </div>

          <div className="md:col-span-4 gsap-init">
            <div className="noisy gsap-init" />
            <Image
              src={`/images/abt4.png`}
              alt="grid-img-4"
              width={480}
              height={285}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
