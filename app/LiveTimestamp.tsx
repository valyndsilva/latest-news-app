"use client";
import React from "react";
import TimeAgo from "react-timeago";
type Props = { timestamp: string };

function LiveTimestamp({ timestamp }: Props) {
  return <TimeAgo date={timestamp} />;
}

export default LiveTimestamp;
