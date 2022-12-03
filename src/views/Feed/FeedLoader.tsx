import { FeedContainer } from "@components/Feed";
import { useReactionMutation } from "@store/Services/Feed";
import { ContentLoadingIndicator } from "@components/Misc";

import './feed.css';

export type TViewMode = "USER" | "MAIN";

export interface IReactionBody {
  mode:'ADD'|'REMOVE';
  userId:unknown;
  tutorialId:unknown;
  reactionName:'LIKE'|'DISLIKE';
}

interface IFeedProps{
  viewMode?:TViewMode;
  querySelector:any;
  currentPage:number;
  setCurrentPage:(page:number)=>void;
  isLoading:boolean;
  isError:boolean;
  error:any;
  hideLoaderBtn?:boolean;
}

export const FeedLoader = ({viewMode='MAIN', querySelector, currentPage, setCurrentPage, isLoading, isError, error, hideLoaderBtn}:IFeedProps) => {
  const [ reaction ] = useReactionMutation();
  
  const handleLoader = () => {
      setCurrentPage(currentPage+1);
  } 

  const handleReaction = async ({tutorialId, reactionName, userId, mode}:IReactionBody) => {
    try {
      await reaction({tutorialId, reactionName, userId, mode}).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {(isLoading) ?
        <ContentLoadingIndicator />
        :<FeedContainer 
        hideLoaderBtn={ hideLoaderBtn }
        viewMode={viewMode} 
        handleReaction={handleReaction} 
        querySelector={querySelector} 
        handleLoader={handleLoader} />
      }
    </>
  );
}

