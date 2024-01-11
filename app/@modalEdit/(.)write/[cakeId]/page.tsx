import { uploadImage } from "@/app/write/upload-image.action";
import { createCake, updateCake } from "@/app/write/write-cake.action";
import { getUser } from "@/src/query/user.query";
import React from "react";
import { EditModal } from "./EditModal";
import { getCake } from "@/src/query/cake.query";
import NotFound from "@/app/cakes/[cakeId]/not-found";

export default async function ModalEdit({
  params,
}: {
  params: {
    cakeId: string;
  };
}) {
  const user = await getUser();
  const cake = await getCake(params?.cakeId, user.id);

  if (!cake) {
    return NotFound();
  }

  return (
    <div>
      <EditModal
        user={user}
        createCake={updateCake}
        uploadImage={uploadImage}
        cake={cake}
      />
    </div>
  );
}
