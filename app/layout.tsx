import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Zero One - Dashboard",
  description: "Made by Zero One",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          {/* Footer */}
          <div className="w-full pt-2 pb-2 bg-white text-center fixed bottom-0">
            <p className="text-xs font-normal text-neutral-600">
              Powered by <span className="font-semibold">Zero One</span>
            </p>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
