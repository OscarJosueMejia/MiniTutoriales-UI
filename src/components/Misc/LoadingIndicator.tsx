import { Container, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export const ContentLoadingIndicator = () => {
    return(
        <Container sx={{display:'flex', mt:'20vh', justifyContent:'center'}}>
          <CircularProgress size='3rem'/>  
        </Container>
    )
}


export const ModalLoadingIndicator = ({show}:{show:boolean}) => {
    return(
        <Dialog
        open={show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{display:'flex', alignItems:'center'}}>
          {"Cargando..."}
          <CircularProgress size='1.5rem' sx={{ml:5}}/> 
        </DialogTitle>
      </Dialog>
    )
}