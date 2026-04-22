



"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLogout } from "../hooks/UseLogout";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useLogout();

  const navItems = [
    { label: "Accueil", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <div className="w-full border-b bg-background">
      <div className="flex items-center justify-between px-4 py-3">

        {/* Logo / Home */}
        <div
          className="font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          MyApp
        </div>

        {/* Desktop nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">

            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Button
                  variant={pathname === item.path ? "default" : "ghost"}
                  onClick={() => router.push(item.path)}
                >
                  {item.label}
                </Button>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col gap-4 pt-10">

              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={pathname === item.path ? "default" : "ghost"}
                  onClick={() => router.push(item.path)}
                >
                  {item.label}
                </Button>
              ))}

              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>

            </SheetContent>
          </Sheet>
        </div>

      </div>
    </div>
  );
}




/*"use client";

import { useLogout } from "../hooks/UseLogout";

export default function Navbar() {
  const logout = useLogout();

  return (
    <div>
      <div className="flex justify-between">
        <button onClick={() => router.push("/")}>Acceuil</button>
        <button></button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
} */