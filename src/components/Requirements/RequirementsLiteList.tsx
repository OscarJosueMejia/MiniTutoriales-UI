import { Container, Typography, FormControl, List, TextField,  ListItem, IconButton, ListItemText } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import HandymanIcon from '@mui/icons-material/Handyman';

interface IRequirementsHandlerProps {
    requirementsList: unknown;
}

export const RequirementsLiteList = ({requirementsList}:IRequirementsHandlerProps) => {
    
    return(
        <Container sx={{mt:0.5, mb:0.5}} style={{display:'flex', alignItems:'flex-start', flexDirection:'column', paddingLeft:1, paddingRight:1}} >
            <Typography variant='h6' component='h6' sx={{mt:'2vh', display:'flex', alignItems:'center'}} alignSelf='flex-start' >
                <HandymanIcon sx={{ color: 'action.active', my: 0.5, mr:1}} />
                Materiales o Requisitos
            </Typography>
        
            <List sx={{width:'100%', bgcolor: 'background.paper', borderRadius:1, mt:1}}>
                {(requirementsList as Array<unknown>).length > 0 ?
                    (requirementsList as Array<unknown>).map((value) => (
                    <ListItem key={value as string} sx={{pl:2}} disableGutters>
                        <ListItemText primary={`- ${value as string}`} />
                    </ListItem>
                )) : null }
            </List>
        </Container>   
    )
}

