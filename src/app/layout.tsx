import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EventOrderProvider } from "@/context/EventOrder";
import Intro from "@/components/Intro";
import Header from "@/components/Header";
import EventOrderDrawer from "@/components/EventOrderDrawer";
import Toast from "@/components/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crumb & Cream · Event pre-orders",
  description: "Pre-order fresh bakery, dairy and ready meals for your party, wedding or corporate event.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..500;1,9..144,300..500&family=Figtree:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <EventOrderProvider>
          <Intro />
          <Header />
          {children}
          <EventOrderDrawer />
          <Toast />
        </EventOrderProvider>
      </body>
    </html>
  );
}
