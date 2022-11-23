import { useState } from "react";
import { Dialog, DialogTitle, Button, Container, DialogContent, FormControl, CircularProgress, TextField, DialogActions } from "@mui/material";
import ImgPicker from "@components/TutorialForm/ImgPicker";
import { FileWithPath } from 'react-dropzone';
import ClearIcon from '@mui/icons-material/Clear';


interface IStep {
    id:number;
    description:string;
    img?:File | string;
}

interface IStepCreatorProps {
    open: boolean;
    stepNumber: number;
    handleClose: (mode:'ADD'|'CANCEL', newStep?:IStep) => void;
}

export const StepCreator = (props:IStepCreatorProps) => {

    const { handleClose, stepNumber, open} = props;
    const [isLoading, setIsLoading] = useState(true);

    const [newDescription, setNewDescription] = useState("");
    const [newImg, setNewImg] = useState<File>();

    return(
        <Dialog fullWidth open={open} onClose={()=>{handleClose('CANCEL')}}>
            <DialogTitle>
                Agregar Paso #{stepNumber}
            </DialogTitle>
            <DialogContent>

                <FormControl fullWidth sx={{ m: 0 , bgcolor:'#f0f0f0'}}>
                    <TextField id="filled-textarea" multiline
                    maxRows={10} label={`Descripción del Paso ${stepNumber}`} value={newDescription} variant='filled' onChange={(e)=>{setNewDescription(e.target.value)}} />
                </FormControl>

                {!newImg ? null
                    :<div style={{marginTop:'3vh', marginBottom:'2vh',textAlign:'center' }}>
                        <CircularProgress style={(!isLoading ? {display:'none'} : {})}/>
                       <img style={(!isLoading ? {maxWidth:'40%', borderRadius:10} : {display:'none'})} src={URL.createObjectURL(newImg as FileWithPath)}  onLoad={()=>{setIsLoading(false);}} alt="" />
                    </div>
                }
                <Container sx={{textAlign:'center'}} >
                    <ImgPicker buttonTitle={!newImg ? 'Subir Imagen de Referencia' : 'Reemplazar Imagen'} setFile={setNewImg} />
                    {!newImg ? null : <Button variant='contained' color='error' endIcon={<ClearIcon/>} onClick={()=>{setNewImg(undefined)}}>Eliminar Imagen</Button> }
                </Container>

                </DialogContent>
            <DialogActions>
                <Button onClick={()=>{handleClose('CANCEL')}}>Cancelar</Button>
                <Button onClick={()=>{handleClose('ADD', {id:stepNumber, description:newDescription, img:newImg}); setNewDescription(""); setNewImg(undefined)}}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )   

}