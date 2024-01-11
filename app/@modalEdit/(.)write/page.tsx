import React from "react";
import { WriteModal } from "./WriteModal";
import { createCake } from "@/app/write/write-cake.action";
import { uploadImage } from "@/app/write/upload-image.action";
import { getUser } from "@/src/query/user.query";

export default async function Modal() {
  const user = await getUser();

  return (
    <div>
      <WriteModal
        user={user}
        createCake={createCake}
        uploadImage={uploadImage}
      />
    </div>
  );
}
