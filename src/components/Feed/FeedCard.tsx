import { useState } from 'react';
import { Card, CardContent, CardActions, CardMedia, Button, Typography, CardHeader, Avatar, IconButton } from "@mui/material";
import { green } from "@mui/material/colors";
import ShareIcon from '@mui/icons-material/Share';
import {IFeedItem} from '@store/Slices/feedSlice';
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
  const {_id ,title, createdAt, description, reactionsCount, userLiked, author_info} = itemData;
  const [isUserLiked, setIsUserLiked] = useState(userLiked);
  const [userLikesCount, setUserLikesCount] = useState(reactionsCount.reaction_IsUtil.length);

  const HandleReactionClick = () => {
    handleReaction({mode:!isUserLiked ? 'ADD' : 'REMOVE', tutorialId:_id, userId:'6355bf4a972277413bb7ddca', reactionName:'LIKE'});
    setIsUserLiked(!isUserLiked);
    setUserLikesCount(!isUserLiked ? userLikesCount + 1 : userLikesCount - 1)
  }

  return (
    <Card sx={{width: '100vw', marginBottom:2, backgroundColor:'#eceff1', borderRadius:2}}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
        {`${(author_info[0].name).split(' ')[0][0]}${(author_info[0].name).split(' ')[1][0]}`}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
        </IconButton>
      }
      onClick={()=>{Navigate('/home/tutorial',{state:{_id}})}}
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
        onClick={HandleReactionClick}>
          <ThumbUpIcon color={isUserLiked ? 'info' : "disabled"} />
        </IconButton>
        <Typography sx={{ml:0.4, mt:'0.2vh'}}>{userLikesCount}</Typography>
      </div>
      <IconButton aria-label="share">
        <ShareIcon  />
      </IconButton>
    </CardActions>
  </Card>
  )
}
export default FeedCard;
