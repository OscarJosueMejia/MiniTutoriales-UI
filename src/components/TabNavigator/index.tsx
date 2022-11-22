import {useState} from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, SpeedDial} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import Home from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import AddIcon from '@mui/icons-material/Add';

const TabNavigator = () => {
    const [value, setValue] = useState('recents');
  
    const handleChange = (event:any, newValue:any) => {
      setValue(newValue);
    };
  
    return (
    <Paper sx={{display:'flex', justifyContent:'center', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex:10}} elevation={5}>
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
        {/* <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: '8vh', right: '2vh'}}
          icon={<AddIcon />}
        >
        </SpeedDial> */}
      </Paper>

    );
  }

  export default TabNavigator;