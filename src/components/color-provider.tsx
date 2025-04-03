'use client'

import React, { createContext, useContext, useState } from 'react'
import Color from 'colorjs.io'
import { PickerMode } from '@/lib/pickers'
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

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [color, setColor] = useState<Color>(defaultColor)
  const { slug = [] } = useParams<{ slug: PickerMode[] }>()
  const mode1 = slug[0] ?? 'hsl'
  const mode2 = slug[1] ?? (mode1 === 'hsl' ? 'srgb' : 'hsl')
  return (
    <ColorContext.Provider value={{ color, setColor, mode1, mode2 }}>
      {children}
    </ColorContext.Provider>
  )
}

export const useColor = () => useContext(ColorContext)
