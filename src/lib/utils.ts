import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type PickerMode = 'hsl' | 'srgb' | 'hsv' | 'lab' | 'lch' | 'xyz' | 'hwb' | 'oklab' | 'oklch'
export const pickerModes = ['hsl', 'srgb', 'hsv', 'lab', 'lch', 'xyz', 'hwb', 'oklab', 'oklch'] as const
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
  ]
