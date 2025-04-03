'use client'

import React, { createContext, useContext, useState } from 'react'
import Color from 'colorjs.io'
import { ColorState } from './color-picker'
import { PickerMode } from '@/lib/pickers'
import { useParams } from 'next/navigation'

const defaultColor = new Color('hsl', [300, 100, 50])

const ColorContext = createContext<{
  state: ColorState
  setState: React.Dispatch<React.SetStateAction<ColorState>>
  mode1: PickerMode
  mode2: PickerMode
}>({
  state: {
    color: defaultColor,
  },
  mode1: 'hsl',
  mode2: 'srgb',
  setState: () => { },
})

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ColorState>({
    color: defaultColor,
  })
  const { slug = [] } = useParams<{ slug: PickerMode[] }>()
  const mode1 = slug[0] ?? 'hsl'
  const mode2 = slug[1] ?? (mode1 === 'hsl' ? 'srgb' : 'hsl')
  return (
    <ColorContext.Provider value={{ state, setState, mode1, mode2 }}>
      {children}
    </ColorContext.Provider>
  )
}

export const useColor = () => useContext(ColorContext)
