import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type PickerMode = 'hsl' | 'srgb' | 'lab' | 'lch' | 'xyz' | 'hwb' | 'oklab' | 'oklch' | 'p3'
export const pickerModes = ['hsl', 'srgb', 'lab', 'lch', 'xyz', 'hwb', 'oklab', 'oklch', 'p3'] as const
export const pickers: {
  name: PickerMode
  label: string
  fields: {
    name: string,
    label: string,
    min: number,
    max: number,
    step: number,
    getGradient?: (value: [number, number, number]) => string
  }[]
}[] = [
    {
      name: 'srgb', label: 'sRGB', fields: [
        {
          name: 'r', label: 'Red', min: 0, max: 1, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, rgb(0, ${value[1] * 255}, ${value[2] * 255}), rgb(255, ${value[1] * 255}, ${value[2] * 255}))`,
        },
        {
          name: 'g', label: 'Green', min: 0, max: 1, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, rgb(${value[0] * 255}, 0, ${value[2] * 255}), rgb(${value[0] * 255}, 255, ${value[2] * 255}))`,
        },
        {
          name: 'b', label: 'Blue', min: 0, max: 1, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, rgb(${value[0] * 255}, ${value[1] * 255}, 0), rgb(${value[0] * 255}, ${value[1] * 255}, 255))`,
        },
      ]
    },
    {
      name: 'hsl', label: 'HSL', fields: [
        {
          name: 'h', label: 'Hue', min: 0, max: 360, step: 1,
          getGradient: (value) => `linear-gradient(to right, ${[...Array(361).keys()].map((hue) => `hsl(${hue * 1}, ${value[1]}%, ${value[2]}%)`).join(', ')})`,
        },
        {
          name: 's', label: 'Saturation', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, hsl(${value[0]}, 0%, ${value[2]}%), hsl(${value[0]}, 100%, ${value[2]}%))`,
        },
        {
          name: 'l', label: 'Lightness', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, hsl(${value[0]}, ${value[1]}%, 0%), hsl(${value[0]}, ${value[1]}%, 50%), hsl(${value[0]}, ${value[1]}%, 100%))`,
        },
      ]
    },
    {
      name: 'hwb', label: 'HWB', fields: [
        {
          name: 'h', label: 'Hue', min: 0, max: 360, step: 1,
          getGradient: (value) => `linear-gradient(to right, ${[...Array(361).keys()].map((hue) => `hwb(${hue} ${value[1]} ${value[2]})`).join(', ')})`,
        },
        {
          name: 'w', label: 'Whiteness', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, hwb(${value[0]} 0 ${value[2]}), hwb(${value[0]} 100 ${value[2]}))`,
        },
        {
          name: 'b', label: 'Blackness', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, hwb(${value[0]} ${value[1]} 0), hwb(${value[0]} ${value[1]} 100%))`,
        },
      ]
    },
    {
      name: 'lab', label: 'Lab', fields: [
        {
          name: 'l', label: 'Lightness', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, lab(0% ${value[1]} ${value[2]}), lab(100% ${value[1]} ${value[2]}))`,
        },
        {
          name: 'a', label: 'A', min: -125, max: 125, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, lab(${value[0]} -125 ${value[2]}), lab(${value[0]} 125 ${value[2]}))`,
        },
        {
          name: 'b', label: 'B', min: -125, max: 125, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, lab(${value[0]} ${value[1]} -125), lab(${value[0]} ${value[1]} 125))`,
        },
      ]
    },
    {
      name: 'lch', label: 'LCH', fields: [
        {
          name: 'l', label: 'Lightness', min: 0, max: 100, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, lch(0% ${value[1]} ${value[2]}), lch(100% ${value[1]} ${value[2]}))`,
        },
        {
          name: 'c', label: 'Chroma', min: 0, max: 150, step: 1,
          getGradient: (value: number[]) => `linear-gradient(to right, lch(${value[0]} 0 ${value[2]}), lch(${value[0]} 150 ${value[2]}))`,
        },
        {
          name: 'h', label: 'Hue', min: 0, max: 360, step: 1,
          getGradient: (value) => `linear-gradient(to right, ${[...Array(361).keys()].map((hue) => `lch(${value[0]} ${value[1]} ${hue})`).join(', ')})`,
        },
      ]
    },
    {
      name: 'oklch', label: 'OKLCH', fields: [
        {
          name: 'l', label: 'Lightness', min: 0, max: 1, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, oklch(0 ${value[1]} ${value[2]}), oklch(1 ${value[1]} ${value[2]}))`,
        },
        {
          name: 'c', label: 'Chroma', min: 0, max: 0.4, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, oklch(${value[0]} 0 ${value[2]}), oklch(${value[0]} 0.4 ${value[2]}))`,
        },
        {
          name: 'h', label: 'Hue', min: 0, max: 360, step: 1,
          getGradient: (value) => `linear-gradient(to right, ${[...Array(361).keys()].map((hue) => `oklch(${value[0]} ${value[1]} ${hue})`).join(', ')})`,
        },
      ]
    },
    {
      name: 'oklab', label: 'OKLab', fields: [
        {
          name: 'l', label: 'Lightness', min: 0, max: 1, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, oklab(0 ${value[1]} ${value[2]}), oklab(1 ${value[1]} ${value[2]}))`,
        },
        {
          name: 'a', label: 'A', min: -0.4, max: 0.4, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, oklab(${value[0]} -0.4 ${value[2]}), oklab(${value[0]} 0.4 ${value[2]}))`,
        },
        {
          name: 'b', label: 'B', min: -0.4, max: 0.4, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, oklab(${value[0]} ${value[1]} -0.4), oklab(${value[0]} ${value[1]} 0.4))`,
        },
      ]
    },
    {
      name: 'xyz', label: 'XYZ', fields: [
        {
          name: 'x', label: 'X', min: 0, max: 0.9505, step: 0.0001,
          getGradient: (value: number[]) => `linear-gradient(to right,color(xyz-d65 0 ${value[1]} ${value[2]}),color(xyz-d65 0.9505 ${value[1]} ${value[2]}))`,
        },
        {
          name: 'y', label: 'Y', min: 0, max: 1, step: 0.0001,
          getGradient: (value: number[]) => `linear-gradient(to right,color(xyz-d65 ${value[0]} 0 ${value[2]}),color(xyz-d65 ${value[0]} 1 ${value[2]}))`,
        },
        {
          name: 'z', label: 'Z', min: 0, max: 1.089, step: 0.0001,
          getGradient: (value: number[]) => `linear-gradient(to right,color(xyz-d65 ${value[0]} ${value[1]} 0),color(xyz-d65 ${value[0]} ${value[1]} 1.089))`,
        },
      ]
    },
    {
      name: 'p3', label: 'Display P3', fields: [
        {
          name: 'r', label: 'Red', min: 0, max: 1, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, color(display-p3 0 ${value[1]} ${value[2]}), color(display-p3 1 ${value[1]} ${value[2]}))`,
        },
        {
          name: 'g', label: 'Green', min: 0, max: 1, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, color(display-p3 ${value[0]} 0 ${value[2]}), color(display-p3 ${value[0]} 1 ${value[2]}))`,
        },
        {
          name: 'b', label: 'Blue', min: 0, max: 1, step: 0.01,
          getGradient: (value: number[]) => `linear-gradient(to right, color(display-p3 ${value[0]} ${value[1]} 0), color(display-p3 ${value[0]} ${value[1]} 1))`,
        },
      ]
    },
  ]
