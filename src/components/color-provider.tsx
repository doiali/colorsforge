'use client'

import React, { createContext, useContext, useState } from 'react'
import Color from 'colorjs.io'
import { colorPickers, PickerMode } from '@/components/color-pickers'
import { useParams } from 'next/navigation'

const defaultColor = new Color('hsl', [300, 100, 50])

const ColorContext = createContext<{
  color: Color
  setColor: React.Dispatch<React.SetStateAction<Color>>
  mode1: PickerMode
  mode2: PickerMode
}>({
  color: defaultColor,
  mode1: 'hsl',
  mode2: 'srgb',
  setColor: () => { },
})

const isValid = (slug: string) => colorPickers.some(({ name }) => name === slug)

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [color, setColor] = useState<Color>(defaultColor)
  const { slug = [] } = useParams<{ slug: PickerMode[] }>()
  let mode1 = slug[0] ?? 'hsl'
  if (!isValid(mode1)) mode1 = 'hsl'
  let mode2 = slug[1] ?? (mode1 === 'hsl' ? 'srgb' : 'hsl')
  if (!isValid(mode2)) mode2 = (mode1 === 'hsl' ? 'srgb' : 'hsl')
  return (
    <ColorContext.Provider value={{ color, setColor, mode1, mode2 }}>
      {children}
    </ColorContext.Provider>
  )
}

export const useColor = () => useContext(ColorContext)
