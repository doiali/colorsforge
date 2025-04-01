import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type PickerMode = 'hsl' | 'rgb' | 'hex' | 'cmyk' | 'hsv' | 'lab' | 'lch' | 'xyz' | 'hwb' | 'oklab' | 'oklch'

export const pickers: {
  name: PickerMode
  label: string
  fields: {
    name: string,
    label: string,
    min: number,
    max: number,
    step: number,
    getGradient?: (value: number[]) => string
  }[]
}[] = [
    {
      name: 'rgb', label: 'RGB', fields: [
        {
          name: 'r', label: 'Red', min: 0, max: 255, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, rgb(0, ${value[1]}, ${value[2]}), rgb(255, ${value[1]}, ${value[2]}))`,
        },
        {
          name: 'g', label: 'Green', min: 0, max: 255, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, rgb(${value[0]}, 0, ${value[2]}), rgb(${value[0]}, 255, ${value[2]}))`,
        },
        {
          name: 'b', label: 'Blue', min: 0, max: 255, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, rgb(${value[0]}, ${value[1]}, 0), rgb(${value[0]}, ${value[1]}, 255))`,
        },
      ]
    },
    {
      name: 'hsl', label: 'HSL', fields: [
        {
          name: 'h', label: 'Hue', min: 0, max: 360, step: 1,
          getGradient: (value) => `linear-gradient(to right, hsl(0, ${value[1]}%, ${value[2]}%), hsl(360, ${value[1]}%, ${value[2]}%))`,
        },
        {
          name: 's', label: 'Saturation', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, hsl(${value[0]}, 0%, ${value[2]}%), hsl(${value[0]}, 100%, ${value[2]}%))`,
        },
        {
          name: 'l', label: 'Lightness', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, hsl(${value[0]}, ${value[1]}%, 0%), hsl(${value[0]}, ${value[1]}%, 100%))`,
        },
      ]
    },
    {
      name: 'hex', label: 'Hex', fields: [
        { name: 'hex', label: 'Hex', min: 0, max: 16777215, step: 1 },
      ]
    },
    {
      name: 'cmyk', label: 'CMYK', fields: [
        {
          name: 'c', label: 'Cyan', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, cmyk(0%, ${value[1]}%, ${value[2]}%, ${value[3]}%), cmyk(100%, ${value[1]}%, ${value[2]}%, ${value[3]}%))`,
        },
        {
          name: 'm', label: 'Magenta', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, cmyk(${value[0]}%, 0%, ${value[2]}%, ${value[3]}%), cmyk(${value[0]}%, 100%, ${value[2]}%, ${value[3]}%))`,
        },
        {
          name: 'y', label: 'Yellow', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, cmyk(${value[0]}%, ${value[1]}%, 0%, ${value[3]}%), cmyk(${value[0]}%, ${value[1]}%, 100%, ${value[3]}%))`,
        },
        {
          name: 'k', label: 'Key (Black)', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, cmyk(${value[0]}%, ${value[1]}%, ${value[2]}%, 0%), cmyk(${value[0]}%, ${value[1]}%, ${value[2]}%, 100%))`,
        },
      ]
    },
    {
      name: 'hsv', label: 'HSV', fields: [
        {
          name: 'h', label: 'Hue', min: 0, max: 360, step: 1,
          getGradient: () => `linear-gradient(to right, hsv(0, 100%, 100%), hsv(360, 100%, 100%))`,
        },
        {
          name: 's', label: 'Saturation', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, hsv(${value[0]}, 0%, ${value[2]}%), hsv(${value[0]}, 100%, ${value[2]}%))`,
        },
        {
          name: 'v', label: 'Value', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, hsv(${value[0]}, ${value[1]}%, 0%), hsv(${value[0]}, ${value[1]}%, 100%))`,
        },
      ]
    },
    {
      name: 'lab', label: 'Lab', fields: [
        {
          name: 'l', label: 'Lightness', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, lab(0, ${value[1]}, ${value[2]}), lab(100, ${value[1]}, ${value[2]}))`,
        },
        {
          name: 'a', label: 'A (Green–Red)', min: -128, max: 127, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, lab(${value[0]}, -128, ${value[2]}), lab(${value[0]}, 127, ${value[2]}))`,
        },
        {
          name: 'b', label: 'B (Blue–Yellow)', min: -128, max: 127, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, lab(${value[0]}, ${value[1]}, -128), lab(${value[0]}, ${value[1]}, 127))`,
        },
      ]
    },
    {
      name: 'lch', label: 'LCH', fields: [
        {
          name: 'l', label: 'Lightness', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, lch(0, ${value[1]}, ${value[2]}), lch(100, ${value[1]}, ${value[2]}))`,
        },
        {
          name: 'c', label: 'Chroma', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, lch(${value[0]}, 0, ${value[2]}), lch(${value[0]}, 100, ${value[2]}))`,
        },
        {
          name: 'h', label: 'Hue', min: 0, max: 360, step: 1,
          getGradient: () => `linear-gradient(to right, lch(50, 50, 0), lch(50, 50, 360))`,
        },
      ]
    },
    {
      name: 'xyz', label: 'XYZ', fields: [
        {
          name: 'x', label: 'X', min: 0, max: 95.047, step: 0.001,
          getGradient: (value: number[]) => `linear-gradient(to right, xyz(0, ${value[1]}, ${value[2]}), xyz(95.047, ${value[1]}, ${value[2]}))`,
        },
        {
          name: 'y', label: 'Y', min: 0, max: 100, step: 0.001,
          getGradient: (value: number[]) => `linear-gradient(to right, xyz(${value[0]}, 0, ${value[2]}), xyz(${value[0]}, 100, ${value[2]}))`,
        },
        {
          name: 'z', label: 'Z', min: 0, max: 108.883, step: 0.001,
          getGradient: (value: number[]) => `linear-gradient(to right, xyz(${value[0]}, ${value[1]}, 0), xyz(${value[0]}, ${value[1]}, 108.883))`,
        },
      ]
    },
    {
      name: 'hwb', label: 'HWB', fields: [
        {
          name: 'h', label: 'Hue', min: 0, max: 360, step: 1,
          getGradient: () => `linear-gradient(to right, hwb(0, 0%, 0%), hwb(360, 0%, 0%))`,
        },
        {
          name: 'w', label: 'Whiteness', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, hwb(${value[0]}, 0%, ${value[2]}%), hwb(${value[0]}, 100%, ${value[2]}%))`,
        },
        {
          name: 'b', label: 'Blackness', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, hwb(${value[0]}, ${value[1]}%, 0%), hwb(${value[0]}, ${value[1]}%, 100%))`,
        },
      ]
    },
    {
      name: 'oklab', label: 'OKLab', fields: [
        {
          name: 'l', label: 'Lightness', min: 0, max: 1, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, oklab(0, ${value[1]}, ${value[2]}), oklab(1, ${value[1]}, ${value[2]}))`,
        },
        {
          name: 'a', label: 'A (Green–Red)', min: -0.5, max: 0.5, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, oklab(${value[0]}, -0.5, ${value[2]}), oklab(${value[0]}, 0.5, ${value[2]}))`,
        },
        {
          name: 'b', label: 'B (Blue–Yellow)', min: -0.5, max: 0.5, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, oklab(${value[0]}, ${value[1]}, -0.5), oklab(${value[0]}, ${value[1]}, 0.5))`,
        },
      ]
    },
    {
      name: 'oklch', label: 'OKLCH', fields: [
        {
          name: 'l', label: 'Lightness', min: 0, max: 1, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, oklch(0, ${value[1]}, ${value[2]}), oklch(1, ${value[1]}, ${value[2]}))`,
        },
        {
          name: 'c', label: 'Chroma', min: 0, max: 1, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, oklch(${value[0]}, 0, ${value[2]}), oklch(${value[0]}, 1, ${value[2]}))`,
        },
        {
          name: 'h', label: 'Hue', min: 0, max: 360, step: 1,
          getGradient: () => `linear-gradient(to right, oklch(0.5, 0.5, 0), oklch(0.5, 0.5, 360))`,
        },
      ]
    },
  ]
