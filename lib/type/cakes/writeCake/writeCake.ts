import { WriteCakeFormSchema } from "@/lib/zod/cakes/writeCake/writeCakeFormSchema";
import { CakeType } from "@/src/query/cake.query";
import { User } from "@prisma/client";
import { z } from "zod";

export type WriteCakeFormValues = z.infer<typeof WriteCakeFormSchema>;

export type WriteCakeFormProps = {
  user: User;
  onSubmit: (
    values: WriteCakeFormValues,
    imageUrl: string,
    cakeId?: string
  ) => Promise<string>;
  uploadImage: (FormData: FormData) => Promise<string>;
  cake?: CakeType;
};
