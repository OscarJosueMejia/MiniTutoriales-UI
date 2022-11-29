import { useState } from 'react';

import {Box, Stack, Grid, InputLabel, MenuItem,  Button, TextField, FormControl} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate, useLocation } from "react-router-dom";


export const CategoryUpdate = () => {
    const [age, setAge] = useState('');

    const location = useLocation();

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return(
        <Box 
            component="form"
            noValidate
            sx={{ display: 'flex', flexWrap: 'wrap' }}
            autoComplete="off">
            <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <FormControl  sx={{ m: 1}} className="form-control">
                    {
                        location.state.mode === "UPD" ? 
                        <TextField id="outlined-basic" label="Título" required/>
                        : <TextField id="outlined-basic" label="Título" disabled/>
                    }
                </FormControl>
            </div>
            
            <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <FormControl  sx={{ m: 1 }} className="form-control">
                    {
                        location.state.mode === "UPD" ? 
                        <TextField id="filled-textarea" multiline maxRows={4} label="Descripción" required/>
                        : <TextField id="filled-textarea" multiline maxRows={4} label="Descripción" disabled/>
                    }
                </FormControl>
            </div>

            <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <FormControl  sx={{ m: 1 }} className="form-control">
                    <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                    {
                        location.state.mode === "UPD" ? 
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Estado" onChange={handleChangeStatus}>
                            <MenuItem value="ACT">Activo</MenuItem>
                            <MenuItem value="INA">Inactivo</MenuItem>
                        </Select>
                        : <TextField id="outlined-basic" label="Estado" InputProps={{readOnly: true}}/>
                    }
                </FormControl>
            </div>

            <Box style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}} sx={{ '& button': { m: 1 } }}>
                <div >
                    {
                        location.state.mode === "UPD" ? 
                        <Button variant="outlined" color="success" startIcon={<CreateOutlinedIcon />}>Actualizar</Button>
                        : <Button variant="outlined" color="success" startIcon={<DeleteOutlineOutlinedIcon />}>Eliminar</Button>
                    }
                    <Button variant="outlined" color="error" startIcon={<HighlightOffIcon />}>Cancelar</Button>
                </div>
            </Box>

        </Box>
    )
}
