import { getUser } from "@/src/query/user.query";
import { WriteCakeForm } from "./WriteCakeForm";
import { createCake } from "./write-cake.action";

export default async function Write() {
  const user = await getUser();

  return <WriteCakeForm user={user} onSubmit={createCake} />;
}
