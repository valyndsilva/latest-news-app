import Link from "next/link";
import React from "react";

interface Props {
  category: string;
  isActive: boolean;
}

function NavLink({ category, isActive }: Props) {
  return (
    <Link
      href={`/news/${category}`}
      as={`/news/${category}`}
      className={`navLink  ${isActive && ""}`}
    >
      {category}
    </Link>
  );
}

export default NavLink;
