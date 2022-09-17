import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { PaymentPlanContext } from "../App";

const paymentTableHeaders = [
  "Taksit No",
  "Taksit Tutarı",
  "Anapara",
  "Kalan Anapara",
  "Kar Tutarı",
  "KKDF",
  "BSMV",
];
const PaymentPlan = () => {
  const [open, setOpen] = useState(false);
  const paymentPlanInfo = useContext(PaymentPlanContext);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    paymentPlanInfo !== null && (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Ödeme Planını Göster
        </Button>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth={"lg"}
          fullWidth
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Ödeme Planı
          </DialogTitle>
          <DialogContent dividers>
            <table>
              <thead>
                <tr key={Math.random()}>
                  {paymentTableHeaders.map((header, index) => {
                    return <th key={index}>{header}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {paymentPlanInfo.bsmvAmounts.map((bsmvAmount, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td key={Math.random()}>{index + 1}</td>
                        <td key={Math.random()}>
                          {paymentPlanInfo.installmentAmount}
                        </td>
                        <td key={Math.random()}>
                          {
                            paymentPlanInfo
                              .monthlyCreditAmountsWithoutTaxAndInterest[index]
                          }
                        </td>
                        <td key={Math.random()}>
                          {
                            paymentPlanInfo.monthlyCreditAmountsAfterPayment[
                              index
                            ]
                          }
                        </td>
                        <td key={Math.random()}>
                          {paymentPlanInfo.interestAmounts[index]}
                        </td>
                        <td key={Math.random()}>
                          {paymentPlanInfo.kkdfAmounts[index]}
                        </td>
                        <td key={Math.random()}>
                          {paymentPlanInfo.bsmvAmounts[index]}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Kapat
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
};

export { PaymentPlan };
