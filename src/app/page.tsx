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
    <main className="flex flex-col py-12 container max-w-2xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Color Picker</h1>
      <Tabs defaultValue='hsl'>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rgb">RGB</TabsTrigger>
          <TabsTrigger value="hsl">HSL</TabsTrigger>
        </TabsList>
        <div className="pt-6">
          <TabsContent value="rgb">
            <ColorPickerRGB value={state} onChange={setState} />
          </TabsContent>
          <TabsContent value="hsl">
            <ColorPickerHSL value={state} onChange={setState} />
          </TabsContent>
        </div>
      </Tabs>
      <div>
        <div
          style={{ backgroundColor: color.toHex() }}
          className="mt-4 space-y-2 text-center rounded p-4 py-8 flex justify-center items-center"
        >
          <div className="bg-background/80 rounded px-4">
            <p><strong>RGB:</strong> {color.toRgbString()}</p>
            <p><strong>HSL:</strong> hsl({h}, {s}%, {l}%)</p>
            <p><strong>Hex:</strong> {color.toHex()}</p>
          </div>
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
    <div className="flex flex-col">
      <label htmlFor="rgb-r-range" className="flex justify-between">R (Red) <span className="inline-flex h-6 w-6" style={{ backgroundColor: `rgb(${r},0,0)` }} /></label>
      <input
        id="rgb-r-range"
        className="mb-4 appearance-none mt-1 w-full h-2 rounded-lg"
        name="r"
        type="range"
        min="0"
        max="255"
        value={r}
        onChange={handleChange}
        style={{
          background: 'linear-gradient(to right, black, red)',
        }}
      />
      <label htmlFor="rgb-g-range" className="flex justify-between">G (Green) <span className="inline-flex h-6 w-6" style={{ backgroundColor: `rgb(0,${g},0)` }} /></label>
      <input
        id="rgb-g-range"
        className="mb-4 appearance-none mt-1 w-full h-2 rounded-lg"
        name="g"
        type="range"
        min="0"
        max="255"
        value={g}
        onChange={handleChange}
        style={{
          background: 'linear-gradient(to right, black, green)',
        }}
      />
      <label htmlFor="rgb-b-range" className="flex justify-between">B (Blue) <span className="inline-flex h-6 w-6" style={{ backgroundColor: `rgb(0,0,${b})` }} /></label>
      <input
        id="rgb-b-range"
        className="mb-4 appearance-none mt-1 w-full h-2 rounded-lg"
        name="b"
        type="range"
        min="0"
        max="255"
        value={b}
        onChange={handleChange}
        style={{
          background: 'linear-gradient(to right, black, blue)',
        }}
      />
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
    <div className="flex flex-col">
      <label htmlFor="hsl-h-range" className="flex justify-between">H (Hue) <span className="inline-flex h-6 w-6" style={{ backgroundColor: `hsl(${h},100%,50%)` }} /></label>
      <input
        id="hsl-h-range"
        className="mb-4 appearance-none mt-1 w-full h-2 rounded-lg"
        name="h"
        type="range"
        min="0"
        max="360"
        value={h}
        onChange={handleChange}
        style={{
          background: 'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)',
        }}
      />
      <label htmlFor="hsl-s-range" className="flex justify-between">S (Saturation) <span className="inline-flex h-6 w-6" style={{ backgroundColor: `hsl(${h},${s}%,50%)` }} /></label>
      <input
        id="hsl-s-range"
        className="mb-4 appearance-none mt-1 w-full h-2 rounded-lg"
        name="s"
        type="range"
        min="0"
        max="100"
        value={s}
        onChange={handleChange}
        style={{
          background: `linear-gradient(to right, hsl(${h},0%,50%), hsl(${h},100%,50%))`,
        }}
      />
      <label htmlFor="hsl-l-range" className="flex justify-between">L (Lightness) <span className="inline-flex h-6 w-6" style={{ backgroundColor: `hsl(${h},100%,${l}%)` }} /></label>
      <input
        id="hsl-l-range"
        className="mb-4 appearance-none mt-1 w-full h-2 rounded-lg"
        name="l"
        type="range"
        min="0"
        max="100"
        value={l}
        onChange={handleChange}
        style={{
          background: `linear-gradient(to right, black, hsl(${h},100%,50%), white)`,
        }}
      />
    </div>
  )
}
