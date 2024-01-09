"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import {
  WriteCakeFormProps,
  WriteCakeFormValues,
} from "@/lib/type/cakes/writeCake/writeCake";
import { WriteCakeFormSchema } from "@/lib/zod/cakes/writeCake/writeCakeFormSchema";
import { CakeLayout } from "@/src/features/cake/CakeLayout";
import { ContentTextArea } from "@/src/features/cake/ContentTextArea";
import { CakeType } from "@/src/query/cake.query";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const getInitialValues = (cake?: CakeType) => ({
  description: cake?.description || "",
  title: cake?.title || "",
});

export const WriteCakeForm = ({
  user,
  onSubmit,
  uploadImage,
  cake,
}: WriteCakeFormProps) => {
  const defaultValues = getInitialValues(cake);

  const [formData, setFormData] = useState<FormData | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    cake?.imageUrl || null
  ); // État pour stocker l'URL de l'image temporaire
  const [file, setFile] = useState<File>();

  const router = useRouter();
  const pathname = usePathname();
  const form = useZodForm({
    schema: WriteCakeFormSchema,
    defaultValues: defaultValues,
  });

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file: File = e.target.files[0];
      setFile(file);

      const fileUrl = URL.createObjectURL(file); // Créer une URL objet temporaire pour le fichier
      setImageUrl(fileUrl); // Mettre à jour l'URL de l'image temporaire

      const formData = new FormData();
      formData.append("image", file);
      setFormData(formData);
    }
  };

  const handleImageUpload = async () => {
    if (!formData && !imageUrl) return "";

    if (formData) {
      try {
        const imgUrl = await uploadImage(formData);
        console.log("Uploaded Image URL:", imgUrl);
        return imgUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        return "";
      }
    }

    return imageUrl || "";
  };

  const handleSubmit = async (values: WriteCakeFormValues, imgUrl: string) => {
    try {
      const cakeId = await onSubmit(values, imgUrl, cake?.id);
      if (cakeId) {
        window.location.href = `${window.location.origin}/cakes/${cakeId}`;
        router.push(`/cakes/${cakeId}`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error submitting cake:", error);
    }
  };

  return (
    <CakeLayout user={user} pathName={pathname || undefined}>
      <Form
        form={form}
        onSubmit={async (values) => {
          const imgUrl = await handleImageUpload();
          if (imgUrl) {
            handleSubmit(values, imgUrl);
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

        {imageUrl && (
          <div className="my-4">
            <img
              src={imageUrl}
              alt="Selected Cake"
              className="max-w-full w-20"
            />
          </div>
        )}

        <input
          id="image"
          className="hidden"
          type="file"
          name="image"
          onChange={handleChangeFile}
          placeholder="blalla"
        />
        <label htmlFor="image">
          {file?.name
            ? file.name
            : cake?.imageUrl
            ? "clicke me for replace image"
            : " click me for choose a image"}
        </label>

        <div className="flex w-full justify-end">
          <Button size="sm">Create Cake</Button>
        </div>
      </Form>
    </CakeLayout>
  );
};
