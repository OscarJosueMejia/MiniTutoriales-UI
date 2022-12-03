import { Container, Typography, FormControl, List, TextField,  ListItem, IconButton, ListItemText } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import HandymanIcon from '@mui/icons-material/Handyman';

interface IRequirementsHandlerProps {
    requirementsList: unknown;
    handleRequirements: (mode:'ADD'|'DEL'|'CANCEL', description:string) => void;
}

export const RequirementsList = ({requirementsList, handleRequirements}:IRequirementsHandlerProps) => {
    
    return(
        <Container sx={{mt:0.5, mb:0.5}} style={{display:'flex', alignItems:'flex-start', flexDirection:'column', paddingLeft:8, paddingRight:8}} >
            <Typography variant='h6' component='h6' sx={{mt:'2vh', display:'flex', alignItems:'center'}} alignSelf='flex-start' >
                <HandymanIcon sx={{ color: 'action.active', my: 0.5, mr:1}} />
                Materiales o Requisitos
            </Typography>
        
            <List sx={{minWidth:'50%', maxWidth:'100%', bgcolor: 'background.paper', pl:2 }}>
                {
                (requirementsList as Array<unknown>).length > 0 ?
                    (requirementsList as Array<unknown>).map((value) => (
                    <ListItem
                        key={value as string}
                        disableGutters
                        secondaryAction={
                        <IconButton aria-label="comment"
                        onClick={()=>{handleRequirements('DEL', value as string)}}
                        >
                            <ClearIcon />
                        </IconButton>
                        }>
                        <ListItemText primary={`- ${value as string}`} />
                    </ListItem>
                )) : null }
            </List>
        </Container>   
    )
}

