import { useState } from 'react';

import { Dialog, DialogTitle, DialogActions, DialogContent, FormControl, Button, TextField } from "@mui/material"

interface IReqCreatorProps {
    open:boolean;
    handleRequirements: (mode:'ADD'|'DEL'|'CANCEL', description:string) => void;
}

export const RequirementCreator = ({open, handleRequirements}:IReqCreatorProps) => {
    const [reqDesc, setReqDesc] = useState("");
    return(
        <Dialog fullWidth open={open}>
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
                <Button onClick={()=>{handleRequirements('CANCEL', "")}}>Cancelar</Button>
                <Button onClick={()=>{handleRequirements('ADD', reqDesc); setReqDesc("")}} disabled={reqDesc === ""}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )
}