import React from "react";
import { getCake } from "@/src/query/cake.query";
import { CakeCard } from "@/src/features/cake/CakeCard";
import { notFound } from "next/navigation";
import { getAuthSession } from "@/lib/auth";

export default async function CakePage({
  params,
}: {
  params: {
    cakeId: string;
  };
}) {
  const session = await getAuthSession();
  const cake = await getCake(params?.cakeId, session?.user?.id);

  if (!cake) {
    return notFound();
  }

  return (
    <div className="divide-y divide-accent">
      {cake && <CakeCard cake={cake} key={cake.id} />}
    </div>
  );
}
