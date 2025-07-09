"use client";

import { navLinks } from "@/constants";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export function Navbar() {
  useGSAP(() => {
    // A timeline será baseada no scrollTrigger, e o gatilho será a nav
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",

        // Essas 2 propiedades controlam quando a animação começa e termina
        // A primeira se refere à posição do elemento
        // A segunda se refere à posição da janela de visualização
        // Nesse caso quando a parte inferior da nav atinge o topo da janela de
        // visualização é quando a animação inicia
        start: "bottom top",
      },
    });
    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#00000050",
        backgroundFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      }
    );
  }, []);

  return (
    <>
      <nav>
        <div>
          <a href="#home" className="flex items-center gap-2">
            <Image
              src={`/images/logo.png`}
              alt="Logo"
              width={32}
              height={32}
              priority
            />
            <p>Velvet Pour</p>
          </a>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
