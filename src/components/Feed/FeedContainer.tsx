import { TViewMode } from '@views/Feed/FeedLoader';
import { Container, Button, Chip} from "@mui/material";
import FeedCard from "./FeedCard";
import { useSelector } from "react-redux";
import { IFeedItem, selectFeedItems } from "@store/Slices/feedSlice";


interface IReactionBody {
    mode:'ADD'|'REMOVE';
    userId:unknown;
    tutorialId:unknown;
    reactionName:'LIKE'|'DISLIKE';
  }

interface IFeedContainerProps {
    handleReaction: (params:IReactionBody) => {};
    viewMode:TViewMode;
    querySelector: any;
    handleLoader: () => void;
    hideLoaderBtn?:boolean;
}

const FeedContainer = ({handleReaction, handleLoader, querySelector, viewMode, hideLoaderBtn}:IFeedContainerProps) => {
    const tutorialItems = useSelector(querySelector) as Array<IFeedItem>;

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
                        return(<FeedCard key={item._id as string } itemData={item} handleReaction={handleReaction} viewMode={viewMode} />)
                    })
                }
            </Container>
            { !hideLoaderBtn ? <Button onClick={handleLoader} sx={{mt:'-2vh', mb:'10vh', alignSelf:'center'}} >Mostrar Más</Button> : null}
        </Container>
    )
} 

export default FeedContainer;