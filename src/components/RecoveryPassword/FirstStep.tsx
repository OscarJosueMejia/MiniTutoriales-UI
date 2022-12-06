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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import appLogo from "../../assets/logo512.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetRecoveryPinMutation } from "@store/Services/Security";
import { setSecData } from "@store/Slices/securitySlice";
import { selectAuth } from "@store/Slices/securitySlice";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";

const validationSchema = yup.object().shape({
  email: yup.string().email("Ingrese un Correo Electrónico Correcto").required("Correo Electrónico es Requerido"),
});

let initialValues = {
  email: "",
};

const theme = createTheme();

const FirstStep = () => {
  const [loading, setLoading] = useState(false);

  const [getRecoveryPin, { isLoading, status, error }] = useGetRecoveryPinMutation();
  const dispatch = useDispatch();
  const Navigator = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let data;
      try {
        data = await getRecoveryPin(values).unwrap();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      dispatch(setSecData(data));
      Navigator("/auth/recovery-password", { state: { mode: "SST", email: values.email } });
    },
  });

  return (
    <>
      <Typography component="h1" variant="h5">
        Recuperar Contraseña
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          type="email"
          required
          fullWidth
          id="email"
          label="Correo Electrónico"
          name="email"
          autoComplete="email"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Enviar Código de Recuperación &nbsp; {loading === true ? <CircularProgress color="inherit" /> : null}
        </Button>
        {error && <p style={{ color: "red" }}>Usuario no Encontrado</p>}
        <Grid container>
          <Grid item xs>
            <Link variant="body2"  onClick={()=>{Navigator('/auth/signup')}}>
              Iniciar Sesión
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" onClick={()=>{Navigator('/auth/signup')}}>
              {"¿No tiene su cuenta? Registrarse"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FirstStep;
