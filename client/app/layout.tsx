import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/context/ThemeContext";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { ToastContainer } from 'react-toastify'

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
              <Header />
            </ThemeProvider>
            {children}
            <ToastContainer
              hideProgressBar
              position="top-center"
              autoClose={2000}
              closeOnClick
              style={{ zIndex: 9999 }}
              theme="colored"
            />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
