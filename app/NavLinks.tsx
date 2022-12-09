"use clients";

import React from "react";
import { categories } from "../constants";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

type Props = {};

function NavLinks({}: Props) {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname?.split("/").pop() === path;
    // Ex: mysite.com/news/technology
    // It splits at / so you have 3 values in an array: [mysite.com , news , technology]
    // on pop() it takes the last value Ex: technology
    // Compares technology to path value and retuns a boolean value.
  };
  return (
    <nav className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 mt-10 text-xs md:text-sm border-b">
      {categories.map((category) => (
        <NavLink
          key={category}
          category={category}
          isActive={isActive(category)}
        />
      ))}
    </nav>
  );
}

export default NavLinks;
