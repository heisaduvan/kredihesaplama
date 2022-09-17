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
    creditAmount *
    ((interestRateWithTax *
      Math.pow(interestRateWithTax + 1, installmentCount)) /
      (Math.pow(1 + interestRateWithTax, installmentCount) - 1));

  let bsmvAmounts = [];
  let kkdfAmounts = [];
  let interestAmounts = [];
  let monthlyCreditAmountsWithoutTaxAndInterest = [];
  let monthlyCreditAmountsAfterPayment = [];
  let previousCreditAmount = creditAmount;

  for (let i = 1; i <= installmentCount; i++) {
    let interest = previousCreditAmount * (interestRate / 100) * (period / 30);
    let bsmvAmount = interest * BSMV;
    let kkdfAmount = interest * KKDF;
    let anapara = installmentAmount - interest - bsmvAmount - kkdfAmount;
    let kalanAnaPara = previousCreditAmount - anapara;
    previousCreditAmount = kalanAnaPara;

    bsmvAmounts.push(bsmvAmount);
    kkdfAmounts.push(kkdfAmount);
    interestAmounts.push(interest);
    monthlyCreditAmountsWithoutTaxAndInterest.push(anapara);
    monthlyCreditAmountsAfterPayment.push(previousCreditAmount);
  }

  let creditSummary = {
    summary : {
      toplamGeriOdeme: (installmentAmount * installmentCount).toFixed(2),
      totalBsmv: bsmvAmounts.reduce((a, b) => a + b, 0).toFixed(2),
      totalKkdf: kkdfAmounts.reduce((a, b) => a + b, 0).toFixed(2),
      installmentAmount: installmentAmount.toFixed(2),
      installmentCount: installmentCount,
      period: Number(period)
    },
    paymentPlan : {
      bsmvAmounts: bsmvAmounts,
      kkdfAmounts: kkdfAmounts,
      interestAmounts: interestAmounts,
      monthlyCreditAmountsWithoutTaxAndInterest:
        monthlyCreditAmountsWithoutTaxAndInterest,
      monthlyCreditAmountsAfterPayment: monthlyCreditAmountsAfterPayment,
    }
  };

  console.log(period);
  return creditSummary;
};
