import React from "react";

type Props = {};

function loading({}: Props) {
  return (
    <div className="animate-pulse text-lg text-ivory text-center p-10">
      Loading New Feed...
    </div>
  );
}

export default loading;
