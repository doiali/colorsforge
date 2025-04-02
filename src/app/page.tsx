'use client'

import ColorPicker, { ColorState, getColorsCoords } from '@/components/color-picker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { pickers } from '@/lib/utils'
import Color from 'colorjs.io'
import { useState } from 'react'

export default function Home() {
  const [state, setState] = useState<ColorState>({
    source: 'hsl',
    color: new Color('hsl', [300, 100, 50]),
    ...getColorsCoords(new Color('hsl', [300, 100, 50])),
  })

  const color = state.color
  console.log(state)

  return (
    <main className="flex flex-col py-12 container max-w-2xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Colorbitz</h1>
      <p className="text-center text-lg mb-4">Comprehensive color picker and color converter tools for modern color spaces</p>
      <Tabs defaultValue='srgb'>
        <TabsList className="grid w-full grid-cols-3">
          {pickers.map((picker) => (
            <TabsTrigger key={picker.name} value={picker.name}>
              {picker.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="pt-6">
          {pickers.map((picker) => (
            <TabsContent key={picker.name} value={picker.name}>
              <ColorPicker state={state} mode={picker.name} onChange={setState} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <div>
        <div
          style={{ backgroundColor: color.toString({ format: 'hex', collapse: false }) }}
          className="mt-4 space-y-2 text-center rounded p-4 py-8 flex justify-center items-center"
        >
          <div className="bg-background/80 rounded px-4">
            <p><strong>RGB:</strong> {color.to('srgb').toString({ precision: 0 })}</p>
            <p><strong>HSL:</strong> {color.to('hsl').toString({ precision: 0 })}</p>
            <p><strong>Hex:</strong> {color.toString({ format: 'hex', collapse: false })}</p>
          </div>
        </div>
      </div>
    </main>
  )
}