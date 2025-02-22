"use client"
import { LoanContextProvider } from "@/components/context/LoanContext";
import InputForm from "@/components/form/InputForm";
import PaymentTable from "@/components/Payments/PaymentTable";

export default function Home() {
  return (
    <LoanContextProvider>
      <main className="w-full max-w-4xl p-4 mx-auto">
        <InputForm />
        <PaymentTable />

      </main>
    </LoanContextProvider>
  );
}
