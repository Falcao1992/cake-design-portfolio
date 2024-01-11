import React, { PropsWithChildren } from "react";
import clsx from "clsx";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { MoreHorizontal, PenIcon } from "lucide-react";
import { formatDate } from "@/lib/date";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { CakeType } from "@/src/query/cake.query";
import { deleteCache } from "next/dist/server/lib/render-server";
import { deleteCake } from "@/app/write/write-cake.action";
import { DeleteButton } from "./DeleteButton";

type CakeLayoutProps = PropsWithChildren<{
  user: CakeType["user"];
  pathName?: string;
  createdAt?: Date;
  classeName?: string;
  cakeId?: string;
}>;

export const CakeLayout = ({
  user,
  createdAt,
  classeName,
  cakeId,
  children,
  pathName,
}: CakeLayoutProps) => {
  return (
    <div className={clsx("flex w-full flex-row items-center p-4", classeName)}>
      <div className="ml-4 flex w-full flex-col gap-2">
        <div>
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              {user.image ? (
                <AvatarImage src={user.image} alt={user.username} />
              ) : null}
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-card-foreground mr-auto">
              {user.username}
            </p>
            {createdAt ? (
              <p className="text-sm text-muted-foreground">
                {formatDate(createdAt)}
              </p>
            ) : null}

            {!pathName?.includes("write") && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <MoreHorizontal size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/write/${cakeId}`}>
                      <PenIcon className="mr-2 h-4 w-4" />
                      write
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    {cakeId ? (
                      <DeleteButton userId={user.id} cakeId={cakeId} />
                    ) : (
                      <div>salut les gens</div>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
