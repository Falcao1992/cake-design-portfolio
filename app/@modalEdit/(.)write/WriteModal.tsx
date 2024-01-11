"use client";

import { WriteCakeForm } from "@/app/write/WriteCakeForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { WriteCakeFormProps } from "@/lib/type/cakes/writeCake/writeCake";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const WriteModal = ({
  user,
  createCake,
  uploadImage,
}: WriteCakeFormProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog
      open={pathname?.includes("/write")}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <DialogTitle>Create Cake</DialogTitle>
        <DialogDescription>Creer votre Cake</DialogDescription>
        <WriteCakeForm
          user={user}
          createCake={createCake}
          uploadImage={uploadImage}
        />
      </DialogContent>
    </Dialog>
  );
};
