import {  MutableRefObject } from 'react';

import { Container, Button } from "@mui/material";
import FeedCard from "./FeedCard";
import { useSelector } from "react-redux";
import { selectFeedItems } from "@store/Slices/feedSlice";

interface IReactionBody {
    mode:'ADD'|'REMOVE';
    userId:unknown;
    tutorialId:unknown;
    reactionName:'LIKE'|'DISLIKE';
  }

interface IFeedContainerProps {
    handleReaction: (params:IReactionBody) => {};
    handleScroll: () => void;
    scrollRef: MutableRefObject<HTMLInputElement>
}

const FeedContainer = ({handleReaction, handleScroll, scrollRef}:IFeedContainerProps) => {
    const tutorialItems = useSelector(selectFeedItems);

    return(
        <Container sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <Container  className="feedContainer" >
                {
                    tutorialItems.map(item=>{
                        return(<FeedCard itemData={item} handleReaction={handleReaction} />)
                    })
                }
            </Container>
            <Button onClick={handleScroll} sx={{mt:'-2vh', mb:'10vh', alignSelf:'center'}} >Mostrar Más</Button>
        </Container>
    )
} 

export default FeedContainer;