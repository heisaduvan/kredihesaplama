import {useContext, forwardRef, useEffect, useState} from "react";
import { CreditSummaryContext } from "../App";
import "../App.css";

const CreditSummary = (props,ref) => {
  const summary = useContext(CreditSummaryContext); //Kredi özet bilgileri içeren context.
  const [periodText, setPeriodText] = useState(""); //Haftalık, Aylık, Yıllık bilgisi tutulur. Bu bilgiyi CreditCalculateForm component'inin getPeriodText methodu döner.

  useEffect(() => {
    setPeriodText(ref.current.getPeriodText(summary !== null ? summary.period : null));
  })

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

export default forwardRef(CreditSummary);
