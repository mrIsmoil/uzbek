import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "O'ZBEKISTON — Raqamli Muzey Tajribasi",
  description:
    "O'zbekistonning boy tarixi, madaniyati va kelajagi bo'ylab raqamli sayohat. Minimalistik va zamonaviy talqin.",
  keywords: [
    "O'zbekiston",
    "Madaniyat",
    "Tarix",
    "Do'ppi",
    "Meros",
    "Kelajak",
  ],
  openGraph: {
    title: "O'ZBEKISTON",
    description: "Bir xalq. Bir tarix. Bir kelajak.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
