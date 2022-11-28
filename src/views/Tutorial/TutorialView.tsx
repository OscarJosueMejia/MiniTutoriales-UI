//Logical
import { useLocation, useNavigate } from "react-router-dom";
import { useGetOneQuery } from "@store/Services/Feed";
import {IFeedItem} from '@store/Slices/feedSlice';
import { TViewMode } from '@views/Feed/FeedLoader';
//Frame
import Header from "@components/Header";
import TutorialBody from "@components/TutorialBody";
//Misc
import { ContentLoadingIndicator } from "@components/Misc";
import { Container } from "@mui/material";
import './tutorial.css';

const Tutorial = () => {
  const Navigator = useNavigate();
  const Location = useLocation();
  const { _id, viewMode } = Location.state as Partial<IFeedItem> & {viewMode:TViewMode};
  const result = useGetOneQuery(_id);

    return (
        <>
          <Header title="MiniTutorial" showActionBtn={ viewMode === "USER" } btnIconType='UPD' btnTitle="Editar Tutorial" btnAction={()=>{Navigator("/creator", {state:{itemData:result.data, isUpdate:true}})}} />
          {result.isLoading ?
            <ContentLoadingIndicator />
            :<Container className='tutorialViewContainer'>
              <TutorialBody itemData={result.data} viewMode={viewMode}/>
            </Container>
          }
        </>
      );
}

export default Tutorial;