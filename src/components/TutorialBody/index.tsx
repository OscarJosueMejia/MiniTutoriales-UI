import {useState} from 'react';
import { Card, CardContent, CardActions, CardMedia, Button, Typography, CardHeader, Avatar, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { RequirementsLiteList } from '@components/Requirements';
import { StepContainerLite } from '@components/Steps';

const TutorialBody = () => {
    const [requirements, setRequirements] = useState([
      "Requisito 1", "Requisito 2", "Requisito 3"
    ]);

    const [steps, setSteps] = useState([
      {id:1, description:'Step 1', img: undefined},
      {id:2, description:'Step 1', img: undefined},
      {id:3, description:'Step 1', img: undefined},
      {id:4, description:'Step 1', img: undefined},
    ]);

    return (
        <Card sx={{maxWidth: 500, marginBottom:2, backgroundColor:'#e4e4e4', borderRadius:3}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image="https://cdn-icons-png.flaticon.com/512/292/292333.png"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
          <RequirementsLiteList requirementsList={requirements} />
          <StepContainerLite steps={steps} />
        </CardContent>


        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      )
} 

export default TutorialBody;