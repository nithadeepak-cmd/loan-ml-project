import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";

function Dashboard() {
  const [formData, setFormData] = useState({
    Gender: "",
    Married: "",
    Dependents: "",
    Education: "",
    Self_Employed: "",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "",
    Property_Area: "",
  });
  const initialFormData = {
    Gender: "",
    Married: "",
    Dependents: "",
    Education: "",
    Self_Employed: "",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "",
    Property_Area: "",
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({ open: false, message: "" });
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [errors, setErrors] = useState({});
  const [prediction, setPrediction] = useState(null); //posibble values:"Approved", "Rejected"
  // 🔥 VALIDATION FUNCTION
  const validateForm = () => {
    const newErrors = {};

    if (!formData.Gender) newErrors.Gender = "Select gender";

    if (!formData.Married) newErrors.Married = "Select marital status";

    if (!["0", "1", "2", "3"].includes(formData.Dependents))
      newErrors.Dependents = "Dependents must be 0, 1, 2, or 3";

    if (!formData.Education) newErrors.Education = "Select education status";

    if (!formData.Self_Employed)
      newErrors.Self_Employed = "Select employment status";

    if (!formData.ApplicantIncome || formData.ApplicantIncome <= 0)
      newErrors.ApplicantIncome = "Income must be greater than 0";

    if (formData.CoapplicantIncome < 0)
      newErrors.CoapplicantIncome = "Invalid income";

    if (!formData.LoanAmount || formData.LoanAmount <= 0)
      newErrors.LoanAmount = "Enter loan amount";

    if (!formData.Loan_Amount_Term || formData.Loan_Amount_Term <= 0)
      newErrors.Loan_Amount_Term = "Enter loan term";

    if (formData.Credit_History === "")
      newErrors.Credit_History = "Select credit history";

    if (!formData.Property_Area)
      newErrors.Property_Area = "Select property area";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 SUBMIT & API CALL
  const handlePredict = async () => {
    if (!validateForm()) {
      //alert("Please correct errors before submitting.");
      setToast({
        open: true,
        message: "Please correct errors before submitting.",
        severity: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://loan-ml-api-qxq3.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      //alert("Loan Status: " + result.Loan_Status);
      //setSuccess({open:true,message:"Loan Status: " + result.Loan_Status})
      if (result.Loan_Status === "Approved") {
        setPrediction("Approved");
        setToast({
          open: true,
          message: "Loan Status:Approved",
          severity: "success",
        });
      } else {
        setPrediction("Rejected");
        setToast({
          open: true,
          message: "Loan Status:Rejected",
          severity: "error",
        });
      }
    } catch (err) {
      //alert("Error: " + err);
      setToast({
        open: true,
        message: "Error: " + err,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setPrediction(null);
    setLoading(false);
    setToast({ open: false, message: "", severity: "success" });
  };

  // 🔥 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="green">
          Loan Eligibility Predictor
        </Typography>

        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Enter applicant details and get instant prediction.
        </Typography>
      </Box>

      {/* FORM CARD */}
      <Paper elevation={3} sx={{ mt: 5, p: 4 }}>
        <Grid container spacing={3}>
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Gender"
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              error={!!errors.Gender}
              helperText={errors.Gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>

            <TextField
              sx={{ mt: 2 }}
              select
              fullWidth
              label="Married"
              name="Married"
              value={formData.Married}
              onChange={handleChange}
              error={!!errors.Married}
              helperText={errors.Married}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Dependents"
              name="Dependents"
              value={formData.Dependents}
              onChange={handleChange}
              error={!!errors.Dependents}
              helperText={errors.Dependents}
            />

            <TextField
              sx={{ mt: 2 }}
              select
              fullWidth
              label="Education"
              name="Education"
              value={formData.Education}
              onChange={handleChange}
              error={!!errors.Education}
              helperText={errors.Education}
            >
              <MenuItem value="Graduate">Graduate</MenuItem>
              <MenuItem value="Not Graduate">Not Graduate</MenuItem>
            </TextField>

            <TextField
              sx={{ mt: 2 }}
              select
              fullWidth
              label="Self Employed"
              name="Self_Employed"
              value={formData.Self_Employed}
              onChange={handleChange}
              error={!!errors.Self_Employed}
              helperText={errors.Self_Employed}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Applicant Income"
              name="ApplicantIncome"
              type="number"
              value={formData.ApplicantIncome}
              onChange={handleChange}
              error={!!errors.ApplicantIncome}
              helperText={errors.ApplicantIncome}
            />

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Co-applicant Income"
              name="CoapplicantIncome"
              type="number"
              value={formData.CoapplicantIncome}
              onChange={handleChange}
              error={!!errors.CoapplicantIncome}
              helperText={errors.CoapplicantIncome}
            />

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Loan Amount"
              name="LoanAmount"
              type="number"
              value={formData.LoanAmount}
              onChange={handleChange}
              error={!!errors.LoanAmount}
              helperText={errors.LoanAmount}
            />

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Loan Term (in months)"
              name="Loan_Amount_Term"
              type="number"
              value={formData.Loan_Amount_Term}
              onChange={handleChange}
              error={!!errors.Loan_Amount_Term}
              helperText={errors.Loan_Amount_Term}
            />

            <TextField
              sx={{ mt: 2 }}
              select
              fullWidth
              label="Credit History"
              name="Credit_History"
              value={formData.Credit_History}
              onChange={handleChange}
              error={!!errors.Credit_History}
              helperText={errors.Credit_History}
            >
              <MenuItem value="1">Good (1)</MenuItem>
              <MenuItem value="0">Poor (0)</MenuItem>
            </TextField>

            <TextField
              sx={{ mt: 2 }}
              select
              fullWidth
              label="Property Area"
              name="Property_Area"
              value={formData.Property_Area}
              onChange={handleChange}
              error={!!errors.Property_Area}
              helperText={errors.Property_Area}
            >
              <MenuItem value="Urban">Urban</MenuItem>
              <MenuItem value="Rural">Rural</MenuItem>
              <MenuItem value="Semiurban">Semi Urban</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* SUBMIT BUTTON */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={26} color="inherit" />
            ) : (
              "Predict Loan Status"
            )}
          </Button>
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ ml: 2 }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Box>
      </Paper>
      {prediction && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              backgroundColor:
                prediction === "Approved" ? "lightgreen" : "lightcoral",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: prediction === "Approved" ? "green" : "darkred",
              }}
            >
              {prediction === "Approved"
                ? "Congratulations! Your loan is Approved."
                : "We are sorry. Your loan is Rejected."}
            </Typography>
          </paper>
        </Box>
      )}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Dashboard;
