import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const cakeSelectQuery = (userId?: string) =>
  ({
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
  } satisfies Prisma.CakeSelect);

export const getLatestCakes = (userId?: string) =>
  prisma.cake.findMany({
    where: {
      userId: userId,
    },
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    select: cakeSelectQuery(userId),
  });

export const getCake = (id: string, userId?: string) =>
  prisma.cake.findUnique({
    where: {
      id: id,
    },
    select: {
      ...cakeSelectQuery(userId),
    },
  });

export type CakeHome = Prisma.PromiseReturnType<typeof getLatestCakes>[number]; // [number] is used for unwrap cakes's arrray
