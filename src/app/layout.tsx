import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header } from "../components/header/Header";

const inter = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Patryk Wojcieszak",
    template: "%s - Patryk Wojcieszak",
  },
  description: "Patryk Wojcieszak - Photography portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-center w-full">
          <div className="flex flex-col px-12 pb-2 max-w-[2580px] w-full h-screen overflow-y-auto">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
