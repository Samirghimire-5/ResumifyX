"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" className="justify-start gap-2 h-10 px-4">
        <Sun size={18} />
        <span>Theme</span>
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-full justify-start gap-3 h-8 px-1 text-sm font-medium hover:bg-b2 transition-all"
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun size={19} className="text-amber-500" />
        ) : (
          <Moon size={19} className="text-text" />
        )}
      </div>

      <span className="text-text">{isDark ? "Light Mode" : "Dark Mode"}</span>

      {/* Optional: Small indicator */}
      <div className="ml-auto text-xs px-2 py-0.5 rounded-full bg-b2  text-text">
        {isDark ? "Dark" : "Light"}
      </div>
    </Button>
  );
}
