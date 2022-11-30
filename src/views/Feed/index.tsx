//Logic
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setFeedItems, IFeedItem, selectFeedItems, selectFeedDetails } from "@store/Slices/feedSlice";
import { useLazyFeedForLoggedQuery } from "@store/Services/Feed";
import { useNavigate } from 'react-router-dom';
//Components
import { FeedLoader } from '@views/Feed/FeedLoader';
import Header from "@components/Header";
import { AlertDialog } from '@components/Misc';

const Feed = () => {
    const Navigator = useNavigate();
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ trigger, {isLoading, isError, error}] = useLazyFeedForLoggedQuery()
    
    const dispatch = useDispatch();
    const tutorialItems = useSelector(selectFeedItems);
    const feedDetails = useSelector(selectFeedDetails);
  

    useEffect(()=>{
        async function getData() {

          const { data:newData } = await trigger(currentPage);
          if(currentPage > feedDetails.page){
            dispatch(setFeedItems({
              items:[...tutorialItems, ...newData.items as Array<IFeedItem> ],
              itemsPerPage: newData.itemsPerPage,
              total: newData.total,
              totalPages: newData.totalPages,
              page: newData.page,
            }));
          }
        }
        getData();
    
      },[currentPage]);

    return (
    <>
      <Header title="MiniTutoriales" showActionBtn={true} btnTitle="Crear Tutorial" btnIconType='ADD' btnAction={()=>{Navigator("/creator", {state:{isUpdate:false}})}} />
      <FeedLoader viewMode="MAIN"
        hideLoaderBtn={feedDetails.page === feedDetails.totalPages }
        querySelector={selectFeedItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <AlertDialog isOpen={isError} type='ERROR' title="Ups!" description='Algo no salió como debería...' />
    </>
    );
}

export default Feed;