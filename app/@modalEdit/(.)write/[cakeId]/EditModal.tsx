"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { WriteCakeForm, WriteCakeFormProps } from "@/app/write/WriteCakeForm";

export const EditModal = ({
  user,
  onSubmit,
  uploadImage,
  cake,
}: WriteCakeFormProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog
      open={pathname?.startsWith("/write/")}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <DialogTitle>Edit Cake</DialogTitle>
        <DialogDescription>Chnager votre Cake</DialogDescription>
        <WriteCakeForm
          user={user}
          onSubmit={onSubmit}
          uploadImage={uploadImage}
          cake={cake}
        />
      </DialogContent>
    </Dialog>
  );
};
