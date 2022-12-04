//Logic
import {useState} from 'react';
import {IFeedItem} from '@store/Slices/feedSlice';
import { StepContainerLite } from '@components/Steps';
import { colors } from '@components/Feed/FeedCard';
//Components
import { Card, CardContent, Container, CardActions, CardMedia, Divider, Typography, CardHeader, FormControl, Avatar, IconButton, TextField, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import { TViewMode, IReactionBody } from '@views/Feed/FeedLoader';
import { RequirementsLiteList } from '@components/Requirements';
import { Comments } from './Comments';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { RootState, store } from '@store/store';


interface ITutorialBodyParams {
  itemData:IFeedItem;
  viewMode:TViewMode;
  currentUserId:string;
  currentUserName:string;
  handleReaction: (params:IReactionBody) => {};
  handleComment: (mode:'ADD'|'DEL', newComment:string, commentId?:string) => {}
}

export interface ITutorialComment{
  _id?: unknown;
  userId: unknown; 
  authorName:string;
  text: string;
}

const TutorialBody = ({itemData, handleReaction, currentUserId, handleComment}:ITutorialBodyParams) => {
    const Navigator = useNavigate();
    const {_id ,title, authorId, createdAt, description, requirements, comments, reactionsCount, steps, userLiked, author_info} = itemData;
    
    const [isUserLiked, setIsUserLiked] = useState(userLiked);
    const [userLikesCount, setUserLikesCount] = useState(reactionsCount.reaction_IsUtil.length);

    const HandleReactionClick = () => {
      handleReaction({mode:!isUserLiked ? 'ADD' : 'REMOVE', tutorialId:_id, reactionName:'LIKE'});
      setIsUserLiked(!isUserLiked);
      setUserLikesCount(!isUserLiked ? userLikesCount + 1 : userLikesCount - 1)
    }
  
    return (
        <Card sx={{width: '100vw', marginBottom:2, backgroundColor:'#f5f5f5', borderRadius:3}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: colors[author_info[0].avatar as number] }} aria-label="recipe" 
            onClick={()=>{
              if(authorId === (store.getState() as RootState).sec._id){
                Navigator('/user/')
              }else{
                Navigator('/home/profile', {state:{userId:authorId}})
              }}}>

            {`${(author_info[0].name).split(' ')[0][0]}${(author_info[0].name).split(' ')[1][0]}`}
            </Avatar>
          }
          title={title}
          
          subheader={new Date(createdAt).toLocaleString('es-ES', {day:'2-digit',month:'long', year:'numeric', hour:'numeric', hour12:true, minute:'2-digit'})} 
          />
        <CardMedia
          component="img"
          height="194"
          image="https://cdn.dribbble.com/users/104171/screenshots/1863083/media/1f609237cc4ee69d9072cf360b768a64.jpg"
          alt="tutorialdefault"
        />
        <CardContent>
          <Typography variant="body1" sx={{minWidth:'150vw'}} color="text.secondary">
            Autor: {author_info[0].name}
          </Typography>
          <Typography variant="body1" sx={{minWidth:'150vw', mt:2, mb:2}} color="text.primary">
            {description}
          </Typography>
          <RequirementsLiteList requirementsList={requirements as unknown} />
          <StepContainerLite steps={steps} />
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
        
        <Divider />
        <Comments authorId={author_info[0]._id as string} currentUserId={currentUserId} handleComment={handleComment} comments={comments} />
      </Card>
      )
} 

export default TutorialBody;