'use client'

import { PickerMode, colorPickers } from '@/components/color-pickers'
import Color, { Coords } from 'colorjs.io'
import { SetStateAction } from 'react'
import { ColorRange } from './ui/color-range'

type ColorPickerProps = {
  value: Color
  onChange: (newColor: SetStateAction<Color>) => void
  mode: PickerMode
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value: color, onChange, mode }) => {
  const channels = color.to(mode).coords as Coords
  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    onChange(prev => {
      const newCoords = prev.to(mode).coords.map((v, i) => (i === index ? +value : v)) as Coords
      return new Color(mode, newCoords)
    })
  }

  const { fields } = colorPickers.find(p => p.name === mode) ?? {}

  return (
    <div
      className="flex flex-col"
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
          <div key={name} className="mb-4">
            <label htmlFor={`${mode}-${name}-range`} className="flex justify-between">
              {label}: {value}
            </label>
            <ColorRange
              id={`${mode}-${name}-range`}
              className="appearance-none mt-1"
              name={name}
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleChange(index)}
              style={{
                background: gradient,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ColorPicker