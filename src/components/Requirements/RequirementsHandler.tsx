import { useState } from "react";
import { Container, Dialog, DialogTitle, DialogActions, DialogContent, Typography, Button, FormControl, List, TextField,  ListItem, IconButton, ListItemText } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import HandymanIcon from '@mui/icons-material/Handyman';

interface IRequirementsHandlerProps {
    requirementsList: Array<string>;
}

export const RequirementsHandler = () => {
    return(
        <Container sx={{mt:0.5, mb:3}} style={{display:'flex', alignItems:'flex-start', flexDirection:'column', paddingLeft:8, paddingRight:8}} >
            <Typography variant='h6' component='h6' sx={{mt:'2vh', display:'flex', alignItems:'center'}} alignSelf='flex-start' >
                <HandymanIcon sx={{ color: 'action.active', my: 0.5, mr:1}} />
                Materiales o Requisitos
            </Typography>
        
            <List sx={{minWidth:'50%', maxWidth:'100%', bgcolor: 'background.paper', pl:2 }}>
                {[1, 2, 3].map((value) => (
                <ListItem
                    key={value}
                    disableGutters
                    secondaryAction={
                    <IconButton aria-label="comment">
                        <ClearIcon />
                    </IconButton>
                    }
                >
                    <ListItemText primary={`Line item ${value}`} />
                </ListItem>
                ))}
                <FormControl fullWidth sx={{mt:1}}>
                    <TextField id="filled-textarea" multiline
                    maxRows={10} label="Descripción" variant='filled'/>
                </FormControl>
            </List>
            <AddReqForm />
        </Container>   
    )
}

export const AddReqForm = () => {
    const [reqDesc, setReqDesc] = useState("");
    return(
        <Dialog fullWidth open={true}>
            <DialogTitle>
                Agregar Requerimento
            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ m: 0 , bgcolor:'#f0f0f0'}}>
                    <TextField id="filled-textarea" multiline
                    maxRows={10} label={'Descripción'}  variant='filled'
                    value={reqDesc} onChange={(e)=>{setReqDesc(e.target.value)}} />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{}}>Cancelar</Button>
                <Button onClick={()=>{}} disabled={reqDesc === ""}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )
}