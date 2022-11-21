import {useState} from 'react';
import { BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import Home from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const TabNavigator = () => {
    const [value, setValue] = useState('recents');
  
    const handleChange = (event:any, newValue:any) => {
      setValue(newValue);
    };
  
    return (
    <Paper sx={{display:'flex', justifyContent:'center', position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={5}>
        <BottomNavigation   sx={{width: 500}} value={value} onChange={handleChange}>
            <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<Home />}
            />
            <BottomNavigationAction
            label="Favorites"
            value="favorites"
            icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
            label="Nearby"
            value="nearby"
            icon={<LocationOnIcon />}
            />
            <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
        </BottomNavigation>
      </Paper>

    );
  }

  export default TabNavigator;