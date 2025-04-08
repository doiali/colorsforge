'use client'

import { PickerMode } from '@/components/color-pickers'
import Color from 'colorjs.io'
import { useColor } from './color-provider'
import { Input } from './ui/input'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Check, Clipboard } from 'lucide-react'
import { Button } from './ui/button'

const ColorInput: React.FC<{ mode?: PickerMode } & React.ComponentProps<"input">> = ({
  mode, className, ...rest
}) => {
  const { color, setColor } = useColor()
  const getInitialValue = useCallback(() => {
    return mode
      ? color.to(mode).toString({ precision: 3 })
      : color.to('sRGB').toString({ format: 'hex', collapse: false })
  }, [mode, color])

  const [{ value, error, copied }, setState] = useState({
    value: getInitialValue(),
    error: false,
    copied: false,
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
        copied: false,
      }
    })
  }, [color, mode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    try {
      const newColor = new Color(value)
      setState({ error: false, value, copied: false })
      setColor(newColor)
    }
    catch (error) {
      console.warn('Invalid color input:', error)
      setState({ error: true, value, copied: false })
    }
  }

  const handleInputBlur = () => {
    setState(prev => ({
      ...prev,
      value: prev.error ? prev.value : getInitialValue(),
    }))
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      console.log('Copied to clipboard');
      setState(prev => ({ ...prev, copied: true }));
      setTimeout(() => {
        setState(prev => ({ ...prev, copied: false }));
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        name={mode}
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onSubmit={handleInputBlur}
        className={cn(
          "w-full text-center shadow-color-input pr-10", // Add padding-right for the button
          { 
            'bg-red-500/10 dark:bg-red-500/10 text-red-500': error,
          },
          className,
        )}
        {...rest}
      />
      <Button
        type="button"
        onClick={handleCopy}
        className={cn("absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer hover:bg-foreground/10")}
        title="Copy"
        size={"icon"}
        variant="ghost"
      >
        {copied ? <Check className="text-green-500 h-6 w-6" /> : <Clipboard  />}
      </Button>
    </div>
  )
}

export default ColorInput