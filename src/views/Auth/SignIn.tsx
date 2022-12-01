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
import { useLoginMutation } from "@store/Services/Security";
import { setSecData } from "@store/Slices/securitySlice";
import CircularProgress from "@mui/material/CircularProgress";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MiniTutoriales
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const validationSchema = yup.object().shape({
  email: yup.string().email("Ingrese un Correo Electrónico Correcto").required("Correo Electrónico es Requerido"),
  password: yup.string().min(8, "Contraseña debe ser mínimo 8 caracteres").required("Contraseña es Requerida"),
});

let initialValues = {
  email: localStorage.getItem("emailremember") || "",
  password: "",
  rememberme: "f",
};

const theme = createTheme();

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const [login, { isLoading, status, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const Navigator = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let data;
      try {
        data = await login(values).unwrap();
      } catch (error) {
        setLoading(false);
      }
      dispatch(setSecData(data));
      console.log(values);
      if (values.rememberme[0] === "t") {
        localStorage.setItem("emailremember", values.email as string);
      } else {
        localStorage.removeItem("emailremember");
      }
      Navigator("/admin");
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img style={{ width: "300px", height: "auto" }} src={appLogo} alt="appLogo" />
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox id="rememberme" name="rememberme" color="primary" value="t" onChange={formik.handleChange} />}
              label="Recuérdame"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Iniciar Sesión &nbsp; {loading === true ? <CircularProgress color="inherit" /> : null}
            </Button>
            {error && <p style={{ color: "red" }}>Credenciales Inválidas</p>}
            <Grid container>
              <Grid item xs>
                <Link
                  onClick={() => {
                    Navigator("/recovery-password", { state: { mode: "FST" } });
                  }}
                  variant="body2"
                >
                  ¿Olvido su Contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"¿No tiene su cuenta? Registrarse"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
