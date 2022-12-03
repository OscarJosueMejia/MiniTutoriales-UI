import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '@mui/icons-material';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { IFeedItem2 } from "@store/Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLazyByUserQuery } from "@store/Services/Feed";
//Components
import Header from "@components/Header";
import {Box, Button, ButtonGroup, CircularProgress, Container, CssBaseline, TextField} from "@mui/material";
import { ProfileInfo } from '@components/Profile';
import { useLocation, useNavigate } from 'react-router-dom';
//import FormChangePass from '@components/Profile/formChange';
import { useChangePassMutation } from '@store/Services/Security';
import { useFormik } from 'formik';
import * as yup from "yup";
import { setSecData } from '@store/Slices/securitySlice';
import { useState } from 'react';

export const FormChangePass = () => {
  const Navigator = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [update, { isLoading, status, error }] = useChangePassMutation();

  const validationSchema = yup.object().shape({
        email: yup.string().required("Campo Requerido"),
        password: yup.string().required("Campo requerido"),
        oldPasswords: yup.array().min(1, 'Campo requerido'),
  });

  //let initialValues:IFormValues = {email:"", oldPasswords:[], password:""}

  let initialValues = {
    email: location.state.email as string,
    oldPasswords: location.state.oldPasswords as string,
    password: location.state.password as string,
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
          email: location.state.email as string,
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }} autoComplete="off">
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              required
              id="email"
              label="Correo Electronico"
              name="email"
            />
            <TextField
              id="oldPassword"
              name="oldPassword"
              label="Contraseña Actual"
              value={formik.values.oldPasswords}
              required
              onChange={formik.handleChange}
              error={
                formik.touched.oldPasswords && Boolean(formik.errors.oldPasswords)
              }
              helperText={formik.touched.oldPasswords && formik.errors.oldPasswords}
            />
            <TextField
              id="newPassword"
              name="newPassword"
              label="Contraseña Nueva"
              value={formik.values.password}
              required
              onChange={formik.handleChange}
              error={
                formik.touched.password && Boolean(formik.errors.password)
              }
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Actualizar Contraseña &nbsp;
              {loading === true ? <CircularProgress color="inherit" /> : null}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    );
};

