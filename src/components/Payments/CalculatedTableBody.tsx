import React from 'react'
import { PaymentRecord } from './column'
import { TableCell, TableRow } from '../ui/table'
import { ColumnDef, flexRender, Row } from '@tanstack/react-table'


interface Props<TData, TValue> {
  rows: Row<TData>[],
  columns: ColumnDef<TData, TValue>[],
}

export function CalculatedTableBody<PaymentRecord, TValue>({
  columns,
  rows,
}: Props<PaymentRecord, TValue>
) {



  const initialPlan = rows.map((row) => (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
    >
      {JSON.stringify(row, null, 2)}
      {/* {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
      fffffff */}

    </TableRow>
  ))




  return (
    <>
      {
        rows?.length
          ? (
            <>
              {initialPlan}
            </>
          )
          : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )

      }

    </>
  )
}

