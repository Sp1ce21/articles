import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { fetchCurrentUser } from "@/api/user";
import Providers from "@/utils/provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Articles",
  description: "RRS blog",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <Header user={user} />
          <main>{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
