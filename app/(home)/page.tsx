import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Cake } from "@/src/features/cake/Cake";
import { getLatestCakes } from "@/src/query/cake.query";
import React from "react";

export default async function Home() {
  const session = await getAuthSession();

  console.log("session", session);

  const cakes = await getLatestCakes();

  return (
    <div className="divide-y divide-muted">
      {cakes.map((c) => {
        return <Cake cake={c} key={c.id} />;
      })}
    </div>
  );
}
