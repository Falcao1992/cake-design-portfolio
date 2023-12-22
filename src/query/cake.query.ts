import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getLatestCakes = (userId?: string) =>
  prisma.cake.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      createdAt: true,
      user: {
        select: {
          image: true,
          username: true,
          id: true,
        },
      },
      cakeTags: {
        select: {
          tagId: true,
          cakeId: true,
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          cakeTags: true,
        },
      },
    },
  });

export type CakeHome = Prisma.PromiseReturnType<typeof getLatestCakes>[number]; // [number] is used for unwrap cakes's arrray
