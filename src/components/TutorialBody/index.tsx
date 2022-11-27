import {useState} from 'react';
import {IFeedItem} from '@store/Slices/feedSlice';

import { Card, CardContent, CardActions, CardMedia, Typography, CardHeader, Avatar, IconButton } from "@mui/material";
import { green } from "@mui/material/colors";
import { RequirementsLiteList } from '@components/Requirements';
import { StepContainerLite } from '@components/Steps';

import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface ITutorialBodyParams {
  itemData:IFeedItem;
}

const TutorialBody = ({itemData}:ITutorialBodyParams) => {
    
    const {_id ,title, createdAt, description, requirements, reactionsCount, steps, userLiked, author_info} = itemData;
    // const [requirements2, setRequirements] = useState([
    //   "Requisito 1", "Requisito 2", "Requisito 3"
    // ]);

    return (
        <Card sx={{width: '100vw', marginBottom:2, backgroundColor:'#f5f5f5', borderRadius:3}}>
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
            <IconButton aria-label="add to favorites">
              <ThumbUpIcon/>
            </IconButton>
            <Typography sx={{ml:0.4, mt:'0.2vh'}}>0</Typography>
          </div>
          <IconButton aria-label="share">
            <ShareIcon  />
          </IconButton>
        </CardActions>
      </Card>
      )
} 

export default TutorialBody;