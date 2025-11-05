import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/context/ThemeContext";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthProvider } from "@/components/context/AuthContext";
import React from "react";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: "AI Note Taking App",
  description: "AI Note Taking App for creating notes",
  icons: {
    icon: '/logo.svg'
  }
};

const DynamicAuthForm = React.lazy(() => {
  return import("../components/layout/AuthForm")
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.className}`}
        >
          <main>
            <ThemeProvider>
              <AuthProvider>
                <Header />
                <DynamicAuthForm />
              </AuthProvider>
            </ThemeProvider>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
