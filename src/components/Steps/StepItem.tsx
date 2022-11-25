import { Container, Avatar, FormControl, TextField, InputAdornment, IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { IStep } from '@components/Steps/StepContainer';

interface IStepProps {
    step:IStep;
    updateStep:(step:IStep)=>void;
}

export const StepItem = ({ step, updateStep } : IStepProps) => {

    return(
        <Container key={step.stepNumber} sx={{mt:2, bgcolor:'#e2e2e2'}} style={{paddingRight:5, paddingLeft:5, borderRadius:5}} >
        <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', marginTop:'0.5vh'}}>
            <Avatar sx={{ bgcolor: '#6B728E', width: 30, height: 30, mx:1}} aria-label="recipe">{step.stepNumber}</Avatar>
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
                maxRows={10} label={`Paso ${step.stepNumber}`} variant='filled' value={step.description} />
            </FormControl>
            
        </div>

        {!step.imgURL ? null
            :<div style={{marginTop:'3vh', marginBottom:'2vh',textAlign:'center'}}>
                <img style={{maxWidth:'40%', borderRadius:10}} src={URL.createObjectURL(step.imgURL as File)} alt=""></img>
            </div>
        }
    </Container>
    )
}

