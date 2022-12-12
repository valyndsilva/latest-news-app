"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {};

function SearchBox({}: Props) {
  const [input, setInput] = useState("");
  const router = useRouter(); // next/navigation for nextjs 13

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    // router.push(`/search/${input}`); // using dynamic route
    router.push(`/search?term=${input}`); // using query param
    setInput("");
  };
  return (
    <form className="mt-10 flex space-x-5" onSubmit={handleSearch}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search keywords..."
        className="w-full flex-1 h-14 rounded-sm placeholder-gray-500 dark:placeholder-ivory/50 placeholder-opacity-50 text-balticSea outline-none bg-transparent dark:text-ivory font-bold"
      />
      <button
        type="submit"
        disabled={!input}
        className="btn flex items-center space-x-2"
      >
        <MagnifyingGlassIcon className="w-4 h-4" />
        <span>Search</span>
      </button>
    </form>
  );
}

export default SearchBox;
