import React from "react";
import { CakeType } from "../../query/cake.query";
import Link from "next/link";
import { CakeLayout } from "./CakeLayout";
import { ImageDetailsType } from "@/lib/type/images/imageDetailsType";

type cakeProps = {
  cake: CakeType;
};

export const CakeCard = ({ cake }: cakeProps) => {
  return (
    <CakeLayout user={cake.user} cakeId={cake.id} createdAt={cake.createdAt}>
      <h5>{cake.title}</h5>
      <Link href={`/cakes/${cake.id}`} className="text-sm text-foreground">
        {cake.description}
      </Link>
      <div className="flex">
        {cake.images
          ? cake.images.map((img: ImageDetailsType) => {
              return (
                <img
                  src={img.url}
                  className="inset-0 w-full h-48 object-contain aspect-auto"
                />
              );
            })
          : null}
      </div>
    </CakeLayout>
  );
};
