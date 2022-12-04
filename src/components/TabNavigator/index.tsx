import {useState} from 'react';
import { useNavigate } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction, Paper, SpeedDial} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import Home from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AddIcon from '@mui/icons-material/Add';

interface ITabNavProps {
  tab:string;
}
const TabNavigator = ({tab}:ITabNavProps) => {
    const Navigator = useNavigate();
    const [value, setValue] = useState(tab);
  
    const handleChange = (event:any, newValue:any) => {
      setValue(newValue);
      Navigator(newValue);
    };
  
    return (
    <Paper sx={{display:'flex', justifyContent:'center', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex:10}} elevation={5}>
        <BottomNavigation   sx={{width: 500}} 
        value={value} onChange={handleChange}>
            <BottomNavigationAction
            label="Principal"
            value="/home/"
            icon={<HomeOutlinedIcon />}
            />
            <BottomNavigationAction
            label="Buscar"
            value="/find/"
            icon={<SearchSharpIcon />}
            />
            <BottomNavigationAction
            label="Categorías"
            value="/categories/"
            icon={<FormatListBulletedOutlinedIcon />}
            />
            <BottomNavigationAction 
            label="Mi Perfil" 
            value="/user/" 
            icon={<PersonOutlineOutlinedIcon />} 
            />
        </BottomNavigation>
      </Paper>

    );
  }

  export default TabNavigator;