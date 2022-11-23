import { useState } from "react";
import { Container, Avatar, FormControl, TextField, InputAdornment, IconButton, Button} from "@mui/material";

import ImgDialog from "./ImgDialog";
import EditIcon from '@mui/icons-material/Edit';

interface IStep {
    id:number;
    description:string;
    img?:File | string;
}

interface IStepProps {
    step:IStep;
    updateStep:(step:IStep)=>void;
}

const StepItem = ({ step, updateStep } : IStepProps) => {

    return(
        <Container key={step.id} sx={{mt:2, bgcolor:'#e2e2e2'}} style={{paddingRight:5, paddingLeft:5, borderRadius:5}} >
        <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', marginTop:'0.5vh'}}>
            <Avatar sx={{ bgcolor: '#6B728E', width: 30, height: 30, mx:1}} aria-label="recipe">{step.id}</Avatar>
            <FormControl fullWidth sx={{bgcolor:'#f0f0f0'}}>
                <TextField id="filled-textarea" multiline
                sx={{bgcolor:'#f0f0f0'}} 
                
                InputProps={{
                    readOnly: true,
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={()=>{updateStep(step)}}
                            >
                            <EditIcon/>
                        </IconButton>
                    </InputAdornment>,
                }}
                maxRows={10} label={`Paso ${step.id}`} variant='filled' value={step.description} />
            </FormControl>
            
        </div>

        {
            !step.img
            ?null
            :<div style={{marginTop:'3vh', marginBottom:'2vh',textAlign:'center'}}>
                <img style={{maxWidth:'40%', borderRadius:10}} src={URL.createObjectURL(step.img as File)} alt=""></img>
            </div>
        }
        


    </Container>
    )
}


export default StepItem;