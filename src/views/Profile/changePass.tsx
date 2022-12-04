//Components
import Header from "@components/Header";
import {Button, ButtonGroup, Container} from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { FormChangePass } from '@components/Profile/formChange';

const ChangeView = () => {
  const Location = useLocation();
  
    return (
    <>
      <Header title="Actualizar Contraseña" />
      <Container sx={{display:'flex', justifyContent:'center', mt:'4rem'}}>
      <h2>La contraseña debe tener al menos seis caracteres e incluir una combinación de números, letras y caracteres especiales (!@%).</h2> 
      </Container>    
      <FormChangePass email={""} odlPassword={""}/> 
    </>
    );
}

export default ChangeView;
