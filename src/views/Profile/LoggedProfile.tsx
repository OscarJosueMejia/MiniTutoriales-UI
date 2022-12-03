import { useState } from 'react';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { FeedData } from "@store/Slices/feedSlice";
import { useByUserQuery } from "@store/Services/Feed";
import { RootState, store } from '@store/store';

//Components
import Header from "@components/Header";
import {Button, ButtonGroup, Container} from "@mui/material";
import { ProfileInfo } from '@components/Profile';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite';

type mode = 'LIKED'|'LIST';

const ProfileView = () => {
    const userId = (store.getState() as RootState).sec._id;
    
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentMode, setCurrentMode ] = useState<mode>('LIST');

    const { data, isLoading, isError, error } = useByUserQuery({page:currentPage, userId, mode:currentMode, currentUserLogged:userId});

    return (
    <>
      <Header title="Mi Perfil" />
      <ProfileInfo userData={{name:"Oscar Mejia", email:(store.getState() as RootState).sec.email }} uploadCount={data !== undefined ? (data as FeedData).items.length : 0} isLikedMode={currentMode === 'LIKED'} isUserLogged={true} />
      <Container sx={{display:'flex', justifyContent:'center', mt:'1.2rem'}}>
        <ButtonGroup
          disableElevation
          variant="outlined" >
          <Button variant={currentMode === 'LIST' ? 'contained' : 'outlined'}  onClick={()=>{setCurrentMode('LIST')}} startIcon={<DescriptionIcon sx={{mt:-0.2}}/>}>Mis Tutoriales</Button>
          <Button variant={currentMode === 'LIKED' ? 'contained' : 'outlined'} onClick={()=>{setCurrentMode('LIKED')}} endIcon={<FavoriteIcon sx={{mt:-0.2}}/>}>Me Gusta</Button>
        </ButtonGroup>
      </Container>

      {data &&
        <FeedLoader viewMode="USER"
          data={(data as FeedData).items}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={(data as FeedData).totalPages}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      }
    </>
    );
}

export default ProfileView;