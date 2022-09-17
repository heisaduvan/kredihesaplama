const BSMV = 0.1;
const KKDF = 0.15;

export const calculatePaymentPlan = (
  creditAmount,
  installmentCount,
  interestRate,
  period
) => {
  let interestRateWithTax = ((1 + BSMV + KKDF) * interestRate) / 100;
  let installmentAmount =
    +parseFloat((creditAmount *
    ((interestRateWithTax *
      Math.pow(interestRateWithTax + 1, installmentCount)) /
      (Math.pow(1 + interestRateWithTax, installmentCount) - 1))).toFixed(2));

  let bsmvAmounts = [];
  let kkdfAmounts = [];
  let interestAmounts = [];
  let monthlyCreditAmountsWithoutTaxAndInterest = [];
  let monthlyCreditAmountsAfterPayment = [];
  let previousCreditAmount = creditAmount;

  for (let i = 1; i <= installmentCount; i++) {
    let interest = +parseFloat((previousCreditAmount * (interestRate / 100) * (period / 30)).toFixed(2));
    let bsmvAmount = +parseFloat((interest * BSMV).toFixed(2));
    let kkdfAmount = +parseFloat((interest * KKDF).toFixed(2));
    let anapara = +parseFloat((installmentAmount - interest - bsmvAmount - kkdfAmount).toFixed(2));
    let kalanAnaPara = +parseFloat((previousCreditAmount - anapara).toFixed(2));
    previousCreditAmount = kalanAnaPara;

    if(i === installmentCount){
      anapara += kalanAnaPara;
      previousCreditAmount = 0;
    }

    bsmvAmounts.push(bsmvAmount);
    kkdfAmounts.push(kkdfAmount);
    interestAmounts.push(interest);
    monthlyCreditAmountsWithoutTaxAndInterest.push(anapara);
    monthlyCreditAmountsAfterPayment.push(previousCreditAmount);
  }

  let creditSummary = {
    summary : {
      toplamGeriOdeme: +parseFloat((installmentAmount * installmentCount).toFixed(2)),
      totalBsmv: +parseFloat((bsmvAmounts.reduce((a, b) => a + b, 0)).toFixed(2)),
      totalKkdf: +parseFloat((kkdfAmounts.reduce((a, b) => a + b, 0)).toFixed(2)),
      installmentAmount: installmentAmount,
      installmentCount: installmentCount,
      period: period
    },
    paymentPlan : {
      bsmvAmounts: bsmvAmounts,
      kkdfAmounts: kkdfAmounts,
      interestAmounts: interestAmounts,
      monthlyCreditAmountsWithoutTaxAndInterest:
        monthlyCreditAmountsWithoutTaxAndInterest,
      monthlyCreditAmountsAfterPayment: monthlyCreditAmountsAfterPayment,
      installmentAmount: installmentAmount
    }
  };

  return creditSummary;
};
