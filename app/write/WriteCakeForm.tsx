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
import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { uploadImage } from "./upload-image.action";

const Schema = z.object({
  description: z.string().min(1).max(500),
  title: z.string().min(1).max(20),
  //imageUrl: z.string().min(1).max(500),
});

export type WriteCakeFormValues = z.infer<typeof Schema>;

type WriteCakeFormProps = {
  user: User;
  onSubmit: (values: WriteCakeFormValues, imageUrl: string) => Promise<string>;
};

export const WriteCakeForm = ({ user, onSubmit }: WriteCakeFormProps) => {
  const form = useZodForm({
    schema: Schema,
  });
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file: File = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setFormData(formData);
      setFile(file);
    }
  };

  return (
    <CakeLayout user={user}>
      <Form
        form={form}
        onSubmit={async (values) => {
          let imageUrl = "";
          if (formData) {
            try {
              imageUrl = await uploadImage(formData);
              console.log("Uploaded Image URL:", imageUrl);
            } catch (error) {
              console.error("Error uploading image:", error);
            }
          }

          if (imageUrl) {
            try {
              const cakeId = await onSubmit(values, imageUrl);
              /* if (cakeId) {
                window.location.href = `${window.location.origin}/cakes/${cakeId}`;
                router.push(`/cakes/${cakeId}`);
                router.refresh();
              }*/
            } catch (error) {
              console.error("Error submitting cake:", error);
            }
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
        <input
          id="image"
          className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="file"
          name="image"
          onChange={handleChangeFile}
        />

        <div className="flex w-full justify-end">
          <Button size="sm">Create Cake</Button>
        </div>
      </Form>
    </CakeLayout>
  );
};
