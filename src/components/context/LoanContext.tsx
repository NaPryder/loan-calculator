"use client"
import { createContext, useContext, useState } from "react";

interface LoanInput {
  loanAmount: number;
  interestRate: number;
  year: number;
  month: number;
  extraPayment: number;
}

interface LoanContextType {
  data: LoanInput;
  updateLoanInput: (newLoanInput: LoanInput) => void;
}
const LoanInputContext = createContext<LoanContextType>({
  data: {
    loanAmount: 0,
    interestRate: 0,
    year: 0,
    month: 0,
    extraPayment: 0,
  },
  updateLoanInput: (input: LoanInput) => { },
});


export function LoanContextProvider({ children }: { children: React.ReactNode }) {

  const [loanInput, setLoanInput] = useState<LoanInput>({
    loanAmount: 0,
    interestRate: 0,
    year: 0,
    month: 0,
    extraPayment: 0,
  })
  function updateLoanInput(newLoanInput: LoanInput) {
    setLoanInput((prev) => ({
      ...prev,
      ...newLoanInput,
    }));
  }

  return (
    <LoanInputContext.Provider value={{
      data: loanInput,
      updateLoanInput,
    }}>
      {children}
    </LoanInputContext.Provider>
  );
}

export const useLoanInput = () => useContext(LoanInputContext);
