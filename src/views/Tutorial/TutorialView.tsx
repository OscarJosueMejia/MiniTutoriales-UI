//Logical
import { useLocation, useNavigate } from "react-router-dom";
import { useGetOneQuery, useReactionMutation } from "@store/Services/Feed";
import {IFeedItem} from '@store/Slices/feedSlice';
import { TViewMode, IReactionBody } from '@views/Feed/FeedLoader';
//Frame
import Header from "@components/Header";
import TutorialBody from "@components/TutorialBody";
//Misc
import { ContentLoadingIndicator } from "@components/Misc";
import { Container } from "@mui/material";
import './tutorial.css';

const Tutorial = () => {
  const [ reaction ] = useReactionMutation();
  const Navigator = useNavigate();
  const Location = useLocation();
  const { _id, viewMode } = Location.state as Partial<IFeedItem> & {viewMode:TViewMode};
  const result = useGetOneQuery(_id);

  const handleReaction = async ({tutorialId, reactionName, userId, mode}:IReactionBody) => {
    try {
      await reaction({tutorialId, reactionName, userId, mode}).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header title="MiniTutorial" showActionBtn={ viewMode === "USER" } btnIconType='UPD' btnTitle="Editar Tutorial" btnAction={()=>{Navigator("/creator", {state:{itemData:result.data, isUpdate:true}})}} />
      {result.isLoading ?
        <ContentLoadingIndicator />
        :<Container className='tutorialViewContainer'>
          <TutorialBody itemData={result.data} viewMode={viewMode} handleReaction={handleReaction} />
        </Container>
      }
    </>
  );
}

export default Tutorial;