"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  article: DataEntry;
};

function ReadMoreButton({ article }: Props) {
  const router = useRouter();
  //   console.log(article);
  //   console.log(Object.entries(article));

  const handleClick = () => {
    const queryString = Object.entries(article)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const url = `/article?${queryString}`;
    // console.log(url);
    router.push(url);
  };

  return (
    <button onClick={handleClick} className="btn rounded-lg">
      Read More
    </button>
  );
}

export default ReadMoreButton;
