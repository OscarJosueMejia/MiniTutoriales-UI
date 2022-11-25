import { Card, CardContent, CardActions, CardMedia, Button, Typography, CardHeader, Avatar, IconButton } from "@mui/material";
import { PropsWithChildren } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import {IFeedItem} from '@store/Slices/feedSlice';
import { useNavigate } from "react-router-dom";

interface IReactionBody {
  mode:'ADD'|'REMOVE'; 
  userId:unknown;
  tutorialId:unknown;
  reactionName:'LIKE'|'DISLIKE';
}

interface IFeedCardProps {
  itemData:IFeedItem
  handleReaction: (params:IReactionBody) => {}
}

const FeedCard = ({itemData, handleReaction}:IFeedCardProps)=>{
  const Navigate = useNavigate();
  const {_id ,title, createdAt, description, reactionsCount, userLiked} = itemData;

  return (
    <Card sx={{maxWidth: 450, marginBottom:2, backgroundColor:'#e4e4e4', borderRadius:2}}>
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
      onClick={()=>{Navigate('/home/tutorial',{state:{itemData}})}}
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
      <Typography variant="body2" sx={{minWidth:'120vw'}} color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <div style={{display:'flex', alignItems:'center', marginRight:'2vw'}}>
        <IconButton aria-label="add to favorites"
        onClick={()=>{handleReaction({mode:!userLiked ? 'ADD' : 'REMOVE', tutorialId:_id, userId:'6355bf4a972277413bb7ddca', reactionName:'LIKE'})}}
        >
          <FavoriteIcon color={userLiked ? 'info' : "disabled"} />
        </IconButton>
        <Typography sx={{ml:0.4, mt:'0.2vh'}}>{reactionsCount.reaction_IsUtil.length}</Typography>
      </div>
      <IconButton aria-label="share">
        <ShareIcon  />
      </IconButton>
    </CardActions>
  </Card>
  )
}
export default FeedCard;
