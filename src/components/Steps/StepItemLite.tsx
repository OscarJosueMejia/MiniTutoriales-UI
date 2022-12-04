import { useState } from "react";
import { Container, Avatar, FormControl, TextField, CircularProgress} from "@mui/material";
import { IStep } from '@components/Steps/StepContainer';

interface IStepProps {
    step:IStep;
}

export const StepItemLite = ({ step } : IStepProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return(
        <Container key={step.stepNumber} sx={{mt:2, bgcolor:'#e2e2e2'}} style={{paddingLeft:0, borderRadius:5}} >
        <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', marginTop:'0.5vh'}}>
            <Avatar sx={{ bgcolor: '#6B728E', width: 30, height: 30, mx:1}} aria-label="recipe">{step.stepNumber}</Avatar>
            <FormControl fullWidth sx={{bgcolor:'#f0f0f0'}}>
                <TextField id="filled-textarea" multiline
                sx={{bgcolor:'#f0f0f0'}} 
                InputProps={{readOnly: true}}
                maxRows={10} label={`Paso ${step.stepNumber}`} variant='filled' value={step.description} />
            </FormControl>
            
        </div>
        {!step.imgURL ? null
            :<div style={{marginTop:'3vh', marginBottom:'2vh',textAlign:'center' }}>
                <CircularProgress style={(!isLoading ? {display:'none'} : {})}/>
                <img style={(!isLoading ? {maxWidth:'60vw', borderRadius:10} : {display:'none'})} src={step.imgURL as string}  onLoad={()=>{setIsLoading(false);}} alt="" />
            </div>
            
            
            // <div style={{marginTop:'3vh', marginBottom:'2vh',textAlign:'center'}}>
            //     <img style={{maxWidth:'40%', borderRadius:10}} src={step.imgURL as string} alt=""></img>
            // </div>
        }

    </Container>
    )
}

