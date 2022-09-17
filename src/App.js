import { useState, createContext } from "react";
import { CreditCalculateForm } from "./components/CreditCalculateForm";
import { CreditSummary } from "./components/CreditSummary";
import { PaymentPlan } from "./components/PaymentPlan";
import { TaxInformation } from "./components/TaxInformation";
import "./App.css";

export const CreditContext = createContext(null);

function App() {
  const [creditPaymentPlanInfos, setCreditPaymentPlanInfos] = useState(null);

  const handleCalculate = (info) => {
    setCreditPaymentPlanInfos(info);
  };

  return (
    <div className="App">
      <h1>Kredi Hesaplama</h1>
      <CreditContext.Provider value={creditPaymentPlanInfos}>
        <CreditCalculateForm
          handleCalculateCredit={handleCalculate}
        ></CreditCalculateForm>
        <PaymentPlan></PaymentPlan>
        <TaxInformation />
        <CreditSummary paymentPlanInfo={creditPaymentPlanInfos}></CreditSummary>
      </CreditContext.Provider>
    </div>
  );
}

export default App;
