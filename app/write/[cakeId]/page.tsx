"use client";

import React from "react";

export default function Cake({
  params,
}: {
  params: {
    cakeid: string;
  };
}) {
  console.log("params", params);
  return <div>ipage component qui est intercepter</div>;
}
