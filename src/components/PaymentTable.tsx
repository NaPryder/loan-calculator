import React from 'react'
import { useLoanInput } from './context/LoanContext'

const PaymentTable = () => {

  const { data } = useLoanInput()

  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 4)}
      </pre>
    </div>
  )
}

export default PaymentTable
