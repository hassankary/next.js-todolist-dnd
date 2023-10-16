"use client";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }


  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-5 w-5"/>
      ) : (
        <MoonIcon className="h-5 w-5"/>
      )}
    </button>
  );
};

export default ThemeButton;
