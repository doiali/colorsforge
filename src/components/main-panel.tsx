'use client'

import ColorPicker from '@/components/color-picker'
import { useColor } from '@/components/color-provider'
import { TabNav, TabNavLink, TabNavList } from '@/components/ui/tabnav'
import { colorPickers } from '@/components/color-pickers'
import Link from 'next/link'

export default function MainPanel() {
  const { mode1, mode2 } = useColor()
  const field1 = colorPickers.find(({ name }) => name === mode1)
  const field2 = colorPickers.find(({ name }) => name === mode2)
  return (
    <main className="flex flex-col py-12 max-w-2xl mx-auto px-2">
      <h1 className="text-4xl font-bold mb-4 text-center">
        <Link href="/">ColorsForge</Link>
      </h1>
      <p className="text-center mb-8">Comprehensive color picker and color converter tools for modern color spaces</p>
      <div className="flex flex-col">
        <TabNav>
          <TabNavList className="w-full mb-2 overflow-x-auto overflow-y-hidden ">
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
      <p className="my-9 text-center text-lg">
        Convert <b>{field1?.label}</b> to <b>{field2?.label}</b>:
      </p>
      <div className="flex flex-col">
        <TabNav>
          <TabNavList className="w-full mb-2">
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
    </main>
  )
}