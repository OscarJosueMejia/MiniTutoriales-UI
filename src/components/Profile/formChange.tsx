import {Container, Avatar, Typography, Button, Box, Checkbox, CssBaseline, FormControlLabel, Grid, Link, TextField, ButtonGroup} from '@mui/material';
import { green } from "@mui/material/colors";
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '@mui/icons-material';
import { IStep } from '@components/Steps/StepContainer';
import { useState } from 'react';

const inputVariant = 'filled';
const theme = createTheme();

interface IProfileFormProps {
  formik:any;
}

export default function FormChangePass({formik}:IProfileFormProps) {
  const oldPasswords:Array<string> = formik.values['oldPasswords'] as Array<string>
  const [ stepCreatorOpen, setStepCreatorOpen ] = useState(false);
  const [ reqCreatorOpen, setReqCreatorOpen ] = useState(false);

  const [ stepUpd, setStepUpd ] = useState<IStep>();
    const [ stepUpdOpen, setStepUpdOpen ] = useState(false);

    


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value={formik.values['email']}
              error={formik.errors['email'] !== undefined}
              helperText={formik.errors['email']}
              onChange={(e)=>{formik.setFieldValue('email',e.target.value)}} 
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={formik.values['password']}
              onChange={(e)=>{formik.setFieldValue('password',e.target.value)}}
              error={formik.errors['password'] !== undefined}
              helperText={formik.errors['password']}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña Actual"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              value={formik.values['oldPasswords']}
              onChange={(e)=>{formik.setFieldValue('oldPasswords',e.target.value)}}
              error={formik.errors['oldPasswords'] !== undefined}
              helperText={formik.errors['oldPasswords']}
              margin="normal"
              required
              fullWidth
              name="oldPasswords"
              label="Contraseña Nueva"
              type="password"
              id="oldPasswords"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Actualizar Contraseña
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    )
} 
