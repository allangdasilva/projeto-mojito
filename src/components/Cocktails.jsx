"use client";

import Image from "next/image";
import { cocktailLists, mockTailLists } from "@/constants";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

export default function Cocktails() {
  useGSAP(() => {
    document.querySelectorAll(".gsap-init").forEach((el) => {
      el.classList.remove("gsap-init");
    });

    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });
    parallaxTimeline
      .from("#c-left-leaf", { x: -100, y: 100 })
      .from("#c-right-leaf", { x: 100, y: 100 });
  }, []);

  return (
    <>
      <section id="cocktails" className="noisy">
        <Image
          className="gsap-init"
          src={`/images/cocktail-left-leaf.png`}
          width={294}
          height={332}
          alt="leaft-leaf"
          id="c-left-leaf"
        />
        <Image
          className="gsap-init"
          src={`/images/cocktail-right-leaf.png`}
          width={315}
          height={332}
          alt="right-leaf"
          id="c-right-leaf"
        />

        <div className="list">
          <div className="popular">
            <h2>Coqueteis Populares</h2>

            <ul>
              {cocktailLists.map(({ name, country, detail, price }) => (
                <li key={name}>
                  <div className="md:me-28">
                    <h3>{name}</h3>
                    <p>
                      {country} | {detail}
                    </p>
                  </div>
                  <span>{price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="loved">
            <h2>Coqueteis Amados</h2>

            <ul>
              {mockTailLists.map(({ name, country, detail, price }) => (
                <li key={name}>
                  <div className="me-28">
                    <h3>{name}</h3>
                    <p>
                      {country} | {detail}
                    </p>
                  </div>
                  <span>{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
