import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";
import { UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

import { cn } from "@/lib/utils";
import Link from "next/link";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Zero One - Dashboard",
  description: "Made by Zero One",
};

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Messages",
    href: "/messages",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="space-y-6 p-10 pb-0 md:block">
              <div className="space-y-0.5">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      Welcome
                    </h2>
                    <p className="text-muted-foreground">
                      All your monitoring tools in one place.
                    </p>
                  </div>
                  <div className="flex-initial w-3/4 flex justify-end">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                  <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1">{children}</div>
              </div>
            </div>
            {/* Footer */}
            <div className="w-full pt-2 pb-2 bg-slate-900 text-center fixed bottom-0">
              <p className="text-xs font-normal text-gray-400">
                Powered by{" "}
                <span className="font-semibold">
                  <Link href="https://zero-one.online" target="_blank">
                    Zero One
                  </Link>
                </span>
              </p>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
