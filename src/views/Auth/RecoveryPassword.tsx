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
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "@store/Services/Security";
import { setSecData } from "@store/Slices/securitySlice";
import { selectAuth } from "@store/Slices/securitySlice";
import { useSelector } from "react-redux";
import { FirstStep, SecondStep, PasswordChange } from "@components/RecoveryPassword";

const theme = createTheme();

const RecoveryPassword = () => {
  const Navigator = useNavigate();

  const redirTo = useLocation();
  console.log(redirTo.state.mode);

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
          {redirTo.state.mode === "FST" /* First Recovery Step */ ? (
            <FirstStep />
          ) : redirTo.state.mode === "SST" /* Second Recovery Step */ ? (
            <SecondStep email={redirTo.state.email} />
          ) : redirTo.state.mode === "CST" /* Change Password Recovery Step */ ? (
            <PasswordChange email={redirTo.state.email} pin={redirTo.state.pin} />
          ) : null}
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
};

export default RecoveryPassword;
