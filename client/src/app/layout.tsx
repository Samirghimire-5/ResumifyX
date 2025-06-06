"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "../lib/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import QueryProvider from "@/components/queryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
              <Toaster position="top-right" reverseOrder={true} />
            </PersistGate>
          </Provider>
        </QueryProvider>
      </body>
    </html>
  );
}
