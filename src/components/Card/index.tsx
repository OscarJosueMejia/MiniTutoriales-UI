import { Card, CardContent, CardActions, CardMedia, Button, Typography, CardHeader, Avatar, IconButton } from "@mui/material";
import { PropsWithChildren } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import './Card.css';

interface CardProps {
  title? : string;
}

const FeedCard = ({children, title, ..._props}: PropsWithChildren<CardProps>)=>{
  return (
    <Card sx={{maxWidth: 450, marginBottom:2, backgroundColor:'#e4e4e4', borderRadius:3}}>
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
export default FeedCard;
