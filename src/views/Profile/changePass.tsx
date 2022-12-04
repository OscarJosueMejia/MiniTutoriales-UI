//Components
import Header from "@components/Header";
import {Button, ButtonGroup, Container} from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import { FormChangePass } from '@components/Profile/formChange';

const ChangeView = () => {
  const Location = useLocation();
  
    return (
    <>
      <Header title="Configuración" />
      <Container sx={{display:'flex', justifyContent:'center', mt:'4rem'}}>
      </Container>    
      <FormChangePass email={""} odlPassword={""}/> 
    </>
    );
}

export default ChangeView;
