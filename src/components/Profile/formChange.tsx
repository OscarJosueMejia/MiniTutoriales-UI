import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '@mui/icons-material';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { IFeedItem2 } from "@store/Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLazyByUserQuery } from "@store/Services/Feed";
//Components
import Header from "@components/Header";
import {Avatar, Box, Button, ButtonGroup, CircularProgress, Container, CssBaseline, TextField, Typography} from "@mui/material";
import { ProfileInfo } from '@components/Profile';
import { useLocation, useNavigate } from 'react-router-dom';
//import FormChangePass from '@components/Profile/formChange';
import { useChangePassMutation } from '@store/Services/Security';
import { useFormik } from 'formik';
import * as yup from "yup";
import { setSecData } from '@store/Slices/securitySlice';
import { useState } from 'react';

const theme = createTheme();

interface IProp {
  email: string;
  odlPassword: string;
}

export const FormChangePass = ({ email, odlPassword }: IProp) => {
  const Navigator = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [update, { isLoading, status, error }] = useChangePassMutation();

  const validationSchema = yup.object().shape({
        email: yup.string().required("Campo Requerido"),
        newPassword: yup.string().required("Campo requerido"),
        oldPassword: yup.string().required("Campo requerido"),
  });

  //let initialValues:IFormValues = {email:"", oldPasswords:[], password:""}

  let initialValues = {
    email:"",
    oldPassword:"",
    newPassword:"",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let data;
      try {
        data = await update({
          ...values,
          email: values.email,
          odlPassword: values.oldPassword,
          newPassword: values.newPassword
        }).unwrap();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      dispatch(setSecData(data));
      window.location.replace("/user/");
    },
  });

    return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Cambiar Contraseña
          </Typography>
          <Typography>La contraseña debe tener al menos ocho caracteres e incluir una combinación de números, letras y caracteres especiales (!@%).</Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }} autoComplete="off">
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
            />
            <TextField
              sx={{ mt: 2, mb: 2 }}
              id="oldPassword"
              name="oldPassword"
              label="Contraseña Actual"
              type="password"
              value={formik.values.oldPassword}
              required
              fullWidth
              onChange={formik.handleChange}
              error={
                formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
              }
              helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            />
            <TextField
              id="newPassword"
              name="newPassword"
              label="Contraseña Nueva"
              type="password"
              value={formik.values.newPassword}
              required
              fullWidth
              onChange={formik.handleChange}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={formik.touched.newPassword && formik.errors.newPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Guardar &nbsp;
              {loading === true ? <CircularProgress color="inherit" /> : null}
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 0, mb: 2 }}
              onClick={()=>{Navigator('/user/')}}
            >
              Cancelar &nbsp;
            </Button>
            {error && <p style={{ color: "red" }}>No cumple los requisitos</p>}
          </Box>
        </Box>
      </Container>
      </ThemeProvider>
    );
};

