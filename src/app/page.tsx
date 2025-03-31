'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { colord, HslColor, RgbColor } from 'colord'
import { SetStateAction, useState } from 'react'

type ColorState = {
  source: 'hsl' | 'rgb'
  hsl: HslColor
  rgb: RgbColor
}

export default function Home() {
  const [state, setState] = useState<ColorState>({
    source: 'hsl' as 'hsl' | 'rgb',
    hsl: { h: 0, s: 0, l: 0 },
    rgb: { r: 0, g: 0, b: 0 },
  })
  const { h, s, l } = state.hsl
  const color = state.source === 'hsl' ?
    colord(state.hsl) :
    colord(state.rgb)

  return (
    <main className="flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold">Color Picker</h1>
      <Tabs defaultValue='hsl'>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rgb">RGB</TabsTrigger>
          <TabsTrigger value="hsl">HSL</TabsTrigger>
        </TabsList>
        <TabsContent value="rgb">
          <ColorPickerRGB value={state} onChange={setState} />
        </TabsContent>
        <TabsContent value="hsl">
          <ColorPickerHSL value={state} onChange={setState} />
        </TabsContent>
      </Tabs>
      <div>
        <div className="mt-4 space-y-2 text-center">
          <p><strong>RGB:</strong> {color.toRgbString()}</p>
          <p><strong>HSL:</strong> hsl({h}, {s}%, {l}%)</p>
          <p><strong>Hex:</strong> {color.toHex()}</p>
        </div>
      </div>
    </main>
  )
}

const ColorPickerRGB: React.FC<{
  value: ColorState, onChange: (newState: SetStateAction<ColorState>) => void
}> = ({ value, onChange }) => {
  const { r, g, b } = value.rgb
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange(prev => ({
      ...prev, source: 'rgb' as const,
      rgb: { ...prev.rgb, [name]: +value },
      hsl: colord({ ...prev.rgb, [name]: +value }).toHsl()
    }))
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      <input name="r" type="range" min="0" max="255" value={r} onChange={handleChange} />
      <input name="g" type="range" min="0" max="255" value={g} onChange={handleChange} />
      <input name="b" type="range" min="0" max="255" value={b} onChange={handleChange} />
    </div>
  )
}

const ColorPickerHSL: React.FC<{
  value: ColorState, onChange: (newState: SetStateAction<ColorState>) => void
}> = ({ value, onChange }) => {
  const { h, s, l } = value.hsl
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange(prev => ({
      ...prev, source: 'hsl' as const,
      hsl: { ...prev.hsl, [name]: +value },
      rgb: colord({ ...prev.hsl, [name]: +value }).toRgb()
    }))
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <input name='h' type="range" min="0" max="360" value={h} onChange={handleChange} />
      <input name='s' type="range" min="0" max="100" value={s} onChange={handleChange} />
      <input name='l' type="range" min="0" max="100" value={l} onChange={handleChange} />
    </div>
  )
}
