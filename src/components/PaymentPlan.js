import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { CreditContext } from "../App";

const PaymentPlan = () => {
  const [open, setOpen] = useState(false);
  const paymentPlanInfo = useContext(CreditContext);

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
                <th>Taksit No</th>
                <th>Taksit Tutarı</th>
                <th>Anapara</th>
                <th>Kalan Anapara</th>
                <th>Kar Tutarı</th>
                <th>KKDF</th>
                <th>BSMV</th>
              </thead>
              <tbody>
                {paymentPlanInfo.paymentPlan.bsmvAmounts.map(
                  (bsmvAmount, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{paymentPlanInfo.summary.installmentAmount}</td>
                          <td>
                            {
                              paymentPlanInfo.paymentPlan
                                .monthlyCreditAmountsWithoutTaxAndInterest[
                                index
                              ]
                            }
                          </td>
                          <td>
                            {
                              paymentPlanInfo.paymentPlan
                                .monthlyCreditAmountsAfterPayment[index]
                            }
                          </td>
                          <td>
                            {paymentPlanInfo.paymentPlan.interestAmounts[index]}
                          </td>
                          <td>
                            {paymentPlanInfo.paymentPlan.kkdfAmounts[index]}
                          </td>
                          <td>
                            {paymentPlanInfo.paymentPlan.bsmvAmounts[index]}
                          </td>
                        </tr>
                      </>
                    );
                  }
                )}
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
