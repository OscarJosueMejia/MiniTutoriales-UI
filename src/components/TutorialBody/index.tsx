//Logic
import {useState} from 'react';
import {IFeedItem} from '@store/Slices/feedSlice';
import { StepContainerLite } from '@components/Steps';
import { useAddCommentMutation, useDeleteCommentMutation } from '@store/Services/Feed';
//Components
import { Card, CardContent, Container, CardActions, CardMedia, Divider, Typography, CardHeader, FormControl, Avatar, IconButton, TextField, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import { TViewMode, IReactionBody } from '@views/Feed/FeedLoader';
import { RequirementsLiteList } from '@components/Requirements';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface ITutorialBodyParams {
  itemData:IFeedItem;
  viewMode:TViewMode;
  handleReaction: (params:IReactionBody) => {};
}

export interface ITutorialComment{
  _id?: unknown;
  userId: unknown; 
  authorName:string;
  text: string;
}

const TutorialBody = ({itemData, handleReaction}:ITutorialBodyParams) => {
    const Navigator = useNavigate();
    const [ addComment ] = useAddCommentMutation();
    const [ deleteComment ] = useDeleteCommentMutation();
    const {_id ,title, authorId, createdAt, description, requirements, comments, reactionsCount, steps, userLiked, author_info} = itemData;
    
    const currentUserId = '638715a091b5ed67eddd8579';
    const currentUserName = 'AngelLagos01';

    const [isUserLiked, setIsUserLiked] = useState(userLiked);
    const [userLikesCount, setUserLikesCount] = useState(reactionsCount.reaction_IsUtil.length);

    const [postComments, setPostComments] = useState<Array<ITutorialComment>>(comments);
    const [newComment, setNewComment] = useState("");

    const HandleReactionClick = () => {
      handleReaction({mode:!isUserLiked ? 'ADD' : 'REMOVE', tutorialId:_id, userId:currentUserId, reactionName:'LIKE'});
      setIsUserLiked(!isUserLiked);
      setUserLikesCount(!isUserLiked ? userLikesCount + 1 : userLikesCount - 1)
    }

    const HandleAddComment = async () => {
      const commentStructure = {tutorialId:_id as string, userId:currentUserId, authorName:currentUserName, text:newComment}
      const result = await addComment(commentStructure);
      let newLocalComments = [...postComments];
      newLocalComments.push({...commentStructure, ...{_id:(result as {data:{newId:string}}).data.newId}});
      setPostComments(newLocalComments);
      setNewComment("");
    }
    const HandleDeleteComment = async (commentId:string) => {
      const commentStructure = {tutorialId:_id as string, commentId}

      await deleteComment(commentStructure);
      let newLocalComments = postComments.filter(e => e._id !== commentId);
      setPostComments(newLocalComments);
    }
    
    return (
        <Card sx={{width: '100vw', marginBottom:2, backgroundColor:'#f5f5f5', borderRadius:3}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe" onClick={()=>{Navigator('/home/profile', {state:{userId:authorId}})}}>
            {`${(author_info[0].name).split(' ')[0][0]}${(author_info[0].name).split(' ')[1][0]}`}
            </Avatar>
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
        <Typography sx={{mt:2, ml:'0.8rem'}}>Comentarios</Typography>
        <CardContent sx={{display:'flex', alignItems:'center'}}>
        <FormControl fullWidth sx={{ m: 0 , bgcolor:'#f0f0f0'}}>
              <TextField id="filled-textarea" multiline
              maxRows={10} label="Escribe un Comentario..." variant='standard' value={newComment} onChange={(e)=>{setNewComment(e.target.value)}} />
          </FormControl>
          <Button sx={{ml:2}} variant='contained' disabled={newComment == ""} onClick={()=>{HandleAddComment()}}>Agregar</Button>
        
        </CardContent>
          { postComments !== undefined && postComments.length > 0
            ?<CardContent sx={{display:'flex', alignItems:'center', flexDirection:'column'}}>
              {
                postComments.map(comment=>{
                  return(
                    <Container sx={{px:0, my:0.5, py:0.7, bgcolor: 'background.paper', borderRadius:1, display:'flex', justifyContent:'space-between'}}>
                      <div>
                        <Typography color='#1976d2' sx={{fontSize:15, pl:"0.8rem"}}>{comment.authorName} {currentUserId === author_info[0]._id ? <span style={{marginLeft:2, color:"#787A91"}}>(Autor)</span>  : null } </Typography>
                        <Typography sx={{pt:0.5, pl:"1rem"}}>{comment.text}</Typography>
                      </div>
                      { comment.userId === currentUserId 
                        ? <IconButton sx={{mx:2}}  onClick={()=>{HandleDeleteComment(comment._id as string)}}>
                            <DeleteIcon />
                          </IconButton>
                        : null
                      }
                      
                    </Container>
                  )
                })
              }
              
            </CardContent>
            :<Typography sx={{textAlign:'center', my:2}}>Aún no hay Comentarios.</Typography>
          }
          
          
      </Card>
      )
} 

export default TutorialBody;