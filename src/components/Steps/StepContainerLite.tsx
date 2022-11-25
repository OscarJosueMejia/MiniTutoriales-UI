import {Container, Typography} from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { StepItemLite } from './StepItemLite';
import { IStep } from '@components/Steps/StepContainer';

interface IStepContainer {
    steps:Array<IStep>
}

export const StepContainerLite = ({steps}:IStepContainer) => {
    return(
        <Container sx={{mt:0.5, mb:3}} style={{display:'flex', alignItems:'center', flexDirection:'column', paddingLeft:8, paddingRight:8}} >
            <Typography variant='h6' component='h6' sx={{mt:'2vh', display:'flex', alignItems:'center'}} alignSelf='flex-start' >
                <FormatListNumberedIcon sx={{ color: 'action.active', my: 0.5, mr:1}} />
                Lista de Pasos
            </Typography>
            {steps.length > 0 ?
                steps.map(step=>{
                    return(< StepItemLite key={step.stepNumber} step={step} />)
                })
                :null
            }
        </Container>
    )
}
