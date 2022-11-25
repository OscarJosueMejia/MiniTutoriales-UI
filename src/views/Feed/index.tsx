import { useGetAllQuery } from "@store/Services/Feed";
import { useDispatch } from "react-redux";
import { setFeedItems } from "@store/Slices/feedSlice";
import { FeedContainer } from "@components/Feed";
import { useReactionMutation, useFeedForLoggedQuery } from "@store/Services/Feed";

import { ContentLoadingIndicator } from "@components/Misc";
import Header from "@components/Header";

import './feed.css';

export interface IReactionBody {
  mode:'ADD'|'REMOVE';
  userId:unknown;
  tutorialId:unknown;
  reactionName:'LIKE'|'DISLIKE';
}


const Feed = () => {
  const { data, isLoading } = useFeedForLoggedQuery(null);
  const [ reaction, { status, error } ] = useReactionMutation();
  const dispatch = useDispatch();

  async function getAllData(){
    let feedData = await data;
    dispatch(setFeedItems(feedData));
  }
  
  const handleReaction = async ({tutorialId, reactionName, userId, mode}:IReactionBody) => {
    try {
      const items = await reaction({tutorialId, reactionName, userId, mode}).unwrap();
      dispatch(setFeedItems(items));

    } catch (error) {
      console.log(error);
    }
  }
  
  getAllData();

  return (
    <>
      <Header/>
      {isLoading ?
        <ContentLoadingIndicator />
        :<FeedContainer handleReaction={handleReaction} />
      }
    </>
  );
}
export default Feed;
