import { FeedContainer } from "@components/Feed";
import { useReactionMutation } from "@store/Services/Feed";
import { RootState, store } from '@store/store';
import { IFeedItem } from "@store/Slices/feedSlice";
import { Pagination, Stack, Container } from '@mui/material';
import { AlertDialog } from '@components/Misc';

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
  currentPage:number;
  totalPages?:number;
  setCurrentPage:(page:number)=>void;
  isError?:boolean;
  error?:any;
  hidePagination?:boolean;
  disableErrors?:boolean;
}

export const FeedLoader = ({ viewMode='MAIN', data, currentPage, setCurrentPage, totalPages, isError, error, hidePagination, disableErrors}:IFeedProps) => {
  const [ reaction ] = useReactionMutation();
  const currentUserId = (store.getState() as RootState).sec._id;
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleReaction = async ({tutorialId, reactionName, mode}:IReactionBody) => {
    try {
      await reaction({tutorialId, reactionName, userId:currentUserId, mode}).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <FeedContainer 
        data={(data as Array<IFeedItem>)}
        viewMode={viewMode} 
        handleReaction={handleReaction} />
        {!hidePagination && (data as Array<IFeedItem>).length > 0 ?
          <Container sx={{mb:'8vh', display:'flex', justifyContent:'center'}}>
            <Stack spacing={2}>
              <Pagination count={totalPages} page={currentPage} shape="rounded" onChange={handleChange} />
            </Stack>
          </Container>
          :null
        }
        {(isError && !disableErrors) && <AlertDialog isOpen={isError} type='ERROR' title="Ups!" description="Error al Conectar con el Servidor." />}
      </>
  );
}

