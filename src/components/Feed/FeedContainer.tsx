import { Container } from "@mui/material";
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
    handleReaction: (params:IReactionBody) => {}
}

const FeedContainer = ({handleReaction}:IFeedContainerProps) => {
    const tutorialItems = useSelector(selectFeedItems);
    return(
    <Container className="feedContainer">
        {
            tutorialItems.map(item=>{
                return(<FeedCard itemData={item} handleReaction={handleReaction} />)
            })
        }
    </Container>
    )
} 

export default FeedContainer;