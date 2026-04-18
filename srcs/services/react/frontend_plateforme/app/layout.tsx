import "./globals.css";
import Navbar from "./components/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fr" className={cn("dark", "font-sans", geist.variable)}>
      <body className="bg-white text-black dark:bg-zinc-900 dark:text-white">
        <header className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <Navbar />
        </header>
        <main className="p-4">
          {children}
        </main>
        <footer className="p-4 border-t border-zinc-200 dark:border-zinc-700">
          Footer
        </footer>
      </body>
    </html>
  );
}

