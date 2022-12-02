//Logic
import { useSelector } from "react-redux";
import { IFeedItem } from "@store/Slices/feedSlice";
import { TViewMode, IReactionBody } from '@views/Feed/FeedLoader';
//Components
import { Container, Button, Typography} from "@mui/material";
import FeedCard from "./FeedCard";

interface IFeedContainerProps {
    data?:Array<IFeedItem>
    handleReaction: (params:IReactionBody) => {};
    viewMode:TViewMode;
    querySelector: any;
    handleLoader: () => void;
    hideLoaderBtn?:boolean;
}

const FeedContainer = ({data, handleReaction, handleLoader, querySelector, viewMode, hideLoaderBtn}:IFeedContainerProps) => {
    const altData = useSelector(querySelector);

    if (!data){
        data = altData as Array<IFeedItem>
    }

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
            { !hideLoaderBtn ? <Button onClick={handleLoader} sx={{mt:'-2vh', mb:'10vh', alignSelf:'center'}} >Mostrar Más</Button> : null}
        </Container>
    )
} 

export default FeedContainer;