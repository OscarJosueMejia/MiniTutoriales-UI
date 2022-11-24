import {Container, Typography} from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { StepItem } from './StepItem';

export interface IStep {
    id:number;
    description:string;
    img?:File | string;
}

interface IStepContainer {
    steps:Array<IStep>
    handleUpdate: (step:IStep) => void;
}

export const StepContainer = ({steps, handleUpdate}:IStepContainer) => {
    return(
        <Container sx={{mt:0.5, mb:3}} style={{display:'flex', alignItems:'center', flexDirection:'column', paddingLeft:8, paddingRight:8}} >
            <Typography variant='h6' component='h6' sx={{mt:'2vh', display:'flex', alignItems:'center'}} alignSelf='flex-start' >
                <FormatListNumberedIcon sx={{ color: 'action.active', my: 0.5, mr:1}} />
                Lista de Pasos
            </Typography>
            {steps.length > 0 ?
                steps.map(step=>{
                    return(< StepItem key={step.id} step={step} updateStep={handleUpdate} />)
                })
                :<Container sx={{mt:2, bgcolor:'#f0f0f0', py:1,borderRadius:3, textAlign:'center'}} >
                    <Typography  style={{color:'gray'}}> Agrega al menos 1 Paso </Typography>
                </Container>
            }
        </Container>
    )
}
