import { useState } from "react";
import { Container, Typography, FormControl, TextField, IconButton, Chip} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import TagIcon from '@mui/icons-material/Tag';

interface ITag {
    tagDescription: string;
}

interface ITagHandlerProps {
    tags:Array<ITag>;
    handleTag: (mode:'ADD'|'DEL', tagDescription:string) => void;
}

export const TagHandler = ({tags, handleTag}:ITagHandlerProps) => {
    const [ tagDescTmp, setTagDescTmp ] = useState("");
    const [ tagError, setTagError ] = useState("");

    const handleTextChange = (e:any) => {
        if (tags.some(tag => ((tag.tagDescription).toLowerCase() === (e.target.value).toLowerCase()))) {
            setTagError(`Ya existe una etiqueta llamada "${e.target.value}"`);
        }else{
            setTagError("");
        }
        setTagDescTmp(e.target.value);
    }

    return(
        <Container sx={{pb:'4vh'}} style={{paddingLeft:0, paddingRight:0}}>
                <Typography variant='h6' component='h6' sx={{mt:'2vh', display:'flex', alignItems:'center'}} >
                    <TagIcon sx={{ color: 'action.active', my: 0.5, mr:1}} />
                    Etiquetas
                </Typography>
                
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <FormControl fullWidth sx={{ m: 1, width:'60vw' }}>
                            <TextField error={tagError !== ""} helperText={tagError} id="filled-basic" label="Escribe una etiqueta" variant='filled' value={tagDescTmp} onChange={handleTextChange} />
                    </FormControl>
                    <IconButton disabled={tagDescTmp === "" || tagError !== ""} aria-label="delete" size="large" 
                    onClick={()=>{handleTag('ADD', tagDescTmp); setTagDescTmp('')}}>
                        <AddIcon fontSize="inherit" />
                    </IconButton>
                </div>

                <Container sx={{mt:1}} >
                        {tags.length > 0 
                            ? tags.map(tag => {
                                return(<Chip sx={{mx:1}} label={tag.tagDescription} 
                                    onDelete={()=>{handleTag('DEL', tag.tagDescription);}} />)
                            })
                            :null
                        }
                </Container>
            </Container>
    )
}