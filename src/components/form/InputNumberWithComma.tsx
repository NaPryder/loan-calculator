"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'

interface ExtendedInputProps extends React.ComponentProps<"input"> {
  afterChange: (value: number) => void;
}

export const InputNumberWithComma = React.forwardRef<
  HTMLInputElement,
  ExtendedInputProps
>(
  ({ afterChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState("")
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      var removeChar = event.target.value.replace(/[^0-9\.]/g, '') // This is to remove alphabets and special characters.
      var removeDot = removeChar.replace(/\./g, '') // This is to remove "DOT"
      var formatedNumber = removeDot.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      setDisplayValue(formatedNumber)
      afterChange(+formatedNumber.replace(/,/g, ''))
      // form.setValue(field.name, +formatedNumber.replace(/,/g, ''))
    }
    return (
      <Input
        type='text'
        placeholder={props.placeholder}
        {...props}
        value={displayValue}
        onChange={event => handleChange(event)}
      />
    )
  }
)


