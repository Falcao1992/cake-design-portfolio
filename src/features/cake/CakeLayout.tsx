import React, { PropsWithChildren } from "react";
import { CakeHome } from "../../query/cake.query";
import clsx from "clsx";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { formatDate } from "@/lib/date";

type CakeLayoutProps = PropsWithChildren<{
  user: CakeHome["user"];
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
}: CakeLayoutProps) => {
  return (
    <div className={clsx("flex w-full flex-row items-center p-4", classeName)}>
      <Avatar>
        {user.image ? (
          <AvatarImage src={user.image} alt={user.username} />
        ) : null}
        <AvatarFallback>
          {user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 flex w-full flex-col gap-2">
        <Link href={`/users/${user.id}`}>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-card-foreground mr-auto">
              {user.username}
            </p>
            {createdAt ? (
              <p className="text-sm text-muted-foreground">
                {formatDate(createdAt)}
              </p>
            ) : null}
            <button>
              <MoreHorizontal size={20} />
            </button>
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
};
