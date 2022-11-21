import { useState } from 'react';
import {Box, TextField, FormControl, Typography, Button, Container, Avatar} from '@mui/material';
import {useDropzone, FileWithPath} from 'react-dropzone';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import HandymanIcon from '@mui/icons-material/Handyman';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const inputVariant = 'filled';

interface steps {
    id?:number;
    description:string;
    img?:File | string;
}

const TutorialForm = () => {
    const [stepDescTmp, setStepDescTmp] = useState("");
    const [steps, setSteps] = useState([] as Array<steps>);
    
    const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        noClick: true,
        noKeyboard: true
      });

    const files = acceptedFiles.map((file:FileWithPath) => (
        <div style={{marginTop:'3vh', marginBottom:'2vh',textAlign:'center'}}>
            <img style={{maxWidth:'40%', borderRadius:10}} src={URL.createObjectURL(file)} alt="" />
        </div>
    ));

    const addStep = () => {
        let tmpSteps = [...steps];
        tmpSteps.push({id:steps.length + 1, description:stepDescTmp, img:acceptedFiles[0]})
        setSteps(tmpSteps);
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

            <Typography onClick={()=>{console.log(steps)}} variant='h6' component='h6' sx={{mt:'2vh', display:'flex', alignItems:'center'}} >
                <FormatListNumberedIcon sx={{ color: 'action.active', my: 0.5, mr:1}} />
                Lista de Pasos
            </Typography>

            <Container sx={{mt:0.5, mb:3}} style={{display:'flex', alignItems:'center', flexDirection:'column'}} {...getRootProps({className: 'dropzone'})}>
                
                {
                    steps.length > 0 ?
                    steps.map(step=>{
                        return(
                            <Container key={step.id} sx={{mt:2, bgcolor:'#f0f0f0'}} style={{paddingRight:5, paddingLeft:5, borderRadius:5}} {...getRootProps({className: 'dropzone'})}>
                                <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', marginTop:'0.5vh'}}>
                                    <Avatar sx={{ bgcolor: '#6B728E', width: 30, height: 30, mx:1}} aria-label="recipe">{step.id}</Avatar>
                                    <FormControl fullWidth sx={{bgcolor:'#f0f0f0'}}>
                                        <TextField id="filled-textarea" multiline
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        maxRows={10} label={`Paso ${step.id}`} variant={inputVariant} value={step.description}/>
                                    </FormControl>
                                </div>
                                {step.img !== undefined
                                    ?<div style={{marginTop:'3vh', marginBottom:'2vh',textAlign:'center'}}>
                                        <img style={{maxWidth:'40%', borderRadius:10}} src={URL.createObjectURL(step.img as File)} alt="" />
                                    </div>
                                    :null
                                }
                                
                            </Container>
                        )
                    })
                    :<Container sx={{mt:2, bgcolor:'#f0f0f0', py:1, px:5, borderRadius:5, textAlign:'center'}} {...getRootProps({className: 'dropzone'})}>
                        <Typography> <i> Agrega al menos 1 Paso </i></Typography>
                    </Container>
                }
               
            </Container>
            <FormControl fullWidth sx={{ m: 1 , bgcolor:'#f0f0f0'}}>
                <TextField id="filled-textarea" multiline
                maxRows={10} label={`Descripción del Paso ${steps.length+1}`} variant={inputVariant} onChange={e=>setStepDescTmp(e.target.value)} />
                
                <Container sx={{mt:2}} style={{paddingLeft:0}} {...getRootProps({className: 'dropzone'})}>
                    <input accept="image/jpeg,image/png" type="file" {...getInputProps()} />
                    <Button variant="contained" sx={{ml:1}} type='button' onClick={open}>Subir una Imagen de Referencia</Button>
                    {files}
                </Container>
                <Button variant="contained" color="success" sx={{mt:1}} onClick={()=>{addStep()}}>
                    Agregar Paso #{steps.length+1}
                </Button>
            </FormControl>
        </Box>    
    )
}

export default TutorialForm;