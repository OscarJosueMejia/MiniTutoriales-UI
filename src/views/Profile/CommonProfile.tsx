import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { FeedData } from "@store/Slices/feedSlice";
import { useByUserQuery } from "@store/Services/Feed";
import { RootState, store } from '@store/store';

//Components
import Header from "@components/Header";
import { ProfileInfo } from '@components/Profile';
import { CardSkeleton } from "@components/Misc";

const CommonProfileView = () => {
    const Location = useLocation();
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentUser, setCurrentUser ] = useState(Location.state.userId)

    const { data, isLoading, isError, error } = useByUserQuery({page:currentPage, userId:currentUser, mode:'LIST', currentUserLogged:(store.getState() as RootState).sec._id});
    
    return (
    <>
      <Header title="Perfil del Usuario" />
      {isLoading && data === undefined ? <CardSkeleton /> 
      :
      <>
        <ProfileInfo userData={{name:data.userData.name, email:data.userData.email, avatar:data.userData.avatar}} uploadCount={ (data as FeedData).items.length}  />
        <FeedLoader viewMode="MAIN"
            data={(data as FeedData).items}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={(data as FeedData).totalPages}
            isError={isError}
            error={error}
          />
      </>
      }
    </>
    );
}

export default CommonProfileView;