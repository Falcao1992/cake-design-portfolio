import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <Alert className="my-8">
      <AlertTriangle />
      <AlertTitle>Cake not exist</AlertTitle>
      <AlertDescription>The Cake not exist</AlertDescription>
      <Link href={"/"} className={buttonVariants({ variant: "link" })}>
        retourner a la page d'accueil
      </Link>
    </Alert>
  );
}
