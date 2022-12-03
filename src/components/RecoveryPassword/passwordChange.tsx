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
import { useRecoveryChangePasswordMutation } from "@store/Services/Security";
import { setSecData } from "@store/Slices/securitySlice";
import { selectAuth } from "@store/Slices/securitySlice";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Contraseña es Requerida")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Debe contener 8 Caracteres, Una Mayúscula, Una Minúscula, Un Número y Un Carácter Especial"
    ),
  passwordConf: yup
    .string()
    .required("Confirmar Contraseña es Requerido")
    .oneOf([yup.ref("password"), null], "Contraseñas deben coincidir"),
});

let initialValues = {
  password: "",
  passwordConf: "",
};

interface IProp {
  email: string;
  pin: number;
}

type errorMessage = {
  data: {
    error: string;
  };
};

const PasswordChange = ({ email, pin }: IProp) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [recoveryPassword, { isLoading, status, error }] = useRecoveryChangePasswordMutation();
  const dispatch = useDispatch();
  const Navigator = useNavigate();

  let errorMessage: errorMessage = {
    data: {
      error: "",
    },
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let data;
      try {
        data = await recoveryPassword({ email: email, pin: pin, newPassword: values.password }).unwrap();
      } catch (error) {
        setLoading(false);
        errorMessage = error as errorMessage;
        setErrorMsg(errorMessage.data.error);
      }
      dispatch(setSecData(data));
      Navigator("/login");
    },
  });

  return (
    <>
      <Typography component="h1" variant="h5">
        Cambie su Contraseña
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          type="password"
          required
          fullWidth
          id="password"
          label="Contraseña"
          name="password"
          autoFocus
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          margin="normal"
          type="password"
          required
          fullWidth
          id="passwordConf"
          label="Confirmar Contraseña"
          name="passwordConf"
          autoFocus
          value={formik.values.passwordConf}
          onChange={formik.handleChange}
          error={formik.touched.passwordConf && Boolean(formik.errors.passwordConf)}
          helperText={formik.touched.passwordConf && formik.errors.passwordConf}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Cambiar Contraseña &nbsp; {loading === true ? <CircularProgress color="inherit" /> : null}
        </Button>
        {errorMsg && (
          <p style={{ color: "red" }}>
            {errorMsg}
            <Link
              sx={{ color: "red" }}
              onClick={() => {
                Navigator("/login");
              }}
            >
              Inicio
            </Link>
          </p>
        )}
      </Box>
    </>
  );
};

export default PasswordChange;
