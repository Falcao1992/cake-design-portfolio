import { getAuthSession } from "@/lib/auth";
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import { LoginButton } from "./auth/LoginButton";
import { UserProfile } from "./auth/UserProfile";
import Link from "next/link";

export const Header = async () => {
  const session = await getAuthSession();

  return (
    <header className="border-b border-b-accent fixed top-0 left-0 right-0 bg-background z-20">
      <div className="container flex items-center py-2 max-w-lg m-auto gap-1">
        <Link href={`/`} className="text-sm text-foreground">
          <h1 className="text-2xl font-bold mr-auto">Cake Design Portfolio</h1>
        </Link>
        <ThemeToggle />
        {session?.user.id ? <UserProfile /> : <LoginButton />}
      </div>
    </header>
  );
};
