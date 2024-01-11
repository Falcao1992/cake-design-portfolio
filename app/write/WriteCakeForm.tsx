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
import { UploadApiResponse } from "cloudinary";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { createImage, deleteImage } from "./image.action";
import { ImageDetailsType } from "@/lib/type/images/imageDetailsType";
import { DeleteIcon, X } from "lucide-react";
import { destroyImage } from "./upload-image.action";

const getInitialValues = (cake?: CakeType) => ({
  description: cake?.description || "",
  title: cake?.title || "",
});

export const WriteCakeForm = ({
  user,
  createCake,
  uploadImage,
  cake,
}: WriteCakeFormProps) => {
  const defaultValues = getInitialValues(cake);

  /* const [formData, setFormData] = useState<FormData | null>(null);
  const [imageUrl, setImageUrl] = useState<string[] | null>(
    cake?.imageUrl || null
  ); // État pour stocker l'URL de l'image temporaire */
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const form = useZodForm({
    schema: WriteCakeFormSchema,
    defaultValues: defaultValues,
  });

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: File[] = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleRemoveImageFromCloudinary = async (img: ImageDetailsType) => {
    // const imgDestroyed = await destroyImage(img.publicId);
    console.log("img", img);

    if (img.id) {
      const imgDeleteInDb = await deleteImage(img?.id);
      console.log("image delte in db", imgDeleteInDb);
    }

    // console.log("imgdstroyed l'image a bien été supprimer", imgDestroyed);
  };

  const handleImagesUpload = async () => {
    if (files.length === 0) return [];

    const imgsDetails: UploadApiResponse[] = [];

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const imgDetails = await uploadImage(formData);
        imgsDetails.push(imgDetails);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    console.log("imgsDetails", imgsDetails);

    return imgsDetails;
  };

  const createImageInDb = async (imgs: UploadApiResponse[], cakeId: string) => {
    if (!imgs) {
      console.log("pas d'image");
      return;
    }

    const imgsResponse = [];

    for (const img of imgs) {
      try {
        let imgObject: Omit<ImageDetailsType, "cakeId"> = {
          url: img.url,
          secureUrl: img.secure_url,
          publicId: img.public_id,
          signature: img.signature,
          width: img.width,
          height: img.height,
        };
        const imgResponse = await createImage(imgObject, cakeId);
        imgsResponse.push(imgResponse);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    return imgsResponse;
  };

  return (
    <CakeLayout user={user} pathName={pathname || undefined}>
      <Form
        form={form}
        onSubmit={async (values) => {
          const imgsDetails = await handleImagesUpload(); // creer les images et renvoie les données de la photo en format cloudinary compley
          const cakeCreatedId = await createCake(values); // creer le gateaux et renvoi l'id du gateaux

          const imgCreatedinDb = await createImageInDb(
            imgsDetails,
            cakeCreatedId
          ); // creer les images dans la db et renvoi les details de l'image

          console.log("imgsDetails", imgsDetails);
          console.log("cakeCreatedId", cakeCreatedId);
          console.log("imgCreatedinDb", imgCreatedinDb);
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

        <div className="flex gap-8">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Selected Cake ${index + 1}`}
                className="max-w-full w-16"
              />
              <button
                type="button"
                className="absolute top-0 right-0 p-2 bg-red-500 text-white"
                onClick={() => handleRemoveImage(index)}
              >
                <X />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-8">
          {cake?.images &&
            cake.images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.url}
                  alt={`Selected Cake ${index + 1}`}
                  className="max-w-full w-16"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-2 bg-red-500 text-white"
                  onClick={() => handleRemoveImageFromCloudinary(img)}
                >
                  <X />
                </button>
              </div>
            ))}
        </div>

        <input
          id="image"
          // className="hidden"
          type="file"
          name="image"
          onChange={handleChangeFile}
          placeholder="blalla"
        />
        {/* <label htmlFor="image">
          {file?.name
            ? file.name
            : cake?.imageUrl
            ? "clicke me for replace image"
            : " click me for choose a image"}
          </label> */}

        <div className="flex w-full justify-end">
          <Button size="sm">Create Cake</Button>
        </div>
      </Form>
    </CakeLayout>
  );
};
