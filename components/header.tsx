import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import {
  UserButton,
  SignInButton,
  SignedOut,
  SignOutButton,
  SignedIn,
} from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between py-4 gap-4">
          <Link href="/" className="text-4xl font-bold text-primary">
            Shuflr
          </Link>

          <NavigationMenu className="flex-grow justify-center hidden lg:flex">
            <NavigationMenuList className="w-full max-w-screen-md">
              <NavigationMenuItem className="w-1/2">
                <NavigationMenuTrigger className="w-full justify-center">
                  Shuffle
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Link
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-1/2">
                <NavigationMenuTrigger className="w-full justify-center">
                  Top
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[200px]">
                    <li>
                      <Link href="/top-artists" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Artists
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/top-tracks" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Tracks
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <UserButton />
            <ModeToggle />
            <SignedOut>
              <SignInButton>
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                <Button variant="outline" className="ml-20">
                  Sign Out
                </Button>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>

        <NavigationMenu className="lg:hidden pb-4 ml-10 w-full">
          <NavigationMenuList className="flex w-full">
            <NavigationMenuItem className="flex-1">
              <NavigationMenuTrigger className="w-full justify-center">
                Shuffle
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Coming soon...
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex-1">
              <NavigationMenuTrigger className="w-full justify-center">
                Top
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-full gap-3 p-2">
                  <li>
                    <Link href="/top-artists" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Artists
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/top-tracks" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Tracks
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
