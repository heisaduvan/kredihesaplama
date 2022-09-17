import { useState, useEffect, createContext, forwardRef, useImperativeHandle } from "react";
import { calculatePaymentPlan } from "../tools/CalculateCreditPaymentPlan";
import "../App.css"

export const CreditContext = createContext(null);

const CreditCalculateForm = (props, formRef) => {
  const [creditAmount, setCreditAmount] = useState();
  const [installmentCount, setInstallmentCount] = useState();
  const [interestRate, setInterestRate] = useState();
  const [period, setPeriod] = useState(7);

  const isNumber = (event) => {
    if (event.which < 48 || event.which > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  };

  useEffect(() => {
    props.handleCalculateCredit(null, null);
  }, [creditAmount, installmentCount, interestRate, period]);

  const calculateSummary = () => {
    alert("Calculate Summary");
  };

  const calculatePaymentPlan2 = () => {
    alert("Calculate Payment Plan");
  }

  useImperativeHandle(formRef, () => {
    return {
      calculateSummary: () => calculateSummary(),
      calculatePaymentPlan: () => calculatePaymentPlan2()
    }
  });

  const handleSubmit = (e) => { 
    e.preventDefault();
    let result = calculatePaymentPlan(Number(creditAmount),Number(installmentCount), Number(interestRate), Number(period));
    props.handleCalculateCredit(result.summary, result.paymentPlan);
  };

  return (
    <div className="calculateForm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="divForm"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <label>
            Kredi Tutarı :
            <input
              type="decimal"
              value={creditAmount}
              name="creditAmount"
              placeholder="25.000"
              onKeyPress={(e) => isNumber(e)}
              onChange={(e) => setCreditAmount(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>
            {" "}
            Taksit Sayısı :
            <input
              type="number"
              value={installmentCount}
              name="installmentCount"
              placeholder="36"
              onKeyPress={(e) => isNumber(e)}
              onChange={(e) => setInstallmentCount(e.target.value)}
              required
            />
          </label>
          <br></br>

          <label>
            {" "}
            Kar Oranı(%) :
            <input
              type="decimal"
              value={interestRate}
              name="interestRate"
              placeholder="1.75"
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
          </label>
          <br></br>

          <label>
            {" "}
            Taksit Aralığı :
            <select
              type="combo"
              value={period}
              name="period"
              onChange={(e) => setPeriod(e.target.value)}
              required
            >
              <option value={7}>Haftalık</option>
              <option value={30}>Aylık</option>
              <option value={365}>Yıllık</option>
            </select>
          </label>
          <br></br>

          <button
            type="submit"
          >
            Hesapla
          </button>
        </div>
      </form>
    </div>
  );
}

export default forwardRef(CreditCalculateForm);