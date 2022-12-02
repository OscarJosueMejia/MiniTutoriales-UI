import {useState, useEffect} from 'react';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { IFeedItem } from "@store/Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFeedItems, setUserFeedItems, selectUserFeedDetails} from "@store/Slices/userFeedSlice";
import { useLazyByUserQuery } from "@store/Services/Feed";
import { RootState, store } from '@store/store';
import { feedApi } from '@store/Services/Feed';
//Components
import Header from "@components/Header";
import {Button, ButtonGroup, Container} from "@mui/material";
import { ProfileInfo } from '@components/Profile';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite';

type mode = 'LIKED'|'LIST';

const ProfileView = () => {
    const userId=(store.getState() as RootState).sec._id;
    
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentMode, setCurrentMode ] = useState<mode>('LIST');

    const [ TriggerFeedByUser, {isLoading, isError, error}] = useLazyByUserQuery()
    const tutorialItems = useSelector(selectUserFeedItems);
    const feedDetails = useSelector(selectUserFeedDetails);

    const dispatch = useDispatch();
    
    useEffect(()=>{
      async function getData() {
          const { data:newData } = await TriggerFeedByUser({page:currentPage, userId, mode:currentMode});
            if(feedDetails.currentMode !== currentMode){
              setCurrentPage(1);
            }
            dispatch(setUserFeedItems({
              items:feedDetails.currentMode === currentMode && currentPage > feedDetails.page 
              ? [...tutorialItems, ...newData.items as Array<IFeedItem> ] 
              : newData.items as Array<IFeedItem>,
              itemsPerPage: newData.itemsPerPage,
              total: newData.total,
              totalPages: newData.totalPages,
              page: newData.page,
              currentMode
            }));
      }
      getData();
    
    },[currentMode, currentPage]);

    return (
    <>
      <Header title="Mi Perfil" />
      <ProfileInfo userData={{name:"Oscar Mejia", email:"oj_mejias@unicah.edu"}} uploadCount={tutorialItems.length} isLikedMode={currentMode === 'LIKED'} isUserLogged={true} />
      <Container sx={{display:'flex', justifyContent:'center', mt:'1.2rem'}}>
        <ButtonGroup
          disableElevation
          variant="outlined" >
          <Button variant={currentMode === 'LIST' ? 'contained' : 'outlined'}  onClick={()=>{setCurrentMode('LIST')}} startIcon={<DescriptionIcon sx={{mt:-0.2}}/>}>Mis Tutoriales</Button>
          <Button variant={currentMode === 'LIKED' ? 'contained' : 'outlined'} onClick={()=>{setCurrentMode('LIKED')}} endIcon={<FavoriteIcon sx={{mt:-0.2}}/>}>Me Gusta</Button>
        </ButtonGroup>
      </Container>
      <FeedLoader viewMode="USER"
        hideLoaderBtn={feedDetails.page === feedDetails.totalPages }
        querySelector={selectUserFeedItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        isError={false}
        error={""}
      />
    </>
    );
}

export default ProfileView;