import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/app/components/SessionProvider";
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPORTSEE",
  description: "Transformez vos stats en résultats",
  icons: {
    icon: "/favicon.ico",
  },
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
          <main>{children}</main>
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
