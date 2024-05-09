import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import '@/styles/globals.css'
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "ChiPay",
  description: "Stay connected to your finances with our secure banking app. Manage accounts, transfer funds, pay bills, and monitor transactions seamlessly on-the-go",
  icons: {
    icon: "/images/chipayLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning
    className="scrollbar-thumb-blue-800 scrollbar-track-blue-50 scrollbar">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
