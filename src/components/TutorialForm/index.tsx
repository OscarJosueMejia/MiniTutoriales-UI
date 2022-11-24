import { useState } from 'react';
import {Box, TextField, FormControl, Typography, Button, Container, Dialog, Chip, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import { StepContainer, StepCreator, StepUpdater } from '@components/Steps';
import { TagHandler } from '@components/Tags';
import { RequirementsHandler } from '@components/Requirements';

import { uploadImage } from '@utils/firebase';

import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import HandymanIcon from '@mui/icons-material/Handyman';

const inputVariant = 'filled';

export interface IStep {
    id:number;
    description:string;
    img?:File | string;
}

interface tags {
    tagDescription: string;
}

const TutorialForm = () => {
    const [ steps, setSteps ] = useState([] as Array<IStep>);
    const [ tags, setTags ] = useState([] as Array<tags>)

    //Add
    const [ stepCreatorOpen, setStepCreatorOpen ] = useState(false);
    
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
                if (step.id === newStep.id) {
                    step.description = newStep.description;
                    step.img = newStep.img;
                }
                return step;
            });
        }
        if(mode === 'DEL' && stepUpd !== undefined){
            newSteps = steps.filter(step => step.id !== stepUpd.id);
            newSteps = newSteps.map(o => { if(o.id > stepUpd.id){o.id--} return o})
        }
        setSteps(newSteps);
        setStepUpdOpen(false);
    };
  
    const closeStepCreator = (mode:'ADD'|'CANCEL', newStep?:IStep) => {
        if(mode === 'ADD' && newStep !== undefined){
            let tmpSteps = [...steps];
            tmpSteps.push({id:newStep.id, description:newStep.description, img:newStep.img as File});
    
            setSteps(tmpSteps);
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

        setTags(tmpTags);
    }

    const uploadImages = async () => {
        // let imgURI = await uploadImage(acceptedFiles[0]);
        // alert(imgURI);
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
                        <TextField id="filled-basic" label="Título" variant={inputVariant} required/>
                </FormControl>
            </div>
            <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                <DescriptionIcon sx={{ color: 'action.active', my: 0.5 }} />
                <FormControl fullWidth sx={{ m: 1}}>
                    <TextField id="filled-textarea" multiline
                    maxRows={10} label="Descripción" variant={inputVariant} required/>
                </FormControl>
            </div>

            {/* <RequirementsHandler /> */}
            
            <StepContainer steps={steps} handleUpdate={openStepUpdate} />
            <Container style={{display:'flex', justifyContent:'center', marginBottom:'1vh'}} >
                <Button onClick={()=>{setStepCreatorOpen(true)}}>Agregar Paso</Button>
            </Container>

            <TagHandler tags={tags} handleTag={handleTags}/>
            
            <StepCreator open={stepCreatorOpen} stepNumber={steps.length + 1} handleClose={closeStepCreator} />
            {stepUpdOpen ? <StepUpdater open={stepUpdOpen} stepUpd={stepUpd as IStep} handleClose={closeStepUpdate}/> : null}
            
        </Box>    
    )
}

export default TutorialForm;