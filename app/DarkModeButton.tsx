"use client";
import React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
type Props = {};

function DarkModeButton({}: Props) {
  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="h-8 w-8 cursor-pointer text-yellow-400"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="h-8 w-8 cursor-pointer text-[#2a2a2a]"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  return <div>{renderThemeChanger()}</div>;
}

export default DarkModeButton;
