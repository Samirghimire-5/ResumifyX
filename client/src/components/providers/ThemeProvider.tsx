"use client";

import * as React from "react";
import { ThemeProviderProps } from "next-themes";
import { ThemeProvider as N } from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <N
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </N>
  );
}
