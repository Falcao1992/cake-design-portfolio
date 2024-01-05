import { getUser } from "@/src/query/user.query";
import { WriteCakeForm } from "./WriteCakeForm";
import { createCake } from "./write-cake.action";
import { uploadImage } from "./upload-image.action";

export default async function Write() {
  const user = await getUser();

  return (
    <WriteCakeForm
      user={user}
      onSubmit={createCake}
      uploadImage={uploadImage}
    />
  );
}
