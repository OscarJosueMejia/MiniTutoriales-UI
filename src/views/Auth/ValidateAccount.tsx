import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useVerifyAccountMutation } from '@store/Services/Security';
import { LoadingButton } from '@mui/lab';

import { useFormik } from "formik";
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

const theme = createTheme();

interface IFormValues {
    email:string;
    pin:string;
}

const PIN_TTL=15;

export default function ValidateAccount() {
  const Location = useLocation();
  const Navigator = useNavigate();
  const [verifyAccount, { isLoading, status, error, isError}] = useVerifyAccountMutation();
  let initialValues:IFormValues = { email:"", pin:"" }

  const emailToVerify:string = Location.state.emailToVerify as string;

  if (emailToVerify !== undefined){
    initialValues={email:emailToVerify, pin:""};
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:Yup.object(validationSchema()),
    
    onSubmit: async (formValues) => {
      const data = await verifyAccount(
        {email:formValues.email, pin:formValues.pin});
      if(!isError){
        Navigator('/home/');
      }
    } 
  });

  const HandlePinChange = (e:unknown) =>{
    (e as {preventDefault: Function}).preventDefault();
    (e as {stopPropagation: Function}).stopPropagation();
    const { value } = (e as {target:{value:string}}).target;
    if(value.length <= 6){
        formik.setFieldValue('pin', value);
    }
  }

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
            Verificación de Cuenta
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 5 }}>
            
            <Typography>Se ha enviado un Correo Electrónico a <span style={{color:'#1668c3', fontWeight:500}}>{formik.values.email}</span> con el Pin de Verificación.</Typography>
            <Typography sx={{mt:1}}>Si no encuentras el Correo, busca en la sección <span style={{color:'#1668c3', fontWeight:500}}>SPAM</span>.</Typography>
            <Typography sx={{mt:1}}>El pin dejará de ser válido después de <span style={{color:'#1668c3', fontWeight:500}}>{PIN_TTL} Minutos</span>.</Typography>
            
            <Grid container spacing={2} sx={{mt:2}}>
              <Grid item xs={12}>
                <TextField
                  id="pin"
                  name="pin"
                  label="Pin"
                  type='number'
                  inputProps={{
                    maxLength:6
                  }}
                  value={formik.values.pin}
                  onChange={HandlePinChange}
                  error={formik.errors.pin !== undefined}
                  helperText={formik.errors.pin}
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
              Validar Mi Cuenta
            </LoadingButton>
            {isError?<Typography sx={{color:'red'}}>{(error as {data:{error:string}}).data.error}</Typography> 
              : null
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function validationSchema(){
  return {
      email: Yup.string().email('Correo No Válido').required("Campo requerido"),
      pin: Yup.string().min(6).required("Campo Requerido"),
  }
}