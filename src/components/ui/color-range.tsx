import * as React from "react"

import { cn } from "@/lib/utils"

function ColorRange({
  className, ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type="range"
      data-slot="input"
      min={0}
      className={cn(
        'appearance-none w-full h-6 rounded-lg shadow-md cursor-pointer',
        '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent',
        ' [&::-webkit-slider-thumb]:shadow-[0_0_0_8px_rgba(255,_255,_255,_.3)_inset,_0_0_0_8px_rgba(255,_255,_255,_1)_inset,_0_0_0_4px_rgb(0_0_0_/_.5)_inset,_0_0_0_1px_rgb(0_0_0_/_.5),_0_0_0_1px_rgb(0_0_0_/_.3)]',
        className
      )}
      {...props}
    />
  )
}

export { ColorRange }
