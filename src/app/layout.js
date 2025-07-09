import "./globals.css";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
// Registro os plugins de forma geral, para não repetir código
gsap.registerPlugin(ScrollTrigger, SplitText);

export const metadata = {
  title: "MOJITO",
  description: "Criado por Allan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
