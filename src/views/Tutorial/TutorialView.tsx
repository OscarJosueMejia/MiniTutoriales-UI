//Logical
import { useLocation } from "react-router-dom";
import { useGetOneQuery } from "@store/Services/Feed";
import {IFeedItem} from '@store/Slices/feedSlice';
//Frame
import Header from "@components/Header";
import TutorialBody from "@components/TutorialBody";
//Misc
import { ContentLoadingIndicator } from "@components/Misc";
import { Container } from "@mui/material";
import './tutorial.css';

const Tutorial = () => {
  const Location = useLocation();
  const { _id } = Location.state as Partial<IFeedItem>;
  const result = useGetOneQuery(_id);

    return (
        <>
          <Header/>
          {result.isLoading ?
            <ContentLoadingIndicator />
            :<Container className='tutorialViewContainer'>
              <TutorialBody itemData={result.data}/>
            </Container>
          }
        </>
      );
}

export default Tutorial;