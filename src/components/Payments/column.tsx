"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatAmount } from "../helpers/number"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PaymentRecord = {
  month: number,
  payment: number,
  interest: number,
  principal: number,
  extraPayment: number,
  initialAmount: number,
  leftAmount: number,
}

export const columns: ColumnDef<PaymentRecord>[] = [
  {
    accessorKey: "month",
    header: "งวด",
  },
  {
    accessorKey: "initialAmount",
    header: "เงินต้นงวด",
    cell: ({ row }) => <FormatCellAmount amount={row.original.initialAmount} />
  },
  {
    accessorKey: "payment",
    header: "ยอดชำระ",
    cell: ({ row }) => <FormatCellAmount amount={row.original.payment} />

  },
  {
    accessorKey: "interest",
    header: "ดอกเบี้ย",
    cell: ({ row }) => <FormatCellAmount amount={row.original.interest} />
  },
  {
    accessorKey: "principal",
    header: "เงินต้น",
    cell: ({ row }) => <FormatCellAmount amount={row.original.principal} />
  },
  {
    accessorKey: "extraPayment",
    header: "Extra",
    cell: ({ row }) => <FormatCellAmount amount={row.original.extraPayment} />
  },

  {
    accessorKey: "leftAmount",
    header: "คงเหลือ",
    cell: ({ row }) => <FormatCellAmount amount={row.original.leftAmount} />

  },
]

const FormatCellAmount = ({ amount }: { amount: number }) => {
  return (
    <div className="text-right">
      {formatAmount(amount)}
    </div>
  )
}

// const CellHeader = ({ header }: { header: string }) => {
//   return (

//   )
// }