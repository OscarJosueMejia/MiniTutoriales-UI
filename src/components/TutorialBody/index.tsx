import {useState} from 'react';
import { Card, CardContent, CardActions, CardMedia, Button, Typography, CardHeader, Avatar, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import {IFeedItem} from '@store/Slices/feedSlice';
import { RequirementsLiteList } from '@components/Requirements';
import { StepContainerLite } from '@components/Steps';
import { useLocation } from 'react-router-dom';

const TutorialBody = () => {
    const Location = useLocation();
    const {title, createdAt, steps, description, reactionsCount} = Location.state.itemData as IFeedItem;;

    const [requirements, setRequirements] = useState([
      "Requisito 1", "Requisito 2", "Requisito 3"
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
          title={title}
          subheader={new Date(createdAt).toLocaleString('es-ES', {day:'2-digit',month:'long', year:'numeric', hour:'numeric', hour12:true, minute:'2-digit'})}
          />
        <CardMedia
          component="img"
          height="194"
          image="https://cdn-icons-png.flaticon.com/512/292/292333.png"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body1" sx={{minWidth:'150vw'}} color="text.secondary">
            {description}
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