//Logical
import {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useGetOneQuery, useReactionMutation, useDeleteTutorialMutation, useAddCommentMutation, useDeleteCommentMutation } from "@store/Services/Feed";
import {IFeedItem} from '@store/Slices/feedSlice';
import { TViewMode, IReactionBody } from '@views/Feed/FeedLoader';
import { RootState, store } from '@store/store';
//Frame
import Header from "@components/Header";
import TutorialBody from "@components/TutorialBody";
import { AlertDialog } from '@components/Misc';
//Misc
import { ContentLoadingIndicator } from "@components/Misc";
import { Container } from "@mui/material";
import { LoadingButton } from '@mui/lab';

import './tutorial.css';

const Tutorial = () => {
  const Navigator = useNavigate();
  const Location = useLocation();
  const [ reaction ] = useReactionMutation();
  const [ deleteTutorial, {isLoading:isDeletingTutorial} ] = useDeleteTutorialMutation();
  const [ addComment ] = useAddCommentMutation();
  const [ deleteComment ] = useDeleteCommentMutation();
  const [showDialog, setShowDialog] = useState(false);

  const currentUserId = (store.getState() as RootState).sec._id;
  const currentUserName = 'Oscar Mejia';
  
  const { _id, viewMode } = Location.state as Partial<IFeedItem> & {viewMode:TViewMode};
  const {data, isLoading, isError, error, refetch} = useGetOneQuery({tutorialId:_id as string, userId:currentUserId});


  const handleReaction = async ({tutorialId, reactionName, mode}:IReactionBody) => {
    try {
      await reaction({tutorialId, reactionName, userId:currentUserId, mode}).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  const HandleComment = async (mode:'ADD'|'DEL', newComment:string, commentId?:string) => {
    switch (mode) {
      case 'ADD':
        await addComment({tutorialId:_id as string, userId:currentUserId, authorName:currentUserName, text:newComment as string});
      break;
      case 'DEL':
        await deleteComment({tutorialId:_id as string, commentId:commentId as string});
      break;
    }
    refetch();
  }

  const HandleDelete = async () => {
    await deleteTutorial(_id as string);
    Navigator('/home/', {replace:true});
  }

  return (
    <>
      <Header title="MiniTutorial" showActionBtn={ viewMode === "USER" } btnIconType='UPD' btnTitle="Editar Tutorial" btnAction={()=>{Navigator("/creator", {state:{itemData:data !== undefined ? data : null, isUpdate:true}})}} />
      {(isLoading || data === undefined)  ?
        <ContentLoadingIndicator />
        :<Container className='tutorialViewContainer'>
            <TutorialBody 
            itemData={data} 
            handleComment={HandleComment}
            viewMode={viewMode} 
            handleReaction={handleReaction} 
            currentUserId={currentUserId} 
            currentUserName={currentUserName} />
            { viewMode === "USER" && 
              <LoadingButton color='error' onClick={()=>{setShowDialog(true)}} sx={{mt:1}}  loading={isDeletingTutorial}>
                Eliminar Tutorial
              </LoadingButton>
            }

            { showDialog && <AlertDialog isOpen={showDialog} type='DIALOG' title="Eliminar Tutorial" description={`El Tutorial "${data.title}" será eliminado.`} onDialogAccept={()=>{HandleDelete()}} /> }
        </Container>
      }
    </>
  );
}

export default Tutorial;