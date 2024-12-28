// app/layout.tsx

import { headers } from "next/headers";
import buildClient from "@/api/build-client";
import { Toaster } from "@/components/ui/toaster";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/Header";
import React, { ReactElement } from "react";
import { AuthProvider } from "@/contexts/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Tresspass | Get to watch your favourites",
  description: "Ticket reselling platform",
};

interface UserData {
  id: string;
  name: string;
}

interface RootLayoutProps {
  children: ReactElement;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const headersList = await headers();
  let userData: UserData | null = null;

  try {
    const response = await buildClient({ headers: headersList }).get(
      "/api/users/currentuser"
    );
    userData = response?.data?.data?.currentUser || null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    userData = null;
  }

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {/* Pass userData to AuthProvider */}
        <AuthProvider userData={userData}>
          <Header user={userData} />
          <main>{children}</main>
          <footer>Footer</footer>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
