"use server";

import { revalidatePath } from "next/cache";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

export const uploadImage = async (formData: FormData): Promise<string> => {
  try {
    const file = formData.get("image") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const fileDetail: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: ["nextjs-server-actions-upload-sneakers"],
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
