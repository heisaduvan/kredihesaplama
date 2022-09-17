import { useState, createContext, useRef } from "react";
import CreditCalculateForm from "./components/CreditCalculateForm";
import CreditSummary from "./components/CreditSummary";
import { PaymentPlan } from "./components/PaymentPlan";
import { TaxInformation } from "./components/TaxInformation";
import "./App.css";

export const CreditSummaryContext = createContext(null);
export const PaymentPlanContext = createContext(null);

function App() {
  const [creditSummary, setCreditSummary] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState(null);

  const formRef = useRef();

  const handleCalculate = (creditSummary, paymentPlan) => {
    setCreditSummary(creditSummary);
    setPaymentPlan(paymentPlan);
  };

  return (
    <div className="App">
      <h1>Kredi Hesaplama</h1>
      <CreditSummaryContext.Provider value={creditSummary}>
        <PaymentPlanContext.Provider value={paymentPlan}>
          <CreditCalculateForm
            handleCalculateCredit={handleCalculate}
            ref = {formRef}
          ></CreditCalculateForm>
          <PaymentPlan></PaymentPlan>
          <TaxInformation />
          <CreditSummary ref = {formRef}></CreditSummary>
        </PaymentPlanContext.Provider>
      </CreditSummaryContext.Provider>
    </div>
  );
}

export default App;
