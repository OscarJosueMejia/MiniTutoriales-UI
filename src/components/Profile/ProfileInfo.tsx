import {Container, Avatar, Typography, Button} from '@mui/material';
import { green } from "@mui/material/colors";
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';

interface IProfileInfoProps {
    userData:{
        name:string,
        email:string
    };
    uploadCount:number;
}

const ProfileInfo = ({userData, uploadCount}:IProfileInfoProps) => {
    return(
        <Container sx={{mt:10}}>
        <div style={{backgroundColor:'#eceff1', display:'flex',textAlign:'center',  justifyContent:'center', flexDirection:'column', borderRadius:5, paddingTop:'2vh', paddingBottom:'1vh'}}> 
          <Avatar sx={{ bgcolor: green[500], alignSelf:'center', width:'60px', height:'60px'}} aria-label="recipe">
            {`${(userData.name).split(' ')[0][0]}${(userData.name).split(' ')[1][0]}`}
          </Avatar>
          <Typography sx={{my:1}} variant="h6">{userData.name}</Typography>
          <Typography sx={{mb:1, display:'flex', alignSelf:'center'}}><EmailIcon sx={{mr:1, color:'#3C4048'}}/> {userData.email}</Typography>
          <Typography sx={{display:'flex', alignSelf:'center'}}><DescriptionIcon sx={{mr:1, color:'#3C4048'}}/>{uploadCount} Tutoriales Publicados</Typography>
        </div>
      </Container>
    )
}

export default ProfileInfo;