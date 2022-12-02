import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { IFeedItem } from "@store/Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCommUserItems, selectCommUserData, selectCommUserItems } from '@store/Slices/commUserSlice';
import { useLazyByUserQuery} from "@store/Services/Feed";
import { RootState, store } from '@store/store';
//Components
import Header from "@components/Header";
import { ProfileInfo } from '@components/Profile';

const CommonProfileView = () => {
    const Location = useLocation();
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ TriggerFeedByUser, {isLoading, isError, error}] = useLazyByUserQuery()
    const [ currentUser, setCurrentUser ] = useState(Location.state.userId)
    const tutorialItems = useSelector(selectCommUserItems);
    const feedDetails = useSelector(selectCommUserData);
    
    const dispatch = useDispatch();

    async function getData(userId:string) {
        const { data:newData } = await TriggerFeedByUser({page:currentPage, userId, mode:'LIST', currentUserLogged:(store.getState() as RootState).sec._id});
        dispatch(setCommUserItems({
          items: feedDetails.currentUser === currentUser && currentPage > feedDetails.page 
                ? [...tutorialItems, ...newData.items as Array<IFeedItem> ] 
                : newData.items as Array<IFeedItem>,
          itemsPerPage: newData.itemsPerPage,
          total: newData.total,
          totalPages: newData.totalPages,
          page: newData.page,
          currentUser
        }));
    }

    useEffect(()=>{
      getData(currentUser);
    
    },[currentUser, currentPage]);

    return (
    <>
      <Header title="Perfil del Usuario" />
      <ProfileInfo userData={{name:"John Doe", email:"oj_mejias@unicah.edu"}} uploadCount={tutorialItems.length} />
      <FeedLoader viewMode="MAIN"
        hideLoaderBtn={feedDetails.page === feedDetails.totalPages }
        querySelector={selectCommUserItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        isError={false}
        error={""}
      />
    </>
    );
}

export default CommonProfileView;