//Logic
import { IFeedItem } from "@store/Slices/feedSlice";
import { TViewMode, IReactionBody } from '@views/Feed/FeedLoader';
//Components
import { Container, Typography} from "@mui/material";
import FeedCard from "./FeedCard";

interface IFeedContainerProps {
    data:Array<IFeedItem>
    handleReaction: (params:IReactionBody) => {};
    viewMode:TViewMode;
}

const FeedContainer = ({data, handleReaction, viewMode}:IFeedContainerProps) => {
    return(
        <Container sx={{display:'flex', paddingLeft:0, paddingRight:0, justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <Container  className="feedContainer" sx={{mt:3}} >
                {data !== undefined && data.length > 0 ?
                    data.map(item=>{
                        return(<FeedCard key={item._id as string } itemData={item} handleReaction={handleReaction} viewMode={viewMode} />)
                    })
                :<Typography variant="h6">No se encontraron Tutoriales</Typography>
                }
            </Container>
        </Container>
    )
} 

export default FeedContainer;