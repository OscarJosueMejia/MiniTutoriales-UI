import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSigninMutation } from '@store/Services/Security';
import { LoadingButton } from '@mui/lab';
import { AlertDialog } from '@components/Misc';

import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

interface IFormValues {
  firstName:string;
  lastName:string;
  email:string;
  password:string;
}

export default function SignUp() {
  const Navigator = useNavigate();
  const [signUp, { isLoading, status, isError, error }] = useSigninMutation();

  const initialValues:IFormValues = { firstName:"", lastName:"", email:"", password:"" }


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:Yup.object(validationSchema()),
    
    onSubmit: async (formValues) => {
      try {
        await signUp(
          {name:`${formValues.firstName} ${formValues.lastName}`,
            email:formValues.email,
            password:formValues.password
          }).unwrap();
  
          Navigator('/auth/validate', {replace:true, state:{emailToVerify:formValues.email}});
      } catch (error) {
        console.log(error);
      }
    } 
  })

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor:'#e4e4e4', width:'70px', height:'70px', pb:0.5 }} >
            <img src="https://cdn-icons-png.flaticon.com/512/3176/3176369.png" alt="" width='50px' />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear Cuenta
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  value={formik.values.firstName}
                  onChange={(e)=>{formik.setFieldValue('firstName', e.target.value)}}
                  error={formik.touched.firstName && formik.errors.firstName !== undefined}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Apellido"
                  value={formik.values.lastName}
                  onChange={(e)=>{formik.setFieldValue('lastName', e.target.value)}}
                  error={formik.touched.lastName && formik.errors.lastName !== undefined}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={(e)=>{formik.setFieldValue('email', e.target.value)}}
                  error={ formik.touched.email && formik.errors.email !== undefined}
                  helperText={formik.touched.email && formik.errors.email}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  label="Contraseña"
                  type="password"
                  value={formik.values.password}
                  onChange={(e)=>{formik.setFieldValue('password', e.target.value)}}
                  error={formik.touched.password && formik.errors.password !== undefined}
                  helperText={formik.touched.password && formik.errors.password}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              sx={{ mt: 5, mb: 2 }}
            >
              Registrarme
            </LoadingButton>
            
            <Grid container justifyContent="flex-end" sx={{mt:2}}>
              <Grid item >
                <Link variant="body2" onClick={()=>{Navigator('/auth/');}}>
                  Ya tienes una cuenta? Inicia Sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      {isError
        ?<AlertDialog isOpen={isError} type='ERROR' title="Ups!" description={(error as {data:{error:string}}).data.error} /> 
        : null
      }
    
    </ThemeProvider>
  );
}

function validationSchema(){
  return {
      firstName: Yup.string().required("Campo Requerido"),
      lastName: Yup.string().required("Campo Requerido"),
      email: Yup.string().email('Correo No Válido').required("Campo requerido"),
      password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'La contraseña es débil.').required("Campo requerido"),
  }
}