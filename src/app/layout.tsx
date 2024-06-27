export const dynamic = "force-dynamic"
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import {
  BlockBrowserNavigation,
  NavigationBlockerProvider,
} from '@/components/NavigationBlock';

import { cn } from "@/lib/utils"
import '@/styles/globals.css'
// import { ThemeProvider } from "@/components/theme-provider"
import ToastProvider from "@/lib/react-toastify/ToastProvider"
import HolyLoader from "holy-loader";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "ChiPay",
  description: "Welcome to ChiPay, where simplicity meets security. Say goodbye to complex transactions and hello to seamless payments and payouts",
  icons: {
    icon: "/images/chiPayLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning
      className="scrollbar-thumb-blue-800 scrollbar-track-gray-100 scrollbar-thin">
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <HolyLoader
          color="#1e40af"
          height="3px"
          speed={250}
          easing="linear"
          showSpinner
          boxShadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <NavigationBlockerProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </NavigationBlockerProvider>
      </body>
    </html>
  );
}