import {  MutableRefObject } from 'react';

import { Container, Button, Chip} from "@mui/material";
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
            <Container sx={{textAlign:'center'}}>
                <Chip label="Categoria1" sx={{mb:2, mx:0.5}} />
                <Chip label="Categoria2" sx={{mb:2, mx:0.5}} />
                <Chip label="Categoria3" sx={{mb:2, mx:0.5}} />
            </Container>
                {
                    tutorialItems.map(item=>{
                        return(<FeedCard key={item._id as string } itemData={item} handleReaction={handleReaction} />)
                    })
                }
            </Container>
            <Button onClick={handleScroll} sx={{mt:'-2vh', mb:'10vh', alignSelf:'center'}} >Mostrar Más</Button>
        </Container>
    )
} 

export default FeedContainer;