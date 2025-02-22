"use client"
import { createContext, useContext, useState } from "react";
import { PaymentRecord } from "../Payments/column";

interface LoanInput {
  loanAmount: number;
  interestRate: number;
  year: number;
  month: number;
  extraPayment: number;
  paymentAmount: number;
  paymentTerm: number;
}

interface LoanContextType {
  data: LoanInput;
  updateLoanInput: (newLoanInput: Omit<LoanInput, "paymentAmount" | "paymentTerm">) => void;
  getPaymentRecord: (data: LoanInput) => PaymentRecord[] | any[];
}
const LoanInputContext = createContext<LoanContextType>({
  data: {
    loanAmount: 0,
    interestRate: 0,
    year: 0,
    month: 0,
    extraPayment: 0,
    paymentAmount: 0,
    paymentTerm: 0,
  },
  updateLoanInput: (input: Omit<LoanInput, "paymentAmount" | "paymentTerm">) => { },
  getPaymentRecord: (data: LoanInput) => [],
});


export function LoanContextProvider({ children }: { children: React.ReactNode }) {

  const [loanInput, setLoanInput] = useState<LoanInput>({
    loanAmount: 0,
    interestRate: 0,
    year: 0,
    month: 0,
    extraPayment: 0,
    paymentAmount: 0,
    paymentTerm: 0
  })

  function pmt(loanAmount: number, interestRate: number, year: number, month: number) {
    const paymentTerm = (year * 12) + month
    const i = (interestRate / 12) / 100
    const paymentAmount = loanAmount * i * (Math.pow((1 + i), paymentTerm)) / (Math.pow((1 + i), paymentTerm) - 1)
    return {
      paymentTerm,
      paymentAmount
    }
  }

  function updateLoanInput(newLoanInput: Omit<LoanInput, "paymentAmount" | "paymentTerm">) {
    setLoanInput((prev) => ({
      ...prev,
      ...newLoanInput,
      ...pmt(newLoanInput.loanAmount, newLoanInput.interestRate, newLoanInput.year, newLoanInput.month)
    }));
  }

  function getPaymentRecord(data: LoanInput): PaymentRecord[] {
    let payments: PaymentRecord[] = []
    let initialAmount = data.loanAmount
    let leftAmount = initialAmount
    for (let i = 0; i < data.paymentTerm; i++) {
      const interest = leftAmount * (data.interestRate / 12) / 100
      let principal = data.paymentAmount - interest
      if (leftAmount < principal) {
        leftAmount = 0
      }

      leftAmount -= (principal + data.extraPayment)
      payments.push({
        month: i + 1,
        payment: data.paymentAmount,
        interest,
        principal,
        extraPayment: data.extraPayment,
        initialAmount,
        leftAmount,
      })
    }

    return payments
  }

  return (
    <LoanInputContext.Provider value={{
      data: loanInput,
      updateLoanInput,
      getPaymentRecord,
    }}>
      {children}
    </LoanInputContext.Provider>
  );
}

export const useLoanInput = () => useContext(LoanInputContext);
