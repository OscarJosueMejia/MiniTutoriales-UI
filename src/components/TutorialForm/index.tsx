import { useState } from 'react';
import {Box, TextField, FormControl, Typography, Button, Container, Dialog, Chip, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';

import { uploadImage } from '@utils/firebase';

import { StepContainer, StepCreator, StepUpdater } from '@components/Steps';

import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import HandymanIcon from '@mui/icons-material/Handyman';
import TagIcon from '@mui/icons-material/Tag';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AddIcon from '@mui/icons-material/Add';

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
    const [ tagDescTmp, setTagDescTmp ] = useState("");
    const [ tags, setTags ] = useState([] as Array<tags>)
    const [ tagError, setTagError ] = useState("")

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

    const handleTags = ( mode:'ADD'|'DEL', tagDescription?:string) => {
        let tmpTags = [...tags];

        if( mode === 'ADD' && !(tmpTags.some(e => (e.tagDescription === tagDescTmp))) ){
            tmpTags.push({tagDescription:tagDescTmp});
        }else{
            tmpTags = tmpTags.filter(tag => tag.tagDescription !== tagDescription);
        }
        setTagDescTmp("");
        setTags(tmpTags);
    }

    const handleTagChange = (e:any) => {
        
        if (tags.some(tag => ((tag.tagDescription).toLowerCase() === (e.target.value).toLowerCase()))) {
            setTagError(`Ya existe una etiqueta llamada "${e.target.value}"`);
        }else{
            setTagError("");
        }
        setTagDescTmp(e.target.value);
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

            <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                <HandymanIcon sx={{ color: 'action.active', my: 0.5 }} />
                <FormControl fullWidth sx={{ m: 1}}>
                    <TextField id="filled-textarea" multiline
                    maxRows={4} label="Requisitos o Materiales Necesarios" variant={inputVariant} required />
                </FormControl>
            </div>

            <StepContainer steps={steps} handleUpdate={openStepUpdate} />
            <Container style={{display:'flex', justifyContent:'center', marginBottom:'1vh'}} >
                <Button onClick={()=>{setStepCreatorOpen(true)}}>Agregar Paso</Button>
            </Container>

            <Container sx={{pb:'4vh'}} style={{paddingLeft:0, paddingRight:0}}>
                <Typography variant='h6' component='h6' sx={{mt:'2vh', display:'flex', alignItems:'center'}} >
                    <TagIcon sx={{ color: 'action.active', my: 0.5, mr:1}} />
                    Etiquetas
                </Typography>
                
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <FormControl fullWidth sx={{ m: 1, width:'60vw' }}>
                            <TextField error={tagError !== ""} helperText={tagError} id="filled-basic" label="Escribe una etiqueta" variant={inputVariant} value={tagDescTmp} onChange={(e)=>handleTagChange(e)} />
                    </FormControl>
                    <IconButton disabled={tagDescTmp === "" || tagError !== ""} aria-label="delete" size="large" 
                    onClick={()=>{handleTags('ADD')}}
                    >
                        <AddIcon fontSize="inherit" />
                    </IconButton>
                </div>

                <Container sx={{mt:1}} >
                        {
                            tags.length > 0 
                            ? tags.map(tag => {
                                return(
                                <Chip sx={{mx:1}} label={tag.tagDescription} onDelete={()=>{handleTags('DEL', tag.tagDescription)}} />
                                )
                            })
                            :null
                        }
                </Container>
            </Container>
            
            <StepCreator open={stepCreatorOpen} stepNumber={steps.length + 1} handleClose={closeStepCreator} />
            {stepUpdOpen ? <StepUpdater open={stepUpdOpen} stepUpd={stepUpd as IStep} handleClose={closeStepUpdate}/> : null}
            
        </Box>    
    )
}

export default TutorialForm;