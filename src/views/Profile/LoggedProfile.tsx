import {useState, useEffect} from 'react';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { IFeedItem } from "@store/Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFeedItems, setUserFeedItems, selectUserFeedDetails} from "@store/Slices/userFeedSlice";
import { useLazyByUserQuery } from "@store/Services/Feed";
//Components
import Header from "@components/Header";
import {Button, ButtonGroup, Container} from "@mui/material";
import { ProfileInfo } from '@components/Profile';

const ProfileView = () => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ TriggerFeedByUser, {isLoading, isError, error}] = useLazyByUserQuery()

    const userId='6355bf4a972277413bb7ddca'
    const tutorialItems = useSelector(selectUserFeedItems);
    const feedDetails = useSelector(selectUserFeedDetails);

    const dispatch = useDispatch();
    
    useEffect(()=>{
      async function getData() {
  
          const { data:newData } = await TriggerFeedByUser({page:currentPage, userId});
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
      <ProfileInfo userData={{name:"Oscar Mejia", email:"oj_mejias@unicah.edu"}} uploadCount={tutorialItems.length} />
      <Container sx={{display:'flex', justifyContent:'center', mt:'1.2rem'}}>
        <ButtonGroup
          disableElevation
          variant="outlined" >
          <Button>Mis Tutoriales</Button>
          <Button>Me Gusta</Button>
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