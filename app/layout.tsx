import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chrome from "@/components/Chrome";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Focus AI | Strategic AI Consultancy",
  description:
    "Focus AI is a strategic AI consultancy helping professional services firms turn expertise into lasting advantage.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Chrome><Header /></Chrome>
        <main className="flex-1">{children}</main>
        <Chrome><Footer /></Chrome>
      </body>
    </html>
  );
}
