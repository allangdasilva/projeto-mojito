"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import React from "react";
import { useMediaQuery } from "react-responsive";
gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero() {
  const videoRef = React.useRef();
  // Com o pacote react-responsive vou verificar se estou em dispositivo mobile
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Vou utilizar o plugin SplitText que divide o texto de um elemento HTML em
  // caracteres, palavras e/ou linhas individuais
  useGSAP(() => {
    // Problema: flash de renderização incorreta que acontece:
    // Porque o GSAP depende do DOM já renderizado, Mas o Next.js renderiza a página
    // instantaneamente antes de o useGSAP aplicar seus efeitos
    // (como opacity: 0, transform, etc).
    // Solução: ocultar todo o conteúdo visualmente até o GSAP estar pronto.
    document.querySelectorAll(".gsap-init").forEach((el) => {
      el.classList.remove("gsap-init");
    });

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
      opacity: 0,
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

    // ----Animação Coquetel----
    // Esse valor será diferente para dispositivos mobile
    // O que esses valores significam?
    // "top 50%" = quando o topo do video atingir 50% da tela, a animação começa.
    // "center 60%" = quando o centro do video atingir 60% da tela, a animação começa.
    const startValue = isMobile ? "top 50%" : "center 60%";
    // "120% top" = nesse caso temos porcentagem, isso significa que quando o topo do
    // video ultrapassar 120% do topo da tela(ou seja, fica bem longe da tela) encerra
    // a animação
    // "bottom top" = quando a parte de baixo do video atingir o topo da tela, encerra
    // a animação
    const endValue = isMobile ? "120% top" : "bottom top";

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        // scrub: true = A animação fica vinculada ao scroll.
        scrub: true,
        // pin: true = isso manterá o video preso na tela enquanto o usuário rola o
        // scroll. Ou seja, é isso que trava o video na tela
        pin: true,
      },
    });

    // Assim que os metadados do vídeo forem carregados (como duração, dimensões, etc)
    // o evento 'onloadedmetadata' será disparado.
    videoRef.current.onloadedmetadata = () => {
      // A ideia aqui é a seguinte: Conforme o usuário rola a página (scroll), o
      // ScrollTrigger atualiza o progresso da timeline. E o GSAP irá aumentar o
      // currentTime do vídeo de 0 até video.duration (tempo total do vídeo),
      // simulando que o vídeo está sendo "controlado" pelo scroll.
      tl.to(videoRef.current, {
        // currentTime: Essa é uma propriedade do elemento de vídeo HTML que
        // representa: O tempo atual de reprodução, em segundos.
        // duration: Essa é outra propriedade nativa do vídeo e representa: A duração
        // total do vídeo.
        // Estou dizendo: "Crie uma animação que aumente a propriedade currentTime do
        // video, começando do valor atual(normalmente 0) até o valor
        // video.duration(fim do vídeo)"
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title gsap-init">MOJITO</h1>

        <Image
          src={`/images/hero-left-leaf.png`}
          width={266}
          height={461}
          priority
          alt="left-leaf"
          className="left-leaf gsap-init"
        />
        <Image
          src={`/images/hero-right-leaf.png`}
          width={228}
          height={478}
          priority
          alt="right-leaf"
          className="right-leaf gsap-init"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Ótimo. Fresco. Clássico.</p>
              <p className="subtitle text-left gsap-init">
                Saborear o <br /> Espírito do Verão
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle gsap-init">
                Cada coquetel do nosso menu é uma mistura de ingredientes de
                primeira qualidade <br /> - criados para te satisfazer
              </p>
              <a href="#cocktails">Ver Coquetéis</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        {/* playsInline serve para não mostrar elementos adicionais, como a barra de navegação ou opções de volume */}
        <video
          className="gsap-init"
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
}
