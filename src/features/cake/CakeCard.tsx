import React from "react";
import { CakeHome } from "../../query/cake.query";
import Link from "next/link";
import { CakeLayout } from "./CakeLayout";

type cakeProps = {
  cake: CakeHome;
};

export const CakeCard = ({ cake }: cakeProps) => {
  return (
    <CakeLayout user={cake.user} cakeId={cake.id} createdAt={cake.createdAt}>
      <Link href={`/cakes/${cake.id}`} className="text-sm text-foreground">
        {cake.description}
      </Link>
      <div>
        {cake.imageUrl ? (
          <img
            src={cake.imageUrl}
            className="inset-0 w-full h-48 object-contain aspect-auto"
          />
        ) : null}
      </div>
    </CakeLayout>
  );
};
