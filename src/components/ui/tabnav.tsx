"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"

import { cn } from "@/lib/utils"

const TabNav = NavigationMenuPrimitive.Root

const TabNavList = ({
  className, ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) => (
  <NavigationMenuPrimitive.List
    className={cn(
      "inline-flex h-9 items-center rounded-lg bg-muted p-1 text-muted-foreground",
      "overflow-x-auto overflow-y-hidden [scrollbar-width:none]",
      className
    )}
    {...props}
  />
)

const TabNavLink = ({
  className, ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) => (
  <NavigationMenuPrimitive.Link
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-background data-[active]:text-foreground data-[active]:shadow",
      className
    )}
    {...props}
  />
)


export { TabNav, TabNavList, TabNavLink }