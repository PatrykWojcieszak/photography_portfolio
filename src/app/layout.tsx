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
  title: "Patryk Wojcieszak",
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
          <div className="flex flex-col h-full px-12 pb-2 gap-5 max-w-[2580px] w-full">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
