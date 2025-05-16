import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { dark, neobrutalism } from '@clerk/themes'
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Narobase | The world's leading NaroDB hosting platform",
  description: "Deploy your NaroDB instance in seconds"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider appearance={{
      signUp: {
        baseTheme: neobrutalism,
      },
      signIn: {
        baseTheme: neobrutalism,
      },
    }}>
      <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
      </body>
      </html>
    </ClerkProvider>
  );
}
