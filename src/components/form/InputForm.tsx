"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLoanInput } from '../context/LoanContext'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { InputNumberWithComma } from './InputNumberWithComma'



const FormFieldSchema = z.object({
  loadAmount: z.number()
    .min(1, {
      message: "This field has to be filled."
    }),
  interestRate: z.number().min(0).max(100),
  year: z.number().int().min(0).max(100),
  month: z.number().int().min(0),
  extraPayment: z.number().min(0),
})


type LoanInput = z.infer<typeof FormFieldSchema>


const InputForm = () => {

  const { updateLoanInput } = useLoanInput()

  const form = useForm<LoanInput>({
    resolver: zodResolver(FormFieldSchema),
    defaultValues: {
      year: 0,
      month: 0,
      extraPayment: 0
    },
    mode: 'onChange'
  });

  function onSubmit(values: LoanInput) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values.month === 0 && values.year === 0) {
      form.setError('month', {
        type: 'manual',
        message: 'Please enter month or year'
      })
      form.setError('year', {
        type: 'manual',
        message: 'Please enter month or year'
      })
    }
    updateLoanInput({
      loanAmount: values.loadAmount,
      interestRate: values.interestRate,
      year: values.year,
      month: values.month,
      extraPayment: values.extraPayment
    })
    // console.log(values)
  }


  const [value, setValue] = useState("")
  function handleChange(event: React.ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<LoanInput>) {
    var removeChar = event.target.value.replace(/[^0-9\.]/g, '') // This is to remove alphabets and special characters.
    var removeDot = removeChar.replace(/\./g, '') // This is to remove "DOT"
    var formatedNumber = removeDot.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    setValue(formatedNumber)
    form.setValue(field.name, +formatedNumber.replace(/,/g, ''))
  }


  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h3>Loan Calculator</h3>

        <FormField
          control={form.control}
          name="loadAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required>ยอดเงินที่ต้องการกู้ *</FormLabel>
              <FormControl>
                <InputNumberWithComma
                  {...field}
                  placeholder='1,000,000.00'
                  afterChange={(value) => form.setValue(field.name, value)}
                />
                {/* <Input
                  type='text'
                  placeholder='1,000,000.00'
                  {...field}
                  value={value}
                  onChange={event => handleChange(event, field)}
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interestRate"
          render={({ field }) => (
            <FormItem >
              <FormLabel aria-required>อัตราดอกเบี้ยต่อปี (%) *</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='5.5%'
                  {...field}
                  value={undefined}
                  onChange={event => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div >
          <h5>
            Loan Term:
          </h5>
          <div className='flex items-center gap-4'>

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='0'
                      {...field}
                      value={undefined}
                      onChange={event => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='0'
                      {...field}
                      value={undefined}
                      onChange={event => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="extraPayment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Extra Payment</FormLabel>
              <FormControl>
                <InputNumberWithComma
                  {...field}
                  placeholder='1,000.00'
                  afterChange={(value) => form.setValue(field.name, value)}
                />
                {/* <Input
                  type='text'
                  placeholder='0'
                  {...field}
                  value={undefined}
                  // onChange={event => field.onChange(+event.target.value)}
                  onChange={event => handleChange(event, field)}

                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default InputForm
