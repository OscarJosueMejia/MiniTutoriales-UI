//Components
import Header from "@components/Header";
import {Button, ButtonGroup, Container} from "@mui/material";
import { ProfileInfo } from '@components/Profile';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormChangePass } from '@components/Profile/formChange';

const ChangeView = () => {
  const Location = useLocation();
  
    return (
    <>
      <Header title="Hola" />
      <ProfileInfo userData={{name:"Angel Lagos", email:"oj_mejias@unicah.edu"}} uploadCount={1} />
      <Container sx={{display:'flex', justifyContent:'center', mt:'1.2rem'}}>
      <h2>Actualizar Contraseña</h2> <FormChangePass/>
      </Container>     
    </>
    );
}

export default ChangeView;

