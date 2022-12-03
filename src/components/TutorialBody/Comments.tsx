import {useState} from 'react';
import { Typography, IconButton, FormControl, TextField, Button, CardContent, Container } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

interface ICommentsProps {
  authorId:string;
  currentUserId:string;
  comments:Array<{_id:string, userId:string, tutorialId:string, authorName:string, text:string}>
  handleComment: (mode:'ADD'|'DEL', newComment:string, commentId?:string) => {}
}

export const Comments = ({authorId, currentUserId, comments, handleComment}:ICommentsProps) => {
    const [newComment, setNewComment] = useState("");

    return(
      <>
        <Typography sx={{mt:2, ml:'0.8rem'}}>Comentarios</Typography>
        <CardContent sx={{display:'flex', alignItems:'center'}}>
        <FormControl fullWidth sx={{ m: 0 , bgcolor:'#f0f0f0'}}>
              <TextField id="filled-textarea" multiline
              maxRows={10} label="Escribe un Comentario..." variant='standard' value={newComment} onChange={(e)=>{setNewComment(e.target.value)}} />
          </FormControl>
          <Button sx={{ml:2}} variant='contained' disabled={newComment == ""} onClick={()=>{handleComment('ADD', newComment)}}>Agregar</Button>
        
        </CardContent>
          { comments !== undefined && comments.length > 0
            ?<CardContent sx={{display:'flex', alignItems:'center', flexDirection:'column'}}>
              {
                comments.map(comment=>{
                  return(
                    <Container key={comment._id as string} sx={{px:0, my:0.5, py:0.7, bgcolor: 'background.paper', borderRadius:1, display:'flex', justifyContent:'space-between'}}>
                      <div>
                        <Typography color='#1976d2' sx={{fontSize:15, pl:"0.8rem"}}>{comment.authorName} {comment.userId === authorId ? <span style={{marginLeft:2, color:"#787A91"}}>(Autor)</span>  : null } </Typography>
                        <Typography sx={{pt:0.5, pl:"1rem"}}>{comment.text}</Typography>
                      </div>
                      { comment.userId === currentUserId 
                        ? <IconButton sx={{mx:2}}  onClick={()=>{handleComment('DEL', "", comment._id)}}>
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
      </>
    )
}
