//Logic
import {useState} from 'react';
import { FeedData } from "@store/Slices/feedSlice";
import { useFeedForLoggedQuery} from "@store/Services/Feed";
import { useNavigate } from 'react-router-dom';
import { RootState, store } from '@store/store';

//Components
import { FeedLoader } from '@views/Feed/FeedLoader';
import Header from "@components/Header";
import { AlertDialog } from '@components/Misc';
import { Typography } from '@mui/material';

const Feed = () => {
    const Navigator = useNavigate();
    const userId = (store.getState() as RootState).sec._id;
    const [ currentPage, setCurrentPage ] = useState(1);
    const { data, error, isError, isLoading } = useFeedForLoggedQuery({page:currentPage, userId}, {refetchOnFocus:true})
    return (
    <>
      <Header title="MiniTutoriales" showActionBtn={true} btnTitle="Crear Tutorial" btnIconType='ADD' btnAction={()=>{Navigator("/creator", {state:{isUpdate:false}})}} />
      <Typography variant="h6" sx={{mt:'8vh', ml:3}}>¿Que aprenderás Hoy?</Typography>
      {data &&
        <FeedLoader viewMode="MAIN"
          data={(data as FeedData).items}
          totalPages={(data as FeedData).totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      }
      {isError && <AlertDialog isOpen={isError} type='ERROR' title="Ups!" description={JSON.stringify(error)} />}
    </>
    );
}

export default Feed;