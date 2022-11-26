import {useState, useRef, MutableRefObject, useEffect} from 'react';
import { useGetAllQuery } from "@store/Services/Feed";
import { useDispatch, useSelector } from "react-redux";
import { setFeedItems, IFeedItem, selectFeedItems } from "@store/Slices/feedSlice";
import { FeedContainer } from "@components/Feed";
import { useReactionMutation, useFeedForLoggedQuery } from "@store/Services/Feed";
import { feedApi } from "@store/Services/Feed";
import Button from "@mui/material/Button";
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
  const [currentPage, setCurrentPage] = useState(1);
  const result = useFeedForLoggedQuery(currentPage);
  const [ reaction, { status, error } ] = useReactionMutation();
  const dispatch = useDispatch();
  const tutorialItems = useSelector(selectFeedItems);


  useEffect(()=>{
    async function getData() {
      let newData = await result.currentData;
      dispatch(setFeedItems({
        items:[...tutorialItems, ...newData.items as Array<IFeedItem> ],
        itemsPerPage: newData.itemsPerPage,
        total: newData.total,
        totalPages: newData.totalPages,
        page: newData.page,
      }));
    }
    getData();

  },[result, currentPage]);
  

  const listInnerRef = useRef() as MutableRefObject<HTMLInputElement>;;

  const handleScroll = () => {
      setCurrentPage(currentPage+1);
  } 

  const handleReaction = async ({tutorialId, reactionName, userId, mode}:IReactionBody) => {
    try {
      await reaction({tutorialId, reactionName, userId, mode}).unwrap();

    } catch (error) {
      console.log(error);
    }
  }

  // getData();

  return (
    <>
      <Header/>
      {result.isLoading ?
        <ContentLoadingIndicator />
        :<FeedContainer handleReaction={handleReaction} handleScroll={handleScroll} scrollRef={listInnerRef} />
      }
    </>
  );
}
export default Feed;
