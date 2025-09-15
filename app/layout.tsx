import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/app/components/SessionProvider";
import Header from "@/app/ui/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPORTSEE",
  description: "Transformez vos stats en résultats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <body className="font-[Inter] text-[#111111] m-auto">
        <NextAuthSessionProvider>
          <Header />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
