"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/src/query/user.query";
import { WriteCakeFormValues } from "./WriteCakeForm";

export const createCake = async (values: WriteCakeFormValues) => {
  const user = await getUser();

  console.log("Next");
  const cake = await prisma.cake.create({
    data: {
      description: values.description,
      userId: user.id,
      title: values.title,
      imageUrl: values.imageUrl,
    },
  });

  return cake.id;
};
