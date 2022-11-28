//Logic
import { useState } from 'react';
import { IStep } from '@components/Steps/StepContainer';
//UI Components
import {Box, TextField, FormControl, Typography, Button, Container, Dialog, Chip, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import { StepContainer, StepCreator, StepUpdater } from '@components/Steps';
import { TagHandler } from '@components/Tags';
import { RequirementsList, RequirementCreator } from '@components/Requirements';
//Icons
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';

const inputVariant = 'filled';

interface ITutorialFormProps {
    formik:any;
}

const TutorialForm = ({formik}:ITutorialFormProps) => {
    const steps:Array<IStep> = formik.values['steps'] as Array<IStep>
    const requirements:Array<string> = formik.values['requirements'] as Array<string>
    const tags:Array<{tagDescription: string}> = formik.values['tags'] as Array<{tagDescription: string}>
    
    //Add
    const [ stepCreatorOpen, setStepCreatorOpen ] = useState(false);
    const [ reqCreatorOpen, setReqCreatorOpen ] = useState(false);
    //Upd
    const [ stepUpd, setStepUpd ] = useState<IStep>();
    const [ stepUpdOpen, setStepUpdOpen ] = useState(false);

    const openStepUpdate = (step:IStep) => {
      setStepUpd(step);
      setStepUpdOpen(true);
    };

    const closeStepUpdate = (mode:'UPD'|'CANCEL'|'DEL', newStep?:IStep) => {
        let newSteps: Array<IStep> = [];
        if (mode === 'UPD' && newStep !== undefined){
            newSteps = steps.map( step => {
                if (step.stepNumber === newStep.stepNumber) {
                    step.description = newStep.description;
                    step.imgURL = newStep.imgURL;
                }
                return step;
            });
        }
        if(mode === 'DEL' && stepUpd !== undefined){
            newSteps = steps.filter(step => step.stepNumber !== stepUpd.stepNumber);
            newSteps = newSteps.map(o => { if(o.stepNumber > stepUpd.stepNumber){o.stepNumber--} return o})
        }

        if(mode !== 'CANCEL'){
            formik.setFieldValue('steps',newSteps);
        }
        // setSteps(newSteps);
        setStepUpdOpen(false);
    };
  
    const closeStepCreator = (mode:'ADD'|'CANCEL', newStep?:IStep) => {
        if(mode === 'ADD' && newStep !== undefined){
            let tmpSteps = [...steps];
            tmpSteps.push({stepNumber:newStep.stepNumber, description:newStep.description, imgURL:newStep.imgURL as File});
    
            // setSteps(tmpSteps);
            formik.setFieldValue('steps',tmpSteps);
        }
        setStepCreatorOpen(false);
    }

    const handleTags = ( mode:'ADD'|'DEL', tagDescription:string) => {
        let tmpTags = [...tags];

        if ( mode === 'ADD' && !(tmpTags.some(e => (e.tagDescription === tagDescription)))) {
            tmpTags.push({tagDescription});
        } else {
            tmpTags = tmpTags.filter(tag => tag.tagDescription !== tagDescription);
        }

        formik.setFieldValue('tags',tmpTags);
    }

    const handleRequirements = (mode:'ADD'|'DEL'|'CANCEL', description:string) =>{
        let tmpReqList = [...requirements];
        if (mode === 'ADD') {
            tmpReqList.push(description);
        }else{
            tmpReqList = tmpReqList.filter(e => e !== description);
        }
        formik.setFieldValue('requirements',tmpReqList);
        setReqCreatorOpen(false);
    }

    return ( 
        <Box
            component="form"
            sx={{ display: 'flex', flexWrap: 'wrap' }}
            noValidate
            autoComplete="off"
            >
            <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                <TitleIcon sx={{ color: 'action.active', my: 0.5 }} />
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="filled-basic" label="Título" variant={inputVariant} required
                    value={formik.values['title']} 
                    onChange={(e)=>{formik.setFieldValue('title',e.target.value)}} 
                    error={formik.errors['title']}
                    helperText={formik.errors['title']}/>
                    
                </FormControl>
            </div>
            <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                <DescriptionIcon sx={{ color: 'action.active', my: 0.5 }} />
                <FormControl fullWidth sx={{ m: 1}}>
                    <TextField id="filled-textarea" multiline
                    value={formik.values['description']} 
                    onChange={(e)=>{formik.setFieldValue('description',e.target.value)}}
                    error={formik.errors['description']}
                    helperText={formik.errors['description']}
                    maxRows={10} label="Descripción" variant={inputVariant} required/>
                </FormControl>
            </div>

            <RequirementsList requirementsList={requirements} handleRequirements={handleRequirements} />
            <RequirementCreator open={reqCreatorOpen} handleRequirements={handleRequirements}/>
            <Container style={{marginBottom:'1vh'}} >
                {formik.errors['requirements'] ? <Typography sx={{textAlign:'center', color:'red'}}>{formik.errors['requirements']}</Typography> : null}

                <Button onClick={()=>{setReqCreatorOpen(true)}}>Agregar Requisito o Material Necesario</Button>
            </Container>

            
            <StepContainer steps={steps} handleUpdate={openStepUpdate} />
            <StepCreator open={stepCreatorOpen} newStepNumber={steps.length + 1} handleClose={closeStepCreator} />
            {stepUpdOpen ? <StepUpdater open={stepUpdOpen} stepUpd={stepUpd as IStep} handleClose={closeStepUpdate}/> : null}
            
            <Container style={{marginBottom:'1vh'}} >
                {formik.errors['steps'] ? <Typography sx={{textAlign:'center', color:'red'}}>{formik.errors['steps']}</Typography> : null}
                <Button onClick={()=>{setStepCreatorOpen(true)}}>Agregar Paso</Button>
            </Container>

            <TagHandler tags={tags} handleTag={handleTags}/>
            {formik.errors['tags'] ? <Typography sx={{textAlign:'center', color:'red'}}>{formik.errors['tags']}</Typography> : null}

        </Box>    
    )
}

export default TutorialForm;