"use client";

import { deleteCake } from "@/app/write/write-cake.action";
import { DeleteIcon } from "lucide-react";

type deleteButtonProps = {
  userId: string;
  cakeId: string;
};

export const DeleteButton = (props: deleteButtonProps) => {
  return (
    <div>
      <button
        onClick={async () => {
          const cake = await deleteCake(props.userId, props.cakeId);
          console.log("cake", cake);
        }}
      >
        <DeleteIcon className="mr-2 h-4 w-4" />
        delete
      </button>
    </div>
  );
};
