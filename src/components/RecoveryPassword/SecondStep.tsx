import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import appLogo from "../../assets/logo512.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useVerifyRecoveryPinMutation } from "@store/Services/Security";
import { setSecData } from "@store/Slices/securitySlice";
import { selectAuth } from "@store/Slices/securitySlice";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

import "./recoveryPassword.css";

const validationSchema = yup.object().shape({
  codigo: yup.string().min(6, "El código debe ser de 6 dígitos").max(6, "El código debe ser de 6 dígitos").required("Código es Requerido"),
});

let initialValues = {
  codigo: "",
};

interface IProps {
  email: string;
}

const SecondStep = ({ email }: IProps) => {
  const [loading, setLoading] = useState(false);

  const [verifyRecoveryPin, { isLoading, status, error }] = useVerifyRecoveryPinMutation();
  const dispatch = useDispatch();
  const Navigator = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let data;
      try {
        data = await verifyRecoveryPin({ email: email, pin: values.codigo }).unwrap();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      dispatch(setSecData(data));
      Navigator("/auth/recovery-password", { state: { mode: "CST", email: email, pin: values.codigo } });
    },
  });

  return (
    <>
      <Typography component="h1" variant="h5">
        Ingrese el Código de Recuperación
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          id="codigo"
          label="Código de Recuperación"
          name="codigo"
          autoFocus
          value={formik.values.codigo}
          onChange={formik.handleChange}
          error={formik.touched.codigo && Boolean(formik.errors.codigo)}
          helperText={formik.touched.codigo && formik.errors.codigo}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Recuperar Contraseña &nbsp; {loading === true ? <CircularProgress color="inherit" /> : null}
        </Button>
        {error && <p style={{ color: "red" }}>Pin de Recuperación Inválido</p>}
      </Box>
    </>
  );
};

export default SecondStep;
