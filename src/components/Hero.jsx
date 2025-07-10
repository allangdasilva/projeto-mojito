"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero() {
  // Vou utilizar o plugin SplitText que divide o texto de um elemento HTML em
  // caracteres, palavras e/ou linhas individuais
  useGSAP(() => {
    // Primeiro parâmetro: elemento desejado
    // Segundo parâmetro: para separar os caracteres e as palavras, deve-se utilizar
    // type: “chars,words”. Para separar apenas as linhas, deve utilizar type: “lines”.
    const heroSplit = new SplitText(".title", { type: "chars, word" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    // Com o .chars pego cada letra do texto(heroSplit) e adiciono uma classe que
    // vai dar um efeito de gradiente à elas
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
    // Vamos usar o efeito em cada letra do texto(heroSplit)
    gsap.from(heroSplit.chars, {
      // yPercent: 100 = transform: translateY(100%)
      yPercent: 100,
      duration: 1.8,
      // "expo.ou" cria um efeito suave e elástico
      ease: "expo.out",
      // stagger: efeito de escalonamento, cada letra sofre o efeito 0.06s após a outra
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    // Vou animar as folhas baseado na rolagem(ScrollTrigger)
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          // Vai começar quanto o topo da heroPage atingir o topo da tela
          start: "top top",
          // Vai terminar quando a parte inferior da heroPage atingir o top da tela
          end: "bottom top",
          // scrub: O progresso da animação estará diretamente relacionado a rolagem
          scrub: true,
        },
      })
      // O parâmetro 0 é a posição dessa animação na timeline
      // E como eu não coloquei a timeline em uma constante, posso usa-la assim, com o
      // método logo em sequência
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <Image
          src={`/images/hero-left-leaf.png`}
          width={266}
          height={461}
          priority
          alt="left-leaf"
          className="left-leaf"
        />
        <Image
          src={`/images/hero-right-leaf.png`}
          width={228}
          height={478}
          priority
          alt="right-leaf"
          className="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Ótimo. Fresco. Clássico.</p>
              <p className="subtitle text-left">
                Saborear o <br /> Espírito do Verão
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Cada coquetel do nosso menu é uma mistura de ingredientes de
                primeira qualidade <br /> - criados para te satisfazer
              </p>
              <a href="#cocktails">Ver Coquetéis</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
