const BSMV = 0.1;
const KKDF = 0.15;

export const calculatePaymentPlan = (
  creditAmount,
  installmentCount,
  interestRate,
  period
) => {
  //kaynak : https://www.kredimodeli.com/makaleler/KrediHesaplama
  //Eşit taksitli ödeme planı hesaplaması için kaynaktaki formül kullanılmıştır.
  let interestRateWithTax = ((1 + BSMV + KKDF) * interestRate) / 100; //Vergileri faiz oranının içine ekliyoruz.
  let installmentAmount =
    +parseFloat((creditAmount *
    ((interestRateWithTax *
      Math.pow(interestRateWithTax + 1, installmentCount)) /
      (Math.pow(1 + interestRateWithTax, installmentCount) - 1))).toFixed(2)); //Taksit tutarı

  let bsmvAmounts = [];
  let kkdfAmounts = [];
  let interestAmounts = [];
  let monthlyCreditAmountsWithoutTaxAndInterest = [];
  let monthlyCreditAmountsAfterPayment = [];
  let previousCreditAmount = creditAmount; //previousCreditAmount her taksit sonrası azalır. Kalan anapara miktarını ifade eder.

  for (let i = 1; i <= installmentCount; i++) {
    //Her taksit ödemesi için ödenen vergiler, faizler ve kalan anapara hesaplaması yapılır.
    let interest = +parseFloat((previousCreditAmount * (interestRate / 100) * (period / 30)).toFixed(2));
    let bsmvAmount = +parseFloat((interest * BSMV).toFixed(2));
    let kkdfAmount = +parseFloat((interest * KKDF).toFixed(2));
    let anapara = +parseFloat((installmentAmount - interest - bsmvAmount - kkdfAmount).toFixed(2));
    let kalanAnaPara = +parseFloat((previousCreditAmount - anapara).toFixed(2));
    previousCreditAmount = kalanAnaPara;

    if(i === installmentCount){
      //Son taksitte kalan anapara tutarı anaparaya eklenerek kalan anapara sıfırlanır.
      anapara += kalanAnaPara;
      previousCreditAmount = 0;
    }

    bsmvAmounts.push(bsmvAmount); //aylık taksitlerde ödenen bsmv tutarları
    kkdfAmounts.push(kkdfAmount);//aylık taksitlerde ödenen kkdf tutarları
    interestAmounts.push(interest);//aylık taksitlerde ödenen faiz tutarları
    monthlyCreditAmountsWithoutTaxAndInterest.push(anapara); //Faiz ve vergiler çıkarılınca ödenen miktar. Anapara
    monthlyCreditAmountsAfterPayment.push(previousCreditAmount); //Taksit ödemesi sonrası borç olarak kalan anapara miktarı
  }

  //summary, kredi hesaplaması sonucu genel bilgileri içerir.
  //paymentPlan, ödeme planı tablosunda yer alan detaylı bilgileri içerir.
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
