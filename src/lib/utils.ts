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
        { name: 'h', label: 'Hue', min: 0, max: 360, step: 1 },
        { name: 's', label: 'Saturation', min: 0, max: 100, step: 1 },
        { name: 'l', label: 'Lightness', min: 0, max: 100, step: 1 },
      ]
    },
    {
      name: 'hex', label: 'Hex', fields: [
        { name: 'hex', label: 'Hex', min: 0, max: 16777215, step: 1 },
      ]
    },
    {
      name: 'cmyk', label: 'CMYK', fields: [
        { name: 'c', label: 'Cyan', min: 0, max: 100, step: 1 },
        { name: 'm', label: 'Magenta', min: 0, max: 100, step: 1 },
        { name: 'y', label: 'Yellow', min: 0, max: 100, step: 1 },
        { name: 'k', label: 'Key (Black)', min: 0, max: 100, step: 1 },
      ]
    },
    {
      name: 'hsv', label: 'HSV', fields: [
        { name: 'h', label: 'Hue', min: 0, max: 360, step: 1 },
        { name: 's', label: 'Saturation', min: 0, max: 100, step: 1 },
        { name: 'v', label: 'Value', min: 0, max: 100, step: 1 },
      ]
    },
    {
      name: 'lab', label: 'Lab', fields: [
        { name: 'l', label: 'Lightness', min: 0, max: 100, step: 1 },
        { name: 'a', label: 'A (Green–Red)', min: -128, max: 127, step: 1 },
        { name: 'b', label: 'B (Blue–Yellow)', min: -128, max: 127, step: 1 },
      ]
    },
    {
      name: 'lch', label: 'LCH', fields: [
        { name: 'l', label: 'Lightness', min: 0, max: 100, step: 1 },
        { name: 'c', label: 'Chroma', min: 0, max: 100, step: 1 },
        { name: 'h', label: 'Hue', min: 0, max: 360, step: 1 },
      ]
    },
    {
      name: 'xyz', label: 'XYZ', fields: [
        { name: 'x', label: 'X', min: 0, max: 95.047, step: 0.001 },
        { name: 'y', label: 'Y', min: 0, max: 100, step: 0.001 },
        { name: 'z', label: 'Z', min: 0, max: 108.883, step: 0.001 },
      ]
    },
    {
      name: 'hwb', label: 'HWB', fields: [
        { name: 'h', label: 'Hue', min: 0, max: 360, step: 1 },
        { name: 'w', label: 'Whiteness', min: 0, max: 100, step: 1 },
        { name: 'b', label: 'Blackness', min: 0, max: 100, step: 1 },
      ]
    },
    {
      name: 'oklab', label: 'OKLab', fields: [
        { name: 'l', label: 'Lightness', min: 0, max: 1, step: 0.01 },
        { name: 'a', label: 'A (Green–Red)', min: -0.5, max: 0.5, step: 0.01 },
        { name: 'b', label: 'B (Blue–Yellow)', min: -0.5, max: 0.5, step: 0.01 },
      ]
    },
    {
      name: 'oklch', label: 'OKLCH', fields: [
        { name: 'l', label: 'Lightness', min: 0, max: 1, step: 0.01 },
        { name: 'c', label: 'Chroma', min: 0, max: 1, step: 0.01 },
        { name: 'h', label: 'Hue', min: 0, max: 360, step: 1 },
      ]
    },
  ]
