import React from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DarkModeButton from "./DarkModeButton";
import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";

type Props = {};

function Header({}: Props) {
  return (
    <header className=" p-10 font-poppins">
      <nav className="flex items-center place-items-start">
        <Bars3CenterLeftIcon className="h-8 w-8 cursor-pointer" />
        <div className="px-10 flex-1">Home</div>
        <div className="space-x-10 items-center flex">
          <DarkModeButton />
          <button className="hidden md:inline btn">
            Subscribe Now
          </button>
        </div>
      </nav>
      <div className="mt-10">
        <Link href="/" prefetch={false}>
          <h1 className="text-4xl font-light">Latest News</h1>
        </Link>
      </div>
      <NavLinks />
      <SearchBox />
    </header>
  );
}

export default Header;
