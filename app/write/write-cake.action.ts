"use server";

import { prisma } from "@/lib/prisma";
import { WriteCakeFormValues } from "@/lib/type/cakes/writeCake/writeCake";
import { getUser } from "@/src/query/user.query";

export const createCake = async (
  values: WriteCakeFormValues,
  imageUrl: string
) => {
  const user = await getUser();

  const cake = await prisma.cake.create({
    data: {
      description: values.description,
      userId: user.id,
      title: values.title,
      imageUrl: imageUrl,
    },
  });

  return cake.id;
};

export const updateCake = async (
  values: WriteCakeFormValues,
  imageUrl: string,
  cakeId?: string
) => {
  const user = await getUser();

  const cake = await prisma.cake.update({
    where: { id: cakeId },
    data: {
      description: values.description,
      userId: user.id,
      title: values.title,
      imageUrl: imageUrl,
    },
  });

  return cake.id;
};
