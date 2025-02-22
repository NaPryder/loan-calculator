"use client"

import React, { useEffect } from 'react'
import { useLoanInput } from '../context/LoanContext'
import { DataTable } from './data-table'
import { columns, PaymentRecord } from './column'


const PaymentTable = () => {

  const { data, getPaymentRecord } = useLoanInput()

  const payments: PaymentRecord[] = getPaymentRecord(data)
  return (
    <div className='w-full h-full '>
      <h1>Payment term: {data.paymentTerm}</h1>
      <pre>
        {JSON.stringify(data, null, 4)}
      </pre>

      <DataTable
        columns={columns}
        data={payments}
      />
    </div>
  )
}

export default PaymentTable
