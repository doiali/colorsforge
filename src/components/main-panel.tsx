'use client'

import ColorPicker from '@/components/color-picker'
import { useColor } from '@/components/color-provider'
import { TabNav, TabNavLink, TabNavList } from '@/components/ui/tabnav'
import { colorPickers } from '@/components/color-pickers'
import Link from 'next/link'

export default function MainPanel() {
  const { mode1, mode2 } = useColor()
  return (
    <main className="flex flex-col py-12 max-w-2xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        <Link href="/">Colorbitz</Link>
      </h1>
      <p className="text-center mb-4">Comprehensive color picker and color converter tools for modern color spaces</p>
      <div className="flex flex-col mb-16">
        <TabNav>
          <TabNavList className="w-full mb-4">
            {colorPickers.map(({ name, label }) => (
              <TabNavLink active={name === mode1} key={name} asChild className="grow">
                <Link href={`/${name}/${mode2 !== name ? mode2 : mode1}`}>
                  {label}
                </Link>
              </TabNavLink>
            ))}
          </TabNavList>
        </TabNav>
        <ColorPicker mode={mode1} />
      </div>
      <div className="flex flex-col">
        <TabNav>
          <TabNavList className="w-full mb-4">
            {colorPickers.map(({ name, label }) => (
              <TabNavLink active={name === mode2} key={name} asChild className="grow">
                <Link href={`/${mode1 !== name ? mode1 : mode2}/${name}`}>
                  {label}
                </Link>
              </TabNavLink>
            ))}
          </TabNavList>
        </TabNav>
        <ColorPicker mode={mode2} hideHex />
      </div>

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