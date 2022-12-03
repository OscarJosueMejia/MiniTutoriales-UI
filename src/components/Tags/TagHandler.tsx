import { useState } from "react";
import { Theme, useTheme } from '@mui/material/styles';
import { Container, Typography, FormControl, InputLabel, MenuItem, Box, OutlinedInput, TextField, IconButton, Chip} from "@mui/material"
import { ICategories } from '@store/Slices/categorySlice';
import TagIcon from '@mui/icons-material/Tag';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ITagHandlerProps {
    tags:Array<string>;
    handleTag: Function;
    availableTags:Array<ICategories>
}

export const TagHandler = ({tags, handleTag, availableTags}:ITagHandlerProps) => {
    const handleChange = (event: SelectChangeEvent<typeof tags>) => {
        const { target: { value }} = event;
        if(tags.length < 3){
            handleTag('tags', value as Array<string>);
        }
    };

    return(
        <Container sx={{pb:'4vh'}} style={{paddingLeft:0, paddingRight:0}}>
                <Typography variant='h6' component='h6' sx={{mt:'2vh', display:'flex', alignItems:'center'}} >
                    <TagIcon sx={{ color: 'action.active', my: 0.5, mr:1}} />
                    Categorías
                </Typography>

                <FormControl sx={{ mt:1.5, ml:1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Seleccionar</InputLabel>
                    <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={tags}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Seleccionar" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={ availableTags.filter(e => e._id === value)[0].title } />
                        ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                    >
                    {availableTags.map((tag) => (
                        <MenuItem
                        key={tag._id as string}
                        value={tag._id as string}
                        >
                        {tag.title}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Container>
    )
}

