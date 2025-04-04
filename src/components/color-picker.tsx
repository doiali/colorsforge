'use client'

import { PickerMode, colorPickers } from '@/components/color-pickers'
import Color, { Coords } from 'colorjs.io'
import { ColorRange } from './ui/color-range'
import { useColor } from './color-provider'
import { Input } from './ui/input'

type ColorPickerProps = {
  mode: PickerMode
}

const ColorPicker: React.FC<ColorPickerProps> = ({ mode }) => {
  const { color, setColor } = useColor()
  const channels = color.to(mode).coords as Coords
  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setColor(prev => {
      const newCoords = prev.to(mode).coords.map((v, i) => (i === index ? +value : v)) as Coords
      return new Color(mode, newCoords)
    })
  }

  const { fields } = colorPickers.find(p => p.name === mode) ?? {}

  return (
    <div
      className="flex flex-col gap-2"
      style={{
        '--coord-0': channels[0].toString(),
        '--coord-1': channels[1].toString(),
        '--coord-2': channels[2].toString(),
      } as React.CSSProperties}
    >
      {fields?.map((field, index) => {
        const { name, label, min, max, step } = field
        const value = channels[index]
        const gradient = field.getGradient?.(channels)

        return (
          <div key={name} className="flex items-center gap-2">
            <label title={label} htmlFor={`${mode}-${name}-range`} className="w-4 shrink-0">
              {name}
            </label>
            {/* <div
              className="absolute top-0 bottom-0"
              style={{
                left: `${validMin * 100}%`,
                right: `${100 - validMax * 100}%`,
                borderLeft: '2px solid red',
                borderRight: '2px solid red',
              }}
            /> */}
            <ColorRange
              id={`${mode}-${name}-range`}
              className="appearance-none"
              name={name}
              min={min}
              max={max}
              step={step}
              value={Math.round(value / step) / (1 / step)}
              onChange={handleChange(index)}
              style={{
                background: gradient,
              }}
            />
            <Input
              id={`${mode}-${name}-input`}
              type="number"
              className="w-20 h-7 ps-2 pe-0"
              name={name}
              min={min}
              max={max}
              step={step}

              value={Math.round(value / step) / (1 / step)}
              onChange={handleChange(index)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ColorPicker