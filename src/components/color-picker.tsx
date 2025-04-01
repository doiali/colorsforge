import { PickerMode, pickerModes, pickers } from '@/lib/utils'
import Color, { Coords } from 'colorjs.io'
import { SetStateAction } from 'react'
import { ColorRange } from './ui/color-range'

type ColorState = {
  source: PickerMode
  color: Color
} & Record<PickerMode, [number, number, number]>

export const getColorsCoords = (newColor: Color) => {
  return pickerModes.map((mode) => {
    return {
      [mode]: newColor.to(mode).coords,
    }
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {}) as Record<PickerMode, [number, number, number]>
}

const ColorPicker: React.FC<{
  state: ColorState,
  onChange: (newState: SetStateAction<ColorState>) => void,
  mode: PickerMode
}> = ({ state, onChange, mode }) => {
  const channels = state[mode]

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    onChange(prev => {
      const newCoords = channels.map((v, i) => (i === index ? +value : v)) as Coords
      const newColor = new Color(mode, newCoords)
      return ({
        ...prev,
        ...getColorsCoords(newColor),
        color: newColor,
        source: mode,
        [mode]: newCoords,
      })
    })
  }

  const { fields } = pickers.find(p => p.name === mode) ?? {}

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
        console.log(name, gradient)
        return (
          <div key={name} className="mb-4">
            <label htmlFor={`${state.source}-${name}-range`} className="flex justify-between">
              {label}: {value}
            </label>
            <ColorRange
              id={`${state.source}-${name}-range`}
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
export type { ColorState }