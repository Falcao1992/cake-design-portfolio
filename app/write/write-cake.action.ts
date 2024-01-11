"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { WriteCakeFormValues } from "@/lib/type/cakes/writeCake/writeCake";
import { getUser } from "@/src/query/user.query";
import { revalidatePath } from "next/cache";

export const createCake = async (values: WriteCakeFormValues) => {
  const user = await getUser();

  const cake = await prisma.cake.create({
    data: {
      description: values.description,
      userId: user.id,
      title: values.title,
    },
  });

  return cake.id;
};

export const updateCake = async (
  values: WriteCakeFormValues,
  cakeId?: string
) => {
  const user = await getUser();

  const cake = await prisma.cake.update({
    where: { id: cakeId },
    data: {
      description: values.description,
      userId: user.id,
      title: values.title,
    },
  });

  return cake.id;
};

export const deleteCake = async (userId: string, cakeId: string) => {
  const session = await getAuthSession();

  if (userId !== session?.user.id) {
    throw new Error("vous pouvez supprimer seulement vos posts");
  }

  const cake = await prisma.cake.delete({
    where: {
      id: cakeId,
    },
    select: {
      id: true,
      title: true,
    },
  });

  revalidatePath("/");

  return cake;
};
