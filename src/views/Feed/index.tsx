//Logic
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IFeedItem, selectFeedItems, selectFeedDetails } from "@store/Slices/feedSlice";
import { useLazyFeedForLoggedQuery, useFeedForLoggedQuery} from "@store/Services/Feed";
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
    const [isLastPage, setLastPage] = useState(false);
    const [ trigger, {isLoading, isFetching, isError, error}] = useLazyFeedForLoggedQuery()
    const [currentData, setCurrentData] = useState<Array<IFeedItem>>([]);

    useEffect(()=>{
        async function getData() {
          const { data:newData } = await trigger({page:currentPage, userId});
          setLastPage( newData.page === newData.totalPages );
          setCurrentData([...currentData, ...newData.items]);
          }
        getData();
    
      },[currentPage]);

    return (
    <>
      <Header title="MiniTutoriales" showActionBtn={true} btnTitle="Crear Tutorial" btnIconType='ADD' btnAction={()=>{Navigator("/creator", {state:{isUpdate:false}})}} />
      <Typography variant="h6" sx={{mt:'8vh', ml:3}}>¿Que aprenderás Hoy?</Typography>
      <FeedLoader viewMode="MAIN"
        data={currentData}
        hideLoaderBtn={isLastPage}
        querySelector={selectFeedItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <AlertDialog isOpen={isError} type='ERROR' title="Ups!" description='Error al Conectar con el Servidor.' />
    </>
    );
}

export default Feed;