import { FeedLoader } from '@views/Feed/FeedLoader';
import {useState, useEffect} from 'react';
import { IFeedItem } from "@store/Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFeedItems, setUserFeedItems, selectUserFeedDetails} from "@store/Slices/userFeedSlice";
import { useLazyByUserQuery } from "@store/Services/Feed";
import Header from "@components/Header";

const ProfileView = () => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ TriggerFeedByUser, {isLoading, isError, error}] = useLazyByUserQuery()

    const dispatch = useDispatch();
    const tutorialItems = useSelector(selectUserFeedItems);
    const feedDetails = useSelector(selectUserFeedDetails);

    useEffect(()=>{
        async function getData() {

          const { data:newData } = await TriggerFeedByUser({page:currentPage, userId:'6355bf4a972277413bb7ddca'});
          if(currentPage > feedDetails.page){
            dispatch(setUserFeedItems({
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
      <Header title="Mi Perfil" />
      <FeedLoader viewMode="USER"
        hideLoaderBtn={feedDetails.page === feedDetails.totalPages }
        querySelector={selectUserFeedItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </>
    );
}

export default ProfileView;