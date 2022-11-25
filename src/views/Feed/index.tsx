import { useEffect } from "react";
import { useGetAllQuery } from "@store/Services/Feed";
import { useDispatch, useSelector } from "react-redux";
import { setFeedItems, selectFeedItems } from "@store/Slices/feedSlice";

import { Container, Button} from "@mui/material";
import FeedCard from "@components/Card";
import Header from "@components/Header";

import './feed.css';

const Feed = () => {
  const { data } = useGetAllQuery(null);
  const dispatch = useDispatch();
  const tutorialItems = useSelector(selectFeedItems);;

  async function getAllData(){
    let feedData = await data;
    dispatch(setFeedItems(feedData));

  }
  useEffect(()=>{
    getAllData();
  },[])

  return (
    <>
      <Header/>
      <Container className="feedContainer">
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
      </Container>
    </>
  );
}
export default Feed;
