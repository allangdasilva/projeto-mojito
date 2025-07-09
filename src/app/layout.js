import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "MOJITO",
  description: "Criado por Allan",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
