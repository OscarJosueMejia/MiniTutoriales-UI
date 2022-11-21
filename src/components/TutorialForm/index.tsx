import {Box, TextField, FormControl, Typography, Button} from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import HandymanIcon from '@mui/icons-material/Handyman';

const inputVariant = 'filled';

const TutorialForm = () => {
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
                        <TextField id="filled-basic" label="Título" variant={inputVariant} />
                </FormControl>
            </div>
            <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                <DescriptionIcon sx={{ color: 'action.active', my: 0.5 }} />
                <FormControl fullWidth sx={{ m: 1}}>
                    <TextField id="filled-textarea" multiline
                    maxRows={10} label="Descripción" variant={inputVariant} />
                </FormControl>
            </div>

            <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                <HandymanIcon sx={{ color: 'action.active', my: 0.5 }} />
                <FormControl fullWidth sx={{ m: 1}}>
                    <TextField id="filled-textarea" multiline
                    maxRows={4} label="Requisitos o Materiales Necesarios" variant={inputVariant} />
                </FormControl>
            </div>

                <Typography variant='h6' component='h6' sx={{mt:'2vh'}} >
                    Lista de Pasos
                </Typography>

                <FormControl fullWidth sx={{ m: 1 , bgcolor:'e4e4e4'}}>
                    <TextField id="filled-textarea" multiline
                    maxRows={10} label="Descripción" variant={inputVariant} />
                    <input 
                        accept="image/jpeg,image/png"
                        type="file" 
                        name=""
                    />
                    <Button variant="contained" color="success" sx={{mt:1}}>
                        Agregar
                    </Button>
                </FormControl>
        </Box>    
    )
}

export default TutorialForm;