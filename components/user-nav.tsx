import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddCourseDialog } from "./AddCourseDialog";

export function UserNav({
  username,
  imageURL,
}: {
  username: string;
  imageURL: string;
}) {
  let loggedIn = false;
  const { data: session } = useSession();
  if (session?.user) {
    loggedIn = true;
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full text-black"
          >
            <Avatar className="h-14 w-14">
              <AvatarImage src={imageURL} />
              <AvatarFallback>GPT</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-xs leading-none text-muted-foreground">
                Hello
              </p>
              <p className="text-sm font-medium leading-none">{username}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {loggedIn && (
              <DialogTrigger asChild>
                <DropdownMenuItem>Add Course</DropdownMenuItem>
              </DialogTrigger>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {loggedIn ? (
            <Link href="/api/auth/signout">
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <DropdownMenuItem>Sign In</DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AddCourseDialog />
    </Dialog>
  );
}
