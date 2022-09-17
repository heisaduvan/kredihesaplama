import {useContext} from "react";
import { CreditContext } from "../App";
import "../App.css";

const CreditSummary = () => {
  const paymentPlanInfo = useContext(CreditContext);

  let summary = paymentPlanInfo !== null ? paymentPlanInfo.summary : null;
  let periodText = getPeriodText(summary);
  return (
    summary !== null && (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <td>Toplam Geri Ödeme : </td>
              <td> {summary.toplamGeriOdeme} ₺ </td>
            </tr>
            <tr>
              <td>{periodText} Taksit Tutarı :</td>
              <td> {summary.installmentAmount} ₺</td>
            </tr>
            <tr>
              <td>KKDF :</td>
              <td> {summary.totalKkdf} ₺</td>
            </tr>
            <tr>
              <td>BSMV :</td>
              <td> {summary.totalBsmv} ₺</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

const getPeriodText = (summary) => {
  let periods = {
    7: "Haftalık",
    30: "Aylık",
    365: "Yıllık",
  };

  if (summary === null) return null;

  return periods[summary.period];
};
export { CreditSummary };
