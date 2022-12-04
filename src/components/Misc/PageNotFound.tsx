import { useNavigate } from "react-router-dom";

import { Container, Typography, Button} from "@mui/material";
const PageNotFound = () => {
    const Navigator = useNavigate();
    
    return(
        <Container sx={{ textAlign:'center', mt:'20vh'}}>
            <img src="https://cdn-icons-png.flaticon.com/512/5022/5022124.png" width='120vw' alt="sad.jpg" />
            <Typography variant="h3" gutterBottom sx={{mt:4}}>
                ¡Lo Sentimos!
            </Typography>
            <Typography variant="h5" gutterBottom sx={{mt:5}}>
                No se ha encontrado la página solicitada.
            </Typography>
            <Button size='large' sx={{mt:5}} onClick={()=>{Navigator('/auth/')}}>
                Ir a la Página Principal
            </Button>
        </Container>
    )
}

export default PageNotFound;