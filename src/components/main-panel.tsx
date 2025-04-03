'use client'

import ColorPicker from '@/components/color-picker'
import { useColor } from '@/components/color-provider'
import { TabNav, TabNavLink, TabNavList } from '@/components/ui/tabnav'
import { pickers } from '@/lib/pickers'
import Link from 'next/link'

export default function MainPanel() {
  const { state, setState, mode1, mode2 } = useColor()
  return (
    <main className="flex flex-col py-12 container max-w-2xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Colorbitz</h1>
      <p className="text-center text-lg mb-4">Comprehensive color picker and color converter tools for modern color spaces</p>
      <TabNav>
        <TabNavList className="w-full mb-4">
          {pickers.map(({ name, label }) => (
            <TabNavLink active={name === mode1} key={name} asChild className="grow">
              <Link href={`/${name}`}>
                {label}
              </Link>
            </TabNavLink>
          ))}
        </TabNavList>
      </TabNav>
      <ColorPicker state={state} onChange={setState} mode={mode1} />
      <TabNav>
        <TabNavList className="w-full mb-4">
          {pickers.map(({ name, label }) => (
            <TabNavLink active={name === mode2} key={name} asChild className="grow">
              <Link href={`/${mode1}/${name}`}>
                {label}
              </Link>
            </TabNavLink>
          ))}
        </TabNavList>
      </TabNav>
      <ColorPicker state={state} onChange={setState} mode={mode2} />

      <div>
        {/* <div
          style={{ backgroundColor: color.toString({ format: 'hex', collapse: false }) }}
          className="mt-4 space-y-2 text-center rounded p-4 py-8 flex justify-center items-center"
        >
          <div className="bg-background/80 rounded px-4">
            <p><strong>RGB:</strong> {color.to('srgb').toString({ precision: 0 })}</p>
            <p><strong>HSL:</strong> {color.to('hsl').toString({ precision: 0 })}</p>
            <p><strong>Hex:</strong> {color.toString({ format: 'hex', collapse: false })}</p>
          </div>
        </div> */}
      </div>
    </main>
  )
}