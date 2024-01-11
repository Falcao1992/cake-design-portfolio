"use server";

import { prisma } from "@/lib/prisma";
import { ImageDetailsType } from "@/lib/type/images/imageDetailsType";

export const createImage = async (
  imageDetails: Omit<ImageDetailsType, "cakeId">,
  cakeId: string
) => {
  console.log("imageDetails", imageDetails);
  console.log("cakeId", cakeId);
  const image = await prisma.image.create({
    data: {
      url: imageDetails.url,
      secureUrl: imageDetails.secureUrl,
      publicId: imageDetails.publicId,
      signature: imageDetails.signature,
      width: imageDetails.width,
      height: imageDetails.height,
      cakeId: cakeId, // ID du gâteau auquel l'image est associée
    },
  });

  return image;
};

export const updateImage = async (
  imageId: string,
  updatedImageDetails: ImageDetailsType
) => {
  const image = await prisma.image.update({
    where: { id: imageId },
    data: updatedImageDetails,
  });

  return image.id;
};

export const deleteImage = async (imageId: string) => {
  try {
    // Supprimez d'abord l'image de la base de données
    await prisma.image.delete({
      where: { id: imageId },
    });

    // Si nécessaire, vous pouvez également ajouter une logique supplémentaire ici,
    // comme la suppression du fichier d'image associé sur le serveur de fichiers,
    // la mise à jour des relations avec d'autres modèles, etc.

    return { success: true, message: "Image deleted successfully." };
  } catch (error) {
    console.error("Error deleting image:", error);
    return {
      success: false,
      message: "An error occurred while deleting the image.",
    };
  }
};
