"use server";

import { revalidatePath } from "next/cache";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { getAuthSession } from "@/lib/auth";

export const uploadImage = async (formData: FormData): Promise<string> => {
  try {
    const session = await getAuthSession();
    const file = formData.get("image") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const fileDetail: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: [`${session?.user.id}-cake`],
            },
            function (error, result) {
              if (error || !result?.url) {
                reject(
                  error || new Error("Failed to upload image to Cloudinary")
                );
                return;
              }
              resolve(result);
            }
          )
          .end(buffer);
      }
    );

    revalidatePath("/"); // Revalidate path after uploading
    return fileDetail.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
};
