//Logic
import { useState } from 'react';
import { IStep } from '@components/Steps/StepContainer';
import { IFormValues } from '@views/Tutorial/TutorialManagement';
import { FormikErrors, FormikTouched } from 'formik';
import { ICategories } from '@store/Slices/categorySlice';
//UI Components
import {Box, TextField, FormControl, Typography, Button, Container} from '@mui/material';
import { StepContainer, StepCreator, StepUpdater } from '@components/Steps';
import { TagHandler } from '@components/Tags';
import { RequirementsList, RequirementCreator } from '@components/Requirements';
//Icons
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';

const inputVariant = 'filled';
interface ITutorialFormProps {
    formikValues:IFormValues;
    formikErrors:FormikErrors<IFormValues>;
    formikTouched:FormikTouched<IFormValues>;
    formikSetValue:Function;
    categoriesList:Array<ICategories>
}

const TutorialForm = ({formikValues, formikErrors, formikTouched, formikSetValue, categoriesList}:ITutorialFormProps) => {
    const steps:Array<IStep> = formikValues.steps as Array<IStep>
    const requirements:Array<string> = formikValues.requirements as Array<string>
    const tags:Array<string> = formikValues.tags as Array<string>
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
            formikSetValue('steps',newSteps);
            // formik.setFieldValue('steps',newSteps);
        }
        // setSteps(newSteps);
        setStepUpdOpen(false);
    };
  
    const closeStepCreator = (mode:'ADD'|'CANCEL', newStep?:IStep) => {
        if(mode === 'ADD' && newStep !== undefined){
            let tmpSteps = [...steps];
            tmpSteps.push({stepNumber:newStep.stepNumber, description:newStep.description, imgURL:newStep.imgURL as File});
            formikSetValue('steps', tmpSteps);
            // setSteps(tmpSteps);
            // formik.setFieldValue('steps',tmpSteps);
        }
        setStepCreatorOpen(false);
    }

    const handleRequirements = (mode:'ADD'|'DEL'|'CANCEL', description:string) =>{
        let tmpReqList = [...requirements];
        if (mode === 'ADD') {
            tmpReqList.push(description);
        }else{
            tmpReqList = tmpReqList.filter(e => e !== description);
        }
        if(mode !== 'CANCEL'){
            formikSetValue('requirements', tmpReqList);
        }
        // formik.setFieldValue('requirements',tmpReqList);
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
                    value={formikValues.title} 
                    onChange={(e)=>{formikSetValue('title',e.target.value)}} 
                    error={formikTouched.title && formikErrors.title !== undefined}
                    helperText={formikTouched.title && formikErrors.title as string}/>
                    
                </FormControl>
            </div>
            <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                <DescriptionIcon sx={{ color: 'action.active', my: 0.5 }} />
                <FormControl fullWidth sx={{ m: 1}}>
                    <TextField id="filled-textarea" multiline
                    value={formikValues.description} 
                    onChange={(e)=>{formikSetValue('description',e.target.value)}}
                    error={formikTouched.description && formikErrors.description !== undefined}
                    helperText={ formikTouched.description && formikErrors.description as string}
                    maxRows={10} label="Descripción" variant={inputVariant} required/>
                </FormControl>
            </div>

            <RequirementsList requirementsList={requirements} handleRequirements={handleRequirements} />
            <RequirementCreator open={reqCreatorOpen} handleRequirements={handleRequirements}/>
            <Container style={{marginBottom:'1vh'}} >
                {formikErrors.requirements ? <Typography sx={{textAlign:'center', color:'red'}}>{formikErrors.requirements as string}</Typography> : null}
                <Button onClick={()=>{setReqCreatorOpen(true)}}>Agregar Requisito o Material Necesario</Button>
            </Container>

            <StepContainer steps={steps} handleUpdate={openStepUpdate} />
            <StepCreator open={stepCreatorOpen} newStepNumber={steps.length + 1} handleClose={closeStepCreator} />
            {stepUpdOpen ? <StepUpdater open={stepUpdOpen} stepUpd={stepUpd as IStep} handleClose={closeStepUpdate}/> : null}
            
            <Container style={{marginBottom:'1vh'}} >
                {formikErrors.steps ? <Typography sx={{textAlign:'center', color:'red'}}>{formikErrors.steps as string}</Typography> : null}
                <Button onClick={()=>{setStepCreatorOpen(true)}}>Agregar Paso</Button>
            </Container>

            <TagHandler tags={tags} handleTag={formikSetValue} availableTags={categoriesList}/>
            {formikErrors.tags ? <Typography sx={{textAlign:'center', color:'red', ml:1.2, mt:-3}}>{formikErrors.tags as string}</Typography> : null}

        </Box>    
    )
}

export default TutorialForm;