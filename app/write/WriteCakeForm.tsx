"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { CakeLayout } from "@/src/features/cake/CakeLayout";
import { ContentTextArea } from "@/src/features/cake/ContentTextArea";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { z } from "zod";

const Schema = z.object({
  description: z.string().min(1).max(500),
  title: z.string().min(1).max(20),
  imageUrl: z.string().min(1).max(500),
});

export type WriteCakeFormValues = z.infer<typeof Schema>;

type WriteCakeFormProps = {
  user: User;
  onSubmit: (values: WriteCakeFormValues) => Promise<string>;
};

export const WriteCakeForm = ({ user, onSubmit }: WriteCakeFormProps) => {
  const form = useZodForm({
    schema: Schema,
  });
  const router = useRouter();

  return (
    <CakeLayout user={user}>
      <Form
        form={form}
        onSubmit={async (values) => {
          const cakeId = await onSubmit(values);
          if (cakeId) {
            window.location.href = `${window.location.origin}/cakes/${cakeId}`;
            router.push(`/cakes/${cakeId}`);
            router.refresh();
          }
        }}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <ContentTextArea {...field} rows={1} placeholder="title" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <ContentTextArea {...field} rows={3} placeholder="description" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <ContentTextArea {...field} rows={1} placeholder="imageUrl" />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button size="sm">Create Cake</Button>
        </div>
      </Form>
    </CakeLayout>
  );
};
