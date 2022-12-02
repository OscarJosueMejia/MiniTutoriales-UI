import { useState } from 'react';
import { Card, CardContent, CardActions, CardMedia, Button, Typography, CardHeader, Avatar, IconButton } from "@mui/material";
import { green, lightBlue, lightGreen, indigo, orange, teal} from "@mui/material/colors";
import {IFeedItem} from '@store/Slices/feedSlice';
import { useNavigate } from "react-router-dom";
import { TViewMode, IReactionBody } from '@views/Feed/FeedLoader';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';

interface IFeedCardProps {
  itemData:IFeedItem
  viewMode:TViewMode
  handleReaction: (params:IReactionBody) => {}
}

const colors = [green[500], lightBlue[500], lightGreen[500], indigo[500], orange[500], teal[500]];

const FeedCard = ({itemData, handleReaction, viewMode}:IFeedCardProps)=>{
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
    <motion.div style={{width: '90vw', maxWidth:500}} initial={{ scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{type:'spring', stiffness: 180, damping: 20}}>
    <Card sx={{marginBottom:2, backgroundColor:'#eceff1', borderRadius:2}}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: colors[4] }} aria-label="recipe">
        {`${(author_info[0].name).split(' ')[0][0]}${(author_info[0].name).split(' ')[1][0]}`}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
        </IconButton>
      }
      onClick={()=>{Navigate('/home/tutorial',{state:{_id, viewMode}})}}
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
          {isUserLiked 
            ?<FavoriteIcon color='info' />
            :<FavoriteBorderIcon />
          }
          
        </IconButton>
        <Typography sx={{ml:0.4, mt:'0.2vh'}}>{userLikesCount}</Typography>
      </div>
    </CardActions>
  </Card>
  </motion.div>
  )
}
export default FeedCard;
