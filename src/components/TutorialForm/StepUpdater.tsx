import { useState } from 'react';
import {TextField, FormControl, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress} from '@mui/material';
import ImgPicker from "./ImgPicker";
import DeleteIcon from '@mui/icons-material/Delete';
import {FileWithPath} from 'react-dropzone'

interface IStep {
    id?:number;
    description:string;
    img?:File | string;
}

interface IStepUpdaterProps {
    open: boolean;
    stepUpd:IStep;
    handleClose: (mode:'UPD'|'CANCEL', newStep?:IStep) => void;
}

const StepUpdater = (props:IStepUpdaterProps) => {
    const { handleClose, stepUpd, open} = props;
    const [isLoading, setIsLoading] = useState(true);

    const [newDescription, setNewDescription] = useState(stepUpd.description);
    const [newImg, setNewImg] = useState(stepUpd.img);

    return(
        <Dialog fullWidth open={open} onClose={()=>{handleClose('CANCEL')}}>
            <DialogTitle sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                Modificar Paso {stepUpd?.id}
                <IconButton><DeleteIcon/></IconButton>

            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ m: 0 , bgcolor:'#f0f0f0'}}>
                    <TextField id="filled-textarea" multiline
                    maxRows={10} label={`Descripción del Paso ${stepUpd?.id}`} value={newDescription} variant='filled' onChange={(e)=>{setNewDescription(e.target.value)}} />
                </FormControl>
                {!newImg ? null
                    :<div style={{marginTop:'3vh', marginBottom:'2vh',textAlign:'center' }}>
                        <CircularProgress style={(!isLoading ? {display:'none'} : {})}/>
                        <div style={{display:'flex', justifyContent:'center'}}>
                                <img style={(!isLoading ? {maxWidth:'40%', borderRadius:10} : {display:'none'})} src={URL.createObjectURL(newImg as FileWithPath)}  onLoad={()=>{setIsLoading(false);}} alt="" />
                                <span style={{backgroundColor:'red', position:'absolute', top:0, left:0}}>hola</span>
                        </div>
                    </div>
                }
                <ImgPicker buttonTitle={!newImg ? 'Subir Imagen de Referencia' : 'Reemplazar Imagen'} setFile={setNewImg} />
                    
                </DialogContent>
            <DialogActions>
                <Button onClick={()=>{handleClose('CANCEL')}}>Cancelar</Button>
                <Button onClick={()=>{handleClose('UPD', {id:stepUpd.id, description:newDescription, img:newImg})}}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )   
}

export default StepUpdater;