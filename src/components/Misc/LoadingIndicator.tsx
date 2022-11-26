import { Container, CircularProgress } from "@mui/material";

export const ContentLoadingIndicator = () => {
    return(
        <Container sx={{display:'flex', mt:'20vh', justifyContent:'center'}}>
          <CircularProgress size='3rem'/>  
        </Container>
    )
}