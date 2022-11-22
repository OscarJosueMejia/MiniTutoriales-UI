import { useState } from "react";
import { Container, Avatar, FormControl, TextField, InputAdornment, IconButton, Button} from "@mui/material";

import ImgDialog from "./ImgDialog";
import EditIcon from '@mui/icons-material/Edit';

interface IStepItemProps {
    step:{
        id?:number;
        description:string;
        img?:File | string;
    };
}

const StepItem = ({ step } : IStepItemProps) => {
    const [updateActive, setUpdateActive] = useState(false);
    const [updStepDesc, setUpdStepDesc] = useState(step.description);
    const [updStepImg, setUpdStepImg] = useState(step.img);

    const [selectedValue, setSelectedValue] = useState("");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = (value: string) => {
        setOpen(false);
        if(value === 'deleteImg'){
            setUpdStepImg("");
        }
    };

    return(
        <Container key={step.id} sx={{mt:2, bgcolor:'#e2e2e2'}} style={{paddingRight:5, paddingLeft:5, borderRadius:5}} >
        <div style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', marginTop:'0.5vh'}}>
            <Avatar sx={{ bgcolor: '#6B728E', width: 30, height: 30, mx:1}} aria-label="recipe">{step.id}</Avatar>
            <FormControl fullWidth sx={{bgcolor:'#f0f0f0'}}>
                <TextField id="filled-textarea" multiline
                sx={{bgcolor:'#f0f0f0'}} 
                
                InputProps={{
                    readOnly: !updateActive,
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={()=>{setUpdateActive(!updateActive)}}
                            >
                            <EditIcon/>
                        </IconButton>
                    </InputAdornment>,
                }}
                maxRows={10} label={`Paso ${step.id}`} variant='filled' value={updStepDesc} onChange={(e)=>{setUpdStepDesc(e.target.value)}}/>
            </FormControl>
            
        </div>
        {updStepImg !== undefined && updStepImg !== ""
            ?<div style={{marginTop:'3vh', marginBottom:'2vh',textAlign:'center'}}>
                <img onClick={handleClickOpen} style={{maxWidth:'40%', borderRadius:10}} src={URL.createObjectURL(updStepImg as File)} alt=""></img>
            </div>
            :null
        }

        {updateActive 
            ?<Container sx={{my:2, display:'flex', justifyContent:'center'}}>
                <Button variant="contained" color="success" onClick={()=>{setUpdateActive(false)}} > Modificar Paso {step.id} </Button>
            </Container>
            :null
        }

        <ImgDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
        />
    </Container>
    )
}


export default StepItem;