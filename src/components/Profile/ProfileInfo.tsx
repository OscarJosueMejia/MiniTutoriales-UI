import {useState} from 'react';
import {Container, Avatar, Typography, MenuItem, Menu, Divider, ListItemIcon} from '@mui/material';
import { green } from "@mui/material/colors";
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { colors } from '@components/Feed/FeedCard';
import { useNavigate } from 'react-router-dom';

interface IProfileInfoProps {
    userData:{
        name:string,
        email:string
        avatar?:number;
    };
    uploadCount:number;
    isUserLogged?:boolean;
    isLikedMode?:boolean;
}

const ProfileInfo = ({userData, uploadCount, isLikedMode, isUserLogged}:IProfileInfoProps) => {
    const Navigator = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if(isUserLogged){
        setAnchorEl(event.currentTarget);
      }
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return(
      <>
        <Container sx={{mt:10}}>
        <div style={{backgroundColor:'#eceff1', display:'flex',textAlign:'center',  justifyContent:'center', flexDirection:'column', borderRadius:5, paddingTop:'2vh', paddingBottom:'1vh'}}> 
          <Avatar sx={{ bgcolor: colors[userData.avatar as number], alignSelf:'center', width:'60px', height:'60px'}} aria-label="recipe"
                  onClick={handleClick}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
          >
            {`${(userData.name).split(' ')[0][0]}${(userData.name).split(' ')[1][0]}`}
          </Avatar>
          <Typography sx={{my:1}} variant="h6">{userData.name}</Typography>
          <Typography sx={{mb:1, display:'flex', alignSelf:'center'}}><EmailIcon sx={{mr:1, color:'#3C4048'}}/> {userData.email}</Typography>
          {
            isLikedMode ?<Typography sx={{display:'flex', alignSelf:'center'}}><FavoriteIcon sx={{mr:1, color:'#3C4048'}}/>{uploadCount} Tutoriales con "Me Gusta"</Typography>
            :<Typography sx={{display:'flex', alignSelf:'center'}}><DescriptionIcon sx={{mr:1, color:'#3C4048'}}/>{uploadCount} Tutoriales Publicados</Typography>
          }
          
        </div>
      </Container>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>{Navigator('/auth/')}}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cambiar Contraseña
        </MenuItem>
        <MenuItem onClick={()=>{Navigator('/auth/')}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
      
      </>
    )
}

export default ProfileInfo;