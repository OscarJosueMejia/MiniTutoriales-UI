import { useState } from 'react';
import {TextField, Container, FormControl, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress} from '@mui/material';
import ImgPicker from "@components/TutorialForm/ImgPicker";
import DeleteIcon from '@mui/icons-material/Delete';
import {FileWithPath} from 'react-dropzone'
import ClearIcon from '@mui/icons-material/Clear';
import { IStep } from '@components/Steps/StepContainer';

interface IStepUpdaterProps {
    open: boolean;
    stepUpd:IStep;
    handleClose: (mode:'UPD'|'CANCEL'|'DEL', newStep?:IStep) => void;
}

export const StepUpdater = (props:IStepUpdaterProps) => {
    const { handleClose, stepUpd, open} = props;
    const [isLoading, setIsLoading] = useState(true);

    const [newDescription, setNewDescription] = useState(stepUpd.description);
    const [newImg, setNewImg] = useState(stepUpd.imgURL);

    return(
        <Dialog fullWidth open={open} onClose={()=>{handleClose('CANCEL')}}>
            <DialogTitle sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                Modificar Paso {stepUpd?.stepNumber}
                <IconButton onClick={()=>{handleClose('DEL')}}><DeleteIcon/></IconButton>

            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ m: 0 , bgcolor:'#f0f0f0'}}>
                    <TextField id="filled-textarea" multiline
                    maxRows={10} label={`Descripción del Paso ${stepUpd?.stepNumber}`} value={newDescription} variant='filled' onChange={(e)=>{setNewDescription(e.target.value)}} />
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
            <DialogActions sx={{mt:'1vh'}}>
                <Button onClick={()=>{handleClose('CANCEL')}}>Cancelar</Button>
                <Button onClick={()=>{handleClose('UPD', {stepNumber:stepUpd.stepNumber, description:newDescription, imgURL:newImg})}}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )   
}
