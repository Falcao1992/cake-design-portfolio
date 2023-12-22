import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CldImage from "@/src/cloudinary/CldImage";
import { Cake } from "@/src/features/cake/Cake";
import { getLatestCakes } from "@/src/query/cake.query";
import React from "react";
import { v2 as cloudinary } from "cloudinary";

interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;
}

export default async function Home() {
  const session = await getAuthSession();

  const cakes = await getLatestCakes(session?.user.id);

  const { resources: sneakers } = await cloudinary.api.resources_by_tag(
    "nextjs-server-actions-upload-sneakers",
    { context: true }
  );

  return (
    <div className="divide-y divide-muted">
      <CldImage
        width="600"
        height="600"
        src="https://res.cloudinary.com/dwa0nl1lb/image/upload/v1703214346/cld-sample-5.jpg"
        alt="test"
      />
      <ul className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {sneakers.map((sneaker: CloudinaryResource) => {
          return (
            <li
              key={sneaker.public_id}
              className="rounded overflow-hidden bg-white dark:bg-slate-700"
            >
              <div className="relative">
                <CldImage
                  width={800}
                  height={600}
                  src={sneaker.public_id}
                  alt={sneaker.context?.alt || ""}
                />
              </div>
              {sneaker.context?.caption && (
                <div className="py-4 px-5">
                  <p className="mb-1 text-md font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                    {sneaker.context?.caption || ""}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {JSON.stringify(session?.user.id)}
      {cakes.map((c) => {
        return <Cake cake={c} key={c.id} />;
      })}
    </div>
  );
}
