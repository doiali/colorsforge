'use client'

import { PickerMode } from '@/components/color-pickers'
import Color from 'colorjs.io'
import { useColor } from './color-provider'
import { Input } from './ui/input'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'


const ColorInput: React.FC<{ mode?: PickerMode } & React.ComponentProps<"input">> = ({
  mode, className, ...rest
}) => {
  const { color, setColor } = useColor()
  const getInitialValue = useCallback(() => {
    return mode
      ? color.to(mode).toString({ precision: 3 })
      : color.to('sRGB').toString({ format: 'hex', collapse: false })
  }, [mode, color])

  const [{ value, error }, setState] = useState({
    value: getInitialValue(),
    error: false,
  })

  useEffect(() => {
    setState(prev => {
      let isSameColor = false
      try {
        isSameColor = (new Color(prev.value)).toString() === color.toString()
      } catch (error) {
        console.warn('Invalid color input:', error)
      }
      return {
        value: isSameColor
          ? prev.value
          : mode
            ? color.to(mode).toString({ precision: 3 })
            : color.to('sRGB').toString({ format: 'hex', collapse: false }),
        error: false,
      }
    })
  }, [color, mode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    try {
      const newColor = new Color(value)
      setState({ error: false, value })
      setColor(newColor)
    }
    catch (error) {
      console.warn('Invalid color input:', error)
      setState({ error: true, value })
    }
  }

  const handleInputBlur = () => {
    setState(prev => ({
      ...prev,
      value: prev.error ? prev.value : getInitialValue(),
    }))
  }

  return (
    <Input
      type="text"
      name={mode}
      value={value}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      onSubmit={handleInputBlur}
      className={cn(
        "w-full text-center shadow-color-input",
        { 'bg-red-500/10 dark:bg-red-500/10 text-red-500': error },
        className,
      )}
      {...rest}
    />
  )
}

export default ColorInput