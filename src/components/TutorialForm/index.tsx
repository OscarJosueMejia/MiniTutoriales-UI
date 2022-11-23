import { useState } from 'react';
import {Box, TextField, FormControl, Typography, Button, Container, Dialog, Chip, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';

import ImgPicker from "./ImgPicker";
import {FileWithPath} from 'react-dropzone'

import { uploadImage } from '@utils/firebase';
import StepItem from './StepItem';
import StepUpdater from './StepUpdater';

import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import HandymanIcon from '@mui/icons-material/Handyman';
import TagIcon from '@mui/icons-material/Tag';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

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
    const [stepDescTmp, setStepDescTmp] = useState("");
    const [steps, setSteps] = useState([] as Array<IStep>);
    const [tagDescTmp, setTagDescTmp] = useState("");
    const [refImg, setRefImg] = useState<File>();
    const [tags, setTags] = useState([] as Array<tags>)
    const [tagError, setTagError] = useState("")

    //Upd
    const [stepUpd, setStepUpd] = useState<IStep>();
    const [stepUpdOpen, setStepUpdOpen] = useState(false);

    const openStepUpdate = (step:IStep) => {
      setStepUpd(step);
      setStepUpdOpen(true);
    };

    const closeStepUpdate = (mode:'UPD'|'CANCEL'|'DEL', newStep?:IStep) => {
        if (mode === 'UPD' && newStep !== undefined) {
            const updatedStepList = steps.map( step => {
                if (step.id === newStep.id) {
                  step.description = newStep.description;
                  step.img = newStep.img;
                }
                return step;
            });
            setSteps(updatedStepList) 
        }

        if(mode === 'DEL' && stepUpd !== undefined){
            const updatedStepList = steps.filter(step => step.id !== stepUpd.id);
            const fixedIds = updatedStepList.map(o => { if(o.id > stepUpd.id){o.id--} return o})
            setSteps(fixedIds) 
        }
        
        setStepUpdOpen(false);
    };
  
    const addStep = () => {
        let tmpSteps = [...steps];
        tmpSteps.push({id:steps.length + 1, description:stepDescTmp, img:refImg as File})
        setSteps(tmpSteps);
        setStepDescTmp("");
        setRefImg(undefined);
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


            <Container sx={{mt:0.5, mb:3}} style={{display:'flex', alignItems:'center', flexDirection:'column', paddingLeft:8, paddingRight:8}} >
                <Typography variant='h6' component='h6' sx={{mt:'2vh', display:'flex', alignItems:'center'}} alignSelf='flex-start' >
                    <FormatListNumberedIcon sx={{ color: 'action.active', my: 0.5, mr:1}} />
                    Lista de Pasos
                </Typography>
                {steps.length > 0 ?
                    steps.map(step=>{
                        return(< StepItem key={step.id} step={step} updateStep={openStepUpdate} />)
                    })
                    :<Container sx={{mt:2, bgcolor:'#f0f0f0', py:1,borderRadius:3, textAlign:'center'}} >
                        <Typography  style={{color:'gray'}}> Agrega al menos 1 Paso </Typography>
                    </Container>
                }
            </Container>

            <FormControl fullWidth sx={{ m: 1 , bgcolor:'#f0f0f0'}}>
                <TextField id="filled-textarea" multiline
                maxRows={10} label={`Descripción del Paso ${steps.length+1}`} value={stepDescTmp}  variant={inputVariant} onChange={e=>setStepDescTmp(e.target.value)} />
                <ImgPicker  buttonTitle='Subir Imagen de Referencia' setFile={setRefImg}  />
                
                {!refImg ? null
                    :<div style={{marginTop:'3vh', marginBottom:'2vh',textAlign:'center'}}>
                        <img style={{maxWidth:'50%', borderRadius:10}} src={URL.createObjectURL(refImg as FileWithPath)} alt="" />
                    </div>
                }

                <Button variant="contained" color="success" disabled={stepDescTmp === ""} sx={{mt:1}} onClick={()=>{addStep()}}>
                    Agregar Paso #{steps.length+1}
                </Button>
            </FormControl>


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
            
            {stepUpdOpen ? <StepUpdater open={stepUpdOpen} stepUpd={stepUpd as IStep} handleClose={closeStepUpdate}/> : null}
            
        </Box>    
    )
}

export default TutorialForm;