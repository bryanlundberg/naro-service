import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { neobrutalism } from '@clerk/themes'
import { Toaster } from "@/components/ui/sonner";

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

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
      <body className={`${GeistSans.className} ${GeistMono.className} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        // disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
      </body>
      </html>
    </ClerkProvider>
  );
}
