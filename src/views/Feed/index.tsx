//Logic
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setFeedItems, IFeedItem, selectFeedItems } from "@store/Slices/feedSlice";
import { useLazyFeedForLoggedQuery } from "@store/Services/Feed";
import { useNavigate } from 'react-router-dom';
//Components
import { FeedLoader } from '@views/Feed/FeedLoader';
import Header from "@components/Header";

const Feed = () => {
    const Navigator = useNavigate();
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ trigger, {isLoading, isError, error}] = useLazyFeedForLoggedQuery()

    const dispatch = useDispatch();
    const tutorialItems = useSelector(selectFeedItems);

    useEffect(()=>{
        async function getData() {

          const { data:newData } = await trigger(currentPage);

          dispatch(setFeedItems({
            items:[...tutorialItems, ...newData.items as Array<IFeedItem> ],
            itemsPerPage: newData.itemsPerPage,
            total: newData.total,
            totalPages: newData.totalPages,
            page: newData.page,
          }));
        }
        getData();
    
      },[currentPage]);

    return (
    <>
      <Header title="MiniTutoriales" showActionBtn={true} btnTitle="Crear Tutorial" btnAction={()=>{Navigator("/creator", {state:{isUpdate:false}})}} />
      <FeedLoader viewMode="MAIN"
        querySelector={selectFeedItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </>
    );
}

export default Feed;