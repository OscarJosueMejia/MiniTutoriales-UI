import { FeedContainer } from "@components/Feed";
import { useReactionMutation } from "@store/Services/Feed";
import { RootState, store } from '@store/store';
import { IFeedItem } from "@store/Slices/feedSlice";

import { ContentLoadingIndicator } from "@components/Misc";
import './feed.css';

export type TViewMode = "USER" | "MAIN";
export interface IReactionBody {
  mode:'ADD'|'REMOVE';
  tutorialId:unknown;
  reactionName:'LIKE'|'DISLIKE';
}

interface IFeedProps{
  data?:Array<IFeedItem>;
  viewMode?:TViewMode;
  querySelector?:any;
  currentPage:number;
  setCurrentPage:(page:number)=>void;
  isLoading?:boolean;
  isError?:boolean;
  error?:any;
  hideLoaderBtn?:boolean;
}


export const FeedLoader = ({data, viewMode='MAIN', querySelector, currentPage, setCurrentPage, isLoading, isError, error, hideLoaderBtn}:IFeedProps) => {
  const [ reaction ] = useReactionMutation();
  const currentUserId = (store.getState() as RootState).sec._id;

  const handleLoader = () => {
      setCurrentPage(currentPage+1);
  } 

  const handleReaction = async ({tutorialId, reactionName, mode}:IReactionBody) => {
    try {
      await reaction({tutorialId, reactionName, userId:currentUserId, mode}).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      {(isLoading) ?
        <ContentLoadingIndicator />
        :<FeedContainer 
        data={data}
        hideLoaderBtn={ hideLoaderBtn }
        viewMode={viewMode} 
        handleReaction={handleReaction} 
        querySelector={querySelector} 
        handleLoader={handleLoader} />
      }
    </>
  );
}

